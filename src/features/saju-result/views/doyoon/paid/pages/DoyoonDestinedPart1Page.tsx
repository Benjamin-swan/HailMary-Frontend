import type { PaidChapterP6Doyoon } from "../../../../domain/paidReport";
import SpouseImage from "../../../yeonwoo/paid/components/SpouseImage";
import { DoyoonAiBlock } from "../components/DoyoonAiBlock";
import { DoyoonPageHead } from "../components/DoyoonPageHead";
import {
  DoyoonSLabel,
  DoyoonSTitle,
  DoyoonSection,
} from "../components/DoyoonSection";
import { DOYOON_TOKENS } from "../components/doyoonTokens";

interface DoyoonDestinedPart1PageProps {
  data?: PaidChapterP6Doyoon;
}

const MOCK_P6: PaidChapterP6Doyoon = {
  user_name: "홍길동",
  match_slot_id: "f-water-yang",
  pct_value: "상위 8%",
  keyword_tags: ["따뜻한 인상", "조용한 사람", "표현 일관성", "감정 안정", "기다림 가능"],
  info_rows: [
    { key: "키 분포", val: "평균 ±5cm 범위 표본 71%" },
    { key: "체형", val: "균형 잡힌 골격 · 어깨선 단단" },
    { key: "얼굴상", val: "선이 부드러운 둥근형 · 이마 넓음" },
    { key: "이목구비", val: "눈매 길고 끝 부드러움 · 입꼬리 상향" },
    { key: "손·실루엣", val: "손가락 길고 단정 · 자세 차분" },
    { key: "성격 데이터", val: "감정 변동성 평균 대비 0.6배" },
    { key: "직업군", val: "기획·교육·창작 계열" },
    { key: "접촉 시나리오", val: "기존 동선 내 재접촉 확률 높음" },
    { key: "궁합 지수", val: "82%" },
  ],
  compatibility_pct: "82%",
  ai_profile:
    "궁합 지수 상위 8%예요. 잘 맞는 인연의 모습부터 차분히 그려드릴게요.\n\n" +
    "외형부터 볼게요. 키는 평균 ±5cm 안쪽이 가장 많고, 체형은 균형 잡힌 골격에 어깨선이 단단한 편이에요. " +
    "얼굴은 선이 부드러운 둥근형이 많고, 이마가 넓은 인상이 자주 보여요. " +
    "눈매가 길고 끝이 부드럽게 떨어지는 인상이 특히 잘 어울려요.\n\n" +
    "성격도 짚어드릴게요. 감정 기복이 크지 않고 마음이 차분하게 가라앉아 있는 사람이에요. " +
    "그만큼 곁에 있으면 안정감이 또렷하게 느껴져요. 직업은 기획·교육·창작 쪽에서 특히 잘 맞는 인연이 많아요.\n\n" +
    "무엇보다 화(火) 기운을 채워주는 사람이라는 게 커요. 홍길동님 사주에서 비어 있던 자리를 이 사람이 자연스럽게 메워주거든요. " +
    "임수(壬水) 일간과의 궁합이 82%까지 올라가는 이유예요. 평균보다 한참 위라고 보시면 돼요.",
  ai_meeting:
    "이 사람을 만나게 될 자리부터 짚어드릴게요. 처음 가보는 곳보다, 이미 자주 다니는 동선 안에서 다시 마주칠 가능성이 훨씬 커요. " +
    "새로운 곳을 찾기보다 늘 가던 자리를 챙기시는 게 좋아요.\n\n" +
    "첫 만남은 짧고 평범한 대화로 시작될 거예요. 인상에 강하게 남지 않는 경우가 많아요. " +
    "그래서 처음엔 알아채지 못하고 그냥 지나칠 수도 있어요. 일부러 못 알아보는 게 아니라, 원래 그런 식으로 스며들 듯 다가오는 인연이에요.\n\n" +
    "결정적인 건 두 번째 마주침이에요. 두 번째에 호감이 눈에 띄게 빠르게 올라가거든요. " +
    "임수 일간을 가진 분들에게서 이 흐름이 한결같이 보여요. 홍길동님, 첫 만남에서 두 번째 약속을 자연스럽게 잡아두시면 가장 좋아요.",
  profile_bubble: "이 사람, 홍길동님 주변에 이미 있을 확률이 높아요. 데이터가 그렇게 가리키고 있어요.",
  interest_score: 78,
  expression_score: 52,
  durability_score: 88,
  behavior_cards: [
    {
      label: "행동 → 심리 1",
      keyword: "먼저 연락 안 함",
      desc: "관심 부재 신호 아닙니다. 표현 의지 점수(52)가 낮아 망설이는 단계입니다.",
    },
    {
      label: "행동 → 심리 2",
      keyword: "대화는 길게 받음",
      desc: "관심도(78)와 지속 가능성(88)이 일치하는 응답 패턴입니다.",
    },
  ],
  ai_pattern:
    "그 사람의 행동을 하나씩 읽어드릴게요.\n\n" +
    "연락을 보면 — 답장은 길게 잘 해주는데, 먼저 연락은 잘 안 하는 사람이에요. " +
    "이걸 보통 \"관심 없나 보다\"로 받아들이기 쉬운데, 정말 관심이 없으면 답장부터 짧고 무심해져요. " +
    "길게 답해준다는 건 그만큼 마음을 쓰고 있다는 뜻이에요. 그저 먼저 다가서는 게 서툰 사람일 뿐이에요.\n\n" +
    "마음 상태를 들여다보면 — 망설임은 큰데 끊어낼 생각은 거의 없어요. 끝낼 마음은 없는데, 아직 시작할 용기를 못 낸 상태라고 보시면 돼요.\n\n" +
    "임수(壬水) 일간을 가진 분들을 보면, 이런 어정쩡한 사이는 둘 중 한 사람이 작은 신호만 보내도 의외로 쉽게 풀려요. " +
    "그러니 홍길동님이 먼저 가볍게 손 내미는 쪽이 한결 잘 풀릴 가능성이 높아요.",
  sd_avatar_asset: "dy_07",
};


export default function DoyoonDestinedPart1Page({ data }: DoyoonDestinedPart1PageProps) {
  const d = data ?? MOCK_P6;

  return (
    <section
      data-page-idx="6"
      style={{ background: DOYOON_TOKENS.bg, color: DOYOON_TOKENS.text }}
    >
      <DoyoonPageHead
        ch="4"
        hanja="四"
        title="운명의 짝 · 그 사람 (1/2)"
        sub="궁합 지수 · 심리 분석"
      />

      {/* ── 4-1 인연 프로파일 ── */}
      <DoyoonSection>
        <DoyoonSLabel>4-1 오행 궁합 지수 최상위 — 인연 프로파일</DoyoonSLabel>
        <PctBadgePinkDoyoon pct={d.pct_value} prefix="궁합 지수" />
        <DoyoonSTitle>데이터가 분류한 최적 인연의 모습.</DoyoonSTitle>

        <SpouseImage
          character="doyoon"
          type="match"
          slotId={d.match_slot_id}
          alt="인연 프로파일"
        />

        <KeywordTagsDoyoon tags={d.keyword_tags} />

        <InfoGridInyonDoyoon rows={d.info_rows} compatibility_pct={d.compatibility_pct} />

        <DoyoonAiBlock body={d.ai_profile} />

        <DoyoonAiBlock body={d.ai_meeting} />

        <BubbleOnlyDoyoon quote={d.profile_bubble} />
      </DoyoonSection>

      {/* ── 4-2 행동 패턴 ── */}
      <DoyoonSection>
        <DoyoonSLabel>4-2 행동 패턴 분석</DoyoonSLabel>
        <NoticeDoyoon
          icon="📊"
          text="현재 관심 있는 상대가 있다면 그 상대를 기준으로 분석하세요. 아직 없다면 근 시일 내 만나게 될 인연에 대입하면 됩니다."
        />
        <DoyoonSTitle>그 사람의 마음, 지금 어디쯤일까요.</DoyoonSTitle>

        <SdSpotlightDoyoon asset={d.sd_avatar_asset} />

        <div className="my-3 space-y-2">
          <PsychMeterDoyoon name="관심도" value={d.interest_score} />
          <PsychMeterDoyoon name="표현 의지" value={d.expression_score} />
          <PsychMeterDoyoon name="지속 가능성" value={d.durability_score} />
        </div>

        <div
          className="my-3 grid gap-2"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}
        >
          {d.behavior_cards.map((c, i) => (
            <BehaviorCardComp key={i} label={c.label} keyword={c.keyword} desc={c.desc} />
          ))}
        </div>

        <DoyoonAiBlock body={d.ai_pattern} />
      </DoyoonSection>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════
// 인라인 컴포넌트
// ════════════════════════════════════════════════════════════════════

function PctBadgePinkDoyoon({ pct, prefix }: { pct: string; prefix: string }) {
  return (
    <div className="flex justify-center my-3">
      <span
        className="text-[14px] font-bold px-4 py-1.5 rounded-full"
        style={{
          background: "rgba(212,83,126,0.10)",
          color: DOYOON_TOKENS.pink,
          border: "0.5px solid rgba(212,83,126,0.30)",
          letterSpacing: "0.03em",
        }}
      >
        {prefix} {pct}
      </span>
    </div>
  );
}

function KeywordTagsDoyoon({ tags }: { tags: ReadonlyArray<string> }) {
  return (
    <div className="flex flex-wrap gap-1.5 my-3 justify-center">
      {tags.map((t, i) => (
        <span
          key={i}
          className="text-[11px] font-medium px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(212,180,140,0.18)",
            color: DOYOON_TOKENS.text,
            border: "0.5px solid rgba(139,105,20,0.30)",
            letterSpacing: "0.02em",
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function InfoGridInyonDoyoon({
  rows,
  compatibility_pct,
}: { rows: ReadonlyArray<{ key: string; val: string }>; compatibility_pct: string }) {
  return (
    <div
      className="rounded-[10px] my-3 overflow-hidden"
      style={{
        background: "rgba(139,105,20,0.04)",
        border: "0.5px solid rgba(139,105,20,0.20)",
      }}
    >
      {rows.map((r, i) => {
        const isCompat = r.key === "궁합 지수";
        return (
          <div
            key={i}
            className="flex items-start gap-3 px-3.5 py-2.5"
            style={{
              borderBottom:
                i < rows.length - 1
                  ? "0.5px solid rgba(139,105,20,0.10)"
                  : undefined,
            }}
          >
            <span
              className="text-[13px] font-medium flex-shrink-0"
              style={{
                color: DOYOON_TOKENS.goldSoft,
                letterSpacing: "0.02em",
                width: 80,
                lineHeight: 1.6,
              }}
            >
              {r.key}
            </span>
            <span
              className="text-[13px] flex-1 font-bold text-right"
              style={{
                color: isCompat ? DOYOON_TOKENS.pink : DOYOON_TOKENS.text,
                wordBreak: "keep-all",
                lineHeight: 1.6,
              }}
            >
              {r.val}
            </span>
          </div>
        );
      })}
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
        &ldquo;{quote}&rdquo;
      </div>
    </div>
  );
}

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

function SdSpotlightDoyoon({ asset }: { asset: string }) {
  return (
    <div className="flex justify-center my-3">
      <div
        aria-label={`한도윤 SD — ${asset}`}
        style={{
          width: 200,
          height: 264,
          backgroundImage: `url(/doyoon/sd_dy/${asset}.png)`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}

function PsychMeterDoyoon({ name, value }: { name: string; value: number }) {
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

function BehaviorCardComp({
  label,
  keyword,
  desc,
}: { label: string; keyword: string; desc: string }) {
  return (
    <div
      className="rounded-[10px] px-3 py-3"
      style={{
        background: "rgba(139,105,20,0.05)",
        border: "0.5px solid rgba(139,105,20,0.22)",
      }}
    >
      <div
        className="text-[11px] font-semibold mb-1.5 uppercase"
        style={{ color: DOYOON_TOKENS.goldSoft, letterSpacing: "0.05em" }}
      >
        {label}
      </div>
      <div
        className="text-[14px] font-bold mb-1.5"
        style={{ color: DOYOON_TOKENS.text, wordBreak: "keep-all", lineHeight: 1.4 }}
      >
        {keyword}
      </div>
      <div
        className="text-[12px]"
        style={{ color: DOYOON_TOKENS.textMeta, wordBreak: "keep-all", lineHeight: 1.6 }}
      >
        {desc}
      </div>
    </div>
  );
}
