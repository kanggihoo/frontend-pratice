"use client";

import { useActionState } from "react";
import { addEntry } from "@/lib/actions";
import type { ActionResult } from "@/lib/types";

// ─── Props 타입 ────────────────────────────────────────────────────────────────
// 이 컴포넌트는 Props를 받지 않으므로 Props 타입 정의 불필요

// ─── useActionState 초기값 타입 ────────────────────────────────────────────────
// useActionState<State, Payload>에서:
//   State   = ActionResult | null  (상태 타입)
//   Payload = FormData             (액션에 전달되는 데이터 타입)
//
// 초기값은 State 타입과 일치해야 합니다 → null (ActionResult | null)

export default function GuestbookForm() {
  const [result, formAction, isPending] = useActionState<
    ActionResult | null,
    FormData
  >(addEntry, null);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">방명록 남기기</h2>

      <form action={formAction} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            이름
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="홍길동"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            메시지
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="방명록에 남길 메시지를 입력하세요..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* ActionResult 타입에 따른 결과 표시 */}
        {result && (
          <p
            className={`text-sm font-medium ${
              result.success ? "text-green-600" : "text-red-600"
            }`}
          >
            {result.success ? result.message : result.error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? "등록 중..." : "방명록 등록"}
        </button>
      </form>
    </div>
  );
}
