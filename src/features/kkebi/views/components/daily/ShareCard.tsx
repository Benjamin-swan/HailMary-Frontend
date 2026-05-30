"use client";

import { forwardRef } from "react";
import type { SajuResult, AreaKey } from "../../../domain/types";

type ShareCardProps = {
  data: SajuResult;
  userName: string;
  dateStr: string;
};

// 메인 ScoreRadar와 동일한 펜타곤 좌표 (SVG로 교체, viewBox 365×360 기준)
const IMG = 365;
const CX = 227;
const CY = 221;
const R = 123;
const SCORE_MIN = 30;
const SCORE_MAX = 100;
const KKEBI_PENTAGON_SRC = "/kkebi/images/kkebi-pentagon.svg";
const NEON_ORANGE = "#ff9a3c";
const NEON_RED = "#ff4d5e";

const ORDER: AreaKey[] = ["love", "work", "money", "health", "study"];

function angle(i: number): number {
  return (-90 + i * (360 / 5)) * (Math.PI / 180);
}
function point(i: number, r: number): [number, number] {
  const a = angle(i);
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
}
function scoreToRadius(score: number): number {
  const c = Math.max(SCORE_MIN, Math.min(SCORE_MAX, score));
  return ((c - SCORE_MIN) / (SCORE_MAX - SCORE_MIN)) * R;
}

export const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  ({ data, userName, dateStr }, ref) => {
    const scorePath =
      ORDER.map((key, i) => {
        const [x, y] = point(i, scoreToRadius(data.areas[key].score));
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      }).join(" ") + " Z";

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
          justifyContent: "flex-start",
          gap: 20,
          height: "675px",
          left: "-9999px",
          padding: "44px 32px",
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
          <p style={{ color: "#a89070", fontSize: 12, margin: 0 }}>
            {dateStr}
          </p>
        </div>

        <p style={{
          color: "#f0d060",
          fontFamily: "serif",
          fontSize: 44,
          fontWeight: 800,
          lineHeight: 1,
          margin: 0,
        }}>
          {data.total.score}점
        </p>

        {/* 깨비 + 네온 펜타곤 통짜 이미지 + 점수 면적 (메인과 동일 룩) */}
        <div style={{ position: "relative", width: "250px", height: "250px", marginBottom: "-5px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={KKEBI_PENTAGON_SRC}
            alt="깨비"
            crossOrigin="anonymous"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
          />
          <svg
            viewBox={`0 0 ${IMG} ${IMG}`}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            aria-hidden
          >
            <defs>
              <linearGradient id="share-stroke" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={NEON_ORANGE} />
                <stop offset="100%" stopColor={NEON_RED} />
              </linearGradient>
              <radialGradient id="share-fill" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={NEON_RED} stopOpacity={0.12} />
                <stop offset="70%" stopColor={NEON_ORANGE} stopOpacity={0.36} />
                <stop offset="100%" stopColor={NEON_ORANGE} stopOpacity={0.58} />
              </radialGradient>
            </defs>
            <path
              d={scorePath}
              fill="url(#share-fill)"
              stroke="url(#share-stroke)"
              strokeWidth={4}
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          margin: "0 0 30px 0",
          width: "100%",
        }}>
          {/* 짧고 굵은 골든 그라데이션 라인 */}
          <div style={{
            background: "linear-gradient(90deg, #b8924d 0%, #f0d060 50%, #b8924d 100%)",
            borderRadius: "2px",
            height: "3px",
            width: "50px",
          }} />
          {/* 인용구 — 원래 스타일 sans-serif cream */}
          <div style={{ padding: "6px 16px 0", textAlign: "center" }}>
            <span style={{
              color: "#f0e6d3",
              fontSize: 16,
              fontWeight: 700,
              lineHeight: 1.6,
              wordBreak: "keep-all",
            }}>
              &ldquo;{data.total.summary}&rdquo;
            </span>
          </div>
        </div>

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
