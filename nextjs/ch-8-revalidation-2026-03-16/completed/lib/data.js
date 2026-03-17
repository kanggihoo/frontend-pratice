import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "board.json");

// JSON 파일에서 전체 데이터 읽기
export async function readDB() {
  const raw = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

// JSON 파일에 전체 데이터 쓰기
export async function writeDB(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// 게시글 목록 조회 (댓글 수 포함, 최신순 정렬)
export async function getPosts() {
  const db = await readDB();
  return db.posts
    .map((post) => ({
      ...post,
      commentCount: db.comments.filter((c) => c.postId === post.id).length,
    }))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// 게시글 단건 조회
export async function getPost(id) {
  const db = await readDB();
  return db.posts.find((p) => p.id === id) || null;
}

// 특정 게시글의 댓글 조회 (최신순)
export async function getComments(postId) {
  const db = await readDB();
  return db.comments
    .filter((c) => c.postId === postId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}
