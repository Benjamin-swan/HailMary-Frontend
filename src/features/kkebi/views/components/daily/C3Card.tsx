"use client";

import { useEffect, useRef, useState } from "react";
import Card from "../shared/Card";
import AreaTabs from "./AreaTabs";
import AreaContent from "./AreaContent";
import { trackDaily } from "../../../domain/dailyAnalytics";
import type { AreaKey, SajuResult } from "../../../domain/types";

type C3CardProps = { data: SajuResult };

export default function C3Card({ data }: C3CardProps) {
  const [activeArea, setActiveArea] = useState<AreaKey>("love");
  const [showScrollHint, setShowScrollHint] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 탭 전환 시 풀이 영역을 맨 위로 리셋 + 스크롤 힌트 재평가
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: 0 });
    // 더 읽을 내용(스크롤 여유)이 있으면 힌트 표시
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setShowScrollHint(el.scrollHeight - el.clientHeight > 12);
  }, [activeArea]);

  // 조금이라도 스크롤하면 힌트 숨김 (사용자가 이미 인지)
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const remaining = el.scrollHeight - el.clientHeight - el.scrollTop;
    setShowScrollHint(el.scrollTop < 8 && remaining > 12);
  };

  const handleAreaChange = (area: AreaKey) => {
    if (area !== activeArea) trackDaily("daily_area_tab_click", { area });
    setActiveArea(area);
  };

  return (
    <Card>
      <style>{`
        @keyframes kkebiScrollHint {
          0%, 100% { opacity: 0.18; }
          50%       { opacity: 0.85; }
        }
      `}</style>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
        <div style={{ background: "transparent", flexShrink: 0, paddingBottom: 8 }}>
          <p
            style={{
              color: "var(--v2-gold)",
              fontFamily: "var(--font-title)",
              fontSize: "var(--text-lg)",
              fontWeight: 700,
              letterSpacing: "var(--ls-tight)",
              lineHeight: "var(--lh-tight)",
              margin: "0 0 12px",
              textAlign: "center",
            }}
          >
            오늘의 5영역 풀이
          </p>
          <AreaTabs activeArea={activeArea} onChange={handleAreaChange} />
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{
            flex: 1,
            overflowX: "hidden",
            overflowY: "auto",
            scrollbarWidth: "none",
            touchAction: "pan-y",
          }}
        >
          <AreaContent
            key={activeArea}
            areaKey={activeArea}
            area={data.areas[activeArea]}
          />
        </div>

        {/* 스크롤 유도 힌트 — 깜박이는 chevron 3개(∨∨∨). 스크롤하면 사라짐. */}
        {showScrollHint && (
          <div
            aria-hidden
            style={{
              alignItems: "center",
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              left: 0,
              pointerEvents: "none",
              position: "absolute",
              right: 0,
            }}
          >
            {[0, 1, 2].map((i) => (
              <svg
                key={i}
                width="24"
                height="13"
                viewBox="0 0 24 14"
                style={{
                  marginTop: i === 0 ? 0 : -6,
                  animation: `kkebiScrollHint 1.4s ease-in-out ${i * 0.18}s infinite`,
                }}
              >
                <polyline
                  points="4 4 12 11 20 4"
                  fill="none"
                  stroke="var(--v2-gold)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
