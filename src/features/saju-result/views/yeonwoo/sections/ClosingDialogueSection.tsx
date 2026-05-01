"use client";

import { SpeechBubble } from "../components/SpeechBubble";

export function ClosingDialogueSection() {
  return (
    <div
      className="w-full flex justify-center items-center pt-[30px] pb-[110px]"
      style={{ background: "#000" }}
    >
      <div
        style={{
          transform: "translateY(-50px)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <SpeechBubble speaker="강연우" widthPct={72} paddingX={34}>
          딴 데 기웃거리지 말고,<br />
          내가 짚어주는 것만 봐.<br />
          네 팔자,<br />
          내가 제일 잘 보거든.
        </SpeechBubble>
      </div>
    </div>
  );
}
