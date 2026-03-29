// ─── [loading.tsx — Props 없는 특수 파일] ─────────────────────────
// Next.js의 loading.tsx는 해당 세그먼트가 로딩 중일 때 자동으로 표시됩니다.
// 이 파일은 Props를 받지 않습니다 — 타입 정의가 필요 없습니다.
//
// JavaScript: export default function Loading() { ... }
// TypeScript: 동일합니다. Props 타입 정의가 없어도 됩니다.
//
// 비교: error.tsx는 props가 있어서 타입 정의가 필요합니다.
//       loading.tsx와 not-found.tsx는 props가 없어서 그대로 사용합니다.

export default function Loading() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-400">피드 로딩 중...</h1>
      <ul className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="bg-white rounded-lg p-4 shadow border border-gray-200 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-100 rounded w-full" />
            <div className="h-3 bg-gray-100 rounded w-5/6 mt-1" />
          </li>
        ))}
      </ul>
    </main>
  );
}
