import type { Metadata } from "next";
import { KkebiDailyScene } from "@/features/kkebi";

export const metadata: Metadata = {
  title: "깨비 일일사주 — 오늘의 운세",
  description:
    "도깨비 깨비가 사주 일주로 풀어주는 오늘의 운세. 생년월일만 입력하면 매일 새로운 하루 운세를 무료로 확인할 수 있어요.",
  alternates: { canonical: "/fortune/daily/" },
};

export default function KkebiDailyPage() {
  return <KkebiDailyScene />;
}
