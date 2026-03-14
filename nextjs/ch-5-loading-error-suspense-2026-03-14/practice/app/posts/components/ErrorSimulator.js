// ─── [클라이언트 컴포넌트 — 에러 시뮬레이션 버튼] ────
// 이 컴포넌트는 버튼 클릭 시 의도적으로 에러를 발생시킵니다.
// error.js가 제대로 동작하는지 테스트하기 위한 도구입니다.
//
// 주의: useState를 사용하므로 반드시 "use client" 지시어가 필요합니다!
// ─────────────────────────────────────────────────────

// ─── ["use client" 지시어] ───────────────────────────
// 힌트: 파일 최상단에 "use client"; 를 추가하세요.

// ─── [useState 임포트] ──────────────────────────────
// 힌트: import { useState } from "react";

export default function ErrorSimulator() {
  // ─── [에러 상태 관리] ──────────────────────────────
  // shouldError 상태가 true가 되면 throw new Error()로 에러를 발생시킵니다.
  // 힌트:
  // const [shouldError, setShouldError] = useState(false);
  //
  // if (shouldError) {
  //   throw new Error("사용자가 의도적으로 에러를 발생시켰습니다! 🧪");
  // }

  return (
    <button
      // ─── [onClick 핸들러] ─────────────────────────
      // 힌트: onClick={() => setShouldError(true)}
      className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors cursor-pointer"
    >
      💣 에러 시뮬레이션
    </button>
  );
}
