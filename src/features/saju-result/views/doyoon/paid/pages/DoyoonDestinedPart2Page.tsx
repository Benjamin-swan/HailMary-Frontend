import type { PaidChapterP7Doyoon } from "../../../../domain/paidReport";
import { DoyoonAiBlock } from "../components/DoyoonAiBlock";
import { DoyoonPageHead } from "../components/DoyoonPageHead";
import { DoyoonSdWithBubble } from "../components/DoyoonSdWithBubble";
import {
  DoyoonSLabel,
  DoyoonSection,
} from "../components/DoyoonSection";
import { DOYOON_TOKENS } from "../components/doyoonTokens";
import { DoyoonPaidStoryCut } from "../components/DoyoonPaidStoryCut";

interface DoyoonDestinedPart2PageProps {
  data?: PaidChapterP7Doyoon;
}

const MOCK_P7: PaidChapterP7Doyoon = {
  user_name: "홍길동",
  scenarios: [
    { prob_label: "소멸 65%", prob_tone: "low", title: "지금 이대로", desc: "둘 다 기다리다 흐지부지됩니다." },
    { prob_label: "좋은 결말 78%", prob_tone: "high", title: "홍길동님이 먼저", desc: "작은 신호 하나로 상대가 반응할 가능성이 높습니다." },
    { prob_label: "좋은 결말 91%", prob_tone: "best", title: "상대가 먼저", desc: "그 신호 놓치지 마세요." },
  ],
  ai_ending:
    "세 갈래로 갈리는 결말, 카드로 정리해드렸어요.\n\n" +
    "첫 번째 길 — 지금 이대로 두면 소멸 65%. 양쪽 모두 멈춰 선 채로 마음이 천천히 식어가는 흐름이에요. " +
    "가장 흔한 결말이지만 그만큼 멀어지기 쉬운 길입니다.\n\n" +
    "두 번째 길 — 홍길동님이 먼저 다가갈 때. 좋은 결말 78%. 제가 가장 권해드리고 싶은 길이에요. " +
    "임수(壬水) 성향을 가진 분들이 먼저 작은 신호를 보낼 때 잘 풀리는 흐름이거든요. " +
    "홍길동님이 직접 정할 수 있다는 점이 가장 중요해요.\n\n" +
    "세 번째 길 — 상대가 먼저 다가올 때. 좋은 결말 91% — 가능성 자체는 가장 높아요. " +
    "다만 상대가 움직이기를 기다려야 하는 길이라, 그만큼 시간이 더 걸립니다.\n\n" +
    "홍길동님, 결정은 온전히 본인 몫이에요. 다만 한 가지만 짚어드리면 — 78%는 홍길동님이 지금 바로 움직일 수 있는 길이고, " +
    "91%는 기다림 위에 놓인 길이에요. 저는 먼저 다가가는 쪽을 권해드릴게요.",
  sd_avatar_asset: "dy_05",
  ending_bubble: "홍길동님이 먼저 움직이는 게 제일 안전한 선택이에요. 데이터가 그렇게 나왔어요.",
};


export default function DoyoonDestinedPart2Page({ data }: DoyoonDestinedPart2PageProps) {
  const d = data ?? MOCK_P7;

  return (
    <section
      data-page-idx="7"
      style={{ background: DOYOON_TOKENS.bg, color: DOYOON_TOKENS.text }}
    >
      <DoyoonPageHead
        ch="4"
        hanja="四"
        title="운명의 짝 · 결말 (2/2)"
        sub="궁합 지수 · 심리 분석"
      />

      <DoyoonSection>
        <DoyoonSLabel>4-3 결말 예측 시나리오</DoyoonSLabel>

        <NoticeDoyoon
          icon="📊"
          text={`지금 흐름에서 예상되는 결말은 크게 3가지예요. ${d.user_name}님이 어떻게 움직이느냐에 따라 길이 갈립니다.`}
        />

        <div
          className="my-3 grid gap-1.5"
          style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
        >
          {d.scenarios.map((s, i) => (
            <ScenarioCardComp
              key={i}
              probLabel={s.prob_label}
              probTone={s.prob_tone}
              title={s.title}
              desc={s.desc}
              recommend={i === 1}
            />
          ))}
        </div>

        <DoyoonAiBlock body={d.ai_ending} />

        <DoyoonSdWithBubble
          sdAsset={d.sd_avatar_asset}
          quote={d.ending_bubble}
          flow="right"
        />
      </DoyoonSection>

      {/* 8페이지 마지막 컷 페어 — Timing(9P) 진입 직전, 페이드로 자연 연결 */}
      <DoyoonPaidStoryCut
        src="/doyoon/paid-cuts/cut-p8-end-1.png"
        alt="한도윤 — 가장 잘 맞는 사람 데이터"
        text={
          <>
            {d.user_name}님과 가장 잘 맞는 사람 데이터<br />… 어떤 사람인지 그려지세요?
          </>
        }
        fadeTop
        fadeBottom
        topPad={160}
        bottomPad={20}
        bubbleTopPct={3}
        bubbleOffsetY={-60}
        widthPct={92}
      />
      <DoyoonPaidStoryCut
        src="/doyoon/paid-cuts/cut-p8-end-2.png"
        alt="한도윤 — 12개월 확률 분포"
        text={
          <>
            사람만 봐선 모자라요.<br />
            시점에 따라 결과가 달라지거든요.<br />
            12개월 분포, 보여드릴게요.
          </>
        }
        fadeTop
        topPad={150}
        bubbleTopPct={3}
        bubbleOffsetY={-95}
        widthPct={88}
      />
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════
// 인라인 컴포넌트
// ════════════════════════════════════════════════════════════════════

function NoticeDoyoon({ icon, text }: { icon: string; text: string }) {
  return (
    <div
      className="my-3 rounded-[10px] px-3 py-2.5 flex items-start gap-2.5"
      style={{
        background: "rgba(74,130,180,0.08)",
        border: "0.5px solid rgba(74,130,180,0.30)",
      }}
    >
      <span className="text-[16px] flex-shrink-0" aria-hidden>
        {icon}
      </span>
      <span
        className="text-[12px] flex-1"
        style={{ color: DOYOON_TOKENS.text, lineHeight: 1.6, wordBreak: "keep-all" }}
      >
        {text}
      </span>
    </div>
  );
}

function ScenarioCardComp({
  probLabel,
  probTone,
  title,
  desc,
  recommend,
}: {
  probLabel: string;
  probTone: "low" | "high" | "best";
  title: string;
  desc: string;
  recommend: boolean;
}) {
  // 원본 도윤_final.html .sc-low / .sc-high / .sc-best 토큰 매핑
  const toneColor: Record<"low" | "high" | "best", string> = {
    low: "#a32d2d",      // sc-low
    high: DOYOON_TOKENS.warmGold,  // sc-high (warm-gold)
    best: "#1D9E75",     // sc-best
  };
  const toneBg: Record<"low" | "high" | "best", string> = {
    low: "rgba(220,80,80,0.10)",
    high: "rgba(139,105,20,0.12)",
    best: "rgba(29,158,117,0.12)",
  };

  const frameAsset = recommend
    ? "/doyoon/dy_sub/scenario_card_frame_recommend_dy.png"
    : "/doyoon/dy_sub/scenario_card_frame.png";

  return (
    <div
      className="flex flex-col items-center text-center"
      style={{
        background: `#fff8ec url(${frameAsset}) no-repeat center center / 100% 100%`,
        padding: "12px 10px",
        minHeight: 145,
      }}
    >
      <span
        className="font-bold inline-block mb-1.5"
        style={{
          background: toneBg[probTone],
          color: toneColor[probTone],
          fontSize: 11,
          padding: "2px 6px",
          borderRadius: 8,
          letterSpacing: "0.02em",
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {probLabel}
      </span>
      <div
        className="font-bold mb-1"
        style={{
          color: DOYOON_TOKENS.text,
          fontSize: 12,
          wordBreak: "keep-all",
          lineHeight: 1.35,
        }}
      >
        {title}
      </div>
      <div
        style={{
          color: DOYOON_TOKENS.textMeta,
          fontSize: 11,
          wordBreak: "keep-all",
          lineHeight: 1.5,
        }}
      >
        {desc}
      </div>
    </div>
  );
}
