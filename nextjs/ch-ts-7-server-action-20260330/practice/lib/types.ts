// practice/lib/types.ts
// ─── [타입 정의 파일] ──────────────────────────────────────────────────────────
// 이 파일에 앱에서 사용하는 모든 공용 타입을 정의하세요.
// completed/lib/types.ts를 참고해서 직접 작성해보세요.

// ─────────────────────────────────────────────────────────────────────────────
// TODO 1: GuestbookEntry 인터페이스를 정의하세요.
//
// 방명록 항목 하나를 표현하는 타입입니다.
// 힌트:
//   interface GuestbookEntry {
//     id: string;
//     name: string;
//     message: string;
//     createdAt: string;
//   }
// ─────────────────────────────────────────────────────────────────────────────

// TODO 2: ActionResult 타입을 정의하세요.
//
// Server Action의 반환값 타입입니다. 성공과 실패 두 가지 케이스가 있습니다.
//
// [유니언 타입 (|)]
//   두 가지 가능한 형태를 | 로 연결합니다.
//   TypeScript는 success 값으로 어떤 케이스인지 구분합니다 (Discriminated Union).
//
// 힌트:
//   type ActionResult =
//     | { success: true; message: string }
//     | { success: false; error: string };
//
// 사용 예:
//   if (result.success) {
//     console.log(result.message); // ← 이 경우 message 접근 가능
//   } else {
//     console.log(result.error);   // ← 이 경우 error 접근 가능
//   }
// ─────────────────────────────────────────────────────────────────────────────
