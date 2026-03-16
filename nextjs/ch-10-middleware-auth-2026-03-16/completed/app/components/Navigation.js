"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  // 페이지 이동 시마다 로그인 상태 확인
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        setUser(data.user);
      } catch {
        setUser(null);
      }
    }
    checkAuth();
  }, [pathname]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-xl font-bold text-indigo-600 hover:text-indigo-700"
            >
              AuthApp
            </Link>
            <div className="hidden sm:flex items-center gap-4">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors ${
                  pathname === "/"
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                홈
              </Link>
              <Link
                href="/admin"
                className={`text-sm font-medium transition-colors ${
                  pathname.startsWith("/admin")
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                관리자
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">{user.name}</span>
                  <span className="ml-1 px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                    {user.role}
                  </span>
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
