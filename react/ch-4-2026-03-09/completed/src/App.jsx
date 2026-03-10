import { useState } from "react";
import SignupForm from "./components/SignupForm";
import SuccessModal from "./components/SuccessModal";

export default function App() {
  const [registeredUser, setRegisteredUser] = useState(null);

  const handleSuccess = (user) => {
    setRegisteredUser(user);
  };

  const handleCloseModal = () => {
    setRegisteredUser(null);
  };

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
          <SignupForm onSuccess={handleSuccess} />
        </div>

        {/* 하단 링크 */}
        <p className="text-center text-sm text-gray-500 mt-6">
          이미 계정이 있으신가요?{" "}
          <button className="text-indigo-600 font-medium hover:text-indigo-700 cursor-pointer">
            로그인
          </button>
        </p>
      </div>

      {/* 성공 모달 */}
      {registeredUser && (
        <SuccessModal user={registeredUser} onClose={handleCloseModal} />
      )}
    </div>
  );
}
