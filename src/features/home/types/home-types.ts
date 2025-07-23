export interface NavigationCard {
  id: string;
  title: string;
  description: string;
  href: string;
  icon?: string;
  color?: string;
  isExternal?: boolean;
}

export interface HomePageData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaHref: string;
  };
  navigationCards: NavigationCard[];
  lastUpdated: Date;
}