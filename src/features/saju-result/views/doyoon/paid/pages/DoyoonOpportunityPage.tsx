import type { PaidChapterP8Doyoon } from "../../../../domain/paidReport";
import { DoyoonAiBlock } from "../components/DoyoonAiBlock";
import { DoyoonPageHead } from "../components/DoyoonPageHead";
import {
  DoyoonSection,
} from "../components/DoyoonSection";
import { DOYOON_TOKENS } from "../components/doyoonTokens";

interface DoyoonOpportunityPageProps {
  data?: PaidChapterP8Doyoon;
}

const MOCK_P8: PaidChapterP8Doyoon = {
  user_name: "홍길동",
  months: [
    { label: "5월 (이번달)", hearts: 2, pct: 35, state: "시작", desc: "이번 달부터 흐름이 슬슬 움직이기 시작해요. 큰 변화는 없지만 분위기가 조금씩 달라져요.", is_peak: false },
    { label: "6월", hearts: 3, pct: 50, state: "진입", desc: "인연의 흐름이 빠르게 차오르는 시기예요. 다가오는 신호를 놓치지 않도록 마음을 열어두세요.", is_peak: false },
    { label: "7월", hearts: 4, pct: 65, state: "상승", desc: "새 인연을 만날 가능성이 차오르는 때예요. 자주 마주치는 사람이 인연으로 이어지는 경우가 많아요.", is_peak: false },
    { label: "8월", hearts: 5, pct: 78, state: "피크", desc: "한 해 중 흐름이 가장 도드라지는 때예요. 이 시기엔 마음을 솔직하게 표현할수록 잘 통해요.", is_peak: true },
    { label: "9월", hearts: 4, pct: 70, state: "심화", desc: "관계가 한 걸음 더 깊어지는 때예요. 상대의 속도를 존중하며 가는 게 좋아요.", is_peak: false },
    { label: "10월", hearts: 3, pct: 55, state: "안정", desc: "관계가 차분하게 자리를 잡는 때예요. 지금 흐름을 그대로 이어가는 게 가장 좋아요.", is_peak: false },
    { label: "11월", hearts: 2, pct: 42, state: "정체", desc: "잠시 흐름이 잔잔해지는 때예요. 조급하게 밀어붙이면 오히려 어긋나기 쉬워요.", is_peak: false },
    { label: "12월", hearts: 3, pct: 55, state: "상승", desc: "새로운 환경에 발을 들이기 좋은 때예요. 동선을 조금 바꾸면 새 인연의 계기가 다시 생겨요.", is_peak: false },
    { label: "'27. 1월", hearts: 5, pct: 82, state: "2차 피크", desc: "해가 바뀌며 흐름이 다시 한 번 도드라지는 때예요. 마음을 분명하게 표현하는 게 중요해요.", is_peak: true },
    { label: "'27. 2월", hearts: 4, pct: 68, state: "심화", desc: "관계가 차분히 안정되는 때예요. 약속을 한결같이 지키는 모습이 신뢰를 가장 크게 키워요.", is_peak: false },
    { label: "'27. 3월", hearts: 2, pct: 38, state: "정체", desc: "마음을 차분히 정리하기 좋은 때예요. 다음 흐름으로 들어서기 위한 충전 시기로 보세요.", is_peak: false },
    { label: "'27. 4월", hearts: 4, pct: 65, state: "1년차 마무리", desc: "1년의 흐름이 마무리되는 때예요. 솔직한 표현이 다음 흐름을 여는 열쇠가 돼요.", is_peak: false },
  ],
  ai_intro:
    "앞으로 1년, 새 인연이 들어오기 좋은 시기를 달별로 정리해드릴게요. 이번 달부터 1년이에요.\n\n" +
    "1년 중에서 인연의 흐름이 특히 도드라지는 시기가 두 번 있어요. 8월과 '27. 1월. 이 두 달은 새 인연을 만날 가능성이 한 해 중 가장 크게 올라가는 때예요. " +
    "그 사이 시기는 마음을 차분히 정리하고 자신을 가다듬으며 다음을 준비하기 좋은 때고요.\n\n" +
    "임수(壬水) 일간은 흐름을 억지로 거스를수록 오히려 지치기 쉬워요. " +
    "좋은 시기엔 마음을 적극적으로 내고, 잔잔한 시기엔 자신을 차분히 가다듬는 게 가장 잘 맞아요.",
  sd_avatar_asset: "dy_04",
  bubble: "이 시기에 새 인연을 만날 가능성이 가장 크게 올라가요.",
};


export default function DoyoonOpportunityPage({ data }: DoyoonOpportunityPageProps) {
  const d = data ?? MOCK_P8;

  return (
    <section
      data-page-idx="8"
      style={{ background: DOYOON_TOKENS.bg, color: DOYOON_TOKENS.text }}
    >
      <DoyoonPageHead
        ch="5"
        hanja="五"
        title="인연이 오는 시간"
        sub="월별 접촉 확률 · 피크 구간"
      />

      <DoyoonSection>
        <SdSpotlightDy04 asset={d.sd_avatar_asset} />

        <DoyoonAiBlock body={d.ai_intro} />

        <ScrollFrameTimelineDoyoon months={d.months} />

        <BubbleOnlyDoyoon quote={d.bubble} />
      </DoyoonSection>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════
// 인라인 컴포넌트
// ════════════════════════════════════════════════════════════════════

function SdSpotlightDy04({ asset }: { asset: string }) {
  return (
    <div className="flex justify-center my-3">
      <div
        aria-label={`한도윤 — 12개월 인연 흐름 / ${asset}`}
        style={{
          width: 260,
          height: 260,
          backgroundImage: `url(/doyoon/sd_dy/${asset}.png)`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}

function ScrollFrameTimelineDoyoon({
  months,
}: {
  months: ReadonlyArray<{
    label: string;
    hearts: number;
    pct: number;
    state: string;
    desc: string;
    is_peak: boolean;
  }>;
}) {
  return (
    <div
      role="figure"
      aria-label="12개월 인연 흐름 두루마리"
      className="my-3 mx-auto relative w-full"
      style={{
        background:
          "url(/doyoon/dy_sub/scroll_full_dy.png) no-repeat center / 100% 100%",
        aspectRatio: "724 / 2536",
        padding: "53% 19% 46% 19%",
        boxSizing: "border-box",
        overflow: "hidden",
        maxWidth: 430,
      }}
    >
      <div className="flex flex-col gap-1" style={{ height: "100%" }}>
        {months.map((m, i) => (
          <TimelineRowDoyoon key={i} {...m} />
        ))}
      </div>
    </div>
  );
}

function TimelineRowDoyoon({
  label,
  hearts,
  pct,
  desc,
  is_peak,
}: {
  label: string;
  hearts: number;
  pct: number;
  state: string;
  desc: string;
  is_peak: boolean;
}) {
  return (
    <div
      className="rounded-[8px] px-2.5 py-2"
      style={{
        background: is_peak ? "rgba(212,83,126,0.08)" : "transparent",
        borderBottom: is_peak ? "none" : "0.5px dashed rgba(139,105,20,0.18)",
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="text-[12px] flex-shrink-0"
          style={{
            color: is_peak ? DOYOON_TOKENS.pink : DOYOON_TOKENS.text,
            fontWeight: is_peak ? 700 : 600,
            width: 78,
            letterSpacing: "0.02em",
          }}
        >
          {label}
        </span>
        <span className="flex-1 flex gap-[1px]" aria-label={`hearts ${hearts}/5`}>
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              style={{
                fontSize: 13,
                color: n <= hearts
                  ? (is_peak ? DOYOON_TOKENS.pink : DOYOON_TOKENS.warmGold)
                  : "rgba(139,105,20,0.20)",
                lineHeight: 1,
              }}
            >
              {n <= hearts ? "♥" : "♡"}
            </span>
          ))}
        </span>
        <span
          className="text-[12px] font-bold flex-shrink-0"
          style={{
            color: is_peak ? DOYOON_TOKENS.pink : DOYOON_TOKENS.warmGold,
            width: 30,
            textAlign: "right",
          }}
        >
          {pct}%
        </span>
      </div>
      <p
        className="text-[11px] mt-1"
        style={{
          color: is_peak ? DOYOON_TOKENS.pink : DOYOON_TOKENS.textMeta,
          wordBreak: "keep-all",
          lineHeight: 1.55,
        }}
      >
        {desc}
      </p>
    </div>
  );
}

function BubbleOnlyDoyoon({ quote }: { quote: string }) {
  return (
    <div
      className="my-3 rounded-[12px] px-3.5 py-3"
      style={{
        background: "rgba(212,83,126,0.06)",
        border: "0.5px solid rgba(212,83,126,0.22)",
      }}
    >
      <div
        className="text-[12px] font-semibold mb-1.5"
        style={{ color: DOYOON_TOKENS.pink, letterSpacing: "0.03em" }}
      >
        한도윤
      </div>
      <div
        className="text-[14px]"
        style={{ color: DOYOON_TOKENS.text, lineHeight: 1.75, wordBreak: "keep-all" }}
      >
        "{quote}"
      </div>
    </div>
  );
}
