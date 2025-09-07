import { FC } from "react";
import BrailleDots from "@/components/BrailleDots";

type BrailleGlyphProps = {
	mask: number;
	label?: string;
	className?: string;
	highlight?: boolean; // 강조 배경
	labelFirst?: boolean; // 라벨을 왼쪽에 표시
};

export const BrailleGlyph: FC<BrailleGlyphProps> = ({ mask, label, className, highlight = false, labelFirst = false }) => {
	return (
		<div className={`flex items-center gap-3 ${className ?? ""}`}>
			{labelFirst && label ? <span className="text-sm text-gray-600">{label}</span> : null}
			<span aria-hidden className={`${highlight ? "inline-block rounded px-1 bg-yellow-200/60 dark:bg-yellow-400/20" : ""}`}>
				<BrailleDots mask={mask} />
			</span>
			{!labelFirst && label ? <span className="text-sm text-gray-600">{label}</span> : null}
		</div>
	);
};

export default BrailleGlyph;


