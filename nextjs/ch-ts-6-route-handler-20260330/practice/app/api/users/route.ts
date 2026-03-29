// practice/app/api/users/route.ts
// ─── [Route Handler 타입] ─────────────────────────────────────
// JavaScript: export async function GET(request) { ... }
// TypeScript: 매개변수와 반환 타입을 명시합니다.
//
// 핵심 패턴:
//   import type { NextRequest } from 'next/server';  ← 타입만 import
//   import { NextResponse } from 'next/server';       ← 실제 구현체 import
//
//   export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<User[]>>> {
//     ...
//   }
//
// searchParams 타입:
//   searchParams.get('limit')  → string | null 반환
//   ?? 연산자로 null 처리:  searchParams.get('limit') ?? '10'

// TODO: import type을 사용하여 NextRequest를 import하세요.
// TODO: ApiResponse, User 타입을 @/lib/types에서 import하세요.
import { NextResponse } from 'next/server';

export async function GET(request) {  // ← 타입 없음 (에러 발생)
  const { searchParams } = request.nextUrl;
  // TODO: searchParams.get()은 string | null을 반환합니다.
  //       ?? 연산자로 기본값을 설정하세요.
  const limit = searchParams.get('limit');  // ← null 처리 필요
  const search = searchParams.get('search');

  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users?_limit=${limit}`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch users from upstream' },
        { status: res.status }
      );
    }

    // TODO: res.json()의 반환 타입을 명시하세요.
    //       힌트: await res.json() as User[]
    let users = await res.json();

    if (search) {
      const query = search.toLowerCase();
      users = users.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
    }

    return NextResponse.json({
      success: true,
      data: users,
      count: users.length,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
