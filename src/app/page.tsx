"use client";
import Link from "next/link";
import { useState } from "react";
import { DotPadInput } from "@/components/DotPadInput";
import { BrailleGlyph } from "@/components/BrailleGlyph";
import BrailleDots from "@/components/BrailleDots";

export default function Home() {
  const [mask, setMask] = useState(0);
  return (
    <div className="space-y-12">
      <section className="text-center space-y-8 py-20">
        <h1 className="hero-title font-extrabold tracking-tight leading-[1.05]">
          점자 학습, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">빠르고 간단하게</span>
        </h1>
        <p className="hero-subtitle text-gray-600">자음·모음·숫자·생활 단어를 단계별로 익히세요</p>
        <div className="hero-actions flex justify-center gap-5">
          <Link href="/learn" className="btn btn-primary h-14 px-8 text-xl">학습 시작</Link>
          <Link href="/table" className="btn btn-secondary h-14 px-8 text-xl">점자표</Link>
        </div>
      </section>

      <section className="rounded-2xl card p-6 bg-gradient-to-b from-black/[.02] to-transparent dark:from-white/[.04]">
        <h2 className="font-semibold mb-4">미니 데모</h2>
        <div className="flex items-center gap-8 flex-wrap">
          <DotPadInput value={mask} onChange={setMask} />
          <div className="flex items-center gap-6">
            <BrailleGlyph mask={mask} label="현재 입력" labelFirst={true} />
          </div>
        </div>
      </section>

      <section className="rounded-2xl card p-6">
        <h2 className="font-semibold mb-2">예비교사용 안내</h2>
        <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
          <li>기본 글자(자음/모음/숫자)로 점-소리 대응을 익힙니다.</li>
          <li>생활 단어와 약자/약어를 통해 실제 쓰임을 봅니다.</li>
          <li>객관식/혼합 문제로 즉각 피드백을 받습니다.</li>
        </ol>
      </section>
    </div>
  );
}
