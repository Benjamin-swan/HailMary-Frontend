"use client";

import Image from "next/image";

export function FinalCtaSection() {
  return (
    <div className="relative w-full" style={{ background: "#000" }}>
      <Image
        src="/saju/yeonwoo/result/13-yeonwoo-arms-folded.png"
        alt=""
        width={1530}
        height={1764}
        className="w-full h-auto block"
        sizes="(max-width: 448px) 100vw, 448px"
      />
      <div className="absolute bottom-[5%] left-[4%]">
        <div
          className="inline-flex items-center justify-center"
          style={{
            padding: "20px 32px",
            gap: "10px",
            borderRadius: "32px",
            border: "1px solid #E8C9A0",
            background: "#11110F",
            color: "#FFF",
            textAlign: "center",
            fontFamily: "Pretendard, sans-serif",
            fontSize: "15px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "24px",
            letterSpacing: "-0.6px",
          }}
        >
          네 사주에서 읽히는 것들,
          <br />
          네가 궁금해 하는 것들
          <br />
          다 읽어줄게
        </div>
      </div>
    </div>
  );
}
