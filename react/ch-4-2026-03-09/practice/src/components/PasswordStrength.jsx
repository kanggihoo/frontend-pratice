// ─── [비밀번호 강도 계산 함수] ─────────────────────────
// 비밀번호 문자열을 받아 강도를 계산하는 함수입니다.
// 반환 형태: { level: 숫자, label: 문자열, color: Tailwind클래스 }
//
// 점수 기준:
//   - password.length >= 8 → score++
//   - password.length >= 12 → score++
//   - 소문자 + 대문자 모두 포함 → score++
//   - 숫자 포함 → score++
//   - 특수문자(!@#$%^&*) 포함 → score++
//
// 점수별 레벨:
//   score <= 1 → { level: 1, label: "약함",     color: "bg-red-400" }
//   score <= 2 → { level: 2, label: "보통",     color: "bg-yellow-400" }
//   score <= 3 → { level: 3, label: "강함",     color: "bg-blue-400" }
//   score >= 4 → { level: 4, label: "매우 강함", color: "bg-green-500" }
//
// 힌트: 정규식 /[a-z]/.test(password) 로 소문자 포함 여부를 체크할 수 있습니다.
function getStrength(password) {
  if (!password) return { level: 0, label: "", color: "" };

  // 여기에 점수 계산 로직을 작성하세요

  return { level: 0, label: "", color: "" };
}

// ─── [PasswordStrength 컴포넌트] ──────────────────────
// Props: password (비밀번호 문자열)
// password가 없으면 null을 반환하세요.
//
// JSX 구조:
// 1. <div> (mb-4 -mt-2)
// 2.   강도 바 — 4개의 <div>를 map으로 렌더링
//      각 바: "h-1.5 flex-1 rounded-full transition-colors duration-300"
//      i <= level이면 color 클래스, 아니면 "bg-gray-200"
//      힌트: {[1, 2, 3, 4].map((i) => <div key={i} ... />)}
// 3.   <p> — "비밀번호 강도: {label}"
export default function PasswordStrength({ password }) {
  const { level, label, color } = getStrength(password);

  if (!password) return null;

  return (
    <div className="mb-4 -mt-2">
      {/* 여기에 강도 바와 레이블을 구현하세요 */}
    </div>
  );
}
