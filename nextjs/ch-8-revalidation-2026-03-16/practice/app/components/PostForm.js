// ─── [클라이언트 컴포넌트 선언] ──────────────────────
// 이 컴포넌트는 useState, useRef 등 React 훅을 사용하므로
// 클라이언트에서 실행되어야 합니다.
// 힌트: 파일 최상단에 "use client"; 지시어를 추가하세요.
//
// "use client"를 선언한 뒤 아래 훅 import와 로직을 활성화하세요:
// import { useRef, useState } from "react";

// ─── [Server Action 임포트] ──────────────────────────
// 게시글 작성 Server Action을 import하세요.
// 힌트: import { createPost } from "@/lib/actions";

export default function PostForm() {
  // ─── [상태 관리 (클라이언트 컴포넌트 전환 후 활성화)] ──────
  // const formRef = useRef(null);
  // const [error, setError] = useState("");

  // ─── [폼 제출 핸들러] ──────────────────────────────
  // Server Action을 호출하여 게시글을 작성하고,
  // 성공하면 폼을 초기화, 실패하면 에러를 표시하세요.
  //
  // 힌트:
  // async function handleSubmit(formData) {
  //   setError("");
  //   const result = await createPost(formData);
  //   if (result?.error) setError(result.error);
  //   else if (result?.success) formRef.current?.reset();
  // }

  return (
    // ─── [form action 연결] ──────────────────────────
    // form의 action 속성에 handleSubmit을 연결하세요.
    // 힌트: <form ref={formRef} action={handleSubmit}>
    <form>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* ─── [입력 필드 스타일링] ────────────────────────
            Tailwind CSS로 입력 필드를 스타일링하세요.
            힌트: border border-gray-200 rounded-lg px-4 py-2.5 text-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-500
        ──────────────────────────────────────────────── */}
        <input
          name="author"
          placeholder="작성자"
          required
          className=""
        />
        <input
          name="title"
          placeholder="제목 (50자 이하)"
          required
          maxLength={50}
          className=""
        />
      </div>
      <textarea
        name="content"
        placeholder="내용을 입력하세요... (500자 이하)"
        rows={3}
        required
        maxLength={500}
        className="w-full mb-4 resize-none"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer"
      >
        작성하기
      </button>
    </form>
  );
}
