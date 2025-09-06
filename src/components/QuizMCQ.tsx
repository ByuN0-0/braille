"use client";
import { FC, useMemo, useState } from "react";
import { BrailleGlyph } from "@/components/BrailleGlyph";

type QuizMCQProps = {
	questionType: "glyph-to-label" | "label-to-glyph";
	label: string;
	answerMask: number;
	choices: { label: string; mask: number }[]; // 4지선다
};

export const QuizMCQ: FC<QuizMCQProps> = ({ questionType, label, answerMask, choices }) => {
	const [selected, setSelected] = useState<number | null>(null);
	const correct = useMemo(() => selected != null && choices[selected].mask === answerMask, [selected, choices, answerMask]);

	return (
		<div className="space-y-3">
			<div className="flex items-center gap-3">
				{questionType === "label-to-glyph" ? (
					<h3 className="text-xl font-semibold">{label}</h3>
				) : (
					<div className="flex items-center gap-2">
						<BrailleGlyph mask={answerMask} />
						<span className="text-sm text-gray-600">이(가) 의미하는 것은?</span>
					</div>
				)}
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
				{choices.map((c, idx) => (
					<button
						key={idx}
						className={`rounded-xl border p-3 text-left hover:shadow-sm transition ${selected === idx ? (correct ? "border-green-600" : "border-red-600") : ""}`}
						onClick={() => setSelected(idx)}
					>
						{questionType === "label-to-glyph" ? (
							<div className="flex items-center gap-2">
								<BrailleGlyph mask={c.mask} />
								<span className="text-sm">{c.label}</span>
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


