import Link from "next/link";
import CommentList from "../../components/CommentList";

const API_URL = "https://jsonplaceholder.typicode.com";

// 빌드 타임에 정적으로 생성할 페이지의 파라미터를 미리 정의합니다.
// 여기서는 1~10번 포스트만 미리 생성(SSG)하고, 나머지는 요청 시 동적으로 생성됩니다.
export async function generateStaticParams() {
  const res = await fetch(`${API_URL}/posts?_limit=10`);
  const posts = await res.json();

  return posts.map((post) => ({
    id: String(post.id),
  }));
}

// 동적 메타데이터: 각 포스트마다 다른 title, description을 설정합니다.
export async function generateMetadata({ params }) {
  const { id } = await params;
  const res = await fetch(`${API_URL}/posts/${id}`);
  const post = await res.json();

  return {
    title: `${post.title} - DevBlog`,
    description: post.body?.slice(0, 100),
  };
}

export default async function PostDetailPage({ params }) {
  // Next.js 15+에서 params는 비동기 객체이므로 await로 풀어야 합니다.
  const { id } = await params;

  // 포스트 데이터와 댓글 데이터를 병렬로 가져옵니다.
  const [postRes, commentsRes] = await Promise.all([
    fetch(`${API_URL}/posts/${id}`),
    fetch(`${API_URL}/posts/${id}/comments`),
  ]);

  const post = await postRes.json();
  const comments = await commentsRes.json();

  // 존재하지 않는 포스트 처리
  if (!post.id) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-400 mb-4">
          포스트를 찾을 수 없습니다
        </h1>
        <Link
          href="/posts"
          className="text-indigo-600 hover:text-indigo-700 font-medium"
        >
          ← 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto">
      {/* 뒤로 가기 네비게이션 */}
      <Link
        href="/posts"
        className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
      >
        ← 포스트 목록으로
      </Link>

      {/* 포스트 헤더 */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            포스트 #{id}
          </span>
          <span className="text-sm text-gray-400">
            작성자: User {post.userId}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 capitalize leading-tight">
          {post.title}
        </h1>
      </header>

      {/* 포스트 본문 */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
          {post.body}
        </p>
      </div>

      {/* 이전/다음 포스트 네비게이션 */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        {Number(id) > 1 ? (
          <Link
            href={`/posts/${Number(id) - 1}`}
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
          >
            ← 이전 포스트
          </Link>
        ) : (
          <span />
        )}
        {Number(id) < 100 ? (
          <Link
            href={`/posts/${Number(id) + 1}`}
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
          >
            다음 포스트 →
          </Link>
        ) : (
          <span />
        )}
      </div>

      {/* 댓글 목록 */}
      <CommentList comments={comments} />
    </article>
  );
}
