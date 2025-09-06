"use client";
import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import consonantsInitial from "@/data/consonants-initial.json";
import consonantsFinal from "@/data/consonants-final.json";
import vowels from "@/data/vowels.json";
import numbers from "@/data/numbers.json";
import words from "@/data/words.json";
import type { GlyphItem } from "@/lib/types";
import QuizInput from "@/components/QuizInput";

export default function PracticeInputPage() {
  return (
    <Suspense fallback={
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">입력형 연습</h1>
        <p className="text-sm text-gray-600">로딩 중...</p>
      </div>
    }>
      <PracticeInputInner />
    </Suspense>
  );
}

function PracticeInputInner() {
  const params = useSearchParams();
  const section = params.get("section");
  const id = params.get("id");

  const item = useMemo(() => {
    const map: Record<string, GlyphItem[]> = {
      consonants: ([...(consonantsInitial as unknown as GlyphItem[]), ...(consonantsFinal as unknown as GlyphItem[])]) as GlyphItem[],
      vowels: vowels as unknown as GlyphItem[],
      numbers: numbers as unknown as GlyphItem[],
      words: words as unknown as GlyphItem[],
    };
    if (!section || !id || !map[section]) return null;
    return (map[section] as GlyphItem[]).find((x) => x.id === id) || null;
  }, [section, id]);

  if (!item) {
    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">입력형 연습</h1>
        <p className="text-sm text-gray-600">섹션과 항목을 선택하면 바로 연습할 수 있어요.</p>
      </div>
    );
  }

  const answerMasks = item.type === "number" && item.masks.length > 1 ? [item.masks[item.masks.length - 1]] : item.masks;
  const isConsonant = item.type === "consonant";
  const subtitle = isConsonant
    ? ([...(consonantsInitial as unknown as GlyphItem[])].some((x) => x.id === item.id)
        ? "초성"
        : ([...(consonantsFinal as unknown as GlyphItem[])].some((x) => x.id === item.id) ? "종성" : undefined))
    : undefined;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">입력형 연습</h1>
      <QuizInput label={item.label} answerMasks={answerMasks} subtitle={subtitle} />
    </div>
  );
}


