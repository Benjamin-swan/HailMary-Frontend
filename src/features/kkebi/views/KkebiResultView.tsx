"use client";

import { useCallback, useRef } from "react";
import { useKkebiResult } from "../hooks/useKkebiResult";
import { trackDaily } from "../domain/dailyAnalytics";
import PageContainer from "./components/shared/PageContainer";
import SwipeDeck from "./components/shared/SwipeDeck";
import CardIndicator from "./components/shared/CardIndicator";
import C1Card from "./components/daily/C1Card";
import C2Card from "./components/daily/C2Card";
import C3Card from "./components/daily/C3Card";
import C4Card from "./components/daily/C4Card";
import C5Card from "./components/daily/C5Card";

const CARD_KEYS = ["c1", "c2", "c3", "c4", "c5"] as const;

export function KkebiResultView() {
  const r = useKkebiResult();

  // 카드별 1회만 daily_result_card_view 발화 (스와이프 왕복 중복 방지)
  const viewedCards = useRef<Set<number>>(new Set());
  const handleCardChange = useCallback(
    (index: number) => {
      r.setCurrentCard(index);
      if (!viewedCards.current.has(index)) {
        viewedCards.current.add(index);
        trackDaily("daily_result_card_view", {
          card_key: CARD_KEYS[index] ?? `c${index + 1}`,
          card_index: index,
        });
      }
    },
    [r],
  );

  if (!r.isReady) return null;

  return (
    <PageContainer fullWidth>
      <SwipeDeck onCardChange={handleCardChange} locked={!r.c1Flipped}>
        <C1Card
          data={r.data}
          userName={r.userName}
          onFlip={() => {
            trackDaily("daily_card_flip");
            r.setC1Flipped(true);
          }}
        />
        <C2Card data={r.data} />
        <C3Card data={r.data} />
        <C4Card data={r.data} />
        <C5Card data={r.data} userName={r.userName} />
      </SwipeDeck>
      <div
        style={{
          bottom: "24px",
          display: "flex",
          justifyContent: "center",
          position: "fixed",
          width: "100%",
        }}
      >
        <CardIndicator total={5} current={r.currentCard} />
      </div>
    </PageContainer>
  );
}
