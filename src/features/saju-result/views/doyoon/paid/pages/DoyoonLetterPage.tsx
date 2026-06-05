import type { PaidChapterP10 } from "../../../../domain/paidReport";
import { DoyoonPageHead } from "../components/DoyoonPageHead";
import {
  DoyoonSection,
} from "../components/DoyoonSection";
import { DOYOON_TOKENS } from "../components/doyoonTokens";

// P-10 (CH-7) 도윤의 편지 — 박스 3개 분리 디자인 (연우 패턴 차용 + 도윤 톤).
// 박스 1: 지금 입력하신 상황 (step1 AI 답변)
// 박스 2: 알고 싶다 하신 영역 (step2 AI 답변)
// 박스 3: 당신의 한 줄에 답합니다 (step3 quote + AI 답장 + 강조 + 꼬리)
// 헤더: "한 도 윤 의 편 지" + 일주 (박스 1 위)
// 시그니처: "— 도윤 드림" (박스 3 아래)

interface DoyoonLetterPageProps {
  data?: PaidChapterP10;
  userName?: string;
}

const MOCK_P10: PaidChapterP10 = {
  ilju_with_hanja: "병인(丙寅)",
  box1_body:
    "홍길동님이 골라주신 지금 상황, 차근차근 정리해드릴게요. 어렵게 풀 이야기는 아니에요.\n\n" +
    "입력해주신 건 썸 진행 중 · 연애 중이에요. 임수(壬水) 일간이신 분들에게서 이 조합은 비슷한 흐름으로 자주 보여요. " +
    "마음이 한 곳으로 쏠리면서 감정이 평소보다 크게 일렁이고 있는 시기예요.\n\n" +
    "홍길동님, 지금 당장 무언가 결정하지 않으셔도 돼요. 먼저 차분히 살펴보고 그다음에 움직이셔도 늦지 않아요.",
  box2_body:
    "홍길동님이 궁금하다고 표시해주신 부분, 지금 풀어서 보여드릴게요. 충분히 답해드릴 수 있는 질문이에요.\n\n" +
    "여쭤보신 건 운명의 상대 · 다음 인연의 시기예요. 임수(壬水) 일간이신 분들이 가장 자주 궁금해하시는 질문들이에요. " +
    "지금 짚어드릴 수 있는 부분은 또렷하니, 하나씩 차례로 풀어드릴게요.\n\n" +
    "지금 답할 수 있는 부분과 조금 더 지켜봐야 하는 부분은 분명하게 나뉘어요. 화(火) 기운을 채우는 이야기도 함께 보여드릴 수 있어요.",
  quote_text: "사람을 만나면 처음엔 잘 가다가 꼭 중반에 무너져요. 왜 같은 패턴이 반복되는지 모르겠어요.",
  quote_label: "— 홍길동님이 적어주신 고민",
  box3_body:
    "홍길동님, 적어주신 고민 여러 번 읽었어요. 짧지만 곱씹어보면 꽤 많은 게 담겨 있는 문장이에요. " +
    "밤마다 머릿속에서 떠나지 않는 거, 그건 지금 마음의 기운이 한 곳으로 쏠려 있어서 그래요. " +
    "마음이 정리되지 않으면 잠들기 직전에 생각이 가장 커지거든요. 이건 홍길동님만 겪는 일이 아니라, 같은 일간을 가진 분들에게서 비슷하게 나타나는 흐름이에요.\n\n" +
    "먼저 안심하셔도 되는 부분부터요. 임수 일간이신 분들 중 같은 결의 고민을 안고 오시는 분들이 꽤 많아요. " +
    "결코 드문 일이 아니에요. 홍길동님만 그런 게 아니라는 뜻이고, 동시에 이 흐름이 충분히 들여다볼 수 있는 이야기라는 의미이기도 해요.\n\n" +
    "그리고 솔직하게 말씀드리면 — 홍길동님은 연애 유형 상위 12%, 매력 지수 상위 8%예요. 그냥 듣기 좋으라고 드리는 말씀 아니에요. " +
    "이 정도로 또렷하게 나오는 분이 흔하지 않거든요. 단지 화(火) 기운이 비어 있어서 흐름이 잠깐 막혀 있을 뿐이에요.\n\n" +
    "이 부분은 충분히 채워나갈 수 있어요. 6장에서 정리해 드린 세 가지 — 색채·공간·행동 — 이 그 실마리예요. " +
    "제가 짚어드릴 수 있는 건 여기까지예요. 이제부터는 홍길동님의 선택이 흐름을 만들어가실 거예요. " +
    "다만 한 가지만 더 말씀드리면, 홍길동님의 흐름은 어느 쪽으로 봐도 꽤 좋은 결로 기울어 있어요.",
  emphasis: "홍길동님은 이미 가장 완벽한 답안지를 갖고 계세요.",
  tail: "스스로를 너무 의심하지 마시고, 지금 흐름을 믿어보세요.\n오늘 밤은 편하게 주무셨으면 좋겠네요.",
  uses_ai: false,
  step1_labels: ["썸 진행 중", "연애 중"],
  step2_labels: ["운명의 상대", "다음 인연의 시기"],
};


export default function DoyoonLetterPage({ data, userName }: DoyoonLetterPageProps) {
  const d = data ?? MOCK_P10;
  const name = userName ?? "홍길동";

  return (
    <section
      data-page-idx="10"
      style={{ background: DOYOON_TOKENS.bg, color: DOYOON_TOKENS.text }}
    >
      <DoyoonPageHead
        ch="7"
        hanja="七"
        title="도윤의 편지"
        sub={`${name}님의 한 줄에 답하다`}
      />

      <DoyoonSection>
        <SdSignatureDy03 />

        {/* 편지 헤더 (박스 1 위 1번) */}
        <LetterHeaderDoyoon ilju={d.ilju_with_hanja} userName={name} />

        {/* 박스 1 — step1 AI 답변 */}
        <LetterBoxDoyoon
          subtitle="지금 입력하신 상황"
          chips={d.step1_labels ?? undefined}
          body={d.box1_body}
        />

        {/* 박스 2 — step2 AI 답변 */}
        <LetterBoxDoyoon
          subtitle="알고 싶다 하신 영역"
          chips={d.step2_labels ?? undefined}
          body={d.box2_body}
        />

        {/* 박스 3 — quote + AI 답장 + emphasis + tail */}
        <LetterBox3Doyoon
          quoteText={d.quote_text}
          quoteLabel={d.quote_label}
          body={d.box3_body}
          emphasis={d.emphasis}
          tail={d.tail}
        />

        {/* 시그니처 */}
        <LetterSignatureDoyoon />
      </DoyoonSection>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════
// 인라인 컴포넌트 (도윤 톤 — 베이지·골드·핑크)
// ════════════════════════════════════════════════════════════════════

function SdSignatureDy03() {
  return (
    <div className="relative mx-auto mb-[-10px]" style={{ width: 220, height: 280 }}>
      <ThreadCorner pos="tl" />
      <ThreadCorner pos="br" />
      <div
        aria-label="한도윤 — 편지 시그니처"
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: "url(/doyoon/sd_dy/dy_03.png)",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}

function ThreadCorner({ pos }: { pos: "tl" | "br" }) {
  const map: Record<"tl" | "br", React.CSSProperties> = {
    tl: { top: -8, left: -8, transform: "rotate(-90deg)" },
    br: { bottom: -8, right: -8, transform: "rotate(90deg)" },
  };
  return (
    <span
      aria-hidden
      className="absolute pointer-events-none"
      style={{
        ...map[pos],
        width: 110,
        height: 110,
        backgroundImage: "url(/doyoon/thread/thread_corner.png)",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        opacity: 0.55,
        zIndex: 3,
      }}
    />
  );
}

// ── 편지 헤더 ──
function LetterHeaderDoyoon({ ilju, userName }: { ilju: string; userName: string }) {
  return (
    <div className="mt-4 mb-5">
      <div
        className="text-center mb-1"
        style={{
          fontSize: 13,
          color: DOYOON_TOKENS.warmGold,
          letterSpacing: "0.5em",
          fontWeight: 700,
        }}
      >
        한 도 윤 의 편 지
      </div>
      <div
        className="text-center pb-4"
        style={{
          fontSize: 13,
          color: DOYOON_TOKENS.textMeta,
          borderBottom: "0.5px solid rgba(139,105,20,0.20)",
        }}
      >
        — <span style={{ color: DOYOON_TOKENS.warmGold, fontWeight: 600 }}>{ilju}</span> 일주, {userName}님께
      </div>
    </div>
  );
}

// ── 박스 1·2 공통 카드 ──
function LetterBoxDoyoon({
  subtitle,
  chips,
  body,
}: { subtitle: string; chips?: ReadonlyArray<string>; body: string }) {
  return (
    <div
      className="rounded-[12px] px-5 py-5 my-4 relative"
      style={{
        background: "linear-gradient(180deg, #fff8f0 0%, #fdf3e7 100%)",
        border: "0.5px solid rgba(139,105,20,0.28)",
      }}
    >
      {/* top hairline */}
      <span
        aria-hidden
        className="absolute top-0 left-0 right-0"
        style={{
          height: 2,
          background: `linear-gradient(90deg, transparent, ${DOYOON_TOKENS.warmGold}, transparent)`,
        }}
      />
      <div
        className="text-center mb-3"
        style={{
          fontSize: 13,
          color: DOYOON_TOKENS.warmGold,
          letterSpacing: "0.1em",
          fontWeight: 700,
        }}
      >
        {subtitle}
      </div>

      {/* 사용자 선택 칩 */}
      {chips && chips.length > 0 && (
        <div
          className="flex flex-wrap gap-1.5 justify-center mb-3 pb-3"
          style={{
            borderBottom: "0.5px dashed rgba(139,105,20,0.22)",
          }}
        >
          {chips.map((c, i) => (
            <span
              key={i}
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-full"
              style={{
                background: "rgba(212,180,140,0.20)",
                color: DOYOON_TOKENS.text,
                border: "0.5px solid rgba(139,105,20,0.30)",
                letterSpacing: "0.02em",
              }}
            >
              {c}
            </span>
          ))}
        </div>
      )}

      <BodyTextDoyoon body={body} />
    </div>
  );
}

// ── 박스 3 (quote + 답장 + 강조 + 꼬리) ──
function LetterBox3Doyoon({
  quoteText,
  quoteLabel,
  body,
  emphasis,
  tail,
}: {
  quoteText: string;
  quoteLabel: string;
  body: string;
  emphasis: string;
  tail: string;
}) {
  return (
    <div
      className="rounded-[12px] px-5 py-5 my-4 relative"
      style={{
        background: "linear-gradient(180deg, #fff8f0 0%, #fdf3e7 100%)",
        border: "0.5px solid rgba(212,83,126,0.32)",
        boxShadow: "0 0 16px rgba(212,83,126,0.06) inset",
      }}
    >
      <span
        aria-hidden
        className="absolute top-0 left-0 right-0"
        style={{
          height: 2,
          background: `linear-gradient(90deg, transparent, ${DOYOON_TOKENS.pink}, transparent)`,
        }}
      />
      <div
        className="text-center mb-4 pb-2"
        style={{
          fontSize: 13,
          color: DOYOON_TOKENS.pink,
          letterSpacing: "0.1em",
          fontWeight: 700,
          borderBottom: "0.5px dashed rgba(212,83,126,0.25)",
        }}
      >
        당신의 한 줄에 답합니다
      </div>

      {/* quote */}
      <div
        className="rounded-[8px] px-3 py-3 mb-5 text-center"
        style={{
          background: "rgba(139,105,20,0.06)",
          border: "0.5px dashed rgba(139,105,20,0.28)",
        }}
      >
        <div
          className="text-[14px] leading-[1.75] italic mb-1"
          style={{ color: DOYOON_TOKENS.warmGold, wordBreak: "keep-all" }}
        >
          &ldquo;{quoteText}&rdquo;
        </div>
        <div
          className="text-[11px]"
          style={{ color: DOYOON_TOKENS.textMeta, letterSpacing: "0.04em" }}
        >
          {quoteLabel}
        </div>
      </div>

      {/* 답장 본문 */}
      <BodyTextDoyoon body={body} />

      {/* 강조 — 핑크 */}
      <p className="mt-4 mb-2">
        <span
          style={{
            color: DOYOON_TOKENS.pink,
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          {emphasis}
        </span>
      </p>

      {/* 꼬리 */}
      <p
        style={{
          color: DOYOON_TOKENS.textMeta,
          fontSize: 14,
          lineHeight: 1.85,
          whiteSpace: "pre-line",
          wordBreak: "keep-all",
        }}
      >
        {tail}
      </p>
    </div>
  );
}

// ── 시그니처 ──
function LetterSignatureDoyoon() {
  return (
    <div
      className="text-right mt-4 mb-2 px-2"
      style={{
        fontSize: 14,
        color: DOYOON_TOKENS.warmGold,
        letterSpacing: "0.05em",
        fontWeight: 600,
      }}
    >
      — 도윤 드림
    </div>
  );
}

// ── 본문 단락 렌더 ──
function BodyTextDoyoon({ body }: { body: string }) {
  return (
    <div
      className="text-[14px] leading-[1.95]"
      style={{
        color: DOYOON_TOKENS.text,
        wordBreak: "keep-all",
      }}
    >
      {body.split("\n\n").map((para, i) => {
        const parts = para.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i} className="mb-3 last:mb-0">
            {parts.map((part, j) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return (
                  <strong
                    key={j}
                    style={{ color: DOYOON_TOKENS.pink, fontWeight: 700 }}
                  >
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              return <span key={j}>{part}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
}
