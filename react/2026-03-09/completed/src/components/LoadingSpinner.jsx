export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin" />
      <p className="mt-4 text-slate-500 text-sm">데이터를 불러오는 중...</p>
    </div>
  );
}
