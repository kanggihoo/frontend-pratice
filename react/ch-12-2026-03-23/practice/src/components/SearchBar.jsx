import { useRef, useEffect, useCallback } from "react";
import useUiStore from "../store/uiStore";

// ─── [SearchBar 컴포넌트] ─────────────────────────────────
// 검색 입력 필드입니다.
// - useRef로 input DOM에 접근하여 Ctrl+K 단축키 시 포커스
// - useCallback으로 이벤트 핸들러 메모이제이션
// - Zustand uiStore의 searchQuery 상태를 읽고 씁니다

export default function SearchBar() {
  // ─── [useRef 선언] ─────────────────────────────────────
  // input 요소에 대한 ref를 생성합니다
  // 힌트: const inputRef = useRef(null);


  // ─── [Zustand 스토어 구독] ─────────────────────────────
  // searchQuery와 setSearchQuery를 구독합니다
  // 힌트:
  //   const searchQuery = useUiStore((state) => state.searchQuery);
  //   const setSearchQuery = useUiStore((state) => state.setSearchQuery);


  // ─── [Ctrl+K 단축키 핸들러] ────────────────────────────
  // useCallback으로 메모이제이션합니다.
  // (e.ctrlKey || e.metaKey) && e.key === "k" 일 때:
  //   e.preventDefault()로 브라우저 기본 동작을 막고
  //   inputRef.current?.focus()로 검색바에 포커스합니다
  //
  // 힌트:
  //   const handleKeyDown = useCallback((e) => {
  //     if ((e.ctrlKey || e.metaKey) && e.key === "k") { ... }
  //   }, []);


  // ─── [키보드 이벤트 등록/해제] ─────────────────────────
  // useEffect로 window에 keydown 이벤트를 등록하고,
  // cleanup에서 해제합니다.
  // 의존성 배열에 handleKeyDown을 넣습니다.


  return (
    <div className="relative flex-1 max-w-md">
      {/* 돋보기 아이콘 (SVG) */}
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      {/* ─── [검색 입력 필드] ────────────────────────────── */}
      {/* ref={inputRef}를 연결하세요 */}
      {/* value={searchQuery}로 제어 컴포넌트로 만드세요 */}
      {/* onChange에서 setSearchQuery(e.target.value)를 호출하세요 */}
      <input
        type="text"
        placeholder="상품 검색... (Ctrl+K)"
        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
      />

      {/* ─── [검색어 지우기 버튼] ─────────────────────────── */}
      {/* searchQuery가 있을 때만 렌더링합니다 */}
      {/* 클릭 시 setSearchQuery("")를 호출합니다 */}
    </div>
  );
}
