// ─── [상세 페이지 로딩 UI] ───────────────────────────
// /posts/[id] 경로에 진입할 때 자동으로 표시되는 로딩 UI입니다.
// PostDetailSkeleton 컴포넌트를 임포트하여 사용하세요.
//
// 힌트: import PostDetailSkeleton from "../components/PostDetailSkeleton";

export default function Loading() {
  // ─── [스켈레톤 반환] ───────────────────────────────
  // 힌트: return <PostDetailSkeleton />;
  return (
    <div className="max-w-2xl mx-auto text-center py-20 text-gray-400">
      로딩 중...
    </div>
  );
}
