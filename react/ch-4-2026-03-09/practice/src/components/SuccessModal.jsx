// ─── [SuccessModal 컴포넌트] ────────────────────────
// 회원가입 성공 시 표시되는 모달 컴포넌트입니다.
// Props: user ({ username, email }), onClose (닫기 함수)
//
// 이 컴포넌트는 useRef를 사용하지 않는 단순 표현 컴포넌트입니다.
// Tailwind CSS 클래스만 채워넣으면 됩니다.
//
// ─── [JSX 구조] ─────────────────────────────────────
// 1. 오버레이 <div> — 전체 화면을 덮는 반투명 배경
//      Tailwind: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
// 2.   모달 카드 <div>
//        Tailwind: "bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center"
// 3.     체크 아이콘 원 — 초록 배경 + SVG 체크 마크
// 4.     <h2> "회원가입 완료!"
// 5.     <p> "환영합니다, {user.username}님!"
// 6.     <p> {user.email}
// 7.     <button> "확인" — onClick={onClose}
//          Tailwind: "w-full py-2.5 bg-indigo-600 text-white rounded-lg font-medium
//                     hover:bg-indigo-700 transition-colors cursor-pointer"
export default function SuccessModal({ user, onClose }) {
  return (
    <div>
      {/* 여기에 모달 UI를 구현하세요 */}
      {/* user.username과 user.email을 표시하고, */}
      {/* onClose를 확인 버튼의 onClick에 연결하세요 */}
    </div>
  );
}
