export default function SuccessModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center animate-bounce-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          회원가입 완료!
        </h2>
        <p className="text-gray-600 mb-1">
          환영합니다, <span className="font-semibold">{user.username}</span>님!
        </p>
        <p className="text-gray-500 text-sm mb-6">{user.email}</p>
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          확인
        </button>
      </div>
    </div>
  );
}
