export default function CommentSkeleton() {
  return (
    <div className="space-y-3">
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
          </div>
        </div>
      ))}
    </div>
  );
}
