"use client";

import { SiteFooter } from "@/shared/components/SiteFooter";
import { HERO_CARD, QUOTE_TEXT, SECONDARY_CARDS } from "../domain/contentCards";
import { useMain } from "../hooks/useMain";
import { TopNav } from "./components/TopNav";
import { HeroSection } from "./components/HeroSection";
import { ContentCarousel } from "./components/ContentCarousel";
import { QuoteCard } from "./components/QuoteCard";

export function MainView() {
  const { handleCardClick } = useMain();
  return (
    <div
      className="flex min-h-[100dvh] flex-1 flex-col"
      style={{
        background:
          "linear-gradient(180deg, #1a1530 0%, #0f0a22 100%)",
      }}
    >
      <TopNav />
      <main className="flex-1">
        <HeroSection card={HERO_CARD} onClick={handleCardClick} />
        <ContentCarousel cards={SECONDARY_CARDS} onCardClick={handleCardClick} />
        <QuoteCard text={QUOTE_TEXT} />
      </main>
      <SiteFooter />
    </div>
  );
}
