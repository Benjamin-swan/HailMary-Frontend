"use client";

import type { SajuResult, AreaKey } from "../../../domain/types";

type ScoreRadarProps = {
  areas: SajuResult["areas"];
};

const NEON_ORANGE = "#ff9a3c";
const NEON_RED = "#ff4d5e";

// 깨비가 펜타곤을 안은 통짜 디자이너 이미지 (배경, SVG로 교체 — 벡터)
const KKEBI_PENTAGON_SRC = "/kkebi/images/kkebi-pentagon.svg";

// ── 정합 핵심 ───────────────────────────────────────────────
// 배경 이미지와 SVG가 "동일 종횡비 박스"를 공유하면, 같이 스케일되어
// 어떤 화면에서도 안 틀어진다. viewBox를 이미지 픽셀 크기와 1:1로 맞춘다.
// 그래프투명최종본 SVG의 viewBox = 0 0 365 360 (거의 정사각).
const IMG = 365;           // 이미지 한 변 (svg viewBox 기준)
// 이미지 속 펜타곤의 중심·반지름 (PNG 1247 기준 좌표를 365 기준으로 비례 환산).
const CX = 226;            // 펜타곤 중심 x — 미세조정(-5, 왼쪽)
const CY = 225;            // 펜타곤 중심 y — 미세조정(+5, 아래)
const R = 123;             // 펜타곤 외곽 반지름 (420/1247 × 365)
const SCORE_MIN = 30;
const SCORE_MAX = 100;
// ────────────────────────────────────────────────────────────

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

export default function ScoreRadar({ areas }: ScoreRadarProps) {
  const scorePath =
    ORDER.map((key, i) => {
      const [x, y] = point(i, scoreToRadius(areas[key].score));
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ") + " Z";

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}>
      {/* 배경: 깨비 + 네온 펜타곤 통짜 이미지 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={KKEBI_PENTAGON_SRC}
        alt="깨비"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
        }}
      />

      {/* 오버레이: 점수 면적만. viewBox가 이미지와 1:1 → 같이 스케일되어 정합 유지 */}
      <svg
        viewBox={`0 0 ${IMG} ${IMG}`}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden
      >
        <defs>
          <linearGradient id="score-stroke" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={NEON_ORANGE} />
            <stop offset="100%" stopColor={NEON_RED} />
          </linearGradient>
          <radialGradient id="score-fill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={NEON_RED} stopOpacity={0.12} />
            <stop offset="70%" stopColor={NEON_ORANGE} stopOpacity={0.36} />
            <stop offset="100%" stopColor={NEON_ORANGE} stopOpacity={0.58} />
          </radialGradient>
          <filter id="score-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d={scorePath}
          fill="url(#score-fill)"
          stroke="url(#score-stroke)"
          strokeWidth={4}
          strokeLinejoin="round"
          filter="url(#score-glow)"
        />
      </svg>
    </div>
  );
}
