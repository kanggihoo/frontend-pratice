// ─── [Suspense 임포트] ──────────────────────────────
// React에서 Suspense 컴포넌트를 임포트해야 합니다.
// 힌트: import { Suspense } from "react";

import PostListSkeleton from "./components/PostListSkeleton";

// ─── [PostList 컴포넌트 임포트] ──────────────────────
// 게시글 목록을 렌더링하는 서버 컴포넌트를 임포트하세요.
// 힌트: import PostList from "./components/PostList";

export default function PostsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">📋 게시글 피드</h1>
        <p className="text-gray-500 mt-2">
          이 페이지는 서버에서 데이터를 불러오는 동안{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">
            loading.js
          </code>
          가 자동으로 표시됩니다. 또한 개별 섹션은{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">
            &lt;Suspense&gt;
          </code>
          로 스트리밍됩니다.
        </p>
      </div>

      {/* ─── [Suspense 스트리밍 렌더링] ─────────────────────
       * 아래에 <Suspense> 컴포넌트로 PostList를 감싸세요.
       * fallback에는 PostListSkeleton을 넣어줍니다.
       *
       * 이렇게 하면 PostList가 데이터를 불러오는 동안
       * PostListSkeleton이 먼저 표시됩니다.
       *
       * 힌트:
       * <Suspense fallback={<PostListSkeleton />}>
       *   <PostList />
       * </Suspense>
       * ─────────────────────────────────────────────────── */}
      <PostListSkeleton />
    </div>
  );
}
