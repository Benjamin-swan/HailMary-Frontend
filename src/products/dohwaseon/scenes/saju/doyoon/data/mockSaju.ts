import type { Pillar, SajuFreeResponse } from "@/features/saju";

export type { Pillar };
export type MockSaju = Pick<SajuFreeResponse, "pillars" | "highlight">;

export const MOCK_SAJU: MockSaju = {
  pillars: [
    {
      label: "년주",
      heaven: "甲",
      earth: "子",
      element: "목 / 수",
      hue: "#9CC8B0",
    },
    {
      label: "월주",
      heaven: "丙",
      earth: "寅",
      element: "화 / 목",
      hue: "#E6A88E",
    },
    {
      label: "일주",
      heaven: "戊",
      earth: "申",
      element: "토 / 금",
      hue: "#E6C58E",
    },
    {
      label: "시주",
      heaven: "辛",
      earth: "亥",
      element: "금 / 수",
      hue: "#6B8BB5",
    },
  ],
  highlight: "도화살(桃花殺) — 일지(日支)에 위치",
};
