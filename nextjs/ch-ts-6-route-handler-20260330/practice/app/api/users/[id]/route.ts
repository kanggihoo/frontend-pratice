// practice/app/api/users/[id]/route.ts
// ─── [동적 Route Handler 타입] ────────────────────────────────
// Next.js 15+에서 동적 Route Handler의 두 번째 인자 타입:
//
// JavaScript: export async function GET(request, { params }) { ... }
// TypeScript:
//   export async function GET(
//     request: NextRequest,
//     { params }: { params: Promise<{ id: string }> }  ← Promise 타입!
//   ): Promise<NextResponse<ApiResponse<User>>> {
//     const { id } = await params;  ← await 필수
//   }
//
// ⚠️ URL params는 항상 string입니다.
//    숫자가 필요하면 Number(id) 또는 parseInt(id, 10)으로 변환하세요.

// TODO: import type을 사용하여 NextRequest를 import하세요.
// TODO: ApiResponse, User 타입을 @/lib/types에서 import하세요.
import { NextResponse } from 'next/server';

// TODO: 함수 시그니처에 타입을 추가하세요.
//       - request: NextRequest
//       - 두 번째 인자: { params }: { params: Promise<{ id: string }> }
//       - 반환 타입: Promise<NextResponse<ApiResponse<User>>>
export async function GET(request, { params }) {  // ← 타입 없음 (에러 발생)
  const { id } = await params;

  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: `User with id ${id} not found` },
        { status: 404 }
      );
    }

    // TODO: res.json()의 반환 타입을 User로 단언하세요.
    const user = await res.json();

    return NextResponse.json({ success: true, data: user });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
