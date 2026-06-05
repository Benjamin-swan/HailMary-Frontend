"use client";

import type { ReactNode } from "react";

const BUBBLE_BG = "#12110F";
const BUBBLE_BORDER = "#856C51";
const TAIL_LEFT_PCT = 25;

type Props = {
  speaker?: string;
  children: ReactNode;
  widthPct?: number;
  tail?: boolean;
  tailPosition?: "top" | "bottom";
  radius?: number;
  textSize?: number;
  lineHeight?: string;
  paddingX?: number;
  paddingY?: number;
  /**
   * 설정 시 말풍선 크기를 컨테이너 폭에 비례(cqw)하게 만든다. (opt-in)
   * 값 = 풀사이즈 기준 컨테이너 폭(px). 그 폭 이상이면 px 그대로(상한), 더 좁으면 비례 축소.
   * 부모(가장 가까운 조상)에 container-type: inline-size 가 있어야 동작.
   */
  fluidBaseWidth?: number;
};

export function SpeechBubble({
  speaker,
  children,
  widthPct = 64,
  tail = true,
  tailPosition = "top",
  radius = 33,
  textSize = 16,
  lineHeight = "28px",
  paddingX = 24,
  paddingY = 20,
  fluidBaseWidth,
}: Props) {
  const fluid = fluidBaseWidth != null;
  const base = fluidBaseWidth ?? 1;
  // px → 유동: 컨테이너 폭 대비 비율로 환산, base 폭에서 원래 px가 되도록 상한 cap.
  const sz = (px: number) =>
    fluid ? `min(${px}px, ${((px / base) * 100).toFixed(3)}cqw)` : `${px}px`;
  const textLineHeight = fluid ? parseFloat(lineHeight) / textSize : lineHeight;
  const textLetterSpacing = fluid ? `${(0.36 / textSize).toFixed(4)}em` : "0.36px";
  const tailStyle =
    tailPosition === "top"
      ? { top: -15 }
      : { bottom: -15, transform: "scaleY(-1)" };
  return (
    <div className="relative inline-block" style={{ maxWidth: `${widthPct}%` }}>
      {tail && (
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          style={{
            position: "absolute",
            ...tailStyle,
            left: `calc(${TAIL_LEFT_PCT}% - 8px)`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <path d="M 1 16 L 8 1 L 15 16 Z" fill={BUBBLE_BG} />
          <path
            d="M 1 16 L 8 1 L 15 16"
            fill="none"
            stroke={BUBBLE_BORDER}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
          <rect x="2" y="15.25" width="12" height="2" fill={BUBBLE_BG} />
        </svg>
      )}
      <div
        style={{
          background: BUBBLE_BG,
          border: `1.5px solid ${BUBBLE_BORDER}`,
          borderRadius: sz(radius),
          padding: `${sz(paddingY)} ${sz(paddingX)}`,
        }}
      >
        {speaker && (
          <p
            className="text-left mb-2"
            style={{
              color: "#c9a96e",
              fontFamily: "Pretendard, sans-serif",
              fontSize: sz(13),
              fontWeight: 600,
            }}
          >
            {speaker}
          </p>
        )}
        <div
          className="text-left"
          style={{
            color: "#FFF",
            fontFamily: "Pretendard, sans-serif",
            fontSize: sz(textSize),
            fontWeight: 500,
            lineHeight: textLineHeight,
            letterSpacing: textLetterSpacing,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
