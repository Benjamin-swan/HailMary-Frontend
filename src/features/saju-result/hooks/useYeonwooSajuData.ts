"use client";

import { useEffect, useState } from "react";
import type { SajuResultData } from "../domain/types";
import { MOCK_SAJU } from "../domain/mockSaju-yeonwoo";

const FALLBACK_ID = "mock_yeonwoo";

export function useYeonwooSajuData(): SajuResultData {
  const [data, setData] = useState<SajuResultData>({
    ...MOCK_SAJU,
    sajuRequestId: FALLBACK_ID,
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("yeonwooSajuData");
      const requestId = localStorage.getItem("yeonwooSajuRequestId") ?? FALLBACK_ID;
      if (!raw) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setData((prev) => ({ ...prev, sajuRequestId: requestId }));
        return;
      }
      const parsed = JSON.parse(raw) as Partial<Omit<SajuResultData, "sajuRequestId">>;
      // mock을 base로 두고 실제 데이터로 덮어씀 — 백엔드 미제공 필드(pillars 등)는 mock 유지
      setData({ ...MOCK_SAJU, ...parsed, sajuRequestId: requestId });
    } catch {}
  }, []);

  return data;
}

export function useYeonwooBirthLabel(): string | null {
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLabel(parseBirthLabel());
  }, []);
  return label;
}

function parseBirthLabel(): string | null {
  try {
    const raw = localStorage.getItem("yeonwooSaju");
    if (!raw) return null;
    const { birth } = JSON.parse(raw) as { birth?: string };
    if (!birth) return null;
    const [y, m, d] = birth.split(".");
    if (!y || !m || !d) return null;
    return `${y}년 ${Number(m)}월 ${Number(d)}일`;
  } catch {
    return null;
  }
}
