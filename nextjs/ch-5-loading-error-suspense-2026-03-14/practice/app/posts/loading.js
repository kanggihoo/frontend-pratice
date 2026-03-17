// ─── [loading.js — 자동 로딩 UI] ────────────────────
// 이 파일은 Next.js App Router의 특수 파일입니다.
// /posts 경로에 진입할 때, page.js가 서버에서 데이터를 불러오는 동안
// 이 컴포넌트가 자동으로 표시됩니다.
//
// 원리: Next.js가 내부적으로 React <Suspense>로 page.js를 감싸고,
//       이 loading.js를 fallback으로 사용합니다.
<<<<<<< HEAD
//
// 아래에 로딩 중에 보여줄 스켈레톤 UI를 만들어보세요.
// PostListSkeleton 컴포넌트를 임포트하여 활용하면 됩니다.
// ─────────────────────────────────────────────────────

// ─── [스켈레톤 컴포넌트 임포트] ─────────────────────
// 힌트: import PostListSkeleton from "./components/PostListSkeleton";

export default function Loading() {
  // ─── [로딩 UI 반환] ─────────────────────────────────
  // 힌트: 제목 영역의 스켈레톤 + PostListSkeleton을 조합하여 반환하세요.
  // 예시:
  // return (
  //   <div className="space-y-6">
  //     <div>
  //       <div className="h-9 w-48 bg-gray-200 rounded-lg animate-pulse" />
  //       <div className="h-5 w-96 bg-gray-100 rounded mt-2 animate-pulse" />
  //     </div>
  //     <PostListSkeleton />
  //   </div>
  // );
=======

import PostListSkeleton from "./components/PostListSkeleton";

export default function Loading() {
>>>>>>> ac06ffee49136562bdd1cf983bf3e8416e10a53f
  return (
    <div className="space-y-6">
      <div>
        <div className="h-9 w-48 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-5 w-96 bg-gray-100 rounded mt-2 animate-pulse" />
      </div>
<<<<<<< HEAD
      {/* ─── 여기에 PostListSkeleton을 추가하세요 ─── */}
      <div className="text-gray-400 text-center py-10">로딩 중...</div>
=======
      <PostListSkeleton />
>>>>>>> ac06ffee49136562bdd1cf983bf3e8416e10a53f
    </div>
  );
}
