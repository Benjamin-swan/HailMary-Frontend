import type { Metadata } from "next";

// 내부 개발 미리보기 — 검색 색인 제외 (robots.txt Disallow와 이중 안전망)
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return children;
}
