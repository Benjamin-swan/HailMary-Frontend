"use client";

import type { ReactNode } from "react";

const BUBBLE_BG = "#12110F";
const BUBBLE_BORDER = "#856C51";

type Props = {
  children: ReactNode;
  widthPct?: number;
};

export function InfoBox({ children, widthPct = 48 }: Props) {
  const W = 320;
  const H = 72;
  const r = 35;

  const d = [
    `M ${r} 0`,
    `H ${W - r}`,
    `Q ${W} 0 ${W} ${r}`,
    `V ${H - r}`,
    `Q ${W} ${H} ${W - r} ${H}`,
    `H ${r}`,
    `Q 0 ${H} 0 ${H - r}`,
    `V ${r}`,
    `Q 0 0 ${r} 0`,
    `Z`,
  ].join(" ");

  return (
    <div className="relative" style={{ width: `${widthPct}%` }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto block"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d={d}
          fill={BUBBLE_BG}
          stroke={BUBBLE_BORDER}
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center px-5">
        <p
          className="text-[17px] leading-snug text-center"
          style={{ color: "#e8e0d4", fontWeight: 300 }}
        >
          {children}
        </p>
      </div>
    </div>
  );
}
