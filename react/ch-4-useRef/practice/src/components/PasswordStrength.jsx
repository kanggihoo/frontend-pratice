// ─── [비밀번호 강도 계산 함수] ─────────────────────────
// 비밀번호 문자열을 받아 강도를 계산하는 함수입니다.
// 반환 형태: { level: 숫자, label: 문자열, color: Tailwind클래스 }
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
function getStrength(password) {
  if (!password) return { level: 0, label: "", color: "" };

  // 여기에 점수 계산 로직을 작성하세요
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;

  if (score <= 1) return { level: 1, label: "약함", color: "bg-red-400" };
  if (score <= 2) return { level: 2, label: "보통", color: "bg-yellow-400" };
  if (score <= 3) return { level: 3, label: "강함", color: "bg-blue-400" };
  return { level: 4, label: "매우 강함", color: "bg-green-500" };
}

// ─── [PasswordStrength 컴포넌트] ──────────────────────
// password가 없으면 null을 반환하세요.
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
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i <= level ? color : "bg-gray-200"}`}
          />
        ))}
      </div>
      <p className="text-xs text-gray-500 text-right">
        비밀번호 강도: <span className="font-medium">{label}</span>
      </p>
    </div>
  );
}
