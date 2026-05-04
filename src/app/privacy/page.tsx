import Link from "next/link";

export const metadata = {
  title: "개인정보처리방침 — 도화선",
};

export default function PrivacyPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-12 text-center text-white">
      <h1 className="text-2xl font-semibold">개인정보처리방침</h1>
      <p className="text-sm text-neutral-300">
        개인정보처리방침은 현재 준비 중입니다.
      </p>
      <Link
        href="/"
        className="mt-4 rounded-full border border-white/40 px-5 py-2 text-sm hover:bg-white/10"
      >
        첫 화면으로
      </Link>
    </main>
  );
}
