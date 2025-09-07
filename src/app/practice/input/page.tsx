"use client";
import consonantsInitial from "@/data/consonants-initial.json";
import consonantsFinal from "@/data/consonants-final.json";
import vowels from "@/data/vowels.json";
import numbers from "@/data/numbers.json";
import type { GlyphItem } from "@/lib/types";
import QuizScreen from "@/components/QuizScreen";
import { normalizeToSimple } from "@/lib/quiz";

const pool = [
  ...((consonantsInitial as unknown as GlyphItem[])),
  ...((consonantsFinal as unknown as GlyphItem[])),
  ...(vowels as unknown as GlyphItem[]),
  ...(numbers as unknown as GlyphItem[]),
];

const initialIds = new Set((consonantsInitial as unknown as GlyphItem[]).map((x) => x.id));
const finalIds = new Set((consonantsFinal as unknown as GlyphItem[]).map((x) => x.id));

export default function PracticeInputOnlyPage() {
  return (
    <QuizScreen
      title="입력형 연습"
      pool={normalizeToSimple(pool as unknown as GlyphItem[])}
      mode="input"
      subtitleResolver={(it) => (initialIds.has(it.id) ? "초성" : (finalIds.has(it.id) ? "종성" : undefined))}
    />
  );
}


