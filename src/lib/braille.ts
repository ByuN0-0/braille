// 6점: 1..6 → (1<<(d-1)) 비트 On
export const maskToUnicode = (mask: number) => String.fromCharCode(0x2800 + mask);

// 전역 사전형 매핑은 데이터(JSON)로 관리합니다. 필요 시 여기에 헬퍼만 둡니다.

// 정답 판정: 배열 길이와 원소 일치(순서 무시)로 간단 비교
export const equalMasks = (a: number[], b: number[]) => a.length === b.length && a.every((m) => b.includes(m));

// 수표(숫자표): 점 3-4-5-6
export const NUMBER_SIGN_MASK = 0b111100; // 60

// 영문 점자 숫자 규칙과 동일하게 1..0은 a..j 패턴 사용
export const DIGIT_MASKS: Record<string, number> = {
	"1": 0b000001, // 1
	"2": 0b000011, // 1,2
	"3": 0b01001, // 1,4 => 0b01001 = 9
	"4": 0b11001, // 1,4,5 => 25
	"5": 0b10001, // 1,5 => 17
	"6": 0b01011, // 1,2,4 => 11
	"7": 0b11011, // 1,2,4,5 => 27
	"8": 0b10011, // 1,2,5 => 19
	"9": 0b01010, // 2,4 => 10
	"0": 0b11010, // 2,4,5 => 26
};

export const masksToUnicode = (masks: number[]) => masks.map((m) => maskToUnicode(m)).join("");


