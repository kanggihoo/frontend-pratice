import UserStatsCards from "./components/UserStatsCards";
import UserTable from "./components/UserTable";
import UserAlbums from "./components/UserAlbums";

const API_BASE = "https://jsonplaceholder.typicode.com";

async function getUsers() {
  const res = await fetch(`${API_BASE}/users`);
  if (!res.ok) throw new Error("유저 데이터를 불러오는데 실패했습니다.");
  return res.json();
}

async function getPosts() {
  const res = await fetch(`${API_BASE}/posts`);
  if (!res.ok) throw new Error("게시글 데이터를 불러오는데 실패했습니다.");
  return res.json();
}

async function getAlbums() {
  const res = await fetch(`${API_BASE}/albums`);
  if (!res.ok) throw new Error("앨범 데이터를 불러오는데 실패했습니다.");
  return res.json();
}

export default async function Home() {
  const [users, posts, albums] = await Promise.all([
    getUsers(),
    getPosts(),
    getAlbums(),
  ]);

  const postsPerUser = users.map((user) => ({
    ...user,
    postCount: posts.filter((post) => post.userId === user.id).length,
    albumCount: albums.filter((album) => album.userId === user.id).length,
  }));

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">대시보드 요약</h2>
        <UserStatsCards
          totalUsers={users.length}
          totalPosts={posts.length}
          totalAlbums={albums.length}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">유저 목록</h2>
        <UserTable users={postsPerUser} />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">최근 앨범</h2>
        <UserAlbums albums={albums.slice(0, 8)} users={users} />
      </section>
    </div>
  );
}
