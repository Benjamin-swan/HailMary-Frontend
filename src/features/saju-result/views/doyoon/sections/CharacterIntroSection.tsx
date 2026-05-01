"use client";

import Image from "next/image";
import { SpeechBubble } from "../components/SpeechBubble";

const SURFACE_BEIGE = "#FDF5EA";

type Props = {
  displayName: string;
};

export default function CharacterIntroSection({ displayName }: Props) {
  return (
    <div className="w-full" style={{ background: SURFACE_BEIGE }}>
      <div className="w-full px-6 pt-[30px] pb-6" style={{ textAlign: "center" }}>
        <p
          style={{
            fontFamily: "Pretendard, sans-serif",
            fontSize: "30px",
            fontWeight: 500,
            lineHeight: "1.55",
            color: "#3a2a1a",
            textAlign: "center",
          }}
        >
          {displayName}님의 사주,
          <br />
          예상보다 흥미롭네요.
        </p>
        <p
          className="mt-3"
          style={{
            fontFamily: "Pretendard, sans-serif",
            fontSize: "15px",
            fontWeight: 500,
            color: "#AD7D38",
            letterSpacing: "0.2px",
            textAlign: "center",
          }}
        >
          분석 완료됐습니다.
        </p>
      </div>

      <div
        className="w-full px-6 pb-8 flex justify-center relative z-10"
        style={{ transform: "translateY(70px)" }}
      >
        <SpeechBubble speaker="한도윤" widthPct={68} tail={true}>
          분석 완료됐습니다.
          <br />
          예상보다 흥미로운 결과네요.
        </SpeechBubble>
      </div>

      <div className="w-full relative" style={{ overflow: "hidden" }}>
        <Image
          src="/saju/doyoon/result/02-character.png"
          alt="한도윤"
          width={2056}
          height={3680}
          className="w-full h-auto block"
          style={{ marginTop: "-30px" }}
          sizes="(max-width: 448px) 100vw, 448px"
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "110px",
            background: `linear-gradient(to bottom, ${SURFACE_BEIGE}, transparent)`,
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
            height: "50px",
            background: "linear-gradient(to top, #F9E3C8 0%, #F9E3C8 30%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
