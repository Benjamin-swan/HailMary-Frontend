"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  COOKIE_KEYS,
  getCookie,
  getTodayCycleId,
  setCookie,
} from "../domain/cookieSession";

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

  function handleAdClick() {
    const cycleId = getTodayCycleId();
    window.open(AD_LINK, "_blank");
    if (typeof console !== "undefined") {
      console.log("[DA] ad_click", { cycle_id: cycleId });
    }
    setCookie(COOKIE_KEYS.LAST_CYCLE_ID, cycleId);
    router.push("/fortune/daily/loading/");
  }

  return { handleAdClick };
}
