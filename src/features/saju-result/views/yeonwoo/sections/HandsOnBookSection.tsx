"use client";

import Image from "next/image";
import { InfoBox } from "../components/InfoBox";
import { useYeonwooBirthLabel } from "../../../hooks/useYeonwooSajuData";

export function HandsOnBookSection() {
  const birthLabel = useYeonwooBirthLabel();

  return (
    <div className="relative w-full">
      <Image
        src="/saju/yeonwoo/result/05.png"
        alt=""
        width={448}
        height={672}
        className="w-full h-auto block"
        sizes="(max-width: 448px) 100vw, 448px"
      />
      <Image
        src="/saju/yeonwoo/result/05-fade-top.png"
        alt=""
        width={448}
        height={313}
        className="absolute top-0 left-0 w-full h-auto pointer-events-none"
        style={{ height: "auto" }}
        sizes="(max-width: 448px) 100vw, 448px"
      />
      <Image
        src="/saju/yeonwoo/result/05-fade-bottom.png"
        alt=""
        width={448}
        height={90}
        className="absolute bottom-0 left-0 w-full h-auto pointer-events-none"
        style={{ height: "auto" }}
        sizes="(max-width: 448px) 100vw, 448px"
      />
      {birthLabel && (
        <div className="absolute top-[30%] left-[10%] w-[54%] -translate-y-[30px]">
          <InfoBox widthPct={100}>{birthLabel}</InfoBox>
        </div>
      )}
      <div className="absolute bottom-[15%] right-[10%] w-[60%] translate-y-[10px]">
        <InfoBox widthPct={100}>범상치 않은 팔자로군.</InfoBox>
      </div>
    </div>
  );
}
