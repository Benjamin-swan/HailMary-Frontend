"use client";

import Image from "next/image";
import { SpeechBubble } from "../components/SpeechBubble";

type Props = {
  displayName: string;
};

export default function PortraitSection({ displayName }: Props) {
  return (
    <div className="w-full relative">
      <Image
        src="/saju/doyoon/result/05-portrait.png"
        alt="한도윤 초상"
        width={1028}
        height={1492}
        className="w-full h-auto block"
        sizes="(max-width: 448px) 100vw, 448px"
      />

      <div
        className="absolute bottom-[6%] left-1/2 z-10"
        style={{ transform: "translateX(-50%)" }}
      >
        <SpeechBubble
          speaker="한도윤"
          widthPct={100}
          tail="up"
          radius={30}
          textSize={14}
          paddingX={30}
          paddingY={15}
        >
          매력 지수 분석 결과입니다.
          <br />
          {displayName}님이 가진 것들,
          <br />
          생각보다 강력해요.
        </SpeechBubble>
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "70px",
          background: "linear-gradient(to bottom, #FDF5EA 0%, #FDF5EA 15%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40px",
          background: "linear-gradient(to top, #FDF5EA 0%, #FDF5EA 15%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
