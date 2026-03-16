// ─── [클라이언트 컴포넌트 선언] ──────────────────────
// 이 컴포넌트는 폼 상태(useState)와 이벤트 핸들러를 사용합니다.
// ✅ "use client" 지시어가 이미 적용되어 있습니다 — 왜 필요한지 이해해보세요.
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ─── [callbackUrl 파라미터 읽기] ──────────────────
  // Middleware가 /login으로 리다이렉트할 때 ?callbackUrl=/admin 등의 파라미터를 붙여줍니다.
  // 로그인 성공 후 원래 가려던 페이지로 돌아가기 위해 사용합니다.
  //
  // 힌트: searchParams.get("callbackUrl") || "/"
  const callbackUrl = "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ─── [로그인 폼 제출 핸들러] ──────────────────────
  // 힌트:
  // 1. e.preventDefault()로 기본 폼 제출을 막으세요.
  // 2. setError("")로 이전 에러를 초기화하세요.
  // 3. setLoading(true)로 로딩 상태를 활성화하세요.
  // 4. fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) })
  // 5. 응답이 실패(!res.ok)하면 data.error를 표시하세요.
  // 6. 성공하면 router.push()로 적절한 페이지로 이동하고 router.refresh()를 호출하세요.
  // 7. finally 블록에서 setLoading(false)를 호출하세요.
  async function handleSubmit(e) {
    e.preventDefault();

    // TODO: 로그인 API 호출 로직을 작성하세요
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* ─── [에러 메시지 표시] ────────────────────── */}
      {/* 힌트: error가 있으면 빨간색 배경의 경고 박스를 보여주세요 */}
      {error && (
        <div className="">
          {/* TODO: 에러 메시지 스타일링 (bg-red-50, border, text-red-700 등) */}
          {error}
        </div>
      )}

      {/* ─── [callbackUrl 안내 메시지] ────────────────── */}
      {/* 힌트: callbackUrl이 "/"가 아니면 "로그인이 필요합니다" 안내 표시 */}

      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          아이디
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="admin 또는 user"
          required
          className=""
        />
        {/* TODO: input 스타일링 (w-full, px-4, py-2.5, border, rounded-lg, focus:ring 등) */}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 입력"
          required
          className=""
        />
        {/* TODO: input 스타일링 */}
      </div>

      <button
        type="submit"
        disabled={loading}
        className=""
      >
        {/* TODO: 버튼 스타일링 (w-full, py-2.5, bg-indigo-600, text-white, rounded-lg 등) */}
        {/* TODO: loading 상태에 따라 "로그인 중..." 또는 "로그인" 텍스트 변경 */}
        로그인
      </button>

      {/* ─── [테스트 계정 안내] ────────────────────── */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center mb-2">테스트 계정</p>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div className="p-2 bg-gray-50 rounded text-center">
            <div className="font-medium">관리자</div>
            <div>admin / admin1234</div>
          </div>
          <div className="p-2 bg-gray-50 rounded text-center">
            <div className="font-medium">일반 사용자</div>
            <div>user / user1234</div>
          </div>
        </div>
      </div>
    </form>
  );
}
