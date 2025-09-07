import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import VersionWatcher from "@/components/VersionWatcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "만점 | 점자 학습",
  description: "자음·모음·숫자·생활 단어를 단계별로 익히세요",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://manjeom.biyeon.store"),
  applicationName: "만점",
  keywords: ["점자", "한글 점자", "점자 학습", "Braille", "한글"],
  authors: [{ name: "만점" }],
  openGraph: {
    title: "만점 | 점자 학습",
    description: "자음·모음·숫자·생활 단어를 단계별로 익히세요",
    url: "/",
    siteName: "만점",
    images: [
      { url: "/logo.png", width: 512, height: 512, alt: "만점 점자 학습" },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "만점 | 점자 학습",
    description: "자음·모음·숫자·생활 단어를 단계별로 익히세요",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appVersion =
    process.env.NEXT_PUBLIC_APP_VERSION ||
    (process.env.VERCEL_GIT_COMMIT_SHA ? process.env.VERCEL_GIT_COMMIT_SHA.slice(0, 7) : undefined) ||
    process.env.BUILD_ID ||
    "dev";
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <SiteHeader />
        <VersionWatcher version={appVersion} />
        <main className="container py-10 flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
