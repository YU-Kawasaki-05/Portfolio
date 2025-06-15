import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/page-transition";
import MotionProvider, { MotionToggle } from "@/components/motion-provider";
import PerformanceOptimizer from "@/components/performance-optimizer";
import HeaderNav from "@/components/layout/header-nav";
import { Footer } from "@/components/layout/footer";

// Neo‑Typographic Fusion フォント設定
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  preload: true,
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  preload: false, // 日本語フォントは必要時にロード
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FF2D55' },
    { media: '(prefers-color-scheme: dark)', color: '#FF2D55' },
  ],
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  title: {
    default: "Neo-Typographic Fusion – Portfolio",
    template: "%s | Neo-Typographic Fusion",
  },
  description: "タイポグラフィと3Dグラフィックスを融合させた、モダンでインタラクティブなポートフォリオサイト。React、Next.js、Three.jsを使用したWebエクスペリエンス。",
  keywords: [
    "Portfolio", "Web Development", "React", "Next.js", "Three.js", 
    "TypeScript", "3D Graphics", "Typography", "Interactive Design",
    "Frontend Developer", "JavaScript", "WebGL", "UI/UX"
  ],
  authors: [{ name: "Neo-Typographic Developer", url: "https://neo-fusion.dev" }],
  creator: "Neo-Typographic Developer",
  publisher: "Neo-Typographic Fusion",
  category: "Portfolio",
  classification: "Web Development Portfolio",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    alternateLocale: ["en_US"],
    url: "https://neo-fusion.dev",
    siteName: "Neo-Typographic Fusion Portfolio",
    title: "Neo-Typographic Fusion – Portfolio",
    description: "タイポグラフィと3Dグラフィックスを融合させた、モダンでインタラクティブなポートフォリオサイト",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Neo-Typographic Fusion Portfolio Preview",
        type: "image/png",
      },
      {
        url: "/og-image-square.png",
        width: 1200,
        height: 1200,
        alt: "Neo-Typographic Fusion Portfolio Square",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@neo_fusion_dev",
    creator: "@neo_fusion_dev",
    title: "Neo-Typographic Fusion – Portfolio",
    description: "タイポグラフィと3Dグラフィックスを融合させた、モダンでインタラクティブなポートフォリオサイト",
    images: ["/twitter-image.png"],
  },
  verification: {
    google: "your-google-verification-code",
    // yahoo: "your-yahoo-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: "https://neo-fusion.dev",
    languages: {
      'ja-JP': "https://neo-fusion.dev/ja",
      'en-US': "https://neo-fusion.dev/en",
    },
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Neo-Fusion",
    startupImage: [
      {
        url: "/apple-splash-2048-2732.png",
        media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/apple-splash-1668-2388.png", 
        media: "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/apple-splash-1536-2048.png",
        media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/apple-splash-1125-2436.png",
        media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
    ],
  },
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false,
  },
  metadataBase: new URL("https://neo-fusion.dev"),
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "application-name": "Neo-Fusion",
    "msapplication-TileColor": "#0F0F0F",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const criticalImages = [
    "/og-image.png",
    "/icon-192x192.png",
  ];

  return (
    <html 
      lang="ja" 
      className={`${spaceGrotesk.variable} ${inter.variable} ${notoSansJP.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* DNS Prefetch & Preconnect */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Critical Resource Preloads */}
        <link rel="preload" href="/fonts/SpaceGrotesk-Bold.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Inter-Medium.woff" as="font" type="font/woff" crossOrigin="anonymous" />

        {/* App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="origin-when-cross-origin" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />

        {/* Performance Hints */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="font-sans bg-[#0F0F0F] text-[#F9F9F9] antialiased vsc-initialized" suppressHydrationWarning>
        <PerformanceOptimizer 
          criticalImages={criticalImages}
          enableMonitoring={process.env.NODE_ENV === 'production'}
        />
        
        <MotionProvider>
          {/* ヘッダーナビゲーション */}
          <HeaderNav />
          
          {/* メインコンテンツ */}
          <main className="min-h-screen pt-16">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          
          {/* フッター */}
          <Footer />
          
          {/* モーション切り替えボタン */}
          <MotionToggle />
        </MotionProvider>

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://neo-fusion.dev/#person",
              "name": "Neo-Typographic Developer",
              "url": "https://neo-fusion.dev",
              "image": "https://neo-fusion.dev/profile-image.jpg",
              "jobTitle": "Frontend Developer & 3D Web Specialist",
              "worksFor": {
                "@type": "Organization",
                "name": "Neo-Typographic Fusion",
                "url": "https://neo-fusion.dev"
              },
              "knowsAbout": [
                "React", "Next.js", "Three.js", "TypeScript", 
                "3D Graphics", "Web Development", "UI/UX Design"
              ],
              "sameAs": [
                "https://github.com/neo-fusion",
                "https://twitter.com/neo_fusion_dev",
                "https://linkedin.com/in/neo-fusion"
              ]
            })
          }}
        />
      </body>
    </html>
  );
} 