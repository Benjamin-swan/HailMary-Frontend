"use client";

import Image from "next/image";

export function SceneOpeningSection() {
  return (
    <div className="relative w-full">
      <Image
        src="/saju/yeonwoo/result/02.png"
        alt=""
        width={448}
        height={120}
        className="w-full h-auto block"
        sizes="(max-width: 448px) 100vw, 448px"
      />
      <Image
        src="/saju/yeonwoo/result/03.png"
        alt=""
        width={448}
        height={600}
        className="w-full h-auto block"
        sizes="(max-width: 448px) 100vw, 448px"
      />
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        style={{
          height: "40px",
          background: "linear-gradient(to top, rgba(20,19,17,1), rgba(20,19,17,0))",
        }}
      />
    </div>
  );
}
