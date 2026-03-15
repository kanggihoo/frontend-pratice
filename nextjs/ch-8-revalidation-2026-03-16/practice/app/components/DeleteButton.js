// ─── [클라이언트 컴포넌트 선언] ──────────────────────
// 이 컴포넌트는 onClick 이벤트 핸들러(confirm 다이얼로그)를 사용하므로
// 클라이언트 컴포넌트여야 합니다.
// 힌트: "use client" 지시어를 추가하세요.

export default function DeleteButton({ children, small = false }) {
  return (
    <button
      type="submit"
      // ─── [삭제 확인 다이얼로그] ──────────────────────
      // 삭제 버튼 클릭 시 confirm()으로 사용자에게 확인을 받고,
      // 취소하면 e.preventDefault()로 폼 제출을 막으세요.
      //
      // 힌트:
      // onClick={(e) => {
      //   if (!confirm("정말 삭제하시겠습니까?")) {
      //     e.preventDefault();
      //   }
      // }}
      className={
        small
          ? "text-xs text-red-400 hover:text-red-600 transition-colors cursor-pointer"
          : "text-sm text-red-500 hover:text-red-700 transition-colors font-medium cursor-pointer"
      }
    >
      {children}
    </button>
  );
}
