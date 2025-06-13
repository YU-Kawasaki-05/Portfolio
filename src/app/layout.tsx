import type { Metadata } from "next";
import { Space_Grotesk, Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/page-transition";

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
  title: "Neo-Typographic Fusion – Portfolio",
  description: "タイポグラフィと3Dグラフィックスを融合させた、モダンでインタラクティブなポートフォリオサイト",
  keywords: ["Portfolio", "Web Development", "React", "Next.js", "Three.js", "TypeScript"],
  authors: [{ name: "Developer" }],
  creator: "Developer",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    title: "Neo-Typographic Fusion – Portfolio",
    description: "タイポグラフィと3Dグラフィックスを融合させた、モダンでインタラクティブなポートフォリオサイト",
    siteName: "Neo-Typographic Fusion Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neo-Typographic Fusion – Portfolio",
    description: "タイポグラフィと3Dグラフィックスを融合させた、モダンでインタラクティブなポートフォリオサイト",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${spaceGrotesk.variable} ${inter.variable} ${notoSansJP.variable}`}>
      <body className="font-sans bg-[#0F0F0F] text-[#F9F9F9] antialiased">
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
} 