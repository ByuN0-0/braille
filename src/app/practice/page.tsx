import Link from "next/link";

export default function PracticeIndex() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">연습</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/practice/input" className="rounded-xl border p-4 hover:shadow-sm transition block">
          <h3 className="text-lg font-semibold mb-1">입력형</h3>
          <p className="text-sm text-gray-600">DotPad로 점자 입력 후 즉시 판정</p>
        </Link>
        <Link href="/practice/choice" className="rounded-xl border p-4 hover:shadow-sm transition block">
          <h3 className="text-lg font-semibold mb-1">선택형</h3>
          <p className="text-sm text-gray-600">4지선다, 즉시 피드백</p>
        </Link>
        <Link href="/practice/mix" className="rounded-xl border p-4 hover:shadow-sm transition block">
          <h3 className="text-lg font-semibold mb-1">혼합</h3>
          <p className="text-sm text-gray-600">입력/선택 혼합 5문항</p>
        </Link>
      </div>
    </div>
  );
}


