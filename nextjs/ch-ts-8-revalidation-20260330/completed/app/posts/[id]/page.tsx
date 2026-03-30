import { notFound } from 'next/navigation';
import { mockPosts, mockComments } from '@/data/mockData';
import CommentList from '@/app/components/CommentList';
import CommentForm from '@/app/components/CommentForm';
import Link from 'next/link';

// ─── Next.js 15+ 동적 라우트 params 타입 ────────────────────────
// params는 Promise<{ id: string }> — Next.js 15+에서 비동기 처리됨
// URL 파라미터는 항상 string → 숫자가 필요하면 parseInt()로 변환

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PostDetailPage({ params }: PageProps) {
  // await으로 params 언래핑 (Next.js 15+ 필수)
  const { id } = await params;
  const postId = parseInt(id, 10);

  const post = mockPosts.find((p) => p.id === postId);
  if (!post) notFound();

  const comments = mockComments.filter((c) => c.postId === postId);

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <Link href="/" className="text-sm text-blue-500 hover:underline mb-6 inline-block">
        ← 목록으로
      </Link>

      {/* 포스트 상세 */}
      <article className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <p className="text-xs text-gray-400 mb-1">#{post.id}</p>
        <h1 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h1>
        <p className="text-gray-600 leading-relaxed">{post.body}</p>
      </article>

      {/* 댓글 목록 */}
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-700 mb-1">
          댓글 <span className="text-blue-500">{comments.length}</span>개
        </h2>
        <p className="text-xs text-gray-400 mb-3">
          댓글 등록 시 <code className="bg-gray-100 px-1 rounded">revalidatePath</code>로 캐시를 갱신합니다.
        </p>

        <CommentList comments={comments} />
        <CommentForm postId={post.id} />
      </section>
    </main>
  );
}
