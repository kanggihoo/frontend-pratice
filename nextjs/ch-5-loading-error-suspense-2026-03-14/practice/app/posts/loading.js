// ─── [loading.js — 자동 로딩 UI] ────────────────────
// 이 파일은 Next.js App Router의 특수 파일입니다.
// /posts 경로에 진입할 때, page.js가 서버에서 데이터를 불러오는 동안
// 이 컴포넌트가 자동으로 표시됩니다.
//
// 원리: Next.js가 내부적으로 React <Suspense>로 page.js를 감싸고,
//       이 loading.js를 fallback으로 사용합니다.

import PostListSkeleton from "./components/PostListSkeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-9 w-48 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-5 w-96 bg-gray-100 rounded mt-2 animate-pulse" />
      </div>
      <PostListSkeleton />
    </div>
  );
}
