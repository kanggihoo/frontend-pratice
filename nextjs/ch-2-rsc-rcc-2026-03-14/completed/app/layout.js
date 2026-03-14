import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "상품 목록 | RSC vs RCC 학습",
  description: "Next.js 서버 컴포넌트와 클라이언트 컴포넌트의 차이를 배워봅니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">
              🛒 프레시마켓
            </h1>
            <span className="text-sm text-gray-500">
              Ch.2 — RSC vs RCC
            </span>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
