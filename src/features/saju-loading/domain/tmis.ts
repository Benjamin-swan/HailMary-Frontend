import type { LoadingTmi } from "./types";

const ASSET = (n: string) => `/saju/loading/${n}.png`;

export const LOADING_TMIS: LoadingTmi[] = [
  {
    bg: ASSET("corridor"),
    line:
      "두 사람이 서로 반대 방향으로 지나가지만, 연우는 시선을 정면으로 고정한 채 못 본 척 지나가고, 도윤은 옅은 미소를 띤 채 걸어갑니다.",
  },
  {
    bg: ASSET("talk-first"),
    line:
      "도윤이가 먼저 연우에게 말을 거는 횟수가 연우보다 많습니다. 대부분은 연우가 못 본 척 지나치려는 것을 도윤이가 굳이 막아서서 말을 걸기 때문입니다.",
  },
  {
    bg: ASSET("fridge"),
    line:
      "도윤은 몸에 안 좋다며 잔소리를 하면서도, 연우가 사레들리지 않게 조용히 물컵을 채워줍니다.",
  },
  {
    bg: ASSET("sofa"),
    line:
      "연우의 신안은 기력을 많이 소모하다보니 상담 후엔 어디서든 잠듭니다. 도윤은 그런 연우를 곁에서 지킵니다.",
  },
  {
    bg: ASSET("courtyard"),
    line:
      "연우는 해가 지면 음기(陰氣)가 강해진다며 마당을 맴돌지만, 도윤의 시선은 노을이 아니라 줄곧 연우를 향해 있습니다.",
  },
  {
    bg: ASSET("coffee"),
    line:
      "도윤은 연우가 커피 때문에 제 발로 찾아올 것을 이미 예측하고 있습니다. 연우가 오기 5분 전, 항상 연우가 좋아하는 원두로 미리 세팅해 둡니다.",
  },
  {
    bg: ASSET("bookshelf"),
    line:
      "도윤은 책을 빌린다는 핑계로 연우의 방에 머무는 시간을 늘려가고 있습니다. 연우가 피우는 향 냄새를 은근히 즐기기 때문입니다.",
  },
  {
    bg: ASSET("rainy"),
    line:
      "연우는 빗물이 씻어내리는 부정한 기운을 느끼는 중이고, 도윤은 비 때문에 연우가 감기에 걸릴 확률을 계산 중입니다. 물론 겉으로는 둘 다 아무 말도 안 합니다.",
  },
];

export function shuffleLoadingTmis(): LoadingTmi[] {
  const a = [...LOADING_TMIS];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
