"use client";

import { useKkebiResult } from "../hooks/useKkebiResult";
import PageContainer from "./components/shared/PageContainer";
import SwipeDeck from "./components/shared/SwipeDeck";
import CardIndicator from "./components/shared/CardIndicator";
import C1Card from "./components/daily/C1Card";
import C2Card from "./components/daily/C2Card";
import C3Card from "./components/daily/C3Card";
import C4Card from "./components/daily/C4Card";
import C5Card from "./components/daily/C5Card";

export function KkebiResultView() {
  const r = useKkebiResult();

  if (!r.isReady) return null;

  return (
    <PageContainer fullWidth>
      <SwipeDeck onCardChange={r.setCurrentCard} locked={!r.c1Flipped}>
        <C1Card data={r.data} userName={r.userName} onFlip={() => r.setC1Flipped(true)} />
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
