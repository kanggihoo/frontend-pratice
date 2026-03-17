// ─── [스켈레톤 UI — 댓글] ────────────────────────────
// 댓글이 로딩되는 동안 표시되는 스켈레톤입니다.
// Suspense의 fallback으로 사용됩니다.
<<<<<<< HEAD
// ─────────────────────────────────────────────────────
=======
>>>>>>> ac06ffee49136562bdd1cf983bf3e8416e10a53f

export default function CommentSkeleton() {
  return (
    <div className="space-y-3">
<<<<<<< HEAD
      {/* ─── [댓글 스켈레톤 5개] ──────────────────────
       * 각 댓글 카드마다:
       * - 원형 아바타 (w-7 h-7 bg-gray-200 rounded-full)
       * - 이름 (h-4 w-28 bg-gray-200 rounded)
       * - 본문 2줄 (h-3 bg-gray-100 rounded)
       *
       * 힌트:
       * {Array.from({ length: 5 }).map((_, i) => (
       *   <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 animate-pulse">
       *     <div className="flex items-center gap-2 mb-2">
       *       <div className="w-7 h-7 bg-gray-200 rounded-full" />
       *       <div className="h-4 w-28 bg-gray-200 rounded" />
       *     </div>
       *     <div className="space-y-1.5">
       *       <div className="h-3 bg-gray-100 rounded w-full" />
       *       <div className="h-3 bg-gray-100 rounded w-4/5" />
       *     </div>
       *   </div>
       * ))}
       * ─────────────────────────────────────────────── */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="bg-white p-4 rounded-xl border border-gray-100"
        >
          <div className="h-12 flex items-center justify-center text-gray-300">
            댓글 스켈레톤
=======
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="bg-white p-4 rounded-xl border border-gray-100 animate-pulse"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 bg-gray-200 rounded-full" />
            <div className="h-4 w-28 bg-gray-200 rounded" />
          </div>
          <div className="space-y-1.5">
            <div className="h-3 bg-gray-100 rounded w-full" />
            <div className="h-3 bg-gray-100 rounded w-4/5" />
>>>>>>> ac06ffee49136562bdd1cf983bf3e8416e10a53f
          </div>
        </div>
      ))}
    </div>
  );
}
