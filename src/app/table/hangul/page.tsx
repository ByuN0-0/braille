"use client";
import { useState } from "react";
import consonantsInitial from "@/data/consonants-initial.json";
import consonantsFinal from "@/data/consonants-final.json";
import vowels from "@/data/vowels.json";
import type { GlyphItem } from "@/lib/types";
import BrailleDots from "@/components/BrailleDots";
import Link from "next/link";

type SimpleItem = { id: string; label: string; masks: number[]; cellsLen?: number };

export default function HangulTablePage() {
  const initials = (consonantsInitial as unknown as (GlyphItem & { cells?: { masks: number[] }[] })[]).map((x) => ({ id: x.id, label: x.label, masks: x.masks, cellsLen: x?.cells?.length }));
  const finals = (consonantsFinal as unknown as (GlyphItem & { cells?: { masks: number[] }[] })[]).map((x) => ({ id: x.id, label: x.label, masks: x.masks, cellsLen: x?.cells?.length }));
  const vowelsAll = (vowels as unknown as (GlyphItem & { cells?: { masks: number[] }[] })[]).map((x) => ({ id: x.id, label: x.label, masks: x.masks, cellsLen: x?.cells?.length }));
  const [selected, setSelected] = useState<SimpleItem | null>(null);

  const Section = ({ title, items }: { title: string; items: SimpleItem[] }) => (
    <section className="space-y-3">
      <h2 className="text-base font-semibold">{title}</h2>
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-4">
        {items.map((it) => (
          <button
            key={it.id}
            className="rounded-xl border p-3 text-left hover:shadow-sm"
            style={it.cellsLen === 2 ? { gridColumn: "span 2 / span 2" } : undefined}
            onClick={() => setSelected(it)}
          >
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
    </section>
  );

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">한글</h1>
        <Link href="/table" className="text-sm underline">← 표로</Link>
      </header>

      <Section title="초성" items={initials} />
      <Section title="종성" items={finals} />
      <Section title="모음" items={vowelsAll} />

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



