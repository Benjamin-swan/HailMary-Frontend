"use client";

import Image from "next/image";
import { WUXING_HANJA } from "@/features/saju/constants";
import type { Pillar, WuxingKey } from "@/features/saju/types";

type Props = { pillars: Pillar[] };

export function BubblesDaBoYeoSection({ pillars }: Props) {
  const dayPillar = pillars.find((p) => p.label === "일주");
  const dayStemHanja = dayPillar?.heaven ?? "";
  const dayEl = (dayPillar?.element.split("/")[0].trim() ?? "수") as WuxingKey;
  const dayElementHanja = WUXING_HANJA[dayEl] ?? "";

  return (
    <div className="relative w-full" style={{ background: "#000" }}>
      <Image
        src="/saju/yeonwoo/result/11-bubbles-da-bo-yeo.png"
        alt=""
        width={1530}
        height={2040}
        className="w-full h-auto block"
        sizes="(max-width: 448px) 100vw, 448px"
      />
      {dayStemHanja && (
        <div
          className="absolute left-[7%]"
          style={{
            top: "82%",
            transform: "translate(12px, -20px)",
            color: "rgba(201,169,110,0.7)",
            fontSize: "clamp(14px, 4vw, 20px)",
            letterSpacing: "0.05em",
            fontWeight: 400,
            fontFamily: "\"JejuMyeongjo\", \"ChosunNm\", \"ChosunGs\", \"ChosunCentennial\", \"Pretendard\", serif",
          }}
        >
          <span style={{ fontFamily: "\"ChosunNm\", \"ChosunGs\", serif" }}>
            {dayStemHanja}
            {dayElementHanja}
          </span>
          면 특히.
        </div>
      )}
    </div>
  );
}
