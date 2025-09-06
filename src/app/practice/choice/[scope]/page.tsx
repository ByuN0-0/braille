"use client";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import initials from "@/data/consonants-initial.json";
import finals from "@/data/consonants-final.json";
import vowels from "@/data/vowels.json";
import numbers from "@/data/numbers.json";
import words from "@/data/words.json";
import abbreviations from "@/data/abbreviations.json";
import abbrPhrases from "@/data/abbr-phrases.json";
import QuizMCQ from "@/components/QuizMCQ";

type PoolItem = { id: string; label: string; mask?: number; masks?: number[] };

function flattenItems(scope: string): { title: string; pool: PoolItem[] } {
  type WithMasks = { id: string; label: string; masks?: number[]; cells?: { masks: number[] }[] };
  const toPoolSingle = (arr: WithMasks[]): PoolItem[] =>
    arr.map((x) => ({ id: x.id, label: x.label, mask: (x.masks?.[0] ?? x.cells?.[0]?.masks?.[0]) }));
  const toPoolMulti = (arr: WithMasks[]): PoolItem[] =>
    arr.map((x) => ({ id: x.id, label: x.label, masks: x.masks ?? x.cells?.flatMap((c) => c.masks) }));

  switch (scope) {
    case "initial":
      return { title: "자음(초성)", pool: toPoolSingle(initials as unknown as WithMasks[]) };
    case "final":
      return { title: "자음(종성)", pool: toPoolSingle(finals as unknown as WithMasks[]) };
    case "vowels":
      return { title: "모음", pool: toPoolSingle(vowels as unknown as WithMasks[]) };
    case "numbers":
      return { title: "숫자", pool: toPoolSingle(numbers as unknown as WithMasks[]).filter((x) => x.label !== "수표") };
    case "abbrev":
      return {
        title: "약자/약어",
        pool: [
          ...toPoolMulti(abbreviations as unknown as WithMasks[]),
          ...(abbrPhrases as unknown as { id: string; label: string; cells: { masks: number[] }[] }[]).map((p) => ({ id: p.id, label: p.label, masks: p.cells.flatMap((c) => c.masks) })),
        ],
      };
    case "words":
      return { title: "단어", pool: toPoolMulti(words as unknown as WithMasks[]) };
    default:
      return { title: "전체", pool: [] };
  }
}

function pickRandom<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  const result: T[] = [];
  while (result.length < n && copy.length) {
    const idx = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(idx, 1)[0]);
  }
  return result;
}

export default function ChoiceScopePage() {
  const { scope } = useParams<{ scope: string }>();
  const { title, pool } = useMemo(() => flattenItems(scope), [scope]);
  const questions = useMemo(() => {
    const qs = pickRandom(pool, 10);
    return qs.map((q) => {
      const choices = pickRandom(pool.filter((x) => x.id !== q.id), 3);
      const idx = Math.floor(Math.random() * 4);
      const merged = [...choices.slice(0, idx), q, ...choices.slice(idx)];
      const questionType: "label-to-glyph" | "glyph-to-label" = Math.random() > 0.5 ? "label-to-glyph" : "glyph-to-label";
      const isMulti = Array.isArray(q.masks) && q.masks.length > 1;
      const subtitle = scope === "initial" ? "초성" : scope === "final" ? "종성" : undefined;
      return {
        questionType,
        label: q.label,
        subtitle,
        ...(isMulti
          ? { answerMasks: q.masks }
          : { answerMask: q.mask ?? (Array.isArray(q.masks) ? q.masks[0] : undefined) }),
        choices: merged.map((m) => (
          Array.isArray(m.masks) && m.masks.length > 1
            ? { label: m.label, masks: m.masks }
            : { label: m.label, mask: m.mask ?? (Array.isArray(m.masks) ? m.masks[0] : undefined) }
        )),
      };
    });
  }, [pool]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{title} - 객관식 연습</h1>
      <div className="space-y-6">
        {questions.length === 0 ? (
          <p className="text-sm text-gray-600">풀 구성이 비어 있습니다.</p>
        ) : (
          questions.map((q, i) => <QuizMCQ key={i} {...q} />)
        )}
      </div>
    </div>
  );
}


