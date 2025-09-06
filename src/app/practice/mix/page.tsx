"use client";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { maskToUnicode } from "@/lib/braille";
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
  const router = useRouter();
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const totalCount = correctCount + wrongCount;
  const make = useCallback(() => {
    const q = pickRandom(pool, 1)[0];
    const type = Math.random() > 0.5 ? "mcq" as const : "input" as const;
    const questionType = Math.random() > 0.5 ? "label-to-glyph" as const : "glyph-to-label" as const;
    const choices = (() => {
      const distractors = pickRandom(pool.filter((x) => x.id !== q.id), 3);
      const insertIdx = Math.floor(Math.random() * 4);
      const merged = [...distractors.slice(0, insertIdx), q, ...distractors.slice(insertIdx)];
      return merged.map((m) => ({ label: m.label, mask: m.masks[0] }));
    })();
    return { q, type, questionType, choices } as const;
  }, []);
  const [cur, setCur] = useState<ReturnType<typeof make> | null>(null);
  useEffect(() => {
    // 클라이언트에서만 랜덤 생성 (SSR/CSR 불일치 방지)
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
          <h1 className="text-2xl font-bold">혼합 연습</h1>
        </div>
        <div className="rounded-xl border p-6 text-sm text-gray-600">로딩 중...</div>
      </div>
    );
  }

  const q = cur.q;
  const subtitle = q.type === "consonant" ? (initialIds.has(q.id) ? "초성" : (finalIds.has(q.id) ? "종성" : undefined)) : undefined;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">혼합 연습</h1>
        <div className="flex items-center gap-3 text-sm">
          <span>맞음 {correctCount}</span>
          <span>틀림 {wrongCount}</span>
          <span>총 {totalCount}</span>
          <button className="ml-2 px-3 py-1.5 rounded border" onClick={() => router.push("/practice")}>종료</button>
        </div>
      </div>
      <div className="rounded-xl border p-4">
        {cur.type === "mcq" ? (
          <QuizMCQ
            questionType={cur.questionType}
            label={q.label}
            subtitle={subtitle}
            answerMask={q.masks[0]}
            choices={cur.choices}
            onResolved={({ correct }) => {
              setResult({ correct });
              if (correct) setCorrectCount((v) => v + 1); else setWrongCount((v) => v + 1);
            }}
          />
        ) : (
          <QuizInput
            label={q.label}
            answerMasks={q.masks}
            subtitle={subtitle}
            onResolved={({ correct }) => {
              setResult({ correct });
              if (correct) setCorrectCount((v) => v + 1); else setWrongCount((v) => v + 1);
            }}
          />
        )}
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
                정답: <span className="font-medium">
                  {cur.type === "mcq"
                    ? (cur.questionType === "glyph-to-label" ? q.label : q.masks.map(maskToUnicode).join(""))
                    : q.masks.map(maskToUnicode).join("")}
                </span>
              </div>
            )}
            <p className="text-xs text-gray-500">클릭하면 다음 문제로 이동합니다.</p>
          </div>
        </button>
      )}
    </div>
  );
}


