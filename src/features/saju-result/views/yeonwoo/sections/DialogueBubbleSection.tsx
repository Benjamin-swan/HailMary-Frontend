"use client";

import { SpeechBubble } from "../components/SpeechBubble";

export function DialogueBubbleSection() {
  return (
    <div
      className="w-full flex justify-center items-center pt-[30px] pb-[110px]"
      style={{ background: "#000" }}
    >
      <SpeechBubble speaker="강연우" widthPct={72} radius={53}>
        ...봤어. 다 보여.<br />어디서부터 얘기해줄까.
      </SpeechBubble>
    </div>
  );
}
