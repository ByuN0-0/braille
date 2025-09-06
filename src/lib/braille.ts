// 6점: 1..6 → (1<<(d-1)) 비트 On
export const maskToUnicode = (mask: number) => String.fromCharCode(0x2800 + mask);

// 예: 점자 미리보기용 간단 맵(실제 완전 매핑은 추후 확장)
export const BRAILLE_MAP: Record<string, number> = {
	"ㄱ": 0b000001, // 점1
	"ㄴ": 0b000011, // 점1,2
	"ㄷ": 0b000101, // 점1,3
	"ㄹ": 0b000111, // 점1,2,3
	"ㅁ": 0b000010, // 점2
	"ㅅ": 0b000100, // 점3
	"ㅏ": 0b010010, // 점2,5
	"ㅣ": 0b010001, // 점1,5
	"1": 0b000001, // 숫자표 규칙 적용 전 간이 표시(실학습에선 숫자표 선행)
};

// 정답 판정: 배열 길이와 원소 일치(순서 무시)로 간단 비교
export const equalMasks = (a: number[], b: number[]) => a.length === b.length && a.every((m) => b.includes(m));


