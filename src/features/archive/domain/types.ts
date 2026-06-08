// 보관함 데이터 — BE ArchiveResponse 계약과 일치.

export interface PaidArchiveItem {
  // 만료 건은 BE에서 제외 → 여기 오는 건 모두 활성(열람 가능).
  character: string; // "yeonwoo" | "doyoon"
  orderId: string;
  shareCode: string | null; // null이면 결과지 미합성 → 다시보기 비활성
  approvedAt: string;
  expiresAt: string;
}

export interface KkebiArchiveItem {
  cycleId: string;
  summary: string | null;
}

export interface ArchiveData {
  paid: PaidArchiveItem[];
  kkebi: KkebiArchiveItem | null;
}

// 상품명 표기 (display는 FE 책임 — BE는 character만 전달)
export const PRODUCT_NAME: Record<string, string> = {
  yeonwoo: "강연우의 정통 연애 사주",
  doyoon: "한도윤의 데이터 기반 연애분석",
};

export function productName(character: string): string {
  return PRODUCT_NAME[character] ?? "연애 사주 결과지";
}
