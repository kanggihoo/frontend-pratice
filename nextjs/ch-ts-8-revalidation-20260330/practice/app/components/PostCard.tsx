import Link from 'next/link';

// ─── [Props 타입 정의] ─────────────────────────────────────────────────────────
// JavaScript: function PostCard({ post }) { ... }
// TypeScript: Props를 interface로 먼저 정의하고 함수 매개변수에 적용합니다.
//
// TODO: PostCardProps 인터페이스를 정의하세요.
// 힌트: post 속성의 타입은 lib/types.ts에서 정의한 Post 인터페이스입니다.
// import type { Post } from '@/lib/types';
// interface PostCardProps { post: Post; }

// TODO: 함수 매개변수에 타입 어노테이션을 추가하세요.
// 힌트: function PostCard({ post }: PostCardProps) { ... }

export default function PostCard({ post }) {   // ← 타입 없음 (에러 발생)
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
        <p className="text-xs text-gray-400 mb-1">#{post.id}</p>
        <h2 className="font-semibold text-gray-800 mb-2 line-clamp-1">{post.title}</h2>
        <p className="text-sm text-gray-500 line-clamp-2">{post.body}</p>
        <span className="mt-3 inline-block text-xs text-blue-500 font-medium">댓글 보기 →</span>
      </div>
    </Link>
  );
}
