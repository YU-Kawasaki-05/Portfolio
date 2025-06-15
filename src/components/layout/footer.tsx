import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';

const socialLinks = [
  { href: 'https://github.com/neo-fusion', icon: Github, label: 'GitHub' },
  { href: 'https://twitter.com/neo_fusion_dev', icon: Twitter, label: 'Twitter' },
  { href: 'https://linkedin.com/in/neo-fusion', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:contact@neo-fusion.dev', icon: Mail, label: 'Email' },
];

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { href: '/', label: 'Home', description: 'ホーム' },
      { href: '/portfolio', label: 'Works', description: '事例と実績' },
      { href: '/blog', label: 'Blog', description: 'ブログ' },
      { href: '/profile', label: 'Profile', description: 'プロフィール' },
    ],
  },
  {
    title: 'Services',
    links: [
      { href: '/services', label: 'Services', description: 'サービス' },
      { href: '/sns', label: 'SNS', description: 'ソーシャル' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/blog', label: 'Tech Blog', description: '技術ブログ' },
      { href: '/services', label: 'Consulting', description: 'コンサルティング' },
    ],
  },
];

/**
 * Footer - サイトフッターコンポーネント
 * ソーシャルリンク、ナビゲーションリンク、コピーライト情報を表示
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F0F0F] border-t border-[#2A2A2A] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* ブランド情報 */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF2D55] to-[#1479FF] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <h3 className="text-xl font-bold font-heading text-[#F9F9F9]">
                KawasakiK
              </h3>
            </div>
            <p className="text-[#7A7A7A] mb-6 max-w-md leading-relaxed">
              タイポグラフィと3Dグラフィックスを融合させた、モダンでインタラクティブなポートフォリオサイト。
              React、Next.js、Three.jsを使用したWebエクスペリエンス。
            </p>
            
            {/* ソーシャルリンク */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="group flex items-center justify-center w-10 h-10 bg-[#1A1A1A] hover:bg-[#FF2D55] rounded-lg transition-all duration-300"
                    aria-label={social.label}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <Icon size={18} className="text-[#7A7A7A] group-hover:text-white transition-colors" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* フッターリンク */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-[#F9F9F9] font-semibold mb-4 font-heading">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-start space-x-2 text-[#7A7A7A] hover:text-[#FF2D55] transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{link.label}</div>
                        {link.description && (
                          <div className="text-xs text-[#5A5A5A] mt-1">
                            {link.description}
                          </div>
                        )}
                      </div>
                      {link.href.startsWith('http') && (
                        <ExternalLink size={12} className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 区切り線とコピーライト */}
        <div className="border-t border-[#2A2A2A] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[#7A7A7A] text-sm">
              © {currentYear} KawasakiK. All rights reserved.
            </p>
            
            {/* 追加情報 */}
            <div className="flex items-center space-x-6 text-sm text-[#7A7A7A]">
              <Link href="/privacy" className="hover:text-[#FF2D55] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[#FF2D55] transition-colors">
                Terms of Service
              </Link>
              <span className="text-[#5A5A5A]">
                Made with ❤️ and ☕ in Tokyo
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 