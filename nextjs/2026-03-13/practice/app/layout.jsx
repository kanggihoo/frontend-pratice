import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ─── [메타데이터 설정] ──────────────────────────────────
// Next.js App Router에서는 각 페이지/레이아웃에서 metadata 객체를 export하여
// HTML의 <head> 태그 내용(title, description 등)을 설정할 수 있습니다.
// React에서는 react-helmet 같은 라이브러리가 필요했지만, Next.js에서는 내장 기능입니다.
//
// 힌트: export const metadata = { title: "...", description: "..." };
export const metadata = {
  title: "",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    // ─── [HTML 루트 요소] ──────────────────────────────────
    // lang 속성을 "ko"로 설정하여 한국어 페이지임을 명시합니다.
    <html lang="ko">
      {/* ─── [Body 스타일링] ──────────────────────────────────
          Tailwind CSS로 전체 페이지 레이아웃을 구성하세요.
          - 최소 높이를 화면 전체로 설정 (min-h-screen)
          - Flexbox로 세로 배치 (flex flex-col)
          - 배경색, 텍스트색, 안티앨리어싱 적용
          힌트: "min-h-screen flex flex-col bg-gray-50 text-gray-800 antialiased" */}
      <body className="">
        <Navbar />
        {/* ─── [메인 콘텐츠 영역] ──────────────────────────────
            children은 각 페이지(page.jsx)의 내용이 렌더링되는 곳입니다.
            flex-1을 적용하면 남은 공간을 모두 차지하여 Footer가 항상 하단에 위치합니다.
            힌트: className="flex-1" */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
