import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "방명록 | TypeScript 7회차",
  description: "Server Action + FormData 타입 처리 실습",
};

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
