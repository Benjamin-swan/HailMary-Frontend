"use client";

import type { ReactNode } from "react";

type FlipCardProps = {
  isFlipped: boolean;
  back: ReactNode;
  front: ReactNode;
};

export function FlipCard({ isFlipped, back, front }: FlipCardProps) {
  return (
    <div style={{ height: "100%", perspective: "1200px", width: "100%" }}>
      <div
        style={{
          height: "100%",
          position: "relative",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transformStyle: "preserve-3d",
          transition: "transform 0.9s cubic-bezier(0.4, 0.0, 0.2, 1)",
          width: "100%",
        }}
      >
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: "20px",
            bottom: 0,
            left: 0,
            overflow: "hidden",
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          {back}
        </div>

        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: "20px",
            bottom: 0,
            left: 0,
            overflow: "auto",
            position: "absolute",
            right: 0,
            scrollbarWidth: "none",
            top: 0,
            transform: "rotateY(180deg)",
          }}
        >
          {front}
        </div>
      </div>
    </div>
  );
}
