// practice/data/guestbook.ts
// ─────────────────────────────────────────────────────────────────────────────
// TODO: lib/types.ts에 GuestbookEntry 인터페이스를 정의한 후,
//       아래 import 주석을 해제하고 타입 어노테이션을 추가하세요.
//
// import type { GuestbookEntry } from "@/lib/types";
//
// 힌트: export const guestbookEntries: GuestbookEntry[] = [ ... ]
// ─────────────────────────────────────────────────────────────────────────────

export const guestbookEntries = [
  {
    id: "1",
    name: "홍길동",
    message: "안녕하세요! 방명록에 처음 글을 남깁니다 😊",
    createdAt: "2026-03-28T09:00:00Z",
  },
  {
    id: "2",
    name: "김철수",
    message: "TypeScript 정말 편리하네요. 타입 안전성이 좋습니다!",
    createdAt: "2026-03-29T14:30:00Z",
  },
  {
    id: "3",
    name: "이영희",
    message: "Server Action을 처음 써봤는데 신기해요 👍",
    createdAt: "2026-03-30T08:15:00Z",
  },
];
