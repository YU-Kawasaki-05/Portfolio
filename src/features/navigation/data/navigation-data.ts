// Navigation menu data and configuration
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
}

export interface NavigationSection {
  id: string;
  title: string;
  items: NavigationItem[];
}

export const mainNavigation: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
  },
  {
    id: 'profile',
    label: 'Profile',
    href: '/profile',
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    href: '/portfolio',
  },
  {
    id: 'blog',
    label: 'Blog',
    href: '/blog',
  },
  {
    id: 'services',
    label: 'Services',
    href: '/services',
  },
  {
    id: 'sns',
    label: 'SNS',
    href: '/sns',
  },
];

export const footerNavigation: NavigationSection[] = [
  {
    id: 'main',
    title: 'Main',
    items: mainNavigation,
  },
  {
    id: 'external',
    title: 'External',
    items: [
      {
        id: 'github',
        label: 'GitHub',
        href: 'https://github.com',
        external: true,
      },
      {
        id: 'twitter',
        label: 'Twitter',
        href: 'https://twitter.com',
        external: true,
      },
    ],
  },
];