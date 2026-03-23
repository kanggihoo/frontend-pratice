const BASE_URL = "https://jsonplaceholder.typicode.com";
const PAGE_SIZE = 10;

/**
 * 게시글 목록 조회 (무한 스크롤용)
 * @param {number} pageParam - 현재 페이지 (1부터 시작)
 * @returns {{ posts: Array, nextPage: number|null, totalPages: number }}
 */
export async function fetchPosts(pageParam = 1) {
  const response = await fetch(
    `${BASE_URL}/posts?_page=${pageParam}&_limit=${PAGE_SIZE}`
  );

  if (!response.ok) {
    throw new Error("게시글 목록을 불러오는데 실패했습니다.");
  }

  const posts = await response.json();
  const totalCount = Number(response.headers.get("x-total-count") || 100);
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return {
    posts,
    nextPage: pageParam < totalPages ? pageParam + 1 : null,
    totalPages,
  };
}

/**
 * 게시글 상세 조회
 * @param {number} id - 게시글 ID
 */
export async function fetchPost(id) {
  const response = await fetch(`${BASE_URL}/posts/${id}`);

  if (!response.ok) {
    throw new Error("게시글을 불러오는데 실패했습니다.");
  }

  return response.json();
}

/**
 * 게시글의 댓글 조회
 * @param {number} postId - 게시글 ID
 */
export async function fetchComments(postId) {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);

  if (!response.ok) {
    throw new Error("댓글을 불러오는데 실패했습니다.");
  }

  return response.json();
}

/**
 * 게시글 작성
 * JSONPlaceholder는 실제로 저장하지 않지만 201 응답을 반환합니다.
 * @param {{ title: string, body: string }} newPost
 */
export async function createPost(newPost) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...newPost, userId: 1 }),
  });

  if (!response.ok) {
    throw new Error("게시글 작성에 실패했습니다.");
  }

  return response.json();
}

/**
 * 게시글 수정
 * @param {{ id: number, title: string, body: string }} updatedPost
 */
export async function updatePost({ id, ...data }) {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("게시글 수정에 실패했습니다.");
  }

  return response.json();
}

/**
 * 게시글 삭제
 * @param {number} id - 게시글 ID
 */
export async function deletePost(id) {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("게시글 삭제에 실패했습니다.");
  }

  return { id };
}

export { PAGE_SIZE };
