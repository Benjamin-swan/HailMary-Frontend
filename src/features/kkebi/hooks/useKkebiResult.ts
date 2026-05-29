"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  COOKIE_KEYS,
  getCookie,
  getTodayCycleId,
} from "../domain/cookieSession";
import { trackDaily } from "../domain/dailyAnalytics";
import { mockSajuResult } from "../domain/mockData";

export function useKkebiResult() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [c1Flipped, setC1Flipped] = useState(false);
  const [userName, setUserName] = useState(mockSajuResult.user.name);

  useEffect(() => {
    const uid       = getCookie(COOKIE_KEYS.UID);
    const name      = getCookie(COOKIE_KEYS.NAME);
    const birth     = getCookie(COOKIE_KEYS.BIRTH_SOLAR);
    const gender    = getCookie(COOKIE_KEYS.GENDER);
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
    setIsReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */

    // 무료 일일사주 결과 도달 — 사이클당 1회 가드
    const reachKey = `hm_daily_result_reach_${getTodayCycleId()}`;
    if (!sessionStorage.getItem(reachKey)) {
      sessionStorage.setItem(reachKey, "1");
      trackDaily("daily_result_reach");
    }
  }, [router]);

  return {
    isReady,
    currentCard,
    setCurrentCard,
    c1Flipped,
    setC1Flipped,
    userName,
    data: mockSajuResult,
  };
}
