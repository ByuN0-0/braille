"use client";
import { FC, useEffect, useMemo, useState } from "react";
import { DotPadInput } from "@/components/DotPadInput";
import { BrailleGlyph, } from "@/components/BrailleGlyph";
import { equalMasks } from "@/lib/braille";

type QuizInputProps = {
	label: string; // 문제 라벨 (글자 또는 단어)
	answerMasks: number[]; // 정답 마스크 배열(단어는 여러 글자)
	subtitle?: string; // 힌트(예: 초성/종성)
	onResolved?: (result: { correct: boolean }) => void;
};

export const QuizInput: FC<QuizInputProps> = ({ label, answerMasks, subtitle, onResolved }) => {
	const [inputMask, setInputMask] = useState(0);
	const [history, setHistory] = useState<{ correct: boolean; given: number }[]>([]);
	const isCorrect = useMemo(() => equalMasks([inputMask], [answerMasks[0]]), [inputMask, answerMasks]);

	// 문제 변경 시 입력값/기록 초기화
	const answersKey = useMemo(() => answerMasks.join(","), [answerMasks]);
	useEffect(() => {
		setInputMask(0);
		setHistory([]);
	// answerMasks 배열 변경을 안정적으로 감지
	}, [label, answersKey]);

	return (
		<div className="space-y-3">
			<div>
				<p className="text-sm text-gray-700">다음에 해당하는 점자를 입력하세요</p>
				<h3 className="text-xl font-semibold">{label}</h3>
				{subtitle ? <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p> : null}
			</div>
			<DotPadInput value={inputMask} onChange={setInputMask} />
			<div className="flex items-center gap-3">
				<BrailleGlyph mask={inputMask} label="입력" />
			</div>
			<div className="flex items-center gap-3 text-sm">
				<button
					type="button"
					className="px-3 py-1.5 rounded border"
					onClick={() => setInputMask(0)}
				>
					초기화
				</button>
				<button
					type="button"
					className="px-3 py-1.5 rounded border"
					onClick={() => setHistory((h) => [{ correct: isCorrect, given: inputMask }, ...h].slice(0, 5))}
				>
					기록
				</button>
				<button
					type="button"
					className="px-3 py-1.5 rounded border bg-blue-50 hover:bg-blue-100"
					onClick={() => onResolved?.({ correct: isCorrect })}
				>
					제출
				</button>
			</div>
			{history.length ? (
				<ul className="text-xs text-gray-600 list-disc list-inside">
					{history.map((h, idx) => (
						<li key={idx}>{h.correct ? "정답" : "오답"} - 입력 마스크 {h.given}</li>
					))}
				</ul>
			) : null}
		</div>
	);
};

export default QuizInput;


