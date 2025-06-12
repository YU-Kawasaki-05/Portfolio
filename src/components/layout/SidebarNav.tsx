'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// アイコンコンポーネント（HeaderNavと同じアイコンを再利用）
const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14L9 11M12 14L15 11M12 14V21M20 16.7428C20 16.7428 17.5 18 12 18C6.5 18 4 16.7428 4 16.7428V5C4 3.89543 4.89543 3 6 3H18C19.1046 3 20 3.89543 20 5V16.7428Z" />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12C9 11.518 8.886 11.062 8.684 10.658M8.684 13.342L15.316 17.658M8.684 13.342C7.72556 14.1356 6.41775 14.2187 5.37258 13.5472C4.32741 12.8757 3.77778 11.5972 4.02986 10.3603C4.28194 9.12345 5.28214 8.21875 6.52887 8.02986C7.7756 7.84097 9.01235 8.50697 9.5 9.65685C9.5 9.65685 9.5 9.65685 9.5 9.65685" />
  </svg>
);

const FolderIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V9C21 7.89543 20.1046 7 19 7H13L11 5H5C3.89543 5 3 5.89543 3 7Z" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6C4.89543 5 4 5.89543 4 7V18C4 19.1046 4.89543 20 6 20H17C18.1046 20 20 19.1046 20 18V13M15.5858 3.58579C16.3668 2.80474 17.6332 2.80474 18.4142 3.58579C19.1953 4.36683 19.1953 5.63317 18.4142 6.41421L11 14L7 15L8 11L15.5858 3.58579Z" />
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6L18 18" />
  </svg>
);

interface SidebarNavProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

// ナビゲーション項目の定義
const navItems = [
  { href: '/', label: 'Home', icon: HomeIcon, emoji: '🏠' },
  { href: '/profile', label: 'Profile', icon: UserIcon, emoji: '👤' },
  { href: '/services', label: 'サービス', icon: BriefcaseIcon, emoji: '🔧' },
  { href: '/sns', label: 'SNS', icon: ShareIcon, emoji: '📱' },
  { href: '/portfolio', label: 'Portfolio', icon: FolderIcon, emoji: '💼' },
  { href: '/blog', label: 'Blog', icon: EditIcon, emoji: '📝' }
];

export default function SidebarNav({ isOpen, onToggle, onClose }: SidebarNavProps) {
  const pathname = usePathname();

  // ESCキーでドロワーを閉じる
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // ドロワーが開いている時にボディのスクロールを防ぐ
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // ハンバーガーメニューボタン（HeaderNavのボタンに置き換える）
  useEffect(() => {
    const handleTriggerClick = () => {
      onToggle();
    };

    const trigger = document.querySelector('[data-sidebar-trigger]');
    if (trigger) {
      trigger.addEventListener('click', handleTriggerClick);
      return () => trigger.removeEventListener('click', handleTriggerClick);
    }
  }, [onToggle]);

  return (
    <>
      {/* オーバーレイ */}
      <div 
        className={`
          fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden
          transition-opacity duration-200
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* サイドバードロワー */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-[280px] bg-bg border-r border-text/10 z-50 lg:hidden
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        aria-label="モバイルナビゲーション"
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-6 border-b border-text/10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center bg-blue/10 rounded-lg">
              <span className="text-blue font-heading font-bold text-sm">N</span>
            </div>
            <span className="font-heading font-bold text-base">Portfolio</span>
          </div>
          
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-text/10 transition-colors"
            aria-label="メニューを閉じる"
          >
            <XIcon />
          </button>
        </div>

        {/* ナビゲーション項目 */}
        <nav className="flex-1 p-6">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg
                      transition-all duration-200 ease-out
                      ${isActive 
                        ? 'bg-blue/10 text-blue border-l-2 border-blue' 
                        : 'text-text hover:bg-text/5 hover:text-text'
                      }
                    `}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="text-lg" role="img" aria-hidden="true">
                      {item.emoji}
                    </span>
                    <span className="font-body text-base">{item.label}</span>
                    
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-blue rounded-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* フッター */}
        <div className="p-6 border-t border-text/10">
          <p className="text-xs text-text/60 text-center font-body">
            © 2025 KawasakiK
          </p>
        </div>
      </aside>
    </>
  );
} 