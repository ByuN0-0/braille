import { FC } from "react";

type ProgressBadgeProps = {
	total: number;
	solved: number;
	className?: string;
};

export const ProgressBadge: FC<ProgressBadgeProps> = ({ total, solved, className }) => {
	const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
	return (
		<span
			className={`inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full border bg-black/[.03] dark:bg-white/[.06] ${className ?? ""}`}
			title={`진행률 ${pct}%`}
		>
			<span className="inline-block w-16 h-1.5 rounded bg-black/[.08] dark:bg-white/[.12] overflow-hidden">
				<span
					className="block h-full bg-foreground"
					style={{ width: `${pct}%` }}
				/>
			</span>
			<b>{solved}/{total}</b>
			<span>({pct}%)</span>
		</span>
	);
};

export default ProgressBadge;


