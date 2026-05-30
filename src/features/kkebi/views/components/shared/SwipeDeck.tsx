"use client";

import { Children, useEffect, useRef } from "react";

type SwipeDeckProps = {
  children: React.ReactNode;
  onCardChange?: (index: number) => void;
  locked?: boolean;
  currentIndex?: number;
};

export default function SwipeDeck({ children, onCardChange, locked = false, currentIndex }: SwipeDeckProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const onChangeRef = useRef(onCardChange);
  const lockedRef = useRef(locked);
  const childCountRef = useRef(0);

  useEffect(() => { onChangeRef.current = onCardChange; });
  useEffect(() => { lockedRef.current = locked; }, [locked]);

  // 외부(화살표 버튼)에서 currentIndex 변경 시 해당 카드로 smooth scroll
  useEffect(() => {
    if (currentIndex === undefined) return;
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({ left: currentIndex * container.clientWidth, behavior: "smooth" });
  }, [currentIndex]);

  const childArray = Children.toArray(children);
  useEffect(() => {
    childCountRef.current = childArray.length;
  });

  // IntersectionObserver — 현재 카드 인덱스 추적
  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cards.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) onChangeRef.current?.(index);
          }
        });
      },
      { root: containerRef.current, threshold: 0.5 },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [childArray.length]);

  // 키보드 방향키 — locked 시 차단
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lockedRef.current) return;
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKey, { passive: false });
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // scroll 잠금 — wheel·touch·scroll 차단 + scrollLeft 강제 복원
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const blockIfLocked = (e: Event) => {
      if (lockedRef.current) e.preventDefault();
    };
    const resetIfLocked = () => {
      if (lockedRef.current && container.scrollLeft !== 0) {
        container.scrollLeft = 0;
      }
    };

    container.addEventListener("wheel",     blockIfLocked, { passive: false });
    container.addEventListener("touchmove", blockIfLocked, { passive: false });
    container.addEventListener("scroll",    resetIfLocked);

    return () => {
      container.removeEventListener("wheel",     blockIfLocked);
      container.removeEventListener("touchmove", blockIfLocked);
      container.removeEventListener("scroll",    resetIfLocked);
    };
  }, []);

  // 마우스 드래그 — Pointer Events
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startX = 0;
    let startScrollLeft = 0;
    let isDragging = false;
    let hasMoved = false;

    const onPointerDown = (e: PointerEvent) => {
      if (lockedRef.current) return;
      isDragging = true;
      hasMoved = false;
      startX = e.pageX;
      startScrollLeft = container.scrollLeft;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dist = Math.abs(startX - e.pageX);
      if (!hasMoved) {
        if (dist < 6) return;
        hasMoved = true;
        container.setPointerCapture(e.pointerId);
        container.style.scrollSnapType = "none";
        container.style.cursor = "grabbing";
      }
      e.preventDefault();
      container.scrollLeft = startScrollLeft + (startX - e.pageX);
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      if (!hasMoved) return;
      container.style.cursor = "grab";

      const dragDelta = startX - e.pageX;
      const slideWidth = container.clientWidth;
      const currentIndex = Math.round(startScrollLeft / slideWidth);
      const count = childCountRef.current;

      let targetIndex = currentIndex;
      if (dragDelta >  60) targetIndex = Math.min(currentIndex + 1, count - 1);
      if (dragDelta < -60) targetIndex = Math.max(currentIndex - 1, 0);

      container.scrollTo({ left: targetIndex * slideWidth, behavior: "smooth" });
      setTimeout(() => { container.style.scrollSnapType = "x mandatory"; }, 400);
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove, { passive: false });
    container.addEventListener("pointerup",   onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup",   onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="kkebi-swipe-deck"
      style={{
        cursor: locked ? "default" : "grab",
        display: "flex",
        height: "100vh",
        overflowX: locked ? "hidden" : "scroll",
        scrollSnapType: "x mandatory",
        scrollbarWidth: "none",
      }}
    >
      {childArray.map((child, i) => (
        <div
          key={i}
          ref={(el) => { cardRefs.current[i] = el; }}
          style={{
            alignItems: "center",
            display: "flex",
            flexShrink: 0,
            justifyContent: "center",
            padding: "24px 16px",
            scrollSnapAlign: "start",
            width: "100%",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
