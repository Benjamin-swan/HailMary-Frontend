"use client";

import Image from "next/image";

export function YeonwooBookSection() {
  return (
    <div className="w-full" style={{ background: "#000" }}>
      <Image
        src="/saju/yeonwoo/result/12-yeonwoo-book.png"
        alt=""
        width={1029}
        height={1529}
        className="w-full h-auto block"
        style={{ clipPath: "inset(0 0 50px 0)" }}
        sizes="(max-width: 448px) 100vw, 448px"
      />
    </div>
  );
}
