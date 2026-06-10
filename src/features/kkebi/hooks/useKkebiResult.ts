"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/shared/utils/api";
import {
  COOKIE_KEYS,
  getCookie,
  getTodayCycleId,
} from "../domain/cookieSession";
import { trackDaily } from "../domain/dailyAnalytics";
import { mockSajuResult } from "../domain/mockData";
import type { SajuResult } from "../domain/types";

export function useKkebiResult() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [c1Flipped, setC1Flipped] = useState(false);
  const [userName, setUserName] = useState(mockSajuResult.user.name);
  // BE 합성 결과. 로드 전·실패 시 mock으로 폴백해 화면이 깨지지 않게 한다.
  const [data, setData] = useState<SajuResult>(mockSajuResult);

  useEffect(() => {
    // 보관함 '다시보기' — 쿠키/사이클 가드 우회, 저장본 직접 로드.
    const fromArchive =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("from") === "archive";
    if (fromArchive) {
      let cancelledA = false;
      void (async () => {
        try {
          const saved = await api.get<SajuResult>("/api/kkebi/result/today", {
            auth: "account",
          });
          if (!cancelledA) {
            setData(saved);
            setUserName(saved.user.name);
          }
        } catch {
          // 저장본 없음/만료 → 입력으로
          router.replace("/fortune/daily/input/");
        } finally {
          if (!cancelledA) setIsReady(true);
        }
      })();
      return () => {
        cancelledA = true;
      };
    }

    const uid       = getCookie(COOKIE_KEYS.UID);
    const name      = getCookie(COOKIE_KEYS.NAME);
    const birth     = getCookie(COOKIE_KEYS.BIRTH_SOLAR);
    const gender    = getCookie(COOKIE_KEYS.GENDER);
    const hourRaw   = getCookie(COOKIE_KEYS.BIRTH_HOUR);
    const lastCycle = getCookie(COOKIE_KEYS.LAST_CYCLE_ID);

    if (!uid || !name || !birth || !gender) {
      router.replace("/fortune/daily/input/");
      return;
    }

    if (lastCycle !== getTodayCycleId()) {
      router.replace("/fortune/daily/ad/");
      return;
    }

    // 마운트 시 1회 세션 검증 + 표시 데이터 세팅. cascade 의도 X.
    /* eslint-disable react-hooks/set-state-in-effect */
    if (name) setUserName(name);
    /* eslint-enable react-hooks/set-state-in-effect */

    // 무료 일일사주 결과 도달 — 사이클당 1회 가드
    const reachKey = `hm_daily_result_reach_${getTodayCycleId()}`;
    if (!sessionStorage.getItem(reachKey)) {
      sessionStorage.setItem(reachKey, "1");
      trackDaily("daily_result_reach");
    }

    // BE /api/kkebi/fortune 호출
    const hour =
      hourRaw === undefined || hourRaw === "unknown" ? null : Number(hourRaw);
    let cancelled = false;
    void (async () => {
      try {
        // HM-FE-107: 깨비 fortune은 AI 미사용(FortuneTeller 계산 + 템플릿)이라
        // 정상 1초 이내. 공통 90s 대신 12s로 단축 → 무응답 시 빠르게 mock 폴백.
        const result = await api.post<SajuResult>(
          "/api/kkebi/fortune",
          { name, birth, hour, gender },
          // 로그인 시 계정 JWT 첨부 → BE가 결과 저장(다시보기). 비로그인은 토큰 없어 익명 동작.
          { timeoutMs: 12000, auth: "account" },
        );
        if (!cancelled) setData(result);
      } catch {
        // 폴백: mock 유지 (개발 중 화면 깨짐 방지)
      } finally {
        if (!cancelled) setIsReady(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return {
    isReady,
    currentCard,
    setCurrentCard,
    c1Flipped,
    setC1Flipped,
    userName,
    data,
  };
}
