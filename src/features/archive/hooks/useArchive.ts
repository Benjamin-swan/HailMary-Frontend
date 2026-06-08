"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth";
import { api } from "@/shared/utils/api";
import type { ArchiveData } from "../domain/types";

type Status = "idle" | "loading" | "error" | "done";

export function useArchive() {
  const { isAuthenticated } = useAuth();
  const [data, setData] = useState<ArchiveData | null>(null);
  // 로그인 상태로 진입하면 바로 loading — 초기값으로 잡아 effect 내 동기 setState 회피.
  const [status, setStatus] = useState<Status>(isAuthenticated ? "loading" : "idle");

  useEffect(() => {
    if (!isAuthenticated) return;
    let cancelled = false;
    void (async () => {
      try {
        const res = await api.get<ArchiveData>("/api/archive", { auth: "account" });
        if (!cancelled) {
          setData(res);
          setStatus("done");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  return { data, status };
}
