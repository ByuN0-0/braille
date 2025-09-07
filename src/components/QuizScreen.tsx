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
    if (mode === "mcq") {
      const mcq = makeMcqQuestion(pool, { subtitleResolver });
      const qFromMcq = { id: "", label: mcq.label, masks: mcq.answerMasks ?? (mcq.answerMask ? [mcq.answerMask] : []) } as SimpleItem;
      return { q: qFromMcq, subtitle: mcq.subtitle, type: "mcq" as const, mcq } as const;
    }
    if (mode === "mix") {
      const forcedType = Math.random() > 0.5 ? "mcq" : "input";
      if (forcedType === "mcq") {
        const mcq = makeMcqQuestion(pool, { subtitleResolver });
        const qFromMcq = { id: "", label: mcq.label, masks: mcq.answerMasks ?? (mcq.answerMask ? [mcq.answerMask] : []) } as SimpleItem;
        return { q: qFromMcq, subtitle: mcq.subtitle, type: "mcq" as const, mcq } as const;
      }
      const q = pickRandom(pool, 1)[0];
      const subtitle = subtitleResolver?.(q);
      return { q, subtitle, type: "input" as const, mcq: undefined } as const;
    }
    // mode === "input"
    const q = pickRandom(pool, 1)[0];
    const subtitle = subtitleResolver?.(q);
    return { q, subtitle, type: "input" as const, mcq: undefined } as const;
  }, [pool, mode, subtitleResolver]);

  const [cur, setCur] = useState<ReturnType<typeof make> | null>(null);
  useEffect(() => { setCur(make()); }, [make]);
  const [result, setResult] = useState<{ correct: boolean; selectedIndex?: number } | null>(null);

  const proceed = () => { setCur(make()); setResult(null); };

  if (!cur) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="rounded-xl border p-6 text-sm text-gray-600">로딩 중...</div>
      </div>
    );
  }

  const q = cur.q;
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
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
            answerMasks={q.masks}
            choices={cur.mcq!.choices}
            onResolved={({ correct, selectedIndex }) => { setResult({ correct, selectedIndex }); if (correct) setCorrectCount(v=>v+1); else setWrongCount(v=>v+1); }}
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
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-xl max-w-md w-[90%] text-left space-y-3">
            <h3 className={`text-xl font-semibold ${result.correct ? "text-green-600" : "text-red-600"}`}>{result.correct ? "정답입니다." : "오답입니다."}</h3>
            {!result.correct && (
              <div className="text-sm text-gray-700 dark:text-gray-200 flex items-center justify-start gap-2">
                <div className="w-full space-y-2">
                  {cur.type === "mcq" && typeof result.selectedIndex === "number" ? (
                    <div className="flex items-center justify-start gap-3 rounded-md px-3 py-2 bg-red-50/30 dark:bg-red-900/5">
                      <span className="text-gray-500">선택:</span>
                      {(() => {
                        const s = cur.mcq!.choices[result.selectedIndex!];
                        if (cur.mcq!.questionType === "label-to-glyph") {
                          // 문자 → 점자 맞추기: 선택 {점자} 문자: {문자}
                          return (
                            <>
                              <div className="flex items-center gap-2" aria-hidden>
                                {s.masks ? s.masks.map((m,i)=>(<BrailleDots key={i} mask={m}/>)) : <BrailleDots mask={s.mask!} />}
                              </div>
                              <span className="text-gray-500">문자:</span>
                              <span className="font-medium">{s.label}</span>
                            </>
                          );
                        } else {
                          // 점자 → 문자 맞추기: 선택 {문자} 점자: {점자}
                          return (
                            <>
                              <span className="font-medium">{s.label}</span>
                              <span className="text-gray-500">점자:</span>
                              <div className="flex items-center gap-2" aria-hidden>
                                {s.masks ? s.masks.map((m,i)=>(<BrailleDots key={i} mask={m}/>)) : <BrailleDots mask={s.mask!} />}
                              </div>
                            </>
                          );
                        }
                      })()}
                    </div>
                  ) : null}
                  <div className="flex items-center justify-start gap-3 rounded-md px-3 py-2 bg-green-50/30 dark:bg-green-900/5">
                    <span className="text-gray-500">정답:</span>
                    {cur.type === "mcq" ? (
                      cur.mcq!.questionType === "label-to-glyph" ? (
                        // 문자 → 점자: {점자} 문자: {문자}
                        <>
                          <div className="flex items-center gap-2" aria-hidden>
                            {q.masks.map((m, i) => (<BrailleDots key={i} mask={m} />))}
                          </div>
                          <span className="text-gray-500">문자:</span>
                          <span className="font-medium">{q.label}</span>
                        </>
                      ) : (
                        // 점자 → 문자: {문자} 점자: {점자}
                        <>
                          <span className="font-medium">{q.label}</span>
                          <span className="text-gray-500">점자:</span>
                          <div className="flex items-center gap-2" aria-hidden>
                            {q.masks.map((m, i) => (<BrailleDots key={i} mask={m} />))}
                          </div>
                        </>
                      )
                    ) : (
                      // 입력형은 기존 포맷 유지(문자 → 점자)
                      <>
                        <span className="font-medium">{q.label}</span>
                        <span className="text-gray-500">점자:</span>
                        <div className="flex items-center gap-2" aria-hidden>
                          {q.masks.map((m, i) => (<BrailleDots key={i} mask={m} />))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-6 pt-4 border-t border-gray-200 dark:border-neutral-700">클릭하면 다음 문제로 이동합니다.</p>
          </div>
        </button>
      )}
    </div>
  );
}


