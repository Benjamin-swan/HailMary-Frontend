"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  /** 클릭 시 동작. 미지정 시 router.back() 호출 */
  onClick?: () => void;
  /** 스크린 리더 라벨 */
  ariaLabel?: string;
  /** 추가 클래스 (위치/마진 등 컨테이너별 조정용) */
  className?: string;
}

/**
 * 글래스 원형 뒤로가기 버튼.
 * 기본 동작은 브라우저 히스토리 back. 다른 동작이 필요하면 onClick prop으로 오버라이드.
 *
 * @example
 *   <BackButton />                              // 히스토리 back
 *   <BackButton onClick={() => router.push("/")} />  // 특정 경로로
 */
export function BackButton({
  onClick,
  ariaLabel = "뒤로가기",
  className = "",
}: BackButtonProps) {
  const router = useRouter();
  const handleClick = onClick ?? (() => router.back());

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={handleClick}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/10 ${className}`}
      style={{ background: "rgba(0,0,0,0.4)" }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
    </button>
  );
}
