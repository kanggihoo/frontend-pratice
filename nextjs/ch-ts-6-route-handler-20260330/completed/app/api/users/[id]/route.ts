import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { User, ApiResponse } from '@/lib/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<User>>> {
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

    const user = await res.json() as User;

    return NextResponse.json({ success: true, data: user });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
