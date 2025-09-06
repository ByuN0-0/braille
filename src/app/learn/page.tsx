"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProgressBadge } from "@/components/ProgressBadge";
import { getProgress, setProgress } from "@/lib/storage";
import consonantsInitial from "@/data/consonants-initial.json";
import consonantsFinal from "@/data/consonants-final.json";
import vowels from "@/data/vowels.json";
import numbers from "@/data/numbers.json";
import words from "@/data/words.json";

type SectionKey = "consonants" | "vowels" | "numbers" | "words";

export default function Learn() {
  const sections: { key: SectionKey; title: string; desc: string; href: string; total: number }[] = [
    { key: "consonants", title: "자음(초성)", desc: "초성 자음을 익혀요", href: "/learn/consonants", total: (consonantsInitial as any[]).length },
    { key: "consonants", title: "자음(종성)", desc: "받침 자음을 익혀요", href: "/learn/finals", total: (consonantsFinal as any[]).length },
    { key: "vowels", title: "모음", desc: "기본 모음을 익혀요", href: "/learn/vowels", total: (vowels as any[]).length },
    { key: "numbers", title: "숫자", desc: "간이 숫자 표기", href: "/learn/numbers", total: (numbers as any[]).length },
    { key: "words", title: "단어", desc: "생활 단어 30개", href: "/learn/words", total: (words as any[]).length },
  ];

  const [progress, setProgressState] = useState<Record<SectionKey, { total: number; solved: number }>>({
    consonants: { total: 0, solved: 0 },
    vowels: { total: 0, solved: 0 },
    numbers: { total: 0, solved: 0 },
    words: { total: 0, solved: 0 },
  });

  useEffect(() => {
    const next: typeof progress = { ...progress };
    sections.forEach((s) => {
      const p = getProgress(s.key);
      if (p.total !== s.total) {
        setProgress(s.key, s.total, p.solved || 0);
        next[s.key] = { total: s.total, solved: p.solved || 0 };
      } else {
        next[s.key] = p;
      }
    });
    setProgressState(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">학습</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sections.map((s) => (
          <Link key={s.key} href={s.href} className="rounded-xl border p-4 hover:shadow-sm transition block">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <ProgressBadge total={progress[s.key].total} solved={progress[s.key].solved} />
            </div>
            <p className="text-sm text-gray-600">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}


