"use client";

import type { MouseEvent } from "react";
import { NavIconButton } from "@/shared/components/NavIconButton";

interface MuteButtonProps {
  muted: boolean;
  onToggle: (e: MouseEvent) => void;
  tooltipPlacement?: "left" | "right" | "top" | "bottom";
}

export function MuteButton({ muted, onToggle, tooltipPlacement = "top" }: MuteButtonProps) {
  return (
    <NavIconButton
      label={muted ? "소리 켜기" : "소리 끄기"}
      onClick={onToggle}
      tooltipPlacement={tooltipPlacement}
    >
      {muted ? <VolumeOffIcon /> : <VolumeOnIcon />}
    </NavIconButton>
  );
}

function VolumeOnIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function VolumeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="22" y1="9" x2="16" y2="15" />
      <line x1="16" y1="9" x2="22" y2="15" />
    </svg>
  );
}
