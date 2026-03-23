import { useMemo } from "react";
import useDashboardStore from "../store/dashboardStore";
import {
  useUsersQuery,
  usePostsQuery,
  useTodosQuery,
  useAlbumsQuery,
} from "./useDashboardQueries";

const useFilteredData = () => {
  const { activeCategory, searchQuery, sortOption, pageSize, currentPage } =
    useDashboardStore();

  // 활성 카테고리에 맞는 쿼리만 enabled
  const users = useUsersQuery(
    activeCategory === "all" || activeCategory === "users"
  );
  const posts = usePostsQuery(
    activeCategory === "all" || activeCategory === "posts"
  );
  const todos = useTodosQuery(
    activeCategory === "all" || activeCategory === "todos"
  );
  const albums = useAlbumsQuery(
    activeCategory === "all" || activeCategory === "albums"
  );

  const isLoading =
    users.isLoading || posts.isLoading || todos.isLoading || albums.isLoading;

  // 카테고리별 데이터를 하나의 통합 리스트로 변환
  const allItems = useMemo(() => {
    const items = [];

    if (
      (activeCategory === "all" || activeCategory === "users") &&
      users.data
    ) {
      users.data.forEach((user) => {
        items.push({
          id: `user-${user.id}`,
          originalId: user.id,
          type: "users",
          name: user.name,
          detail: user.email,
          subDetail: user.company?.name ?? "",
          icon: "👥",
        });
      });
    }

    if (
      (activeCategory === "all" || activeCategory === "posts") &&
      posts.data
    ) {
      posts.data.forEach((post) => {
        items.push({
          id: `post-${post.id}`,
          originalId: post.id,
          type: "posts",
          name: post.title,
          detail: post.body.slice(0, 80) + "...",
          subDetail: `작성자 ID: ${post.userId}`,
          icon: "📝",
        });
      });
    }

    if (
      (activeCategory === "all" || activeCategory === "todos") &&
      todos.data
    ) {
      todos.data.forEach((todo) => {
        items.push({
          id: `todo-${todo.id}`,
          originalId: todo.id,
          type: "todos",
          name: todo.title,
          detail: todo.completed ? "완료" : "미완료",
          subDetail: `담당자 ID: ${todo.userId}`,
          icon: todo.completed ? "✅" : "⬜",
        });
      });
    }

    if (
      (activeCategory === "all" || activeCategory === "albums") &&
      albums.data
    ) {
      albums.data.forEach((album) => {
        items.push({
          id: `album-${album.id}`,
          originalId: album.id,
          type: "albums",
          name: album.title,
          detail: `앨범 #${album.id}`,
          subDetail: `소유자 ID: ${album.userId}`,
          icon: "📷",
        });
      });
    }

    return items;
  }, [activeCategory, users.data, posts.data, todos.data, albums.data]);

  // 검색어 필터링
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return allItems;
    const query = searchQuery.toLowerCase();
    return allItems.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.detail.toLowerCase().includes(query)
    );
  }, [allItems, searchQuery]);

  // 정렬
  const sortedItems = useMemo(() => {
    const sorted = [...filteredItems];
    switch (sortOption) {
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "id-asc":
        sorted.sort((a, b) => a.originalId - b.originalId);
        break;
      case "id-desc":
        sorted.sort((a, b) => b.originalId - a.originalId);
        break;
      default:
        break;
    }
    return sorted;
  }, [filteredItems, sortOption]);

  // 페이지네이션
  const totalItems = sortedItems.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedItems = sortedItems.slice(startIndex, startIndex + pageSize);

  return {
    items: paginatedItems,
    totalItems,
    totalPages,
    isLoading,
    currentPage,
    pageSize,
  };
};

export default useFilteredData;
