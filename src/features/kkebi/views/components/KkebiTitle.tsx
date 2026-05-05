import Image from "next/image";

interface KkebiTitleProps {
  src: string;
}

export function KkebiTitle({ src }: KkebiTitleProps) {
  return (
    <div
      className="absolute inset-x-0 top-[53px] z-20 flex justify-center px-6"
      style={{ mixBlendMode: "screen" }}
    >
      <Image
        src={src}
        alt="깨비의 일일운세"
        width={680}
        height={240}
        priority
        className="h-auto w-full max-w-[360px]"
        style={{ filter: "saturate(1.5) contrast(1.1)" }}
      />
    </div>
  );
}
