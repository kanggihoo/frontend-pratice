import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../data/mockData";

// ─── [공통 fetch 함수] ──────────────────────────────────
// API 호출을 위한 공통 함수입니다.
// url을 받아서 fetch → json 변환 → 반환합니다.
// 응답이 ok가 아니면 에러를 throw 합니다.
//
// 힌트:
//   const fetchData = async (url) => {
//     const response = await fetch(url);
//     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//     return response.json();
//   };


// ─── [useUsersQuery — 사용자 목록 조회] ─────────────────
// useQuery를 사용하여 사용자 목록을 조회하는 커스텀 훅입니다.
// 매개변수: enabled (기본값 true) — 쿼리 활성화 여부
//
// useQuery 설정:
//   - queryKey: ["users"]
//   - queryFn: fetchData(API_ENDPOINTS.users) 호출
//   - enabled: 매개변수로 받은 값 사용
//
// 힌트:
//   export const useUsersQuery = (enabled = true) => {
//     return useQuery({
//       queryKey: ["users"],
//       queryFn: () => fetchData(API_ENDPOINTS.users),
//       enabled,
//     });
//   };


// ─── [usePostsQuery — 게시물 목록 조회] ─────────────────
// queryKey: ["posts"], API_ENDPOINTS.posts 사용


// ─── [useTodosQuery — 할 일 목록 조회] ──────────────────
// queryKey: ["todos"], API_ENDPOINTS.todos 사용


// ─── [useAlbumsQuery — 앨범 목록 조회] ──────────────────
// queryKey: ["albums"], API_ENDPOINTS.albums 사용


// ─── [useDashboardStats — 대시보드 통계] ────────────────
// 위에서 만든 4개의 쿼리 훅을 모두 호출하여 통계 데이터를 집계합니다.
//
// 1. 4개의 쿼리를 모두 호출합니다.
// 2. isLoading: 하나라도 로딩 중이면 true
// 3. isError: 하나라도 에러면 true
// 4. stats 객체를 만듭니다:
//    - users: users.data의 길이
//    - posts: posts.data의 길이
//    - todos: todos.data에서 completed가 true인 항목의 길이
//    - albums: albums.data의 길이
//
// 힌트:
//   export const useDashboardStats = () => {
//     const users = useUsersQuery();
//     const posts = usePostsQuery();
//     const todos = useTodosQuery();
//     const albums = useAlbumsQuery();
//
//     const isLoading = users.isLoading || posts.isLoading || ...;
//     const stats = {
//       users: users.data?.length ?? 0,
//       ...
//     };
//     return { stats, isLoading, isError };
//   };


// ─── [useUserPostsQuery — 특정 사용자 게시물 조회] ──────
// userId를 받아서 해당 사용자의 게시물을 조회합니다.
// queryKey: ["posts", "user", userId]
// enabled: !!userId (userId가 있을 때만 실행)

