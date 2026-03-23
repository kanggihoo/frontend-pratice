import { useMemo } from "react";
import useDashboardStore from "../store/dashboardStore";
// ─── [쿼리 훅 import] ──────────────────────────────────
// useDashboardQueries.js에서 만든 4개의 쿼리 훅을 import하세요.
// 힌트: import { useUsersQuery, usePostsQuery, useTodosQuery, useAlbumsQuery } from "./useDashboardQueries";


const useFilteredData = () => {
  // ─── [Zustand 스토어에서 필터 상태 가져오기] ──────────
  // dashboardStore에서 필터 관련 상태를 구조분해로 가져오세요.
  // 필요한 상태: activeCategory, searchQuery, sortOption, pageSize, currentPage
  //
  // 힌트: const { activeCategory, searchQuery, ... } = useDashboardStore();


  // ─── [조건부 쿼리 실행 — enabled 옵션 활용] ──────────
  // 선택된 카테고리에 따라 필요한 쿼리만 실행합니다.
  // "all"이면 모든 쿼리 실행, 특정 카테고리면 해당 쿼리만 실행
  //
  // 이것이 Zustand + TanStack Query 연계의 핵심입니다!
  // → Zustand의 필터 상태가 TanStack Query의 enabled 옵션을 제어합니다.
  //
  // 힌트:
  //   const users = useUsersQuery(activeCategory === "all" || activeCategory === "users");
  //   const posts = usePostsQuery(activeCategory === "all" || activeCategory === "posts");
  //   ...


  // ─── [로딩 상태 계산] ─────────────────────────────────
  // 하나라도 로딩 중이면 isLoading = true


  // ─── [통합 리스트 생성 — useMemo 사용] ────────────────
  // 각 카테고리의 데이터를 하나의 통합 형식으로 변환합니다.
  // useMemo를 사용하여 불필요한 재계산을 방지합니다.
  //
  // 통합 아이템 형식:
  //   {
  //     id: "user-1",         // 타입-원본ID (고유 key용)
  //     originalId: 1,        // 원본 ID (정렬/즐겨찾기용)
  //     type: "users",        // 카테고리 타입
  //     name: "사용자 이름",   // 표시할 이름
  //     detail: "이메일 등",   // 세부 정보
  //     subDetail: "회사명",   // 추가 정보
  //     icon: "👥",           // 아이콘
  //   }
  //
  // 각 카테고리별 변환 규칙:
  //   users → name: user.name, detail: user.email, subDetail: user.company?.name
  //   posts → name: post.title, detail: post.body.slice(0, 80)+"...", subDetail: `작성자 ID: ${post.userId}`
  //   todos → name: todo.title, detail: todo.completed ? "완료" : "미완료", subDetail: `담당자 ID: ${todo.userId}`
  //   albums → name: album.title, detail: `앨범 #${album.id}`, subDetail: `소유자 ID: ${album.userId}`
  //
  // 힌트:
  //   const allItems = useMemo(() => {
  //     const items = [];
  //     if ((activeCategory === "all" || activeCategory === "users") && users.data) {
  //       users.data.forEach((user) => {
  //         items.push({ id: `user-${user.id}`, originalId: user.id, type: "users", ... });
  //       });
  //     }
  //     // posts, todos, albums도 동일한 패턴으로...
  //     return items;
  //   }, [activeCategory, users.data, posts.data, todos.data, albums.data]);


  // ─── [검색어 필터링 — useMemo 사용] ──────────────────
  // searchQuery가 비어있으면 전체 반환, 아니면 name/detail에서 검색
  // 힌트:
  //   const filteredItems = useMemo(() => {
  //     if (!searchQuery.trim()) return allItems;
  //     const query = searchQuery.toLowerCase();
  //     return allItems.filter(item =>
  //       item.name.toLowerCase().includes(query) ||
  //       item.detail.toLowerCase().includes(query)
  //     );
  //   }, [allItems, searchQuery]);


  // ─── [정렬 — useMemo 사용] ───────────────────────────
  // sortOption에 따라 정렬합니다. 원본 배열을 변경하지 않도록
  // spread로 복사 후 sort합니다.
  //
  // 정렬 옵션:
  //   "name-asc": a.name.localeCompare(b.name)
  //   "name-desc": b.name.localeCompare(a.name)
  //   "id-asc": a.originalId - b.originalId
  //   "id-desc": b.originalId - a.originalId
  //   "default": 정렬 없음


  // ─── [페이지네이션 계산] ──────────────────────────────
  // 1. totalItems: 정렬된 배열의 길이
  // 2. totalPages: Math.ceil(totalItems / pageSize)
  // 3. startIndex: (currentPage - 1) * pageSize
  // 4. paginatedItems: sortedItems.slice(startIndex, startIndex + pageSize)


  // ─── [반환값] ─────────────────────────────────────────
  // 아래 형태로 반환하세요:
  // return { items: paginatedItems, totalItems, totalPages, isLoading, currentPage, pageSize };

  return { items: [], totalItems: 0, totalPages: 0, isLoading: false, currentPage: 1, pageSize: 10 };
};

export default useFilteredData;
