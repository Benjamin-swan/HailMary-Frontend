import KkebiSlot from "../kkebi/KkebiSlot";
import { scoreToMood } from "../../../domain/sajuRules";
import type { AreaKey, AreaResult } from "../../../domain/types";

type AreaContentProps = {
  areaKey: AreaKey;
  area: AreaResult;
};

const AREA_DISPLAY: Record<AreaKey, { hanja: string; korean: string; pose: string }> = {
  love:   { hanja: "戀(연)", korean: "연애", pose: "love"   },
  work:   { hanja: "事(사)", korean: "직장", pose: "work"   },
  money:  { hanja: "財(재)", korean: "재물", pose: "money"  },
  health: { hanja: "健(건)", korean: "건강", pose: "health" },
  study:  { hanja: "學(학)", korean: "학업", pose: "study"  },
};

const BLOCK_ICONS: Record<string, string> = {
  bok:    "/kkebi/icons/icon-bok.png",
  gyeong: "/kkebi/icons/icon-gyeong.png",
  jo:     "/kkebi/icons/icon-jo.png",
};

const BLOCKS: Array<{
  key: keyof AreaResult["blocks"];
  hanja: string;
  korean: string;
}> = [
  { key: "bok",    hanja: "卜(복)", korean: "오늘의 포인트" },
  { key: "gyeong", hanja: "警(경)", korean: "주의할 점"     },
  { key: "jo",     hanja: "助(조)", korean: "깨비의 한마디" },
];

function scoreColor(score: number): string {
  if (score >= 86) return "var(--v2-gold-bright)";
  if (score >= 61) return "var(--v2-gold)";
  if (score >= 31) return "var(--v2-text-primary)";
  return "var(--v2-coral-soft)";
}

export default function AreaContent({ areaKey, area }: AreaContentProps) {
  const display = AREA_DISPLAY[areaKey];

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        paddingBottom: "24px",
      }}
    >
      {/* 영역 헤더 */}
      <div style={{ alignItems: "center", display: "flex", flexDirection: "column", gap: "4px" }}>
        <p
          style={{
            color: "var(--v2-text-secondary)",
            fontFamily: "var(--font-title)",
            fontSize: "var(--text-sm)",
            fontWeight: 500,
            letterSpacing: "var(--ls-wide)",
            margin: 0,
            textAlign: "center",
          }}
        >
          {display.hanja} {display.korean}
        </p>
        <p
          style={{
            color: scoreColor(area.score),
            fontFamily: "var(--font-title)",
            fontSize: "var(--text-score)",
            fontWeight: 800,
            lineHeight: "var(--lh-tight)",
            margin: 0,
          }}
        >
          {area.score}점
        </p>
      </div>

      {/* 깨비 + 말풍선 통합 */}
      <KkebiSlot
        pose={display.pose as "love" | "work" | "money" | "health" | "study"}
        size="xl"
        mood={scoreToMood(area.score)}
        bubbleText={area.summary}
        bubblePosition="top"
      />

      {/* 풀이 3블록 */}
      <div style={{ width: "100%" }}>
        {BLOCKS.map((block, i) => (
          <div key={block.key}>
            {i > 0 && (
              <div style={{ borderTop: "1px solid rgba(232, 200, 125, 0.1)" }} />
            )}
            <div style={{ padding: "16px 0" }}>
              <div style={{ alignItems: "center", display: "flex", gap: "6px", margin: "0 0 6px", marginLeft: "-12px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={BLOCK_ICONS[block.key]} alt={block.korean} width={68} height={68}
                  style={{ objectFit: "contain", flexShrink: 0 }} />
                <span
                  style={{
                    color: "var(--v2-text-muted)",
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-xs)",
                    marginLeft: "-3px",
                  }}
                >
                  {block.hanja}{" "}
                </span>
                <span
                  style={{
                    color: "var(--v2-gold)",
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-base)",
                    fontWeight: 700,
                    letterSpacing: "var(--ls-wide)",
                  }}
                >
                  {block.korean}
                </span>
              </div>
              <p
                style={{
                  color: "var(--v2-text-primary)",
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-base)",
                  lineHeight: "var(--lh-relaxed)",
                  margin: 0,
                }}
              >
                {area.blocks[block.key]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
