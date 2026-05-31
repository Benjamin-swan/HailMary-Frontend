"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/shared/utils/analytics";

const PRIMARY_COLOR = "#D73F59";
const TEXT_COLOR = "#ECECEC";
const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;

function formatHMS(totalMs: number): string {
  const ms = Math.max(0, totalMs);
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

type Props = {
  ctaLabel: string;
  visible?: boolean;
  onCheckout?: () => void;
  // HM-FE-91: true일 때 CTA 비활성("6월 초 오픈 예정" 문구) + onClick 차단.
  // 6월 초 유료 결제 라이브 시 disabled={false} 한 줄 토글로 복원.
  disabled?: boolean;
  // 비활성 이벤트 트래킹용. disabled=true일 때 클릭 시 pay_cta_blocked 발화.
  characterId?: string;
};

export default function StickyCheckoutCta({
  ctaLabel,
  visible = true,
  onCheckout,
  disabled = false,
  characterId,
}: Props) {
  const [endAt, setEndAt] = useState<number>(() => Date.now() + TWELVE_HOURS_MS);
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (now >= endAt) {
      setEndAt(now + TWELVE_HOURS_MS);
    }
  }, [now, endAt]);

  const remainingMs = Math.max(0, endAt - now);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 mx-auto z-50 px-4 pb-3 pt-4"
      style={{
        maxWidth: "28rem",
        background:
          "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0) 100%)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      <p
        className="text-center mb-2"
        style={{
          color: TEXT_COLOR,
          fontFamily: "Pretendard, sans-serif",
          fontSize: "14px",
          fontWeight: 500,
          letterSpacing: "-0.02em",
        }}
      >
        {disabled ? "정밀 리포트는 곧 만나요" : `마지막 오픈 할인까지 ${formatHMS(remainingMs)}`}
      </p>
      <button
        type="button"
        className="w-full"
        style={{
          height: "55px",
          borderRadius: "11px",
          background: PRIMARY_COLOR,
          color: "#FFF",
          fontFamily: "Pretendard, sans-serif",
          fontSize: "16px",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          boxShadow: disabled ? "none" : "0 6px 18px rgba(233,78,63,0.28)",
          opacity: disabled ? 0.55 : 1,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        onClick={() => {
          if (disabled) {
            trackEvent("pay_cta_blocked", { character_id: characterId ?? "unknown" });
            return;
          }
          if (onCheckout) {
            onCheckout();
          } else {
            alert("결제 페이지는 준비 중이에요.");
          }
        }}
        aria-disabled={disabled}
      >
        {disabled ? "6월 초 오픈 예정" : ctaLabel}
      </button>
    </div>
  );
}
