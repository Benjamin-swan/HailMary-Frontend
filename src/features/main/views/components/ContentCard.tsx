"use client";

import Image from "next/image";
import type { ContentCard as ContentCardData } from "../../domain/contentCards";

interface ContentCardProps {
  card: ContentCardData;
  onClick: (card: ContentCardData) => void;
}

export function ContentCard({ card, onClick }: ContentCardProps) {
  if (!card.poster) return null;
  return (
    <button
      type="button"
      onClick={() => onClick(card)}
      className="group relative flex w-[305px] flex-shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-white/[0.08] text-left"
      style={{ background: "#1a0d2e" }}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={card.poster}
          alt={`${card.title} 포스터`}
          fill
          sizes="305px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {/* 상단 그라디언트 (가독성용) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(26,13,46,0.25) 0%, rgba(26,13,46,0) 25%)",
          }}
        />
        {/* 태그 */}
        <span
          className="absolute left-3 top-3 inline-block rounded-md border px-2 py-[3px] text-[10px] font-medium tracking-wide"
          style={{
            background: "rgba(15,8,30,0.6)",
            borderColor: "rgba(167,139,250,0.55)",
            color: "var(--color-kkebi-light)",
            backdropFilter: "blur(10px)",
          }}
        >
          {card.tag}
        </span>
      </div>
      <div className="px-4 py-3.5">
        <p className="text-[15px] font-medium text-white">{card.title}</p>
        {card.microCopy && (
          <p className="mt-1 text-[11.5px] text-white/55">{card.microCopy}</p>
        )}
      </div>
    </button>
  );
}
