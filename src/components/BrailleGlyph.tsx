import { FC } from "react";
import { maskToUnicode } from "@/lib/braille";

type BrailleGlyphProps = {
	mask: number;
	label?: string;
	className?: string;
	highlight?: boolean; // 유니코드 배경 하이라이트
};

export const BrailleGlyph: FC<BrailleGlyphProps> = ({ mask, label, className, highlight = true }) => {
	const glyph = maskToUnicode(mask);
	return (
		<div className={`flex items-center gap-3 ${className ?? ""}`}>
			<span aria-hidden className={`text-4xl ${highlight ? "inline-block rounded px-1 bg-yellow-200/60 dark:bg-yellow-400/20" : ""}`}>{glyph}</span>
			<span className="text-sm text-gray-600">
				{label ? label + " " : ""}
				<code className="px-1 py-0.5 rounded bg-black/[.05] dark:bg-white/[.06]">{glyph}</code>
			</span>
		</div>
	);
};

export default BrailleGlyph;


