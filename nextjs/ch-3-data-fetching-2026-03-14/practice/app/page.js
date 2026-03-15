// ─── [서버사이드 데이터 페칭 — 메인 페이지] ──────────────────────
// 이 파일은 Next.js App Router의 "서버 컴포넌트(RSC)"입니다.
// 서버 컴포넌트는 기본적으로 서버에서만 실행되므로,
// 컴포넌트 자체를 async 함수로 만들어 await를 사용할 수 있습니다.
//
// Next.js 서버 컴포넌트에서의 데이터 페칭 방식:
//   async function getUsers() { const res = await fetch(url); return res.json(); }
//   export default async function Page() { const users = await getUsers(); ... }
//
// 👉 useState, useEffect 없이 데이터를 직접 가져올 수 있습니다!
import UserStatsCards from "./components/UserStatsCards";
import UserTable from "./components/UserTable";
import UserAlbums from "./components/UserAlbums";

const API_BASE = "https://jsonplaceholder.typicode.com";

// ─── [데이터 페칭 함수 작성] ────────────────────────────────
// 서버 컴포넌트에서 사용할 데이터 페칭 함수들을 작성하세요.
// 이 함수들은 서버에서만 실행되므로, API 키 등 민감한 정보도 안전하게 사용할 수 있습니다.
//

// 유저 데이터를 가져오는 함수 (엔드포인트: /users)
async function getUsers() {
  const res = await fetch(`${API_BASE}/users`);
  if (!res.ok) throw new Error("유저 데이터를 불러오는데 실패했습니다.");
  return res.json();
}

// 게시글 데이터를 가져오는 함수 (엔드포인트: /posts)
async function getPosts() {
  const res = await fetch(`${API_BASE}/posts`);
  if (!res.ok) throw new Error("게시글 데이터를 불러오는데 실패했습니다.");
  return res.json();
}

// 앨범 데이터를 가져오는 함수 (엔드포인트: /albums)
async function getAlbums() {
  const res = await fetch(`${API_BASE}/albums`);
  if (!res.ok) throw new Error("앨범 데이터를 불러오는데 실패했습니다.");
  return res.json();
}

// ─── [비동기 서버 컴포넌트] ─────────────────────────────────
// Next.js App Router에서 page.js의 기본 내보내기 함수를 async로 선언하면,
// 서버에서 데이터를 가져온 후 HTML로 렌더링하여 클라이언트에 전달합니다.
//
// 힌트: export default async function Home() { ... }
// 주의: "async"를 빼먹으면 await를 사용할 수 없습니다!

export default async function Home() {
  // ─── [병렬 데이터 페칭 (Promise.all)] ────────────────────
  const [users, posts, albums] = await Promise.all([
    getUsers(),
    getPosts(),
    getAlbums(),
  ]);

  // ─── [데이터 가공 (유저별 통계)] ──────────────────────────
  // 서버 컴포넌트 안에서는 가져온 데이터를 자유롭게 가공할 수 있습니다.
  const postsPerUser = users.map((user) => ({
    ...user,
    postCount: posts.filter((post) => post.userId === user.id).length,
    albumCount: albums.filter((album) => album.userId === user.id).length,
  }));

  return (
    <div className="space-y-8">
      {/* ─── [통계 카드 섹션] ─────────────────────────────── */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">대시보드 요약</h2>
        <UserStatsCards
          totalUsers={users.length}
          totalPosts={posts.length}
          totalAlbums={albums.length}
        />
      </section>

      {/* ─── [유저 테이블 섹션] ───────────────────────────── */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">유저 목록</h2>
        <UserTable users={postsPerUser} />
      </section>

      {/* ─── [앨범 섹션] ─────────────────────────────────── */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">최근 앨범</h2>
        <UserAlbums albums={albums.slice(0, 8)} users={users} />
      </section>
    </div>
  );
}
