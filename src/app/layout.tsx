import type { Metadata } from "next";
import { Space_Grotesk, Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

// Neo-Typographic Fusionフォント設定
const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-jp",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Neo‑Typographic Fusion | Portfolio",
  description: "漆黒×幾何学×原色ワンポイント - モダンタイポグラフィとミニマリズムが融合したポートフォリオサイト",
  keywords: "portfolio, typography, design, web development, neo-typographic fusion",
  authors: [{ name: "KawasakiK" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0F0F0F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${spaceGrotesk.variable} ${inter.variable} ${notoSansJP.variable}`}>
      <body className="bg-bg text-text font-body antialiased">
        {children}
      </body>
    </html>
  );
}
