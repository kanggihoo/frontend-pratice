// ─── [임포트] ──────────────────────────────────────
// useState를 임포트하세요.
import { useState } from "react";
import SignupForm from "./components/SignupForm";
import SuccessModal from "./components/SuccessModal";

export default function App() {
  // ─── [상태 선언] ──────────────────────────────────
  // 회원가입 성공 시 사용자 정보를 저장하는 상태를 선언하세요.
  // 초기값: null (가입 전에는 모달을 표시하지 않음)
  // 힌트: const [변수명, 세터함수] = useState(null);

  // ─── [성공 핸들러] ────────────────────────────────
  // SignupForm에서 가입 성공 시 호출되는 함수입니다.
  // user 객체를 받아 상태에 저장합니다.
  // 힌트: const handleSuccess = (user) => { 세터함수(user); };

  // ─── [모달 닫기 핸들러] ────────────────────────────
  // SuccessModal에서 확인 버튼 클릭 시 호출됩니다.
  // 상태를 null로 초기화하여 모달을 숨깁니다.

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">회원가입</h1>
          <p className="text-gray-500 mt-1">새 계정을 만들어보세요</p>
        </div>

        {/* 폼 카드 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          {/* ─── [SignupForm 렌더링] ───────────────── */}
          {/* SignupForm 컴포넌트를 렌더링하고, onSuccess prop에 핸들러를 전달하세요. */}
          {/* 힌트: <SignupForm onSuccess={handleSuccess} /> */}
        </div>

        {/* 하단 링크 */}
        <p className="text-center text-sm text-gray-500 mt-6">
          이미 계정이 있으신가요?{" "}
          <button className="text-indigo-600 font-medium hover:text-indigo-700 cursor-pointer">
            로그인
          </button>
        </p>
      </div>

      {/* ─── [성공 모달 조건부 렌더링] ──────────────── */}
      {/* registeredUser가 존재할 때만 SuccessModal을 렌더링하세요. */}
      {/* user prop에 registeredUser를, onClose prop에 모달 닫기 핸들러를 전달합니다. */}
      {/* 힌트: {조건 && <SuccessModal user={...} onClose={...} />} */}
      {/* ⚠️ 조건부 렌더링에 &&를 사용할 때는 조건이 falsy 값(0, "")이 아닌지 주의! */}
    </div>
  );
}
