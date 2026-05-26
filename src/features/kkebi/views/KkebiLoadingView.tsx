"use client";

import { useKkebiLoading } from "../hooks/useKkebiLoading";
import Card from "./components/shared/Card";
import PageContainer from "./components/shared/PageContainer";
import KkebiSlot from "./components/kkebi/KkebiSlot";

export function KkebiLoadingView() {
  useKkebiLoading();

  return (
    <PageContainer>
      <Card innerOverflow="visible">
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              animation: "kkebi-pulse 2s ease-in-out infinite",
              transform: "scale(1.5)",
              transformOrigin: "center center",
            }}
          >
            <KkebiSlot mood="M1" pose="loading" size="xl" customWidth="72%" />
          </div>
          <p
            style={{
              color: "var(--v2-text-muted)",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              letterSpacing: "var(--ls-wide)",
              margin: 0,
            }}
          >
            깨비가 오늘 운세를 살피고 있어...
          </p>
        </div>
      </Card>
    </PageContainer>
  );
}
