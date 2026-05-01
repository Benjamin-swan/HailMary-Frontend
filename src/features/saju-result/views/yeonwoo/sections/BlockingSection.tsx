"use client";

import type { BlockingView } from "../../../domain/types";
import {
  ELEMENT_BLOCKING_COPIES,
  TEN_GOD_BLOCKING_COPIES,
  FALLBACK_COPIES,
} from "../../../domain/blockingDialogues-yeonwoo";

function pickIndex(id: string, poolLength: number): number {
  if (poolLength === 0) return 0;
  let hash = 0x811c9dc5;
  for (let i = 0; i < id.length; i++) {
    hash ^= id.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0;
  }
  return hash % poolLength;
}

const EMPTY_BLOCKING: BlockingView = {
  elementOverloadKey: null,
  tenGodPatternKey: null,
};

const RED_ACCENT = "#E05C6A";
const GREEN_ACCENT = "#33A183";

function BlockingCard({
  title,
  accentColor,
  children,
}: {
  title: string;
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        background: `${accentColor}10`,
        border: `1px solid ${accentColor}33`,
        borderLeft: `4px solid ${accentColor}`,
        boxShadow: `0 0 18px ${accentColor}18`,
      }}
    >
      <div className="px-4 pt-5 pb-6">
        <p
          className="text-[14px] font-bold tracking-[0.05em]"
          style={{ color: accentColor }}
        >
          {title}
        </p>
        <div className="h-px w-full mt-3 mb-4" style={{ background: `${accentColor}40` }} />
        {children}
      </div>
    </div>
  );
}

type Props = {
  blocking: BlockingView | null | undefined;
  sajuRequestId: string;
};

export function BlockingSection({ blocking, sajuRequestId }: Props) {
  const safe = blocking ?? EMPTY_BLOCKING;

  const elementPool = safe.elementOverloadKey
    ? (ELEMENT_BLOCKING_COPIES[safe.elementOverloadKey] ?? FALLBACK_COPIES)
    : FALLBACK_COPIES;
  const elementCopy =
    elementPool[pickIndex(sajuRequestId, elementPool.length)] ?? elementPool[0] ?? "";

  const tenGodPool = safe.tenGodPatternKey
    ? (TEN_GOD_BLOCKING_COPIES[safe.tenGodPatternKey] ?? FALLBACK_COPIES)
    : FALLBACK_COPIES;
  const tenGodCopy =
    tenGodPool[pickIndex(sajuRequestId + "_t", tenGodPool.length)] ?? tenGodPool[0] ?? "";

  const showFallback = !safe.elementOverloadKey && !safe.tenGodPatternKey;

  return (
    <div
      className="w-full px-5 pt-12"
      style={{ background: "#000", paddingBottom: "24px" }}
    >
      <div className="flex flex-col gap-4">
        <BlockingCard title="지금 연애를 막는 것" accentColor={RED_ACCENT}>
          <div className="flex flex-col gap-3">
            {showFallback ? (
              <p className="text-[13px] leading-relaxed" style={{ color: "#D0C5B6" }}>
                {elementCopy}
              </p>
            ) : (
              <>
                {safe.elementOverloadKey && (
                  <p className="text-[13px] leading-relaxed" style={{ color: "#D0C5B6" }}>
                    {elementCopy}
                  </p>
                )}
                {safe.tenGodPatternKey && (
                  <p className="text-[13px] leading-relaxed" style={{ color: "#D0C5B6" }}>
                    {tenGodCopy}
                  </p>
                )}
              </>
            )}
          </div>
        </BlockingCard>

        <BlockingCard title="근데 이거 역이용 가능해" accentColor={GREEN_ACCENT}>
          <p className="text-[13px] leading-relaxed" style={{ color: "#D0C5B6" }}>
            어떻게 쓰냐에 따라 네 매력으로 잡히지만
            <br />
            제일 강력한 무기가 돼.
          </p>
        </BlockingCard>
      </div>
    </div>
  );
}
