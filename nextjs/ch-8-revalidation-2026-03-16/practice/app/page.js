import { getPosts } from "@/lib/data";
import QuoteCard from "./components/QuoteCard";
import PostForm from "./components/PostForm";
import PostCard from "./components/PostCard";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* ── 헤더 ── */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            실시간 게시판
          </h1>
          <p className="text-gray-500 mb-4">
            Next.js 데이터 재검증(Revalidation) 학습
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              revalidatePath
            </span>
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
              revalidateTag
            </span>
            <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium">
              Time-based ISR
            </span>
          </div>
        </header>

        {/* ── 재검증 방법 안내 ── */}
        {/* ─── [UI 스타일링] ──────────────────────────────
            아래는 재검증 방법을 설명하는 안내 패널입니다.
            Tailwind CSS를 사용하여 3개의 카드를 그리드로 배치하세요.
            힌트: bg-blue-50, border, rounded-2xl, grid, grid-cols-1 sm:grid-cols-3 등
        ──────────────────────────────────────────────── */}
        <div className="">
          <h2 className="text-lg font-bold mb-3">
            이 앱에서 사용된 재검증 방법
          </h2>
          <div className="">
            <div className="">
              <h3 className="font-bold mb-1">revalidatePath</h3>
              <p className="">
                게시글/댓글 작성 및 삭제 시 특정 경로의 전체 캐시를 무효화
              </p>
            </div>
            <div className="">
              <h3 className="font-bold mb-1">revalidateTag</h3>
              <p className="">
                명언 새로고침 클릭 시 태그된 fetch 캐시만 선택적으로 무효화
              </p>
            </div>
            <div className="">
              <h3 className="font-bold mb-1">Time-based (ISR)</h3>
              <p className="">
                명언 API를 30초 간격으로 백그라운드에서 자동 갱신
              </p>
            </div>
          </div>
        </div>

        {/* ── 오늘의 명언 (시간 기반 + 태그 기반 재검증 데모) ── */}
        <QuoteCard />

        {/* ── 게시글 작성 (Server Action + revalidatePath 데모) ── */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            새 게시글 작성
          </h2>
          <PostForm />
        </section>

        {/* ── 게시글 목록 ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            게시글 목록 ({posts.length}개)
          </h2>
          {posts.length === 0 ? (
            <p className="text-center text-gray-400 py-8">
              아직 게시글이 없습니다. 첫 게시글을 작성해보세요!
            </p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
