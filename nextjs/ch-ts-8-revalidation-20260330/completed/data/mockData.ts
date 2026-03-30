import type { Post, Comment } from '@/lib/types';

export const mockPosts: Post[] = [
  {
    id: 1,
    userId: 1,
    title: '첫 번째 포스트',
    body: 'Next.js App Router와 TypeScript를 함께 사용하면 타입 안전성이 크게 향상됩니다.',
  },
  {
    id: 2,
    userId: 1,
    title: '서버 액션과 재검증',
    body: 'revalidatePath와 revalidateTag를 이용하면 ISR 캐시를 원하는 시점에 무효화할 수 있습니다.',
  },
  {
    id: 3,
    userId: 2,
    title: 'TypeScript 유틸리티 타입',
    body: 'Pick, Omit, Partial 같은 유틸리티 타입을 사용하면 중복 없이 타입을 재사용할 수 있습니다.',
  },
];

export const mockComments: Comment[] = [
  { id: 1, postId: 1, name: '김철수', email: 'kim@example.com', body: '정말 유익한 글이네요!' },
  { id: 2, postId: 1, name: '이영희', email: 'lee@example.com', body: '타입 안전성이 중요하죠.' },
  { id: 3, postId: 2, name: '박민준', email: 'park@example.com', body: 'revalidateTag 꿀팁 감사합니다.' },
  { id: 4, postId: 3, name: '최지수', email: 'choi@example.com', body: 'Omit 자주 씁니다!' },
];
