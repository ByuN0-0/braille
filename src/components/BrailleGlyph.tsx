import { FC } from "react";
import { maskToUnicode } from "@/lib/braille";

type BrailleGlyphProps = {
	mask: number;
	label?: string;
	className?: string;
};

export const BrailleGlyph: FC<BrailleGlyphProps> = ({ mask, label, className }) => {
	const glyph = maskToUnicode(mask);
	return (
		<div className={`flex items-center gap-3 ${className ?? ""}`}>
			<span aria-hidden className="text-4xl">
				{glyph}
			</span>
			<span className="text-sm text-gray-600">
				{label ? label + " " : ""}
				<code className="px-1 py-0.5 rounded bg-black/[.05] dark:bg-white/[.06]">{glyph}</code>
			</span>
		</div>
	);
};

export default BrailleGlyph;


