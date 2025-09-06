"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import consonantsInitial from "@/data/consonants-initial.json";
import consonantsFinal from "@/data/consonants-final.json";
import vowels from "@/data/vowels.json";
import numbers from "@/data/numbers.json";
import type { GlyphItem } from "@/lib/types";
import QuizMCQ from "@/components/QuizMCQ";
import { maskToUnicode } from "@/lib/braille";

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

export default function PracticeChoicePage() {
  const router = useRouter();
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const totalCount = correctCount + wrongCount;
  const makeQuestion = useCallback(() => {
    const q = pickRandom(pool, 1)[0];
    const choices = pickRandom(pool.filter((x) => x.id !== q.id), 3);
    const idx = Math.floor(Math.random() * 4);
    const merged = [...choices.slice(0, idx), q, ...choices.slice(idx)];
    const subtitle = initialIds.has(q.id) ? "초성" : finalIds.has(q.id) ? "종성" : undefined;
    const questionType: "label-to-glyph" | "glyph-to-label" = Math.random() > 0.5 ? "label-to-glyph" : "glyph-to-label";
    return {
      raw: q,
      questionType,
      label: q.label,
      subtitle,
      answerMask: q.masks[0],
      choices: merged.map((m) => ({ label: m.label, mask: m.masks[0] })),
    } as const;
  }, []);
  const [question, setQuestion] = useState<ReturnType<typeof makeQuestion> | null>(null);
  useEffect(() => {
    // 클라이언트에서만 랜덤 생성 (SSR/CSR 불일치 방지)
    setQuestion(makeQuestion());
  }, [makeQuestion]);
  const [result, setResult] = useState<{ correct: boolean } | null>(null);

  const proceed = () => {
    setQuestion(makeQuestion());
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">선택형 연습</h1>
        <div className="flex items-center gap-3 text-sm">
          <span>맞음 {correctCount}</span>
          <span>틀림 {wrongCount}</span>
          <span>총 {totalCount}</span>
          <button className="ml-2 px-3 py-1.5 rounded border" onClick={() => router.push("/practice")}>종료</button>
        </div>
      </div>

      {question ? (
        <QuizMCQ
          questionType={question.questionType}
          label={question.label}
          subtitle={question.subtitle}
          answerMask={question.answerMask}
          choices={question.choices}
          onResolved={({ correct }) => {
            setResult({ correct });
            if (correct) setCorrectCount((v) => v + 1); else setWrongCount((v) => v + 1);
          }}
        />
      ) : (
        <div className="rounded-xl border p-6 text-sm text-gray-600">로딩 중...</div>
      )}

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
            {!result.correct && question && (
              <div className="text-sm text-gray-700 dark:text-gray-200">
                정답: <span className="font-medium">{question.questionType === "glyph-to-label" ? question.label : maskToUnicode(question.answerMask!)}</span>
              </div>
            )}
            <p className="text-xs text-gray-500">클릭하면 다음 문제로 이동합니다.</p>
          </div>
        </button>
      )}
    </div>
  );
}


