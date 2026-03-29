// loading.tsx — Next.js 특수 파일
// Props가 없습니다. 타입 정의 불필요.
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
