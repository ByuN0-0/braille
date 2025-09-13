"use client";
import { useState } from "react";
import data from "@/data/punctuation.json";
import BrailleDots from "@/components/BrailleDots";
import Link from "next/link";

type Item = { id: string; label: string; masks?: number[]; cells?: { masks: number[] }[] };

function getMasks(it: Item): number[] { return it.masks ?? it.cells?.flatMap((c) => c.masks) ?? []; }

export default function PunctuationPage() {
  const items = (data as unknown as Item[]).filter((x) => x.label);
  const [selected, setSelected] = useState<Item | null>(null);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">문장부호</h1>
        <Link href="/table" className="text-sm underline">← 표로</Link>
      </header>

      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-4">
        {items.map((it) => (
          <button
            key={it.id}
            className="rounded-xl border p-3 text-left hover:shadow-sm"
            style={(it.cells?.length === 2) ? { gridColumn: "span 2 / span 2" } : undefined}
            onClick={() => setSelected(it)}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium">{it.label}</span>
              <div className="flex items-center gap-2" aria-hidden>
                {getMasks(it).map((m, idx) => (
                  <BrailleDots key={idx} mask={m} />
                ))}
              </div>
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
          <div className="flex items-center gap-4 flex-wrap" aria-hidden>
            {getMasks(selected).map((m, idx) => (
              <BrailleDots key={idx} mask={m} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}



