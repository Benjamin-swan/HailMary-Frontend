"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "../shared/Card";
import type { SajuResult } from "../../../domain/types";

type C2CardProps = { data: SajuResult };

const CORAL        = "#e85d52";
const CORAL_SOFT   = "#f4756a";
const GOLD         = "#e8c87d";
const TEXT_SEC     = "#c8b89a";
const BG_CARD      = "#251a3e";
const GOLD_BORDER  = "rgba(232, 200, 125, 0.3)";

const TIME_ICONS: Record<string, string> = {
  morning:   "/kkebi/icons/icon-morning.png",
  afternoon: "/kkebi/icons/icon-afternoon.png",
  night:     "/kkebi/icons/icon-night.png",
};

const TIME_BLOCKS = [
  { label: "오전", key: "morning"   as const },
  { label: "오후", key: "afternoon" as const },
  { label: "밤",   key: "night"     as const },
];

export default function C2Card({ data }: C2CardProps) {
  const chartData = [
    { name: "오전", score: data.timeFlow.morning.score },
    { name: "오후", score: data.timeFlow.afternoon.score },
    { name: "밤",   score: data.timeFlow.night.score },
  ];

  return (
    <Card>
      <div style={{ height: "100%", overflowX: "hidden", overflowY: "auto", scrollbarWidth: "none", touchAction: "pan-y" }}>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            padding: "24px 0",
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
            오늘의 시간대별 흐름
          </p>

          <div style={{ width: "100%" }}>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
                <defs>
                  <linearGradient id="c2-area-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={CORAL} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={CORAL} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  tick={{ fill: TEXT_SEC, fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  padding={{ left: 20, right: 20 }}
                />
                {/* 점수는 70~99에만 분포 → 하한 30으로 "꽉참↔편차" 균형. ScoreRadar와 동일. */}
                <YAxis domain={[30, 100]} hide />
                <Tooltip
                  contentStyle={{
                    background: BG_CARD,
                    border: `1px solid ${GOLD_BORDER}`,
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                  itemStyle={{ color: GOLD }}
                  labelStyle={{ color: TEXT_SEC }}
                  formatter={(value) => [`${value}점`, ""]}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke={CORAL}
                  strokeWidth={2}
                  fill="url(#c2-area-fill)"
                  dot={{ fill: GOLD, r: 5, strokeWidth: 0 }}
                  activeDot={{ fill: CORAL_SOFT, r: 7, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            {TIME_BLOCKS.map((block, idx) => {
              const period = data.timeFlow[block.key];
              return (
                <div
                  key={block.key}
                  style={{
                    alignItems: "flex-start",
                    borderTop: idx > 0 ? "1px solid rgba(232, 200, 125, 0.08)" : undefined,
                    display: "flex",
                    gap: 12,
                    paddingBottom: "20px",
                    paddingTop: idx > 0 ? "20px" : "4px",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={TIME_ICONS[block.key]} alt={block.label} width={48} height={48}
                    style={{ objectFit: "contain", flexShrink: 0, marginTop: 2 }} />

                  <div style={{ flex: 1 }}>
                    <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ color: "var(--v2-text-secondary)", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 500 }}>
                        {block.label}
                      </span>
                      <span style={{ color: "var(--v2-gold)", fontFamily: "var(--font-title)", fontSize: "var(--text-md)", fontWeight: 700 }}>
                        {period.score}점
                      </span>
                    </div>

                    <p style={{ color: "var(--v2-text-primary)", fontFamily: "var(--font-body)", fontSize: "var(--text-base)", lineHeight: "var(--lh-normal)", margin: "0 0 4px" }}>
                      {period.comment}
                    </p>

                    <p style={{ color: "var(--v2-text-muted)", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontStyle: "italic", lineHeight: "var(--lh-relaxed)", margin: 0 }}>
                      💡 {period.tip}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
