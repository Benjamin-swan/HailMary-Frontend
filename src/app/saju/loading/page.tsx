"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SajuLoadingView } from "@/features/saju-loading";

function Inner() {
  const params = useSearchParams();
  const character = params.get("character") === "yeonwoo" ? "yeonwoo" : "doyoon";
  return <SajuLoadingView character={character} />;
}

export default function SajuLoadingPage() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}
