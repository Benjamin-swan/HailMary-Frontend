"use client";

interface CheckoutCtaProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function CheckoutCta({ onClick, disabled, loading }: CheckoutCtaProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full rounded-2xl bg-neutral-900 px-6 py-4 text-[15px] font-semibold text-white shadow-md transition-colors hover:bg-neutral-800 active:bg-neutral-950 disabled:cursor-not-allowed disabled:bg-neutral-400"
    >
      {loading ? "결제창을 여는 중…" : "결제하기"}
    </button>
  );
}
