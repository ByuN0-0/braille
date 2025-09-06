"use client";
import { useMemo } from "react";
import consonantsInitial from "@/data/consonants-initial.json";
import consonantsFinal from "@/data/consonants-final.json";
import vowels from "@/data/vowels.json";
import numbers from "@/data/numbers.json";
import type { GlyphItem } from "@/lib/types";
import QuizMCQ from "@/components/QuizMCQ";
import QuizInput from "@/components/QuizInput";

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
  const questions = useMemo(() => {
    const qs = pickRandom(pool, 5);
    return qs.map((q, idx) => ({ q, type: idx % 2 === 0 ? "mcq" : "input" as const }));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">혼합 연습</h1>
      <div className="space-y-6">
        {questions.map(({ q, type }, i) => (
          <div key={i} className="rounded-xl border p-4">
            {type === "mcq" ? (
              <QuizMCQ
                questionType={Math.random() > 0.5 ? "label-to-glyph" : "glyph-to-label"}
                label={q.label}
                subtitle={q.type === "consonant" ? (initialIds.has(q.id) ? "초성" : (finalIds.has(q.id) ? "종성" : undefined)) : undefined}
                answerMask={q.masks[0]}
                choices={pickRandom(pool.filter((x) => x.id !== q.id), 3)
                  .concat(q)
                  .sort(() => Math.random() - 0.5)
                  .map((m) => ({ label: m.label, mask: m.masks[0] }))}
              />
            ) : (
              <QuizInput
                label={q.label}
                answerMasks={q.masks}
                subtitle={q.type === "consonant" ? (initialIds.has(q.id) ? "초성" : (finalIds.has(q.id) ? "종성" : undefined)) : undefined}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


