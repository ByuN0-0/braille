"use client";
import { useState } from "react";
import data from "@/data/words.json";
import { maskToUnicode } from "@/lib/braille";
import BrailleDots from "@/components/BrailleDots";
import Link from "next/link";
import type { GlyphItem } from "@/lib/types";

export default function WordsPage() {
  const items = (data as unknown as GlyphItem[]).filter((w) => w.label);
  const [selected, setSelected] = useState<GlyphItem | null>(null);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">단어</h1>
        <Link href="/learn" className="text-sm underline">← 목록</Link>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it) => (
          <button
            key={it.id}
            className="rounded-xl border p-3 text-left hover:shadow-sm"
            onClick={() => setSelected(it)}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold">{it.label}</span>
              <span className="text-2xl" aria-hidden>{it.masks.map((m) => maskToUnicode(m)).join("")}</span>
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
            <span className="text-3xl" aria-hidden>{selected.masks.map((m) => maskToUnicode(m)).join("")}</span>
            <div className="flex items-center gap-4">
              {selected.masks.map((m, idx) => (
                <BrailleDots key={idx} mask={m} />
              ))}
            </div>
          </div>
          {selected.examples?.length ? (
            <p className="text-sm text-gray-700">예시: {selected.examples.join(", ")}</p>
          ) : null}
          <div className="mt-3">
            <Link href={`/practice/input?section=words&id=${selected.id}`} className="px-3 py-2 rounded border inline-block">바로 연습</Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}


