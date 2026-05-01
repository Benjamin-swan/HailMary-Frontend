"use client";

import Image from "next/image";

export default function BlockSection() {
  return (
    <div className="w-full">
      <Image
        src="/saju/doyoon/result/06-block.svg"
        alt="도윤 결과 블록"
        width={510}
        height={467}
        className="w-full h-auto block"
        sizes="(max-width: 448px) 100vw, 448px"
      />
    </div>
  );
}
