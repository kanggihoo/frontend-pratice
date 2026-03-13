export default function UserCard({ user, onToggleFavorite, isFavorite }) {
  // ─── [즐겨찾기 상태 확인] ───────────────────────────
  // isFavorite 함수에 user.id를 전달하여 현재 유저가 즐겨찾기 되었는지 확인하세요.
  // 힌트: const favorited = isFavorite(user.id);
  const favorited = false;

  return (
    // ─── [카드 컨테이너] ───────────────────────────
    // Tailwind 클래스를 적용하세요.
    // 힌트: "bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
    <div className="">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* ─── [아바타] ───────────────────────────
              유저 이름의 첫 글자를 표시하는 원형 아바타입니다.
              힌트: user.name.charAt(0) 으로 첫 글자를 가져옵니다.
              Tailwind: "w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500
                         flex items-center justify-center text-white font-bold text-lg shrink-0"
          */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
            {/* 유저 이름 첫 글자 */}
          </div>
          <div>
            {/* ─── [유저 이름 & 유저네임] ───────────────────────────
                - h3: user.name (폰트: font-semibold text-gray-900)
                - p: @{user.username} (폰트: text-sm text-gray-500)
            */}
          </div>
        </div>

        {/* ─── [즐겨찾기 버튼] ───────────────────────────
            - onClick: onToggleFavorite(user.id) 호출
            - favorited 여부에 따라 스타일 변경 (조건부 클래스)
              - true: "text-yellow-500 bg-yellow-50 hover:bg-yellow-100"
              - false: "text-gray-400 hover:text-yellow-500 hover:bg-gray-100"
            - svg의 fill 속성도 조건부: favorited ? "currentColor" : "none"

            힌트: className={`p-2 rounded-lg transition-colors ${favorited ? "..." : "..."}`}
        */}
        <button
          className="p-2 rounded-lg transition-colors text-gray-400"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </button>
      </div>

      {/* ─── [유저 정보 목록] ───────────────────────────
          아래 4가지 정보를 표시하세요. 각 항목은 아이콘 + 텍스트 구성입니다.
          1. user.email (이메일)
          2. user.phone (전화번호)
          3. user.company.name (회사명)
          4. user.website (웹사이트 - <a> 태그로 링크)

          각 항목의 Tailwind 패턴:
          <div className="flex items-center gap-2 text-gray-600">
            <svg>...</svg>  (아이콘은 completed에서 복사해도 됩니다)
            <span>{user.email}</span>
          </div>
      */}
      <div className="mt-4 space-y-2 text-sm">
        {/* 이메일 */}
        {/* 전화번호 */}
        {/* 회사명 */}
        {/* 웹사이트 */}
      </div>

      {/* ─── [회사 슬로건] ───────────────────────────
          user.company.catchPhrase를 표시하세요.
          힌트: <p className="text-sm text-gray-600 italic">"{user.company.catchPhrase}"</p>
      */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-400 mb-1">회사 슬로건</p>
        {/* 회사 슬로건 표시 */}
      </div>
    </div>
  );
}
