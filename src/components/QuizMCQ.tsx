"use client";
import { FC, useMemo, useState } from "react";
import { maskToUnicode } from "@/lib/braille";
import BrailleDots from "@/components/BrailleDots";

type Choice = { label: string; mask?: number; masks?: number[] };
export type QuizMCQProps = {
	questionType: "glyph-to-label" | "label-to-glyph";
	label: string;
	subtitle?: string;
	answerMask?: number;
	answerMasks?: number[];
	choices: Choice[]; // 4지선다
};

const renderGlyph = (mask?: number, masks?: number[]) => {
	const arr = masks ?? (typeof mask === "number" ? [mask] : []);
	if (arr.length === 0) return null;
	const unicode = arr.map((m) => maskToUnicode(m)).join("");
	return (
		<div className="flex items-center gap-3">
			<span className="text-4xl inline-block rounded px-1 bg-yellow-200/60 dark:bg-yellow-400/20" aria-hidden>{unicode}</span>
			<div className="flex items-center gap-2">
				{arr.map((m, i) => (
					<BrailleDots key={i} mask={m} />
				))}
			</div>
		</div>
	);
};

export const QuizMCQ: FC<QuizMCQProps> = ({ questionType, label, subtitle, answerMask, answerMasks, choices }) => {
	const [selected, setSelected] = useState<number | null>(null);
	const correct = useMemo(() => selected != null && (
		choices[selected].mask != null
			? choices[selected].mask === answerMask
			: JSON.stringify(choices[selected].masks) === JSON.stringify(answerMasks)
	), [selected, choices, answerMask, answerMasks]);

	return (
		<div className="space-y-3">
			<div className="flex flex-col gap-1">
				<div className="flex items-center gap-3">
				{questionType === "label-to-glyph" ? (
					<h3 className="text-xl font-semibold">{`'${label}'의 점자는?`}</h3>
				) : (
					<div className="flex items-center gap-4">
						{renderGlyph(answerMask, answerMasks)}
						<span className="text-sm text-gray-600">이(가) 의미하는 것은?</span>
					</div>
				)}
				</div>
				{subtitle ? <span className="text-xs text-gray-500">{subtitle}</span> : null}
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
				{choices.map((c, idx) => (
					<button
						key={idx}
						className={`rounded-xl border p-3 text-left hover:shadow-sm transition ${selected === idx ? (correct ? "border-green-600" : "border-red-600") : ""}`}
						onClick={() => setSelected(idx)}
					>
						{questionType === "label-to-glyph" ? (
							<div className="flex items-center gap-3">
								{renderGlyph(c.mask, c.masks)}
							</div>
						) : (
							<span className="text-sm">{c.label}</span>
						)}
					</button>
				))}
			</div>
			{selected != null ? (
				<p className={`text-sm ${correct ? "text-green-600" : "text-red-600"}`}>{correct ? "정답입니다" : "오답입니다"}</p>
			) : null}
		</div>
	);
};

export default QuizMCQ;


