"use client";

import { useState } from "react";
import Card from "../shared/Card";
import AreaTabs from "./AreaTabs";
import AreaContent from "./AreaContent";
import { trackDaily } from "../../../domain/dailyAnalytics";
import type { AreaKey, SajuResult } from "../../../domain/types";

type C3CardProps = { data: SajuResult };

export default function C3Card({ data }: C3CardProps) {
  const [activeArea, setActiveArea] = useState<AreaKey>("love");

  const handleAreaChange = (area: AreaKey) => {
    if (area !== activeArea) trackDaily("daily_area_tab_click", { area });
    setActiveArea(area);
  };

  return (
    <Card>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
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
          style={{
            flex: 1,
            overflowX: "hidden",
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
        >
          <AreaContent
            key={activeArea}
            areaKey={activeArea}
            area={data.areas[activeArea]}
          />
        </div>
      </div>
    </Card>
  );
}
