// OAuth 인가 URL 빌더 + CSRF state 유틸 (순수 로직, React/DOM 의존 최소).
//
// redirect_uri는 콘솔에 등록된 값과 "끝 슬래시까지" 정확히 일치해야 한다(KOE006 방지).
// 우리 프론트는 trailingSlash 모드라 콜백 경로도 슬래시로 끝낸다.
import type { AuthProvider } from "./types";

const KAKAO_AUTHORIZE = "https://kauth.kakao.com/oauth/authorize";
const GOOGLE_AUTHORIZE = "https://accounts.google.com/o/oauth2/v2/auth";

export function buildRedirectUri(origin: string, provider: AuthProvider): string {
  return `${origin}/auth/callback/${provider}/`;
}

interface AuthorizeParams {
  provider: AuthProvider;
  clientId: string;
  redirectUri: string;
  state: string;
}

export function buildAuthorizeUrl({
  provider,
  clientId,
  redirectUri,
  state,
}: AuthorizeParams): string {
  if (provider === "kakao") {
    const q = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      redirect_uri: redirectUri,
      state,
    });
    return `${KAKAO_AUTHORIZE}?${q.toString()}`;
  }
  // google — openid 스코프 + 매 로그인 동의 확인(서로 다른 계정 전환 대비)
  const q = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "openid email profile",
    state,
    access_type: "offline",
    prompt: "select_account",
  });
  return `${GOOGLE_AUTHORIZE}?${q.toString()}`;
}

// ── CSRF state ──
// 난수 nonce를 만들어 sessionStorage에 (복귀 경로와 함께) 저장하고, 인가 요청 state로 보낸다.
// 콜백에서 동일 nonce인지 대조 — 위조된 콜백 차단.
const STATE_KEY_PREFIX = "auth_state_";

export interface PendingAuthState {
  nonce: string;
  returnTo: string;
}

export function makeNonce(): string {
  // crypto.randomUUID는 모던 브라우저/HTTPS·localhost에서 사용 가능.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID().replace(/-/g, "");
  }
  // 폴백 (구형). 보안 임계값 아님 — CSRF nonce용.
  return Math.abs(Date.now() ^ (Math.random() * 1e9)).toString(36);
}

export function saveAuthState(provider: AuthProvider, state: PendingAuthState): void {
  try {
    sessionStorage.setItem(STATE_KEY_PREFIX + provider, JSON.stringify(state));
  } catch {
    // 무시 — state 미저장 시 콜백에서 검증 실패로 안전하게 막힘
  }
}

export function consumeAuthState(provider: AuthProvider): PendingAuthState | null {
  try {
    const raw = sessionStorage.getItem(STATE_KEY_PREFIX + provider);
    sessionStorage.removeItem(STATE_KEY_PREFIX + provider);
    return raw ? (JSON.parse(raw) as PendingAuthState) : null;
  } catch {
    return null;
  }
}
