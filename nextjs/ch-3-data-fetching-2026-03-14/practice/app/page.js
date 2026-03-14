// ─── [서버사이드 데이터 페칭 — 메인 페이지] ──────────────────────
// 이 파일은 Next.js App Router의 "서버 컴포넌트(RSC)"입니다.
// 서버 컴포넌트는 기본적으로 서버에서만 실행되므로,
// 컴포넌트 자체를 async 함수로 만들어 await를 사용할 수 있습니다.
//
// React에서의 데이터 페칭 방식 (useEffect + useState):
//   useEffect(() => { fetch(url).then(...).then(data => setUsers(data)) }, [])
//
// Next.js 서버 컴포넌트에서의 데이터 페칭 방식:
//   async function getUsers() { const res = await fetch(url); return res.json(); }
//   export default async function Page() { const users = await getUsers(); ... }
//
// 👉 useState, useEffect 없이 데이터를 직접 가져올 수 있습니다!

import UserStatsCards from "./components/UserStatsCards";
import UserTable from "./components/UserTable";
import UserAlbums from "./components/UserAlbums";

// ─── [API 베이스 URL 상수 정의] ─────────────────────────────
// 힌트: JSONPlaceholder의 베이스 URL을 상수로 선언하세요.
// 예시: const API_BASE = "https://jsonplaceholder.typicode.com";
const API_BASE = ""; // TODO: API 베이스 URL을 채워 넣으세요

// ─── [데이터 페칭 함수 작성] ────────────────────────────────
// 서버 컴포넌트에서 사용할 데이터 페칭 함수들을 작성하세요.
// 이 함수들은 서버에서만 실행되므로, API 키 등 민감한 정보도 안전하게 사용할 수 있습니다.
//
// 힌트: 아래 패턴을 따라 3개의 fetch 함수를 완성하세요.
//   async function getXxx() {
//     const res = await fetch(`${API_BASE}/xxx`);
//     if (!res.ok) throw new Error("에러 메시지");
//     return res.json();
//   }

// TODO: 유저 데이터를 가져오는 함수 (엔드포인트: /users)
async function getUsers() {
  // 힌트: fetch를 사용하여 API_BASE + "/users"에서 데이터를 가져오세요.
  // 에러 처리: if (!res.ok) throw new Error("유저 데이터를 불러오는데 실패했습니다.");
  return []; // ← 이 줄을 실제 fetch 로직으로 교체하세요
}

// TODO: 게시글 데이터를 가져오는 함수 (엔드포인트: /posts)
async function getPosts() {
  // 힌트: getUsers와 동일한 패턴으로 작성하세요.
  return []; // ← 이 줄을 실제 fetch 로직으로 교체하세요
}

// TODO: 앨범 데이터를 가져오는 함수 (엔드포인트: /albums)
async function getAlbums() {
  // 힌트: getUsers와 동일한 패턴으로 작성하세요.
  return []; // ← 이 줄을 실제 fetch 로직으로 교체하세요
}

// ─── [비동기 서버 컴포넌트] ─────────────────────────────────
// Next.js App Router에서 page.js의 기본 내보내기 함수를 async로 선언하면,
// 서버에서 데이터를 가져온 후 HTML로 렌더링하여 클라이언트에 전달합니다.
//
// 힌트: export default async function Home() { ... }
// 주의: "async"를 빼먹으면 await를 사용할 수 없습니다!

export default async function Home() {
  // ─── [병렬 데이터 페칭 (Promise.all)] ────────────────────
  // 여러 API를 동시에 호출하면 순차 호출보다 훨씬 빠릅니다.
  //
  // ❌ 느린 방식 (순차 호출 — 각 요청이 끝날 때까지 기다림):
  //   const users = await getUsers();     // ~200ms
  //   const posts = await getPosts();     // +~200ms (총 ~400ms)
  //   const albums = await getAlbums();   // +~200ms (총 ~600ms)
  //
  // ✅ 빠른 방식 (병렬 호출 — 모든 요청이 동시에 시작):
  //   const [users, posts, albums] = await Promise.all([
  //     getUsers(),    // ~200ms
  //     getPosts(),    // ~200ms (동시 시작)
  //     getAlbums(),   // ~200ms (동시 시작)
  //   ]);              // 총 ~200ms!
  //
  // 힌트: Promise.all을 사용하여 세 데이터를 병렬로 가져오세요.

  const users = []; // TODO: Promise.all로 교체
  const posts = []; // TODO: Promise.all로 교체
  const albums = []; // TODO: Promise.all로 교체

  // ─── [데이터 가공 (유저별 통계)] ──────────────────────────
  // 서버 컴포넌트 안에서는 가져온 데이터를 자유롭게 가공할 수 있습니다.
  // 이 로직은 서버에서만 실행되므로 클라이언트 번들 크기에 영향을 주지 않습니다.
  //
  // 힌트: users 배열을 map하여 각 유저에 postCount, albumCount를 추가하세요.
  //   const postsPerUser = users.map((user) => ({
  //     ...user,
  //     postCount: posts.filter((post) => post.userId === user.id).length,
  //     albumCount: albums.filter((album) => album.userId === user.id).length,
  //   }));

  const postsPerUser = []; // TODO: 위 힌트를 참고하여 데이터 가공 로직을 작성하세요

  return (
    <div className="space-y-8">
      {/* ─── [통계 카드 섹션] ─────────────────────────────── */}
      {/* 힌트: UserStatsCards에 totalUsers, totalPosts, totalAlbums를 전달하세요 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">대시보드 요약</h2>
        <UserStatsCards
          // TODO: props를 채워 넣으세요
          // totalUsers={users.length}
          // totalPosts={posts.length}
          // totalAlbums={albums.length}
        />
      </section>

      {/* ─── [유저 테이블 섹션] ───────────────────────────── */}
      {/* 힌트: UserTable에 가공된 유저 데이터(postsPerUser)를 전달하세요 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">유저 목록</h2>
        <UserTable
          // TODO: users prop을 채워 넣으세요
          // users={postsPerUser}
        />
      </section>

      {/* ─── [앨범 섹션] ─────────────────────────────────── */}
      {/* 힌트: UserAlbums에 앨범과 유저 데이터를 전달하세요 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">최근 앨범</h2>
        <UserAlbums
          // TODO: albums와 users props를 채워 넣으세요
          // albums={albums.slice(0, 8)}
          // users={users}
        />
      </section>
    </div>
  );
}
