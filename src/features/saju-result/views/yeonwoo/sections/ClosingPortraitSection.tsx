"use client";

import Image from "next/image";

export function ClosingPortraitSection() {
  return (
    <div className="relative w-full" style={{ background: "#000", containerType: "inline-size" }}>
      <Image
        src="/saju/yeonwoo/result/10-yeonwoo-arms.png"
        alt=""
        width={1930}
        height={1341}
        className="w-full h-auto block"
        sizes="(max-width: 448px) 100vw, 448px"
      />
      <div
        className="absolute top-[4%] left-[4%] max-w-[58%] inline-flex"
        style={{
          padding: "0.875em 1.25em",
          borderRadius: "1.25em",
          border: "1px solid #856C51",
          background: "#12110F",
          color: "#e8e0d4",
          fontSize: "min(16px, 3.571cqw)",
          lineHeight: 1.75,
          fontWeight: 500,
          letterSpacing: "0.0225em",
        }}
      >
        <span>
          말 안 해도 알아.
          <br />
          연애가 자꾸 같은 데서
          <br />
          끊기는 느낌, 맞지?
        </span>
      </div>
      <div
        className="absolute top-[42%] left-[4%] max-w-[58%] inline-flex flex-col"
        style={{
          padding: "0.875em 1.25em",
          borderRadius: "1.25em",
          border: "1px solid #856C51",
          background: "#12110F",
          color: "#e8e0d4",
          fontSize: "min(16px, 3.571cqw)",
          lineHeight: 1.75,
          fontWeight: 500,
          letterSpacing: "0.0225em",
          transform: "translateY(2.5em)",
        }}
      >
        <p
          style={{
            color: "#c9a96e",
            fontSize: "0.8125em",
            fontWeight: 600,
            marginBottom: "0.25em",
          }}
        >
          강연우
        </p>
        <span>
          네 사주에 걸려 있는 게 있어.
          <br />
          내 눈엔 보여.
        </span>
      </div>
    </div>
  );
}
