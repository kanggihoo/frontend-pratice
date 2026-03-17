// ─── [모의 사용자 데이터베이스] ──────────────────────────
// 실제 환경에서는 DB를 사용하지만, 학습 목적으로 배열로 정의합니다.
// 아래 USERS 배열에 테스트 계정 2개를 정의하세요.
//
// 힌트: 각 객체에 id, username, password, role("admin" 또는 "user"), name, email 필드를 포함
// - admin 계정: username: "admin", password: "admin1234", role: "admin"
// - user 계정: username: "user", password: "user1234", role: "user"
const USERS = [];

// ─── [모의 세션 저장소] ──────────────────────────────
// 서버 메모리에 세션을 저장하는 Map 객체입니다.
// 실제 환경에서는 Redis나 DB를 사용합니다.
const sessions = new Map();

/**
 * ─── [사용자 인증 함수] ──────────────────────────────
 * username과 password를 받아 USERS 배열에서 일치하는 사용자를 찾고,
 * 세션 토큰을 발급하여 sessions Map에 저장합니다.
 *
 * @param {string} username
 * @param {string} password
 * @returns {{ token: string, user: object } | null}
 *
 * 힌트:
 * 1. USERS.find()로 username과 password가 모두 일치하는 사용자를 찾으세요.
 * 2. 일치하는 사용자가 없으면 null을 반환하세요.
 * 3. crypto.randomUUID()로 랜덤 토큰을 생성하세요.
 * 4. sessions.set(token, { userId, username, role, name, email, createdAt })으로 세션을 저장하세요.
 * 5. { token, user: { ...user, password: undefined } }를 반환하세요 (비밀번호 제외!).
 */
export function authenticate(username, password) {
  // TODO: 여기에 인증 로직을 작성하세요

  return null;
}

/**
 * ─── [세션 조회 함수] ──────────────────────────────
 * 세션 토큰으로 저장된 사용자 정보를 조회합니다.
 *
 * 힌트: sessions.get(token)을 사용하세요. token이 없으면 null을 반환합니다.
 */
export function getSession(token) {
  // TODO: 여기에 세션 조회 로직을 작성하세요

  return null;
}

/**
 * ─── [세션 삭제 함수 (로그아웃)] ──────────────────────
 * 세션을 삭제하여 로그아웃을 처리합니다.
 *
 * 힌트: sessions.delete(token)을 사용하세요.
 */
export function removeSession(token) {
  // TODO: 여기에 세션 삭제 로직을 작성하세요
}
