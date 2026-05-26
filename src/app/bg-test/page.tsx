"use client";

import Link from "next/link";

export default function BgTestHubPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-6 bg-neutral-900 p-6 text-neutral-100">
      <h1 className="text-xl font-semibold">데스크톱 배경 비교</h1>
      <p className="text-sm text-neutral-400">
        모바일 컬럼 바깥 영역에 적용할 배경 후보 2종
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/bg-test/a/"
          className="rounded-lg border border-amber-700/60 bg-amber-50/10 px-5 py-3 text-center hover:bg-amber-50/20"
        >
          A안 · 베이지 (연우 톤)
        </Link>
        <Link
          href="/bg-test/b/"
          className="rounded-lg border border-indigo-900/60 bg-indigo-950/40 px-5 py-3 text-center hover:bg-indigo-950/60"
        >
          B안 · 다크 (도윤 톤)
        </Link>
        <Link
          href="/bg-test/c/"
          className="rounded-lg border border-stone-400/60 px-5 py-3 text-center text-stone-900 hover:opacity-90"
          style={{ backgroundColor: "#F0EBE3" }}
        >
          C안 · 단색 #F0EBE3
        </Link>
      </div>
      <p className="max-w-sm text-center text-xs text-neutral-500">
        데스크톱(가로폭 ≥ 768px)에서 확인하세요. 모바일에선 컬럼이 화면을 다 차지해 배경이 안 보입니다.
      </p>
    </div>
  );
}
