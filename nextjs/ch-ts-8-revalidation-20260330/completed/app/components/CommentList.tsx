import type { Comment } from '@/lib/types';

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
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
