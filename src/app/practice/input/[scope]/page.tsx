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
import alphabet from "@/data/alphabet.json";
import punctuation from "@/data/punctuation.json";
import math from "@/data/math.json";
import QuizScreen from "@/components/QuizScreen";
import { normalizeToSimple, type SimpleItem } from "@/lib/quiz";

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
    case "numbers": {
      const numOnly = toPoolSingle(numbers as unknown as WithMasks[]).filter((x) => x.label !== "수표");
      const mathAll = toPoolMulti(math as unknown as WithMasks[]);
      return { title: "숫자/기호", pool: [...numOnly, ...mathAll] };
    }
    case "alphabet":
      return { title: "영어(로마자)", pool: toPoolMulti(alphabet as unknown as WithMasks[]) };
    case "punctuation":
      return { title: "문장부호", pool: toPoolMulti(punctuation as unknown as WithMasks[]) };
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

export default function InputScopePage() {
  const { scope } = useParams<{ scope: string }>();
  const { title, pool } = useMemo(() => flattenItems(scope), [scope]);
  const simple = useMemo<SimpleItem[]>(() => normalizeToSimple(pool), [pool]);
  const subtitleResolver = () => (scope === "initial" ? "초성" : scope === "final" ? "종성" : undefined);
  return (
    <QuizScreen title={`${title} - 입력형 연습`} pool={simple} mode="input" subtitleResolver={subtitleResolver} />
  );
}


