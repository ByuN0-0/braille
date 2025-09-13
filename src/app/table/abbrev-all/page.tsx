"use client";
import { useState } from "react";
import abbreviations from "@/data/abbreviations.json";
import abbrPhrases from "@/data/abbr-phrases.json";
import BrailleDots from "@/components/BrailleDots";
import Link from "next/link";

type SimpleItem = { id: string; label: string; masks: number[]; cellsLen?: number };

function normalizeAbbr(): SimpleItem[] {
  const raw = abbreviations as unknown as { id: string; label: string; masks?: number[]; cells?: { masks: number[] }[] }[];
  return raw.map((x) => ({ id: x.id, label: x.label, masks: x.masks ?? x.cells?.flatMap((c) => c.masks) ?? [], cellsLen: x?.cells?.length }));
}

function normalizePhrases(): SimpleItem[] {
  const raw = abbrPhrases as unknown as { id: string; label: string; cells: { masks: number[] }[] }[];
  return raw.map((p) => ({ id: p.id, label: p.label, masks: p.cells.flatMap((c) => c.masks), cellsLen: p.cells?.length }));
}

export default function AbbrevAllPage() {
  const abbr = normalizeAbbr();
  const phrases = normalizePhrases();
  const [selected, setSelected] = useState<SimpleItem | null>(null);

  const Section = ({ title, items }: { title: string; items: SimpleItem[] }) => (
    <section className="space-y-3">
      <h2 className="text-base font-semibold">{title}</h2>
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
    </section>
  );

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">약자/약어</h1>
        <Link href="/table" className="text-sm underline">← 표로</Link>
      </header>

      <Section title="약자" items={abbr} />
      <Section title="약어" items={phrases} />

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



