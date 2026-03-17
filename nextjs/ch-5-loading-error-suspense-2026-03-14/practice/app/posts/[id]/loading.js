// ─── [상세 페이지 로딩 UI] ───────────────────────────
// /posts/[id] 경로에 진입할 때 자동으로 표시되는 로딩 UI입니다.
<<<<<<< HEAD
// PostDetailSkeleton 컴포넌트를 임포트하여 사용하세요.
//
// 힌트: import PostDetailSkeleton from "../components/PostDetailSkeleton";
=======
import PostDetailSkeleton from "../components/PostDetailSkeleton";
>>>>>>> ac06ffee49136562bdd1cf983bf3e8416e10a53f

export default function Loading() {
  // ─── [스켈레톤 반환] ───────────────────────────────
  // 힌트: return <PostDetailSkeleton />;
<<<<<<< HEAD
  return (
    <div className="max-w-2xl mx-auto text-center py-20 text-gray-400">
      로딩 중...
    </div>
  );
=======
  return <PostDetailSkeleton />;
>>>>>>> ac06ffee49136562bdd1cf983bf3e8416e10a53f
}
