// ─── [searchParams 타입 — Next.js 15+] ────────────────────────────
// JavaScript: async function FeedPage({ searchParams }) { const { error } = searchParams; }
// TypeScript: searchParams는 Next.js 15+에서 Promise 타입입니다.
//
// interface FeedPageProps {
//   searchParams: Promise<{ error?: string }>;  ← Promise로 감싸야 함, ? = 없을 수 있음
// }
// export default async function FeedPage({ searchParams }: FeedPageProps) {
//   const { error } = await searchParams;        ← await 필수
// }

import FeedList from '@/components/FeedList';

// TODO: FeedPageProps 타입을 정의하세요.

// TODO: 함수 매개변수에 타입 어노테이션을 추가하세요.
export default async function FeedPage({ searchParams }) {   // ← 타입 없음 (에러 발생)
  const { error } = await searchParams;
  const shouldError = error === 'true';

  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">
        {shouldError ? '⚠️ 에러 피드' : '📋 피드'}
      </h1>
      <FeedList shouldError={shouldError} />
    </main>
  );
}
