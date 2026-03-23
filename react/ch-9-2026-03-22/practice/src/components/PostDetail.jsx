// ─── [TanStack Query 임포트] ─────────────────────────────
// useQuery, useMutation, useQueryClient를 import하세요.
// 힌트: import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { fetchPost, fetchComments, deletePost } from "../data/api";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

export default function PostDetail({ postId, onBack, onEdit, showToast }) {
  // ─── [useQueryClient 가져오기] ─────────────────────────
  // useMutation에서 캐시를 직접 조작하려면 queryClient가 필요합니다.
  // 힌트: const queryClient = useQueryClient();


  // ─── [게시글 상세 조회 (useQuery)] ─────────────────────
  // 8회차에서 배운 useQuery를 사용하여 게시글을 가져오세요.
  // queryKey: ["post", postId]
  // queryFn: () => fetchPost(postId)


  // ─── [댓글 조회 (useQuery + enabled)] ──────────────────
  // queryKey: ["comments", postId]
  // queryFn: () => fetchComments(postId)
  // enabled: !!postId


  // ─── [삭제 뮤테이션 (낙관적 업데이트)] ────────────────
  // useMutation은 데이터를 변경(생성/수정/삭제)할 때 사용합니다.
  //
  // useMutation의 핵심 옵션:
  //
  //   mutationFn: 실제 API를 호출하는 함수
  //     → deletePost
  //
  //   onMutate (서버 응답 전 — 낙관적 업데이트):
  //     1. cancelQueries: 진행 중인 쿼리를 취소하여 낙관적 업데이트를 덮어쓰지 않도록 함
  //        → await queryClient.cancelQueries({ queryKey: ["posts"] })
  //     2. getQueryData: 이전 데이터를 백업 (롤백용)
  //        → const previousPosts = queryClient.getQueryData(["posts"])
  //     3. setQueryData: 캐시를 직접 수정하여 즉시 UI 반영
  //        → queryClient.setQueryData(["posts"], (old) => ...)
  //     4. return { previousPosts }: context로 반환하여 onError에서 사용
  //
  //   onError (에러 발생 시 — 롤백):
  //     → 백업해둔 이전 데이터로 캐시를 복원
  //     → queryClient.setQueryData(["posts"], context.previousPosts)
  //
  //   onSettled (성공이든 실패든 — 서버와 동기화):
  //     → queryClient.invalidateQueries({ queryKey: ["posts"] })
  //     → 캐시를 무효화하여 서버에서 최신 데이터를 다시 가져옴
  //
  //   onSuccess (성공 시):
  //     → 토스트 표시 + 목록으로 이동
  //
  // 힌트:
  // const deleteMutation = useMutation({
  //   mutationFn: deletePost,
  //   onMutate: async (deletedId) => {
  //     await queryClient.cancelQueries({ queryKey: ["posts"] });
  //     const previousPosts = queryClient.getQueryData(["posts"]);
  //     queryClient.setQueryData(["posts"], (old) => {
  //       if (!old) return old;
  //       return {
  //         ...old,
  //         pages: old.pages.map((page) => ({
  //           ...page,
  //           posts: page.posts.filter((p) => p.id !== deletedId),
  //         })),
  //       };
  //     });
  //     return { previousPosts };
  //   },
  //   onError: (err, deletedId, context) => {
  //     queryClient.setQueryData(["posts"], context.previousPosts);
  //     showToast("삭제에 실패했습니다.", "error");
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: ["posts"] });
  //   },
  //   onSuccess: () => {
  //     showToast("게시글이 삭제되었습니다.");
  //     onBack();
  //   },
  // });


  // ─── [삭제 핸들러] ────────────────────────────────────
  // confirm 후 deleteMutation.mutate(postId) 호출
  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      // deleteMutation.mutate(postId);
    }
  };

  // ─── [로딩/에러 처리] ─────────────────────────────────
  // isLoading → LoadingSpinner, isError → ErrorMessage


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
              {/* ─── [게시글 번호와 제목] ──────────────────── */}
              {/* post.id, post.title을 표시하세요.                */}
              <span className="text-indigo-400/50 font-mono text-sm">#???</span>
              <h2 className="text-2xl font-bold text-white mt-1 capitalize">
                제목을 표시하세요
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
                className="px-3 py-1.5 text-sm bg-red-600/20 text-red-300 rounded-lg hover:bg-red-600/40 transition-colors cursor-pointer"
              >
                삭제
              </button>
            </div>
          </div>

          {/* ─── [게시글 본문] ────────────────────────────── */}
          {/* post.body를 표시하세요.                              */}
          <p className="text-gray-300 leading-relaxed mt-6">
            본문을 표시하세요
          </p>
        </div>

        {/* ─── [댓글 섹션] ───────────────────────────────── */}
        {/* comments 배열을 map으로 순회하며 댓글을 렌더링하세요.   */}
        {/* isLoadingComments일 때 로딩 표시                        */}
        {/* 각 댓글: comment.name, comment.body, comment.email      */}
        <div className="border-t border-indigo-500/10 p-8">
          <h3 className="text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-4">
            댓글
          </h3>
          <p className="text-gray-500 text-sm">여기에 댓글을 렌더링하세요.</p>
        </div>
      </article>
    </div>
  );
}
