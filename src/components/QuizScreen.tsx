"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { makeMcqQuestion, pickRandom, type SimpleItem } from "@/lib/quiz";
import QuizMCQ from "@/components/QuizMCQ";
import QuizInput from "@/components/QuizInput";
import BrailleDots from "@/components/BrailleDots";

export type QuizMode = "mcq" | "mix" | "input";

export default function QuizScreen({
  title,
  pool,
  mode,
  subtitleResolver,
}: {
  title: string;
  pool: SimpleItem[];
  mode: QuizMode;
  subtitleResolver?: (item: SimpleItem) => string | undefined;
}) {
  const router = useRouter();
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const totalCount = correctCount + wrongCount;

  const make = useCallback(() => {
    const q = pickRandom(pool, 1)[0];
    const subtitle = subtitleResolver?.(q);
    if (mode === "mcq" || mode === "mix") {
      const mcq = makeMcqQuestion(pool, { subtitleResolver: () => subtitle });
      const forcedType = mode === "mix" ? (Math.random() > 0.5 ? "mcq" : "input") : "mcq";
      return { q, subtitle, type: forcedType, mcq } as const;
    }
    // input 고정
    return { q, subtitle, type: "input" as const, mcq: undefined } as const;
  }, [pool, mode, subtitleResolver]);

  const [cur, setCur] = useState<ReturnType<typeof make> | null>(null);
  useEffect(() => { setCur(make()); }, [make]);
  const [result, setResult] = useState<{ correct: boolean } | null>(null);

  const proceed = () => { setCur(make()); setResult(null); };

  if (!cur) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between"><h1 className="text-2xl font-bold">{title}</h1></div>
        <div className="rounded-xl border p-6 text-sm text-gray-600">로딩 중...</div>
      </div>
    );
  }

  const q = cur.q;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
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
            questionType={cur.mcq!.questionType}
            label={q.label}
            subtitle={cur.subtitle}
            answerMask={q.masks[0]}
            choices={cur.mcq!.choices}
            onResolved={({ correct }) => { setResult({ correct }); if (correct) setCorrectCount(v=>v+1); else setWrongCount(v=>v+1); }}
          />
        ) : (
          <QuizInput
            label={q.label}
            answerMasks={q.masks}
            subtitle={cur.subtitle}
            onResolved={({ correct }) => { setResult({ correct }); if (correct) setCorrectCount(v=>v+1); else setWrongCount(v=>v+1); }}
          />
        )}
      </div>

      {result && (
        <button aria-label="결과 확인 후 다음 문제로" className="fixed inset-0 bg-black/50 flex items-center justify-center" onClick={proceed}>
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-xl max-w-md w-[90%] text-center space-y-3">
            <h3 className={`text-xl font-semibold ${result.correct ? "text-green-600" : "text-red-600"}`}>{result.correct ? "정답입니다." : "오답입니다."}</h3>
            {!result.correct && (
              <div className="text-sm text-gray-700 dark:text-gray-200 flex items-center justify-center gap-2">
                정답:
                {cur.type === "mcq" && cur.mcq!.questionType === "glyph-to-label" ? (
                  <span className="font-medium">{q.label}</span>
                ) : (
                  <div className="flex items-center gap-2" aria-hidden>
                    {q.masks.map((m, i) => (<BrailleDots key={i} mask={m} />))}
                  </div>
                )}
              </div>
            )}
            <p className="text-xs text-gray-500">클릭하면 다음 문제로 이동합니다.</p>
          </div>
        </button>
      )}
    </div>
  );
}


