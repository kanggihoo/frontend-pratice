// ─── [클라이언트 컴포넌트 선언] ──────────────────────────
// 이 컴포넌트는 useRef 훅과 사용자 인터랙션(alert)을 사용하므로
// 클라이언트에서 실행되어야 합니다.
"use client";

import { useRef } from "react";
import { addGuestbookEntry } from "@/lib/actions";

export default function GuestbookForm() {
  // ─── [폼 참조 생성] ──────────────────────────────────
  const formRef = useRef(null);

  // ─── [폼 제출 핸들러] ─────────────────────────────────
  // Server Action을 래핑하여 결과에 따라 에러 표시 또는 폼 초기화를 합니다.
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
    // ─── [폼 요소] ──────────────────────────────────────
    // 핵심! <form>의 action 속성에 Server Action 함수를 전달합니다.
    // 이것이 Next.js Server Actions의 핵심 패턴입니다!
    //
    // React에서는: <form onSubmit={handleSubmit}> + e.preventDefault() + fetch(...)
    // Next.js에서는: <form action={handleSubmit}> → 서버 함수가 직접 실행!
    //

    <form
      ref={formRef}
      action={handleSubmit}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-5"
    >
      <h3 className="text-lg font-semibold text-gray-800">글 남기기</h3>

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
