import type { Metadata } from "next";
import { ArchiveView } from "@/features/archive";

export const metadata: Metadata = {
  title: "보관함",
  // 개인 보관함은 검색 비노출
  robots: { index: false, follow: false },
};

export default function ArchivePage() {
  return <ArchiveView />;
}
