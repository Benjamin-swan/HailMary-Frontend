"use client";

type Props = {
  line: string;
};

export default function TipLine({ line }: Props) {
  return (
    <p
      className="text-[13px] sm:text-[16px] leading-[1.6] font-normal animate-[fadeIn_0.5s_ease-out]"
      style={{ color: "#ddc1b3" }}
    >
      {line}
    </p>
  );
}
