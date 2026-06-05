"use client";

import { useEffect, useState } from "react";
import { api, ApiError } from "@/shared/utils/api";
import type {
  PaidReportStatus,
  PaidReportStatusResponse,
} from "../domain/paidReport";

interface UsePaidResultPollingResult {
  status: PaidReportStatus | null;
  error: string | null;
}

const POLL_INTERVAL_MS = 2000;

// order_id / share_code 공용 — status endpoint 경로만 다름.
function usePollingFromPath(statusPath: string | null): UsePaidResultPollingResult {
  const [status, setStatus] = useState<PaidReportStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!statusPath) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const poll = async () => {
      try {
        const res = await api.getStrict<PaidReportStatusResponse>(statusPath);
        if (cancelled) return;
        setStatus(res.status);
        if (res.status === "pending") {
          timer = setTimeout(poll, POLL_INTERVAL_MS);
        }
      } catch (err: unknown) {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 410) {
          setStatus("expired");
          return;
        }
        const msg = err instanceof Error ? err.message : "상태 조회 실패";
        setError(msg);
        timer = setTimeout(poll, POLL_INTERVAL_MS);
      }
    };

    poll();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [statusPath]);

  return { status, error };
}

export function usePaidResultPolling(orderId: string): UsePaidResultPollingResult {
  return usePollingFromPath(
    orderId ? `/api/saju/paid/${encodeURIComponent(orderId)}/status` : null,
  );
}

// 이메일 재접속 링크 (share_code) 진입점.
export function usePaidResultPollingByShareCode(
  shareCode: string,
): UsePaidResultPollingResult {
  return usePollingFromPath(
    shareCode ? `/api/saju/result/${encodeURIComponent(shareCode)}/status` : null,
  );
}
