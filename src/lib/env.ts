export const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL ?? "",
  // 소셜 로그인 인가 URL용 공개 클라이언트 ID (빌드 시 인라인됨). 미설정이면 빈 문자열 → 버튼 비활성.
  KAKAO_CLIENT_ID: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID ?? "",
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
};
