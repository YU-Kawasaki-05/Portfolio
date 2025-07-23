import { NavigationCard, HomePageData } from '../types/home-types';

export const navigationCards: NavigationCard[] = [
  {
    id: 'profile',
    title: 'Profile',
    description: 'プロフィールと経歴をご覧ください',
    href: '/profile',
    color: '#FF2D55',
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    description: '制作実績とプロジェクトをご紹介',
    href: '/portfolio',
    color: '#1479FF',
  },
  {
    id: 'blog',
    title: 'Blog',
    description: '技術記事と最新情報をお届け',
    href: '/blog',
    color: '#F5C400',
  },
  {
    id: 'services',
    title: 'Services',
    description: '提供サービスの詳細をご確認',
    href: '/services',
    color: '#FF2D55',
  },
  {
    id: 'sns',
    title: 'SNS',
    description: 'ソーシャルメディアでのつながり',
    href: '/sns',
    color: '#1479FF',
  },
];

export const homePageData: HomePageData = {
  hero: {
    title: 'Neo-Typographic Fusion',
    subtitle: 'Modern Web Development',
    description: '3Dタイポグラフィとモダンデザインを融合させた次世代のWeb体験',
    ctaText: 'Explore More',
    ctaHref: '/portfolio',
  },
  navigationCards,
  lastUpdated: new Date(),
};