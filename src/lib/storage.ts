type SectionKey = "consonants" | "vowels" | "numbers" | "words";

export const getProgress = (section: SectionKey) => {
	if (typeof window === "undefined") return { total: 0, solved: 0 };
	const raw = localStorage.getItem(`progress:${section}`);
	return raw ? JSON.parse(raw) : { total: 0, solved: 0 };
};

export const setProgress = (section: SectionKey, total: number, solved: number) => {
	if (typeof window === "undefined") return;
	localStorage.setItem(`progress:${section}`, JSON.stringify({ total, solved }));
};


