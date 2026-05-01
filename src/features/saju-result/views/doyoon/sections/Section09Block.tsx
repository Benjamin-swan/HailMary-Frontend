"use client";

import Image from "next/image";

export default function Section09Block() {
  return (
    <div className="w-full">
      <Image
        src="/saju/doyoon/result/09-section.svg"
        alt="이 패턴, 설명이 가능해요"
        width={510}
        height={1021}
        className="w-full h-auto block"
        sizes="(max-width: 448px) 100vw, 448px"
      />
    </div>
  );
}
