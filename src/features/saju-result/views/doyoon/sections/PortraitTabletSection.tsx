"use client";

import Image from "next/image";
import { SpeechBubble } from "../components/SpeechBubble";

export default function PortraitTabletSection() {
  return (
    <div className="w-full relative">
      <Image
        src="/saju/doyoon/result/10-portrait-tablet.png"
        alt="한도윤 초상 (태블릿)"
        width={1028}
        height={1838}
        className="w-full h-auto block"
        sizes="(max-width: 448px) 100vw, 448px"
      />

      <svg
        aria-hidden="true"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "calc(16% + 50px)",
          pointerEvents: "none",
          zIndex: 1,
          display: "block",
        }}
      >
        <path
          d="M 0 25 Q 50 50 100 25 L 100 100 L 0 100 Z"
          fill="#FAF3EB"
        />
      </svg>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "70px",
          background: "linear-gradient(to bottom, #F8EFE6 0%, #F8EFE6 15%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <div className="absolute bottom-[5%] z-10" style={{ left: "80px", right: "80px" }}>
        <SpeechBubble
          speaker="한도윤"
          widthPct={100}
          block
          tail={false}
          radius={30}
          textSize={17}
          paddingX={20}
          paddingY={24}
          lineHeight="27px"
          borderWidth={2.5}
        >
          딴 데 기웃거리지 마시고,
          <br />
          제가 짚어드리는 것만 보세요.
          <br />
          손님 사주, 제가 제일 잘 읽거든요.
        </SpeechBubble>
      </div>
    </div>
  );
}
