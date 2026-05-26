"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import type { SajuResult, AreaKey } from "../../../domain/types";

type ScoreRadarProps = {
  areas: SajuResult["areas"];
};

// Recharts SVG presentation attrs는 CSS 변수 미지원 → 토큰 값을 literal로.
const GOLD_BORDER = "rgba(232, 200, 125, 0.3)";
const CORAL = "#e85d52";

const AREA_LABELS: Record<AreaKey, string> = {
  love:   "戀(연)",
  work:   "事(사)",
  money:  "財(재)",
  health: "健(건)",
  study:  "學(학)",
};

const ORDER: AreaKey[] = ["love", "work", "money", "health", "study"];

const AREA_TICK_LABELS: Record<string, { hanja: string; korean: string }> = {
  "戀(연)": { hanja: "戀", korean: "연애" },
  "事(사)": { hanja: "事", korean: "직장" },
  "財(재)": { hanja: "財", korean: "재물" },
  "健(건)": { hanja: "健", korean: "건강" },
  "學(학)": { hanja: "學", korean: "학업" },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTick = ({ x, y, payload }: any) => {
  const label = AREA_TICK_LABELS[payload.value];
  if (!label) return null;
  return (
    <g>
      <text x={x} y={y - 6} textAnchor="middle"
        fill="var(--v2-gold)" fontSize={13} fontWeight={700}>
        {label.hanja}
      </text>
      <text x={x} y={y + 10} textAnchor="middle"
        fill="var(--v2-text-secondary)" fontSize={11}>
        {label.korean}
      </text>
    </g>
  );
};

export default function ScoreRadar({ areas }: ScoreRadarProps) {
  const chartData = ORDER.map((key) => ({
    subject: AREA_LABELS[key],
    score: areas[key].score,
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <RadarChart data={chartData} outerRadius="75%">
        <PolarGrid stroke={GOLD_BORDER} />
        <PolarAngleAxis dataKey="subject" tick={CustomTick} />
        <Radar
          dataKey="score"
          fill={CORAL}
          fillOpacity={0.2}
          stroke={CORAL}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
