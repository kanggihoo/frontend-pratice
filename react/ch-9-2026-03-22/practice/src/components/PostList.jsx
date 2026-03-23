import { useRef, useCallback } from "react";
// ─── [useInfiniteQuery 임포트] ──────────────────────────
// @tanstack/react-query에서 useInfiniteQuery를 import하세요.
// 힌트: import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchPosts } from "../data/api";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

export default function PostList({ onSelect }) {
  const observerRef = useRef(null);

  // ─── [useInfiniteQuery로 게시글 무한 스크롤 조회] ─────
  // useInfiniteQuery는 useQuery의 확장판으로,
  // 여러 "페이지"의 데이터를 하나의 쿼리로 관리합니다.
  //
  // 핵심 옵션:
  //   - queryKey: 쿼리를 식별하는 키
  //     → 예: ["posts"]
  //
  //   - queryFn: 데이터를 가져오는 함수
  //     → ({ pageParam }) => fetchPosts(pageParam)
  //     → pageParam은 TanStack Query가 자동으로 전달합니다.
  //
  //   - initialPageParam: 첫 페이지의 파라미터
  //     → 예: 1 (첫 번째 페이지)
  //
  //   - getNextPageParam: 다음 페이지의 파라미터를 결정하는 함수
  //     → (lastPage) => lastPage.nextPage
  //     → null을 반환하면 "더 이상 페이지 없음"을 의미합니다.
  //
  // 반환 값:
  //   - data: { pages: [...], pageParams: [...] }
  //     → data.pages는 각 페이지의 응답 배열
  //   - fetchNextPage: 다음 페이지를 가져오는 함수
  //   - hasNextPage: 다음 페이지가 있는지 여부
  //   - isFetchingNextPage: 다음 페이지를 가져오는 중인지
  //   - isLoading, isError, error: 기본 상태들
  //
  // 힌트:
  // const {
  //   data,
  //   isLoading,
  //   isError,
  //   error,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  // } = useInfiniteQuery({
  //   queryKey: ["posts"],
  //   queryFn: ({ pageParam }) => fetchPosts(pageParam),
  //   initialPageParam: 1,
  //   getNextPageParam: (lastPage) => lastPage.nextPage,
  // });


  // ─── [Intersection Observer로 무한 스크롤 구현] ───────
  // 마지막 게시글 요소가 화면에 보이면 다음 페이지를 로드합니다.
  //
  // useCallback을 사용하여 ref 콜백을 만듭니다:
  //   1. isFetchingNextPage 중이면 아무것도 하지 않음
  //   2. 기존 observer가 있으면 disconnect
  //   3. 새 IntersectionObserver를 생성하여 요소를 관찰
  //   4. 요소가 화면에 보이면(isIntersecting) fetchNextPage 호출
  //
  // 힌트:
  // const lastPostRef = useCallback(
  //   (node) => {
  //     if (isFetchingNextPage) return;
  //     if (observerRef.current) observerRef.current.disconnect();
  //     observerRef.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting && hasNextPage) {
  //         fetchNextPage();
  //       }
  //     });
  //     if (node) observerRef.current.observe(node);
  //   },
  //   [isFetchingNextPage, hasNextPage, fetchNextPage]
  // );


  // ─── [로딩 상태 처리] ─────────────────────────────────
  // 힌트: if (isLoading) return <LoadingSpinner message="..." />;


  // ─── [에러 상태 처리] ─────────────────────────────────
  // 힌트: if (isError) return <ErrorMessage message={error.message} />;


  // ─── [모든 페이지의 게시글을 하나의 배열로 합치기] ─────
  // data.pages는 각 페이지 응답의 배열입니다.
  // flatMap으로 모든 페이지의 posts를 하나의 배열로 합칩니다.
  //
  // 힌트: const allPosts = data.pages.flatMap((page) => page.posts);


  return (
    <div>
      {/* ─── [게시글 리스트] ──────────────────────────────── */}
      {/* allPosts를 map으로 순회하며 게시글 카드를 렌더링하세요. */}
      {/*                                                         */}
      {/* 무한 스크롤의 핵심:                                      */}
      {/*   마지막 요소의 ref에 lastPostRef를 연결합니다.           */}
      {/*   const isLast = index === allPosts.length - 1;           */}
      {/*   ref={isLast ? lastPostRef : null}                       */}
      {/*                                                         */}
      {/* 각 게시글 카드에는 다음을 표시하세요:                     */}
      {/*   - post.id (번호)                                       */}
      {/*   - post.title (제목)                                    */}
      {/*   - post.body (내용 미리보기)                             */}
      {/*   - onClick={() => onSelect(post.id)}                    */}
      <div className="space-y-3">
        <p className="text-indigo-300 text-center py-10">
          여기에 게시글 리스트를 렌더링하세요.
        </p>
      </div>

      {/* ─── [다음 페이지 로딩 표시] ──────────────────────── */}
      {/* isFetchingNextPage일 때 로딩 스피너를 표시하세요.        */}

      {/* ─── [모든 게시글 로드 완료] ──────────────────────── */}
      {/* !hasNextPage일 때 "모든 게시글을 불러왔습니다." 표시    */}
    </div>
  );
}
