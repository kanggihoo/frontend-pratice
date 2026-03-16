export default function UserAlbums({ albums, users }) {
  function getUserName(userId) {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "알 수 없음";
  }

  return (
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
          <p className="text-xs text-gray-500">by {getUserName(album.userId)}</p>
        </div>
      ))}
    </div>
  );
}
