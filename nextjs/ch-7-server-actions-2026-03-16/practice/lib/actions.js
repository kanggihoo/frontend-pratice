// ─── [서버 액션 파일 지시어] ──────────────────────────
// 이 파일의 모든 함수를 Server Action으로 만들려면
// 파일 최상단에 특별한 문자열 지시어를 추가해야 합니다.
// 힌트: "use server"; 를 파일 맨 첫 줄에 작성하세요.
// 이 지시어가 있으면, 이 파일에서 export하는 모든 async 함수가
// 클라이언트에서 호출 가능한 Server Action이 됩니다.


import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

const DATA_PATH = path.join(process.cwd(), "data", "guestbook.json");

// ─── [방명록 데이터 읽기 함수] ─────────────────────────
// JSON 파일에서 방명록 데이터를 읽어 반환하는 함수입니다.
// 이 함수는 page.js (서버 컴포넌트)에서 호출됩니다.
// 힌트: fs.readFile로 파일을 읽고, JSON.parse로 파싱한 뒤,
//       최신 글이 위로 오도록 createdAt 기준 내림차순 정렬하세요.
export async function getGuestbookEntries() {
  try {
    // TODO: 아래 코드를 완성하세요
    // 1. fs.readFile(DATA_PATH, "utf-8")로 파일 읽기
    // 2. JSON.parse()로 파싱
    // 3. .sort()로 createdAt 기준 내림차순 정렬
    // 4. 정렬된 배열 반환

    return []; // ← 이 줄을 실제 구현으로 교체하세요
  } catch (error) {
    console.error("방명록 데이터 읽기 실패:", error);
    return [];
  }
}

// ─── [방명록 글 추가 Server Action] ────────────────────
// <form action={addGuestbookEntry}> 형태로 호출되는 Server Action입니다.
// formData 매개변수를 통해 폼 데이터를 받습니다.
//
// Server Action의 핵심 포인트:
// 1. formData.get("필드명")으로 폼 값을 추출합니다.
// 2. 서버사이드에서 유효성 검증을 수행합니다 (클라이언트 검증만으로는 불충분).
// 3. 데이터 저장 후 revalidatePath("/")로 페이지 캐시를 무효화합니다.
//    → 이렇게 하면 페이지가 최신 데이터로 다시 렌더링됩니다.
export async function addGuestbookEntry(formData) {
  // ─── [Step 1: 폼 데이터 추출] ───────────────────────
  // 힌트: formData.get("name"), formData.get("message")
  const name = null; // ← TODO: formData에서 name 추출
  const message = null; // ← TODO: formData에서 message 추출

  // ─── [Step 2: 서버사이드 유효성 검증] ─────────────────
  // 힌트: 빈 값 체크, 길이 제한 등을 검증하고
  //       실패 시 { error: "에러 메시지" } 객체를 반환하세요.
  // TODO: 유효성 검증 로직을 작성하세요
  // - name이 비어있으면 → return { error: "이름을 입력해주세요." };
  // - message가 비어있으면 → return { error: "메시지를 입력해주세요." };
  // - name이 20자 초과면 → return { error: "이름은 20자 이하로 입력해주세요." };
  // - message가 200자 초과면 → return { error: "메시지는 200자 이하로 입력해주세요." };

  try {
    // ─── [Step 3: 기존 데이터 읽기 & 새 데이터 추가] ─────
    // 힌트:
    // 1. fs.readFile로 기존 JSON 파일 읽기
    // 2. JSON.parse로 파싱
    // 3. 새 엔트리 객체 생성 (id, name, message, createdAt 포함)
    // 4. entries 배열에 push
    // 5. fs.writeFile로 JSON 파일에 다시 저장
    // TODO: 데이터 저장 로직을 작성하세요

    // ─── [Step 4: 페이지 캐시 무효화] ────────────────────
    // 힌트: revalidatePath("/")를 호출하면
    //       "/" 경로의 캐시가 무효화되어 최신 데이터가 반영됩니다.
    // TODO: revalidatePath 호출

    return { success: true };
  } catch (error) {
    console.error("방명록 글 추가 실패:", error);
    return { error: "글 저장에 실패했습니다. 다시 시도해주세요." };
  }
}

// ─── [방명록 글 삭제 Server Action] ────────────────────
// 삭제 폼에서 hidden input으로 전달된 id를 받아 해당 글을 삭제합니다.
// 힌트: addGuestbookEntry와 비슷한 패턴입니다.
// 1. formData.get("id")로 삭제할 글의 id 추출
// 2. JSON 파일 읽기 → filter로 해당 id 제외 → 파일 다시 쓰기
// 3. revalidatePath("/")로 캐시 무효화
export async function deleteGuestbookEntry(formData) {
  const id = Number(formData.get("id"));

  if (!id || isNaN(id)) {
    return { error: "유효하지 않은 글 번호입니다." };
  }

  try {
    // TODO: 아래 로직을 완성하세요
    // 1. fs.readFile로 기존 데이터 읽기
    // 2. JSON.parse로 파싱
    // 3. .filter()로 해당 id를 가진 글 제외
    // 4. fs.writeFile로 저장
    // 5. revalidatePath("/") 호출

    return { success: true };
  } catch (error) {
    console.error("방명록 글 삭제 실패:", error);
    return { error: "글 삭제에 실패했습니다. 다시 시도해주세요." };
  }
}
