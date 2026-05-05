import Image from "next/image";

export function TopNav() {
  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between border-b border-white/[0.06] px-5 py-3 backdrop-blur-xl"
      style={{ background: "rgba(5,2,12,0.92)" }}
    >
      <Image
        src="/dohwaseon-logo.png"
        alt="도화선"
        height={35}
        width={132}
        priority
        className="h-[35px] w-auto"
      />
      <button
        type="button"
        aria-label="메뉴"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
    </nav>
  );
}
