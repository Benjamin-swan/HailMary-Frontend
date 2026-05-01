"use client";

import Image from "next/image";
import { SpeechBubble } from "../components/SpeechBubble";

export default function PortraitArmsCrossedSection() {
  return (
    <div className="w-full relative">
      <Image
        src="/saju/doyoon/result/07-portrait.png"
        alt="한도윤 초상 (팔짱)"
        width={1028}
        height={1638}
        className="w-full h-auto block"
        sizes="(max-width: 448px) 100vw, 448px"
      />

      <div
        className="absolute top-[6%] left-[5%] z-10"
        style={{ transform: "translateY(-30px)" }}
      >
        <SpeechBubble
          widthPct={100}
          tail="down"
          tailPosition={85}
          tailOffsetPx={-10}
          radius={40}
          textSize={14}
          paddingX={20}
          paddingY={15}
        >
          연애가 반복적으로
          <br />
          실패하는 데는
          <br />
          구조적인 이유가 있어요.
        </SpeechBubble>
      </div>

      <div
        className="absolute top-[44%] right-[5%] z-10 flex justify-end"
        style={{ transform: "translateY(80px)" }}
      >
        <SpeechBubble
          speaker="한도윤"
          widthPct={100}
          tail="up"
          tailPosition={15}
          tailOffsetPx={10}
          radius={40}
          textSize={14}
          paddingX={20}
          paddingY={15}
        >
          우연이 아닙니다.
          <br />
          사주에서 이미 예측 가능한
          <br />
          패턴이에요.
        </SpeechBubble>
      </div>

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
