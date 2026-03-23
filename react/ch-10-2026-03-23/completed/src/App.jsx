import { useState } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import CartPanel from "./components/CartPanel";
import ToastContainer from "./components/ToastContainer";

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onToggleCart={() => setIsCartOpen(true)} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <ProductList />
      </main>

      <CartPanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* 토스트는 어디에서든 전역으로 표시됨 */}
      <ToastContainer />

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
