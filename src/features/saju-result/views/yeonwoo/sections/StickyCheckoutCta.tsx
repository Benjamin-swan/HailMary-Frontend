"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/shared/utils/analytics";

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
  visible?: boolean;
  // HM-FE-91: true일 때 CTA 비활성("6월 초 오픈 예정") + onClick 차단.
  // 6월 초 유료 결제 라이브 시 disabled={false} 한 줄 토글로 복원.
  disabled?: boolean;
};

export function StickyCheckoutCta({ visible = true, disabled = false }: Props = {}) {
  const router = useRouter();
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
      className="fixed bottom-0 left-0 right-0 mx-auto z-50 px-4 pb-3 pt-3"
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
          color: "#ECECEC",
          textShadow: "0 4px 4px rgba(0,0,0,0.25)",
          fontFamily: "Pretendard, sans-serif",
          fontSize: "16px",
          fontWeight: 500,
          letterSpacing: "-0.64px",
        }}
      >
        {disabled ? "정밀 리포트는 곧 만나요" : `마지막 오픈 할인까지 ${formatHMS(remainingMs)}`}
      </p>
      <button
        type="button"
        className="w-full flex items-center justify-center"
        style={{
          height: "55px",
          borderRadius: "11px",
          background: "#D73F59",
          color: "#FFF",
          fontFamily: "Pretendard, sans-serif",
          fontSize: "16px",
          fontWeight: 700,
          gap: "10px",
          opacity: disabled ? 0.55 : 1,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        onClick={() => {
          if (disabled) {
            trackEvent("pay_cta_blocked", { character_id: "yeonwoo" });
            return;
          }
          trackEvent("pay_cta_click", { character_id: "yeonwoo" });
          router.push("/checkout/yeonwoo");
        }}
        aria-disabled={disabled}
      >
        {disabled ? "6월 초 오픈 예정" : "결제하고 연우의 정밀 리포트 읽기"}
      </button>
    </div>
  );
}
