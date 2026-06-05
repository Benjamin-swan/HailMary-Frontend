import type { PaidChapterP5Doyoon } from "../../../../domain/paidReport";
import { DoyoonAiBlock } from "../components/DoyoonAiBlock";
import { DoyoonPageHead } from "../components/DoyoonPageHead";
import { DoyoonSdWithBubble } from "../components/DoyoonSdWithBubble";
import {
  DoyoonSLabel,
  DoyoonSTitle,
  DoyoonSection,
} from "../components/DoyoonSection";
import { DOYOON_TOKENS } from "../components/doyoonTokens";

interface DoyoonCharmPageProps {
  data?: PaidChapterP5Doyoon;
}

const MOCK_P5: PaidChapterP5Doyoon = {
  user_name: "홍길동",
  charm_pct: "상위 8%",
  radar: [
    { name: "존재감", value: 92 },
    { name: "매력살", value: 72 },
    { name: "목소리", value: 68 },
    { name: "깊이감", value: 88 },
    { name: "분위기", value: 78 },
    { name: "눈빛", value: 82 },
  ],
  strength_axis_1: "존재감",
  strength_axis_2: "깊이감",
  strength_multiplier: "두드러지게",
  ai_charm_index:
    "상위 8%예요. 이거 그냥 숫자가 아니에요.\n\n" +
    "여섯 가지 매력 중에서 특히 빛나는 게 두 가지예요. 존재감과 깊이감 — 둘 다 또래 분들 사이에서도 유난히 두드러져요. " +
    "같은 일간을 가진 분들 중에서도 이 두 가지가 이만큼 살아 있는 분은 흔하지 않아요. " +
    "나머지 매력들(매력살·목소리·분위기·눈빛)도 평균은 충분히 넘고요. 약한 데가 있는 게 아니라, 강한 데가 또렷한 분이에요.\n\n" +
    "다만 홍길동님은 이걸 아직 제대로 안 쓰고 있어요. " +
    "평소 무심코 새어 나올 때보다 마음먹고 보여줄 때 훨씬 더 환하게 살아나거든요. 이 정도 매력이면, 조금만 의식해도 주변 반응이 꽤 달라질 거예요.",
  sd_avatar_asset: "dy_06",
  charm_bubble: "이거 그냥 놔두기엔 좀 아깝지 않아요?",
  conversion_steps: [
    { label: "첫 인상", pct: 30 },
    { label: "반복 접촉", pct: 55 },
    { label: "익숙함", pct: 72 },
    { label: "끌림", pct: 88 },
  ],
  ai_conversion:
    "첫인상 30%에서 시작해서 끌림 88%까지 이어지는 흐름이에요. 처음 만난 순간부터 마음이 가까워지기까지 네 단계로 천천히 올라가요.\n\n" +
    "근데 재미있는 건, 홍길동님은 두 번째 만남에서 호감이 부쩍 깊어진다는 거예요. " +
    "즉 한 번 만나고 끝내면 진짜 매력의 절반도 못 보여주는 거예요. " +
    "첫 만남에서 멈춘 사람과 두 번째까지 이어간 사람의 호감 차이가 눈에 띄게 벌어지거든요.\n\n" +
    "첫 만남에서 두 번째 약속을 자연스럽게 만들어두세요. 홍길동님한테는 그게 가장 잘 맞는 방법이에요.",
  appeal_meters: [
    { name: "존재감", value: 92 },
    { name: "깊이감", value: 85 },
    { name: "표현 일관성", value: 64 },
    { name: "반응 속도", value: 71 },
  ],
  ai_appeal:
    "당신의 매력을 이루는 네 가지 모습을 짚어드릴게요.\n\n" +
    "존재감 92, 깊이감 85, 표현 일관성 64, 반응 속도 71. 특히 빛나는 두 가지와 아직 덜 드러난 두 가지가 또렷해요.\n\n" +
    "표현 일관성과 반응 속도가 아직 덜 드러난 쪽이에요. 그런데 이건 홍길동님이 마음만 먹으면 가장 쉽게 챙길 수 있는 부분이기도 해요. " +
    "이 두 가지를 조금만 살리면 호감이 한결 또렷하게 전해져요. 이미 강한 데를 더 키우기보다, 덜 드러난 데를 살피는 쪽이 훨씬 빠르게 와닿아요.",
};


export default function DoyoonCharmPage({ data }: DoyoonCharmPageProps) {
  const d = data ?? MOCK_P5;

  return (
    <section
      data-page-idx="5"
      style={{ background: DOYOON_TOKENS.bg, color: DOYOON_TOKENS.text }}
    >
      <DoyoonPageHead
        ch="3"
        hanja="三"
        title="나의 매력 이야기"
        sub="끌리는 매력 · 호감이 피어나는 흐름"
      />

      {/* ── 3-1 매력 지수 ── */}
      <DoyoonSection>
        <DoyoonSLabel>3-1 당신에게서 가장 먼저 느껴지는 매력</DoyoonSLabel>
        <ChargmPctBadgeDoyoon pct={d.charm_pct} />
        <DoyoonSTitle>
          여섯 가지 매력 중 {d.strength_axis_1}과 {d.strength_axis_2}이 평균보다 {d.strength_multiplier} 살아 있어요.
        </DoyoonSTitle>

        <RadarChartDoyoon axes={d.radar} />

        <DoyoonAiBlock body={d.ai_charm_index} />

        <DoyoonSdWithBubble
          sdAsset={d.sd_avatar_asset}
          quote={d.charm_bubble}
          flow="left"
        />
      </DoyoonSection>

      {/* ── 3-2 끌림 메커니즘 ── */}
      <DoyoonSection>
        <DoyoonSLabel>3-2 상대가 당신에게 끌리게 되는 마음의 흐름</DoyoonSLabel>
        <DoyoonSTitle>첫인상에서 끌림까지, 마음이 가까워지는 네 단계예요.</DoyoonSTitle>

        <FlowStepsDoyoon steps={d.conversion_steps} />

        <DoyoonAiBlock body={d.ai_conversion} />
      </DoyoonSection>

      {/* ── 3-3 호감 유발 패턴 ── */}
      <DoyoonSection>
        <DoyoonSLabel>3-3 상대에게 호감을 불러일으키는 모습</DoyoonSLabel>
        <DoyoonSTitle>당신의 매력을 이루는 네 가지 모습이에요.</DoyoonSTitle>

        <div className="my-3 space-y-2">
          {d.appeal_meters.map((m) => (
            <AppealMeterBarDoyoon key={m.name} name={m.name} value={m.value} />
          ))}
        </div>

        <DoyoonAiBlock body={d.ai_appeal} />
      </DoyoonSection>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════
// 인라인 컴포넌트
// ════════════════════════════════════════════════════════════════════

function ChargmPctBadgeDoyoon({ pct }: { pct: string }) {
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
        매력이 빛나는 정도 {pct}
      </span>
    </div>
  );
}

// 원본 .radar-wrap SVG 매핑 (200×200 6각형)
function RadarChartDoyoon({ axes }: { axes: ReadonlyArray<{ name: string; value: number }> }) {
  // 6각형 꼭짓점 좌표 — 100% (반지름 80)
  const center = 100;
  const r = 80;
  const angles = [-90, -30, 30, 90, 150, 210]; // 6각 (12시부터 시계 방향)
  const toXY = (radius: number, angle: number) => {
    const rad = (angle * Math.PI) / 180;
    return { x: center + radius * Math.cos(rad), y: center + radius * Math.sin(rad) };
  };
  const grid100 = angles.map((a) => toXY(r, a));
  const grid66 = angles.map((a) => toXY(r * 0.66, a));
  const grid33 = angles.map((a) => toXY(r * 0.33, a));
  const dataPolygon = axes.map((axis, i) => toXY((axis.value / 100) * r, angles[i]));
  const labelPositions = angles.map((a) => toXY(r + 12, a));

  const polyStr = (points: { x: number; y: number }[]) =>
    points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  return (
    <div
      className="my-3 rounded-[10px] flex flex-col items-center w-full"
      style={{
        background:
          "#fff8ec url(/doyoon/dy_sub/chart_bg_radar_dy.png) no-repeat center center / 100% 100%",
        padding: "32px 28px 18px",
      }}
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 200, overflow: "visible" }}>
        {/* grid (동심 3겹) */}
        <polygon points={polyStr(grid100)} fill="none" stroke="rgba(139,105,20,0.25)" strokeWidth="0.8" />
        <polygon points={polyStr(grid66)} fill="none" stroke="rgba(139,105,20,0.18)" strokeWidth="0.6" />
        <polygon points={polyStr(grid33)} fill="none" stroke="rgba(139,105,20,0.12)" strokeWidth="0.5" />
        {/* data polygon */}
        <polygon
          points={polyStr(dataPolygon)}
          fill="rgba(212,83,126,0.20)"
          stroke={DOYOON_TOKENS.pink}
          strokeWidth="1.5"
        />
        {/* 꼭짓점 */}
        {dataPolygon.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2.5" fill={DOYOON_TOKENS.pink} />
        ))}
        {/* 축 라벨 */}
        {axes.map((axis, i) => {
          const pos = labelPositions[i];
          const anchor =
            angles[i] === -90 || angles[i] === 90
              ? "middle"
              : angles[i] > -90 && angles[i] < 90
              ? "start"
              : "end";
          return (
            <text
              key={axis.name}
              x={pos.x}
              y={pos.y + 3}
              textAnchor={anchor}
              fontSize="10"
              fill={DOYOON_TOKENS.text}
              fontWeight="600"
            >
              {axis.name}
            </text>
          );
        })}
      </svg>
      <p className="text-[12px] text-center mt-2" style={{ color: DOYOON_TOKENS.textMeta }}>
        {axes[0].name}·{axes[3].name}이 특히 돋보여요
      </p>
    </div>
  );
}

// 4단계 화살표 flow
function FlowStepsDoyoon({ steps }: { steps: ReadonlyArray<{ label: string; pct: number }> }) {
  return (
    <div className="my-3 flex items-center justify-between gap-1.5">
      {steps.map((s, i) => (
        <>
          <div
            key={s.label}
            className="flex-1 rounded-[8px] px-1.5 py-2 text-center"
            style={{
              background: i === steps.length - 1 ? "rgba(212,83,126,0.10)" : "rgba(139,105,20,0.06)",
              border: i === steps.length - 1
                ? "0.5px solid rgba(212,83,126,0.30)"
                : "0.5px solid rgba(139,105,20,0.20)",
            }}
          >
            <div
              className="text-[11px] mb-1"
              style={{
                color: i === steps.length - 1 ? DOYOON_TOKENS.pink : DOYOON_TOKENS.textMeta,
                fontWeight: 600,
              }}
            >
              {s.label}
            </div>
            <div
              className="text-[14px] font-bold"
              style={{ color: i === steps.length - 1 ? DOYOON_TOKENS.pink : DOYOON_TOKENS.warmGold }}
            >
              {s.pct}%
            </div>
          </div>
          {i < steps.length - 1 && (
            <span style={{ color: DOYOON_TOKENS.goldSoft, fontSize: 11 }}>▶</span>
          )}
        </>
      ))}
    </div>
  );
}

// MeterBar (P-2 패턴 재사용 — 라벨/value 인라인)
function AppealMeterBarDoyoon({ name, value }: { name: string; value: number }) {
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
