// ─── 도메인 타입 ───────────────────────────────────────────────────────────────

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

// ─── Server Action 응답 타입 ────────────────────────────────────────────────────
// Server Action은 void 또는 명시적 결과 객체를 반환합니다.
// 결과를 UI에 표시해야 할 때는 ActionResult처럼 구조화된 타입을 사용합니다.

export type ActionResult =
  | { success: true; message: string }
  | { success: false; error: string };
