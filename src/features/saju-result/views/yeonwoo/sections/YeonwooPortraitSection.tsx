"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { WUXING_HUES } from "@/features/saju/constants";
import type { Pillar, WuxingKey } from "@/features/saju/types";
import { STEM_DIALOGUES, isHeavenStemHangul } from "../../../domain/stemDialogues-yeonwoo";

type Props = { pillars: Pillar[] };

export function YeonwooPortraitSection({ pillars }: Props) {
  const dayPillar = pillars.find((p) => p.label === "일주");
  const dayEl = (dayPillar?.element.split("/")[0].trim() ?? "수") as WuxingKey;
  const dayStemHangul = dayPillar?.heavenHangul ?? "";
  const stemKey = isHeavenStemHangul(dayStemHangul) ? dayStemHangul : "계";
  const template = STEM_DIALOGUES[stemKey];
  const dayStemHanja = dayPillar?.heaven ?? "";

  const [isMobilePortrait, setIsMobilePortrait] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(orientation: portrait) and (max-width: 768px)");
    setIsMobilePortrait(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobilePortrait(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="relative w-full">
      <Image
        src="/saju/yeonwoo/result/07.png"
        alt=""
        width={448}
        height={448}
        className="w-full h-auto block"
        style={{ height: "auto" }}
        sizes="(max-width: 448px) 100vw, 448px"
        priority
      />
      <div
        className="absolute top-[5%] left-[3%] max-w-[68%] inline-flex items-center justify-center"
        style={{
          padding: "20px 32px",
          gap: "10px",
          borderRadius: "9999px",
          border: "1px solid #E8C9A0",
          background: "#11110F",
          color: "#FFF",
          textAlign: "center",
          fontFamily: "Pretendard, sans-serif",
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "24px",
          letterSpacing: "-0.64px",
          wordBreak: "keep-all",
          transform: isMobilePortrait ? "translateY(-60px)" : "translateY(-10px)",
        }}
      >
        {template.pros}
      </div>
      <div
        className="absolute top-[40%] right-[3%] max-w-[68%] inline-flex items-center justify-center"
        style={{
          padding: "20px 32px",
          gap: "10px",
          borderRadius: "9999px",
          border: "1px solid #E8C9A0",
          background: "#11110F",
          color: "#FFF",
          textAlign: "center",
          fontFamily: "Pretendard, sans-serif",
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "24px",
          letterSpacing: "-0.64px",
          wordBreak: "keep-all",
          transform: "translateY(120px)",
        }}
      >
        <span>
          {template.cons}
          {dayStemHanja && (
            <>
              {" "}
              <span style={{ color: WUXING_HUES[dayEl], whiteSpace: "nowrap" }}>
                ({dayStemHanja} 일간)
              </span>
            </>
          )}
        </span>
      </div>
    </div>
  );
}
