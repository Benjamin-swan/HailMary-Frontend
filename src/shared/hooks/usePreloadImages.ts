"use client";

import { useEffect } from "react";

/**
 * 주어진 이미지 경로 배열을 마운트 시 한 번에 프리로드한다.
 * 브라우저가 fetch + 디코딩 후 캐시에 적재하여 이후 같은 src 사용 시 즉시 페인트.
 *
 * fade-to-black/cross-fade 전환 중 다음 컷이 아직 디코딩되지 않아
 * 이전 컷이 잠깐 보이는 flicker 현상 방지에 사용.
 *
 * @example
 *   usePreloadImages([STEP_1_BG, STEP_2_BG, ...]);
 *
 * 빈 배열이거나 srcs가 안정 참조가 아니어도 무방하지만,
 * 내부적으로 srcs.join("|")을 deps로 써 동일 목록 재실행은 막는다.
 */
export function usePreloadImages(srcs: readonly string[]): void {
  const key = srcs.join("|");

  useEffect(() => {
    const preloaded: HTMLImageElement[] = [];
    for (const src of srcs) {
      if (!src) continue;
      const img = new Image();
      img.src = src;
      preloaded.push(img);
    }
    return () => {
      preloaded.length = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}
