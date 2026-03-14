// ─── [서버 컴포넌트 — 댓글 목록] ────────────────────
// 이 컴포넌트는 게시글의 댓글을 서버에서 가져와 렌더링합니다.
// 게시글 본문보다 더 긴 딜레이를 주어,
// Suspense 스트리밍에서 "댓글이 나중에 도착하는" 경험을 만듭니다.

const API_URL = "https://jsonplaceholder.typicode.com/comments";

// ─── [딜레이 함수] ───────────────────────────────────
// 힌트: delay(3000)으로 3초 딜레이 → 게시글 본문(1.5초)보다 늦게 도착
// async function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// ─── [댓글 데이터 페칭 함수] ─────────────────────────
// postId를 받아서 해당 게시글의 댓글을 가져오세요.
// 힌트:
// async function getComments(postId) {
//   await delay(3000);
//   const res = await fetch(`${API_URL}?postId=${postId}`);
//   if (!res.ok) throw new Error("댓글을 불러오는데 실패했습니다.");
//   return res.json();
// }

// ─── [async 서버 컴포넌트] ───────────────────────────
// props로 postId를 받습니다.
// 힌트: export default async function CommentList({ postId }) {
export default function CommentList({ postId }) {
  // ─── [데이터 페칭] ──────────────────────────────────
  // const comments = await getComments(postId);
  const comments = []; // ← 실제 데이터 페칭으로 교체하세요

  if (comments.length === 0) {
    return (
      <div className="text-center py-6 text-gray-400">
        댓글이 없습니다. 데이터 페칭 로직을 구현해보세요!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white p-4 rounded-xl border border-gray-100"
        >
          <div className="flex items-center gap-2 mb-2">
            {/* ─── [아바타] ─────────────────────────────
             * comment.name의 첫 글자를 원형 뱃지로 표시하세요.
             * 힌트:
             * <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-bold text-indigo-600">
             *   {comment.name.charAt(0).toUpperCase()}
             * </div>
             * ─────────────────────────────────────── */}
            <span className="text-sm font-medium text-gray-700 truncate max-w-xs">
              {comment.name}
            </span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {comment.body}
          </p>
        </div>
      ))}
    </div>
  );
}
