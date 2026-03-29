import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2회차 — Props 타입 심화",
  description: "React.FC<T>, ReactNode vs ReactElement 학습",
};

// ─── layout의 children 타입 ─────────────────────────────────────────
//
// JavaScript: function RootLayout({ children }) { ... }
// TypeScript: children은 React.ReactNode 타입
//
// Readonly<{ children: React.ReactNode }> — create-next-app 기본 패턴
// → Props 객체를 읽기 전용으로 만들어 실수로 수정하는 것을 방지

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
