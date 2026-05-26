"use client";

import { useState } from "react";
import type { KkebiMood } from "../../../domain/types";
import KkebiSpeechBubble from "./KkebiSpeechBubble";

export type KkebiSlotProps = {
  mood?: KkebiMood | "M1" | "M2" | "M3";
  pose?: "greeting" | "corner" | "loading" | "main"
       | "love" | "work" | "money" | "health" | "study"
       | "feedback" | "crosssell" | "ad";
  size?: "sm" | "md" | "lg" | "xl";
  customWidth?: string;
  className?: string;
  bubbleText?: string;
  bubblePosition?: "top" | "bottom";
};

const IMAGE_BASE = "/kkebi/images";

// 컨텐츠 영역(~332px) 기준 비율
const SIZE_MAP: Record<string, string> = {
  sm: "55%",
  md: "70%",
  lg: "82%",
  xl: "90%",
};

function getImageSrc(
  pose: KkebiSlotProps["pose"],
  mood: KkebiSlotProps["mood"],
): string | null {
  if (pose === "corner" || pose === "greeting") {
    const moodMap: Record<string, string> = {
      M1: "corner-m1", M2: "corner-m2", M3: "corner-m3",
    };
    return `${IMAGE_BASE}/${moodMap[String(mood)] ?? "corner-m1"}.png`;
  }
  if (pose === "ad")       return `${IMAGE_BASE}/ad-m1.png`;
  if (pose === "loading")  return `${IMAGE_BASE}/loading-default.png`;
  if (pose === "feedback") return `${IMAGE_BASE}/feedback-default.png`;
  if (pose === "main") {
    const moodMap: Record<string, string> = {
      high:       "main-high",
      "mid-high": "main-mid-high",
      mid:        "main-mid",
      low:        "main-low",
    };
    return `${IMAGE_BASE}/${moodMap[String(mood)] ?? "main-mid"}.png`;
  }
  const areaMap: Record<string, string> = {
    love:   "love-default",
    work:   "work-default",
    money:  "money-default",
    health: "health-default",
    study:  "study-default",
  };
  if (pose && areaMap[pose]) return `${IMAGE_BASE}/${areaMap[pose]}.png`;
  return null;
}

export default function KkebiSlot({
  mood = "M1",
  pose = "corner",
  size = "md",
  customWidth,
  className = "",
  bubbleText,
  bubblePosition,
}: KkebiSlotProps) {
  const [imgError, setImgError] = useState(false);

  const imgSrc = getImageSrc(pose, mood);
  const sizeVal = customWidth ?? SIZE_MAP[size] ?? SIZE_MAP.md;

  const imageEl = imgSrc && !imgError ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt="깨비"
      onError={() => setImgError(true)}
      style={{
        display: "block",
        height: "auto",
        objectFit: "contain",
        width: "100%",
      }}
    />
  ) : (
    <div
      style={{
        aspectRatio: "1/1",
        background: "var(--v2-bg-card)",
        border: "2px dashed var(--v2-gold-border)",
        borderRadius: "8px",
        color: "var(--v2-gold)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        gap: "4px",
        width: "100%",
      }}
    >
      <span>[깨비]</span>
      <span>{String(mood)} · {pose}</span>
    </div>
  );

  return (
    <div
      className={className}
      style={{ display: "flex", justifyContent: "center", width: "100%" }}
    >
      <div style={{ alignItems: "center", display: "flex", flexDirection: "column", gap: "8px", width: sizeVal }}>
        {bubbleText && bubblePosition === "top" && (
          <KkebiSpeechBubble text={bubbleText} position="top" />
        )}
        {imageEl}
        {bubbleText && bubblePosition === "bottom" && (
          <KkebiSpeechBubble text={bubbleText} position="bottom" />
        )}
      </div>
    </div>
  );
}
