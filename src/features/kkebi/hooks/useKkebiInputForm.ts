"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginGate } from "@/features/auth";
import { KKEBI_MOODS, VALIDATION_MESSAGES } from "../domain/constants";
import {
  COOKIE_KEYS,
  getCookie,
  getTodayCycleId,
  newUid,
  setCookie,
} from "../domain/cookieSession";
import {
  getDaysInMonth,
  lunarToSolarPlaceholder,
} from "../domain/sajuRules";
import { trackDaily } from "../domain/dailyAnalytics";
import type { Gender } from "../domain/types";

type MoodKey = "M1" | "M2" | "M3";

// HM-FE-92: "응답 안 함"(X) 옵션 제거 — FortuneTeller가 gender=other를 처리 못해 mock 폴백 발생하던 버그 회피.
// BE는 여전히 X(other) 허용하지만 사용자 진입 경로 봉인.
export const GENDER_OPTIONS: Array<{ label: string; value: Gender }> = [
  { label: "남", value: "M" },
  { label: "여", value: "F" },
];

export function useKkebiInputForm() {
  const router = useRouter();
  // 확인하기 시 로그인 유도 — 쿠키 저장(데이터 보존) 후 게이트. 로그인 시 ad 페이지로 복귀(쿠키로 이어짐).
  const loginGate = useLoginGate("kkebi", "/fortune/daily/ad/");

  // SSR/hydration 안전: 첫 mount 후에만 폼 렌더. 그 전엔 null.
  // (Math.random 기반 mood가 SSR과 client에서 달라 hydration mismatch 나는 걸 방지)
  const [isReady, setIsReady] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setIsReady(true); }, []);

  // 입력 폼 노출 — 사이클당 1회 가드
  useEffect(() => {
    const key = `hm_daily_input_view_${getTodayCycleId()}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    trackDaily("daily_input_view");
  }, []);

  // mount 직후 한 번만 mood + 인사 1개 랜덤 (useState lazy init — 첫 렌더 1회만 실행).
  const [init] = useState(() => {
    const keys: MoodKey[] = ["M1", "M2", "M3"];
    const m = keys[Math.floor(Math.random() * keys.length)];
    const pool = KKEBI_MOODS[m];
    const text = pool[Math.floor(Math.random() * pool.length)];
    return { mood: m, text };
  });
  const [mood] = useState<MoodKey>(init.mood);
  const [bubbleText, setBubbleText] = useState<string>(init.text);
  const defaultTextRef = useRef<string>(init.text);

  const [name, setName] = useState("");
  const [year, setYearRaw] = useState("");
  const [month, setMonthRaw] = useState("");
  const [day, setDay] = useState("");
  const [isLunar, setIsLunar] = useState(false);
  const [hour, setHour] = useState("unknown");
  const [gender, setGender] = useState<Gender | "">("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const bubbleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // year/month 변경 시 day 클램프 — useEffect 대신 setter 래핑 (cascade 회피)
  function setYear(newYear: string) {
    setYearRaw(newYear);
    if (day) {
      const max = getDaysInMonth(newYear, month);
      if (Number(day) > max) setDay(String(max));
    }
  }
  function setMonth(newMonth: string) {
    setMonthRaw(newMonth);
    if (day) {
      const max = getDaysInMonth(year, newMonth);
      if (Number(day) > max) setDay(String(max));
    }
  }

  // 타이머 정리
  useEffect(() => {
    return () => {
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    };
  }, []);

  function showValidationBubble(key: keyof typeof VALIDATION_MESSAGES) {
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    setBubbleText(VALIDATION_MESSAGES[key]);
    bubbleTimerRef.current = setTimeout(
      () => setBubbleText(defaultTextRef.current),
      3000,
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) { trackDaily("daily_input_invalid", { reason: "name" }); showValidationBubble("name"); return; }
    if (!year || !month || !day) { trackDaily("daily_input_invalid", { reason: "birth" }); showValidationBubble("birth"); return; }
    if (!gender) { trackDaily("daily_input_invalid", { reason: "gender" }); showValidationBubble("gender"); return; }

    const rawDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    const solarDate = isLunar ? lunarToSolarPlaceholder(rawDate) : rawDate;
    const uid = getCookie(COOKIE_KEYS.UID) ?? newUid();

    setCookie(COOKIE_KEYS.UID, uid);
    setCookie(COOKIE_KEYS.NAME, name.trim());
    setCookie(COOKIE_KEYS.BIRTH_SOLAR, solarDate);
    setCookie(COOKIE_KEYS.BIRTH_HOUR, hour);
    setCookie(COOKIE_KEYS.GENDER, gender);
    setCookie(COOKIE_KEYS.LAST_CYCLE_ID, getTodayCycleId());

    trackDaily("daily_input_submit", {
      birth_year: Number(year),
      birth_month: Number(month),
      calendar: isLunar ? "lunar" : "solar",
      gender,
      has_birth_time: hour !== "unknown",
    });

    // 비로그인이면 로그인 유도 팝업(쿠키는 위에서 이미 저장됨 → 어느 선택이든 데이터 보존).
    loginGate.run(() => router.push("/fortune/daily/ad/"));
  }

  const currentYear = new Date().getFullYear();
  const yearOptions  = Array.from({ length: 100 }, (_, i) => String(currentYear - i));
  const monthOptions = Array.from({ length: 12 },  (_, i) => String(i + 1));
  const dayOptions   = Array.from(
    { length: getDaysInMonth(year, month) },
    (_, i) => String(i + 1),
  );

  return {
    isReady,
    mood,
    bubbleText,
    name, setName,
    year, setYear,
    month, setMonth,
    day, setDay,
    isLunar, setIsLunar,
    hour, setHour,
    gender, setGender,
    focusedField, setFocusedField,
    yearOptions, monthOptions, dayOptions,
    handleSubmit,
    loginModal: loginGate.modal,
  };
}
