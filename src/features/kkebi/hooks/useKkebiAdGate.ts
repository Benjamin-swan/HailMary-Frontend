"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  COOKIE_KEYS,
  getCookie,
  getTodayCycleId,
  setCookie,
} from "../domain/cookieSession";
import { trackDaily } from "../domain/dailyAnalytics";

const AD_LINK = "https://example.com"; // TODO: 실제 광고 링크

export function useKkebiAdGate() {
  const router = useRouter();

  // 세션 쿠키 없으면 입력 폼으로 되돌림 (직접 진입 차단)
  useEffect(() => {
    const uid    = getCookie(COOKIE_KEYS.UID);
    const name   = getCookie(COOKIE_KEYS.NAME);
    const birth  = getCookie(COOKIE_KEYS.BIRTH_SOLAR);
    const gender = getCookie(COOKIE_KEYS.GENDER);

    if (!uid || !name || !birth || !gender) {
      router.replace("/fortune/daily/input/");
    }
  }, [router]);

  // 광고 게이트 노출 — 사이클당 1회 가드
  useEffect(() => {
    const key = `hm_daily_ad_view_${getTodayCycleId()}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    trackDaily("daily_ad_view");
  }, []);

  function handleAdClick() {
    const cycleId = getTodayCycleId();
    window.open(AD_LINK, "_blank");
    trackDaily("daily_ad_click");
    setCookie(COOKIE_KEYS.LAST_CYCLE_ID, cycleId);
    router.push("/fortune/daily/loading/");
  }

  return { handleAdClick };
}
