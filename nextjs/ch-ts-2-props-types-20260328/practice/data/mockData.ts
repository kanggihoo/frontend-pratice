// practice/data/mockData.ts
// 데이터는 제공합니다 — 타입 어노테이션만 실습 대상입니다.
// lib/types.ts에 Product를 정의하면 아래에서 import해서 타입을 붙여보세요.

// import type { Product } from "@/lib/types";  ← lib/types.ts 완성 후 주석 해제

// TODO: mockProducts 배열에 타입 어노테이션을 추가하세요.
// 힌트: const mockProducts: Product[] = [...]
export const mockProducts = [
  {
    id: 1,
    name: "무선 블루투스 헤드폰",
    price: 89000,
    category: "전자기기",
    rating: 4.5,
    stock: 12,
    description: "노이즈 캔슬링 기능이 탑재된 프리미엄 무선 헤드폰입니다.",
    imageUrl: "https://placehold.co/300x200/e2e8f0/64748b?text=Headphone",
  },
  {
    id: 2,
    name: "인체공학 마우스",
    price: 45000,
    category: "전자기기",
    rating: 4.2,
    stock: 3,
    description: "장시간 사용에도 손목 피로를 줄여주는 인체공학 디자인.",
    imageUrl: "https://placehold.co/300x200/e2e8f0/64748b?text=Mouse",
  },
  {
    id: 3,
    name: "기계식 키보드",
    price: 120000,
    category: "전자기기",
    rating: 4.8,
    stock: 0,
    description: "청축 스위치 탑재, 타건감이 뛰어난 풀사이즈 키보드.",
    imageUrl: "https://placehold.co/300x200/e2e8f0/64748b?text=Keyboard",
  },
  {
    id: 4,
    name: "노트북 거치대",
    price: 32000,
    category: "액세서리",
    rating: 4.0,
    stock: 25,
    description: "알루미늄 소재의 접이식 노트북 거치대.",
    imageUrl: "https://placehold.co/300x200/e2e8f0/64748b?text=Stand",
  },
];
