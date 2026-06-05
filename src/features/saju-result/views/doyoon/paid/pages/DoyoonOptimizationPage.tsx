import type { PaidChapterP9Doyoon } from "../../../../domain/paidReport";
import { DoyoonAiBlock } from "../components/DoyoonAiBlock";
import { DoyoonPageHead } from "../components/DoyoonPageHead";
import { DoyoonSdWithBubble } from "../components/DoyoonSdWithBubble";
import {
  DoyoonSLabel,
  DoyoonSTitle,
  DoyoonSection,
} from "../components/DoyoonSection";
import { DOYOON_TOKENS } from "../components/doyoonTokens";
import { DoyoonPaidStoryCut } from "../components/DoyoonPaidStoryCut";

interface DoyoonOptimizationPageProps {
  data?: PaidChapterP9Doyoon;
}

const MOCK_P9: PaidChapterP9Doyoon = {
  user_name: "홍길동",
  ohang_lack: "수(水)",
  ohang_methods: [
    { label: "보완 방법 1 · 효과 +9%", keyword: "검정·짙은 청색 포인트",
      desc: "수 기운을 색으로 채워주는 방법. 옷차림에서 비율을 조금 늘려보세요." },
    { label: "보완 방법 2 · 효과 +7%", keyword: "북쪽을 가까이",
      desc: "북쪽이 수와 잘 어울리는 방향이에요. 물이 보이는 공간을 살리면 좋아요." },
    { label: "보완 방법 3 · 효과 +7%", keyword: "수영·반신욕",
      desc: "물과 가까이 지내며 채워주는 방법. 주 2회 이상이면 흐름이 한결 잘 잡혀요." },
  ],
  ohang_boost_pct: "23%",
  ai_ohang:
    "임수(壬水) 일간 홍길동님께 수(水)를 채워주는 방법을 카드로 정리해드렸어요. " +
    "세 가지를 함께 챙기시면 인연이 들어올 가능성이 평균 23%만큼 높아져요.\n\n" +
    "보완 방법 1(+9%) 색을 더하는 건 가장 가볍게 시작할 수 있어요. 옷차림 비율을 조금 늘리시는 정도면 돼요. " +
    "방법 2(+7%) 방향을 가까이 두기와 방법 3(+7%) 몸으로 채우기는 시간을 두고 천천히 쌓이는 방법이에요.\n\n" +
    "세 가지를 30일쯤 이어가시면 23%의 변화가 차분히 자리 잡아요. 홍길동님은 효과 +9%인 색 더하기부터 먼저 해보시길 권해드려요.",
  risk_cards: [
    { label: "즉시 · 위험도 81%", tone: "warn", keyword: "정리되지 않은 관계",
      desc: "새 인연이 들어오는 길을 가장 크게 막아요. 하루 안에 한 번 정리해 보세요." },
    { label: "단기 · 위험도 64%", tone: "warn", keyword: "감정적인 순간의 결정",
      desc: "욱하는 순간에 말이 앞서기 쉬워요. 하루 두고 보는 습관이 도움돼요." },
    { label: "중기 · 위험도 47%", tone: "amber", keyword: "반복되는 일상",
      desc: "새로운 사람을 만날 자리가 좁아요. 한 달에 한 번은 낯선 환경에 가보세요." },
  ],
  ai_risk:
    "주의하면 좋을 카드 세 장을 정리해드렸어요. 즉시 81%가 가장 신경 쓰이는 부분이고, 단기 64%, 중기 47% 순서예요. " +
    "위험도 숫자가 그대로 챙기는 순서를 알려줘요.\n\n" +
    "홍길동님, 세 가지를 한꺼번에 다 신경 쓰실 필요는 없어요. " +
    "즉시(81%)부터 하나씩 차근차근 정리하시는 게 가장 좋아요. 숫자 큰 것부터 위에서 아래로 차례대로 보시면 돼요.",
  current_score: 85,
  target_score: 92,
  ai_optimize:
    "85에서 92까지 딱 7점 남았어요. 이 차이는 세 가지에서 생겨요 — 잠깐 멈추기, 시선 안정, 표현 빈도.\n\n" +
    "임수(壬水) 일간은 잠깐 멈추기 하나만 챙겨도 매력이 1.3%씩 살아나요. " +
    "30일 의식해서 해보시면 6~8점은 올라요. 92점을 넘기면 호감을 사는 흐름이 21%만큼 좋아져요.\n\n" +
    "별거 없어요. 그냥 시작하시면 돼요. 분석은 다 끝났어요. 이제 공은 홍길동님한테 있어요.",
  sd_avatar_asset: "dy_06",
  optimize_bubble: "분석은 다 끝났어요. 이제 공은 홍길동님한테 있어요.",
};


export default function DoyoonOptimizationPage({ data }: DoyoonOptimizationPageProps) {
  const d = data ?? MOCK_P9;

  return (
    <section
      data-page-idx="9"
      style={{ background: DOYOON_TOKENS.bg, color: DOYOON_TOKENS.text }}
    >
      <DoyoonPageHead
        ch="6"
        hanja="六"
        title="연애운 끌어올리기 가이드"
        sub="기운 보완 · 리스크 정리"
      />

      {/* ── 6-1 오행 보완 ── */}
      <DoyoonSection>
        <DoyoonSLabel>6-1 오행 보완</DoyoonSLabel>
        <DoyoonSTitle>
          <span style={{ color: DOYOON_TOKENS.pink, fontWeight: 700 }}>{d.ohang_lack}</span>
          {" "}기운을 채우면 인연이 들어올 가능성이 평균 {d.ohang_boost_pct} 높아져요.
        </DoyoonSTitle>

        <div
          className="my-3 grid gap-1.5"
          style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
        >
          {d.ohang_methods.map((m, i) => (
            <CardGoodDoyoon key={i} label={m.label} keyword={m.keyword} desc={m.desc} />
          ))}
        </div>

        <DoyoonAiBlock body={d.ai_ohang} />
      </DoyoonSection>

      {/* ── 6-2 리스크 제거 ── */}
      <DoyoonSection>
        <DoyoonSLabel>6-2 리스크 정리</DoyoonSLabel>
        <DoyoonSTitle>즉시·단기·중기 — 무엇부터 정리하면 좋은지 순서대로.</DoyoonSTitle>

        <div
          className="my-3 grid gap-1.5"
          style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
        >
          {d.risk_cards.map((r, i) => (
            <CardRiskDoyoon key={i} label={r.label} tone={r.tone} keyword={r.keyword} desc={r.desc} />
          ))}
        </div>

        <DoyoonAiBlock body={d.ai_risk} />
      </DoyoonSection>

      {/* ── 6-3 매력 최적화 ── */}
      <DoyoonSection>
        <DoyoonSLabel>6-3 매력 끌어올리기</DoyoonSLabel>
        <DoyoonSTitle>
          지금 → 목표까지 {d.target_score - d.current_score}점 더 끌어올릴 수 있어요.
        </DoyoonSTitle>

        <div className="my-3 space-y-2">
          <ScoreMeterDoyoon name="지금" value={d.current_score} />
          <ScoreMeterDoyoon name="목표" value={d.target_score} />
        </div>

        <DoyoonAiBlock body={d.ai_optimize} />

        <DoyoonSdWithBubble
          sdAsset={d.sd_avatar_asset}
          quote={d.optimize_bubble}
          flow="left"
        />
      </DoyoonSection>

      {/* 10페이지 마지막 컷 페어 — Letter(11P) 진입 직전, 페이드로 자연 연결 */}
      <DoyoonPaidStoryCut
        src="/doyoon/paid-cuts/cut-p10-end-1.png"
        alt="한도윤 — 분석 마무리"
        text={
          <>
            분석은 여기까지예요.<br />
            기운 보완, 리스크 정리, 매력 끌어올리기…<br />
            다 정리해 드렸어요.
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
        src="/doyoon/paid-cuts/cut-p10-end-2.png"
        alt="한도윤 — 마음을 담은 한 통"
        text={
          <>
            마지막은 데이터가 아니라<br />
            제 마음을 담아 {d.user_name}님께<br />
            한 통 남겨뒀어요.
          </>
        }
        fadeTop
        topPad={150}
        bubbleTopPct={3}
        bubbleOffsetY={-65}
        widthPct={88}
      />
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════
// 인라인 컴포넌트
// ════════════════════════════════════════════════════════════════════

function CardGoodDoyoon({ label, keyword, desc }: { label: string; keyword: string; desc: string }) {
  return (
    <div
      className="rounded-[10px] px-2.5 py-2.5 flex flex-col"
      style={{
        background: "rgba(75,167,138,0.08)",
        border: "0.5px solid rgba(75,167,138,0.25)",
      }}
    >
      <div
        className="text-[10px] font-semibold mb-1"
        style={{ color: "#3a8068", letterSpacing: "0.03em", lineHeight: 1.3 }}
      >
        {label}
      </div>
      <div
        className="text-[12px] font-bold mb-1"
        style={{ color: "#2a604f", wordBreak: "keep-all", lineHeight: 1.35 }}
      >
        {keyword}
      </div>
      <div
        className="text-[10.5px]"
        style={{ color: "rgba(42,96,79,0.82)", wordBreak: "keep-all", lineHeight: 1.5 }}
      >
        {desc}
      </div>
    </div>
  );
}

function CardRiskDoyoon({
  label, tone, keyword, desc,
}: { label: string; tone: "warn" | "amber"; keyword: string; desc: string }) {
  const warnColor = "#a32d2d";
  const warnBg = "rgba(220,80,80,0.10)";
  const warnBorder = "rgba(220,80,80,0.30)";
  const amberColor = "#9c6f1f";
  const amberBg = "rgba(212,160,40,0.10)";
  const amberBorder = "rgba(212,160,40,0.30)";
  const color = tone === "warn" ? warnColor : amberColor;
  const bg = tone === "warn" ? warnBg : amberBg;
  const border = tone === "warn" ? warnBorder : amberBorder;
  return (
    <div
      className="rounded-[10px] px-2.5 py-2.5 flex flex-col"
      style={{ background: bg, border: `0.5px solid ${border}` }}
    >
      <div
        className="text-[10px] font-semibold mb-1"
        style={{ color, letterSpacing: "0.03em", lineHeight: 1.3 }}
      >
        {label}
      </div>
      <div
        className="text-[12px] font-bold mb-1"
        style={{ color, wordBreak: "keep-all", lineHeight: 1.35 }}
      >
        {keyword}
      </div>
      <div
        className="text-[10.5px]"
        style={{ color: "rgba(0,0,0,0.72)", wordBreak: "keep-all", lineHeight: 1.5 }}
      >
        {desc}
      </div>
    </div>
  );
}

function ScoreMeterDoyoon({ name, value }: { name: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="text-[13px] font-medium flex-shrink-0"
        style={{ color: DOYOON_TOKENS.textMeta, letterSpacing: "0.02em", width: 88, lineHeight: 1.6 }}
      >
        {name}
      </span>
      <div
        className="flex-1 rounded-full overflow-hidden"
        style={{ height: 10, background: "rgba(139,105,20,0.10)" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${DOYOON_TOKENS.warmGold} 0%, #d4a13a 100%)`,
            transition: "width .35s ease",
          }}
        />
      </div>
      <span
        className="text-[13px] font-bold w-[36px] text-right flex-shrink-0"
        style={{ color: DOYOON_TOKENS.warmGold }}
      >
        {value}
      </span>
    </div>
  );
}
