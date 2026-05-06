"use client";

import Image from "next/image";
import type { CheckoutMethod } from "../../hooks/useCheckout";

interface CheckoutCtaProps {
  onSubmit: (method: CheckoutMethod) => void;
  loading?: boolean;
}

export function CheckoutCta({ onSubmit, loading }: CheckoutCtaProps) {
  const disabled = loading;
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          aria-label="카카오페이 결제"
          disabled={disabled}
          onClick={() => onSubmit("KAKAOPAY")}
          className="flex h-12 items-center justify-center gap-2 rounded-md bg-[#FEE500] text-[14px] font-semibold text-black/85 shadow-sm transition-opacity hover:opacity-95 active:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Image
            src="/kakaopay-logo.svg"
            alt=""
            width={144}
            height={44}
            className="h-4 w-auto"
            aria-hidden
          />
          <span>결제하기</span>
        </button>

        <button
          type="button"
          aria-label="네이버페이 결제"
          disabled={disabled}
          onClick={() => onSubmit("NAVERPAY")}
          className="flex h-12 items-center justify-center gap-2 rounded-md bg-[#03C75A] text-[14px] font-semibold text-black/85 shadow-sm transition-opacity hover:opacity-95 active:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Image
            src="/naverpay-logo.svg"
            alt=""
            width={48}
            height={16}
            className="h-4 w-auto"
            aria-hidden
          />
          <span>결제하기</span>
        </button>
      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={() => onSubmit("GENERAL")}
        className="w-full rounded-md bg-neutral-900 px-6 py-3 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800 active:bg-neutral-950 disabled:cursor-not-allowed disabled:bg-neutral-400"
      >
        {loading ? "결제창을 여는 중…" : "일반 결제"}
      </button>
    </div>
  );
}
