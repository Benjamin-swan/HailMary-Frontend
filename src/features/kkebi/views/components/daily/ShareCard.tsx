"use client";

import { forwardRef } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import type { SajuResult } from "../../../domain/types";

type ShareCardProps = {
  data: SajuResult;
  userName: string;
  dateStr: string;
};

export const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  ({ data, userName, dateStr }, ref) => {
    const radarData = [
      { area: "戀", score: data.areas.love.score },
      { area: "事", score: data.areas.work.score },
      { area: "財", score: data.areas.money.score },
      { area: "健", score: data.areas.health.score },
      { area: "學", score: data.areas.study.score },
    ];

    return (
      <div
        ref={ref}
        style={{
          background: "#1a0f2e",
          backgroundImage: "url(/kkebi/cards/front.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          borderRadius: "20px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          height: "675px",
          left: "-9999px",
          padding: "48px 32px",
          position: "fixed",
          top: 0,
          width: "380px",
        }}
      >
        <p style={{
          color: "#e8c87d",
          fontFamily: "serif",
          fontSize: 12,
          letterSpacing: "0.1em",
          margin: 0,
          opacity: 0.8,
        }}>
          도화선사주
        </p>

        <div style={{ textAlign: "center" }}>
          <p style={{
            color: "#f0e6d3",
            fontFamily: "serif",
            fontSize: 18,
            fontWeight: 700,
            margin: "0 0 4px 0",
          }}>
            {userName}님의 오늘 운세
          </p>
          <p style={{
            color: "#a89070",
            fontSize: 12,
            margin: 0,
          }}>
            {dateStr}
          </p>
        </div>

        <p style={{
          color: "#f0d060",
          fontFamily: "serif",
          fontSize: 64,
          fontWeight: 800,
          lineHeight: 1,
          margin: 0,
        }}>
          {data.total.score}점
        </p>

        <div style={{ height: "160px", width: "180px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
              <PolarGrid stroke="rgba(232,200,125,0.2)" />
              <PolarAngleAxis
                dataKey="area"
                tick={{ fill: "#e8c87d", fontSize: 12 }}
              />
              <Radar
                dataKey="score"
                stroke="#e85d52"
                fill="#e85d52"
                fillOpacity={0.3}
                strokeWidth={1.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <p style={{
          borderBottom: "1px solid rgba(232,200,125,0.2)",
          borderTop: "1px solid rgba(232,200,125,0.2)",
          color: "#f0e6d3",
          fontSize: 14,
          lineHeight: 1.6,
          margin: 0,
          padding: "8px 16px",
          textAlign: "center",
          width: "100%",
        }}>
          &ldquo;{data.total.summary}&rdquo;
        </p>

        <p style={{
          color: "#a89070",
          fontSize: 11,
          letterSpacing: "0.05em",
          margin: 0,
          opacity: 0.6,
        }}>
          dohwaseonsaju.com
        </p>
      </div>
    );
  },
);

ShareCard.displayName = "ShareCard";
