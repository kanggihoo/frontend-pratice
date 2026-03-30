'use client';

import { useState, useTransition } from 'react';
import { addComment } from '@/lib/actions';
import type { ActionResult } from '@/lib/types';

// ─── Props 타입 ─────────────────────────────────────────────────
// postId: 어떤 포스트에 댓글을 달 것인지 식별하는 숫자 ID

interface CommentFormProps {
  postId: number;
}

export default function CommentForm({ postId }: CommentFormProps) {
  // useState<ActionResult | null>: 초기값 null, Server Action 결과를 저장
  const [result, setResult] = useState<ActionResult | null>(null);
  const [isPending, startTransition] = useTransition();

  // FormEvent<HTMLFormElement>: form submit 이벤트 타입
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      // addComment는 Promise<ActionResult>를 반환
      const res: ActionResult = await addComment(formData);
      setResult(res);

      if (res.success) {
        // 성공 시 폼 초기화
        (e.target as HTMLFormElement).reset();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3">
      <h3 className="font-semibold text-gray-700">댓글 작성</h3>

      {/* hidden input으로 postId 전달 */}
      <input type="hidden" name="postId" value={postId} />

      <input
        type="text"
        name="name"
        placeholder="이름"
        required
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <textarea
        name="body"
        placeholder="댓글을 입력하세요"
        required
        rows={3}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
      />

      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 disabled:opacity-50 transition-colors"
      >
        {isPending ? '등록 중...' : '댓글 등록'}
      </button>

      {/* ActionResult에 따라 성공/실패 메시지 표시 */}
      {result && (
        <p className={`text-sm ${result.success ? 'text-green-600' : 'text-red-500'}`}>
          {result.message}
        </p>
      )}
    </form>
  );
}
