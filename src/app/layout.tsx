import type { Metadata } from "next";
import "./globals.css";

// モバイルパフォーマンス最優先: Webフォント完全削除、システムフォントのみ使用

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
    <html lang="ja">
      <body className="bg-bg text-text antialiased">
        {children}
      </body>
    </html>
  );
}
