"use client";

import Link from "next/link";
import { useEffect } from "react";
import { MainView } from "@/features/main";

export default function BgTestAPage() {
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.cssText;
    html.style.backgroundImage = "url('/test/bg-yw.png')";
    html.style.backgroundSize = "cover";
    html.style.backgroundPosition = "center";
    html.style.backgroundAttachment = "fixed";
    html.style.backgroundColor = "transparent";
    return () => {
      html.style.cssText = prev;
    };
  }, []);

  return (
    <>
      <Link
        href="/bg-test/"
        className="fixed top-2 right-2 z-50 rounded-md bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-sm hover:bg-black/80"
      >
        ← 비교 허브
      </Link>
      <MainView />
    </>
  );
}
