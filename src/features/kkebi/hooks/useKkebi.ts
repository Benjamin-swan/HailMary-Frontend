"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useKkebi() {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.push("/");
  }, [router]);

  return { handleBack };
}
