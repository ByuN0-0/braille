"use client";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import BrailleDots from "@/components/BrailleDots";
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

function pickRandom<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  const result: T[] = [];
  while (result.length < n && copy.length) {
    const idx = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(idx, 1)[0]);
  }
  return result;
}

export default function PracticeMixPage() {
  return (
    <QuizScreen
      title="혼합 연습"
      pool={normalizeToSimple(pool as unknown as GlyphItem[])}
      mode="mix"
      subtitleResolver={(it) => (initialIds.has(it.id) ? "초성" : (finalIds.has(it.id) ? "종성" : undefined))}
    />
  );
}


