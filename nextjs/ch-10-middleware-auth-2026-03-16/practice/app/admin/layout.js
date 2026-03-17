// ─── [관리자 레이아웃] ──────────────────────────────
// /admin 하위의 모든 페이지에 사이드바를 포함하는 중첩 레이아웃입니다.
// 이 파일은 서버 컴포넌트입니다 (AdminSidebar는 클라이언트 컴포넌트로 분리).
//
// 힌트: AdminSidebar 컴포넌트를 import하고 children과 함께 배치하세요.
// <div className="flex gap-6">
//   <AdminSidebar />
//   <div className="flex-1">{children}</div>
// </div>

import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="">
      {/* TODO: flex 레이아웃으로 사이드바와 콘텐츠 영역을 배치하세요 */}
      {/* 힌트: className="flex gap-6" */}
      <AdminSidebar />
      <div className="">{children}</div>
      {/* TODO: className="flex-1" */}
    </div>
  );
}
