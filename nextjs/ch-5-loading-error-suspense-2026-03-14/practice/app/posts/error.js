"use client";

// ─── [클라이언트 컴포넌트 선언] ──────────────────────
// error.js는 반드시 클라이언트 컴포넌트여야 합니다!
// Error Boundary는 React의 클래스 컴포넌트 기반 기능이므로,
// Next.js가 내부적으로 클라이언트에서 Error Boundary를 생성합니다.
// 참고: "use client"가 없으면 빌드 자체가 실패합니다.

export default function Error({ error, reset }) {
  // ─── [error 객체] ─────────────────────────────────
  // error: 발생한 에러 객체입니다.
  //
  // ─── [reset 함수] ──────────────────────────────────
  // reset: 이 함수를 호출하면 에러 경계를 초기화하고
  //        해당 라우트 세그먼트를 다시 렌더링합니다.
  //        "다시 시도" 버튼에 onClick 핸들러로 연결하세요.

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-10 text-center max-w-md">
        <div className="text-5xl mb-4">💥</div>
        <h2 className="text-2xl font-bold text-red-800 mb-2">
          오류가 발생했습니다
        </h2>
        <p className="text-red-600 mb-6 text-sm">
          {error.messag || "게시글을 불러오는 중 문제가 발생했습니다."}
        </p>

        <button
          className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors cursor-pointer"
          onClick={() => reset()}
        >
          🔄 다시 시도
        </button>
      </div>
    </div>
  );
}
