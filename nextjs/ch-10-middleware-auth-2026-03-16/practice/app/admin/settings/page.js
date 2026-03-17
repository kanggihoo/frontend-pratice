// ─── [설정 페이지] ──────────────────────────────
// 현재 세션 정보와 Middleware 동작 원리를 보여주는 관리자 페이지입니다.
// 서버 컴포넌트에서 cookies()를 사용하여 세션 토큰을 읽습니다.

// ─── [서버 컴포넌트에서 쿠키 읽기] ──────────────────────
// 힌트: import { cookies } from "next/headers";

export const metadata = {
  title: "설정 - Admin Dashboard",
};

export default async function SettingsPage() {
  // ─── [쿠키에서 세션 토큰 읽기] ──────────────────────
  // 힌트:
  // const cookieStore = await cookies();
  // const sessionToken = cookieStore.get("session-token")?.value;

  // TODO: cookies()를 사용하여 세션 토큰을 읽어오세요
  const sessionToken = null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="">설정</h1>
        {/* TODO: 제목 스타일링 */}
        <p className="">시스템 설정을 관리합니다.</p>
      </div>

      <div className="space-y-6">
        {/* ─── [세션 정보 카드] ──────────────────────── */}
        <div className="">
          {/* TODO: bg-white, rounded-xl, shadow-sm, border, p-6 */}
          <h2 className="">현재 세션 정보</h2>
          <div className="">
            <div className="">
              <span>세션 토큰</span>
              <code className="">
                {sessionToken ? `${sessionToken.slice(0, 8)}...` : "없음"}
              </code>
            </div>
            <div className="">
              <span>쿠키 저장 방식</span>
              <span>httpOnly + sameSite</span>
            </div>
            <div className="">
              <span>Middleware 보호</span>
              <span>활성화됨</span>
            </div>
          </div>
        </div>

        {/* ─── [Middleware 동작 원리 카드] ──────────────── */}
        <div className="">
          {/* TODO: bg-white, rounded-xl, shadow-sm, border, p-6 */}
          <h2 className="">Middleware 동작 원리</h2>
          {/* TODO: 5단계 과정을 시각적으로 설명하세요 */}
          {/* 1. /admin/* 경로 접근 시도 */}
          {/* 2. Middleware가 session-token 쿠키 확인 */}
          {/* 3. 토큰 없으면 /login으로 리다이렉트 (callbackUrl 전달) */}
          {/* 4. 토큰은 있지만 role이 admin이 아니면 /unauthorized로 리다이렉트 */}
          {/* 5. admin 역할 확인 → 요청 통과 + 커스텀 헤더 추가 */}
        </div>
      </div>
    </div>
  );
}
