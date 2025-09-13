// 정답 판정: 배열 길이와 원소 일치(순서 무시)로 간단 비교
export const equalMasks = (a: number[], b: number[]) => a.length === b.length && a.every((m) => b.includes(m));


