"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import initials from "@/data/consonants-initial.json";
import finals from "@/data/consonants-final.json";
import vowels from "@/data/vowels.json";
import numbers from "@/data/numbers.json";
import words from "@/data/words.json";
import abbreviations from "@/data/abbreviations.json";
import abbrPhrases from "@/data/abbr-phrases.json";
import QuizMCQ from "@/components/QuizMCQ";
import { maskToUnicode } from "@/lib/braille";

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
  const router = useRouter();
  const { scope } = useParams<{ scope: string }>();
  const { title, pool } = useMemo(() => flattenItems(scope), [scope]);

  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const totalCount = correctCount + wrongCount;

  const make = useCallback(() => {
    const q = pickRandom(pool, 1)[0];
    if (!q) return null;
    const distractors = pickRandom(pool.filter((x) => x.id !== q.id), 3);
    const insertIdx = Math.floor(Math.random() * 4);
    const merged = [...distractors.slice(0, insertIdx), q, ...distractors.slice(insertIdx)];
    const questionType: "label-to-glyph" | "glyph-to-label" = Math.random() > 0.5 ? "label-to-glyph" : "glyph-to-label";
    const isMulti = Array.isArray(q.masks) && q.masks.length > 1;
    const subtitle = scope === "initial" ? "초성" : scope === "final" ? "종성" : undefined;
    return {
      q,
      questionType,
      subtitle,
      label: q.label,
      answerMask: !isMulti ? (q.mask ?? (Array.isArray(q.masks) ? q.masks?.[0] : undefined)) : undefined,
      answerMasks: isMulti ? q.masks : undefined,
      choices: merged.map((m) => (
        Array.isArray(m.masks) && m.masks.length > 1
          ? { label: m.label, masks: m.masks }
          : { label: m.label, mask: m.mask ?? (Array.isArray(m.masks) ? m.masks[0] : undefined) }
      )),
    } as const;
  }, [pool, scope]);

  const [cur, setCur] = useState<ReturnType<typeof make> | null>(null);
  useEffect(() => {
    setCur(make());
  }, [make]);
  const [result, setResult] = useState<{ correct: boolean } | null>(null);

  const proceed = () => {
    setCur(make());
    setResult(null);
  };

  if (!cur) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{title} - 객관식 연습</h1>
        </div>
        <div className="rounded-xl border p-6 text-sm text-gray-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title} - 객관식 연습</h1>
        <div className="flex items-center gap-3 text-sm">
          <span>맞음 {correctCount}</span>
          <span>틀림 {wrongCount}</span>
          <span>총 {totalCount}</span>
          <button className="ml-2 px-3 py-1.5 rounded border" onClick={() => router.push("/practice")}>종료</button>
        </div>
      </div>

      <div className="rounded-xl border p-4">
        <QuizMCQ
          questionType={cur.questionType}
          label={cur.label}
          subtitle={cur.subtitle}
          answerMask={cur.answerMask}
          answerMasks={cur.answerMasks}
          choices={cur.choices}
          onResolved={({ correct }) => {
            setResult({ correct });
            if (correct) setCorrectCount((v) => v + 1); else setWrongCount((v) => v + 1);
          }}
        />
      </div>

      {result && (
        <button
          aria-label="결과 확인 후 다음 문제로"
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
          onClick={proceed}
        >
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-xl max-w-md w-[90%] text-center space-y-3">
            <h3 className={`text-xl font-semibold ${result.correct ? "text-green-600" : "text-red-600"}`}>
              {result.correct ? "정답입니다." : "오답입니다."}
            </h3>
            {!result.correct && (
              <div className="text-sm text-gray-700 dark:text-gray-200">
                정답: <span className="font-medium">{cur.questionType === "glyph-to-label" ? cur.label : (cur.answerMasks ? cur.answerMasks.map(maskToUnicode).join("") : maskToUnicode(cur.answerMask!))}</span>
              </div>
            )}
            <p className="text-xs text-gray-500">클릭하면 다음 문제로 이동합니다.</p>
          </div>
        </button>
      )}
    </div>
  );
}


