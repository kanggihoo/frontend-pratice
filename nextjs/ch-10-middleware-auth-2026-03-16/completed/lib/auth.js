// 모의 사용자 데이터베이스
const USERS = [
  {
    id: 1,
    username: "admin",
    password: "admin1234",
    role: "admin",
    name: "관리자",
    email: "admin@example.com",
  },
  {
    id: 2,
    username: "user",
    password: "user1234",
    role: "user",
    name: "일반 사용자",
    email: "user@example.com",
  },
];

// 모의 세션 저장소 (실제 환경에서는 DB 또는 Redis를 사용)
const sessions = new Map();

/**
 * 사용자 인증 — username/password를 확인하고 세션 토큰을 발급합니다.
 */
export function authenticate(username, password) {
  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) return null;

  // 간단한 랜덤 토큰 생성 (실무에서는 JWT 등 사용)
  const token = crypto.randomUUID();

  // 세션 저장
  sessions.set(token, {
    userId: user.id,
    username: user.username,
    role: user.role,
    name: user.name,
    email: user.email,
    createdAt: Date.now(),
  });

  return { token, user: { ...user, password: undefined } };
}

/**
 * 세션 토큰으로 사용자 정보를 조회합니다.
 */
export function getSession(token) {
  if (!token) return null;
  return sessions.get(token) || null;
}

/**
 * 세션을 삭제합니다 (로그아웃).
 */
export function removeSession(token) {
  sessions.delete(token);
}
