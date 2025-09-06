export type ItemType = "consonant" | "vowel" | "number" | "word";

export type GlyphItem = {
	id: string;
	label: string; // “ㄱ”, “ㅏ”, “1”, “물”
	type: ItemType;
	masks: number[]; // 단일 글자면 길이 1. 합성 시 여러 개 허용.
	examples?: string[];
	notes?: string;
};


