'use client';

import Link from 'next/link';

interface FooterProps {
  showFullLinks?: boolean;
  className?: string;
}

// ナビゲーションリンクの定義
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/profile', label: 'Profile' },
  { href: '/services', label: 'サービス' },
  { href: '/sns', label: 'SNS' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' }
];

export default function Footer({ showFullLinks = true, className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className={`
        bg-bg border-t border-text/10 
        ${className}
      `}
    >
      <div className="max-w-6xl mx-auto px-8 py-6 lg:py-8">
        {/* デスクトップレイアウト（水平並び） */}
        <div className="hidden lg:flex items-center justify-between">
          {/* ナビゲーションリンク */}
          {showFullLinks && (
            <nav className="flex items-center space-x-6">
              {navLinks.map((link, index) => (
                <span key={link.href} className="flex items-center">
                  <Link
                    href={link.href}
                    className="text-text/60 hover:text-text text-sm font-body transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                  {index < navLinks.length - 1 && (
                    <span className="text-text/40 ml-6">|</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {/* コピーライト */}
          <div className="text-text/60 text-sm font-body">
            © {currentYear} KawasakiK
          </div>
        </div>

        {/* モバイル・タブレットレイアウト（縦スタック） */}
        <div className="lg:hidden space-y-4">
          {/* ナビゲーションリンク（縦並び） */}
          {showFullLinks && (
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {navLinks.map((link, index) => (
                <span key={link.href} className="flex items-center">
                  <Link
                    href={link.href}
                    className="text-text/60 hover:text-text text-sm font-body transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                  {index < navLinks.length - 1 && (
                    <span className="text-text/40 ml-6">|</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {/* コピーライト */}
          <div className="text-text/60 text-sm font-body text-center">
            © {currentYear} KawasakiK
          </div>
        </div>

        {/* シンプルモード（showFullLinks = false の場合） */}
        {!showFullLinks && (
          <div className="text-text/60 text-sm font-body text-center lg:text-left">
            © {currentYear} KawasakiK
          </div>
        )}
      </div>
    </footer>
  );
} 