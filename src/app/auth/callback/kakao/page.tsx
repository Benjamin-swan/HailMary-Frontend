import { Suspense } from "react";
import { AuthCallbackClient } from "@/features/auth/views/AuthCallbackClient";

export default function KakaoCallbackPage() {
  return (
    <Suspense fallback={null}>
      <AuthCallbackClient provider="kakao" />
    </Suspense>
  );
}
