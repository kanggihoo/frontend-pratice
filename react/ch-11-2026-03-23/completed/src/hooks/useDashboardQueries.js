import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../data/mockData";

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// 사용자 목록 조회
export const useUsersQuery = (enabled = true) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchData(API_ENDPOINTS.users),
    enabled,
  });
};

// 게시물 목록 조회
export const usePostsQuery = (enabled = true) => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchData(API_ENDPOINTS.posts),
    enabled,
  });
};

// 할 일 목록 조회
export const useTodosQuery = (enabled = true) => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchData(API_ENDPOINTS.todos),
    enabled,
  });
};

// 앨범 목록 조회
export const useAlbumsQuery = (enabled = true) => {
  return useQuery({
    queryKey: ["albums"],
    queryFn: () => fetchData(API_ENDPOINTS.albums),
    enabled,
  });
};

// 대시보드 통계 데이터 (모든 데이터를 한번에 조회)
export const useDashboardStats = () => {
  const users = useUsersQuery();
  const posts = usePostsQuery();
  const todos = useTodosQuery();
  const albums = useAlbumsQuery();

  const isLoading =
    users.isLoading || posts.isLoading || todos.isLoading || albums.isLoading;
  const isError =
    users.isError || posts.isError || todos.isError || albums.isError;

  const stats = {
    users: users.data?.length ?? 0,
    posts: posts.data?.length ?? 0,
    todos: todos.data?.filter((t) => t.completed).length ?? 0,
    albums: albums.data?.length ?? 0,
  };

  return { stats, isLoading, isError };
};

// 특정 사용자의 게시물 조회
export const useUserPostsQuery = (userId) => {
  return useQuery({
    queryKey: ["posts", "user", userId],
    queryFn: () => fetchData(`${API_ENDPOINTS.posts}?userId=${userId}`),
    enabled: !!userId,
  });
};
