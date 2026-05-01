import type { HeavenStemHangul } from "./stemDialogues-yeonwoo";

export type RomanceDispositionEntry = {
  line1: string;
  line2: string;
};

export const ROMANCE_DISPOSITION_DIALOGUES: Record<HeavenStemHangul, RomanceDispositionEntry> = {
  갑: {
    line1: "甲木은 끌리면 그 자리에서 다가간다.",
    line2: "상대가 못 따라오는 건 내 잘못이 아니다.",
  },
  을: {
    line1: "乙木은 한 번 잡은 마음을 안 놓는다.",
    line2: "끝난 사이를 며칠 더 들고 다니는 게 자연스럽다.",
  },
  병: {
    line1: "丙火는 처음부터 분위기를 데운다.",
    line2: "시작이 너무 뜨거워서 식는 것도 자연스럽다.",
  },
  정: {
    line1: "丁火는 한 사람한테 전부 쏟는다.",
    line2: "그 사람이 식으면 같이 가라앉는 게 정상이다.",
  },
  무: {
    line1: "戊土는 사귀면 같은 자리에 머문다.",
    line2: "변화 따라가는 속도가 느린 건 내 잘못이 아니다.",
  },
  기: {
    line1: "己土는 상대 얘기를 끝까지 들어준다.",
    line2: "내 서운함을 못 꺼내고 사는 게 당연하다.",
  },
  경: {
    line1: "庚金은 아닌 관계를 그 자리에서 끊는다.",
    line2: "끊고 나서 상대가 흔들리는 건 내 잘못이 아니다.",
  },
  신: {
    line1: "辛金은 디테일에서 마음이 식는다.",
    line2: "긁힌 자존심을 며칠 굴리는 게 자연스럽다.",
  },
  임: {
    line1: "壬水는 감정이 깊고 넘쳐흐른다.",
    line2: "상대가 먼저 질려버리는 건 내 잘못이 아니다.",
  },
  계: {
    line1: "癸水는 좋아한다는 신호를 작게 보낸다.",
    line2: "상대가 못 알아채고 떠나는 건 내 잘못이 아니다.",
  },
};
