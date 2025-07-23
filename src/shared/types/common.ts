// Common types used throughout the application

export interface BaseMetadata {
  title: string;
  description: string;
  date: string;
  slug: string;
}

export interface NavigationItem {
  href: string;
  label: string;
  icon?: React.ComponentType<any>;
  isExternal?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ComponentType<any>;
  label: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  reduced?: boolean;
}

export interface ResponsiveConfig {
  mobile: string;
  tablet: string;
  desktop: string;
}

export type ThemeColor = 'red' | 'blue' | 'yellow';
export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl';
export type ComponentVariant = 'default' | 'outline' | 'ghost' | 'secondary'; 