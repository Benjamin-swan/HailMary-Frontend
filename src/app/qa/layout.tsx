import type { Metadata } from "next";

// QA 전용 페이지 — 검색 색인 제외 (robots.txt Disallow와 이중 안전망)
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function QaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
