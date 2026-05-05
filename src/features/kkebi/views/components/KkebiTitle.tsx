import Image from "next/image";

interface KkebiTitleProps {
  src: string;
}

export function KkebiTitle({ src }: KkebiTitleProps) {
  return (
    <div
      className="absolute inset-x-0 top-[88px] z-20 flex justify-center px-6"
      style={{ filter: "drop-shadow(0 4px 20px rgba(255,180,200,0.3))" }}
    >
      <Image
        src={src}
        alt="깨비의 일일운세"
        width={680}
        height={240}
        priority
        className="h-auto w-full max-w-[340px]"
      />
    </div>
  );
}
