"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import type { AuthProvider } from "../domain/types";

type Phase = "exchanging" | "error";

// 사용자에게 보여줄 메시지를 담은 콜백 전용 에러 (그 외 예외는 일반 실패 문구).
class CallbackError extends Error {}

interface AuthCallbackClientProps {
  provider: AuthProvider;
}

/**
 * 소셜 로그인 콜백 처리 — /auth/callback/{provider}/.
 *
 * 정적 export라 useSearchParams 대신 window.location.search 직접 파싱
 * (DEPLOY.md 정적 export + dynamic 가드 패턴과 동일).
 * code/state 교환 성공 시 원래 있던 경로(returnTo)로 replace.
 */
export function AuthCallbackClient({ provider }: AuthCallbackClientProps) {
  const router = useRouter();
  const { completeLogin } = useAuth();
  const [phase, setPhase] = useState<Phase>("exchanging");
  const [message, setMessage] = useState<string>("");
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    // 전 과정을 async run으로 묶어 setState는 .catch(비동기 콜백)에서만 호출
    // — effect 본문 동기 setState 회피(react-hooks/set-state-in-effect).
    const run = async (): Promise<void> => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");
      const oauthError = params.get("error");

      if (oauthError || !code) {
        throw new CallbackError(
          oauthError === "access_denied" || oauthError === "consent_required"
            ? "로그인을 취소했어요."
            : "로그인 정보를 받지 못했어요.",
        );
      }

      const { returnTo } = await completeLogin(provider, { code, state });
      router.replace(returnTo || "/");
    };

    run().catch((err: unknown) => {
      setMessage(
        err instanceof CallbackError
          ? err.message
          : "로그인에 실패했어요. 다시 시도해 주세요.",
      );
      setPhase("error");
    });
  }, [provider, completeLogin, router]);

  return (
    <main className="flex min-h-[100dvh] flex-1 flex-col items-center justify-center gap-5 bg-white px-6 text-neutral-900">
      {phase === "exchanging" && (
        <>
          <div
            className="h-11 w-11 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-900"
            aria-hidden
          />
          <p className="text-[14px] text-neutral-600">로그인 중이에요…</p>
        </>
      )}

      {phase === "error" && (
        <>
          <img
            src="/kkebi/images/corner-m2.png"
            alt="깨비"
            className="h-20 w-20 select-none"
            draggable={false}
          />
          <h1 className="text-[16px] font-semibold">{message}</h1>
          <Link
            href="/"
            className="rounded-full border border-neutral-300 px-5 py-2 text-[13px] text-neutral-700 hover:bg-neutral-100"
          >
            메인으로
          </Link>
        </>
      )}
    </main>
  );
}
