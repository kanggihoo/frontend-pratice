"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-10 text-center max-w-md">
        <div className="text-5xl mb-4">💥</div>
        <h2 className="text-2xl font-bold text-red-800 mb-2">
          오류가 발생했습니다
        </h2>
        <p className="text-red-600 mb-6 text-sm">
          {error.message || "게시글을 불러오는 중 문제가 발생했습니다."}
        </p>
        <button
          onClick={() => reset()}
          className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors cursor-pointer"
        >
          🔄 다시 시도
        </button>
      </div>
    </div>
  );
}
