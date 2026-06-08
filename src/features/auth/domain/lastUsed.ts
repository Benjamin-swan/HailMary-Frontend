import { authStore } from "@/lib/authStore";
import { api } from "@/shared/utils/api";

// 계정 '마지막 사용값' 갱신 payload — BE UpdateLastUsedRequest와 동일 계약.
export interface LastUsedPayload {
  name: string;
  birth: string; // "YYYY-MM-DD"
  calendar: "solar" | "lunar";
  gender: "male" | "female";
  // "HH:MM" | "unknown" | null(시간 정보 없는 플로 — 기존 시각 보존)
  time: string | null;
}

// 로그인 상태에서만 fire-and-forget로 계정 마지막값 갱신.
// 비로그인이면 no-op, 실패해도 코어 플로(설문 진행)에 영향 0.
export function saveLastUsed(payload: LastUsedPayload): void {
  if (!authStore.get()) return;
  void api
    .post("/api/account/last-used", payload, { auth: "account" })
    .catch(() => {
      // 마지막값 저장 실패는 무시 — 다음 제출에서 다시 시도됨
    });
}
