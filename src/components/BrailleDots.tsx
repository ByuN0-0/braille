import { FC } from "react";

type BrailleDotsProps = {
	mask: number;
	className?: string;
};

const isDotOn = (mask: number, dotIndex: number) => ((mask >> (dotIndex - 1)) & 1) === 1;

export const BrailleDots: FC<BrailleDotsProps> = ({ mask, className }) => {
	return (
		<div className={`grid grid-cols-2 grid-rows-3 gap-2 ${className ?? ""}`} aria-hidden>
			{[1, 4, 2, 5, 3, 6].map((d) => {
				const on = isDotOn(mask, d);
				return (
					<span
						key={d}
						className={`inline-block w-4 h-4 rounded-full border ${on ? "bg-foreground" : "bg-transparent"}`}
					></span>
				);
			})}
		</div>
	);
};

export default BrailleDots;


