"use client";
import Link from "next/link";

type SectionKey = "consonants" | "vowels" | "numbers" | "words";

export default function Learn() {
  const beginner = [
    { key: "consonants" as SectionKey, title: "자음(초성)", desc: "초성 자음을 익혀요", href: "/practice/choice/initial" },
    { key: "consonants" as SectionKey, title: "자음(종성)", desc: "받침 자음을 익혀요", href: "/practice/choice/final" },
    { key: "vowels" as SectionKey, title: "모음", desc: "기본 모음을 익혀요", href: "/practice/choice/vowels" },
    { key: "numbers" as SectionKey, title: "숫자", desc: "숫자 객관식", href: "/practice/choice/numbers" },
    { key: "consonants" as SectionKey, title: "약자·약어", desc: "약자/약어 객관식", href: "/practice/choice/abbrev" },
  ];
  const intermediate = [
    { key: "consonants" as SectionKey, title: "자음(초성)", desc: "입력형 연습", href: "/practice/input/initial" },
    { key: "consonants" as SectionKey, title: "자음(종성)", desc: "입력형 연습", href: "/practice/input/final" },
    { key: "vowels" as SectionKey, title: "모음", desc: "입력형 연습", href: "/practice/input/vowels" },
    { key: "numbers" as SectionKey, title: "숫자", desc: "입력형 연습", href: "/practice/input/numbers" },
    { key: "consonants" as SectionKey, title: "약자·약어", desc: "입력형 연습", href: "/practice/input/abbrev" },
    { key: "words" as SectionKey, title: "단어 (구현중)", desc: "생활 단어 객관식", href: "/practice/choice/words" },
  ];
  const advanced = [
    { key: "words" as SectionKey, title: "혼합 샘플", desc: "입력/선택 혼합", href: "/practice/mix" },
  ];

  return (
    <div className="space-y-6">
      <h1>학습</h1>
      <h2 className="text-lg font-semibold">초급</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {beginner.map((s) => (
          <div key={s.key + s.title} className="rounded-xl card p-4 transition">
            <Link href={s.href} className="block">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{s.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{s.desc}</p>
            </Link>
          </div>
        ))}
      </div>
      <h2 className="text-lg font-semibold mt-8">중급</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {intermediate.map((s) => (
          <div key={s.key + s.title} className="rounded-xl card p-4 transition">
            <Link href={s.href} className="block">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{s.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{s.desc}</p>
            </Link>
          </div>
        ))}
      </div>
      <h2 className="text-lg font-semibold mt-8">고급</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {advanced.map((s) => (
          <div key={s.key + s.title} className="rounded-xl card p-4 transition">
            <Link href={s.href} className="block">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{s.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{s.desc}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}


