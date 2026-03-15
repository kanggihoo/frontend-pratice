"use client";

import { createPost } from "@/lib/actions";
import { useRef, useState } from "react";

export default function PostForm() {
  const formRef = useRef(null);
  const [error, setError] = useState("");

  async function handleSubmit(formData) {
    setError("");
    const result = await createPost(formData);
    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      formRef.current?.reset();
    }
  }

  return (
    <form ref={formRef} action={handleSubmit}>
      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <input
          name="author"
          placeholder="작성자"
          required
          className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          name="title"
          placeholder="제목 (50자 이하)"
          required
          maxLength={50}
          className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <textarea
        name="content"
        placeholder="내용을 입력하세요... (500자 이하)"
        rows={3}
        required
        maxLength={500}
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4 resize-none"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer"
      >
        작성하기 → revalidatePath(&apos;/&apos;) 호출
      </button>
    </form>
  );
}
