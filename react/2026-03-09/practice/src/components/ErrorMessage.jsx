export default function ErrorMessage({ message }) {
  return (
    // ─── [에러 메시지 UI] ─────────────────────────────────
    // 에러 상태를 시각적으로 표현하는 컴포넌트입니다.
    //
    // 컨테이너 클래스:
    //   bg-red-50 border border-red-200 rounded-xl p-6 text-center
    //
    // 내용:
    // 1. "오류가 발생했습니다" (text-red-600 font-medium)
    // 2. {message} (text-red-500 text-sm mt-1)
    <div className="">
      <p className="">오류가 발생했습니다</p>
      <p className="">{message}</p>
    </div>
  );
}
