import type { GuestbookEntry } from "@/lib/types";

// 실제 앱에서는 DB를 사용합니다. 여기서는 메모리 배열로 대체합니다.
export const guestbookEntries: GuestbookEntry[] = [
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
