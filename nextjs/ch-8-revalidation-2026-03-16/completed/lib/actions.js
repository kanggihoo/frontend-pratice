"use server";

import { revalidatePath, revalidateTag } from "next/cache";
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

    // ★★★ 핵심: revalidatePath ★★★
    // 메인 페이지('/')의 Full Route Cache를 무효화합니다.
    // 이 호출이 없으면 새 게시글이 작성되어도 메인 페이지는
    // 캐시된 이전 데이터를 계속 보여주게 됩니다.
    revalidatePath("/");

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

    // ★★★ 핵심: revalidatePath (다중 경로) ★★★
    // 1) 게시글 상세 페이지 갱신 → 새 댓글이 즉시 보이도록
    revalidatePath(`/posts/${postId}`);
    // 2) 메인 페이지 갱신 → 댓글 수 카운트가 업데이트되도록
    revalidatePath("/");

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

    // ★ 메인 페이지 캐시 무효화
    revalidatePath("/");
  } catch (error) {
    console.error("게시글 삭제 실패:", error);
    return { error: "게시글 삭제에 실패했습니다." };
  }

  // ★ redirect는 try/catch 밖에서 호출해야 합니다!
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

    // ★ 해당 게시글 상세 + 메인 페이지 모두 갱신
    revalidatePath(`/posts/${postId}`);
    revalidatePath("/");

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
  // ★★★ 핵심: revalidateTag ★★★
  // 'quote' 태그가 붙은 fetch 캐시를 즉시 무효화합니다.
  // QuoteCard 컴포넌트에서 fetch 시 { next: { tags: ['quote'] } }로
  // 태그를 붙였으므로, 이 호출로 해당 캐시만 선택적으로 갱신됩니다.
  revalidateTag("quote");
}
