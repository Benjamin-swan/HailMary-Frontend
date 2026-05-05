"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SuccessBody() {
  const params = useSearchParams();
  const paymentKey = params.get("paymentKey") ?? "";
  const orderId = params.get("orderId") ?? "";
  const amount = params.get("amount") ?? "";

  return (
    <main className="flex min-h-[100dvh] flex-1 flex-col items-center justify-center gap-6 bg-white px-6 py-10 text-neutral-900">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h1 className="text-xl font-semibold">결제 인증 성공</h1>
      <p className="text-center text-[13px] text-neutral-500">
        토스페이먼츠 결제 인증이 완료되었어요.
        <br />
        승인 단계는 백엔드에서 처리됩니다 (현재 테스트 — 승인 미연동).
      </p>

      <dl className="w-full max-w-md select-text space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-5 text-[12.5px]">
        <div>
          <dt className="font-medium text-neutral-700">paymentKey</dt>
          <dd className="mt-1 break-all text-neutral-900">{paymentKey || "(없음)"}</dd>
        </div>
        <div>
          <dt className="font-medium text-neutral-700">orderId</dt>
          <dd className="mt-1 break-all text-neutral-900">{orderId || "(없음)"}</dd>
        </div>
        <div>
          <dt className="font-medium text-neutral-700">amount</dt>
          <dd className="mt-1 text-neutral-900">{amount ? `${Number(amount).toLocaleString("ko-KR")}원` : "(없음)"}</dd>
        </div>
      </dl>

      <Link
        href="/"
        className="rounded-full border border-neutral-300 px-5 py-2 text-[13px] text-neutral-700 hover:bg-neutral-100"
      >
        메인으로 돌아가기
      </Link>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessBody />
    </Suspense>
  );
}
