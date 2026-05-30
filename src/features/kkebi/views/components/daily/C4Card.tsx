"use client";

import Card from "../shared/Card";
import KkebiSlot from "../kkebi/KkebiSlot";
import { scoreToMood } from "../../../domain/sajuRules";
import type { SajuResult } from "../../../domain/types";

type C4CardProps = { data: SajuResult };

const DIRECTION_MAP: Record<string, string> = {
  "東": "東(동)", "西": "西(서)", "南": "南(남)", "北": "北(북)",
  "東北": "東北(동북)", "西北": "西北(서북)",
  "東南": "東南(동남)", "西南": "西南(서남)",
};

const LUCKY_ICONS: Record<string, string> = {
  color:     "/kkebi/icons/icon-lucky-color.png",
  number:    "/kkebi/icons/icon-lucky-number.png",
  direction: "/kkebi/icons/icon-lucky-direction.png",
  food:      "/kkebi/icons/icon-lucky-food.png",
};

const LUCKY_EMOJI_FALLBACK: Record<string, string> = {
  color: "🎨", number: "🔢", direction: "🧭", food: "🍱",
};

function LuckyIcon({ type, label }: { type: string; label: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LUCKY_ICONS[type]}
      alt={label}
      width={42}
      height={42}
      style={{ objectFit: "contain" }}
      onError={(e) => {
        const target = e.currentTarget as HTMLImageElement;
        target.style.display = "none";
        const span = document.createElement("span");
        span.style.fontSize = "40px";
        span.textContent = LUCKY_EMOJI_FALLBACK[type] ?? "✨";
        target.parentElement?.appendChild(span);
      }}
    />
  );
}

const BOX_STYLE: React.CSSProperties = {
  alignItems: "center",
  background: "rgba(20, 12, 36, 0.6)",
  border: "1px solid rgba(232, 200, 125, 0.2)",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  gap: 5,
  padding: "10px 12px",
};

export default function C4Card({ data }: C4CardProps) {
  const mood = scoreToMood(data.total.score);

  return (
    <Card>
      <div style={{ height: "100%", overflowX: "hidden", overflowY: "auto", scrollbarWidth: "none" }}>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            padding: "16px 0",
          }}
        >
          <p
            style={{
              color: "var(--v2-gold)",
              fontFamily: "var(--font-title)",
              fontSize: "var(--text-lg)",
              fontWeight: 700,
              letterSpacing: "var(--ls-tight)",
              lineHeight: "var(--lh-tight)",
              margin: 0,
              textAlign: "center",
            }}
          >
            오늘의 행운 요소
          </p>

          <KkebiSlot
            pose="main"
            size="lg"
            mood={mood}
            bubbleText="오늘 이거 챙겨봐."
            bubblePosition="top"
          />

          <div
            style={{
              display: "grid",
              gap: "10px",
              gridTemplateColumns: "1fr 1fr",
              width: "100%",
            }}
          >
            <div style={BOX_STYLE}>
              <LuckyIcon type="color" label="행운의 색" />
              <span style={{ alignItems: "center", color: "var(--v2-text-secondary)", display: "flex", fontSize: "var(--text-sm)", letterSpacing: "var(--ls-wide)", minHeight: "20px" }}>
                행운의 색
              </span>
              <div style={{ alignItems: "center", display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ background: data.lucky.color.hex, borderRadius: "50%", height: "30px", width: "30px" }} />
                <span style={{ color: "var(--v2-text-primary)", fontSize: "14px", fontWeight: 500 }}>
                  {data.lucky.color.name}
                </span>
              </div>
            </div>

            <div style={BOX_STYLE}>
              <LuckyIcon type="number" label="행운의 숫자" />
              <span style={{ alignItems: "center", color: "var(--v2-text-secondary)", display: "flex", fontSize: "var(--text-sm)", letterSpacing: "var(--ls-wide)", minHeight: "20px" }}>
                행운의 숫자
              </span>
              <span style={{ color: "var(--v2-gold-bright)", fontFamily: "var(--font-title)", fontSize: "32px", fontWeight: 800, lineHeight: 1.1 }}>
                {data.lucky.number}
              </span>
            </div>

            <div style={BOX_STYLE}>
              <LuckyIcon type="direction" label="행운의 방향" />
              <span style={{ alignItems: "center", color: "var(--v2-text-secondary)", display: "flex", fontSize: "var(--text-sm)", letterSpacing: "var(--ls-wide)", minHeight: "20px" }}>
                행운의 방향
              </span>
              <span style={{ color: "var(--v2-text-primary)", fontFamily: "var(--font-title)", fontSize: "18px", fontWeight: 700 }}>
                {DIRECTION_MAP[data.lucky.direction] ?? data.lucky.direction}
              </span>
            </div>

            <div style={BOX_STYLE}>
              <LuckyIcon type="food" label="행운의 음식" />
              <span style={{ alignItems: "center", color: "var(--v2-text-secondary)", display: "flex", fontSize: "var(--text-sm)", letterSpacing: "var(--ls-wide)", minHeight: "20px" }}>
                행운의 음식
              </span>
              <span style={{ color: "var(--v2-text-primary)", fontFamily: "var(--font-title)", fontSize: "18px", fontWeight: 700 }}>
                {data.lucky.food.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
