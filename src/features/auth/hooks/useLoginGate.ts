"use client";

import { useCallback, useRef, useState } from "react";
import { useAuth } from "./useAuth";

// 설문(정보 입력/입력폼) 진입 시점의 "한 번만 끼어드는" 로그인 유도 게이트.
//
// run(proceed):
//   - 이미 로그인했으면 → 즉시 proceed() (코어 플로 불변)
//   - 비로그인 → 팝업을 띄우고 원래 동작(proceed)을 보류
// onClose (나중에 하기 / 배경 / Esc):
//   - 보류된 proceed() 실행 → 사용자는 원래 흐름 그대로 진행
// 로그인 하러가기는 LoginPromptModal 내부 startLogin이 returnTo로 처리 (페이지 이탈).
//
// 같은 설문 진입(마운트)당 1회 노출은 호출부의 ref 가드로 처리한다.
// (이전엔 sessionStorage 전역 dismiss로 억제했으나, 깨비에서 '나중에 하기'를 누르면
//  같은 세션의 도윤/연우 팝업까지 전부 막히는 버그가 있어 제거 — 비로그인이면 각 설문 시작마다 노출)

export interface LoginGateModalProps {
  open: boolean;
  onClose: () => void;
  returnTo?: string;
  source: string;
}

export interface LoginGate {
  run: (proceed: () => void) => void;
  modal: LoginGateModalProps;
}

export function useLoginGate(source: string, returnTo?: string): LoginGate {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const proceedRef = useRef<(() => void) | null>(null);

  const run = useCallback(
    (proceed: () => void) => {
      if (isAuthenticated) {
        proceed();
        return;
      }
      proceedRef.current = proceed;
      setOpen(true);
    },
    [isAuthenticated],
  );

  const onClose = useCallback(() => {
    setOpen(false);
    const p = proceedRef.current;
    proceedRef.current = null;
    p?.();
  }, []);

  return { run, modal: { open, onClose, returnTo, source } };
}
