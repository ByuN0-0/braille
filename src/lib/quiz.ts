export type SimpleItem = { id: string; label: string; masks: number[] };

export type MCQChoice = { label: string; mask?: number; masks?: number[] };
export type MCQQuestion = {
  questionType: "glyph-to-label" | "label-to-glyph";
  label: string;
  subtitle?: string;
  answerMask?: number;
  answerMasks?: number[];
  choices: MCQChoice[];
};

export function pickRandom<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  const result: T[] = [];
  while (result.length < n && copy.length) {
    const idx = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(idx, 1)[0]);
  }
  return result;
}

export function normalizeToSimple(items: Array<{ id: string; label: string; mask?: number; masks?: number[] }>): SimpleItem[] {
  return items.map((x) => ({ id: x.id, label: x.label, masks: x.masks ?? (typeof x.mask === "number" ? [x.mask] : []) }));
}

export function buildChoices(pool: SimpleItem[], correct: SimpleItem): MCQChoice[] {
  const distractors = pickRandom(pool.filter((x) => x.id !== correct.id), 3);
  const insertIdx = Math.floor(Math.random() * 4);
  const merged = [...distractors.slice(0, insertIdx), correct, ...distractors.slice(insertIdx)];
  return merged.map((m) => (m.masks.length > 1 ? { label: m.label, masks: m.masks } : { label: m.label, mask: m.masks[0] }));
}

export function makeMcqQuestion(
  pool: SimpleItem[],
  opts?: {
    subtitleResolver?: (item: SimpleItem) => string | undefined;
    questionType?: "glyph-to-label" | "label-to-glyph";
    pickItem?: (pool: SimpleItem[]) => SimpleItem;
  }
): MCQQuestion {
  const pickItem = opts?.pickItem ?? ((p: SimpleItem[]) => pickRandom(p, 1)[0]);
  const q = pickItem(pool);
  const subtitle = opts?.subtitleResolver?.(q);
  const questionType = opts?.questionType ?? (Math.random() > 0.5 ? "label-to-glyph" : "glyph-to-label");
  const choices = buildChoices(pool, q);
  return {
    questionType,
    label: q.label,
    subtitle,
    ...(q.masks.length > 1 ? { answerMasks: q.masks } : { answerMask: q.masks[0] }),
    choices,
  };
}


