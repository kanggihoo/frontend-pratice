import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPost, createPost, updatePost } from "../data/api";
import LoadingSpinner from "./LoadingSpinner";

export default function PostForm({ postId = null, onBack, showToast }) {
  const isEditing = postId !== null;
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // 수정 모드: 기존 데이터 가져오기
  const { data: existingPost, isLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
    enabled: isEditing,
  });

  // 기존 데이터로 폼 초기화
  useEffect(() => {
    if (existingPost) {
      setTitle(existingPost.title);
      setBody(existingPost.body);
    }
  }, [existingPost]);

  // 게시글 작성 뮤테이션 (낙관적 업데이트)
  const createMutation = useMutation({
    mutationFn: createPost,

    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = queryClient.getQueryData(["posts"]);

      // 낙관적으로 새 게시글을 목록 맨 앞에 추가
      queryClient.setQueryData(["posts"], (old) => {
        if (!old) return old;

        const optimisticPost = {
          id: Date.now(), // 임시 ID
          ...newPost,
          userId: 1,
        };

        const newPages = [...old.pages];
        newPages[0] = {
          ...newPages[0],
          posts: [optimisticPost, ...newPages[0].posts],
        };

        return { ...old, pages: newPages };
      });

      return { previousPosts };
    },

    onError: (err, newPost, context) => {
      queryClient.setQueryData(["posts"], context.previousPosts);
      showToast("작성에 실패했습니다.", "error");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },

    onSuccess: () => {
      showToast("게시글이 작성되었습니다.");
      onBack();
    },
  });

  // 게시글 수정 뮤테이션 (낙관적 업데이트)
  const updateMutation = useMutation({
    mutationFn: updatePost,

    onMutate: async (updatedPost) => {
      await queryClient.cancelQueries({ queryKey: ["post", postId] });
      const previousPost = queryClient.getQueryData(["post", postId]);

      // 낙관적으로 상세 캐시 업데이트
      queryClient.setQueryData(["post", postId], (old) => ({
        ...old,
        ...updatedPost,
      }));

      return { previousPost };
    },

    onError: (err, updatedPost, context) => {
      queryClient.setQueryData(["post", postId], context.previousPost);
      showToast("수정에 실패했습니다.", "error");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },

    onSuccess: () => {
      showToast("게시글이 수정되었습니다.");
      onBack();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) return;

    if (isEditing) {
      updateMutation.mutate({ id: postId, title, body });
    } else {
      createMutation.mutate({ title, body });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  if (isEditing && isLoading) {
    return <LoadingSpinner message="게시글을 불러오는 중..." />;
  }

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
              disabled={isPending || !title.trim() || !body.trim()}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              {isPending
                ? "처리 중..."
                : isEditing
                  ? "수정하기"
                  : "작성하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
