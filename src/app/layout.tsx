import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import AnimationProvider from "@/providers/AnimationProvider";
import "./globals.css";

// モバイルパフォーマンス最優先: Webフォント完全削除、システムフォントのみ使用

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Neo‑Typographic Fusion | Portfolio",
  description: "漆黒×幾何学×原色ワンポイント - モダンタイポグラフィとミニマリズムが融合したポートフォリオサイト",
  keywords: "portfolio, typography, design, web development, neo-typographic fusion",
  authors: [{ name: "KawasakiK" }],
  robots: "index, follow",
  openGraph: {
    title: "Neo‑Typographic Fusion | Portfolio",
    description: "漆黒×幾何学×原色ワンポイント - モダンタイポグラフィとミニマリズムが融合したポートフォリオサイト",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

// viewport exportでメタデータ警告を修正
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F0F0F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="ja" 
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preconnect for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Critical CSS and viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0F0F0F" />
        
        {/* Apple specific */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body 
        className="font-body bg-dark text-text antialiased"
        suppressHydrationWarning
      >
        <AnimationProvider>
          {children}
        </AnimationProvider>
      </body>
    </html>
  );
}
