// ─── [not-found.tsx — Props 없는 특수 파일] ───────────────────────
// Next.js의 not-found.tsx는 notFound()를 호출하거나 404가 발생할 때 표시됩니다.
// loading.tsx와 마찬가지로 Props를 받지 않습니다.
//
// TypeScript: 타입 정의 없이 그대로 사용합니다.

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4 text-center">
      <h2 className="text-2xl font-bold mb-2">404 — 피드를 찾을 수 없습니다</h2>
      <p className="text-gray-500 mb-6">요청하신 피드가 존재하지 않습니다.</p>
      <Link href="/" className="text-blue-600 hover:underline">
        홈으로 돌아가기
      </Link>
    </main>
  );
}
