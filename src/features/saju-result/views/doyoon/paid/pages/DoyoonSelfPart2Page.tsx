import type { PaidChapterP2Doyoon } from "../../../../domain/paidReport";
import { DoyoonAiBlock } from "../components/DoyoonAiBlock";
import { DoyoonPageHead } from "../components/DoyoonPageHead";
import {
  DoyoonSBody,
  DoyoonSLabel,
  DoyoonSTitle,
  DoyoonSection,
} from "../components/DoyoonSection";
import { DoyoonSdWithBubble } from "../components/DoyoonSdWithBubble";
import { DOYOON_TOKENS } from "../components/doyoonTokens";
import { DoyoonPaidStoryCut } from "../components/DoyoonPaidStoryCut";

interface DoyoonSelfPart2PageProps {
  data?: PaidChapterP2Doyoon;
}

// dev/검수 fallback — 임수 셀 (원본 도윤_final.html 더미 그대로).
const MOCK_P2: PaidChapterP2Doyoon = {
  user_name: "홍길동",
  hurt_type_1: {
    keyword: "무관심 신호 인지",
    risk_pct: "78%",
    desc: "동일 일간 표본 78%가 이 신호에서 가장 큰 감정 손실을 보고했습니다.",
  },
  hurt_type_2: {
    keyword: "의도 미독해",
    risk_pct: "64%",
    desc: "표현하지 않은 마음을 알아주길 기대하는 경향, 평균 대비 1.4배입니다.",
  },
  ai_hurt:
    "이별 상황에서 홍길동님이 가장 크게 흔들리기 쉬운 두 가지를 짚어드릴게요. " +
    "임수(壬水) 일간을 가진 분들에게 자주 보이는 결이에요.\n\n" +
    "첫 번째는 무관심 신호 인지예요. 상대가 잠깐 답이 늦거나 톤이 낮아진 것만으로도 " +
    "홍길동님은 그걸 거리감으로 받아들이기 쉬워요.\n\n" +
    "두 번째는 의도 미독해예요. 말로 꺼내지 않은 마음을 상대가 알아주길 기다리는 편이에요.\n\n" +
    "두 가지 모두 조금만 의식하면 스스로 다잡을 수 있어요. 상대의 말이나 행동이 신경 쓰일 때 " +
    "바로 결론 내리지 말고 하루 정도 시간을 두고 다시 보면, 두 흐름 다 한결 가벼워져요. 조금만 의식해보세요.",
  meters: [
    { label: "직후", pct: 20 },
    { label: "1개월", pct: 40 },
    { label: "3개월", pct: 65 },
    { label: "6개월", pct: 90 },
  ],
  recovery_lag_multiplier: "1.4배",
  ai_recovery:
    "이별 후 마음이 어떻게 가라앉는지 정리해 드릴게요. 임수(壬水) 일간을 가진 분들의 평균적인 회복 흐름이에요.\n\n" +
    "헤어진 직후 한 주는 감정이 거의 그대로 남아 있어요. 한 달이 지나야 조금씩 가라앉기 시작하는데, " +
    "보통 다른 일간이 절반쯤 가벼워지는 시점에도 홍길동님은 마음이 더 오래 머물러요. 세 달쯤 돼야 비로소 한결 옅어집니다.\n\n" +
    "평균보다 회복이 느린 편이지만, 이건 약점이 아니에요. 홍길동님은 깊게 느끼고 한 번에 정리하는 사람이라, " +
    "빨리 잊는 사람보다 같은 아픔이 다시 도질 일이 훨씬 적어요.\n\n" +
    "다만 그 세 달 동안 새 관계를 서두르면 부딪히기 쉬워요. 아직 마음이 다 정리되기 전이라서요. " +
    "세 달은 비워두시는 게 가장 편안해요. 그 다음에 새 사람을 받아들이면 한결 깔끔합니다.",
  sd_avatar_asset: "dy_03",
  recovery_bubble: "3개월 지나고 한 달만 더 쉬세요. 그게 다음 사람한테 공평한 거예요.",
};


export default function DoyoonSelfPart2Page({ data }: DoyoonSelfPart2PageProps) {
  const d = data ?? MOCK_P2;

  return (
    <section
      data-page-idx="2"
      style={{ background: DOYOON_TOKENS.bg, color: DOYOON_TOKENS.text }}
    >
      <DoyoonPageHead
        ch="1"
        hanja="一"
        title={`${d.user_name}님이라는 사람 (2/2)`}
        sub="연애 성향 · 감정 구조 · 매력 분석"
      />

      {/* ── 1-4 취약 구간 분석 ── */}
      <DoyoonSection>
        <DoyoonSLabel>1-4 이별 상황에서 흔들리기 쉬운 지점</DoyoonSLabel>
        <DoyoonSTitle>이별할 때 마음이 가장 크게 흔들리는 두 가지예요.</DoyoonSTitle>

        <CardsGridDoyoon>
          <HurtCardDoyoon
            index={1}
            risk_pct={d.hurt_type_1.risk_pct}
            keyword={d.hurt_type_1.keyword}
            desc={d.hurt_type_1.desc}
          />
          <HurtCardDoyoon
            index={2}
            risk_pct={d.hurt_type_2.risk_pct}
            keyword={d.hurt_type_2.keyword}
            desc={d.hurt_type_2.desc}
          />
        </CardsGridDoyoon>

        <DoyoonAiBlock body={d.ai_hurt} />
      </DoyoonSection>

      {/* ── 1-5 회복 타임라인 분석 ── */}
      <DoyoonSection>
        <DoyoonSLabel>1-5 이별 후 회복 타임라인</DoyoonSLabel>
        <DoyoonSTitle>이별 후 단계별 회복 흐름 — 평균 곡선보다 {d.recovery_lag_multiplier} 더디게.</DoyoonSTitle>
        <DoyoonSBody>헤어진 직후부터 여섯 달까지, 마음이 가라앉는 흐름을 네 단계로 나눠봤어요.</DoyoonSBody>

        <div className="my-3 space-y-2">
          {d.meters.map((m) => (
            <MeterBarDoyoon key={m.label} label={m.label} pct={m.pct} />
          ))}
        </div>

        <DoyoonAiBlock body={d.ai_recovery} />

        <DoyoonSdWithBubble
          sdAsset={d.sd_avatar_asset}
          quote={d.recovery_bubble}
          flow="right"
        />
      </DoyoonSection>

      {/* 3페이지 마지막 컷 페어 — Blocking(4P) 진입 직전. 페이드로 자연 연결 */}
      <DoyoonPaidStoryCut
        src="/doyoon/paid-cuts/cut-p3-end-1.png"
        alt="한도윤 — 1차 분석 마쳤어요"
        text={
          <>
            {d.user_name}님 데이터, 1차 분석 마쳤어요.<br />… 어때요, 본인 같으세요?
          </>
        }
        fadeTop
        fadeBottom
        topPad={130}
        bottomPad={20}
        bubbleTopPct={3}
        bubbleOffsetY={-30}
        widthPct={84}
      />
      <DoyoonPaidStoryCut
        src="/doyoon/paid-cuts/cut-p3-end-2.png"
        alt="한도윤 — 다른 데이터를 보죠"
        text={
          <>
            이번엔 다른 데이터를 보죠.<br />
            {d.user_name}님 연애를 자꾸 무너뜨리는 원인이 따로 있어요.
          </>
        }
        fadeTop
        topPad={100}
        bubbleTopPct={3}
        bubbleOffsetY={-60}
      />
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════
// P-2 전용 인라인 컴포넌트 (원본 도윤_final.html .card-warn / .meter 매핑)
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

// 원본 .card-warn 매핑 — 부드러운 핑크/베이지 톤 (라이트 모드)
function HurtCardDoyoon({
  index,
  risk_pct,
  keyword,
  desc,
}: { index: number; risk_pct: string; keyword: string; desc: string }) {
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
        흔들림 {index} · 민감도 {risk_pct}
      </div>
      <div
        className="text-[15px] font-bold leading-[1.4] mb-1.5"
        style={{ color: "#7a2f4f", wordBreak: "keep-all" }}
      >
        {keyword}
      </div>
      <div
        className="text-[13px] leading-[1.65]"
        style={{
          color: "rgba(122,47,79,0.85)",
          wordBreak: "keep-all",
        }}
      >
        {desc}
      </div>
    </div>
  );
}

// 원본 .meter / .meter-track-dy / .meter-fill-dy 매핑 — 수평 진행바
function MeterBarDoyoon({ label, pct }: { label: string; pct: number }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="text-[13px] font-medium w-[48px] flex-shrink-0"
        style={{ color: DOYOON_TOKENS.textMeta, letterSpacing: "0.02em" }}
      >
        {label}
      </span>
      <div
        className="flex-1 rounded-full overflow-hidden"
        style={{
          height: 10,
          background: "rgba(139,105,20,0.10)",
        }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${DOYOON_TOKENS.warmGold} 0%, #d4a13a 100%)`,
            transition: "width .35s ease",
          }}
        />
      </div>
      <span
        className="text-[13px] font-semibold w-[40px] text-right flex-shrink-0"
        style={{ color: DOYOON_TOKENS.warmGold }}
      >
        {pct}%
      </span>
    </div>
  );
}
