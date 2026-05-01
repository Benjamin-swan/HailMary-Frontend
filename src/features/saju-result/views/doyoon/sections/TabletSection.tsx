"use client";

import Image from "next/image";
import { SpeechBubble } from "../components/SpeechBubble";

type Props = {
  displayName: string;
};

export default function TabletSection({ displayName }: Props) {
  return (
    <div className="w-full relative">
      <Image
        src="/saju/doyoon/result/04-tablet.png"
        alt="사주 분석 태블릿"
        width={1028}
        height={1650}
        className="w-full h-auto block"
        sizes="(max-width: 448px) 100vw, 448px"
      />

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

      <div
        className="absolute top-[5%] left-[5%] z-10"
        style={{ transform: "translateY(40px)" }}
      >
        <SpeechBubble widthPct={100} tail={false} radius={40} textSize={14} paddingX={18}>
          사주 데이터 입력 완료.
        </SpeechBubble>
      </div>

      <div className="absolute bottom-[6%] right-[5%] z-10 flex justify-end">
        <SpeechBubble speaker="한도윤" widthPct={100} tail={false} radius={40} textSize={15} paddingX={20}>
          흥미로운 구조네요. {displayName}님.
        </SpeechBubble>
      </div>
    </div>
  );
}
