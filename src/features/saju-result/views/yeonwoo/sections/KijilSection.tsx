"use client";

import Image from "next/image";

export function KijilSection() {
  return (
    <div className="relative w-full pt-8 pb-[82px]" style={{ background: "#000" }}>
      <div className="relative z-10 flex flex-col gap-3 pl-3 pr-1 mt-[50px] ml-[10px]">
        <div className="w-[34%] relative z-0 translate-y-[15px]">
          <Image
            src="/saju/yeonwoo/result/08-text-1.png"
            alt="이게 네 기질이야."
            width={220}
            height={60}
            className="w-full h-auto block"
            style={{ height: "auto" }}
            sizes="(max-width: 448px) 48vw, 220px"
          />
        </div>
        <div className="w-[58%] relative z-10">
          <Image
            src="/saju/yeonwoo/result/08-text-2.png"
            alt="그리고 이런 네 기질이 밖으로 드러날 때, 남들에겐 이런 매력으로 보여"
            width={280}
            height={90}
            className="w-full h-auto block"
            style={{ height: "auto" }}
            sizes="(max-width: 448px) 64vw, 280px"
          />
        </div>
      </div>
      <div className="absolute bottom-[20px] right-3 w-[38%]">
        <Image
          src="/saju/yeonwoo/result/08.png"
          alt=""
          width={220}
          height={300}
          className="w-full h-auto block"
          style={{ height: "auto" }}
          sizes="(max-width: 448px) 38vw, 170px"
        />
      </div>
    </div>
  );
}
