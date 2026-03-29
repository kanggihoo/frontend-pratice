import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Acme Corp — 더 나은 내일을 만드는 기술",
  description: "혁신적인 소프트웨어 솔루션으로 고객의 비즈니스 성장을 돕는 회사입니다.",
};

// ─── [RootLayoutProps 타입 정의] ────────────────────────────────────────────
// JavaScript: function RootLayout({ children }) { ... }
// TypeScript: children의 타입을 명시해야 합니다.
//
// layout.tsx에서 children을 받을 때는 React.ReactNode 타입을 사용합니다.
// React.ReactNode = JSX, string, number, null, undefined, boolean 등 렌더링 가능한 모든 값
//
// 방법 1 — interface 사용 (권장):
//   interface RootLayoutProps {
//     children: React.ReactNode;
//   }
//   export default function RootLayout({ children }: RootLayoutProps) { ... }
//
// 방법 2 — 인라인 타입:
//   export default function RootLayout({ children }: { children: React.ReactNode }) { ... }

// TODO: RootLayoutProps interface를 정의하세요.

export default function RootLayout({ children }) { // ← 타입 없음 (에러 발생)
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
