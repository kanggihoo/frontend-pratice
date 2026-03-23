import { useRef, useCallback, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts } from "../data/api";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

export default function PostList({ onSelect }) {
  const observerRef = useRef(null);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => fetchPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  // Intersection Observer로 무한 스크롤 구현
  const lastPostRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;

      // 기존 observer 해제
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      // 새 observer 등록
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  if (isLoading) {
    return <LoadingSpinner message="게시글을 불러오는 중..." />;
  }

  if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  // 모든 페이지의 게시글을 하나의 배열로 합치기
  const allPosts = data.pages.flatMap((page) => page.posts);

  return (
    <div>
      <div className="space-y-3">
        {allPosts.map((post, index) => {
          const isLast = index === allPosts.length - 1;

          return (
            <button
              key={post.id}
              ref={isLast ? lastPostRef : null}
              onClick={() => onSelect(post.id)}
              className="w-full text-left bg-slate-800/60 backdrop-blur-sm border border-indigo-500/10 rounded-2xl p-5 hover:border-indigo-400/30 hover:bg-slate-800/80 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <span className="text-indigo-400/50 font-mono text-sm mt-1 shrink-0">
                  #{post.id}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-white font-medium truncate group-hover:text-indigo-300 transition-colors capitalize">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                    {post.body}
                  </p>
                </div>
                <span className="text-indigo-400/30 text-xl shrink-0 group-hover:text-indigo-400/60 transition-colors">
                  &rsaquo;
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 다음 페이지 로딩 표시 */}
      {isFetchingNextPage && (
        <div className="flex justify-center py-6">
          <div className="w-8 h-8 border-3 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      )}

      {/* 모든 게시글 로드 완료 */}
      {!hasNextPage && allPosts.length > 0 && (
        <p className="text-center text-gray-500 text-sm py-6">
          모든 게시글을 불러왔습니다.
        </p>
      )}
    </div>
  );
}
