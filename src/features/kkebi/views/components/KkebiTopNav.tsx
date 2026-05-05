interface KkebiTopNavProps {
  onBack: () => void;
  onShare: () => void;
}

export function KkebiTopNav({ onBack, onShare }: KkebiTopNavProps) {
  return (
    <nav className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-4">
      <button
        type="button"
        aria-label="뒤로가기"
        onClick={onBack}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 backdrop-blur-md transition-colors hover:bg-white/10"
        style={{ background: "rgba(0,0,0,0.4)" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white" aria-hidden>
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="공유"
        onClick={onShare}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 backdrop-blur-md transition-colors hover:bg-white/10"
        style={{ background: "rgba(0,0,0,0.4)" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white" aria-hidden>
          <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
      </button>
    </nav>
  );
}
