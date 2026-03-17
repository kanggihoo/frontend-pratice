import Link from "next/link";

export default function PostCard({ post }) {
  return (
    // ─── [UI 스타일링] ──────────────────────────────
    // Tailwind CSS로 게시글 카드를 꾸며보세요.
    // 카드에는 그림자, 둥근 모서리, 호버 효과를 적용하세요.
    // 힌트: bg-white rounded-xl shadow-sm border border-gray-100 p-5
    //       hover:shadow-md hover:border-blue-200 transition-all
    <Link href={`/posts/${post.id}`} className="block">
      <div className="">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {post.content}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="font-medium text-gray-500">{post.author}</span>
          <div className="flex items-center gap-3">
            <span>댓글 {post.commentCount}개</span>
            <span>
              {new Date(post.createdAt).toLocaleDateString("ko-KR")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
