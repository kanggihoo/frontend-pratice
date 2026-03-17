// ─── [클라이언트 컴포넌트 선언] ──────────────────────────
// 이 컴포넌트는 useState와 onClick 이벤트를 사용하므로
// 클라이언트에서 실행되어야 합니다.
// 힌트: 파일 최상단에 "use client"; 지시어를 추가하세요.

// ─── [React 훅 임포트] ─────────────────────────────────
// 힌트: import { useState } from "react";

export default function LikeButton() {
  // ─── [좋아요 상태 관리] ───────────────────────────────
  // 힌트:
  // const [liked, setLiked] = useState(false);
  // const [count, setCount] = useState(Math.floor(Math.random() * 50) + 10);

  // ─── [좋아요 토글 핸들러] ─────────────────────────────
  // 힌트:
  // const handleLike = () => {
  //   setLiked(!liked);
  //   setCount((prev) => (liked ? prev - 1 : prev + 1));
  // };

  return (
    <button
      // ─── [클릭 이벤트 연결] ───────────────────────────
      // 힌트: onClick={handleLike}
      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200"
    >
      {/* ─── [조건부 렌더링] ──────────────────────────────
       * 힌트: liked 상태에 따라 아이콘과 스타일을 변경하세요.
       * liked ? "❤️" : "🤍"
       * count 변수로 좋아요 수를 표시하세요.
       */}
      <span className="text-lg">🤍</span>
      <span>0</span>
    </button>
  );
}
