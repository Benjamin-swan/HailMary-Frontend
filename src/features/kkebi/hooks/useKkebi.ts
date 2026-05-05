"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useKkebi() {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleShare = useCallback(async () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "깨비의 일일운세",
          text: "사주카페 월하 — 깨비의 일일운세",
          url,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      // 사용자 취소 또는 미지원 — 무시
    }
  }, []);

  return { handleBack, handleShare };
}
