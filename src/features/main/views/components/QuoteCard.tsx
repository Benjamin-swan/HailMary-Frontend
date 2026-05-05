interface QuoteCardProps {
  text: string;
}

export function QuoteCard({ text }: QuoteCardProps) {
  return (
    <section className="px-4 pb-8 pt-4">
      <div
        className="rounded-2xl border border-white/[0.05] px-5 py-5"
        style={{ background: "rgba(255,255,255,0.02)" }}
      >
        <span
          className="block text-[28px] leading-none"
          style={{
            fontFamily: "Georgia, serif",
            color: "rgba(232,83,110,0.4)",
          }}
          aria-hidden
        >
          “
        </span>
        <p className="mt-1 text-[12px] leading-relaxed text-white/75">{text}</p>
      </div>
    </section>
  );
}
