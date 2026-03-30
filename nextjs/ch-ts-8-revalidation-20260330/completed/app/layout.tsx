import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TS 8회차 — revalidatePath / revalidateTag',
  description: 'revalidatePath, revalidateTag 반환 타입과 ActionResult 패턴 학습',
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
