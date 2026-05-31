"use client";

import { useKkebiAdGate } from "../hooks/useKkebiAdGate";
import Card from "./components/shared/Card";
import PageContainer from "./components/shared/PageContainer";
import KkebiSlot from "./components/kkebi/KkebiSlot";
import KkebiSpeechBubble from "./components/kkebi/KkebiSpeechBubble";

const AD_DIALOGUE = "나 츄르 사먹게 광고 한 번 봐줘";

export function KkebiAdView() {
  const { handleAdClick } = useKkebiAdGate();

  return (
    <PageContainer>
      <Card>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: 0,
            height: "100%",
            justifyContent: "center",
            transform: "translateY(-15px)",
          }}
        >
          {/* 1. 말풍선 */}
          <KkebiSpeechBubble
            text={AD_DIALOGUE}
            position="top"
            style={{
              fontSize: "var(--text-base)",
              marginTop: 3,
              maxWidth: "260px",
              padding: "10px 18px",
            }}
          />

          {/* 2. 깨비 — 버튼 위에 살짝 걸치게 (앞발만 버튼 위, 글자 안 가리게) */}
          <div
            style={{
              marginBottom: -65,
              pointerEvents: "none",
              position: "relative",
              zIndex: 2,
            }}
          >
            <KkebiSlot mood="M1" pose="ad" size="xl" />
          </div>

          {/* 3. 버튼 */}
          <button
            onClick={handleAdClick}
            className="v2-btn-active"
            style={{
              background:
                "linear-gradient(135deg, var(--v2-coral), var(--v2-coral-soft))",
              border: "none",
              borderRadius: "12px",
              color: "#ffffff",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-base)",
              fontWeight: 700,
              letterSpacing: "var(--ls-wide)",
              padding: "16px 24px",
              position: "relative",
              width: "100%",
              zIndex: 1,
            }}
          >
            광고 보러 가기
          </button>

          {/* 4. 안내 텍스트 */}
          <p
            style={{
              color: "var(--v2-text-muted)",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              margin: 0,
              marginTop: 12,
              textAlign: "center",
            }}
          >
            광고를 보면 깨비가 오늘 운세를 알려줘요
          </p>
        </div>
      </Card>
    </PageContainer>
  );
}
