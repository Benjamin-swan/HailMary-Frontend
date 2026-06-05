"use client";

import { useEffect, useState } from "react";
import { api, ApiError } from "@/shared/utils/api";
import type { PaidReport } from "../domain/paidReport";

export type PaidReportFetchState =
  | { kind: "loading" }
  | { kind: "ready"; report: PaidReport }
  | { kind: "expired" }
  | { kind: "error"; message: string };

// order_id / share_code 공용 — endpoint 경로만 다르고 로직 동일.
function usePaidReportFromPath(path: string | null): PaidReportFetchState {
  const [state, setState] = useState<PaidReportFetchState>({ kind: "loading" });

  useEffect(() => {
    if (!path) return;
    let cancelled = false;

    api
      .getStrict<PaidReport>(path)
      .then((report) => {
        if (cancelled) return;
        setState({ kind: "ready", report });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 410) {
          setState({ kind: "expired" });
          return;
        }
        const message = err instanceof Error ? err.message : "결과 조회 실패";
        setState({ kind: "error", message });
      });

    return () => {
      cancelled = true;
    };
  }, [path]);

  return state;
}

export function usePaidReport(orderId: string): PaidReportFetchState {
  return usePaidReportFromPath(
    orderId ? `/api/saju/paid/${encodeURIComponent(orderId)}` : null,
  );
}

// 이메일 재접속 링크 (share_code) 진입점.
export function usePaidReportByShareCode(shareCode: string): PaidReportFetchState {
  return usePaidReportFromPath(
    shareCode ? `/api/saju/result/${encodeURIComponent(shareCode)}` : null,
  );
}
