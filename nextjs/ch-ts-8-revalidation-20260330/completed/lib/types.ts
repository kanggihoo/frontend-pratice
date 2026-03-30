// ─── 도메인 모델 ────────────────────────────────────────────────

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

// ─── Server Action 공용 응답 타입 ────────────────────────────────
// Server Action의 반환값을 일관된 구조로 표현합니다.
// success: 성공 여부, message: 사용자에게 보여줄 메시지 (선택)

export interface ActionResult {
  success: boolean;
  message?: string;
}
