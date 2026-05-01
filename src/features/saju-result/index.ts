// saju-result feature 외부 export.

export type * from "./domain/types";

export { default as SajuChartSection } from "./views/shared/SajuChartSection";
export { default as WuxingChartSection } from "./views/shared/WuxingChartSection";
export { default as CharmCards } from "./views/shared/CharmCards";
export { default as BlockingSection } from "./views/shared/BlockingSection";
export type { BlockingDialogues } from "./views/shared/BlockingSection";
export { default as AvoidPartnerSection } from "./views/shared/AvoidPartnerSection";
export { default as DestinedPartnerSection } from "./views/shared/DestinedPartnerSection";
export {
  DESTINED_PARTNER_DIALOGUES,
  slotIdToDestinedKey,
  type DestinedSlotKey,
  type DestinedPartnerCopy,
} from "./views/shared/DestinedPartnerSection";
export { default as RomanceTimingSection } from "./views/shared/RomanceTimingSection";
export { default as RealReviewsSection } from "./views/shared/RealReviewsSection";
export type { ReviewItem } from "./views/shared/RealReviewsSection";
export { default as FullResultIndexSection } from "./views/shared/FullResultIndexSection";
export { default as StickyCheckoutCta } from "./views/shared/StickyCheckoutCta";

export { default as DoyoonResultScene } from "./views/doyoon/DoyoonResultScene";
export { default as YeonwooResultScene } from "./views/yeonwoo/YeonwooResultScene";
