"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { COOKIE_KEYS, getCookie } from "../domain/cookieSession";

const LOADING_DURATION_MS = 2500;

export function useKkebiLoading() {
  const router = useRouter();

  useEffect(() => {
    const uid    = getCookie(COOKIE_KEYS.UID);
    const name   = getCookie(COOKIE_KEYS.NAME);
    const birth  = getCookie(COOKIE_KEYS.BIRTH_SOLAR);
    const gender = getCookie(COOKIE_KEYS.GENDER);

    if (!uid || !name || !birth || !gender) {
      router.replace("/fortune/daily/input/");
    }
  }, [router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/fortune/daily/result/");
    }, LOADING_DURATION_MS);
    return () => clearTimeout(timer);
  }, [router]);
}
