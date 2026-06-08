// 소셜 로그인 계정 토큰(JWT) 저장소 — 무료사주 세션 토큰(tokenStore)과 별개로 공존.
// /api/auth/* 및 보관함 등 계정 인증 엔드포인트에서 Authorization 헤더로 첨부.
//
// 반응형: useSyncExternalStore로 구독 가능 — 로그인/로그아웃 시 BottomNav·팝업 등이
// 자동 리렌더된다. localStorage가 단일 진실원이고, 메모리 캐시는 SSR-safe 스냅샷용.

const KEY = "dohwaseon.authToken";

type Listener = () => void;
const listeners = new Set<Listener>();

function read(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

// useSyncExternalStore getSnapshot은 안정적인 참조를 요구 — 값이 안 바뀌면 같은 문자열 반환.
let snapshot: string | null = read();

function emit(): void {
  snapshot = read();
  listeners.forEach((l) => l());
}

export const authStore = {
  get(): string | null {
    return read();
  },
  set(token: string): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(KEY, token);
    } catch {
      // localStorage 접근 실패 시 무시 (사파리 프라이빗 모드 등)
    }
    emit();
  },
  clear(): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(KEY);
    } catch {
      // 무시
    }
    emit();
  },
  // ── useSyncExternalStore 연동 ──
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot(): string | null {
    return snapshot;
  },
  getServerSnapshot(): string | null {
    return null;
  },
};
