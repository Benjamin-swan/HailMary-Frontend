// 입력 검증 유틸 모음.
// 단순 RFC 호환에 가까운 정규식 (서버에서 다시 검증한다는 전제로 가벼운 클라이언트 검증).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}
