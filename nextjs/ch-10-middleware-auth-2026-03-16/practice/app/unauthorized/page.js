// ─── [접근 권한 없음 페이지] ──────────────────────────
// Middleware에서 admin이 아닌 사용자가 /admin에 접근하면 이 페이지로 리다이렉트됩니다.

import Link from "next/link";

export const metadata = {
  title: "접근 권한 없음 - Admin Dashboard",
};

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      {/* TODO: 접근 거부를 나타내는 UI를 작성하세요 */}
      {/* 힌트: 큰 아이콘(🚫), 제목, 설명, 홈/로그인 링크 버튼 */}
      <h1 className="">접근 권한 없음</h1>
      <p className="">
        이 페이지는 관리자(admin) 권한이 필요합니다.
      </p>
      <div className="flex gap-4">
        <Link href="/" className="">
          {/* TODO: 홈으로 돌아가기 버튼 스타일링 */}
          홈으로 돌아가기
        </Link>
        <Link href="/login" className="">
          {/* TODO: 다른 계정으로 로그인 버튼 스타일링 */}
          다른 계정으로 로그인
        </Link>
      </div>
    </div>
  );
}
