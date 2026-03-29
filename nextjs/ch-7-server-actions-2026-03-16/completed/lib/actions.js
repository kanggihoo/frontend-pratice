"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

const DATA_PATH = path.join(process.cwd(), "data", "guestbook.json");

// 방명록 데이터 읽기
export async function getGuestbookEntries() {
  try {
    const data = await fs.readFile(DATA_PATH, "utf-8");
    const entries = JSON.parse(data);
    // 최신 글이 위에 오도록 정렬
    return entries.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  } catch (error) {
    console.error("방명록 데이터 읽기 실패:", error);
    return [];
  }
}

// 방명록 글 추가 (Server Action)
export async function addGuestbookEntry(formData) {
  const name = formData.get("name");
  const message = formData.get("message");

  // 서버사이드 유효성 검증
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
    const data = await fs.readFile(DATA_PATH, "utf-8");
    const entries = JSON.parse(data);

    const newEntry = {
      id: entries.length > 0 ? Math.max(...entries.map((e) => e.id)) + 1 : 1,
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

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

// 방명록 글 삭제 (Server Action)
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
