"use client";
import consonantsInitial from "@/data/consonants-initial.json";
import consonantsFinal from "@/data/consonants-final.json";
import abbreviations from "@/data/abbreviations.json";
import abbrPhrases from "@/data/abbr-phrases.json";
import vowels from "@/data/vowels.json";
import numbers from "@/data/numbers.json";
import type { GlyphItem } from "@/lib/types";
import BrailleDots from "@/components/BrailleDots";

type SimpleItem = { id: string; label: string; masks: number[] };

function Cell({ item, span = 1 }: { item: SimpleItem; span?: number }) {
  return (
    <div
      className="border rounded-lg p-2 min-h-[84px] flex flex-col items-center justify-between"
      style={span > 1 ? { gridColumn: `span ${span} / span ${span}` } : undefined}
    >
      <div className="text-sm font-medium truncate max-w-full">{item.label}</div>
      {/* 유니코드 표시 제거 */}
      <div className="sr-only" aria-hidden>
        점자 미리보기
      </div>
      <div className="flex gap-1 mt-1">
        {item.masks.map((m, i) => (
          <BrailleDots key={i} mask={m} />
        ))}
      </div>
    </div>
  );
}

function Grid({ title, items, cols = 10, getSpan }: { title: string; items: SimpleItem[]; cols?: number; getSpan?: (item: SimpleItem) => number }) {
  return (
    <section className="space-y-2">
      <h3 className="text-base font-semibold">{title}</h3>
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridAutoFlow: "dense",
        }}
      >
        {items.map((it) => (
          <Cell key={it.id} item={it} span={Math.max(1, getSpan ? getSpan(it) : 1)} />
        ))}
      </div>
    </section>
  );
}

export default function BrailleTablePage() {
  const initials = (consonantsInitial as unknown as GlyphItem[]).map((x) => ({ id: x.id, label: x.label, masks: x.masks }));
  const finals = (consonantsFinal as unknown as GlyphItem[]).map((x) => ({ id: x.id, label: x.label, masks: x.masks }));
  const vowelsAll = (vowels as unknown as GlyphItem[]).map((x) => ({ id: x.id, label: x.label, masks: x.masks }));
  const numbersAll = (numbers as unknown as GlyphItem[]).map((n) => ({ id: n.id, label: n.label, masks: n.masks }));
  const abbrsRaw = (abbreviations as unknown as { id: string; label: string; masks: number[]; cells?: { masks: number[] }[] }[]);
  const abbrs = abbrsRaw.map((x) => ({ id: x.id, label: x.label, masks: x.masks }));
  const abbrCellsById = Object.fromEntries(abbrsRaw.map((x) => [x.id, Math.max(1, Math.min(2, x.cells?.length ?? 1))]));
  const abbrPhraseItems = (abbrPhrases as unknown as { id: string; label: string; cells: { masks: number[] }[] }[]).map((p) => ({ id: p.id, label: p.label, masks: p.cells.flatMap((c) => c.masks) }));

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">점자표</h1>
        <p className="text-sm text-gray-600">데이터 기반 자동 생성. 인쇄 친화적 그리드 레이아웃.</p>
      </header>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">자음</h2>
        <Grid title="초성" items={initials} cols={8} />
        <Grid title="종성" items={finals} cols={8} />
      </section>
      <Grid title="모음" items={vowelsAll} cols={10} getSpan={(it) => Math.min(2, it.masks.length)} />
      <Grid title="약자" items={abbrs} cols={10} getSpan={(it) => abbrCellsById[it.id] ?? 1} />
      <Grid title="약어" items={abbrPhraseItems} cols={6} />
      <Grid title="숫자" items={numbersAll} cols={10} />
    </div>
  );
}


