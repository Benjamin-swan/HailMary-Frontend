// 결제 페이지 도메인 데이터.
// 캐릭터별 상품명·가격만 정의. 시각 자산이나 캐릭터 메타는 character-select feature에 있고,
// CLAUDE.md 규칙상 feature 간 직접 import는 금지이므로 결제에 필요한 최소 데이터만 별도 정의.

export type CheckoutCharacter = "yeonwoo" | "doyoon";

export interface CheckoutProduct {
  character: CheckoutCharacter;
  productLabel: string;
  priceKrw: number;
}

export const PRODUCTS: Record<CheckoutCharacter, CheckoutProduct> = {
  yeonwoo: {
    character: "yeonwoo",
    productLabel: "강연우의 정통 연애 사주",
    priceKrw: 20000,
  },
  doyoon: {
    character: "doyoon",
    productLabel: "한도윤의 데이터 기반 연애분석",
    priceKrw: 20000,
  },
};

export function isCheckoutCharacter(value: string): value is CheckoutCharacter {
  return value === "yeonwoo" || value === "doyoon";
}

export function formatKrw(value: number): string {
  return `${value.toLocaleString("ko-KR")}원`;
}
