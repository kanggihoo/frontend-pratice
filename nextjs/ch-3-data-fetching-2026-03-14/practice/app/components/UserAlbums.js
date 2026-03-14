// ─── [서버 컴포넌트 — 앨범 카드 그리드] ──────────────────────
// 이 컴포넌트는 앨범 목록을 카드 형태로 보여줍니다.
// 서버 컴포넌트이므로 useState, useEffect 등 React 훅을 사용할 수 없습니다.
//
// props:
//   - albums: 앨범 데이터 배열 [{ id, userId, title }, ...]
//   - users: 유저 데이터 배열 [{ id, name, ... }, ...]

export default function UserAlbums({ albums = [], users = [] }) {
  // ─── [유틸리티 함수] ──────────────────────────────────────
  // 힌트: userId를 받아 해당 유저의 이름을 반환하는 함수를 작성하세요.
  //   function getUserName(userId) {
  //     const user = users.find((u) => u.id === userId);
  //     return user ? user.name : "알 수 없음";
  //   }

  function getUserName(userId) {
    // TODO: users 배열에서 userId와 일치하는 유저를 찾아 이름을 반환하세요
    return "알 수 없음";
  }

  return (
    // ─── [그리드 레이아웃] ──────────────────────────────────
    // 힌트: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    <div className="">{/* TODO: 그리드 클래스 */}
      {albums.map((album) => (
        <div
          key={album.id}
          className=""
          // TODO: 카드 스타일을 추가하세요
          // 힌트: "rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          {/* ─── [앨범 썸네일 영역] ──────────────────────── */}
          {/* 힌트: 그라디언트 배경에 이모지 아이콘을 중앙 배치하세요 */}
          {/* "w-full h-32 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mb-3" */}
          <div className="">{/* TODO: 썸네일 스타일 */}
            <span className="">🖼️</span>{/* TODO: text-4xl */}
          </div>
          {/* ─── [앨범 제목] ─────────────────────────────── */}
          {/* 힌트: "text-sm font-semibold text-gray-800 line-clamp-2 mb-1" */}
          <h3 className="">{/* TODO: 제목 스타일 */}
            {album.title}
          </h3>
          {/* ─── [작성자 이름] ───────────────────────────── */}
          {/* 힌트: "text-xs text-gray-500" */}
          <p className="">by {getUserName(album.userId)}</p>{/* TODO: 스타일 */}
        </div>
      ))}
    </div>
  );
}
