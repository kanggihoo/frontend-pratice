"use client";

// 클라이언트 컴포넌트 — 사용자의 클릭(이벤트)에 따라 상태가 변하므로 "use client"가 필요합니다.
// useState를 사용하여 현재 선택된 카테고리를 관리합니다.

import { useState } from "react";
import { categories } from "@/data/mockData";

export default function CategoryFilter({ onFilterChange }) {
  const [activeCategory, setActiveCategory] = useState("전체");

  const handleClick = (category) => {
    setActiveCategory(category);
    onFilterChange(category);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleClick(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
            activeCategory === category
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
              : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
