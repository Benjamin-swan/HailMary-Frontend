"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LoginPromptModal } from "@/features/auth";
import { authStore } from "@/lib/authStore";
import { trackEvent } from "@/shared/utils/analytics";

// 하단 네비 바 — 홈/보관함 화면에서만 노출(반투명·하단 고정).
// '오늘의 운세' 클릭 시 깨비 일일운세로 이동 → 그 화면은 노출 경로가 아니라 바가 사라진다.
// 비로그인 상태로 보관함 진입 시 로그인 유도 팝업.

const HOME_PATH = "/";
const ARCHIVE_PATH = "/archive/";
const DAILY_PATH = "/fortune/daily/";

// 바를 노출할 경로 (trailingSlash 정규화 후 비교)
function shouldShow(pathname: string): boolean {
  const p = pathname.endsWith("/") ? pathname : pathname + "/";
  return p === HOME_PATH || p === ARCHIVE_PATH;
}

const ACTIVE = "#e8536e"; // --color-dohwaseon-primary
const IDLE = "#9b94ad";

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [loginOpen, setLoginOpen] = useState(false);

  if (!shouldShow(pathname)) return null;

  const norm = pathname.endsWith("/") ? pathname : pathname + "/";
  const onHome = norm === HOME_PATH;
  const onArchive = norm === ARCHIVE_PATH;

  const goArchive = () => {
    // 인증 판정은 localStorage 토큰을 직접 읽는다 — 풀 페이지 로드 직후 하이드레이션 첫 페인트에
    // useSyncExternalStore가 잠깐 false(getServerSnapshot=null)로 그리는 레이스를 피함 (HM-FE-135).
    const authed = Boolean(authStore.get());
    trackEvent("bottomnav_archive_click", { authed });
    if (authed) {
      router.push(ARCHIVE_PATH);
    } else {
      setLoginOpen(true);
    }
  };

  return (
    <>
      <nav
        className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 rounded-t-[40px] border-t border-white/15 bg-black/58 shadow-[0_-8px_32px_rgba(0,0,0,0.3)]"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex h-[67px] items-stretch justify-around">
          <NavButton
            label="홈"
            active={onHome}
            onClick={() => router.push(HOME_PATH)}
            icon={<HomeIcon />}
          />
          <NavButton
            label="오늘의 운세"
            active={false}
            onClick={() => {
              trackEvent("bottomnav_daily_click", {});
              router.push(DAILY_PATH);
            }}
            icon={<SparkleIcon />}
          />
          <NavButton
            label="보관함"
            active={onArchive}
            onClick={goArchive}
            icon={<ArchiveIcon />}
          />
        </div>
      </nav>

      <LoginPromptModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        returnTo={ARCHIVE_PATH}
        source="bottomnav_archive"
      />
    </>
  );
}

function NavButton({
  label,
  active,
  onClick,
  icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  const color = active ? ACTIVE : IDLE;
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 transition-opacity active:opacity-70"
      style={{ color }}
      aria-label={label}
    >
      {icon}
      <span className="text-[11px] font-medium" style={{ color }}>
        {label}
      </span>
    </button>
  );
}

// ── 아이콘 (stroke 기반, currentColor 상속) ──
function HomeIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l1.8 4.9L18.7 9.7l-4.9 1.8L12 16.4l-1.8-4.9L5.3 9.7l4.9-1.8L12 3Z" />
      <path d="M19 14l.7 1.9 1.9.7-1.9.7L19 19.2l-.7-1.9-1.9-.7 1.9-.7L19 14Z" />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="4" rx="1" />
      <path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8" />
      <path d="M10 12h4" />
    </svg>
  );
}
