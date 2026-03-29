import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Acme Corp — 더 나은 내일을 만드는 기술",
  description: "혁신적인 소프트웨어 솔루션으로 고객의 비즈니스 성장을 돕는 회사입니다.",
};

// ─── RootLayoutProps ────────────────────────────────────────────────────────
// layout.tsx에서 children을 받을 때는 React.ReactNode 타입을 사용합니다.
// React.ReactNode는 JSX, string, number, null, undefined 등 렌더링 가능한 모든 값을 허용합니다.
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
