import ShareResultClient from "./ShareResultClient";

export function generateStaticParams() {
  // Static Export 호환용 placeholder. 실제 share_code는 CloudFront Function이
  // /saju/result/_placeholder 로 rewrite → 클라이언트가 window.location 직접 파싱.
  return [{ share_code: "_placeholder" }, { share_code: "test-share-code" }];
}

export default function ShareResultPage() {
  return <ShareResultClient />;
}
