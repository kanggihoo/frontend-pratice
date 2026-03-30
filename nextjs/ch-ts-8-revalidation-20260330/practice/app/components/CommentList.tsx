// ─── [Props 타입 정의] ─────────────────────────────────────────────────────────
// 이 컴포넌트는 댓글 배열을 props로 받습니다.
//
// TODO: CommentListProps 인터페이스를 정의하세요.
// 힌트: comments 속성의 타입은 Comment[] (Comment 배열)입니다.
// import type { Comment } from '@/lib/types';
// interface CommentListProps { comments: Comment[]; }

// TODO: 함수 매개변수에 타입 어노테이션을 추가하세요.

export default function CommentList({ comments }) {   // ← 타입 없음 (에러 발생)
  if (comments.length === 0) {
    return <p className="text-sm text-gray-400 mt-4">아직 댓글이 없습니다.</p>;
  }

  return (
    <ul className="mt-4 space-y-3">
      {comments.map((comment) => (
        <li key={comment.id} className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs font-medium text-gray-700">
            {comment.name}
            <span className="ml-2 font-normal text-gray-400">{comment.email}</span>
          </p>
          <p className="mt-1 text-sm text-gray-600">{comment.body}</p>
        </li>
      ))}
    </ul>
  );
}
