"use client";
import { } from "react";
import { } from "next/navigation";
import consonantsInitial from "@/data/consonants-initial.json";
import consonantsFinal from "@/data/consonants-final.json";
import vowels from "@/data/vowels.json";
import numbers from "@/data/numbers.json";
import math from "@/data/math.json";
import alphabet from "@/data/alphabet.json";
import type { GlyphItem } from "@/lib/types";
import { normalizeToSimple } from "@/lib/quiz";
import QuizScreen from "@/components/QuizScreen";

const pool = [
  ...((consonantsInitial as unknown as GlyphItem[])),
  ...((consonantsFinal as unknown as GlyphItem[])),
  ...(vowels as unknown as GlyphItem[]),
  ...(numbers as unknown as GlyphItem[]),
  ...((math as unknown as { id: string; label: string; masks?: number[]; cells?: { masks: number[] }[] }[])
    .map((x) => ({ id: x.id, label: x.label, masks: x.masks ?? (x.cells?.flatMap((c) => c.masks) ?? []) })) as unknown as GlyphItem[]),
  ...((alphabet as unknown as { id: string; label: string; masks?: number[]; cells?: { masks: number[] }[] }[])
    .map((x) => ({ id: x.id, label: x.label, masks: x.masks ?? (x.cells?.flatMap((c) => c.masks) ?? []) })) as unknown as GlyphItem[]),
];

const initialIds = new Set((consonantsInitial as unknown as GlyphItem[]).map((x) => x.id));
const finalIds = new Set((consonantsFinal as unknown as GlyphItem[]).map((x) => x.id));
const mathIds = new Set(((math as unknown as { id: string }[])).map((x) => x.id));

//

export default function PracticeChoicePage() {
  return (
    <QuizScreen
      title="선택형 연습"
      pool={normalizeToSimple(pool as unknown as GlyphItem[])}
      mode="mcq"
      subtitleResolver={(it) => (initialIds.has(it.id) ? "초성" : (finalIds.has(it.id) ? "종성" : (mathIds.has(it.id) ? "수학기호" : undefined)))}
    />
  );
}


