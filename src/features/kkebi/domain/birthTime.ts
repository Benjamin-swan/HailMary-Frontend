// 생시(出生時) 표현 변환 — 도윤/연우는 HH:MM 자유입력, 깨비는 12지시(地支) 선택.
// 계정 last_used.time(canonical = "HH:MM" | null)을 깨비 select 인덱스와 상호 변환한다.
//
// 시주(時柱)는 2시간 단위 지지로 결정되므로 분(分)은 무관:
//   子 23:00~01:00(0) 丑 01~03(1) 寅 03~05(2) 卯 05~07(3) 辰 07~09(4) 巳 09~11(5)
//   午 11:00~13:00(6) 未 13~15(7) 申 15~17(8) 酉 17~19(9) 戌 19~21(10) 亥 21~23(11)
//   → index = floor(((hour + 1) % 24) / 2)   (예: 12:12 → 午時(6))

/** "HH:MM" → 12지시 인덱스(0~11). 형식 불량/모름이면 null. */
export function hhmmToZodiacIndex(hhmm: string | null | undefined): number | null {
  if (!hhmm || !/^\d{2}:\d{2}$/.test(hhmm)) return null;
  const hour = Number(hhmm.slice(0, 2));
  if (Number.isNaN(hour) || hour < 0 || hour > 23) return null;
  return Math.floor(((hour + 1) % 24) / 2);
}

/** 12지시 인덱스 → 해당 지지의 시작 시각 "HH:00". 시주가 동일해 round-trip 안정. */
export function zodiacIndexToHHMM(index: number): string {
  const startHour = (index * 2 + 23) % 24;
  return `${String(startHour).padStart(2, "0")}:00`;
}
