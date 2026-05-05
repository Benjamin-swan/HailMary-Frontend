// 메인 페이지 콘텐츠 카드 메타데이터.
// 도메인 레이어: 순수 데이터, React/Next 의존 없음.

export type ContentVariant = "dohwaseon" | "kkebi" | "coming-soon";

export interface ContentCard {
  id: string;
  variant: ContentVariant;
  title: string;
  tag: string;
  microCopy?: string;
  poster?: string;
  route?: string;
}

export const SECONDARY_CARDS: ContentCard[] = [
  {
    id: "kkebi-daily",
    variant: "kkebi",
    title: "깨비의 일일운세",
    tag: "매일",
    microCopy: "매일 운세 보기",
    poster: "/kkebi-card-poster.png",
    route: "/fortune/daily",
  },
  {
    id: "coming-soon-1",
    variant: "coming-soon",
    title: "곧 만나요",
    tag: "준비 중",
  },
];

export const HERO_CARD: ContentCard = {
  id: "dohwaseon-hero",
  variant: "dohwaseon",
  title: "도화선",
  tag: "대표 콘텐츠",
  poster: "/dohwaseon-hero-poster.png",
  route: "/landing",
};

export const QUOTE_TEXT =
  "운명은 정해져 있지만, 마음은 매일 새롭게 쓰여진다.";
