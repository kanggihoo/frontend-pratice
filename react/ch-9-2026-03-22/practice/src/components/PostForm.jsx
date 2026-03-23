import { useState, useEffect } from "react";
// ─── [TanStack Query 임포트] ─────────────────────────────
// useQuery, useMutation, useQueryClient를 import하세요.

import { fetchPost, createPost, updatePost } from "../data/api";
import LoadingSpinner from "./LoadingSpinner";

export default function PostForm({ postId = null, onBack, showToast }) {
  const isEditing = postId !== null;

  // ─── [useQueryClient 가져오기] ─────────────────────────
  // 힌트: const queryClient = useQueryClient();


  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // ─── [수정 모드: 기존 데이터 가져오기] ────────────────
  // isEditing일 때만 기존 게시글을 useQuery로 가져오세요.
  // queryKey: ["post", postId]
  // enabled: isEditing


  // ─── [기존 데이터로 폼 초기화] ─────────────────────────
  // useEffect로 existingPost가 로드되면 title, body 상태를 설정
  // 힌트:
  // useEffect(() => {
  //   if (existingPost) {
  //     setTitle(existingPost.title);
  //     setBody(existingPost.body);
  //   }
  // }, [existingPost]);


  // ─── [게시글 작성 뮤테이션 (낙관적 업데이트)] ─────────
  // mutationFn: createPost
  //
  // 낙관적 업데이트 흐름:
  //   onMutate:
  //     1. cancelQueries로 ["posts"] 쿼리 취소
  //     2. getQueryData로 이전 데이터 백업
  //     3. setQueryData로 새 게시글을 목록 맨 앞에 추가
  //        → 임시 ID(Date.now())를 사용
  //     4. return { previousPosts }
  //   onError: 이전 데이터로 롤백
  //   onSettled: invalidateQueries로 서버 동기화
  //   onSuccess: 토스트 + onBack
  //
  // 힌트:
  // const createMutation = useMutation({
  //   mutationFn: createPost,
  //   onMutate: async (newPost) => {
  //     await queryClient.cancelQueries({ queryKey: ["posts"] });
  //     const previousPosts = queryClient.getQueryData(["posts"]);
  //     queryClient.setQueryData(["posts"], (old) => {
  //       if (!old) return old;
  //       const optimisticPost = { id: Date.now(), ...newPost, userId: 1 };
  //       const newPages = [...old.pages];
  //       newPages[0] = {
  //         ...newPages[0],
  //         posts: [optimisticPost, ...newPages[0].posts],
  //       };
  //       return { ...old, pages: newPages };
  //     });
  //     return { previousPosts };
  //   },
  //   onError: (err, newPost, context) => {
  //     queryClient.setQueryData(["posts"], context.previousPosts);
  //     showToast("작성에 실패했습니다.", "error");
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: ["posts"] });
  //   },
  //   onSuccess: () => {
  //     showToast("게시글이 작성되었습니다.");
  //     onBack();
  //   },
  // });


  // ─── [게시글 수정 뮤테이션 (낙관적 업데이트)] ─────────
  // mutationFn: updatePost
  //
  // 수정의 낙관적 업데이트는 작성과 비슷하지만,
  // 상세 캐시(["post", postId])를 업데이트합니다.
  //
  // 힌트:
  // const updateMutation = useMutation({
  //   mutationFn: updatePost,
  //   onMutate: async (updatedPost) => {
  //     await queryClient.cancelQueries({ queryKey: ["post", postId] });
  //     const previousPost = queryClient.getQueryData(["post", postId]);
  //     queryClient.setQueryData(["post", postId], (old) => ({
  //       ...old,
  //       ...updatedPost,
  //     }));
  //     return { previousPost };
  //   },
  //   onError: (err, updatedPost, context) => {
  //     queryClient.setQueryData(["post", postId], context.previousPost);
  //     showToast("수정에 실패했습니다.", "error");
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: ["post", postId] });
  //     queryClient.invalidateQueries({ queryKey: ["posts"] });
  //   },
  //   onSuccess: () => {
  //     showToast("게시글이 수정되었습니다.");
  //     onBack();
  //   },
  // });


  // ─── [폼 제출 핸들러] ─────────────────────────────────
  // isEditing 여부에 따라 updateMutation 또는 createMutation 호출
  // 힌트:
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!title.trim() || !body.trim()) return;
  //   if (isEditing) {
  //     updateMutation.mutate({ id: postId, title, body });
  //   } else {
  //     createMutation.mutate({ title, body });
  //   }
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    // 위 힌트를 참고하여 구현하세요
  };

  // const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div>
      {/* 뒤로가기 */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
      >
        <span>&larr;</span>
        <span>돌아가기</span>
      </button>

      {/* 폼 */}
      <div className="bg-slate-800/60 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-white mb-6">
          {isEditing ? "게시글 수정" : "새 게시글 작성"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-indigo-300 text-sm font-medium mb-2"
            >
              제목
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="게시글 제목을 입력하세요"
              className="w-full bg-slate-700/50 border border-indigo-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400/50 focus:ring-1 focus:ring-indigo-400/50 transition-colors"
              required
            />
          </div>

          <div>
            <label
              htmlFor="body"
              className="block text-indigo-300 text-sm font-medium mb-2"
            >
              내용
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="게시글 내용을 입력하세요"
              rows={8}
              className="w-full bg-slate-700/50 border border-indigo-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400/50 focus:ring-1 focus:ring-indigo-400/50 transition-colors resize-none"
              required
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onBack}
              className="px-5 py-2.5 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!title.trim() || !body.trim()}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              {isEditing ? "수정하기" : "작성하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
