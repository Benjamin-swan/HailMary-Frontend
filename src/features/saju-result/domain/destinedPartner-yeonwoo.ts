export type DestinedSlotKey =
  | "wood-yang"
  | "wood-yin"
  | "fire-yang"
  | "fire-yin"
  | "earth-yang"
  | "earth-yin"
  | "metal-yang"
  | "metal-yin"
  | "water-yang"
  | "water-yin"
  | "neutral";

export type DestinedPartnerCopy = {
  quote: string;
  impression: string;
  ageGap: string;
  firstFeel: string;
};

export const DESTINED_PARTNER_DIALOGUES: Record<DestinedSlotKey, DestinedPartnerCopy> = {
  "wood-yang": {
    quote: "방향이 분명해서 같이 가고 싶게 만드는 사람",
    impression: "키 크고 어깨 넓은 활동형 인상",
    ageGap: "1~3살 위",
    firstFeel: "주도하는 분위기로 다가옴",
  },
  "wood-yin": {
    quote: "곁에 있으면 자연스럽게 자라게 만드는 사람",
    impression: "선이 얇고 부드러운 식물성 인상",
    ageGap: "비슷하거나 연하",
    firstFeel: "조용히 곁을 채우는 분위기",
  },
  "fire-yang": {
    quote: "처음 본 자리에서 분위기를 환하게 바꾸는 사람",
    impression: "친근하고 말이 많은 타입",
    ageGap: "비슷하거나 연하",
    firstFeel: "편하고 자연스러움",
  },
  "fire-yin": {
    quote: "한 사람만 깊이 들여다보는 인상의 사람",
    impression: "눈매가 따뜻한 섬세형 인상",
    ageGap: "비슷하거나 1~2살 위",
    firstFeel: "조심스럽게 다가옴",
  },
  "earth-yang": {
    quote: "묵직하게 자리 잡아 안정감을 주는 사람",
    impression: "체격이 단단한 안정형 인상",
    ageGap: "3~6살 위",
    firstFeel: "묵직하게 자리 잡음",
  },
  "earth-yin": {
    quote: "내 얘기를 끝까지 들어줄 것 같은 사람",
    impression: "둥근 선의 포용형 인상",
    ageGap: "비슷하거나 1~3살 위",
    firstFeel: "잘 들어주는 분위기",
  },
  "metal-yang": {
    quote: "기준이 분명해서 신뢰가 먼저 생기는 사람",
    impression: "선이 또렷한 결단형 인상",
    ageGap: "1~4살 위",
    firstFeel: "기준을 먼저 보여줌",
  },
  "metal-yin": {
    quote: "단정한 결로 곁을 깔끔히 정돈해주는 사람",
    impression: "정돈된 단정한 인상",
    ageGap: "비슷하거나 1~2살 위",
    firstFeel: "차분하게 거리 좁힘",
  },
  "water-yang": {
    quote: "처음엔 확신을 줄 것처럼 다가오는 사람",
    impression: "여유 있고 자신감 있는 인상",
    ageGap: "비슷하거나 연상·연하 폭 넓음",
    firstFeel: "확신을 줄 것처럼 다가옴",
  },
  "water-yin": {
    quote: "조용한데 한 번 보면 자꾸 떠오르는 사람",
    impression: "조용하고 깊이 있는 인상",
    ageGap: "1~3살 위",
    firstFeel: "말 적지만 시선이 길게 머묾",
  },
  neutral: {
    quote: "어느 쪽으로도 치우치지 않은 결의 사람",
    impression: "특정 인상보다 본인 컨디션에 따라 끌리는 결",
    ageGap: "고정 폭 없음",
    firstFeel: "상황에 따라 다른 분위기로 다가옴",
  },
};

export function slotIdToDestinedKey(slotId: string): DestinedSlotKey {
  const idx = slotId.indexOf("-");
  if (idx < 0) return "neutral";
  const rest = slotId.slice(idx + 1);
  if (rest === "neutral") return "neutral";
  const valid: ReadonlyArray<DestinedSlotKey> = [
    "wood-yang", "wood-yin",
    "fire-yang", "fire-yin",
    "earth-yang", "earth-yin",
    "metal-yang", "metal-yin",
    "water-yang", "water-yin",
  ];
  return valid.includes(rest as DestinedSlotKey) ? (rest as DestinedSlotKey) : "neutral";
}
