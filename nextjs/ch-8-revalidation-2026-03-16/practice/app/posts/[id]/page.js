import { getPost, getComments } from "@/lib/data";
import { deletePost, deleteComment } from "@/lib/actions";
import CommentForm from "@/app/components/CommentForm";
import DeleteButton from "@/app/components/DeleteButton";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PostDetailPage({ params }) {
  // ─── [동적 라우트 파라미터 받기] ──────────────────────
  // Next.js 15+에서 params는 비동기 객체입니다.
  // await로 풀어서 id를 꺼내세요.
  const { id } = await params;
  const postId = Number(id);

  const post = await getPost(postId);
  if (!post) notFound();

  const comments = await getComments(postId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* 뒤로가기 */}
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm mb-6 transition-colors"
        >
          ← 목록으로 돌아가기
        </Link>

        {/* ── 게시글 ── */}
        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
            <span className="font-medium">{post.author}</span>
            <span>·</span>
            <span>
              {new Date(post.createdAt).toLocaleString("ko-KR", {
                timeZone: "Asia/Seoul",
              })}
            </span>
          </div>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>

          {/* ─── [게시글 삭제 폼] ──────────────────────────
              form의 action에 deletePost Server Action을 연결하고,
              hidden input으로 게시글 id를 전달하세요.

              힌트:
              <form action={deletePost}>
                <input type="hidden" name="id" value={post.id} />
                <DeleteButton>게시글 삭제</DeleteButton>
              </form>

              deletePost 액션 내부에서:
              1) revalidatePath('/') 호출 → 목록 캐시 무효화
              2) redirect('/') 호출 → 메인 페이지로 이동
          ──────────────────────────────────────────────── */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <button
              type="button"
              disabled
              className="text-sm text-gray-400"
            >
              게시글 삭제 - 미구현
            </button>
          </div>
        </article>

        {/* ── 댓글 목록 ── */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            댓글 ({comments.length}개)
          </h2>

          {comments.length === 0 ? (
            <p className="text-center text-gray-400 py-6 bg-white rounded-xl border border-gray-100">
              아직 댓글이 없습니다. 첫 댓글을 작성해보세요!
            </p>
          ) : (
            <div className="space-y-3">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white rounded-xl border border-gray-100 p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800 text-sm">
                      {comment.author}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleString("ko-KR", {
                          timeZone: "Asia/Seoul",
                        })}
                      </span>
                      {/* ─── [댓글 삭제 폼] ──────────────────
                          form의 action에 deleteComment를 연결하고,
                          commentId와 postId를 hidden input으로 전달하세요.

                          deleteComment 액션 내부에서:
                          1) revalidatePath(`/posts/${postId}`) → 상세 캐시 무효화
                          2) revalidatePath('/') → 메인 캐시 무효화
                      ──────────────────────────────────── */}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{comment.content}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── 댓글 작성 ── */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            댓글 작성
          </h2>
          <CommentForm postId={postId} />
        </section>
      </div>
    </div>
  );
}
