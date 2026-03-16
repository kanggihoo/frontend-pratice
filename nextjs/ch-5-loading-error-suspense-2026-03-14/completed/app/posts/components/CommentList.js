const API_URL = "https://jsonplaceholder.typicode.com/comments";

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getComments(postId) {
  await delay(3000); // 3초 딜레이 — 게시글 본문보다 늦게 도착하여 스트리밍을 체감
  const res = await fetch(`${API_URL}?postId=${postId}`);
  if (!res.ok) {
    throw new Error("댓글을 불러오는데 실패했습니다.");
  }
  return res.json();
}

export default async function CommentList({ postId }) {
  const comments = await getComments(postId);

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white p-4 rounded-xl border border-gray-100"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-bold text-indigo-600">
              {comment.name.charAt(0).toUpperCase()}
            </div>
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
