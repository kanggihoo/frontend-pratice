import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ─── [메타데이터 설정] ──────────────────────────────────
// Next.js App Router에서는 각 페이지/레이아웃에서 metadata 객체를 export하여
// HTML의 <head> 태그 내용(title, description 등)을 설정할 수 있습니다.
// React에서는 react-helmet 같은 라이브러리가 필요했지만, Next.js에서는 내장 기능입니다.
export const metadata = {
  title: "NovaTech Solutions - 혁신적인 IT 솔루션",
  description:
    "NovaTech Solutions는 최첨단 기술로 비즈니스의 디지털 전환을 이끄는 IT 솔루션 기업입니다.",
};

export default function RootLayout({ children }) {
  return (
    // ─── [HTML 루트 요소] ──────────────────────────────────
    <html lang="ko">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-800 antialiased">
        <Navbar />
        {/* ─── [메인 콘텐츠 영역] ──────────────────────────────
            children은 각 페이지(page.jsx)의 내용이 렌더링되는 곳입니다.
            flex-1을 적용하면 남은 공간을 모두 차지하여 Footer가 항상 하단에 위치합니다. */}
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
