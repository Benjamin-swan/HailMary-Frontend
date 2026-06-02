"use client";

import { useEffect, useState } from "react";
import {
  detectInAppBrowser,
  escapeToExternalBrowser,
  type InAppBrowser,
} from "@/shared/utils/inAppBrowser";
import { trackDaily } from "../../domain/dailyAnalytics";

// 인앱 종류별 안내 문구 (탈출 가능성 다름 → 카피로 기대치 조정)
const KIND_LABEL: Record<InAppBrowser, string> = {
  kakao: "카카오톡",
  naver: "네이버 앱",
  line: "라인",
  instagram: "인스타그램",
  facebook: "페이스북",
  other: "현재 앱",
};

/**
 * 인앱브라우저 감지 시에만 노출되는 상단 슬림 배너 [HM-FE-106].
 * "외부 브라우저로 열기" → 탈출 스킴 시도, 실패 시 URL 복사 폴백.
 * 일반 Safari/Chrome에서는 아무것도 렌더하지 않는다(null).
 */
export default function InAppBrowserBanner() {
  // SSR/hydration mismatch 방지 — 마운트 후에만 감지.
  const [kind, setKind] = useState<InAppBrowser | null>(null);
  const [copied, setCopied] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const detected = detectInAppBrowser();
    if (detected) {
      setKind(detected);
      trackDaily("inapp_banner_view", { inapp: detected });
    }
  }, []);

  if (!kind || dismissed) return null;

  const handleEscape = async () => {
    trackDaily("inapp_escape_click", { inapp: kind });
    const result = await escapeToExternalBrowser();
    if (result === "copied" || result === "manual") {
      // 스킴 불가 환경(iOS 네이버/인스타 등) → 주소 복사 안내로 전환
      setCopied(true);
    }
  };

  return (
    <div
      role="alert"
      style={{
        alignItems: "center",
        background: "linear-gradient(135deg, var(--v2-coral), var(--v2-coral-soft))",
        boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
        boxSizing: "border-box",
        color: "#ffffff",
        display: "flex",
        fontFamily: "var(--font-body)",
        gap: "10px",
        justifyContent: "space-between",
        left: 0,
        padding: "10px 14px",
        position: "fixed",
        right: 0,
        top: 0,
        zIndex: 1000,
      }}
    >
      <span style={{ fontSize: "13px", lineHeight: 1.4, wordBreak: "keep-all" }}>
        {copied ? (
          <>주소를 복사했어요. Safari/Chrome에 붙여넣어 열어주세요.</>
        ) : (
          <>
            {KIND_LABEL[kind]}에서는 공유·일부 기능이 제한돼요.
            <br />
            원활한 이용을 위해 외부 브라우저를 권장해요.
          </>
        )}
      </span>

      <div style={{ alignItems: "center", display: "flex", flexShrink: 0, gap: "6px" }}>
        {!copied && (
          <button
            type="button"
            onClick={handleEscape}
            style={{
              background: "#ffffff",
              border: "none",
              borderRadius: "8px",
              color: "var(--v2-coral)",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              fontWeight: 700,
              padding: "8px 12px",
              whiteSpace: "nowrap",
            }}
          >
            브라우저로 열기
          </button>
        )}
        <button
          type="button"
          aria-label="닫기"
          onClick={() => setDismissed(true)}
          style={{
            background: "transparent",
            border: "none",
            color: "#ffffff",
            cursor: "pointer",
            fontSize: "18px",
            lineHeight: 1,
            opacity: 0.85,
            padding: "4px 6px",
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
