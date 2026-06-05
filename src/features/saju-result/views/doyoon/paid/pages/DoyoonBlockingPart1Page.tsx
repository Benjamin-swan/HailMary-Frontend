import type { PaidChapterP3Doyoon } from "../../../../domain/paidReport";
import { DoyoonAiBlock } from "../components/DoyoonAiBlock";
import { DoyoonBubble } from "../components/DoyoonBubble";
import { DoyoonPageHead } from "../components/DoyoonPageHead";
import {
  DoyoonSLabel,
  DoyoonSTitle,
  DoyoonSection,
} from "../components/DoyoonSection";
import { DOYOON_TOKENS } from "../components/doyoonTokens";

interface DoyoonBlockingPart1PageProps {
  data?: PaidChapterP3Doyoon;
}

// dev/검수 fallback — 임수 + 수 과다 케이스 (원본 도윤_final.html 더미).
const MOCK_P3: PaidChapterP3Doyoon = {
  user_name: "홍길동",
  blockade: {
    ohang_excess: "수",
    ohang_excess_hanja: "水",
    blockade_pct: "상위 15%",
    blockade_multiplier: "평소보다 크게",
  },
  ai_blockade:
    "먼저 흐름부터 짚어드릴게요. 홍길동님의 사주를 보면 수(水) 기운이 유독 강하게 자리 잡고 있어요. " +
    "잠깐 강한 정도가 아니라, 전체 균형을 흔들 만큼 깊게 쌓여 있는 상태예요.\n\n" +
    "이게 새로운 인연이 들어올 자리를 좁혀요. 같은 기운이 이미 가득 차 있으면 비슷한 결의 사람이 들어설 틈이 줄어들거든요. " +
    "같은 일간을 가진 분들 중에서도 수(水)가 강한 경우엔 새 인연이 쉽게 닿지 않는 흐름이 두드러져요. 우연이 아니에요.\n\n" +
    "방법은 의외로 단순해요. 비우는 거예요. 사람이든 미련이든 답 안 오는 연락이든 — 하나만 정리해도 " +
    "새 인연이 들어올 자리가 다시 열려요. 새로 더하기보다 묵은 걸 덜어내는 쪽이 훨씬 가벼워지는 길이에요.",
  blockade_bubble: "정리해보니 보이네요. 홍길동님 사주는 수(水) 기운이 강한 편이에요.",
  patterns: [
    {
      keyword: "처음부터 너무 깊이",
      pct: "81%",
      desc: "첫 한 달 동안 마음을 한꺼번에 쏟아붓는 편이에요.",
    },
    {
      keyword: "중간에 표현이 줄어듦",
      pct: "67%",
      desc: "마음은 그대로인데 말로 드러내는 게 눈에 띄게 줄어들어요.",
    },
    {
      keyword: "쌓였다가 한 번에 터짐",
      pct: "54%",
      desc: "참아둔 감정이 어느 순간 한꺼번에 쏟아져 나오곤 해요.",
    },
  ],
  ai_pattern:
    "홍길동님이 연애에서 되풀이하는 흐름을 3단계로 나눠봤어요.\n\n" +
    "1단계 — 처음부터 너무 깊이 (자주 나타남 81%). 첫 한 달 안에 마음을 거의 다 쏟아붓는 흐름이에요. 다른 분들보다 속도가 빠른 편이에요.\n\n" +
    "2단계 — 중간에 표현이 줄어듦 (자주 나타남 67%). 처음만큼 마음을 드러내지 않게 되는 구간이에요. " +
    "3단계 — 쌓였다가 한 번에 터짐 (자주 나타남 54%). 참아둔 감정이 한꺼번에 쏟아져 나오는 구간이에요.\n\n" +
    "임수 일간이 흔히 보이는 흐름이에요. 다음 관계에서 1단계 속도만 조금 늦춰도 관계가 한결 안정적으로 흘러가요.",
  pattern_bubble: "사람은 바뀌어도 패턴은 잘 안 바뀌어요. 그래서 한 번 짚어두는 게 의미가 있어요.",
  strategies: [
    {
      keyword: "마음 표현 속도 조절하기",
      desc: "한 주에 표현하는 정도를 미리 정해두기. 이 한 가지만 지켜도 한꺼번에 터지는 일이 눈에 띄게 줄어요.",
      effect_pct: "47%",
    },
    {
      keyword: "감정 하루 묵혔다 말하기",
      desc: "마음이 일렁인 직후 말고, 하루 지난 뒤에 표현해보기. 충동적으로 쏟아내는 일이 한결 줄어들어요.",
      effect_pct: "38%",
    },
  ],
  strategy_bubble: "지금 이 글을 읽고 계신다는 것 자체가 이미 다음 연애가 달라진다는 신호예요.",
  sd_avatar_asset: "dy_10",
};


export default function DoyoonBlockingPart1Page({ data }: DoyoonBlockingPart1PageProps) {
  const d = data ?? MOCK_P3;

  return (
    <section
      data-page-idx="3"
      style={{ background: DOYOON_TOKENS.bg, color: DOYOON_TOKENS.text }}
    >
      <DoyoonPageHead
        ch="2"
        hanja="二"
        title="연애를 막는 것 (1/2)"
        sub="막히는 이유 · 되풀이되는 흐름 · 바꿀 수 있는 습관"
      />

      {/* ── 2-1 구조적 원인 분석 ── */}
      <DoyoonSection>
        <DoyoonSLabel>2-1 막히는 이유 들여다보기</DoyoonSLabel>
        <DoyoonSTitle>지금 막혀 있는 정도 — {d.blockade.blockade_pct}.</DoyoonSTitle>

        <BlockadeBigCardDoyoon
          blockade={d.blockade}
        />

        <DoyoonAiBlock body={d.ai_blockade} />

        <DoyoonBubble quote={d.blockade_bubble} />
      </DoyoonSection>

      {/* ── 2-2 반복 실수 패턴 분석 ── */}
      <DoyoonSection>
        <DoyoonSLabel>2-2 되풀이되는 실수 살펴보기</DoyoonSLabel>
        <DoyoonSTitle>자주 나타나는 연애 패턴 탑3.</DoyoonSTitle>

        <CardsGridDoyoon>
          {d.patterns.map((p, i) => (
            <PatternCardDoyoon
              key={i}
              index={i + 1}
              keyword={p.keyword}
              pct={p.pct}
              desc={p.desc}
            />
          ))}
        </CardsGridDoyoon>

        <DoyoonAiBlock body={d.ai_pattern} />

        <DoyoonBubble quote={d.pattern_bubble} />
      </DoyoonSection>

      {/* ── 2-2-1 변수 통제 가능합니다 ── */}
      <DoyoonSection>
        <DoyoonSLabel>2-2-1 충분히 바꿀 수 있어요</DoyoonSLabel>
        <DoyoonSTitle>바로 해볼 수 있는 방법 2가지.</DoyoonSTitle>

        <SdSpotlightDoyoon asset={d.sd_avatar_asset} />

        <CardsGridDoyoon>
          {d.strategies.map((s, i) => (
            <ControlStrategyCardDoyoon
              key={i}
              index={i + 1}
              keyword={s.keyword}
              desc={s.desc}
            />
          ))}
        </CardsGridDoyoon>

        <DoyoonBubble quote={d.strategy_bubble} />
      </DoyoonSection>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════
// P-3 전용 인라인 컴포넌트
// ════════════════════════════════════════════════════════════════════

function CardsGridDoyoon({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="my-3"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: 8,
      }}
    >
      {children}
    </div>
  );
}

// 원본 큰 card-warn (2-1 single full-width card)
function BlockadeBigCardDoyoon({
  blockade,
}: { blockade: PaidChapterP3Doyoon["blockade"] }) {
  return (
    <div
      className="rounded-[10px] px-3.5 py-3.5 my-2"
      style={{
        background: "rgba(212,83,126,0.06)",
        border: "0.5px solid rgba(212,83,126,0.22)",
      }}
    >
      <div
        className="text-[12px] font-semibold mb-2 uppercase"
        style={{ color: DOYOON_TOKENS.pink, letterSpacing: "0.05em" }}
      >
        기운 진단 · 막힌 정도 {blockade.blockade_pct}
      </div>
      <div
        className="text-[16px] font-bold leading-[1.4] mb-2"
        style={{ color: "#7a2f4f", wordBreak: "keep-all" }}
      >
        {blockade.ohang_excess}({blockade.ohang_excess_hanja}) 기운이 너무 강해요
      </div>
      <div
        className="text-[13px] leading-[1.65]"
        style={{ color: "rgba(122,47,79,0.85)", wordBreak: "keep-all" }}
      >
        같은 일간을 가진 분들과 비교해도 이 기운이 유독 강하게 쌓여 있어요.
      </div>
    </div>
  );
}

// 원본 card-warn × 3 (반복 패턴)
function PatternCardDoyoon({
  index,
  keyword,
  pct,
  desc,
}: { index: number; keyword: string; pct: string; desc: string }) {
  return (
    <div
      className="rounded-[10px] px-3 py-3"
      style={{
        background: "rgba(212,83,126,0.06)",
        border: "0.5px solid rgba(212,83,126,0.22)",
      }}
    >
      <div
        className="text-[12px] font-semibold mb-2 uppercase"
        style={{ color: DOYOON_TOKENS.pink, letterSpacing: "0.05em" }}
      >
        패턴 {index} · 자주 나타남 {pct}
      </div>
      <div
        className="text-[14px] font-bold leading-[1.4] mb-1.5"
        style={{ color: "#7a2f4f", wordBreak: "keep-all" }}
      >
        {keyword}
      </div>
      <div
        className="text-[13px] leading-[1.65]"
        style={{ color: "rgba(122,47,79,0.85)", wordBreak: "keep-all" }}
      >
        {desc}
      </div>
    </div>
  );
}

// 원본 card-good × 2 (변수 통제 전략) — 녹색 톤
function ControlStrategyCardDoyoon({
  index,
  keyword,
  desc,
}: { index: number; keyword: string; desc: string }) {
  return (
    <div
      className="rounded-[10px] px-3 py-3"
      style={{
        background: "rgba(75,167,138,0.07)",
        border: "0.5px solid rgba(75,167,138,0.25)",
      }}
    >
      <div
        className="text-[12px] font-semibold mb-2 uppercase"
        style={{ color: "#3a8068", letterSpacing: "0.05em" }}
      >
        해볼 만한 방법 {index}
      </div>
      <div
        className="text-[14px] font-bold leading-[1.4] mb-1.5"
        style={{ color: "#2a604f", wordBreak: "keep-all" }}
      >
        {keyword}
      </div>
      <div
        className="text-[13px] leading-[1.65]"
        style={{ color: "rgba(42,96,79,0.85)", wordBreak: "keep-all" }}
      >
        {desc}
      </div>
    </div>
  );
}

// 원본 sd-spotlight-slot sz-240 (dy_10 — 손바닥 펼침)
function SdSpotlightDoyoon({ asset }: { asset: string }) {
  return (
    <div className="flex justify-center my-3">
      <div
        aria-label={`한도윤 SD — ${asset}`}
        className="bg-no-repeat bg-center bg-contain"
        style={{
          backgroundImage: `url(/doyoon/sd_dy/${asset}.png)`,
          width: 240,
          height: 240,
        }}
      />
    </div>
  );
}
