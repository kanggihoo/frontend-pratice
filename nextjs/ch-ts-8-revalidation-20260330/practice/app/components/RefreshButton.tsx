'use client';

import { useTransition } from 'react';
import { refreshPosts } from '@/lib/actions';

// ─── [Props 타입 정의] ─────────────────────────────────────────────────────────
// TODO: RefreshButtonProps 인터페이스를 정의하세요.
//
// 속성 목록:
//   label   — 선택적 string (버튼 텍스트, 기본값은 '전체 새로고침')
//   onRefresh — 선택적 콜백 함수 (인자 없고 반환값 없음)
//
// 힌트:
//   선택적 속성: label?: string
//   함수 타입:   onRefresh?: () => void

// TODO: 함수 매개변수에 타입 어노테이션을 추가하세요.

export default function RefreshButton({ label = '전체 새로고침', onRefresh }) {   // ← 타입 없음
  const [isPending, startTransition] = useTransition();

  // ─── [이벤트 핸들러 반환 타입] ────────────────────────────────────
  // JavaScript: const handleClick = () => { ... }
  // TypeScript: const handleClick = (): void => { ... }
  // 반환값이 없는 함수는 void를 명시합니다.
  //
  // TODO: handleClick의 반환 타입을 void로 명시하세요.

  const handleClick = () => {
    startTransition(async () => {
      await refreshPosts();
      onRefresh?.();
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isPending ? '갱신 중...' : label}
    </button>
  );
}
