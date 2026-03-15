import { Suspense } from "react";
import PostList from "./components/PostList";
import PostListSkeleton from "./components/PostListSkeleton";

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

      {/* Suspense로 감싸서 스트리밍 렌더링 구현 */}
      <Suspense fallback={<PostListSkeleton />}>
        <PostList />
      </Suspense>
    </div>
  );
}
