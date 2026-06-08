"use client";

import { useEffect, useState } from "react";
import { LoginPromptModal, useAuth } from "@/features/auth";

// 보관함 — Phase 3 뼈대. 결제 결과/깨비 저장 목록은 P7에서 /api/archive 연동.
// 톤: 홈과 동일한 다크 그라데이션 (하단 네비 바가 홈↔보관함 공통이므로 시각 연속성).
const PAGE_BG = "linear-gradient(180deg, #1a1530 0%, #0f0a22 100%)";

// 하단 네비 바(h-14) + 여유 — 마지막 콘텐츠가 바에 가리지 않게.
const BOTTOM_PAD = "calc(56px + env(safe-area-inset-bottom) + 16px)";

export function ArchiveView() {
  const { isAuthenticated, profile, refreshMe } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  // 토큰만 있고 프로필 미로드(새로고침 직후) 시 1회 보강.
  useEffect(() => {
    void refreshMe();
  }, [refreshMe]);

  return (
    <div
      className="flex min-h-[100dvh] flex-1 flex-col px-5 pt-12"
      style={{ background: PAGE_BG, fontFamily: "var(--font-pretendard)", paddingBottom: BOTTOM_PAD }}
    >
      <h1 className="text-[20px] font-bold text-white">보관함</h1>
      <p className="mt-1 text-[13px] text-white/50">
        받은 사주 결과지와 오늘의 운세를 모아둬요.
      </p>

      <div className="mt-10 flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <img
          src="/kkebi/images/corner-m2.png"
          alt="깨비"
          className="h-24 w-24 select-none opacity-90"
          draggable={false}
        />
        {isAuthenticated ? (
          <>
            <p className="text-[14px] font-medium text-white/80">
              아직 보관된 결과가 없어요
            </p>
            <p className="max-w-[15rem] text-[12.5px] leading-relaxed text-white/45">
              사주를 보고 나면 여기에 차곡차곡 쌓여요.
              {profile?.nickname ? ` ${profile.nickname}님의 결과를 기다릴게.` : ""}
            </p>
          </>
        ) : (
          <>
            <p className="text-[14px] font-medium text-white/80">
              로그인하면 결과를 보관할 수 있어요
            </p>
            <p className="max-w-[15rem] text-[12.5px] leading-relaxed text-white/45">
              깨비가 받은 결과지와 오늘의 운세를 한곳에 모아둘게.
            </p>
            <button
              type="button"
              onClick={() => setLoginOpen(true)}
              className="mt-2 cursor-pointer rounded-full bg-white px-6 py-2.5 text-[13px] font-semibold text-neutral-900 transition-opacity hover:opacity-90"
            >
              로그인하기
            </button>
          </>
        )}
      </div>

      <LoginPromptModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        returnTo="/archive/"
        source="archive_page"
      />
    </div>
  );
}
