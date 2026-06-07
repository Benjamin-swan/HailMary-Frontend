import type { Metadata } from "next";

// 사주 결과·유료 결과지·공유 링크 — 개인 정보성 콘텐츠, 검색 색인 제외
// (robots.txt Disallow와 이중 안전망. 공유 링크는 지인 공유용이지 검색 공개용이 아님 — SEO_SSOT.md)
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function SajuLayout({ children }: { children: React.ReactNode }) {
  return children;
}
