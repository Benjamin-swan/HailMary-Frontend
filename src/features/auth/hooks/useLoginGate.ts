"use client";

import { useCallback, useRef, useState } from "react";
import { useAuth } from "./useAuth";

// 사주 정보 입력(확인하기) 시점의 "한 번만 끼어드는" 로그인 유도 게이트.
//
// run(proceed):
//   - 이미 로그인했거나 이번 세션에 '나중에 하기'를 한 적 있으면 → 즉시 proceed() (코어 플로 불변)
//   - 그 외(비로그인 + 미dismiss) → 팝업을 띄우고 원래 동작(proceed)을 보류
// onClose (나중에 하기 / 배경 / Esc):
//   - 세션 억제 플래그 set + 보류된 proceed() 실행 → 사용자는 원래 흐름 그대로 진행
// 로그인 하러가기는 LoginPromptModal 내부 startLogin이 returnTo로 처리 (페이지 이탈).
//
// 억제는 세션 단위 1회 — 한 번 '나중에 하기'면 그 세션 동안 입력 nudge를 다시 띄우지 않는다.
// (하단바 보관함처럼 사용자가 직접 연 팝업은 이 게이트를 쓰지 않으므로 영향 없음)

const DISMISS_KEY = "login_nudge_dismissed";

function isDismissed(): boolean {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

function markDismissed(): void {
  try {
    sessionStorage.setItem(DISMISS_KEY, "1");
  } catch {
    // 무시
  }
}

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
      if (isAuthenticated || isDismissed()) {
        proceed();
        return;
      }
      proceedRef.current = proceed;
      setOpen(true);
    },
    [isAuthenticated],
  );

  const onClose = useCallback(() => {
    markDismissed();
    setOpen(false);
    const p = proceedRef.current;
    proceedRef.current = null;
    p?.();
  }, []);

  return { run, modal: { open, onClose, returnTo, source } };
}
