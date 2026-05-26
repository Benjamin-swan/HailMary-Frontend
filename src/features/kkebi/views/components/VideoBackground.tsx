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
      {/* 시네마틱 오버레이 — 상단/하단 둘 다 어둡게 */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 25%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.85) 100%)",
        }}
      />
    </>
  );
}
