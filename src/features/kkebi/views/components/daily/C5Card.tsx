"use client";

import { useRef, useState } from "react";
import Card from "../shared/Card";
import KkebiSlot from "../kkebi/KkebiSlot";
import KkebiSpeechBubble from "../kkebi/KkebiSpeechBubble";
import { ShareCard } from "./ShareCard";
import { trackDaily } from "../../../domain/dailyAnalytics";
import { scoreToMood } from "../../../domain/sajuRules";
import type { SajuResult } from "../../../domain/types";

type FeedbackType = "good" | "bad" | "unsure";

type C5CardProps = {
  data: SajuResult;
  userName?: string;
};

const BUBBLE_TEXT: Record<FeedbackType | "null", string> = {
  null:   "오늘 운세 어땠어?",
  good:   "...그럴 줄 알았어.",
  bad:    "그래도 봐줬잖아.",
  unsure: "...뭐, 그럴 수도 있지.",
};

const FEEDBACK_BUTTONS: Array<{ type: FeedbackType; label: string }> = [
  { type: "good",   label: "맞았다" },
  { type: "bad",    label: "아쉬웠다" },
  { type: "unsure", label: "모르겠다" },
];

const DIVIDER = (
  <div style={{ borderTop: "1px solid rgba(232, 200, 125, 0.15)", width: "100%" }} />
);

export default function C5Card({ data, userName }: C5CardProps) {
  const [feedback, setFeedback] = useState<FeedbackType | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const shareCardRef = useRef<HTMLDivElement>(null);
  const mood = scoreToMood(data.total.score);
  const bubbleKey = (feedback ?? "null") as FeedbackType | "null";
  const displayName = userName ?? data.user.name;
  const dateStr = data.cycle.displayDate;

  const handleFeedback = (type: FeedbackType) => {
    setFeedback(type);
    trackDaily("daily_feedback", { type });
  };

  // HM-FE-111: navigator.share 불가 환경(iOS Chrome 등) 폴백.
  // 새 탭에 이미지 + "길게 눌러 저장" 안내를 띄운다. 새 탭은 별도 문서라
  // globals.css(body user-select:none) 영향 없음 + touch-callout 명시 허용.
  const openImageForSave = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const tab = window.open("", "_blank");

    if (!tab) {
      // 팝업 차단 등 — 최종 폴백: 같은 창 이동(최소한 이미지는 보여줌)
      window.location.href = url;
      return;
    }

    tab.document.write(`<!DOCTYPE html>
<html lang="ko"><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
<title>오늘의 운세 저장</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#1a0f2e; color:#f0e6d3; font-family:-apple-system,system-ui,sans-serif;
         min-height:100vh; display:flex; flex-direction:column; align-items:center;
         padding:20px 16px; gap:16px; }
  p { font-size:15px; line-height:1.5; text-align:center; opacity:0.9; }
  .hint { color:#e8c87d; font-weight:700; }
  img { max-width:100%; width:380px; border-radius:16px;
        -webkit-touch-callout:default; -webkit-user-select:auto; user-select:auto; }
</style></head>
<body>
  <p class="hint">이미지를 길게 눌러<br/>사진에 저장하세요</p>
  <img src="${url}" alt="오늘의 운세" />
  <p style="font-size:12px;opacity:0.55;">도화선사주 · dohwaseonsaju.com</p>
</body></html>`);
    tab.document.close();
    // object URL은 새 탭이 참조하므로 즉시 revoke 금지(탭 닫힐 때 OS가 회수).
  };

  const handleShare = async () => {
    if (!shareCardRef.current || isCapturing) return;
    setIsCapturing(true);

    try {
      // 동적 import — 공유 버튼 누른 사용자만 ~200kB 다운로드
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(shareCardRef.current, {
        backgroundColor: null,
        logging: false,
        scale: 2,
        useCORS: true,
      });

      // toBlob을 Promise로 wrap해서 외부 try-finally가 share 완료까지 대기
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, "image/png");
      });

      if (!blob) {
        trackDaily("daily_share_click", { result: "fail" });
        return;
      }

      const file = new File([blob], `도화선-운세-${dateStr}.png`, { type: "image/png" });

      // HM-FE-114: 윈도우는 OS share 시트 대신 바로 다운로드.
      // 맥·모바일은 기존 navigator.share 그대로 유지.
      const isWindows = /windows/i.test(navigator.userAgent);

      try {
        if (isWindows) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `도화선-운세-${dateStr}.png`;
          a.click();
          URL.revokeObjectURL(url);
          trackDaily("daily_share_click", { result: "download_win" });
        } else if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `${displayName}님의 오늘 운세 — ${data.total.score}점`,
            text: `"${data.total.summary}" — 도화선사주`,
          });
          trackDaily("daily_share_click", { result: "success" });
        } else {
          // navigator.share(files) 미지원 — iOS Chrome 등. 자동 다운로드가
          // OS 차원에서 막혀(WebKit #167341) 새 탭에 이미지+저장안내로 폴백.
          openImageForSave(blob);
          trackDaily("daily_share_click", { result: "fallback_save" });
        }
      } catch (err) {
        // AbortError(사용자 취소)는 정상 케이스 → silent
        const isAbort = err instanceof DOMException && err.name === "AbortError";
        if (isAbort) {
          trackDaily("daily_share_click", { result: "cancel" });
        } else {
          openImageForSave(blob);
          trackDaily("daily_share_click", { result: "fallback_save" });
          if (typeof console !== "undefined") console.error("공유 실패, 저장 폴백:", err);
        }
      }
    } catch (err) {
      trackDaily("daily_share_click", { result: "fail" });
      if (typeof console !== "undefined") {
        console.error("공유 실패:", err);
      }
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <>
      {/* 공유 카드 — 화면 밖 캡처 전용 */}
      <ShareCard
        ref={shareCardRef}
        data={data}
        userName={displayName}
        dateStr={dateStr}
      />

      <Card>
        <div style={{ height: "100%", overflowX: "hidden", overflowY: "auto", scrollbarWidth: "none", touchAction: "pan-y" }}>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              padding: "24px 0",
            }}
          >
            {/* 섹션 A: 피드백 */}
            <div style={{ alignItems: "center", display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
              <div style={{ alignItems: "center", display: "flex", flexDirection: "column", gap: "8px" }}>
                <KkebiSpeechBubble text={BUBBLE_TEXT[bubbleKey]} position="top" />
                <KkebiSlot pose="feedback" size="md" mood={mood} />
              </div>

              <div style={{ display: "flex", gap: "8px", width: "100%" }}>
                {FEEDBACK_BUTTONS.map((btn) => {
                  const isSelected = feedback === btn.type;
                  return (
                    <button
                      key={btn.type}
                      onClick={() => handleFeedback(btn.type)}
                      style={{
                        background: isSelected ? "var(--v2-coral)" : "var(--v2-bg-card)",
                        border: `1px solid ${isSelected ? "var(--v2-coral)" : "var(--v2-gold-border)"}`,
                        borderRadius: "8px",
                        color: isSelected ? "#ffffff" : "var(--v2-text-primary)",
                        cursor: "pointer",
                        flex: 1,
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-base)",
                        fontWeight: isSelected ? 700 : 500,
                        padding: "12px 0",
                        transition: "background 0.15s, color 0.15s, border-color 0.15s",
                      }}
                    >
                      {btn.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {DIVIDER}

            {/* 섹션 B: Cross-sell */}
            <div style={{ alignItems: "center", display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
              <KkebiSpeechBubble
                text="더 자세히 알고 싶어? 연애운 제대로 풀어줄 수도 있는데."
                position="top"
              />
              <a
                href="https://www.dohwaseonsaju.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackDaily("daily_crosssell_click")}
                style={{
                  background: "none",
                  border: "1px solid var(--v2-gold-border)",
                  borderRadius: "10px",
                  color: "var(--v2-text-primary)",
                  display: "block",
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-base)",
                  fontWeight: 500,
                  padding: "12px 20px",
                  textAlign: "center",
                  textDecoration: "none",
                  width: "100%",
                }}
              >
                연애운 자세히 보기 →
              </a>
            </div>

            {DIVIDER}

            {/* 섹션 C: 공유 */}
            <button
              onClick={handleShare}
              disabled={isCapturing}
              style={{
                alignItems: "center",
                background: isCapturing
                  ? "rgba(232,93,82,0.5)"
                  : "linear-gradient(135deg, var(--v2-coral), var(--v2-coral-soft))",
                border: "none",
                borderRadius: "12px",
                color: "#ffffff",
                cursor: isCapturing ? "default" : "pointer",
                display: "flex",
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-base)",
                fontWeight: "var(--fw-bold)",
                gap: "8px",
                justifyContent: "center",
                letterSpacing: "var(--ls-wide)",
                padding: "8px 20px",
                transition: "opacity 0.15s",
                width: "100%",
              }}
            >
              {!isCapturing && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/kkebi/icons/icon-share.png" alt="공유" width={36} height={36}
                  style={{ objectFit: "contain" }} />
              )}
              {isCapturing ? "준비 중..." : "오늘 운세 공유하기"}
            </button>
          </div>
        </div>
      </Card>
    </>
  );
}
