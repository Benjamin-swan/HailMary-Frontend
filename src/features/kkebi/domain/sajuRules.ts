import type { KkebiMood } from "./types";

export function scoreToMood(score: number): KkebiMood {
  if (score >= 86) return "high";
  if (score >= 61) return "mid-high";
  if (score >= 31) return "mid";
  return "low";
}

export function getDaysInMonth(year: string, month: string): number {
  if (!year || !month) return 31;
  return new Date(Number(year), Number(month), 0).getDate();
}

/** TODO: 진짜 음력→양력 변환 라이브러리/BE 호출로 교체. */
export function lunarToSolarPlaceholder(dateStr: string): string {
  if (typeof console !== "undefined") {
    console.warn("[kkebi] 음력→양력 변환 미구현. 입력값 그대로 저장:", dateStr);
  }
  return dateStr;
}
