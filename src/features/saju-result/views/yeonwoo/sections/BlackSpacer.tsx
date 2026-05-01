"use client";

type Props = {
  height?: number;
  color?: string;
};

export function BlackSpacer({ height = 140, color = "#000" }: Props) {
  return (
    <div className="w-full" style={{ background: color, height: `${height}px` }} />
  );
}
