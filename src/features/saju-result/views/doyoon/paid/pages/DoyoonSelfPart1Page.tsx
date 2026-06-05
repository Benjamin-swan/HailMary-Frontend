import type { PaidChapterP1Doyoon } from "../../../../domain/paidReport";
import { DoyoonAiBlock } from "../components/DoyoonAiBlock";
import { DoyoonBubble } from "../components/DoyoonBubble";
import { DoyoonLineChartEmotion } from "../components/DoyoonLineChartEmotion";
import { DoyoonPageHead } from "../components/DoyoonPageHead";
import { DoyoonPctBadge } from "../components/DoyoonPctBadge";
import { DoyoonSdWithBubble } from "../components/DoyoonSdWithBubble";
import {
  DoyoonSLabel,
  DoyoonSTitle,
  DoyoonSection,
} from "../components/DoyoonSection";
import { DoyoonTriggerFlow } from "../components/DoyoonTriggerFlow";
import { DoyoonVarTag } from "../components/DoyoonVarTag";
import { DOYOON_TOKENS } from "../components/doyoonTokens";

interface DoyoonSelfPart1PageProps {
  data?: PaidChapterP1Doyoon;
}

// dev/미리보기 fallback — 백엔드 응답 없을 때 임수 더미 (HTML 매칭)
const MOCK_P1: PaidChapterP1Doyoon = {
  user_name: "홍길동",
  ilgan: "임수(壬水)",
  ilju: "임술(壬戌)",
  love_type: "생각이 깊은 신중한 사람",
  pct_value: 8,
  distribution_pct: 12.4,
  ai_opening:
    "솔직히 말씀드릴게요. 홍길동님은 상위 8%에 드는 분이에요. 그냥 듣기 좋으라고 드리는 말이 아니에요. 같은 일간 안에서 이런 결이 이렇게 또렷하게 보이는 일이 흔치 않거든요.\n\n임수 일간이 전체 중에서 12.4% 정도인데, 그중에서도 '생각이 깊은 신중한 사람'에 해당하는 분은 더 적어요. 여기에 임술(壬戌) 일주까지 더하면 결이 한층 더 또렷해집니다.\n\n특징을 정리하면 — 마음의 깊이는 있는데 표현이 그만큼 따라가질 않아요. 속으로 생각은 많이 하시는데, 밖으로 꺼내 보이는 건 평소보다 한참 적은 편이에요.\n\n딱 하나만 바꿔보세요. 표현 빈도를 주 1회만 의식적으로 늘려보시면, 주변에서 홍길동님을 읽는 방식이 꽤 달라질 거예요.",
  trigger_1: "대화가 잘 통하는 느낌",
  trigger_2: "답장이 빨리 오가는 흐름",
  trigger_3: "자연스럽게 가까워지는 거리",
  trigger_flow_pcts: [30, 62, 88],
  ai_trigger:
    "흥미로운 부분이에요. 마음을 흔드는 신호 세 가지가 차례로 겹치면, 거기까지 가는 경우가 88%예요. 사실상 거의 정해진 흐름이라는 뜻이죠.\n\n특히 처음 30일 안에 '대화가 잘 통하는 느낌'과 '답장이 빨리 오가는 흐름'이 같이 찾아오면, 홍길동님이 스스로 속도를 늦추기가 어려워져요. 임수 일간은 이 시기에 마음을 다잡는 분이 17% 정도거든요. 생각이 많은 편이라 한 번 빠지면 거기서 헤어 나오는 데 시간이 더 걸려요. 미리 알고 들어가시는 게 훨씬 나아요.",
  emotion_curve: [
    { label: "초반", pct: 45, is_crisis: false },
    { label: "중반", pct: 85, is_crisis: false },
    { label: "위기", pct: 95, is_crisis: true },
    { label: "회복", pct: 60, is_crisis: false },
  ],
  crisis_multiplier: "평소보다 훨씬 크게",
  ai_emotion:
    "그래프 보시면 느끼시겠지만, 힘든 시기에 마음이 95%까지 출렁여요. 평소보다 훨씬 크게 흔들리는 셈이에요. 회복도 60% 수준에서 한참 머물러요.\n\n임수 일간이 원래 이래요. 처음엔 무척 차분해 보이다가 어느 순간 마음이 한꺼번에 쏟아지곤 해요. 가라앉아 회복하는 시기도 평소보다 깊고 길어요.\n\n마음을 미리 조금씩 꺼내두면 그 흔들림이 줄어요. 작은 표현이라도 주 2회 이상 꾸준히 해보시면 힘든 시기의 흔들림이 32%만큼 잦아들어요. 어렵게 생각하지 마시고, 그냥 작은 표현을 자주 하시면 돼요.",
  bubble_quote: "이거 알고 계신 것만으로도 달라져요. 진짜로요.",
};

export default function DoyoonSelfPart1Page({ data }: DoyoonSelfPart1PageProps) {
  const d = data ?? MOCK_P1;

  return (
    <section
      data-page-idx="1"
      style={{ background: DOYOON_TOKENS.bg, color: DOYOON_TOKENS.text }}
    >
      <DoyoonPageHead
        ch="1"
        hanja="一"
        title={
          <>
            <DoyoonVarTag>{d.user_name}</DoyoonVarTag>님이라는 사람 (1/2)
          </>
        }
        sub="연애 성향 · 감정 구조 · 매력 분석"
      />

      {/* 1-1 나의 연애 유형 */}
      <DoyoonSection>
        <DoyoonSLabel>1-1 나의 연애 유형</DoyoonSLabel>
        <div className="my-2">
          <DoyoonPctBadge pct={d.pct_value} />
        </div>
        <DoyoonSTitle>
          <DoyoonVarTag>{d.love_type}</DoyoonVarTag>
        </DoyoonSTitle>

        {/* 일간 기준 카드 */}
        <div
          className="rounded-lg my-2"
          style={{
            background: "#fff8ec",
            border: "0.5px solid rgba(139,105,20,0.22)",
            padding: "11px 12px",
          }}
        >
          <div
            className="text-[12px] font-bold uppercase"
            style={{ color: DOYOON_TOKENS.warmGold, letterSpacing: "0.08em" }}
          >
            일간 기준
          </div>
          <div
            className="text-[14px] font-bold mt-1"
            style={{ color: DOYOON_TOKENS.text }}
          >
            <DoyoonVarTag>{d.ilgan}</DoyoonVarTag> · <DoyoonVarTag>{d.ilju}</DoyoonVarTag>
          </div>
          <div
            className="text-[13px] mt-1 leading-[1.6]"
            style={{ color: DOYOON_TOKENS.textMeta }}
          >
            같은 {d.ilgan} 일간을 본 분들 중에서도, 같은 연애 결을 가진 분은 위에서 {d.pct_value}%에 듭니다.
          </div>
        </div>

        <DoyoonAiBlock body={d.ai_opening} />

        <DoyoonSdWithBubble
          sdAsset="dy_02"
          ariaLabel="한도윤 SD — 유형 분석"
          quote={`정리해 보니, ${d.user_name}님은 ${d.love_type}이에요 — 이게 나쁜 게 아니라, 알고 쓰면 꽤 강한 강점이라는 얘기예요.`}
          size="md"
        />
      </DoyoonSection>

      {/* 1-2 감정이 시작되는 과정 */}
      <DoyoonSection>
        <DoyoonSLabel>1-2 감정이 시작되는 과정</DoyoonSLabel>
        <DoyoonSTitle>마음을 흔드는 신호 세 가지가 차례로 겹치면 마음이 빠르게 기웁니다.</DoyoonSTitle>
        <DoyoonTriggerFlow
          triggers={[d.trigger_1, d.trigger_2, d.trigger_3]}
          flowPcts={d.trigger_flow_pcts}
        />
        <DoyoonAiBlock body={d.ai_trigger} />
      </DoyoonSection>

      {/* 1-3 연애할 때 감정이 출렁이는 정도 */}
      <DoyoonSection>
        <DoyoonSLabel>1-3 연애할 때 감정이 출렁이는 정도</DoyoonSLabel>
        <DoyoonSTitle>
          힘든 시기에는 감정이 {d.crisis_multiplier} 출렁입니다.
        </DoyoonSTitle>
        <DoyoonLineChartEmotion
          points={d.emotion_curve}
          caption={`힘든 시기 감정 출렁임 — ${d.crisis_multiplier}`}
        />
        <DoyoonAiBlock body={d.ai_emotion} />
        <DoyoonBubble quote={d.bubble_quote} />
      </DoyoonSection>
    </section>
  );
}
