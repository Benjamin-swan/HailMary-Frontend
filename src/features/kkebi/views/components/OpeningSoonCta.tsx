interface OpeningSoonCtaProps {
  divider: string;
  label: string;
  microCopy: string;
}

export function OpeningSoonCta({
  divider,
  label,
  microCopy,
}: OpeningSoonCtaProps) {
  return (
    <div
      className="absolute inset-x-0 bottom-0 z-20 px-5 pb-8 pt-4"
      style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
    >
      <div className="mb-3 flex items-center justify-center gap-3">
        <span className="h-px w-6 bg-white/30" aria-hidden />
        <span className="text-[11px] tracking-wide text-white/70">
          {divider}
        </span>
        <span className="h-px w-6 bg-white/30" aria-hidden />
      </div>
      <button
        type="button"
        disabled
        aria-disabled="true"
        className="relative w-full overflow-hidden rounded-full px-6 py-4 text-[15px] font-semibold text-white"
        style={{
          background:
            "linear-gradient(90deg, var(--color-kkebi-cta-from) 0%, var(--color-kkebi-cta-mid) 50%, var(--color-kkebi-cta-to) 100%)",
          boxShadow:
            "0 8px 32px rgba(239,77,110,0.4), inset 0 0 0 1px rgba(255,255,255,0.1)",
          cursor: "not-allowed",
        }}
      >
        <span
          className="pointer-events-none absolute inset-y-0 -left-full w-full animate-shine"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
          }}
          aria-hidden
        />
        {label}
      </button>
      <p className="mt-3 text-center text-[11px] text-white/70">{microCopy}</p>
    </div>
  );
}
