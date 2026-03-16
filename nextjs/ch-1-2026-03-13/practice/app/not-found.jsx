// app/not-found.jsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-4xl font-bold mb-4 text-gray-800">
        404 - 페이지를 찾을 수 없습니다
      </h2>
      <p className="text-gray-600 mb-8">
        요청하신 페이지가 사라졌거나 잘못된 주소를 입력하셨습니다.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
