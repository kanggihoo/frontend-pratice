import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-10 text-center max-w-md">
        <div className="text-6xl mb-4">📭</div>
        <h2 className="text-2xl font-bold text-amber-800 mb-2">
          존재하지 않는 게시글
        </h2>
        <p className="text-amber-600 mb-6">
          해당 ID의 게시글이 존재하지 않습니다. URL을 다시 확인해주세요.
        </p>
        <Link
          href="/posts"
          className="inline-block bg-amber-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-amber-700 transition-colors"
        >
          ← 게시글 목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
