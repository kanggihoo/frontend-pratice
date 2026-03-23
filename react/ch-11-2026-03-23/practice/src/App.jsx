// ─── [컴포넌트 import] ──────────────────────────────────
// 아래 6개의 컴포넌트를 import하세요:
// - Header: 상단 헤더 (검색, 필터 초기화)
// - Sidebar: 사이드바 (카테고리, 정렬, 페이지 크기)
// - StatCards: 통계 카드 4개
// - DataTable: 데이터 테이블 (필터링 + 페이지네이션)
// - FavoritesPanel: 즐겨찾기 사용자 패널
// - ToastContainer: 토스트 알림 컨테이너
//
// 힌트:
//   import Header from "./components/Header";
//   import Sidebar from "./components/Sidebar";
//   ...


export default function App() {
  // ─── [레이아웃 구성] ─────────────────────────────────
  // 아래 레이아웃 구조를 완성하세요:
  //
  // <div className="min-h-screen bg-gray-50">
  //   <Header />                     ← 상단 헤더
  //   <div className="flex">
  //     <Sidebar />                  ← 사이드바 (왼쪽)
  //     <main className="flex-1 p-6"> ← 메인 콘텐츠 (오른쪽)
  //       <StatCards />              ← 통계 카드
  //       <FavoritesPanel />         ← 즐겨찾기 패널
  //       <DataTable />             ← 데이터 테이블
  //     </main>
  //   </div>
  //   <ToastContainer />            ← 토스트 알림 (고정 위치)
  // </div>

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 여기에 컴포넌트들을 배치하세요 */}
      <p className="p-8 text-gray-400 text-center">
        App.jsx에 컴포넌트를 배치하세요.
      </p>
    </div>
  );
}
