"use server";

// ─── [캐시 관련 함수 임포트] ──────────────────────────────
// Next.js의 캐시 무효화 함수들을 import해야 합니다.
// 힌트: "next/cache"에서 revalidatePath와 revalidateTag를 가져오세요.
// import { ??? , ??? } from "next/cache";

import { redirect } from "next/navigation";
import { readDB, writeDB } from "./data";

// ──────────────────────────────────────────────
// ★ 게시글 작성 Server Action
// ──────────────────────────────────────────────
export async function createPost(formData) {
  const author = formData.get("author")?.trim();
  const title = formData.get("title")?.trim();
  const content = formData.get("content")?.trim();

  if (!author || !title || !content) {
    return { error: "모든 필드를 입력해주세요." };
  }
  if (title.length > 50) {
    return { error: "제목은 50자 이하로 입력해주세요." };
  }
  if (content.length > 500) {
    return { error: "내용은 500자 이하로 입력해주세요." };
  }

  try {
    const db = await readDB();
    const newPost = {
      id: db.posts.length > 0 ? Math.max(...db.posts.map((p) => p.id)) + 1 : 1,
      author,
      title,
      content,
      createdAt: new Date().toISOString(),
    };
    db.posts.push(newPost);
    await writeDB(db);

    // ─── [revalidatePath 호출] ──────────────────────────
    // 게시글을 작성한 후, 메인 페이지('/')의 캐시를 무효화하여
    // 다음 방문 시 최신 게시글 목록이 표시되도록 해야 합니다.
    //
    // 힌트: revalidatePath('경로') 형태로 호출하세요.
    // 이 호출이 없으면 새 게시글이 목록에 즉시 반영되지 않습니다!
    // ???

    return { success: true };
  } catch (error) {
    console.error("게시글 작성 실패:", error);
    return { error: "게시글 작성에 실패했습니다." };
  }
}

// ──────────────────────────────────────────────
// ★ 댓글 작성 Server Action
// ──────────────────────────────────────────────
export async function createComment(formData) {
  const postId = Number(formData.get("postId"));
  const author = formData.get("author")?.trim();
  const content = formData.get("content")?.trim();

  if (!author || !content) {
    return { error: "모든 필드를 입력해주세요." };
  }
  if (content.length > 200) {
    return { error: "댓글은 200자 이하로 입력해주세요." };
  }

  try {
    const db = await readDB();
    if (!db.posts.find((p) => p.id === postId)) {
      return { error: "게시글을 찾을 수 없습니다." };
    }

    const newComment = {
      id:
        db.comments.length > 0
          ? Math.max(...db.comments.map((c) => c.id)) + 1
          : 1,
      postId,
      author,
      content,
      createdAt: new Date().toISOString(),
    };
    db.comments.push(newComment);
    await writeDB(db);

    // ─── [다중 경로 revalidatePath 호출] ──────────────────
    // 댓글 작성 시에는 두 곳의 캐시를 무효화해야 합니다:
    //
    // 1) 게시글 상세 페이지: 새 댓글이 즉시 보이도록
    //    힌트: revalidatePath(`/posts/${postId}`)
    //
    // 2) 메인 페이지: 댓글 수 카운트가 업데이트되도록
    //    힌트: revalidatePath('/')
    //
    // ??? (상세 페이지 재검증)
    // ??? (메인 페이지 재검증)

    return { success: true };
  } catch (error) {
    console.error("댓글 작성 실패:", error);
    return { error: "댓글 작성에 실패했습니다." };
  }
}

// ──────────────────────────────────────────────
// ★ 게시글 삭제 Server Action
// ──────────────────────────────────────────────
export async function deletePost(formData) {
  const id = Number(formData.get("id"));

  try {
    const db = await readDB();
    db.posts = db.posts.filter((p) => p.id !== id);
    db.comments = db.comments.filter((c) => c.postId !== id);
    await writeDB(db);

    // ─── [revalidatePath 호출] ──────────────────────────
    // 메인 페이지 캐시를 무효화하세요.
    // ???
  } catch (error) {
    console.error("게시글 삭제 실패:", error);
    return { error: "게시글 삭제에 실패했습니다." };
  }

  // ─── [redirect 호출 위치 주의!] ──────────────────────
  // redirect는 반드시 try/catch 밖에서 호출해야 합니다!
  // Next.js의 redirect()는 내부적으로 에러를 throw하므로,
  // try 블록 안에서 호출하면 catch에 잡혀버립니다.
  redirect("/");
}

// ──────────────────────────────────────────────
// ★ 댓글 삭제 Server Action
// ──────────────────────────────────────────────
export async function deleteComment(formData) {
  const commentId = Number(formData.get("commentId"));
  const postId = Number(formData.get("postId"));

  try {
    const db = await readDB();
    db.comments = db.comments.filter((c) => c.id !== commentId);
    await writeDB(db);

    // ─── [다중 경로 revalidatePath 호출] ──────────────────
    // 댓글 삭제 시에도 두 경로를 재검증해야 합니다.
    // ??? (상세 페이지)
    // ??? (메인 페이지)

    return { success: true };
  } catch (error) {
    console.error("댓글 삭제 실패:", error);
    return { error: "댓글 삭제에 실패했습니다." };
  }
}

// ──────────────────────────────────────────────
// ★ 명언 태그 재검증 Server Action (revalidateTag 데모)
// ──────────────────────────────────────────────
export async function revalidateQuoteAction() {
  // ─── [revalidateTag 호출] ──────────────────────────
  // QuoteCard 컴포넌트에서 fetch 시 { next: { tags: ['quote'] } }로
  // 태그를 붙였습니다. 이 함수에서 해당 태그의 캐시를 무효화하세요.
  //
  // 힌트: revalidateTag('태그이름')
  // → 이 태그가 붙은 모든 fetch 캐시가 즉시 무효화됩니다.
  // ???
}
