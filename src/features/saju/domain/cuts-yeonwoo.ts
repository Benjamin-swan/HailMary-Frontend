export type Cut =
  | { type: "dialogue"; bg: string; speaker: "강연우" | "내레이션"; lines: string[] }
  | { type: "dialogue-closeup"; bg: string; speaker: "강연우"; lines: string[] }
  | { type: "aside"; bg: string; speaker: "한도윤"; lines: string[] }
  | { type: "scene-pause"; bg: string }
  | { type: "info-form"; bg: string }
  | { type: "survey"; step: 1 | 2 | 3 }
  | { type: "final-leanin"; bg: string; bgZoomed: string; speaker: "강연우"; lines: string[] };

const ASSET = (n: string) => `/saju/yeonwoo/cut-${n}.png`;

export const YEONWOO_CUTS: Cut[] = [
  {
    type: "dialogue",
    bg: ASSET("1"),
    speaker: "강연우",
    lines: [
      "하...눈빛만 봐도 알겠군",
      "연애운 때문에 답답해서 온 거지? 따라와.",
    ],
  },
  {
    type: "aside",
    bg: ASSET("2"),
    speaker: "한도윤",
    lines: [
      "그렇게까지 스스로를 소모할 필요 없다고 몇 번을 말해. 또 괜찮은 척하면서 괜히 힘 뺄까 봐 내가 대신 정리하려는 건데…",
    ],
  },
  {
    type: "dialogue",
    bg: ASSET("3"),
    speaker: "강연우",
    lines: [
      "왜, 저쪽이 더 나아보여?",
      "당신한테 뭐가 필요한지는 내가 제일 잘 알아. 후회하지 말고 이쪽으로 와.",
    ],
  },
  {
    type: "dialogue-closeup",
    bg: ASSET("6"),
    speaker: "강연우",
    lines: ["내 눈엔 지금 네 주변에 시꺼먼 실들이 덕지덕지 엉킨 게 보이거든."],
  },
  {
    type: "dialogue",
    bg: ASSET("7"),
    speaker: "강연우",
    lines: ["얼굴에 다 쓰여 있는데. 너 지금 뭐 때문에 온 건지.", "지금 널 제일 갉아먹고 있는 게 뭐야? 솔직하게 말해."],
  },
  {
    type: "dialogue",
    bg: ASSET("9"),
    speaker: "강연우",
    lines: ["알았으니까 고개 들어.", "여기까지 온 이상 빈손으로 보낼 생각 없으니까. 네가 쥐어야 할 진짜 인연이 뭔지, 내가 지금 바로 보여줄게"],
  },
  {
    type: "dialogue",
    bg: ASSET("10"),
    speaker: "강연우",
    lines: [
      "입으로 하는 고민 상담은 여기까지. 이제 네 팔자가 어떻게 굴러가는지 제대로 들여다볼 거야.",
      "여기 네 명식 넣어봐. 네 연애운이 왜 그 모양이었는지 내가 소름 끼치게 증명해 줄 테니까.",
    ],
  },
  { type: "info-form", bg: ASSET("11") },
  { type: "survey", step: 1 },
  { type: "survey", step: 2 },
  { type: "survey", step: 3 },
  { type: "scene-pause", bg: ASSET("12") },
  { type: "scene-pause", bg: ASSET("13") },
  {
    type: "final-leanin",
    bg: ASSET("14"),
    bgZoomed: ASSET("14"),
    speaker: "강연우",
    lines: [
      "그래. 확인했어. 네가 어떤 애인지 선명하게 보이네.",
      "복잡하게 생각하지 말고 내가 하는 말만 들어. 그게 네가 덜 헤매는 길이야.",
    ],
  },
];
