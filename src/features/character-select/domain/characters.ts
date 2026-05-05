export type Side = "left" | "right" | null;
export type Phase = "selecting" | "confirming";
export type CharKey = "yeonwoo" | "doyoon";

export const CHARACTER_INFO = {
  yeonwoo: {
    fullName: "강 연 우",
    title: "직관적 명리학자",
    subtitle: "전통 · 직관 · 영적 해석",
    quote:
      "애먼 데 기웃거릴 시간 있으면 내 눈앞에 앉는 게 나을 거야. 꼬일 대로 꼬인 네 인연들, 내가 다 정리해 줄 테니까.",
    nameColor: "#ffd4a8",
    accentColor: "rgba(255,150,50,0.8)",
    borderColor: "rgba(255,180,100,0.65)",
    glowColor: "rgba(255,150,50,0.35)",
    selectImage: "/select-yeonwoo.webp",
    confirmImage: "/confirm-yeonwoo.png",
  },
  doyoon: {
    fullName: "한 도 윤",
    title: "이성적 연애 분석가",
    subtitle: "현대 · 분석 · 데이터 해석",
    quote:
      "수만 건의 행동 심리 데이터와 알고리즘을 바탕으로, 당신의 연애 패턴을 분석하고 개선 방향을 함께 찾아드리겠습니다.",
    nameColor: "#fff5d6",
    accentColor: "rgba(255,230,150,0.8)",
    borderColor: "rgba(255,220,140,0.65)",
    glowColor: "rgba(255,210,130,0.35)",
    selectImage: "/select-doyoon.webp",
    confirmImage: "/confirm-doyoon.png",
  },
} as const;
