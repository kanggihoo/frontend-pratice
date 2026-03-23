export default function LoadingSpinner({ message = "로딩 중..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      <p className="mt-4 text-indigo-300 text-sm">{message}</p>
    </div>
  );
}
