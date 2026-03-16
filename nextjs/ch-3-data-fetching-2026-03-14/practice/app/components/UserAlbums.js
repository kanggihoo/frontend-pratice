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
    const user = users.find((user) => userId === user.id);
    console.log(user);
    return user ? user.name : "알 수 없음";
  }

  return (
    // ─── [그리드 레이아웃] ──────────────────────────────────
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {albums.map((album) => (
        <div
          key={album.id}
          className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-full h-32 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mb-3">
            <span className="text-4xl">🖼️</span>
          </div>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">
            {album.title}
          </h3>
          <p className="text-xs text-gray-500">
            by {getUserName(album.userId)}
          </p>
        </div>
      ))}
    </div>
  );
}
