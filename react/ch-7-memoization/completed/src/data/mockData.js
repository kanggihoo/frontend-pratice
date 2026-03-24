// 대량 상품 데이터 (200개) — 성능 최적화 체감을 위한 데이터셋
const categories = [
  "전자기기",
  "의류",
  "식품",
  "가구",
  "스포츠",
  "도서",
  "뷰티",
  "완구",
];

const brands = [
  "삼성",
  "LG",
  "애플",
  "나이키",
  "아디다스",
  "소니",
  "무인양품",
  "이케아",
  "뉴발란스",
  "다이슨",
  "필립스",
  "보스",
  "캐논",
  "로지텍",
  "샤오미",
];

const adjectives = [
  "프리미엄",
  "클래식",
  "모던",
  "울트라",
  "슬림",
  "프로",
  "에코",
  "스마트",
  "라이트",
  "맥스",
  "미니",
  "터보",
  "엘리트",
  "베이직",
  "하이퍼",
];

const productNames = {
  전자기기: [
    "무선 이어폰",
    "블루투스 스피커",
    "노트북 거치대",
    "USB-C 허브",
    "무선 충전기",
    "스마트 워치",
    "태블릿 케이스",
    "모니터 암",
    "기계식 키보드",
    "웹캠",
  ],
  의류: [
    "오버핏 티셔츠",
    "슬림 청바지",
    "후드 집업",
    "패딩 조끼",
    "린넨 셔츠",
    "조거 팬츠",
    "니트 가디건",
    "트렌치 코트",
    "데님 재킷",
    "캐시미어 머플러",
  ],
  식품: [
    "유기농 꿀",
    "그래놀라 바",
    "아몬드 밀크",
    "다크 초콜릿",
    "올리브 오일",
    "말차 파우더",
    "견과류 믹스",
    "프로틴 바",
    "코코넛 칩",
    "에너지 젤리",
  ],
  가구: [
    "책상 서랍장",
    "행거 선반",
    "쿠션 의자",
    "사이드 테이블",
    "북셀프",
    "벽걸이 거울",
    "수납 박스",
    "LED 스탠드",
    "커튼 봉",
    "원목 벤치",
  ],
  스포츠: [
    "요가 매트",
    "덤벨 세트",
    "러닝화",
    "자전거 헬멧",
    "수영 고글",
    "테니스 라켓",
    "축구공",
    "등산 배낭",
    "스케이트보드",
    "점핑 로프",
  ],
  도서: [
    "프로그래밍 입문",
    "요리 레시피북",
    "자기계발 에세이",
    "여행 가이드",
    "소설 베스트셀러",
    "경제학 개론",
    "디자인 원론",
    "역사 이야기",
    "과학 교양서",
    "사진집",
  ],
  뷰티: [
    "수분 크림",
    "선크림 SPF50",
    "클렌징 폼",
    "립스틱",
    "아이 팔레트",
    "헤어 에센스",
    "바디 로션",
    "핸드크림",
    "시트 마스크",
    "토너 패드",
  ],
  완구: [
    "레고 블록",
    "퍼즐 1000피스",
    "보드게임",
    "인형 세트",
    "RC 자동차",
    "물감 세트",
    "점토 키트",
    "과학 실험 키트",
    "카드 게임",
    "드론 미니",
  ],
};

function generateProducts(count) {
  const products = [];

  for (let i = 1; i <= count; i++) {
    const category = categories[i % categories.length];
    const brand = brands[i % brands.length];
    const adjective = adjectives[i % adjectives.length];
    const names = productNames[category];
    const name = names[i % names.length];
    const price = Math.floor(Math.random() * 500 + 5) * 1000;
    const rating = Math.round((Math.random() * 2 + 3) * 10) / 10;
    const reviewCount = Math.floor(Math.random() * 2000);
    const stock = Math.floor(Math.random() * 100);
    const discount = [0, 0, 0, 5, 10, 15, 20, 25, 30][
      Math.floor(Math.random() * 9)
    ];

    products.push({
      id: i,
      name: `${brand} ${adjective} ${name}`,
      category,
      brand,
      price,
      discountedPrice: discount > 0 ? Math.floor(price * (1 - discount / 100)) : price,
      discount,
      rating,
      reviewCount,
      stock,
      image: `https://picsum.photos/seed/product${i}/200/200`,
      createdAt: new Date(
        2025,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      ).toISOString(),
    });
  }

  return products;
}

export const products = generateProducts(200);
export { categories };
