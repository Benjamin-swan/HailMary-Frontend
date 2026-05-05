"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export type LegalDoc = "terms" | "privacy";

const TITLE: Record<LegalDoc, string> = {
  terms: "이용약관",
  privacy: "개인정보처리방침",
};

const SOURCE_PATH: Record<LegalDoc, string> = {
  terms: "/legal/terms.md",
  privacy: "/legal/privacy.md",
};

interface Props {
  doc: LegalDoc | null;
  onClose: () => void;
}

export function LegalModal({ doc, onClose }: Props) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!doc) return;
    setLoading(true);
    let cancelled = false;
    fetch(SOURCE_PATH[doc])
      .then((r) => r.text())
      .then((t) => {
        if (!cancelled) {
          setContent(t);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setContent("문서를 불러오지 못했습니다.");
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [doc]);

  useEffect(() => {
    if (!doc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [doc, onClose]);

  if (!doc) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={TITLE[doc]}
        className="relative flex h-full max-h-[85vh] w-full max-w-md flex-col rounded-xl bg-neutral-900 text-neutral-100 shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-neutral-700 px-5 py-4">
          <h2 className="text-base font-semibold">{TITLE[doc]}</h2>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="rounded p-1 text-neutral-400 hover:bg-neutral-800 hover:text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        <div className="select-text overflow-y-auto px-5 py-4 text-[12.5px] leading-relaxed text-neutral-200 [&_a]:text-blue-300 [&_a]:underline [&_h1]:mt-1 [&_h1]:mb-3 [&_h1]:text-lg [&_h1]:font-bold [&_h2]:mt-5 [&_h2]:mb-2 [&_h2]:text-base [&_h2]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-sm [&_h3]:font-semibold [&_hr]:my-4 [&_hr]:border-neutral-700 [&_li]:my-1 [&_ol]:my-2 [&_ol]:ml-5 [&_ol]:list-decimal [&_p]:my-2 [&_strong]:text-white [&_table]:my-3 [&_table]:w-full [&_table]:border-collapse [&_table]:text-[11.5px] [&_td]:border [&_td]:border-neutral-700 [&_td]:px-2 [&_td]:py-1.5 [&_th]:border [&_th]:border-neutral-700 [&_th]:bg-neutral-800 [&_th]:px-2 [&_th]:py-1.5 [&_th]:text-left [&_ul]:my-2 [&_ul]:ml-5 [&_ul]:list-disc">
          {loading ? (
            <p className="text-neutral-400">불러오는 중…</p>
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}
