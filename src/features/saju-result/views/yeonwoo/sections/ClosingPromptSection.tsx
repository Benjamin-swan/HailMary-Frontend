"use client";

import Image from "next/image";

export function ClosingPromptSection() {
  return (
    <div className="w-full" style={{ background: "#000" }}>
      <Image
        src="/saju/yeonwoo/result/09-closing.svg"
        alt="사주라는 지도를 펼쳤으니, 이제 네가 걸어갈 길을 자세히 볼 차례네. 남들은 모르는 너만의 진짜 무기는 뭔지 정체를 내가 딱 짚어줄게. 준비됐어?"
        width={510}
        height={467}
        className="w-full h-auto block"
        style={{ clipPath: "inset(0 0 50px 0)", marginBottom: "-50px" }}
        sizes="(max-width: 448px) 100vw, 448px"
      />
    </div>
  );
}
