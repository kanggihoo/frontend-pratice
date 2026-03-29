// ─── [서버 액션 파일 지시어] ──────────────────────────
// 이 파일의 모든 함수를 Server Action으로 만들려면
// 파일 최상단에 특별한 문자열 지시어를 추가해야 합니다.
// 이 지시어가 있으면, 이 파일에서 export하는 모든 async 함수가
// 클라이언트에서 호출 가능한 Server Action이 됩니다.
"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

const DATA_PATH = path.join(process.cwd(), "data", "guestbook.json");

// ─── [방명록 데이터 읽기 함수] ─────────────────────────
// JSON 파일에서 방명록 데이터를 읽어 반환하는 함수입니다.
// 이 함수는 page.js (서버 컴포넌트)에서 호출됩니다.
// fs.readFile로 파일을 읽고, JSON.parse로 파싱한 뒤,
//       최신 글이 위로 오도록 createdAt 기준 내림차순 정렬
export async function getGuestbookEntries() {
  try {
    const data = await fs.readFile(DATA_PATH, "utf-8");
    const entries = JSON.parse(data);
    return entries.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  } catch (error) {
    console.error("방명록 데이터 읽기 실패:", error);
    return [];
  }
}

// ─── [방명록 글 추가 Server Action] ────────────────────
// <form action={addGuestbookEntry}> 형태로 호출되는 Server Action입니다.
// formData 매개변수를 통해 폼 데이터를 받습니다.

// Server Action의 핵심 포인트:
// 1. formData.get("필드명")으로 폼 값을 추출합니다.
// 2. 서버사이드에서 유효성 검증을 수행합니다 (클라이언트 검증만으로는 불충분).
// 3. 데이터 저장 후 revalidatePath("/")로 페이지 캐시를 무효화합니다.
//    → 이렇게 하면 페이지가 최신 데이터로 다시 렌더링됩니다.
export async function addGuestbookEntry(formData) {
  // ─── [Step 1: 폼 데이터 추출] ───────────────────────

  const name = formData.get("name");
  const message = formData.get("message");

  // ─── [Step 2: 서버사이드 유효성 검증] ─────────────────
  if (!name || name.trim().length === 0) {
    return { error: "이름을 입력해주세요." };
  }

  if (!message || message.trim().length === 0) {
    return { error: "메시지를 입력해주세요." };
  }

  if (name.trim().length > 20) {
    return { error: "이름은 20자 이하로 입력해주세요." };
  }

  if (message.trim().length > 200) {
    return { error: "메시지는 200자 이하로 입력해주세요." };
  }
  try {
    // ─── [Step 3: 기존 데이터 읽기 & 새 데이터 추가] ─────
    const data = await fs.readFile(DATA_PATH, "utf-8");
    const entries = JSON.parse(data);

    const newEntry = {
      id: entries.length > 0 ? Math.max(...entries.map((e) => e.id)) + 1 : 1,
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    // ─── [Step 4: 페이지 캐시 무효화] ────────────────────
    entries.push(newEntry);
    await fs.writeFile(DATA_PATH, JSON.stringify(entries, null, 2), "utf-8");

    // 페이지 캐시 무효화 → 최신 데이터로 갱신
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("방명록 글 추가 실패:", error);
    return { error: "글 저장에 실패했습니다. 다시 시도해주세요." };
  }
}

// ─── [방명록 글 삭제 Server Action] ────────────────────
// 삭제 폼에서 hidden input으로 전달된 id를 받아 해당 글을 삭제합니다.
export async function deleteGuestbookEntry(formData) {
  const id = Number(formData.get("id"));

  if (!id || isNaN(id)) {
    return { error: "유효하지 않은 글 번호입니다." };
  }

  try {
    const data = await fs.readFile(DATA_PATH, "utf-8");
    const entries = JSON.parse(data);

    const filteredEntries = entries.filter((entry) => entry.id !== id);

    if (filteredEntries.length === entries.length) {
      return { error: "해당 글을 찾을 수 없습니다." };
    }

    await fs.writeFile(
      DATA_PATH,
      JSON.stringify(filteredEntries, null, 2),
      "utf-8",
    );

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("방명록 글 삭제 실패:", error);
    return { error: "글 삭제에 실패했습니다. 다시 시도해주세요." };
  }
}
