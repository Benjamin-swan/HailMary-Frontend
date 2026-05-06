"use client";

import type { MouseEvent } from "react";
import { DialogueBox } from "@/components/DialogueBox";
import { MuteButton } from "@/components/MuteButton";
import { NavIconButton } from "@/shared/components/NavIconButton";
import type { CutStep } from "@/features/intro/domain/introSteps";

interface DialogueCutProps {
  step: Extract<CutStep, { type: "dialogue" | "sfx-dialogue" | "dramatic-dialogue" }>;
  displayedText: string;
  isComplete: boolean;
  muted: boolean;
  showSoundHint: boolean;
  fading: boolean;
  crossFading: boolean;
  flashWhite: boolean;
  onToggleMute: (e: MouseEvent) => void;
  onGoHome: (e: MouseEvent) => void;
  onSkip: (e: MouseEvent) => void;
}

export function DialogueCut({
  step,
  displayedText,
  isComplete,
  muted,
  onToggleMute,
  onGoHome,
  onSkip,
}: DialogueCutProps) {
  const speaker = (step as { speaker?: string }).speaker ?? "나";

  return (
    <div className="relative z-10 mb-20 mt-auto px-4">
      <div className="-mb-5 flex justify-end gap-2">
        <NavIconButton label="메인으로" onClick={onGoHome} tooltipPlacement="top">
          <HomeIcon />
        </NavIconButton>
        <NavIconButton label="건너뛰기" onClick={onSkip} tooltipPlacement="top">
          <SkipIcon />
        </NavIconButton>
        <MuteButton muted={muted} onToggle={onToggleMute} tooltipPlacement="top" />
      </div>
      <DialogueBox speaker={speaker} text={displayedText} isComplete={isComplete} />
    </div>
  );
}

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 9.5L12 2l9 7.5V20a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2V9.5z" />
    </svg>
  );
}

function SkipIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="3 4 11 12 3 20 3 4" />
      <polygon points="11 4 19 12 11 20 11 4" />
      <line x1="20" y1="5" x2="20" y2="19" />
    </svg>
  );
}
