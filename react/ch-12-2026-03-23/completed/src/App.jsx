import useUiStore from "./store/uiStore";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import CartPanel from "./components/CartPanel";
import WishlistPanel from "./components/WishlistPanel";
import OrderForm from "./components/OrderForm";
import ToastContainer from "./components/ToastContainer";

// [아키텍처 결정] App 컴포넌트는 레이아웃과 전역 다크모드만 담당합니다.
// 각 기능은 독립적인 컴포넌트로 분리되어 있고,
// 컴포넌트 간 통신은 Zustand 스토어를 통해 이루어집니다.
// 이렇게 하면 Props drilling 없이 깔끔한 구조를 유지할 수 있습니다.

export default function App() {
  const darkMode = useUiStore((state) => state.darkMode);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
        {/* 헤더 (검색바, 다크모드, 장바구니/위시리스트 버튼) */}
        <Header />

        {/* 메인 콘텐츠 */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* 카테고리 필터 */}
          <section className="mb-6">
            <CategoryFilter />
          </section>

          {/* 상품 목록 (검색 / 카테고리 / 무한스크롤) */}
          <section>
            <ProductList />
          </section>
        </main>

        {/* 오버레이 패널들 */}
        <ProductDetail />
        <CartPanel />
        <WishlistPanel />
        <OrderForm />
        <ToastContainer />
      </div>
    </div>
  );
}
