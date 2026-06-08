"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { BackButton } from "@/shared/components/BackButton";
import { CtaButton } from "@/shared/components/CtaButton";
import { useLanding } from "../hooks/useLanding";

export function LandingView() {
  const router = useRouter();
  const { fading, handleStart } = useLanding();

  return (
    <>
      <section className="relative flex min-h-[100dvh] items-end justify-center" style={{ fontFamily: "var(--font-pretendard)" }}>
        <Image
          src="/poster-love-saju-main.png"
          alt="연애 사주 — 두 남자가 보는 당신의 연애운"
          fill
          priority
          className="object-cover object-top"
        />
        <BackButton
          onClick={() => router.push("/")}
          className="absolute left-5 top-5 z-30"
        />
        <CtaButton
          label="연애운 보러가기"
          gradient="bg-[#D73F59]"
          onClick={handleStart}
        />
        <div
          className="pointer-events-none absolute inset-0 z-20 bg-black"
          style={{
            opacity: fading ? 1 : 0,
            transition: "opacity 0.8s ease-in",
          }}
        />
      </section>
    </>
  );
}
