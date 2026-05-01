"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { DoyoonResultScene, YeonwooResultScene } from "@/features/saju-result";

function Inner() {
  const params = useSearchParams();
  const character = params.get("character") === "yeonwoo" ? "yeonwoo" : "doyoon";
  return character === "yeonwoo" ? <YeonwooResultScene /> : <DoyoonResultScene />;
}

export default function SajuResultPage() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}
