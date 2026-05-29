"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { getTodayCycleId } from "../domain/cookieSession";
import { trackDaily } from "../domain/dailyAnalytics";

export function useKkebi() {
  const router = useRouter();

  // 일일사주 진입 — 사이클당 1회 가드 (StrictMode/뒤로가기 중복 방지)
  useEffect(() => {
    const key = `hm_daily_intro_view_${getTodayCycleId()}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    trackDaily("daily_intro_view");
  }, []);

  const handleBack = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleStart = useCallback(() => {
    trackDaily("daily_start_click");
    router.push("/fortune/daily/input/");
  }, [router]);

  return { handleBack, handleStart };
}
