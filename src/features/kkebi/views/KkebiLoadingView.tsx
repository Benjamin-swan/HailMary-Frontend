"use client";

import { useKkebiLoading } from "../hooks/useKkebiLoading";
import KkebiLoadingContent from "./components/KkebiLoadingContent";

export function KkebiLoadingView() {
  useKkebiLoading();
  return <KkebiLoadingContent />;
}
