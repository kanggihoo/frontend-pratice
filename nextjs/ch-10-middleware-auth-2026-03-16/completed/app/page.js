import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Next.js Middleware & 인증 학습
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl">
        Middleware를 활용한 라우트 가드와 인증 연계 패턴을 학습합니다.
        <br />
        로그인하지 않으면 어드민 페이지에 접근할 수 없습니다.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg">
        <Link
          href="/login"
          className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200"
        >
          <span className="text-3xl mb-3">🔑</span>
          <span className="text-lg font-semibold text-gray-800">로그인</span>
          <span className="text-sm text-gray-500 mt-1">
            관리자 계정으로 로그인
          </span>
        </Link>

        <Link
          href="/admin"
          className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200"
        >
          <span className="text-3xl mb-3">🛡️</span>
          <span className="text-lg font-semibold text-gray-800">
            관리자 대시보드
          </span>
          <span className="text-sm text-gray-500 mt-1">
            보호된 페이지 (로그인 필요)
          </span>
        </Link>

        <Link
          href="/admin/users"
          className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200"
        >
          <span className="text-3xl mb-3">👥</span>
          <span className="text-lg font-semibold text-gray-800">
            사용자 관리
          </span>
          <span className="text-sm text-gray-500 mt-1">
            보호된 페이지 (로그인 필요)
          </span>
        </Link>

        <Link
          href="/admin/settings"
          className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200"
        >
          <span className="text-3xl mb-3">⚙️</span>
          <span className="text-lg font-semibold text-gray-800">설정</span>
          <span className="text-sm text-gray-500 mt-1">
            보호된 페이지 (로그인 필요)
          </span>
        </Link>
      </div>

      <div className="mt-12 p-6 bg-indigo-50 rounded-xl max-w-lg w-full">
        <h2 className="text-lg font-semibold text-indigo-900 mb-2">
          테스트 계정 안내
        </h2>
        <div className="text-sm text-indigo-700 space-y-1">
          <p>
            <strong>관리자:</strong> admin / admin1234
          </p>
          <p>
            <strong>일반 사용자:</strong> user / user1234
          </p>
        </div>
        <p className="text-xs text-indigo-500 mt-3">
          일반 사용자는 /admin 페이지에 접근할 수 없습니다.
        </p>
      </div>
    </div>
  );
}
