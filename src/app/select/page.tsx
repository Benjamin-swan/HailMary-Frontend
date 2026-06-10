import type { Metadata } from "next";
import { CharacterSelectScene } from "@/features/character-select";

export const metadata: Metadata = {
  title: "캐릭터 선택",
  description:
    "당신의 사주를 풀어줄 사람을 고르세요. 강연우와 한도윤 — 누구를 고르느냐에 따라 해석의 결이 완전히 달라집니다.",
  alternates: { canonical: "/select/" },
};

export default function SelectPage() {
  return <CharacterSelectScene />;
}
