"use client";

import { SiteFooter } from "@/shared/components/SiteFooter";
import { HERO_CARD, SECONDARY_CARDS } from "../domain/contentCards";
import { useMain } from "../hooks/useMain";
import { TopNav } from "./components/TopNav";
import { HeroSection } from "./components/HeroSection";
import { ContentCarousel } from "./components/ContentCarousel";

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
      <main className="flex-1 pb-8">
        <HeroSection card={HERO_CARD} onClick={handleCardClick} />
        <ContentCarousel cards={SECONDARY_CARDS} onCardClick={handleCardClick} />
      </main>
      <SiteFooter />
    </div>
  );
}
