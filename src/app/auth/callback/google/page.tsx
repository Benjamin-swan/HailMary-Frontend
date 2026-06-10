import { Suspense } from "react";
import { AuthCallbackClient } from "@/features/auth/views/AuthCallbackClient";

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={null}>
      <AuthCallbackClient provider="google" />
    </Suspense>
  );
}
