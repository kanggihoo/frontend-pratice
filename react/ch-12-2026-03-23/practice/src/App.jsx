import useUiStore from "./store/uiStore";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import CartPanel from "./components/CartPanel";
import WishlistPanel from "./components/WishlistPanel";
import OrderForm from "./components/OrderForm";
import ToastContainer from "./components/ToastContainer";

// ─── [App 컴포넌트] ──────────────────────────────────────
// 앱의 최상위 레이아웃 컴포넌트입니다.
// 역할:
// 1. 다크모드 상태에 따라 "dark" 클래스를 최상위 div에 적용
// 2. 모든 하위 컴포넌트를 배치 (레이아웃 담당)
// 3. 오버레이 패널/모달 컴포넌트를 렌더링

export default function App() {
  // ─── [다크모드 상태 구독] ──────────────────────────────
  // Zustand uiStore에서 darkMode를 구독합니다.
  // 힌트: const darkMode = useUiStore((state) => state.darkMode);


  return (
    // ─── [다크모드 wrapper] ──────────────────────────────
    // darkMode가 true이면 className="dark"을 적용합니다.
    // Tailwind CSS의 dark: 접두사가 작동하려면 부모에 "dark" 클래스가 필요합니다.
    // 힌트: <div className={darkMode ? "dark" : ""}>
    <div>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
        {/* 헤더 */}
        <Header />

        {/* 메인 콘텐츠 */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* 카테고리 필터 */}
          <section className="mb-6">
            <CategoryFilter />
          </section>

          {/* 상품 목록 */}
          <section>
            <ProductList />
          </section>
        </main>

        {/* 오버레이 패널/모달들 */}
        <ProductDetail />
        <CartPanel />
        <WishlistPanel />
        <OrderForm />
        <ToastContainer />
      </div>
    </div>
  );
}
