"use client";

import { useEffect, useState } from "react";
import {
  DoyoonPaidScene,
  PaidResultLoading,
  YeonwooPaidScene,
  usePaidReportByShareCode,
  usePaidResultPollingByShareCode,
} from "@/features/saju-result";

// 이메일 재접속 링크: /saju/result/{share_code}
// CloudFront fallback에서 useParams가 "_placeholder"를 반환할 수 있어 URL 직접 파싱.
function extractShareCodeFromUrl(): string {
  if (typeof window === "undefined") return "";
  const m = window.location.pathname.match(/\/saju\/result\/([^/]+)/);
  const code = m?.[1] ?? "";
  return code === "_placeholder" || code === "test-share-code" ? "" : code;
}

function ExpiredView() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-neutral-950 px-6 text-center text-neutral-100">
      <h1 className="text-xl font-semibold">결과지 조회 기한이 만료되었어요</h1>
      <p className="text-[13px] text-neutral-400">
        결제일로부터 30일이 지난 링크에요. 다시 보고 싶다면 새로 결제해 주세요.
      </p>
    </main>
  );
}

// pending은 엣지(이메일은 ready 후 발송) — status 폴링 후 ready 되면 새로고침.
function PendingView({ shareCode }: { shareCode: string }) {
  const { status } = usePaidResultPollingByShareCode(shareCode);
  useEffect(() => {
    if (status === "ready") window.location.reload();
  }, [status]);
  if (status === "expired") return <ExpiredView />;
  return <PaidResultLoading />;
}

function ShareResultInner({ shareCode }: { shareCode: string }) {
  const state = usePaidReportByShareCode(shareCode);

  if (state.kind === "loading") {
    return <PaidResultLoading message="결과지를 불러오는 중..." />;
  }
  if (state.kind === "expired") return <ExpiredView />;
  if (state.kind === "error") {
    return (
      <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-neutral-950 px-6 text-center text-neutral-100">
        <h1 className="text-xl font-semibold">결과지를 불러오지 못했어요</h1>
        <p className="text-[13px] text-neutral-400">{state.message}</p>
      </main>
    );
  }
  if (state.report.status === "expired") return <ExpiredView />;
  if (state.report.status === "pending") {
    return <PendingView shareCode={shareCode} />;
  }

  return state.report.character === "doyoon" ? (
    <DoyoonPaidScene report={state.report} />
  ) : (
    <YeonwooPaidScene report={state.report} />
  );
}

export default function ShareResultClient() {
  const [shareCode, setShareCode] = useState<string>("");
  useEffect(() => {
    setShareCode(extractShareCodeFromUrl());
  }, []);
  return <ShareResultInner shareCode={shareCode} />;
}
