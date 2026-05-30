import type { KkebiMood } from "./types";

// BE kkebi_mood.py 와 동일 임계. 점수는 70~99에 20/50/30 분포로 설계됨.
export function scoreToMood(score: number): KkebiMood {
  if (score >= 90) return "high";
  if (score >= 80) return "mid-high";
  if (score >= 70) return "mid";
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
