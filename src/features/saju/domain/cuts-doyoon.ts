export type Cut =
  | { type: "dialogue"; bg: string; speaker: "도윤" | "내레이션"; lines: string[] }
  | { type: "dialogue-closeup"; bg: string; speaker: "도윤"; lines: string[] }
  | { type: "aside"; bg: string; speaker: "강연우"; lines: string[] }
  | { type: "tablet-handoff"; bg: string }
  | { type: "info-form"; bg: string }
  | { type: "survey"; step: 1 | 2 | 3 }
  | { type: "final-leanin"; bg: string; bgZoomed: string; speaker: "도윤"; lines: string[] };

const ASSET = (n: string) => `/saju/doyoon/cut-${n}.png`;

export const DOYOON_CUTS: Cut[] = [
  {
    type: "dialogue",
    bg: ASSET("1"),
    speaker: "도윤",
    lines: [
      "까칠한 조언에 지친 분들께는 제 방식이 가장 완벽한 대안이 되곤 하죠. 잘 오셨습니다.",
      "상처만 후벼 파는 무서운 말보다는 제 논리적이고 정갈한 해답을 듣는 게 당신에게도 훨씬 어울리니까요. 이쪽으로 오시겠어요?",
    ],
  },
  {
    type: "aside",
    bg: ASSET("2"),
    speaker: "강연우",
    lines: ["하-….", "날 놔두고 저쪽을 선택하겠다는 거야? 뭐, 그럴듯한 말이 더 편하면 가.", "나중에 답답해서 울며불며 찾아와도 난 모른다?"],
  },
  {
    type: "dialogue",
    bg: ASSET("3"),
    speaker: "도윤",
    lines: [
      "잘 오셨습니다. 저는 수치로 증명되지 않는 모호한 말은 하지 않거든요.",
      "여기 차 좀 드시면서 긴장 좀 풀어요. 이제부턴 우리끼리 차분하게 대화해 볼까요?",
    ],
  },
  {
    type: "dialogue",
    bg: ASSET("4"),
    speaker: "도윤",
    lines: [
      "가만히 보니...감정 소모보다는 확신이 필요한 상태시군요.",
      "어떻게 해야 이 상황을 본인 의도대로 이끌지 고민하신 흔적이 제게는 다 읽힙니다.",
    ],
  },
  {
    type: "dialogue-closeup",
    bg: ASSET("5"),
    speaker: "도윤",
    lines: ["자, 그럼 이제 막연한 추측 대신 확실한 근거를 확인해 볼까요?"],
  },
  { type: "tablet-handoff", bg: ASSET("6") },
  {
    type: "dialogue",
    bg: ASSET("7"),
    speaker: "도윤",
    lines: [
      "혼자서 수백 번 고민하는 것보다 저와 함께 명확한 방향을 제대로 확인하는 게 훨씬 효율적입니다.",
      "제가 당신의 든든한 조력자가 되어드릴게요.",
      "분석을 시작할 수 있게 당신의 생년월일을 입력해 주시겠어요?",
    ],
  },
  { type: "info-form", bg: ASSET("8") },
  { type: "survey", step: 1 },
  { type: "survey", step: 2 },
  { type: "survey", step: 3 },
  {
    type: "final-leanin",
    bg: ASSET("13"),
    bgZoomed: ASSET("13-zoom"),
    speaker: "도윤",
    lines: [
      "입력하신 데이터는 잘 받았습니다.", 
      "사주 자체가 문제인 경우는 드물어요.", 
      "항상 나쁜 선택을 하게 만드는 변수들이 문제일 뿐.",
      "이제 제가 그 변수들을 완벽하게 정리해 드릴 테니, 오직 제 분석에만 집중해 주시겠습니까? 이보다 더 명확한 가이드는 없을 테니까요.",
    ],
  },
];
