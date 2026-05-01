"use client";

import type { ReactNode } from "react";

const BUBBLE_BG = "#FBF1E7";
const BUBBLE_BORDER = "#AD7D38";

type Props = {
  speaker?: string;
  children: ReactNode;
  widthPct?: number;
  tail?: boolean | "up" | "down";
  radius?: number;
  textSize?: number;
  paddingX?: number;
  paddingY?: number;
  align?: "left" | "center";
  tailPosition?: number;
  tailOffsetPx?: number;
  borderWidth?: number;
  lineHeight?: string;
  block?: boolean;
  speakerSize?: number;
  letterSpacing?: string;
};

export function SpeechBubble({
  speaker,
  children,
  widthPct = 68,
  tail = true,
  radius = 33,
  textSize = 17,
  paddingX = 24,
  paddingY = 20,
  align = "left",
  tailPosition = 50,
  tailOffsetPx = 0,
  borderWidth = 1.5,
  lineHeight = "29px",
  block = false,
  speakerSize = 13,
  letterSpacing = "0.36px",
}: Props) {
  const tailDirection: "up" | "down" | null =
    tail === false ? null : tail === "up" ? "up" : "down";
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div
      className={block ? "relative block" : "relative inline-block"}
      style={{
        maxWidth: `${widthPct}%`,
        width: block ? "100%" : undefined,
        paddingTop: tailDirection === "up" ? "15px" : undefined,
        paddingBottom: tailDirection === "down" ? "15px" : undefined,
      }}
    >
      <div
        style={{
          background: BUBBLE_BG,
          border: `${borderWidth}px solid ${BUBBLE_BORDER}`,
          borderRadius: `${radius}px`,
          padding: `${paddingY}px ${paddingX}px`,
        }}
      >
        {speaker && (
          <p
            className={`${alignClass} mb-2`}
            style={{
              color: "#AD7D38",
              fontFamily: "Pretendard, sans-serif",
              fontSize: `${speakerSize}px`,
              fontWeight: 600,
            }}
          >
            {speaker}
          </p>
        )}
        <div
          className={alignClass}
          style={{
            color: "#000",
            fontFamily: "Pretendard, sans-serif",
            fontSize: `${textSize}px`,
            fontWeight: 500,
            lineHeight,
            letterSpacing,
          }}
        >
          {children}
        </div>
      </div>
      {tailDirection === "down" && (
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          style={{
            position: "absolute",
            bottom: 0,
            left: `calc(${tailPosition}% - 8px + ${tailOffsetPx}px)`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <path d="M 1 1 L 8 16 L 15 1 Z" fill={BUBBLE_BG} />
          <path
            d="M 1 1 L 8 16 L 15 1"
            fill="none"
            stroke={BUBBLE_BORDER}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
          <rect x="2" y="0" width="12" height="2" fill={BUBBLE_BG} />
        </svg>
      )}
      {tailDirection === "up" && (
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          style={{
            position: "absolute",
            top: 0,
            left: `calc(${tailPosition}% - 8px + ${tailOffsetPx}px)`,
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
          <rect x="2" y="15" width="12" height="2" fill={BUBBLE_BG} />
        </svg>
      )}
    </div>
  );
}
