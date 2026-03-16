import "./globals.css";

export const metadata = {
  title: "ShopNow - 스마트 쇼핑 리스트",
  description:
    "서버 컴포넌트와 클라이언트 컴포넌트의 역할 분리를 체험하는 상품 목록 앱입니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50 text-gray-800 antialiased">
        {children}
      </body>
    </html>
  );
}
