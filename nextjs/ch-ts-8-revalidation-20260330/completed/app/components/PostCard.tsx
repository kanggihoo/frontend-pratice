import Link from 'next/link';
import type { Post } from '@/lib/types';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
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
