'use client';

// ─── [교차 타입 (Intersection Type)] ─────────────────────────────────
// JavaScript: function Error({ error, reset }) { ... }
// TypeScript: error.tsx는 Next.js가 정해놓은 Props 구조가 있습니다.
//
// 핵심: error의 타입은 단순 Error가 아니라 "교차 타입"입니다.
//
// 교차 타입 A & B = A의 모든 속성 + B의 모든 속성을 동시에 가지는 타입
//
// Error 타입:          { message: string; name: string; stack?: string }
// { digest?: string }: { digest?: string }
// Error & { digest?: string }: 위 두 타입을 모두 가짐
//
// interface ErrorProps {
//   error: Error & { digest?: string };  ← 교차 타입
//   reset: () => void;                   ← 인자 없고 반환값 없는 함수
// }

// TODO: ErrorProps 타입을 정의하세요.
// 힌트: error는 Error와 { digest?: string }의 교차 타입입니다.

// TODO: 함수 매개변수에 타입 어노테이션을 추가하세요.
export default function Error({ error, reset }) {   // ← 타입 없음 (에러 발생)
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
