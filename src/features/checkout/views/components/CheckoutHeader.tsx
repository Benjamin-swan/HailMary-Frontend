"use client";

interface CheckoutHeaderProps {
  onBack: () => void;
}

export function CheckoutHeader({ onBack }: CheckoutHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center border-b border-neutral-200 bg-white/95 px-5 py-3 backdrop-blur-xl">
      <button
        type="button"
        aria-label="뒤로가기"
        onClick={onBack}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </button>
      <h1 className="absolute left-1/2 -translate-x-1/2 text-[15px] font-medium text-neutral-900">
        결제하기
      </h1>
      <span className="ml-auto h-9 w-9" aria-hidden />
    </header>
  );
}
