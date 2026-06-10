import { useEffect, useLayoutEffect } from "react";

// 클라에선 useLayoutEffect(페인트 전 실행 → 깜빡임 방지), 서버/프리렌더에선 useEffect로 폴백
// (useLayoutEffect의 SSR 경고 회피). 모듈 레벨 분기라 hook 규칙 위반 아님.
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
