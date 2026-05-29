// 깨비 일일사주 이벤트 트래킹 헬퍼 (HMDA-36)
// =============================================================================
// 일일사주 플로 전 구간의 daily_* 이벤트를 한 곳에서 정의한다.
// - 모든 이벤트에 cycle_id(KST YYYYMMDD)를 자동 첨부 → 1일 1회 사이클 상관키.
//   (다른 플로의 character_id / saju_request_id 역할)
// - PII(이름) 미전송 원칙. 인구통계(birth/gender/calendar)는 info_form_submit과
//   동일 키 컨벤션을 따른다.
// 실제 발화는 shared/utils/analytics.ts의 trackEvent() → Amplitude.
// =============================================================================

import { trackEvent } from "@/shared/utils/analytics";
import { getTodayCycleId } from "./cookieSession";

/** 일일사주 공통 — cycle_id 자동 첨부 후 발화. */
export function trackDaily(
  eventName: string,
  properties?: Record<string, unknown>,
): void {
  trackEvent(eventName, {
    cycle_id: getTodayCycleId(),
    ...properties,
  });
}
