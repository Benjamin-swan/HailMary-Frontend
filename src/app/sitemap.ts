import type { MetadataRoute } from "next";

// static export(output: "export") 필수 선언 — 빌드 타임 정적 생성 명시
export const dynamic = "force-static";

const SITE_URL = "https://dohwaseonsaju.com";

// 빌드 타임에 out/sitemap.xml 정적 파일로 구워진다 (static export).
// 색인 대상 페이지만 등록 — 사주 결과/결제/dev 경로는 robots.txt + noindex로 차단 (SEO_SSOT.md 색인 정책).
// trailingSlash: true 설정과 일치하도록 모든 URL은 `/`로 끝낸다.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, priority: 1.0, changeFrequency: "weekly" },
    { url: `${SITE_URL}/fortune/daily/`, priority: 0.8, changeFrequency: "daily" },
    { url: `${SITE_URL}/select/`, priority: 0.5, changeFrequency: "monthly" },
    { url: `${SITE_URL}/intro/`, priority: 0.5, changeFrequency: "monthly" },
  ];
}
