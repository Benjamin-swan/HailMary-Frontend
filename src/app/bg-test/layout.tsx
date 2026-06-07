import type { Metadata } from "next";

// 배경 실험 페이지 — 검색 색인 제외 (robots.txt Disallow와 이중 안전망)
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function BgTestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
