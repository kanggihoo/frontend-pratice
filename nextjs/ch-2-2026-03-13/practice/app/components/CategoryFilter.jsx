// ─── [클라이언트 컴포넌트 선언] ──────────────────────────
// 이 컴포넌트는 사용자의 클릭 이벤트에 따라 상태(State)가 변해야 합니다.
// Next.js App Router에서 useState, useEffect 같은 React 훅이나
// onClick 같은 이벤트 핸들러를 사용하려면 반드시 클라이언트 컴포넌트여야 합니다.
//
// 힌트: 파일의 가장 첫 줄에 "use client"; 를 추가하세요.
// (따옴표와 세미콜론 포함, 문자열 지시어 형태)
// ─────────────────────────────────────────────────────

// ─── [useState 임포트] ────────────────────────────────
// React의 useState 훅을 임포트하세요.
// 힌트: import { useState } from "react";
// ─────────────────────────────────────────────────────

import { categories } from "@/data/mockData";

export default function CategoryFilter({ onFilterChange }) {
  // ─── [상태 선언] ──────────────────────────────────────
  // 현재 선택된 카테고리를 추적할 상태를 선언하세요.
  // 초기값은 "전체"입니다.
  // 힌트: const [activeCategory, setActiveCategory] = useState("전체");
  // ─────────────────────────────────────────────────────
  const activeCategory = "전체"; // ← 이 줄을 useState로 교체하세요

  const handleClick = (category) => {
    // ─── [상태 업데이트 및 콜백 호출] ──────────────────────
    // 1. activeCategory 상태를 클릭된 category로 업데이트하세요.
    // 2. 부모에게 필터 변경을 알리기 위해 onFilterChange(category)를 호출하세요.
    //
    // 힌트:
    // setActiveCategory(category);
    // onFilterChange(category);
    // ─────────────────────────────────────────────────────
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleClick(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
            activeCategory === category
              ? ""
              : ""
          }`}
          // ─── [조건부 스타일링] ──────────────────────────
          // 활성화된 카테고리: bg-indigo-600 text-white shadow-md shadow-indigo-200
          // 비활성 카테고리: bg-white text-gray-600 border border-gray-200
          //                 hover:border-indigo-300 hover:text-indigo-600
          // 위의 빈 문자열("")에 각각의 클래스를 채워 넣으세요.
          // ──────────────────────────────────────────────
        >
          {category}
        </button>
      ))}
    </div>
  );
}
