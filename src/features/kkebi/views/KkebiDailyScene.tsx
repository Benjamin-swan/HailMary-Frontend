"use client";

import { KKEBI_STATIC } from "../domain/kkebiState";
import { useKkebi } from "../hooks/useKkebi";
import { KkebiTopNav } from "./components/KkebiTopNav";
import { VideoBackground } from "./components/VideoBackground";
import { KkebiTitle } from "./components/KkebiTitle";
import { OpeningSoonCta } from "./components/OpeningSoonCta";

export function KkebiDailyScene() {
  const { handleBack } = useKkebi();
  return (
    <div
      className="flex min-h-[100dvh] flex-1 flex-col"
      style={{ background: "#000" }}
    >
      <section className="relative h-[100dvh] w-full overflow-hidden">
        <VideoBackground src={KKEBI_STATIC.videoSrc} />
        <KkebiTopNav onBack={handleBack} />
        <KkebiTitle src={KKEBI_STATIC.titleImage} />
        <OpeningSoonCta
          divider={KKEBI_STATIC.divider}
          label={KKEBI_STATIC.ctaLabel}
          microCopy={KKEBI_STATIC.microCopy}
        />
      </section>
    </div>
  );
}
