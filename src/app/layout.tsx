import type { Metadata } from "next";
import { Space_Grotesk, Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

// Neo‑Typographic Fusion フォント設定
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Kawasaki K – Portfolio",
  description: "AI コンサル & エンジニアとしての信頼感と遊び心を同時に演出する Neo‑Typographic Fusion ポートフォリオ",
  keywords: ["AI", "コンサル", "エンジニア", "ポートフォリオ", "Next.js", "Three.js"],
  authors: [{ name: "Kawasaki K" }],
  creator: "Kawasaki K",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    title: "Kawasaki K – Portfolio",
    description: "AI コンサル & エンジニアとしての信頼感と遊び心を同時に演出",
    siteName: "Kawasaki K Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kawasaki K – Portfolio",
    description: "AI コンサル & エンジニアとしての信頼感と遊び心を同時に演出",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${spaceGrotesk.variable} ${inter.variable} ${notoSansJP.variable} dark`}>
      <body className="font-body bg-bg text-text antialiased">
        {children}
      </body>
    </html>
  );
} 