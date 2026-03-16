import { cookies } from "next/headers";

export const metadata = {
  title: "설정 - Admin Dashboard",
};

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session-token")?.value;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">설정</h1>
        <p className="text-gray-600 mt-1">시스템 설정을 관리합니다.</p>
      </div>

      <div className="space-y-6">
        {/* 세션 정보 카드 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            현재 세션 정보
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">세션 토큰</span>
              <code className="text-xs bg-gray-100 px-3 py-1 rounded-md text-gray-700 font-mono">
                {sessionToken ? `${sessionToken.slice(0, 8)}...` : "없음"}
              </code>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">쿠키 저장 방식</span>
              <span className="text-sm text-gray-700">httpOnly + sameSite</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-500">Middleware 보호</span>
              <span className="text-sm font-medium text-green-600">
                활성화됨
              </span>
            </div>
          </div>
        </div>

        {/* Middleware 설명 카드 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Middleware 동작 원리
          </h2>
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xs font-bold">
                1
              </span>
              <p>
                사용자가 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">/admin/*</code> 경로에 접근을 시도합니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xs font-bold">
                2
              </span>
              <p>
                Middleware가 요청을 가로채고{" "}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">session-token</code> 쿠키를 확인합니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xs font-bold">
                3
              </span>
              <p>
                토큰이 없으면 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">/login</code>으로 리다이렉트하며, 원래 URL을 callbackUrl로 전달합니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xs font-bold">
                4
              </span>
              <p>
                토큰이 있지만 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">user-role</code>이 admin이 아니면{" "}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">/unauthorized</code>로 리다이렉트합니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">
                5
              </span>
              <p>
                admin 역할이 확인되면 요청을 통과시키고 커스텀 헤더를 추가합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
