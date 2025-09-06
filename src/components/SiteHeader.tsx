import Link from "next/link";
import Image from "next/image";

export default function SiteHeader() {
  return (
    <header className="w-full sticky top-0 z-50 border-b backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/30" style={{ height: "64px" }}>
      <nav className="container h-full flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight flex items-center">
          <span className="inline-flex items-center gap-2">
            <Image src="/logo.png" alt="만점 로고" width={28} height={28} priority className="rounded align-middle" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 leading-none">점자 학습</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/table" className="btn btn-secondary inline-flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="3" y="4" width="18" height="16" rx="2"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
              <line x1="10" y1="4" x2="10" y2="20"/>
              <line x1="16" y1="4" x2="16" y2="20"/>
            </svg>
            <span>점자표</span>
          </Link>
          <Link href="/learn" className="btn btn-primary">학습</Link>
        </div>
      </nav>
    </header>
  );
}


