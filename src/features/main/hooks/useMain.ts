"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import type { ContentCard } from "../domain/contentCards";

export function useMain() {
  const router = useRouter();

  const handleCardClick = useCallback(
    (card: ContentCard) => {
      if (card.variant === "coming-soon" || !card.route) return;
      router.push(card.route);
    },
    [router],
  );

  return { handleCardClick };
}
