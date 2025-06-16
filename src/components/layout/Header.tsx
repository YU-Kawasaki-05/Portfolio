'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MondrianLogo } from './MondrianLogo';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/profile', label: 'Profile' },
  { href: '/services', label: 'サービス' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/sns', label: 'SNS' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link href={href} passHref>
      <span className={`
        relative font-heading text-lg transition-colors duration-300
        ${pathname === href ? 'text-red' : 'text-text hover:text-red/80'}
      `}>
        {label}
        {pathname === href && (
          <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-red" />
        )}
      </span>
    </Link>
  );

  return (
    <header className="fixed top-0 left-0 w-full bg-bg/80 backdrop-blur-sm z-50 border-b border-text/10">
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        <Link href="/" passHref>
          <span className="flex items-center gap-3 cursor-pointer">
            <MondrianLogo />
            <span className="font-heading font-bold text-xl text-text">
              KawasakiK
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="メニューを開閉する"
        >
          <div className="w-6 h-6 flex flex-col justify-around">
            <span className={`block w-full h-0.5 bg-text transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`}></span>
            <span className={`block w-full h-0.5 bg-text transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-full h-0.5 bg-text transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`
        md:hidden fixed top-0 left-0 w-full h-full bg-bg/95 backdrop-blur-lg
        transform transition-transform duration-500 ease-in-out
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <nav className="h-full flex flex-col items-center justify-center gap-10">
          {navItems.map((item) => (
            <Link href={item.href} passHref key={item.href}>
              <span 
                className={`text-3xl font-heading transition-colors duration-300 ${pathname === item.href ? 'text-red' : 'text-text'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
} 