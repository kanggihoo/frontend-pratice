import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-[family-name:var(--font-playfair)] font-bold text-gray-300 mb-4">
        404
      </h1>
      <h2 className="text-xl font-bold text-gray-700 mb-2">
        페이지를 찾을 수 없습니다
      </h2>
      <p className="text-gray-500 mb-8">
        요청하신 페이지가 존재하지 않거나 삭제되었습니다.
      </p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
