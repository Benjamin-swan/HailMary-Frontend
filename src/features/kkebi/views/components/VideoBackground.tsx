interface VideoBackgroundProps {
  src: string;
}

export function VideoBackground({ src }: VideoBackgroundProps) {
  return (
    <>
      <video
        className="absolute inset-0 z-0 h-full w-full bg-black"
        style={{ objectFit: "contain", objectPosition: "top" }}
        autoPlay
        loop
        muted
        playsInline
        src={src}
      />
      {/* 시네마틱 오버레이 — 상단은 유지, 중간~하단(깨비 캐릭터)은 밝게.
         맨 하단은 시작하기 버튼/문구 가독성 위해 약간만 어둡게(textShadow가 보완). */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.08) 80%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </>
  );
}
