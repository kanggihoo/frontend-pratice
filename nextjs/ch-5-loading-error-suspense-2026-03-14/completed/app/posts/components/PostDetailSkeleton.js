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
