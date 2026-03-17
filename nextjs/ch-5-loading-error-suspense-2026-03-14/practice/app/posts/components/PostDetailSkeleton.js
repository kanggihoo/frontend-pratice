// ─── [스켈레톤 UI — 게시글 상세] ─────────────────────
// 게시글 상세 페이지의 로딩 중 표시되는 스켈레톤입니다.
// 본문 영역 + 댓글 영역의 스켈레톤을 함께 구성합니다.
//
// Tailwind 핵심 클래스:
// - animate-pulse: 깜빡이는 로딩 애니메이션
// - 다양한 너비(w-3/4, w-1/2 등)로 자연스러운 텍스트 형태 표현
// ─────────────────────────────────────────────────────

export default function PostDetailSkeleton() {
  return (
    <div className="max-w-2xl mx-auto animate-pulse">
      <div className="h-4 w-32 bg-gray-200 rounded mb-6" />
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-6 w-12 bg-indigo-100 rounded-full" />
        </div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-6" />
        <div className="space-y-3">
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-5/6" />
          <div className="h-4 bg-gray-100 rounded w-4/6" />
        </div>
      </div>
      {/* 댓글 스켈레톤 */}
      <div className="mt-8">
        <div className="h-7 w-24 bg-gray-200 rounded mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-xl border border-gray-100"
            >
              <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
              <div className="h-3 bg-gray-100 rounded w-full mb-1" />
              <div className="h-3 bg-gray-100 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
