"use client";

type Props = {
  line: string;
};

export default function TipLine({ line }: Props) {
  return (
    <p
      className="text-[14px] sm:text-[17px] leading-[1.6] font-medium animate-[fadeIn_0.5s_ease-out]"
      style={{ color: "#ddc1b3", wordBreak: "keep-all" }}
    >
      {line}
    </p>
  );
}
