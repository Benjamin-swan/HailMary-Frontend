"use client";

import { useEffect } from "react";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "확인",
  cancelLabel = "취소",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-6"
      onClick={(e) => {
        e.stopPropagation();
        onCancel();
      }}
    >
      <div
        className="w-full max-w-xs rounded-2xl bg-white px-5 pb-5 pt-7 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-2 py-3 text-center">
          {title && (
            <h2 className="text-[15px] font-semibold text-neutral-900">{title}</h2>
          )}
          <p className="whitespace-pre-line text-[13px] leading-relaxed text-neutral-700">{message}</p>
        </div>
        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onConfirm();
            }}
            className="flex-1 cursor-pointer rounded-xl bg-neutral-900 px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-neutral-800"
          >
            {confirmLabel}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCancel();
            }}
            className="flex-1 cursor-pointer rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-[13px] font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
