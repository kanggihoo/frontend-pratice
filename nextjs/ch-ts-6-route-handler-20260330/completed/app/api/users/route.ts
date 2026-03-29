import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { User, ApiResponse } from '@/lib/types';

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<User[]>>> {
  const { searchParams } = request.nextUrl;
  const limit = searchParams.get('limit') ?? '10';
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

    let users = await res.json() as User[];

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
