import Link from "next/link";

export const metadata = {
  title: "접근 권한 없음 - Admin Dashboard",
};

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <div className="text-6xl mb-6">🚫</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">접근 권한 없음</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        이 페이지는 <strong>관리자(admin)</strong> 권한이 필요합니다.
        <br />
        일반 사용자 계정으로는 접근할 수 없습니다.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          홈으로 돌아가기
        </Link>
        <Link
          href="/login"
          className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          다른 계정으로 로그인
        </Link>
      </div>
    </div>
  );
}
