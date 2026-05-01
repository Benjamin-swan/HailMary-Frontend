"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="w-full">
      <Image
        src="/saju/doyoon/result/01-hero.svg"
        alt="도화선"
        width={510}
        height={654}
        className="w-full h-auto block"
        priority
        sizes="(max-width: 448px) 100vw, 448px"
      />
    </div>
  );
}
