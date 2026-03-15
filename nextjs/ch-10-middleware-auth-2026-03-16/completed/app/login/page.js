import { Suspense } from "react";
import LoginForm from "../components/LoginForm";

export const metadata = {
  title: "로그인 - Admin Dashboard",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">로그인</h1>
          <p className="text-gray-600 mt-2">관리자 대시보드에 접근하세요</p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
          <Suspense fallback={<div className="text-center text-gray-500">로딩 중...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
