import useCartStore from "../store/cartStore";
import useWishlistStore from "../store/wishlistStore";
import useUiStore from "../store/uiStore";
import SearchBar from "./SearchBar";

// ─── [Header 컴포넌트] ───────────────────────────────────
// 앱 상단에 고정되는 헤더입니다.
// - 로고
// - SearchBar 컴포넌트
// - 다크모드 토글, 위시리스트, 장바구니 버튼
// 각 버튼 옆에 카운트 배지를 표시합니다.

export default function Header() {
  // ─── [Zustand 스토어 구독] ─────────────────────────────
  // 여러 스토어에서 필요한 값들을 selector로 구독합니다.
  //
  // 힌트:
  //   const totalCount = useCartStore((state) => state.getTotalCount());
  //   const wishlistCount = useWishlistStore((state) => state.items.length);
  //   const darkMode = useUiStore((state) => state.darkMode);
  //   const toggleDarkMode = useUiStore((state) => state.toggleDarkMode);
  //   const setCartOpen = useUiStore((state) => state.setCartOpen);
  //   const setWishlistOpen = useUiStore((state) => state.setWishlistOpen);


  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* 로고 */}
          <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
            ShopMini
          </h1>

          {/* 검색바 */}
          <SearchBar />

          {/* 우측 버튼들 */}
          <div className="flex items-center gap-2 shrink-0">
            {/* ─── [다크모드 토글 버튼] ──────────────────── */}
            {/* onClick에 toggleDarkMode를 연결하세요 */}
            {/* darkMode 상태에 따라 해/달 아이콘을 전환합니다 */}
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <span className="text-lg">🌙</span>
            </button>

            {/* ─── [위시리스트 버튼] ──────────────────────── */}
            {/* onClick에서 setWishlistOpen(true)를 호출하세요 */}
            {/* wishlistCount > 0이면 배지를 표시합니다 */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <span className="text-lg">♡</span>
              {/* 배지: absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs rounded-full */}
            </button>

            {/* ─── [장바구니 버튼] ────────────────────────── */}
            {/* onClick에서 setCartOpen(true)를 호출하세요 */}
            {/* totalCount > 0이면 배지를 표시합니다 */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <span className="text-lg">🛒</span>
              {/* 배지: absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-xs rounded-full */}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
