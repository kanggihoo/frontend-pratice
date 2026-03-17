"use client";

import { useState } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(Math.floor(Math.random() * 50) + 10);

  const handleLike = () => {
    setLiked(!liked);
    setCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
        liked
          ? "bg-red-50 text-red-600 border border-red-200"
          : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200"
      }`}
    >
      <span className="text-lg">{liked ? "❤️" : "🤍"}</span>
      <span>{count}</span>
    </button>
  );
}
