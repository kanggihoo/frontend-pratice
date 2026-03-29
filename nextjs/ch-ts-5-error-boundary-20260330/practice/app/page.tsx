import Link from 'next/link';

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">5회차 — ErrorBoundary & 교차 타입</h1>
      <div className="space-y-4">
        <Link
          href="/feed"
          className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
        >
          <h2 className="font-semibold text-lg">일반 피드 보기</h2>
          <p className="text-gray-600 text-sm mt-1">loading.tsx 데모 — 1.5초 딜레이</p>
        </Link>
        <Link
          href="/feed?error=true"
          className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-red-200"
        >
          <h2 className="font-semibold text-lg text-red-600">에러 피드 보기</h2>
          <p className="text-gray-600 text-sm mt-1">error.tsx 데모 — 의도적 에러 발생</p>
        </Link>
      </div>
    </main>
  );
}
