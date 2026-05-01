"use client";

import Image from "next/image";

export default function TitleBannerSection() {
  return (
    <div className="w-full">
      <Image
        src="/saju/doyoon/result/02-banner.png"
        alt="도화선 桃花線"
        width={1080}
        height={320}
        className="w-full h-auto block"
        priority
        sizes="(max-width: 448px) 100vw, 448px"
      />
    </div>
  );
}
