"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { saveLastUsed, useAuth, useLoginGate } from "@/features/auth";
import { hhmmToZodiacIndex, zodiacIndexToHHMM } from "../domain/birthTime";
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
  // 입력폼(설문) 진입 시 로그인 유도. 로그인 후 입력폼으로 복귀해 prefill된 채 확인하도록 returnTo=/input/.
  const loginGate = useLoginGate("kkebi", "/fortune/daily/input/");
  // 계정 마지막 사용값 prefill — 로그인 시 /me 재조회 후 폼 채움.
  const { profile, refreshMe } = useAuth();

  // SSR/hydration 안전: 첫 mount 후에만 폼 렌더. 그 전엔 null.
  // (Math.random 기반 mood가 SSR과 client에서 달라 hydration mismatch 나는 걸 방지)
  const [isReady, setIsReady] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setIsReady(true); }, []);

  // 입력폼(설문) 진입 시 1회 로그인 유도. 비로그인만(게이트 내부 판정), 코어 플로 불변(no-op).
  const gatePromptedRef = useRef(false);
  useEffect(() => {
    if (!isReady || gatePromptedRef.current) return;
    gatePromptedRef.current = true;
    loginGate.run(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

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

  // 로그인 상태면 /me 재조회 → 계정 마지막 사용값 확보
  useEffect(() => {
    void refreshMe();
  }, [refreshMe]);

  // 마지막 사용값으로 1회 prefill (프로필 도착 시). 이미 채워졌으면 다시 안 건드림.
  const prefilledRef = useRef(false);
  useEffect(() => {
    const lu = profile?.lastUsed;
    if (!lu || prefilledRef.current) return;
    prefilledRef.current = true;
    const [y, m, d] = lu.birth.split("-");
    setName(lu.name);
    setYearRaw(y);
    setMonthRaw(String(Number(m)));
    setDay(String(Number(d)));
    setIsLunar(lu.calendar === "lunar");
    setGender(lu.gender === "male" ? "M" : "F");
    // 생시: 도윤/연우가 넣은 HH:MM을 깨비 12지시로 자동 매치 (예: 12:12 → 午時). 없으면 모름.
    const zi = hhmmToZodiacIndex(lu.time);
    setHour(zi !== null ? String(zi) : "unknown");
  }, [profile]);

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

    // 로그인 상태면 계정 마지막 사용값 갱신. 깨비 12지시 select ↔ canonical HH:MM 정합:
    //  - 모름이면 time:null → 도윤/연우가 넣은 기존 HH:MM 보존(덮어쓰지 않음)
    //  - 기존값이 같은 지지면 time:null → 원본 HH:MM(분까지) 보존
    //  - 지지를 바꿨을 때만 새 HH:MM(지지 시작시각) 기록
    const prevTime = profile?.lastUsed?.time ?? null;
    let timeToSave: string | null;
    if (hour === "unknown") {
      timeToSave = null;
    } else {
      const idx = Number(hour);
      timeToSave = hhmmToZodiacIndex(prevTime) === idx ? null : zodiacIndexToHHMM(idx);
    }
    saveLastUsed({
      name: name.trim(),
      birth: solarDate,
      calendar: isLunar ? "lunar" : "solar",
      gender: gender === "M" ? "male" : "female",
      time: timeToSave,
    });

    // 로그인 유도는 입력폼 진입 시 이미 노출됨(위 마운트 게이트) → 제출은 바로 다음 단계로.
    router.push("/fortune/daily/ad/");
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
