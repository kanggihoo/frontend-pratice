"use server";

import { revalidatePath } from "next/cache";
import { guestbookEntries } from "@/data/guestbook";
import type { ActionResult } from "@/lib/types";

// ─── Server Action: 방명록 추가 ────────────────────────────────────────────────
//
// [FormData.get() 반환 타입]
//   FormData.get(name) → string | File | null
//   - 폼 텍스트 필드에서는 항상 string 또는 null
//   - typeof value === "string" 으로 타입을 좁혀야 string으로 확정됩니다.
//
// [함수 반환 타입]
//   Promise<ActionResult> — 성공/실패 여부와 메시지를 포함한 구조화된 응답
//   Promise<void>        — 반환값이 필요 없을 때

// ─── useActionState와 함께 사용하는 Server Action 시그니처 ────────────────────────
// useActionState의 액션 함수는 (prevState, payload) 형태입니다.
//   prevState : 이전 상태 — ActionResult | null
//   formData  : 폼 데이터 — FormData
export async function addEntry(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  // FormData.get()의 반환 타입은 string | File | null
  const name = formData.get("name");
  const message = formData.get("message");

  // 타입 좁히기 (Type Narrowing): typeof로 string인지 확인
  if (typeof name !== "string" || name.trim() === "") {
    return { success: false, error: "이름을 입력해주세요." };
  }
  if (typeof message !== "string" || message.trim() === "") {
    return { success: false, error: "메시지를 입력해주세요." };
  }

  // 이 아래부터 name, message는 string 타입이 보장됩니다.
  const newEntry = {
    id: Date.now().toString(),
    name: name.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };

  guestbookEntries.unshift(newEntry);
  revalidatePath("/");

  return { success: true, message: "방명록에 등록되었습니다!" };
}

// ─── Server Action: 방명록 삭제 ────────────────────────────────────────────────
//
// [as string 타입 단언]
//   id는 hidden input으로 전달되므로 항상 string입니다.
//   이처럼 확실한 경우에만 타입 단언(as)을 사용합니다.
//   그러나 안전한 코드를 위해 typeof 체크를 권장합니다.

export async function deleteEntry(formData: FormData): Promise<void> {
  const id = formData.get("id") as string; // 확실한 경우에만 as 사용

  const index = guestbookEntries.findIndex((entry) => entry.id === id);
  if (index !== -1) {
    guestbookEntries.splice(index, 1);
  }

  revalidatePath("/");
}
