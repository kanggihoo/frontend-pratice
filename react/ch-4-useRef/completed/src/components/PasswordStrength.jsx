function getStrength(password) {
  if (!password) return { level: 0, label: "", color: "" };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*]/.test(password)) score++;

  if (score <= 1) return { level: 1, label: "약함", color: "bg-red-400" };
  if (score <= 2) return { level: 2, label: "보통", color: "bg-yellow-400" };
  if (score <= 3) return { level: 3, label: "강함", color: "bg-blue-400" };
  return { level: 4, label: "매우 강함", color: "bg-green-500" };
}

export default function PasswordStrength({ password }) {
  const { level, label, color } = getStrength(password);

  if (!password) return null;

  return (
    <div className="mb-4 -mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i <= level ? color : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-gray-500 text-right">
        비밀번호 강도: <span className="font-medium">{label}</span>
      </p>
    </div>
  );
}
