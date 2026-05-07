"use client";

import Image from "next/image";

const TOP_FADE_FROM = "#FDF5EA"; // AvoidPartnerInfoSection 배경
const BOTTOM_FADE_FROM = "#F8EFE6"; // BeigeBlockSection 배경

export default function Section09Block() {
  return (
    <div className="w-full relative" style={{ overflow: "hidden" }}>
      <Image
        src="/saju/doyoon/result/09-section.svg"
        alt="이 패턴, 설명이 가능해요"
        width={510}
        height={1021}
        className="w-full h-auto block"
        sizes="(max-width: 448px) 100vw, 448px"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 right-0"
        style={{
          height: "60px",
          background: `linear-gradient(to bottom, ${TOP_FADE_FROM} 0%, ${TOP_FADE_FROM} 15%, transparent 100%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0"
        style={{
          height: "60px",
          background: `linear-gradient(to top, ${BOTTOM_FADE_FROM} 0%, ${BOTTOM_FADE_FROM} 15%, transparent 100%)`,
        }}
      />
    </div>
  );
}
