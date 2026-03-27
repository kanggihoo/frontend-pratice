import { Todo } from '../types';

// 타입 정의를 완료해야 에러가 나지 않습니다.
export const mockTodos: any[] = [
  { id: '1', text: 'React + TypeScript 기초 복습하기', completed: true, createdAt: Date.now() - 100000 },
  { id: '2', text: 'useState 제네릭 타입 적용해보기', completed: false, createdAt: Date.now() - 80000 },
  { id: '3', text: 'TodoList 항목 추가 및 삭제 기능 구현', completed: false, createdAt: Date.now() - 60000 },
  { id: '4', text: 'Tailwind CSS로 깔끔한 UI 완성하기', completed: true, createdAt: Date.now() - 40000 },
  { id: '5', text: '상태 불변성 원칙 지키며 업데이트하기', completed: false, createdAt: Date.now() - 20000 },
  { id: '6', text: '필터(전체/진행/완료) 기능 추가하기', completed: false, createdAt: Date.now() },
];
