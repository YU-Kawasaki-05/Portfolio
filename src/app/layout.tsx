import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

// Neo-Typographic Fusionフォント設定 - Performance最適化（軽量化）
const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["700"], // 見出し用のみ
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400"], // 本文用のみ
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
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
    <html lang="ja" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-bg text-text font-body antialiased">
        {children}
      </body>
    </html>
  );
}
