// ─── [클라이언트 컴포넌트 선언] ──────────────────────
// 이 컴포넌트는 useState, useEffect, 이벤트 핸들러를 사용하므로
// 클라이언트에서 실행되어야 합니다.
// ✅ "use client" 지시어가 이미 적용되어 있습니다 — 왜 필요한지 이해해보세요.
"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  // ─── [인증 상태 확인] ──────────────────────────
  // 페이지가 변경될 때마다 /api/auth/me를 호출하여 로그인 상태를 확인합니다.
  //
  // 힌트:
  // useEffect(() => {
  //   async function checkAuth() {
  //     try {
  //       const res = await fetch("/api/auth/me");
  //       const data = await res.json();
  //       setUser(data.user);
  //     } catch {
  //       setUser(null);
  //     }
  //   }
  //   checkAuth();
  // }, [pathname]);  // ← pathname이 변경될 때마다 재실행

  // TODO: useEffect로 인증 상태를 확인하세요

  // ─── [로그아웃 핸들러] ──────────────────────────
  // /api/auth/logout에 POST 요청을 보내고, 상태를 초기화한 후 홈으로 이동합니다.
  //
  // 힌트:
  // async function handleLogout() {
  //   await fetch("/api/auth/logout", { method: "POST" });
  //   setUser(null);
  //   router.push("/");
  //   router.refresh();  // ← 서버 컴포넌트를 다시 렌더링하여 쿠키 변경 반영
  // }

  // TODO: 로그아웃 함수를 작성하세요
  async function handleLogout() {}

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            {/* ─── [로고 링크] ────────────────────── */}
            {/* 힌트: Link 컴포넌트로 "/" 경로를 연결하세요 */}
            <Link
              href="/"
              className=""
            >
              {/* TODO: Tailwind CSS 스타일링 적용 (text-xl, font-bold, text-indigo-600) */}
              AuthApp
            </Link>
            <div className="hidden sm:flex items-center gap-4">
              <Link
                href="/"
                className=""
              >
                {/* TODO: pathname에 따라 활성 스타일 적용 */}
                홈
              </Link>
              <Link
                href="/admin"
                className=""
              >
                {/* TODO: pathname에 따라 활성 스타일 적용 */}
                관리자
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* ─── [조건부 렌더링: 로그인/로그아웃 UI] ───── */}
            {/* 힌트: user 상태에 따라 다른 UI를 보여주세요 */}
            {/* user가 있으면 → 이름, 역할 배지, 로그아웃 버튼 */}
            {/* user가 없으면 → 로그인 링크 */}
            {user ? (
              <>
                <span className="text-sm text-gray-600">
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className=""
                >
                  {/* TODO: 로그아웃 버튼 스타일링 */}
                  로그아웃
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className=""
              >
                {/* TODO: 로그인 링크 스타일링 */}
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
