import type { AreaKey } from "./types";

export const ZODIAC_HOURS = [
  { index: 0,  hanja: "子", rom: "자", label: "子(자) 23:00~01:00" },
  { index: 1,  hanja: "丑", rom: "축", label: "丑(축) 01:00~03:00" },
  { index: 2,  hanja: "寅", rom: "인", label: "寅(인) 03:00~05:00" },
  { index: 3,  hanja: "卯", rom: "묘", label: "卯(묘) 05:00~07:00" },
  { index: 4,  hanja: "辰", rom: "진", label: "辰(진) 07:00~09:00" },
  { index: 5,  hanja: "巳", rom: "사", label: "巳(사) 09:00~11:00" },
  { index: 6,  hanja: "午", rom: "오", label: "午(오) 11:00~13:00" },
  { index: 7,  hanja: "未", rom: "미", label: "未(미) 13:00~15:00" },
  { index: 8,  hanja: "申", rom: "신", label: "申(신) 15:00~17:00" },
  { index: 9,  hanja: "酉", rom: "유", label: "酉(유) 17:00~19:00" },
  { index: 10, hanja: "戌", rom: "술", label: "戌(술) 19:00~21:00" },
  { index: 11, hanja: "亥", rom: "해", label: "亥(해) 21:00~23:00" },
] as const;

export const AREA_KEYS: AreaKey[] = ["love", "work", "money", "health", "study"];

export const AREA_LABELS: Record<AreaKey, { hanja: string; display: string }> = {
  love:   { hanja: "戀", display: "戀(연)" },
  work:   { hanja: "事", display: "事(사)" },
  money:  { hanja: "財", display: "財(재)" },
  health: { hanja: "健", display: "健(건)" },
  study:  { hanja: "學", display: "學(학)" },
};

export const KKEBI_MOODS = {
  M1: [
    "왔구나. ...뭐, 어차피 매일 봐야지.",
    "...귀찮긴 한데, 봐주긴 봐줄게.",
    "또 너야. ...뭐 보고 싶은데?",
    "...아, 졸려. 그래도 보러는 왔구나.",
    "오늘도 운명이 궁금해? ...뻔한 거 아닌가.",
  ],
  M2: [
    "기다리진 않았는데, 왔으면... 어쩔 수 없지.",
    "오, 너구나. ...뭐, 잘 왔어.",
    "오늘은 좀 진지하게 봐줄게.",
    "운이 좋네, 오늘은 깨비가 깨어 있거든.",
    "음, 너 오는 거 알고 있었어. ...라고 하면 너무 다정한가.",
  ],
  M3: [
    "오, 또 너야? 운명이 그렇게 궁금해?",
    "음, 너 오늘 표정이 좀 묘한데?",
    "왔구나. 안 그래도 좀 심심했어.",
    "기왕 왔으니, 제대로 봐줄게.",
    "기분 좋네. ...너 때문은 아니야.",
  ],
} as const;

export const VALIDATION_MESSAGES = {
  name:   "이름은 알려줘야지.",
  birth:  "생일은 알아야 봐줄 거 아니야.",
  gender: "성별도 알려줘야지.",
} as const;
