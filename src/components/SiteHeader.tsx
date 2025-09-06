import Link from "next/link";
import Image from "next/image";

export default function SiteHeader() {
  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/30 border-b">
      <nav className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-base font-semibold tracking-tight">
          <span className="inline-flex items-center gap-2">
            <Image src="/logo.png" alt="만점 로고" width={28} height={28} priority className="rounded" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">점자 학습</span>
          </span>
        </Link>
        <div className="flex items-center gap-5 text-sm text-gray-700 dark:text-gray-300">
          <Link href="/learn" className="hover:text-foreground">학습</Link>
          <Link href="/table" className="hover:text-foreground">점자표</Link>
        </div>
      </nav>
    </header>
  );
}


