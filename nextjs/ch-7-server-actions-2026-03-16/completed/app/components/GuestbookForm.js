"use client";

import { useRef } from "react";
import { addGuestbookEntry } from "@/lib/actions";

export default function GuestbookForm() {
  const formRef = useRef(null);

  async function handleSubmit(formData) {
    const result = await addGuestbookEntry(formData);

    if (result?.error) {
      alert(result.error);
      return;
    }

    // 성공 시 폼 초기화
    formRef.current?.reset();
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-5"
    >
      <h3 className="text-lg font-semibold text-gray-800">
        글 남기기
      </h3>

      {/* 이름 입력 */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          이름
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          maxLength={20}
          placeholder="이름을 입력하세요"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        />
      </div>

      {/* 메시지 입력 */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          메시지
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={200}
          rows={3}
          placeholder="방명록에 남길 메시지를 작성하세요"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
        />
      </div>

      {/* 제출 버튼 */}
      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 active:bg-indigo-800 transition cursor-pointer"
      >
        글 남기기
      </button>
    </form>
  );
}
