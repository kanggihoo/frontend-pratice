export default function Pagination({
  page,
  hasNextPage,
  hasPrevPage,
  onPageChange,
  isFetching,
}) {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={() => onPageChange((old) => Math.max(old - 1, 0))}
        disabled={!hasPrevPage || isFetching}
        className="px-5 py-2.5 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        &larr; 이전
      </button>

      <span className="text-white font-mono text-sm bg-slate-800 px-4 py-2 rounded-lg border border-purple-500/20">
        {page + 1} 페이지
      </span>

      <button
        onClick={() => onPageChange((old) => old + 1)}
        disabled={!hasNextPage || isFetching}
        className="px-5 py-2.5 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        다음 &rarr;
      </button>
    </div>
  );
}
