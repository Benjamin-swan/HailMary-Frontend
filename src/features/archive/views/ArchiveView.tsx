"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LoginPromptModal, useAuth } from "@/features/auth";
import { trackEvent } from "@/shared/utils/analytics";
import { useArchive } from "../hooks/useArchive";
import { productName, type PaidArchiveItem } from "../domain/types";

// 보관함 — 톤: 홈과 동일 다크 그라데이션 (하단 네비 바 공통, 시각 연속성).
const PAGE_BG = "linear-gradient(180deg, #1a1530 0%, #0f0a22 100%)";
const BOTTOM_PAD = "calc(67px + env(safe-area-inset-bottom) + 16px)";

function formatDate(iso: string): string {
  // BE는 UTC naive(Z 없음)로 직렬화 → UTC로 간주하고 KST(Asia/Seoul) 날짜로 표시.
  // (단순 slice는 늦은밤 KST 결제 시 만료일이 하루 어긋남)
  const d = new Date(iso.endsWith("Z") ? iso : `${iso}Z`);
  if (Number.isNaN(d.getTime())) return iso.slice(0, 10).replace(/-/g, ".");
  // en-CA 로케일 = YYYY-MM-DD 포맷
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(d)
    .replace(/-/g, ".");
}

export function ArchiveView() {
  const { isAuthenticated, refreshMe } = useAuth();
  const { data, status } = useArchive();
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    void refreshMe();
  }, [refreshMe]);

  const hasItems =
    !!data && (data.paid.length > 0 || data.kkebi !== null);

  return (
    <div
      className="flex min-h-[100dvh] flex-1 flex-col px-5 pt-12"
      style={{ background: PAGE_BG, fontFamily: "var(--font-pretendard)", paddingBottom: BOTTOM_PAD }}
    >
      <h1 className="text-[20px] font-bold text-white">보관함</h1>
      <p className="mt-1 text-[13px] text-white/50">
        받은 사주 결과지와 오늘의 운세를 모아둬요.
      </p>

      {!isAuthenticated ? (
        <UnauthedState onLogin={() => setLoginOpen(true)} />
      ) : status === "loading" ? (
        <div className="mt-16 flex flex-1 justify-center">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-white/15 border-t-white/70" aria-hidden />
        </div>
      ) : hasItems ? (
        <div className="mt-7 flex flex-col gap-3">
          {data!.kkebi && <KkebiCard summary={data!.kkebi.summary} />}
          {data!.paid.map((item) => (
            <PaidCard key={item.orderId} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}

      <LoginPromptModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        returnTo="/archive/"
        source="archive_page"
      />
    </div>
  );
}

function PaidCard({ item }: { item: PaidArchiveItem }) {
  const name = productName(item.character);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold text-white">{name}</p>
          <p className="mt-0.5 text-[11.5px] text-white/40">
            {`${formatDate(item.expiresAt)}까지 다시 볼 수 있어요`}
          </p>
        </div>
        {item.shareCode ? (
          <Link
            href={`/saju/result/${item.shareCode}/`}
            onClick={() => trackEvent("archive_reopen_click", { character_id: item.character })}
            className="shrink-0 rounded-full bg-white px-4 py-2 text-[12.5px] font-semibold text-neutral-900 transition-opacity hover:opacity-90"
          >
            다시 보기
          </Link>
        ) : (
          <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-white/40">
            준비 중
          </span>
        )}
      </div>
    </div>
  );
}

function KkebiCard({ summary }: { summary: string | null }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <img
            src="/kkebi/images/corner-m2.png"
            alt="깨비"
            className="h-9 w-9 shrink-0 select-none"
            draggable={false}
          />
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold text-white">깨비의 일일운세</p>
            <p className="mt-0.5 truncate text-[11.5px] text-white/40">
              {summary ?? "오늘의 운세를 다시 확인해봐"}
            </p>
          </div>
        </div>
        <Link
          href="/fortune/daily/result/?from=archive"
          onClick={() => trackEvent("archive_reopen_click", { character_id: "kkebi" })}
          className="shrink-0 rounded-full bg-white px-4 py-2 text-[12.5px] font-semibold text-neutral-900 transition-opacity hover:opacity-90"
        >
          다시 보기
        </Link>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-10 flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <img src="/kkebi/images/corner-m2.png" alt="깨비" className="h-32 w-32 select-none opacity-90" draggable={false} />
      <p className="text-[14px] font-medium text-white/80">아직 보관된 결과가 없어요</p>
      <p className="max-w-[15rem] whitespace-pre-line text-[12.5px] leading-relaxed text-white/45">
        {"“사주를 보고 나면 여기에 차곡차곡 쌓여.\n너의 결과 기다릴게.”"}
      </p>
    </div>
  );
}

function UnauthedState({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="mt-10 flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <img src="/kkebi/images/corner-m2.png" alt="깨비" className="h-24 w-24 select-none opacity-90" draggable={false} />
      <p className="text-[14px] font-medium text-white/80">로그인하면 결과를 보관할 수 있어요</p>
      <p className="max-w-[15rem] text-[12.5px] leading-relaxed text-white/45">
        깨비가 받은 결과지와 오늘의 운세를 한곳에 모아둘게.
      </p>
      <button
        type="button"
        onClick={onLogin}
        className="mt-2 cursor-pointer rounded-full bg-white px-6 py-2.5 text-[13px] font-semibold text-neutral-900 transition-opacity hover:opacity-90"
      >
        로그인하기
      </button>
    </div>
  );
}
