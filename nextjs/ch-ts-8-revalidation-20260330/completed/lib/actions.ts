'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import type { ActionResult } from '@/lib/types';

// ─── 댓글 추가 Server Action ────────────────────────────────────
// revalidatePath: 특정 경로의 캐시를 무효화 → 다음 요청 시 새로 렌더링
// 반환 타입을 Promise<ActionResult>로 명시해 클라이언트에서 결과를 처리할 수 있게 합니다.

export async function addComment(formData: FormData): Promise<ActionResult> {
  const postId = formData.get('postId');
  const name = formData.get('name');
  const body = formData.get('body');

  // FormData.get() 반환 타입: string | File | null
  // typeof 로 타입 좁히기(Type Narrowing)
  if (typeof postId !== 'string' || typeof name !== 'string' || typeof body !== 'string') {
    return { success: false, message: '입력값이 올바르지 않습니다.' };
  }

  if (!name.trim() || !body.trim()) {
    return { success: false, message: '이름과 댓글 내용을 모두 입력하세요.' };
  }

  // 실제 앱에서는 DB에 저장 — 여기서는 재검증만 시뮬레이션
  // revalidatePath: void 반환 → await 불필요
  revalidatePath(`/posts/${postId}`);

  return { success: true, message: '댓글이 등록되었습니다.' };
}

// ─── 전체 포스트 목록 재검증 Server Action ────────────────────────
// revalidateTag: 태그 기반으로 캐시 무효화 → void 반환
// Promise<void>는 반환값이 없는 비동기 함수에 사용합니다.

export async function refreshPosts(): Promise<void> {
  // revalidateTag(tag: string): void
  revalidateTag('posts');
  // revalidatePath(path: string, type?: 'page' | 'layout'): void
  revalidatePath('/', 'layout');
}

// ─── 특정 포스트 재검증 Server Action ────────────────────────────
// 반환값이 없으면 Promise<void>, 결과를 전달해야 하면 Promise<ActionResult>

export async function refreshPost(postId: number): Promise<ActionResult> {
  if (!postId || postId <= 0) {
    return { success: false, message: '유효하지 않은 포스트 ID입니다.' };
  }

  revalidatePath(`/posts/${postId}`);
  revalidateTag(`post-${postId}`);

  return { success: true, message: `포스트 #${postId} 캐시가 갱신되었습니다.` };
}
