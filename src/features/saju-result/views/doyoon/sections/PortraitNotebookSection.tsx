"use client";

import Image from "next/image";
import { SpeechBubble } from "../components/SpeechBubble";

export default function PortraitNotebookSection() {
  return (
    <div className="w-full relative">
      <Image
        src="/saju/doyoon/result/11-portrait-notebook.png"
        alt="한도윤 초상 (수첩)"
        width={988}
        height={1484}
        className="w-full h-auto block"
        sizes="(max-width: 448px) 100vw, 448px"
      />

      <div
        className="absolute bottom-[5%] right-[5%] z-10 flex justify-end"
        style={{ transform: "translate(-50px, -70px)" }}
      >
        <SpeechBubble
          speaker="한도윤"
          widthPct={100}
          tail="up"
          tailPosition={15}
          tailOffsetPx={18}
          radius={40}
          textSize={16}
          paddingX={40}
          paddingY={15}
          borderWidth={2.5}
          speakerSize={14}
          letterSpacing="1.36px"
        >
          분석 가능한 것들을
          <br />
          전부 알려드릴게요.
        </SpeechBubble>
      </div>
    </div>
  );
}
