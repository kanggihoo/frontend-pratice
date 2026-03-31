"use client";

import { useActionState } from "react";
import { addEntry } from "@/lib/actions";
// TODO: ActionResult를 lib/types.ts에 정의한 후 import 주석을 해제하세요.
// import type { ActionResult } from "@/lib/types";

// ─── [useActionState 타입 파라미터] ───────────────────────────────────────────
//
// JavaScript 버전:
//   const [result, formAction, isPending] = useActionState(addEntry, null);
//
// TypeScript 버전:
//   useActionState는 제네릭 훅입니다. 타입 파라미터 2개를 받습니다.
//   useActionState<State, Payload>(action, initialState)
//     - State   : 상태 타입 → ActionResult | null
//     - Payload : 액션에 전달되는 데이터 타입 → FormData
//
// 힌트:
//   const [result, formAction, isPending] = useActionState<
//     ActionResult | null,
//     FormData
//   >(addEntry, null);
//
// 주의: ActionResult를 lib/types.ts에 먼저 정의해야 사용할 수 있습니다.
import type { ActionResult } from "@/lib/types";
export default function GuestbookForm() {
  // TODO: useActionState에 타입 파라미터를 추가하세요.
  const [result, formAction, isPending] = useActionState<
    ActionResult | null,
    FormData
  >(addEntry, null);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        방명록 남기기
      </h2>

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

        {/* TODO: result 타입을 정의하면 result.success로 성공/실패를 구분할 수 있습니다. */}
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
