'use client';

import { useTransition } from 'react';
import { refreshPosts } from '@/lib/actions';
import type { ActionResult } from '@/lib/types';

// ─── Props 타입 ─────────────────────────────────────────────────
// onRefresh: refreshPosts()는 Promise<void>를 반환하므로 콜백 타입도 동일하게
// onResult: ActionResult를 받아 부모에게 결과를 알릴 수도 있지만
//           여기서는 단순히 void 반환 콜백으로 처리합니다.

interface RefreshButtonProps {
  label?: string;
  onRefresh?: () => void;
}

export default function RefreshButton({ label = '전체 새로고침', onRefresh }: RefreshButtonProps) {
  // useTransition: 비동기 상태 전환 중 isPending을 제공
  // startTransition의 콜백: () => void
  const [isPending, startTransition] = useTransition();

  const handleClick = (): void => {
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
