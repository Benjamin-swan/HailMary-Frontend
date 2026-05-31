import Cookies from "js-cookie";

export const COOKIE_KEYS = {
  UID:              "kkebi_uid",
  NAME:             "user_name",
  BIRTH_SOLAR:      "user_birth_solar",
  BIRTH_HOUR:       "user_birth_hour",
  GENDER:           "user_gender",
  LAST_CYCLE_ID:    "last_cycle_id",
  LAST_RESULT_HASH: "last_result_hash",
} as const;

export const COOKIE_EXPIRES_DAYS = 365;

export type CookieKey = (typeof COOKIE_KEYS)[keyof typeof COOKIE_KEYS];

export function getCookie(key: CookieKey): string | undefined {
  return Cookies.get(key);
}

export function setCookie(key: CookieKey, value: string): void {
  Cookies.set(key, value, { expires: COOKIE_EXPIRES_DAYS, sameSite: "lax" });
}

export function clearCookie(key: CookieKey): void {
  Cookies.remove(key);
}

/** 사용자 식별 uid 생성. secure context면 crypto.randomUUID,
 *  아니면(로컬 IP http·구형 웹뷰) Math.random 기반 fallback. */
export function newUid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // RFC4122 v4 유사 — 식별용이라 충분.
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** KST 기준 오늘 cycleId (YYYYMMDD) — 1일 1회 게이트 키. */
export function getTodayCycleId(): string {
  const kst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const y = kst.getUTCFullYear();
  const m = String(kst.getUTCMonth() + 1).padStart(2, "0");
  const d = String(kst.getUTCDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}
