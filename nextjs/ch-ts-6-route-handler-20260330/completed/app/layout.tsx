import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '회차 6 — Route Handler 타입',
  description: 'NextRequest, NextResponse<T> 제네릭 학습',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
