import Link from "next/link";
import { FC, ReactNode } from "react";

type CardProps = {
	title: string;
	description?: string;
	href?: string;
	badge?: ReactNode;
	children?: ReactNode;
	className?: string;
};

export const Card: FC<CardProps> = ({ title, description, href, badge, children, className }) => {
	const content = (
		<div className={`rounded-xl card p-4 transition ${className ?? ""}`}>
			<div className="flex items-center justify-between gap-3 mb-2">
				<h3 className="text-lg font-semibold">{title}</h3>
				{badge}
			</div>
			{description ? <p className="text-sm text-gray-600 mb-3">{description}</p> : null}
			{children}
		</div>
	);

	return href ? (
		<Link href={href} className="block focus-visible:outline-2 focus-visible:outline-blue-600 rounded-xl">
			{content}
		</Link>
	) : (
		content
	);
};

export default Card;


