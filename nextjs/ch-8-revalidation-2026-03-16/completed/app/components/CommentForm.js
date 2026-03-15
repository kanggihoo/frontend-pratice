"use client";

import { createComment } from "@/lib/actions";
import { useRef, useState } from "react";

export default function CommentForm({ postId }) {
  const formRef = useRef(null);
  const [error, setError] = useState("");

  async function handleSubmit(formData) {
    setError("");
    const result = await createComment(formData);
    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      formRef.current?.reset();
    }
  }

  return (
    <form ref={formRef} action={handleSubmit}>
      <input type="hidden" name="postId" value={postId} />
      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">
          {error}
        </div>
      )}
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
        댓글 달기 → revalidatePath 호출
      </button>
    </form>
  );
}
