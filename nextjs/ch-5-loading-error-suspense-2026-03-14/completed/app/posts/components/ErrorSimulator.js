"use client";

import { useState } from "react";

export default function ErrorSimulator() {
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
