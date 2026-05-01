"use client";

import { useEffect, useState } from "react";
import type { SajuResultData } from "../domain/types";
import { MOCK_SAJU_DOYOON } from "../domain/mockSajuDoyoon";

const FALLBACK_REQUEST_ID = "mock_doyoon";

export function useDoyoonSajuData(): SajuResultData {
  const [data, setData] = useState<SajuResultData>(MOCK_SAJU_DOYOON);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("doyoonSajuData");
      const requestId =
        localStorage.getItem("doyoonSajuRequestId") ?? FALLBACK_REQUEST_ID;
      if (!raw) {
        setData((prev) => ({ ...prev, sajuRequestId: requestId }));
        return;
      }
      const parsed = JSON.parse(raw) as Partial<Omit<SajuResultData, "sajuRequestId">>;
      // mock을 base로 두고 실제 데이터로 덮어씀 — 백엔드 미제공 필드(pillars 등)는 mock 유지
      setData({ ...MOCK_SAJU_DOYOON, ...parsed, sajuRequestId: requestId });
    } catch {
      // localStorage / JSON 실패 시 mock 유지
    }
  }, []);

  return data;
}
