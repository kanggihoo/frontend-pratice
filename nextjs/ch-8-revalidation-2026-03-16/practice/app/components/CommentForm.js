// ─── [클라이언트 컴포넌트 선언] ──────────────────────
// 이 컴포넌트는 useState, useRef를 사용하므로 클라이언트 컴포넌트여야 합니다.
// 힌트: "use client"; 지시어를 추가하세요.
//
// "use client"를 선언한 뒤 아래 훅 import와 로직을 활성화하세요:
// import { useRef, useState } from "react";

// ─── [Server Action 임포트] ──────────────────────────
// 댓글 작성 Server Action을 import하세요.
// 힌트: import { createComment } from "@/lib/actions";

export default function CommentForm({ postId }) {
  // ─── [상태 관리 (클라이언트 컴포넌트 전환 후 활성화)] ──────
  // const formRef = useRef(null);
  // const [error, setError] = useState("");

  // ─── [폼 제출 핸들러] ──────────────────────────────
  // Server Action(createComment)을 호출하여 댓글을 작성하세요.
  // createComment 액션 내부에서 revalidatePath가 호출되어
  // 게시글 상세 페이지와 메인 페이지가 자동으로 갱신됩니다.
  //
  // 힌트:
  // async function handleSubmit(formData) {
  //   setError("");
  //   const result = await createComment(formData);
  //   if (result?.error) setError(result.error);
  //   else if (result?.success) formRef.current?.reset();
  // }

  return (
    // ─── [form action 연결] ──────────────────────────
    // form의 action에 handleSubmit을 연결하세요.
    // 힌트: <form ref={formRef} action={handleSubmit}>
    <form>
      <input type="hidden" name="postId" value={postId} />
      <div className="flex gap-3 mb-4">
        <input
          name="author"
          placeholder="작성자"
          required
          className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-1/3"
        />
        <input
          name="content"
          placeholder="댓글을 입력하세요... (200자 이하)"
          required
          maxLength={200}
          className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1"
        />
      </div>
      <button
        type="submit"
        className="bg-gray-800 text-white font-medium py-2 px-6 rounded-lg hover:bg-gray-900 transition-colors text-sm cursor-pointer"
      >
        댓글 달기
      </button>
    </form>
  );
}
