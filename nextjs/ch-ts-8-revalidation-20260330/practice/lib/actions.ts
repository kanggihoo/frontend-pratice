'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

// ─── [Server Action 반환 타입] ────────────────────────────────────────────────
// JavaScript: export async function addComment(formData) { ... }
// TypeScript: 매개변수와 반환 타입을 명시합니다.
//
// revalidatePath / revalidateTag 반환 타입:
//   revalidatePath(path: string, type?: 'page' | 'layout'): void
//   revalidateTag(tag: string): void
//   → 두 함수 모두 void를 반환하므로 await 없이 바로 호출합니다.
//
// Server Action 반환 타입 선택 기준:
//   결과를 클라이언트에 전달할 필요가 없으면 → Promise<void>
//   성공/실패를 클라이언트에 알려야 하면   → Promise<ActionResult>

// TODO: 아래 함수들의 매개변수와 반환 타입을 채우세요.
// 힌트: (formData: FormData): Promise<ActionResult>
// ActionResult는 lib/types.ts에서 import해야 합니다.

// ─── 댓글 추가 Server Action ────────────────────────────────────

export async function addComment(formData) {   // ← 타입 없음 (에러 발생)
  const postId = formData.get('postId');
  const name = formData.get('name');
  const body = formData.get('body');

  // ─── [FormData.get() 타입 좁히기] ──────────────────────────────
  // FormData.get() 반환 타입: string | File | null
  // typeof 검사로 string임을 보장해야 TypeScript 에러가 사라집니다.
  // TODO: 아래 조건문의 의미를 이해하고 그대로 유지하세요.
  if (typeof postId !== 'string' || typeof name !== 'string' || typeof body !== 'string') {
    return { success: false, message: '입력값이 올바르지 않습니다.' };
  }

  if (!name.trim() || !body.trim()) {
    return { success: false, message: '이름과 댓글 내용을 모두 입력하세요.' };
  }

  // revalidatePath: void 반환 → await 없이 호출
  revalidatePath(`/posts/${postId}`);

  return { success: true, message: '댓글이 등록되었습니다.' };
}

// ─── 전체 포스트 목록 재검증 Server Action ────────────────────────
// TODO: 반환 타입을 Promise<void>로 명시하세요.
// 반환값이 없는 비동기 함수에 사용합니다.

export async function refreshPosts() {   // ← 반환 타입 없음
  // revalidateTag(tag: string): void
  revalidateTag('posts');
  // revalidatePath(path: string, type?: 'page' | 'layout'): void
  revalidatePath('/', 'layout');
}

// ─── 특정 포스트 재검증 Server Action ────────────────────────────
// TODO: 매개변수 타입(number)과 반환 타입(Promise<ActionResult>)을 추가하세요.

export async function refreshPost(postId) {   // ← 타입 없음 (에러 발생)
  if (!postId || postId <= 0) {
    return { success: false, message: '유효하지 않은 포스트 ID입니다.' };
  }

  revalidatePath(`/posts/${postId}`);
  revalidateTag(`post-${postId}`);

  return { success: true, message: `포스트 #${postId} 캐시가 갱신되었습니다.` };
}
