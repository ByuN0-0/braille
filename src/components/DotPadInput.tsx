"use client";
import { FC, useCallback } from "react";

type DotPadInputProps = {
	value: number;
	onChange: (mask: number) => void;
	className?: string;
};

const toggleDot = (mask: number, dot: number) => mask ^ (1 << (dot - 1));

export const DotPadInput: FC<DotPadInputProps> = ({ value, onChange, className }) => {
	const onKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			const key = e.key;
			if (key >= "1" && key <= "6") {
				e.preventDefault();
				const d = Number(key);
				onChange(toggleDot(value, d));
			}
			if (key === "0") {
				e.preventDefault();
				onChange(0);
			}
		},
		[value, onChange]
	);

	return (
		<div
			role="group"
			aria-label="점자 6점 입력 패드"
			tabIndex={0}
			onKeyDown={onKeyDown}
			className={`inline-flex flex-col items-center gap-3 outline-none ${className ?? ""}`}
		>
			<div className="grid grid-cols-2 grid-rows-3 gap-2">
				{[1, 4, 2, 5, 3, 6].map((d) => {
					const on = ((value >> (d - 1)) & 1) === 1;
					return (
						<button
							key={d}
							type="button"
							onClick={() => onChange(toggleDot(value, d))}
							className={`w-10 h-10 rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 ${on ? "bg-foreground" : "bg-transparent"}`}
							aria-pressed={on}
							aria-label={`점 ${d} ${on ? "켜짐" : "꺼짐"}`}
						/>
					);
				})}
			</div>
			<div className="text-xs text-gray-600" aria-hidden>
				숫자 1~6 키로 토글, 0으로 초기화
			</div>
		</div>
	);
};

export default DotPadInput;


