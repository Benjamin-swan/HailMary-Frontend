interface NavArrowProps {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}

export function NavArrow({ direction, onClick, disabled }: NavArrowProps) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "이전" : "다음"}
      onClick={onClick}
      disabled={disabled}
      className={`hidden md:flex absolute top-1/2 z-10 h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 backdrop-blur-md transition-all hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-30 ${
        direction === "prev" ? "left-2" : "right-2"
      }`}
      style={{ background: "rgba(15,8,30,0.85)" }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white" aria-hidden>
        {direction === "prev" ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 18 15 12 9 6" />
        )}
      </svg>
    </button>
  );
}
