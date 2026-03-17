"use client";

// ─── [클라이언트 컴포넌트 선언] ──────────────────────
<<<<<<< HEAD
// ✅ 위의 "use client" 지시어는 이미 추가되어 있습니다.
=======
>>>>>>> ac06ffee49136562bdd1cf983bf3e8416e10a53f
// error.js는 반드시 클라이언트 컴포넌트여야 합니다!
// Error Boundary는 React의 클래스 컴포넌트 기반 기능이므로,
// Next.js가 내부적으로 클라이언트에서 Error Boundary를 생성합니다.
// 참고: "use client"가 없으면 빌드 자체가 실패합니다.

export default function Error({ error, reset }) {
  // ─── [error 객체] ─────────────────────────────────
<<<<<<< HEAD
  // error: 발생한 에러 객체입니다. error.message로 에러 메시지를 확인할 수 있습니다.
=======
  // error: 발생한 에러 객체입니다.
>>>>>>> ac06ffee49136562bdd1cf983bf3e8416e10a53f
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
<<<<<<< HEAD
        {/* ─── [에러 메시지 표시] ───────────────────────
         * error.message를 사용하여 에러 내용을 표시하세요.
         * 힌트: <p>{error.message}</p>
         * ─────────────────────────────────────────── */}
        <p className="text-red-600 mb-6 text-sm">
          에러 메시지를 여기에 표시하세요.
        </p>

        {/* ─── [다시 시도 버튼] ────────────────────────
         * onClick에 reset 함수를 연결하여 에러를 초기화하세요.
         * 힌트: onClick={() => reset()}
         * ─────────────────────────────────────────── */}
        <button className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors cursor-pointer">
=======
        <p className="text-red-600 mb-6 text-sm">
          {error.messag || "게시글을 불러오는 중 문제가 발생했습니다."}
        </p>

        <button
          className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors cursor-pointer"
          onClick={() => reset()}
        >
>>>>>>> ac06ffee49136562bdd1cf983bf3e8416e10a53f
          🔄 다시 시도
        </button>
      </div>
    </div>
  );
}
