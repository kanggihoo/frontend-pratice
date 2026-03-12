// ─── [ProfileCard.jsx] ───────────────────────────────────────────
// 사용자 프로필 카드 컴포넌트입니다.
// useTheme()과 useAuth() 두 가지 Context를 모두 사용합니다.

import { useTheme } from "./ThemeContext.jsx";
import { useAuth } from "./AuthContext.jsx";

export default function ProfileCard() {
  // ─── [Context 사용하기] ──────────────────────────────────────
  // useTheme()에서 colors를 가져오세요.
  // useAuth()에서 currentUser를 가져오세요.

  // TODO: useTheme()에서 colors 가져오기
  const { colors } = useTheme();

  // TODO: useAuth()에서 currentUser 가져오기
  const { currentUser } = useAuth();

  return (
    <div className={`${colors.bgCard} ${colors.border} border rounded-xl p-5 shadow-sm`}>
      <h3 className={`text-lg font-bold mb-4 ${colors.text}`}>내 프로필</h3>

      <div className="flex flex-col items-center text-center">
        {/* ─── [프로필 정보 표시] ──────────────────────────────── */}
        {/* currentUser 객체의 avatar, name, role, email을 표시하세요. */}
        {/* 힌트: currentUser.avatar, currentUser.name 등 */}

        <span className="text-6xl mb-4">
          {/* TODO: currentUser.avatar 표시 */}
        </span>
        <h4 className={`text-xl font-bold ${colors.text}`}>
          {/* TODO: currentUser.name 표시 */}
        </h4>
        <p className={`text-sm mt-1 ${colors.textSecondary}`}>
          {/* TODO: currentUser.role 표시 */}
        </p>
        <p className={`text-sm mt-1 ${colors.textSecondary}`}>
          {/* TODO: currentUser.email 표시 */}
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
