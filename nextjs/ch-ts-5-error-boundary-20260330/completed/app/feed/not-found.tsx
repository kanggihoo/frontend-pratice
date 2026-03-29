// not-found.tsx — Next.js 특수 파일
// Props가 없습니다. 타입 정의 불필요.
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
