// ─── [댓글 목록 컴포넌트] ─────────────────────────────
// 포스트 상세 페이지 하단에 표시되는 댓글 목록입니다.
// 이 컴포넌트는 서버 컴포넌트로, props로 댓글 배열을 전달받습니다.

export default function CommentList({ comments }) {
  return (
    <section className="mt-10">
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        💬 댓글 ({comments.length})
      </h3>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-gray-50 rounded-lg p-5 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">
                {comment.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-700 text-sm capitalize">
                  {comment.name}
                </p>
                <p className="text-xs text-gray-400">{comment.email}</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed pl-11">
              {comment.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
