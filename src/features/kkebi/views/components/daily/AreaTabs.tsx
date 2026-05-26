"use client";

import type { AreaKey } from "../../../domain/types";

type AreaTabsProps = {
  activeArea: AreaKey;
  onChange: (area: AreaKey) => void;
};

const TABS: Array<{ key: AreaKey; label: string }> = [
  { key: "love",   label: "연애" },
  { key: "work",   label: "직장" },
  { key: "money",  label: "재물" },
  { key: "health", label: "건강" },
  { key: "study",  label: "학업" },
];

export default function AreaTabs({ activeArea, onChange }: AreaTabsProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {TABS.map((tab) => {
        const isActive = tab.key === activeArea;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            style={{
              background: "transparent",
              border: "none",
              borderBottom: isActive
                ? "2px solid var(--v2-gold)"
                : "2px solid transparent",
              color: isActive ? "var(--v2-gold)" : "var(--v2-text-muted)",
              cursor: "pointer",
              flex: 1,
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              fontWeight: isActive ? "var(--fw-bold)" : "var(--fw-regular)",
              padding: "8px 0",
              textAlign: "center",
              transition: "color 0.2s ease, border-color 0.2s ease",
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
