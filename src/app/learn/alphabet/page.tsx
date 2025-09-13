"use client";
import { useState } from "react";
import data from "@/data/alphabet.json";
import { BrailleGlyph } from "@/components/BrailleGlyph";
import BrailleDots from "@/components/BrailleDots";
import Link from "next/link";

type AlphaItem = { id: string; label: string; masks?: number[]; cells?: { masks: number[] }[]; examples?: string[] };

export default function AlphabetPage() {
  const items = (data as unknown as AlphaItem[]).filter((x) => x.label);
  const [selected, setSelected] = useState<AlphaItem | null>(null);

  const getMasks = (it: AlphaItem): number[] => it.masks ?? it.cells?.flatMap((c) => c.masks) ?? [];

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">영어(로마자)</h1>
        <Link href="/learn" className="text-sm underline">← 목록</Link>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((it) => (
          <button
            key={it.id}
            className="rounded-xl border p-3 text-left hover:shadow-sm"
            onClick={() => setSelected(it)}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold">{it.label}</span>
              {getMasks(it).length > 0 ? (
                getMasks(it).length === 1 ? (
                  <BrailleGlyph mask={getMasks(it)[0]} />
                ) : (
                  <div className="flex items-center gap-2" aria-hidden>
                    {getMasks(it).map((m, idx) => (
                      <BrailleDots key={idx} mask={m} />
                    ))}
                  </div>
                )
              ) : null}
            </div>
          </button>
        ))}
      </div>

      {selected ? (
        <div className="sticky bottom-0 left-0 right-0 rounded-t-xl border p-4 bg-background">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">{selected.label}</h2>
            <button className="text-sm underline" onClick={() => setSelected(null)}>닫기</button>
          </div>
          <div className="flex items-center gap-6 flex-wrap mb-3">
            {getMasks(selected).length > 0 ? (
              getMasks(selected).length === 1 ? (
                <BrailleGlyph mask={getMasks(selected)[0]} label="점자" />
              ) : (
                <div className="flex items-center gap-4" aria-hidden>
                  {getMasks(selected).map((m, idx) => (
                    <BrailleDots key={idx} mask={m} />
                  ))}
                </div>
              )
            ) : null}
          </div>
          {selected.examples?.length ? (
            <p className="text-sm text-gray-700">예시: {selected.examples.join(", ")}</p>
          ) : null}
          <div className="mt-3">
            <Link href={`/practice/input?section=alphabet&id=${selected.id}`} className="px-3 py-2 rounded border inline-block">바로 연습</Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}




