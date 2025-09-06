"use client";
import Link from "next/link";
import { useState } from "react";
import { DotPadInput } from "@/components/DotPadInput";
import { BrailleGlyph } from "@/components/BrailleGlyph";
import BrailleDots from "@/components/BrailleDots";

export default function Home() {
  const [mask, setMask] = useState(0);
  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">점자 학습, 빠르고 간단하게</h1>
        <p className="text-gray-600">자음·모음·숫자·생활 단어를 단계별로 익히세요</p>
        <div className="flex gap-3">
          <Link href="/learn" className="px-4 py-2 rounded border bg-black/[.05] dark:bg-white/[.06]">학습 시작</Link>
          <Link href="/practice" className="px-4 py-2 rounded border">연습하기</Link>
        </div>
      </section>

      <section className="rounded-xl border p-4">
        <h2 className="font-semibold mb-3">미니 데모</h2>
        <div className="flex items-center gap-6 flex-wrap">
          <DotPadInput value={mask} onChange={setMask} />
          <BrailleGlyph mask={mask} label="현재 입력" />
          <BrailleDots mask={mask} />
        </div>
      </section>

      <section className="rounded-xl border p-4">
        <h2 className="font-semibold mb-2">예비교사용 안내</h2>
        <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
          <li>기본 글자(자음/모음/숫자)로 점-소리 대응을 익힙니다.</li>
          <li>생활 단어 30개를 통해 글자 조합과 맥락을 봅니다.</li>
          <li>입력형/선택형 연습으로 즉각 피드백을 받습니다.</li>
        </ol>
      </section>
    </div>
  );
}
