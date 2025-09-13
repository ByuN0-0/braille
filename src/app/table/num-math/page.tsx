"use client";
import { useState } from "react";
import numbers from "@/data/numbers.json";
import math from "@/data/math.json";
import type { GlyphItem } from "@/lib/types";
import BrailleDots from "@/components/BrailleDots";
import Link from "next/link";

type SimpleItem = { id: string; label: string; masks: number[]; cellsLen?: number };

function normalize(arr: unknown): SimpleItem[] {
  const raw = arr as { id: string; label: string; masks?: number[]; cells?: { masks: number[] }[] }[];
  return raw.map((x) => ({ id: x.id, label: x.label, masks: x.masks ?? x.cells?.flatMap((c) => c.masks) ?? [], cellsLen: x?.cells?.length }));
}

export default function NumMathPage() {
  const nums = (numbers as unknown as GlyphItem[]).map((n) => ({ id: n.id, label: n.label, masks: n.masks }));
  const signs = normalize(math);
  const items: SimpleItem[] = [...nums, ...signs];
  const [selected, setSelected] = useState<SimpleItem | null>(null);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">숫자/기호</h1>
        <Link href="/table" className="text-sm underline">← 표로</Link>
      </header>

      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-4">
        {items.map((it) => (
          <button key={it.id} className="rounded-xl border p-3 text-left hover:shadow-sm" style={it.cellsLen === 2 ? { gridColumn: "span 2 / span 2" } : undefined} onClick={() => setSelected(it)}>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium">{it.label}</span>
              <div className="flex items-center gap-2" aria-hidden>
                {it.masks.map((m, idx) => (
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
            {selected.masks.map((m, idx) => (
              <BrailleDots key={idx} mask={m} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}



