"use client";

import Image from "next/image";

export default function IncompatibleBannerSection() {
  return (
    <div className="w-full">
      <Image
        src="/saju/doyoon/result/08-banner-incompatible.png"
        alt="데이터가 분류한, 통계적 비호환 유형"
        width={2028}
        height={312}
        className="w-full h-auto block"
        sizes="(max-width: 448px) 100vw, 448px"
      />
    </div>
  );
}
