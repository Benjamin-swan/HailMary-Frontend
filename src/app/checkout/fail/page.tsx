"use client";

import { Suspense, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { trackEvent } from "@/shared/utils/analytics";

function FailBody() {
  const params = useSearchParams();
  const code = params.get("code") ?? "";
  const message = params.get("message") ?? "결제가 정상적으로 완료되지 않았어요.";
  const orderId = params.get("orderId") ?? "";
  const sentRef = useRef(false);

  useEffect(() => {
    if (sentRef.current) return;
    sentRef.current = true;
    let character: string | null = null;
    try {
      const raw = sessionStorage.getItem("checkoutPending");
      if (raw) character = (JSON.parse(raw)?.character as string) ?? null;
    } catch {}
    trackEvent("payment_failed", {
      character_id: character,
      order_id: orderId || null,
      error_code: code || "UNKNOWN",
      error_message: message,
    });
  }, [orderId, code, message]);

  return (
    <main className="flex min-h-[100dvh] flex-1 flex-col items-center justify-center gap-6 bg-white px-6 py-10 text-neutral-900">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
      <h1 className="text-xl font-semibold">결제 실패</h1>
      <p className="max-w-md text-center text-[13px] text-neutral-600">{message}</p>

      {(code || orderId) && (
        <dl className="w-full max-w-md select-text space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-5 text-[12.5px]">
          {code && (
            <div>
              <dt className="font-medium text-neutral-700">code</dt>
              <dd className="mt-1 break-all text-neutral-900">{code}</dd>
            </div>
          )}
          {orderId && (
            <div>
              <dt className="font-medium text-neutral-700">orderId</dt>
              <dd className="mt-1 break-all text-neutral-900">{orderId}</dd>
            </div>
          )}
        </dl>
      )}

      <div className="flex gap-2">
        <Link
          href="/"
          className="rounded-full border border-neutral-300 px-5 py-2 text-[13px] text-neutral-700 hover:bg-neutral-100"
        >
          메인으로
        </Link>
      </div>
    </main>
  );
}

export default function CheckoutFailPage() {
  return (
    <Suspense fallback={null}>
      <FailBody />
    </Suspense>
  );
}
