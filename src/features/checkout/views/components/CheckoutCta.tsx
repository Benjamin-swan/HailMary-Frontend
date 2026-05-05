"use client";

interface CheckoutCtaProps {
  onClick: () => void;
}

export function CheckoutCta({ onClick }: CheckoutCtaProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl px-6 py-4 text-[15px] font-semibold text-white shadow-lg transition-opacity hover:opacity-90 active:opacity-80"
      style={{
        background:
          "linear-gradient(90deg, #1a1a1a 0%, #2a1f3a 50%, #1a1a1a 100%)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      결제하기
    </button>
  );
}
