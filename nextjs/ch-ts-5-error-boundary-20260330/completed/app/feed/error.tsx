'use client';

// ─── 교차 타입(Intersection Type) ────────────────────────────────
// Error & { digest?: string }
//   - Error: 기본 JS Error 타입 (message, name, stack)
//   - & { digest?: string }: Next.js가 서버 에러에 추가하는 선택적 식별자
//   - 두 타입을 합쳐 "모든 속성을 동시에 갖는" 새 타입을 만든다

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-red-700 mb-2">오류가 발생했습니다</h2>
        <p className="text-red-600 mb-1">{error.message}</p>
        {error.digest && (
          <p className="text-xs text-red-400 mb-4">에러 ID: {error.digest}</p>
        )}
        <button
          onClick={reset}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          다시 시도
        </button>
      </div>
    </main>
  );
}
