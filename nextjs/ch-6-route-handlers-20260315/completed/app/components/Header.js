export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              🔒 API 프록시 대시보드
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Next.js Route Handlers로 외부 API를 안전하게 프록시합니다
            </p>
          </div>
          <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-green-700">
              서버 프록시 활성
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
