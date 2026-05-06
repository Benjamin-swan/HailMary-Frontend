"use client";

import type { MouseEvent, ReactNode } from "react";

interface NavIconButtonProps {
  /** 스크린리더 + hover tooltip에 표시될 라벨 */
  label: string;
  /** 버튼 안에 보일 콘텐츠 (이모지·SVG·문자 어떤 것이든) */
  children: ReactNode;
  onClick: (e: MouseEvent) => void;
  /** 추가 클래스 (위치/마진 등 컨테이너별 조정) */
  className?: string;
  /** 툴팁 표시 위치. 기본 "left" — 버튼 좌측에 떠 있음 (우상단 스택용) */
  tooltipPlacement?: "left" | "right" | "top" | "bottom";
}

const TOOLTIP_POSITION: Record<NonNullable<NavIconButtonProps["tooltipPlacement"]>, string> = {
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
};

/**
 * 음소거 버튼과 동일한 글래스 원형 디자인의 아이콘 버튼.
 * hover 시 라벨이 toolip으로 노출됨.
 *
 * @example
 *   <NavIconButton label="메인으로" onClick={() => router.push("/")}>🏠</NavIconButton>
 *   <NavIconButton label="건너뛰기" onClick={skip}>⏭</NavIconButton>
 */
export function NavIconButton({
  label,
  children,
  onClick,
  className = "",
  tooltipPlacement = "left",
}: NavIconButtonProps) {
  return (
    <div className={`group relative ${className}`}>
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/40 text-neutral-900 backdrop-blur-md transition-colors active:bg-white/60"
      >
        <span className="flex items-center justify-center leading-none">{children}</span>
      </button>
      <span
        className={`pointer-events-none absolute z-10 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-[11px] text-white opacity-0 transition-opacity group-hover:opacity-100 ${TOOLTIP_POSITION[tooltipPlacement]}`}
      >
        {label}
      </span>
    </div>
  );
}
