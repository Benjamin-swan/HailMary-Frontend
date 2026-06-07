import type { Metadata } from "next";
import { IntroScene } from "@/features/intro";

export const metadata: Metadata = {
  title: "인트로 스토리",
  description:
    "붉은 실이 당신의 손목을 감는 순간, 이야기가 시작됩니다. 도화선의 시네마틱 인트로.",
  alternates: { canonical: "/intro/" },
};

export default function IntroPage() {
  return <IntroScene />;
}
