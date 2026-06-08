"use client";

import { useCallback, useSyncExternalStore } from "react";
import { authStore } from "@/lib/authStore";
import { env } from "@/lib/env";
import { api, ApiError } from "@/shared/utils/api";
import { trackEvent } from "@/shared/utils/analytics";
import {
  buildAuthorizeUrl,
  buildRedirectUri,
  consumeAuthState,
  makeNonce,
  saveAuthState,
} from "../domain/oauth";
import {
  type AccountProfile,
  type AuthProvider,
  type SocialLoginRawResponse,
  normalizeProfile,
} from "../domain/types";

// ── 프로필 in-memory 스토어 (반응형) ──
// 토큰은 authStore(localStorage, api 계층이 사용)에, 리치 프로필 객체는 여기에.
// 새로고침 직후엔 null → 필요 시 refreshMe()로 /api/auth/me 재조회.
let profileSnapshot: AccountProfile | null = null;
const profileListeners = new Set<() => void>();

function setProfile(p: AccountProfile | null): void {
  profileSnapshot = p;
  profileListeners.forEach((l) => l());
}

function subscribeProfile(listener: () => void): () => void {
  profileListeners.add(listener);
  return () => profileListeners.delete(listener);
}

const CLIENT_IDS: Record<AuthProvider, string> = {
  kakao: env.KAKAO_CLIENT_ID,
  google: env.GOOGLE_CLIENT_ID,
};

export interface UseAuthResult {
  isAuthenticated: boolean;
  profile: AccountProfile | null;
  /** 인가 페이지로 리다이렉트 (현재 페이지로 복귀하도록 returnTo 저장). */
  startLogin: (provider: AuthProvider, returnTo?: string) => void;
  /** 콜백 페이지에서 호출 — code/state 교환 후 토큰 저장. 복귀 경로 반환. */
  completeLogin: (
    provider: AuthProvider,
    params: { code: string; state: string | null },
  ) => Promise<{ returnTo: string }>;
  /** /api/auth/me 재조회 (토큰만 있고 프로필 없을 때). 401이면 토큰 정리. */
  refreshMe: () => Promise<void>;
  logout: () => void;
  /** 회원탈퇴 — 계정 삭제 후 토큰/프로필 정리. */
  deleteAccount: () => Promise<void>;
}

export function useAuth(): UseAuthResult {
  const token = useSyncExternalStore(
    authStore.subscribe,
    authStore.getSnapshot,
    authStore.getServerSnapshot,
  );
  const profile = useSyncExternalStore(
    subscribeProfile,
    () => profileSnapshot,
    () => null,
  );

  const startLogin = useCallback((provider: AuthProvider, returnTo?: string) => {
    const clientId = CLIENT_IDS[provider];
    if (!clientId) {
      console.error(`[auth] ${provider} client id 미설정 — 로그인 시작 불가`);
      return;
    }
    const origin = window.location.origin;
    const redirectUri = buildRedirectUri(origin, provider);
    const nonce = makeNonce();
    const dest = returnTo ?? window.location.pathname + window.location.search;
    saveAuthState(provider, { nonce, returnTo: dest });
    trackEvent("login_start", { provider });
    window.location.href = buildAuthorizeUrl({
      provider,
      clientId,
      redirectUri,
      state: nonce,
    });
  }, []);

  const completeLogin = useCallback(
    async (
      provider: AuthProvider,
      { code, state }: { code: string; state: string | null },
    ): Promise<{ returnTo: string }> => {
      const pending = consumeAuthState(provider);
      // CSRF 방어: 저장된 nonce와 콜백 state가 일치해야 함.
      if (!pending || !state || pending.nonce !== state) {
        throw new ApiError(400, "로그인 상태 검증 실패 (state 불일치)");
      }
      const redirectUri = buildRedirectUri(window.location.origin, provider);
      const raw = await api.post<SocialLoginRawResponse>("/api/auth/login", {
        provider,
        code,
        redirect_uri: redirectUri,
      });
      authStore.set(raw.access_token);
      setProfile(normalizeProfile(raw.profile));
      trackEvent("login_complete", {
        provider,
        is_new_account: raw.is_new_account,
      });
      return { returnTo: pending.returnTo || "/" };
    },
    [],
  );

  const refreshMe = useCallback(async (): Promise<void> => {
    if (!authStore.get()) return;
    try {
      const raw = await api.get<SocialLoginRawResponse["profile"]>(
        "/api/auth/me",
        { auth: "account" },
      );
      setProfile(normalizeProfile(raw));
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        authStore.clear();
        setProfile(null);
      }
      // 그 외 일시 오류는 무시 — 다음 호출에서 재시도
    }
  }, []);

  const logout = useCallback(() => {
    authStore.clear();
    setProfile(null);
    trackEvent("logout", {});
  }, []);

  const deleteAccount = useCallback(async (): Promise<void> => {
    try {
      await api.del("/api/auth/me", { auth: "account" });
      trackEvent("account_delete", {});
    } finally {
      // 성공/실패 무관 — 토큰은 정리해 로그아웃 상태로 (탈퇴 의도 반영)
      authStore.clear();
      setProfile(null);
    }
  }, []);

  return {
    isAuthenticated: Boolean(token),
    profile,
    startLogin,
    completeLogin,
    refreshMe,
    logout,
    deleteAccount,
  };
}
