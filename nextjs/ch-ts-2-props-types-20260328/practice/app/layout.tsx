import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2회차 — Props 타입 심화 (실습)",
  description: "React.FC<T>, ReactNode vs ReactElement 학습",
};

// ─── [children 타입: React.ReactNode] ─────────────────────────────
// JavaScript: function RootLayout({ children }) { ... }
// TypeScript: children은 React.ReactNode 타입
//
// Readonly<{ children: React.ReactNode }>
// → Props 객체를 읽기 전용으로 만들어 실수로 수정하는 것을 방지
// → create-next-app이 기본으로 생성하는 패턴이므로 그대로 사용합니다.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  );
}
