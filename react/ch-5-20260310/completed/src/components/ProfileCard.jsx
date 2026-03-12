import { useTheme } from "./ThemeContext.jsx";
import { useAuth } from "./AuthContext.jsx";

export default function ProfileCard() {
  const { colors } = useTheme();
  const { currentUser } = useAuth();

  return (
    <div className={`${colors.bgCard} ${colors.border} border rounded-xl p-5 shadow-sm`}>
      <h3 className={`text-lg font-bold mb-4 ${colors.text}`}>내 프로필</h3>

      <div className="flex flex-col items-center text-center">
        <span className="text-6xl mb-4">{currentUser.avatar}</span>
        <h4 className={`text-xl font-bold ${colors.text}`}>
          {currentUser.name}
        </h4>
        <p className={`text-sm mt-1 ${colors.textSecondary}`}>
          {currentUser.role}
        </p>
        <p className={`text-sm mt-1 ${colors.textSecondary}`}>
          {currentUser.email}
        </p>

        <div className={`w-full mt-6 pt-4 border-t ${colors.border}`}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className={`text-2xl font-bold ${colors.text}`}>24</p>
              <p className={`text-xs ${colors.textSecondary}`}>완료한 태스크</p>
            </div>
            <div>
              <p className={`text-2xl font-bold ${colors.text}`}>3</p>
              <p className={`text-xs ${colors.textSecondary}`}>진행 중</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
