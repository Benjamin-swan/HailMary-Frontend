// =============================================================================
// 인앱브라우저(webview) 감지 + 외부 브라우저 탈출 유틸 [HM-FE-106]
// =============================================================================
// 카카오톡·네이버 등 인앱브라우저는 navigator.share / a.click 다운로드 /
// window.open(_blank) 같은 표준 웹 API를 제대로 지원하지 않아 공유·광고복귀가
// 깨진다. 개별 우회 대신 "외부 브라우저로 열어주세요" 유도가 ROI 최선.
//
// 모든 함수는 SSR-safe — window/navigator 없으면 안전한 기본값 반환.
// =============================================================================

export type InAppBrowser =
  | "kakao"
  | "naver"
  | "line"
  | "instagram"
  | "facebook"
  | "other";

/**
 * UA로 인앱브라우저 종류를 판별한다. 일반 Safari/Chrome이면 null.
 * generic webview(인스타/페북/라인 등)까지 "주요 인앱 전반"으로 잡되,
 * 일반 모바일 브라우저 오탐을 피하기 위해 알려진 토큰 위주로 매칭한다.
 */
export function detectInAppBrowser(): InAppBrowser | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent.toLowerCase();

  // 명시적 인앱 (탈출 스킴/대응이 비교적 확실한 것들)
  if (ua.includes("kakaotalk")) return "kakao";
  // 네이버 앱 webview: "naver(inapp; ...)" 또는 NAVER 토큰
  if (ua.includes("naver")) return "naver";
  if (ua.includes("line/")) return "line";
  if (ua.includes("instagram")) return "instagram";
  // 페북 계열 webview 토큰
  if (ua.includes("fban") || ua.includes("fbav") || ua.includes("fb_iab")) {
    return "facebook";
  }

  // generic webview 휴리스틱 — iOS WKWebView는 "Safari" 토큰이 빠진다.
  // (정상 iOS Safari는 항상 "safari" 포함) → Safari 없는 모바일 = 인앱 의심.
  const isIOS = /iphone|ipad|ipod/.test(ua);
  if (isIOS && !ua.includes("safari") && !ua.includes("crios") && !ua.includes("fxios")) {
    return "other";
  }
  // Android generic webview 토큰
  if (ua.includes("; wv)")) return "other";

  return null;
}

/** 현재 인앱브라우저 환경인지 여부. */
export function isInAppBrowser(): boolean {
  return detectInAppBrowser() !== null;
}

/**
 * 외부 브라우저(Safari/Chrome)로 현재 URL을 열도록 시도한다.
 * 1) 인앱별 탈출 스킴이 있으면 그것으로 시도
 * 2) 스킴이 없거나 실패하면 URL을 클립보드에 복사 (호출부가 안내 토스트 노출)
 *
 * @returns 'scheme' = 탈출 스킴 실행함 / 'copied' = 클립보드 복사 폴백 /
 *          'manual' = 둘 다 불가(호출부가 수동 안내)
 */
export async function escapeToExternalBrowser(): Promise<
  "scheme" | "copied" | "manual"
> {
  if (typeof window === "undefined") return "manual";

  const kind = detectInAppBrowser();
  const url = window.location.href;

  // 1) 인앱별 탈출 스킴
  // - 카카오톡: openExternal 공식 지원
  // - 네이버: intent/스킴이 불안정 → 폴백 의존
  if (kind === "kakao") {
    window.location.href =
      "kakaotalk://web/openExternal?url=" + encodeURIComponent(url);
    return "scheme";
  }

  // 2) Android Chrome intent (네이버/기타 안드 인앱에서 종종 동작)
  const ua = navigator.userAgent.toLowerCase();
  const isAndroid = ua.includes("android");
  if (isAndroid && kind) {
    const noScheme = url.replace(/^https?:\/\//, "");
    window.location.href =
      "intent://" +
      noScheme +
      "#Intent;scheme=https;package=com.android.chrome;end";
    return "scheme";
  }

  // 3) 폴백 — URL 클립보드 복사 (iOS 네이버/인스타 등 스킴 불가 환경)
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      return "copied";
    }
  } catch {
    // clipboard 차단 시 manual로 떨어짐
  }
  return "manual";
}
