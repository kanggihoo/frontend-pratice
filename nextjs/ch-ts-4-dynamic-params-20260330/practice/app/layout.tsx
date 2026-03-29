import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TS 4회차 — 동적 라우팅 params 타입",
  description: "Next.js 15+ params Promise 타입 학습",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
