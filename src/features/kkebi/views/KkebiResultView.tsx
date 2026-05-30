"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
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
const TOTAL_CARDS = 5;

export function KkebiResultView() {
  const r = useKkebiResult();
  const [leftHover, setLeftHover] = useState(false);
  const [rightHover, setRightHover] = useState(false);
  // 모바일에선 화살표 숨김 — 데스크톱(≥768px)에서만 표시
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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

  const canPrev = r.c1Flipped && r.currentCard > 0;
  const canNext = r.c1Flipped && r.currentCard < TOTAL_CARDS - 1;

  const handlePrev = () => { if (canPrev) r.setCurrentCard(r.currentCard - 1); };
  const handleNext = () => { if (canNext) r.setCurrentCard(r.currentCard + 1); };

  if (!r.isReady) return null;

  return (
    <PageContainer fullWidth>
      <SwipeDeck onCardChange={handleCardChange} locked={!r.c1Flipped} currentIndex={r.currentCard}>
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

      {/* 좌우 화살표 버튼 — 데스크톱(≥768px)에서만 표시 */}
      {isDesktop && (
        <>
          {/* 왼쪽 화살표 버튼 */}
          <button
            type="button"
            onClick={handlePrev}
            onMouseEnter={() => setLeftHover(true)}
            onMouseLeave={() => setLeftHover(false)}
            style={{
              background: "none",
              border: "none",
              cursor: canPrev ? "pointer" : "default",
              // 카드 가장자리(중앙 -190px)에서 32px 떨어진 위치
              right: "calc(50% + 222px)",
              opacity: canPrev ? 1 : 0.35,
              padding: 0,
              position: "fixed",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
            }}
          >
            <Image
              src={leftHover && canPrev ? "/kkebi/arrow/arrow-left-hover.png" : "/kkebi/arrow/arrow-left-default.png"}
              alt="이전 카드"
              width={64}
              height={64}
            />
          </button>

          {/* 오른쪽 화살표 버튼 */}
          <button
            type="button"
            onClick={handleNext}
            onMouseEnter={() => setRightHover(true)}
            onMouseLeave={() => setRightHover(false)}
            style={{
              background: "none",
              border: "none",
              cursor: canNext ? "pointer" : "default",
              opacity: canNext ? 1 : 0.35,
              padding: 0,
              position: "fixed",
              // 카드 가장자리(중앙 +190px)에서 32px 떨어진 위치
              left: "calc(50% + 222px)",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
            }}
          >
            <Image
              src={rightHover && canNext ? "/kkebi/arrow/arrow-right-hover.png" : "/kkebi/arrow/arrow-right-default.png"}
              alt="다음 카드"
              width={64}
              height={64}
            />
          </button>
        </>
      )}

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
