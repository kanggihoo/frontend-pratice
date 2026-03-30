'use client';

import { useState, useTransition } from 'react';
import { addComment } from '@/lib/actions';

// ─── [Props 타입 정의] ─────────────────────────────────────────────────────────
// TODO: CommentFormProps 인터페이스를 정의하세요.
// 힌트: postId는 숫자(number) 타입입니다.
// interface CommentFormProps { postId: number; }

// TODO: 함수 매개변수에 타입 어노테이션을 추가하세요.

export default function CommentForm({ postId }) {   // ← 타입 없음 (에러 발생)

  // ─── [useState 제네릭 타입] ───────────────────────────────────────
  // JavaScript: const [result, setResult] = useState(null);
  // TypeScript: useState에 제네릭으로 타입을 명시합니다.
  //
  // TODO: useState의 타입을 ActionResult | null 로 명시하세요.
  // 힌트: useState<ActionResult | null>(null)
  // ActionResult는 lib/types.ts에서 import해야 합니다.

  const [result, setResult] = useState(null);   // ← 제네릭 타입 없음
  const [isPending, startTransition] = useTransition();

  // ─── [이벤트 타입] ────────────────────────────────────────────────
  // JavaScript: const handleSubmit = (e) => { ... }
  // TypeScript: form submit 이벤트의 타입은 React.FormEvent<HTMLFormElement>
  //
  // TODO: e의 타입을 React.FormEvent<HTMLFormElement>로 명시하세요.
  // 반환 타입은 void입니다.

  const handleSubmit = (e) => {   // ← 타입 없음 (에러 발생)
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await addComment(formData);
      setResult(res);

      if (res.success) {
        (e.target as HTMLFormElement).reset();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3">
      <h3 className="font-semibold text-gray-700">댓글 작성</h3>
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

      {result && (
        <p className={`text-sm ${result.success ? 'text-green-600' : 'text-red-500'}`}>
          {result.message}
        </p>
      )}
    </form>
  );
}
