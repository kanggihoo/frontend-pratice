export default function PostListSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 animate-pulse"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-6 w-10 bg-gray-200 rounded-full" />
          </div>
          <div className="h-5 bg-gray-200 rounded w-full mb-2" />
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="space-y-1.5">
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-5/6" />
            <div className="h-4 bg-gray-100 rounded w-2/3" />
          </div>
          <div className="h-4 w-24 bg-gray-100 rounded mt-3" />
        </div>
      ))}
    </div>
  );
}
