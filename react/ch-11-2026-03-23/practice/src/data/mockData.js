// 카테고리 목록
export const CATEGORIES = [
  { id: "all", label: "전체", icon: "📊" },
  { id: "users", label: "사용자", icon: "👥" },
  { id: "posts", label: "게시물", icon: "📝" },
  { id: "todos", label: "할 일", icon: "✅" },
  { id: "albums", label: "앨범", icon: "📷" },
];

// 정렬 옵션
export const SORT_OPTIONS = [
  { id: "default", label: "기본 정렬" },
  { id: "name-asc", label: "이름 오름차순 (A→Z)" },
  { id: "name-desc", label: "이름 내림차순 (Z→A)" },
  { id: "id-asc", label: "ID 오름차순" },
  { id: "id-desc", label: "ID 내림차순" },
];

// API 엔드포인트
export const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const API_ENDPOINTS = {
  users: `${API_BASE_URL}/users`,
  posts: `${API_BASE_URL}/posts`,
  todos: `${API_BASE_URL}/todos`,
  albums: `${API_BASE_URL}/albums`,
};

// 한 페이지에 보여줄 아이템 수 옵션
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

// 대시보드 통계 카드 설정
export const STAT_CARDS_CONFIG = [
  {
    id: "users",
    label: "전체 사용자",
    icon: "👥",
    color: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    id: "posts",
    label: "전체 게시물",
    icon: "📝",
    color: "from-emerald-500 to-emerald-600",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    id: "todos",
    label: "완료된 할 일",
    icon: "✅",
    color: "from-amber-500 to-amber-600",
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
  },
  {
    id: "albums",
    label: "전체 앨범",
    icon: "📷",
    color: "from-purple-500 to-purple-600",
    bgLight: "bg-purple-50",
    textColor: "text-purple-600",
  },
];
