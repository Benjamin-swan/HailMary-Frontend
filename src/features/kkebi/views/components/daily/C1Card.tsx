"use client";

import { useState, useEffect } from "react";
import { FlipCard } from "../shared/FlipCard";
import ScoreRadar from "./ScoreRadar";
import type { SajuResult } from "../../../domain/types";

type C1CardProps = {
  data: SajuResult;
  userName?: string;
  onFlip?: () => void;
};

export default function C1Card({ data, userName, onFlip }: C1CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const name = userName ?? data.user.name;
  const scoreColor = data.total.score <= 30 ? "var(--v2-gold)" : "var(--v2-gold-bright)";

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleFlip = () => {
    if (!isReady || isFlipped) return;
    setIsFlipped(true);
    onFlip?.();
  };

  const cardBack = (
    <div
      style={{
        backgroundImage: "url(/kkebi/cards/back.png)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundColor: "var(--v2-bg-card)",
        height: "100%",
        width: "100%",
      }}
    />
  );

  const cardFront = (
    <div style={{
      backgroundColor: "var(--v2-bg-card)",
      backgroundImage: "url(/kkebi/cards/front.png)",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 100%",
      height: "100%",
      overflow: "hidden",
      position: "relative",
      width: "100%",
    }}>
      <div style={{
        bottom: "40px",
        left: "28px",
        overflow: "hidden",
        position: "absolute",
        right: "28px",
        top: "40px",
      }}>
        <div style={{ height: "100%", overflowY: "auto", scrollbarWidth: "none" as const }}>
          <div style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            minHeight: "100%",
          }}>
            <p style={{
              color: "var(--v2-text-secondary)",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              fontWeight: 400,
              letterSpacing: "var(--ls-wide)",
              margin: 0,
            }}>
              {data.cycle.displayDate}
            </p>

            <p style={{
              color: "var(--v2-gold)",
              fontFamily: "var(--font-title)",
              fontSize: "var(--text-lg)",
              fontWeight: 700,
              letterSpacing: "var(--ls-tight)",
              lineHeight: "var(--lh-tight)",
              margin: 0,
              textAlign: "center",
            }}>
              {name}님 오늘의 운세는?
            </p>

            {/* 헤드라인 말풍선 박스 */}
            <div style={{
              background: "var(--v2-bg-overlay)",
              border: "1px solid var(--v2-gold-border)",
              borderRadius: "12px",
              color: "var(--v2-text-primary)",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              lineHeight: "var(--lh-normal)",
              margin: "8px auto 0",
              maxWidth: "300px",
              padding: "10px 18px",
              textAlign: "center",
              wordBreak: "keep-all",
            }}>
              {data.total.summary}
            </div>

            {/* 네온 펜타곤 점수표 (SVG — 플랫폼 무관 정합) */}
            <div style={{ width: "100%" }}>
              <ScoreRadar areas={data.areas} />
            </div>

            <p style={{
              color: scoreColor,
              fontFamily: "var(--font-title)",
              fontSize: "var(--text-score-lg)",
              fontWeight: 800,
              lineHeight: "var(--lh-tight)",
              margin: 0,
            }}>
              {data.total.score}점
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes cardGlow {
          0%, 100% {
            box-shadow:
              0 4px 6px rgba(0,0,0,0.3),
              0 16px 48px rgba(0,0,0,0.5),
              0 0 20px rgba(232,200,125,0.15);
          }
          50% {
            box-shadow:
              0 4px 6px rgba(0,0,0,0.3),
              0 16px 48px rgba(0,0,0,0.5),
              0 0 48px rgba(232,200,125,0.55),
              0 0 24px rgba(232,93,82,0.2);
          }
        }
        @keyframes tapBounce {
          0%, 100% { transform: translateY(0); opacity: 0.9; }
          50%       { transform: translateY(-8px); opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ alignItems: "center", display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          className="kkebi-card"
          onClick={handleFlip}
          style={{
            animation: isReady && !isFlipped
              ? "cardGlow 2.4s ease-in-out infinite"
              : "card-fade-in 0.4s ease-out",
            aspectRatio: "9/16",
            borderRadius: "20px",
            cursor: isReady && !isFlipped ? "pointer" : "default",
            margin: "0 auto",
            maxWidth: "380px",
            width: "min(380px, calc(100vw - 32px))",
          }}
        >
          <FlipCard isFlipped={isFlipped} back={cardBack} front={cardFront} />
        </div>

        {isReady && !isFlipped && (
          <div
            onClick={handleFlip}
            style={{
              alignItems: "center",
              animation: "fadeInUp 0.6s ease-out",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ animation: "tapBounce 1.6s ease-in-out infinite", fontSize: 28 }}>
              ✦
            </div>
            <p style={{
              color: "var(--v2-gold)",
              fontFamily: "var(--font-title)",
              fontSize: "var(--text-sm)",
              letterSpacing: "0.1em",
              margin: 0,
              opacity: 0.85,
            }}>
              탭하여 오늘의 운세 확인
            </p>
          </div>
        )}
      </div>
    </>
  );
}
