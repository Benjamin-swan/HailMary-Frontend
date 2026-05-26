export type Gender = "M" | "F" | "X";
export type KkebiMood = "high" | "mid-high" | "mid" | "low";
export type AreaKey = "love" | "work" | "money" | "health" | "study";

export type AreaResult = {
  score: number;          // 0~100
  summary: string;        // 깨비 한 줄
  blocks: {
    bok: string;          // 卜(복) 오늘의 점괘
    gyeong: string;       // 警(경) 조심할 점
    jo: string;           // 助(조) 깨비의 한마디
  };
};

export type SajuResult = {
  user: {
    name: string;
    birth: {
      date: string;       // YYYY-MM-DD (양력)
      hour: number | null; // 0~11 (12지 index) 또는 null (모름)
    };
    gender: Gender;
  };
  cycle: {
    id: string;           // YYYYMMDD
    displayDate: string;  // "2026년 5월 22일"
  };
  total: {
    score: number;        // 0~100
    summary: string;
    kkebiMood: KkebiMood; // 점수 기반 깨비 표정 매핑 (C1)
  };
  timeFlow: {
    morning:   { score: number; comment: string; tip: string };
    afternoon: { score: number; comment: string; tip: string };
    night:     { score: number; comment: string; tip: string };
  };
  areas: Record<AreaKey, AreaResult>;
  lucky: {
    color: { hex: string; name: string };
    number: number;
    direction: "東" | "西" | "南" | "北" | "東北" | "西北" | "東南" | "西南";
    food: { name: string };
  };
};
