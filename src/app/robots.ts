import type { MetadataRoute } from "next";

// static export(output: "export") 필수 선언 — 빌드 타임 정적 생성 명시
export const dynamic = "force-static";

// 빌드 타임에 실행되어 out/robots.txt 정적 파일로 구워진다 (static export).
// staging 빌드(NEXT_PUBLIC_API_URL에 staging-api 포함)는 전체 차단 —
// staging.dohwaseonsaju.com이 prod와 중복 색인되는 것을 방지.
const isStagingBuild = (process.env.NEXT_PUBLIC_API_URL ?? "").includes("staging-api");

export default function robots(): MetadataRoute.Robots {
  if (isStagingBuild) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dev/", "/qa/", "/bg-test/", "/checkout/", "/saju/"],
    },
    sitemap: "https://dohwaseonsaju.com/sitemap.xml",
  };
}
