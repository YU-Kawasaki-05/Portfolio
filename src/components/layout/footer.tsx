import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
  { href: 'https://github.com', icon: Github, label: 'GitHub' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:contact@example.com', icon: Mail, label: 'Email' },
];

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { href: '/', label: 'Home' },
      { href: '/profile', label: 'Profile' },
      { href: '/portfolio', label: 'Portfolio' },
      { href: '/blog', label: 'Blog' },
    ],
  },
  {
    title: 'Services',
    links: [
      { href: '/services', label: 'Services' },
      { href: '/sns', label: 'SNS' },
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ブランド情報 */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold font-heading text-[#F9F9F9] mb-4">
              Neo‑Typographic Fusion
            </h3>
            <p className="text-[#7A7A7A] mb-6 max-w-md">
              タイポグラフィと3Dグラフィックスを融合させた、モダンでインタラクティブなポートフォリオサイト
            </p>
            
            {/* ソーシャルリンク */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="text-[#7A7A7A] hover:text-[#1479FF] transition-colors"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* フッターリンク */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-[#F9F9F9] font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#7A7A7A] hover:text-[#1479FF] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* コピーライト */}
        <div className="border-t border-[#2A2A2A] mt-8 pt-8 text-center">
          <p className="text-[#7A7A7A]">
            © {currentYear} Neo‑Typographic Fusion. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 