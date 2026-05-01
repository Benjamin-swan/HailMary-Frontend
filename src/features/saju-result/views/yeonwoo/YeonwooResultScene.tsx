"use client";

import { useYeonwooSajuData } from "../../hooks/useYeonwooSajuData";
import { HeroSection } from "./sections/HeroSection";
import { SceneOpeningSection } from "./sections/SceneOpeningSection";
import { DialogueBubbleSection } from "./sections/DialogueBubbleSection";
import { HandsOnBookSection } from "./sections/HandsOnBookSection";
import { BlackSpacer } from "./sections/BlackSpacer";
import { SajuChartSection } from "./sections/SajuChartSection";
import { YeonwooPortraitSection } from "./sections/YeonwooPortraitSection";
import { WuxingChartSection } from "./sections/WuxingChartSection";
import { KijilSection } from "./sections/KijilSection";
import { CharmCardsSection } from "./sections/CharmCardsSection";
import { ClosingPromptSection } from "./sections/ClosingPromptSection";
import { ClosingPortraitSection } from "./sections/ClosingPortraitSection";
import { BlockingSection } from "./sections/BlockingSection";
import { AvoidPartnerSection } from "./sections/AvoidPartnerSection";
import { BubblesDaBoYeoSection } from "./sections/BubblesDaBoYeoSection";
import { YeonwooBookSection } from "./sections/YeonwooBookSection";
import { ClosingDialogueSection } from "./sections/ClosingDialogueSection";
import { RomanceChaptersSection } from "./sections/RomanceChaptersSection";
import { FinalCtaSection } from "./sections/FinalCtaSection";
import { FullResultIndexSection } from "./sections/FullResultIndexSection";
import { DestinedPartnerSection } from "./sections/DestinedPartnerSection";
import { RomanceTimingSection } from "./sections/RomanceTimingSection";
import { RealReviewsSection } from "./sections/RealReviewsSection";
import { StickyCheckoutCta } from "./sections/StickyCheckoutCta";

const SURFACE = "#141311";

export default function YeonwooResultScene() {
  const data = useYeonwooSajuData();

  return (
    <>
      <div
        className="flex-1 w-full overflow-y-auto"
        style={{ background: SURFACE, paddingBottom: "120px" }}
      >
        <HeroSection />
        <SceneOpeningSection />
        <DialogueBubbleSection />
        <HandsOnBookSection />
        <BlackSpacer />
        <SajuChartSection pillars={data.pillars} />
        <BlackSpacer height={100} color="#050404" />
        <YeonwooPortraitSection pillars={data.pillars} />
        <WuxingChartSection
          wuxing={data.wuxing}
          dayMaster={data.dayMaster}
          pillars={data.pillars}
        />
        <KijilSection />
        <CharmCardsSection charm={data.charm} sajuRequestId={data.sajuRequestId} />
        <ClosingPromptSection />
        <BlackSpacer color="#080806" />
        <ClosingPortraitSection />
        <BlockingSection blocking={data.blocking} sajuRequestId={data.sajuRequestId} />
        <AvoidPartnerSection spouseAvoid={data.spouseAvoid} />
        <BubblesDaBoYeoSection pillars={data.pillars} />
        <YeonwooBookSection />
        <ClosingDialogueSection />
        <RomanceChaptersSection pillars={data.pillars} />
        <FinalCtaSection />
        <FullResultIndexSection />
        <DestinedPartnerSection spouseMatch={data.spouseMatch} />
        <RomanceTimingSection flow={data.monthlyRomanceFlow} />
        <RealReviewsSection />
      </div>
      <StickyCheckoutCta />
    </>
  );
}
