import { useState } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import CartPanel from "./components/CartPanel";
import ToastContainer from "./components/ToastContainer";

export default function App() {
  // ─── [장바구니 패널 열기/닫기 상태] ─────────────────────────
  // isCartOpen 상태를 useState로 관리하세요. 초기값은 false입니다.
  // 힌트: const [isCartOpen, setIsCartOpen] = useState(false);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* ─── [Header 컴포넌트] ────────────────────────────── */}
      {/* onToggleCart prop에 () => setIsCartOpen(true)를 전달하세요 */}

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* ─── [ProductList 컴포넌트] ─────────────────────── */}

      </main>

      {/* ─── [CartPanel 컴포넌트] ─────────────────────────── */}
      {/* isOpen에 isCartOpen, onClose에 () => setIsCartOpen(false) 전달 */}

      {/* ─── [ToastContainer 컴포넌트] ────────────────────── */}
      {/* 토스트는 전역으로 표시되므로 App 최상위에 배치합니다 */}

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
