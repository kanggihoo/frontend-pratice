import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPost, fetchComments, deletePost } from "../data/api";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

export default function PostDetail({ postId, onBack, onEdit, showToast }) {
  const queryClient = useQueryClient();

  // 게시글 상세 조회
  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
  });

  // 댓글 조회
  const { data: comments = [], isLoading: isLoadingComments } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId,
  });

  // 삭제 뮤테이션 (낙관적 업데이트)
  const deleteMutation = useMutation({
    mutationFn: deletePost,

    // 1단계: 서버 요청 전 — 낙관적으로 UI 업데이트
    onMutate: async (deletedId) => {
      // 진행 중인 쿼리를 취소하여 낙관적 업데이트를 덮어쓰지 않도록 함
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      // 이전 데이터를 백업 (롤백용)
      const previousPosts = queryClient.getQueryData(["posts"]);

      // 캐시에서 해당 게시글을 즉시 제거 (낙관적 업데이트)
      queryClient.setQueryData(["posts"], (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            posts: page.posts.filter((p) => p.id !== deletedId),
          })),
        };
      });

      // 이전 데이터를 context로 반환 (onError에서 사용)
      return { previousPosts };
    },

    // 2단계: 에러 발생 시 — 롤백
    onError: (err, deletedId, context) => {
      // 백업해둔 이전 데이터로 롤백
      queryClient.setQueryData(["posts"], context.previousPosts);
      showToast("삭제에 실패했습니다.", "error");
    },

    // 3단계: 성공이든 실패든 — 정리
    onSettled: () => {
      // 서버와 동기화를 위해 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },

    onSuccess: () => {
      showToast("게시글이 삭제되었습니다.");
      onBack();
    },
  });

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteMutation.mutate(postId);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="게시글을 불러오는 중..." />;
  }

  if (isError) {
    return (
      <div>
        <ErrorMessage message={error.message} />
        <button
          onClick={onBack}
          className="mt-4 text-indigo-400 hover:text-indigo-300 cursor-pointer"
        >
          &larr; 목록으로
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* 뒤로가기 */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
      >
        <span>&larr;</span>
        <span>목록으로 돌아가기</span>
      </button>

      {/* 게시글 카드 */}
      <article className="bg-slate-800/60 backdrop-blur-sm border border-indigo-500/20 rounded-2xl overflow-hidden">
        <div className="p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-indigo-400/50 font-mono text-sm">
                #{post.id}
              </span>
              <h2 className="text-2xl font-bold text-white mt-1 capitalize">
                {post.title}
              </h2>
            </div>

            {/* 수정/삭제 버튼 */}
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => onEdit(postId)}
                className="px-3 py-1.5 text-sm bg-indigo-600/20 text-indigo-300 rounded-lg hover:bg-indigo-600/40 transition-colors cursor-pointer"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="px-3 py-1.5 text-sm bg-red-600/20 text-red-300 rounded-lg hover:bg-red-600/40 transition-colors cursor-pointer disabled:opacity-50"
              >
                {deleteMutation.isPending ? "삭제 중..." : "삭제"}
              </button>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed mt-6">{post.body}</p>
        </div>

        {/* 댓글 섹션 */}
        <div className="border-t border-indigo-500/10 p-8">
          <h3 className="text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-4">
            댓글 {!isLoadingComments && `(${comments.length})`}
          </h3>

          {isLoadingComments ? (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <div className="w-4 h-4 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
              댓글을 불러오는 중...
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-slate-700/30 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-indigo-500/20 rounded-full flex items-center justify-center">
                      <span className="text-indigo-300 text-xs font-bold">
                        {comment.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-indigo-300 text-sm font-medium truncate">
                      {comment.name}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{comment.body}</p>
                  <p className="text-gray-600 text-xs mt-2">{comment.email}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
