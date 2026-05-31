"use client";

import { Children, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate, type PanInfo } from "framer-motion";

type SwipeDeckProps = {
  children: React.ReactNode;
  onCardChange?: (index: number) => void;
  locked?: boolean;
  currentIndex?: number;
};

// 전환 애니메이션 — PC/모바일 분기.
// PC: 묵직한 spring (마우스 드래그에 맞는 느낌, 사용자 만족).
// 모바일: ease-out tween (짧은 거리를 부드럽게 날아오듯 안착).
const SNAP_PC = { type: "spring" as const, stiffness: 130, damping: 38 };
const SNAP_MOBILE = { type: "tween" as const, duration: 0.42, ease: [0.22, 1, 0.36, 1] as const };
// peek — 슬라이드가 컨테이너의 94%. 양옆 3%씩 다음/이전 카드가 아주 살짝.
const PEEK_RATIO = 0.94;

export default function SwipeDeck({
  children,
  onCardChange,
  locked = false,
  currentIndex,
}: SwipeDeckProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const childArray = Children.toArray(children);
  const count = childArray.length;

  const [width, setWidth] = useState(0);
  const [internalIndex, setInternalIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const viewIndex = locked ? 0 : (currentIndex ?? internalIndex);
  const lastEmittedRef = useRef(viewIndex);
  const isDraggingRef = useRef(false);
  const snap = isDesktop ? SNAP_PC : SNAP_MOBILE;

  // PC(≥768px) vs 모바일 — 전환 애니메이션 분기용
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // 한 칸 이동 거리 = 슬라이드 폭(peek 적용). 양옆 peek 여백.
  const slideW = width * PEEK_RATIO;
  const sidePad = (width - slideW) / 2;

  // 컨테이너 폭 측정 (페인트 전) + resize 대응. 드래그 좌표(px) 계산용.
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      if (isDraggingRef.current) return;  // 드래그 중 width 갱신 금지
      setWidth((prev) => {
        const next = el.clientWidth || el.offsetWidth
          || (typeof window !== "undefined" ? window.innerWidth : 0);
        return next === prev ? prev : next;
      });
    };
    update();
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(update);
      ro.observe(el);
      return () => ro.disconnect();
    }
  }, []);

  // viewIndex/slideW 변경 → 부드러운 스냅. 드래그 중에는 framer가 x를 소유하므로 skip.
  useEffect(() => {
    if (slideW === 0 || isDraggingRef.current) return;
    const controls = animate(x, -viewIndex * slideW, snap);
    return () => controls.stop();
  }, [viewIndex, slideW, x, snap]);

  // 외부 currentIndex 동기화 (드래그→외부 루프 방지)
  useEffect(() => {
    if (currentIndex !== undefined) lastEmittedRef.current = currentIndex;
  }, [currentIndex]);

  const requestChange = (target: number) => {
    if (currentIndex === undefined) setInternalIndex(target);
    if (lastEmittedRef.current !== target) {
      lastEmittedRef.current = target;
      onCardChange?.(target);
    }
  };

  const handleDragEnd = (_e: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    const cur = viewIndex;
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const threshold = Math.min(slideW * 0.2, 60);
    let target = cur;
    if (offset <= -threshold || velocity < -500) target = Math.min(cur + 1, count - 1);
    else if (offset >= threshold || velocity > 500) target = Math.max(cur - 1, 0);

    // 애니메이션 경로 단일화 (이중 animate 방지)
    if (target === cur) {
      animate(x, -cur * slideW, snap);
    } else {
      requestChange(target);
    }
  };

  // 측정 전 폴백 (fullWidth라 컨테이너 ≈ viewport → vw 근사). 측정 후 px로 정확.
  const slideWidthStyle = width > 0 ? slideW : `${PEEK_RATIO * 100}vw`;
  const sidePadStyle = width > 0 ? sidePad : `${(1 - PEEK_RATIO) * 50}vw`;

  return (
    <div
      ref={containerRef}
      className="kkebi-swipe-deck"
      style={{
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      <motion.div
        drag={locked ? false : "x"}
        dragConstraints={{ left: -(count - 1) * slideW, right: 0 }}
        dragElastic={0.18}
        dragMomentum={false}
        onDragStart={() => { isDraggingRef.current = true; }}
        onDragEnd={(e, info) => { isDraggingRef.current = false; handleDragEnd(e, info); }}
        style={{
          x,
          cursor: locked ? "default" : "grab",
          display: "flex",
          height: "100%",
          // 양옆 peek 여백 — 첫/마지막 카드도 중앙 정렬되게.
          paddingLeft: sidePadStyle,
          paddingRight: sidePadStyle,
          ...(locked ? { touchAction: "none" } : {}),
        }}
      >
        {childArray.map((child, i) => (
          <div
            key={i}
            style={{
              alignItems: "center",
              boxSizing: "border-box",
              display: "flex",
              flexShrink: 0,
              justifyContent: "center",
              padding: "24px 8px",
              width: slideWidthStyle,
            }}
          >
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
