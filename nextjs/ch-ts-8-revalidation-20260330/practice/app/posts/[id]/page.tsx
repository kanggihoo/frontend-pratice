import { notFound } from 'next/navigation';
import { mockPosts, mockComments } from '@/data/mockData';
import CommentList from '@/app/components/CommentList';
import CommentForm from '@/app/components/CommentForm';
import Link from 'next/link';

// ─── [Next.js 15+ 동적 라우트 params 타입] ────────────────────────────────────
// JavaScript: async function Page({ params }) { const { id } = params; }
// TypeScript: params는 Next.js 15+에서 Promise 타입입니다.
//
// TODO: PageProps 인터페이스를 정의하고 함수에 적용하세요.
// interface PageProps {
//   params: Promise<{ id: string }>;   // ← Promise로 감싸야 함 (Next.js 15+)
// }
//
// URL 파라미터는 항상 string → 숫자로 쓰려면 parseInt(id, 10) 변환 필요

// TODO: 함수 매개변수에 PageProps 타입을 추가하세요.
export default async function PostDetailPage({ params }) {   // ← 타입 없음 (에러 발생)
  // TODO: await으로 params를 언래핑하세요. (Next.js 15+ 필수)
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

      <article className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <p className="text-xs text-gray-400 mb-1">#{post.id}</p>
        <h1 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h1>
        <p className="text-gray-600 leading-relaxed">{post.body}</p>
      </article>

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
