import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "유저 대시보드 — Next.js 서버사이드 데이터 페칭",
  description: "서버 컴포넌트에서 데이터를 가져와 렌더링하는 대시보드 예제",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} font-sans antialiased bg-gray-50 text-gray-900`}>
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-indigo-600">📊 유저 대시보드</h1>
            <span className="text-sm text-gray-500">Next.js 서버사이드 데이터 페칭</span>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
