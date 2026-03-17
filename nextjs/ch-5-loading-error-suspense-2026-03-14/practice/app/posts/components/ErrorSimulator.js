// ─── [클라이언트 컴포넌트 — 에러 시뮬레이션 버튼] ────
// error.js가 제대로 동작하는지 테스트하기 위한 도구입니다.

"use client";
import { use, useState } from "react";

export default function ErrorSimulator() {
  // ─── [에러 상태 관리] ──────────────────────────────
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error("사용자가 의도적으로 에러를 발생시켰습니다! 🧪");
  }

  return (
    <button
      onClick={() => setShouldError(true)}
      className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors cursor-pointer"
    >
      💣 에러 시뮬레이션
    </button>
  );
}
