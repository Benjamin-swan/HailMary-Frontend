// 깨비 일일운세 — 광고 목록 + 만료/랜덤 선택 (순수 도메인 로직)
// =============================================================================
// - 각 광고는 이벤트 종료일(eventEndDate, KST YYYYMMDD)을 가진다.
// - 안전빵 정책: 종료일 '전날'까지만 노출한다. 즉 today < eventEndDate 이면 활성.
//   (예: 6/29까지 이벤트면 eventEndDate "20260629" → 6/28까지 노출, 6/29부터 자동 제외)
// - 활성 광고 중 랜덤 1개를 고른다. 활성 광고가 없으면 null(광고 없이 진행).
// =============================================================================

export type KkebiAd = {
  id: string;
  /** 광고 보러 가기 클릭 시 열릴 외부 URL */
  url: string;
  /** 이벤트 종료일 (KST, YYYYMMDD). 이 날짜 '전날'까지만 노출 (today < eventEndDate). */
  eventEndDate: string;
};

// 쿠팡 파트너스 광고. eventEndDate는 "이벤트 ~까지"의 그 날짜를 그대로 넣으면
// 코드가 전날까지만 노출한다 (안전빵, today < eventEndDate).
export const KKEBI_ADS: KkebiAd[] = [
  // 스포츠/레저, 자기관리 끝판왕 (~6/29 → 6/28까지 노출)
  { id: "coupang-sports", url: "https://link.coupang.com/a/ebXYm6Gts4", eventEndDate: "20260629" },
  // 로켓프레시, 봉주르빵집 (~6/28 → 6/27까지 노출)
  { id: "coupang-fresh", url: "https://link.coupang.com/a/ebXZ7WZ3OS", eventEndDate: "20260628" },
  // 로켓패션, 여름 잡화 (~6/7 → 6/6까지 노출)
  { id: "coupang-fashion", url: "https://link.coupang.com/a/ebX182UixE", eventEndDate: "20260607" },
  // 자동차용품, 여름 카케어템 (~7/30 → 7/29까지 노출)
  { id: "coupang-car", url: "https://link.coupang.com/a/ebX4jppZU4", eventEndDate: "20260730" },
];

/** 활성 광고(today < eventEndDate) 중 랜덤 1개. 없으면 null. */
export function pickRandomActiveAd(todayCycleId: string): KkebiAd | null {
  const active = KKEBI_ADS.filter((ad) => todayCycleId < ad.eventEndDate);
  if (active.length === 0) return null;
  const idx = Math.floor(Math.random() * active.length);
  return active[idx];
}
