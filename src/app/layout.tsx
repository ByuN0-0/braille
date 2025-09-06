import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "점자 학습 앱",
  description: "자음·모음·숫자·생활 단어를 단계별로 익히세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="w-full border-b">
          <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="text-base font-semibold">점자 학습</a>
            <div className="flex items-center gap-4 text-sm">
              <a href="/learn" className="hover:underline">학습</a>
              <a href="/practice" className="hover:underline">연습</a>
              <a href="/table" className="hover:underline">점자표</a>
            </div>
          </nav>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="w-full border-t">
          <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-gray-600">© {new Date().getFullYear()} 점자 학습</div>
        </footer>
      </body>
    </html>
  );
}
