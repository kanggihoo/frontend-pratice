// 갤러리 카테고리 목록
export const categories = [
  {
    slug: "nature",
    name: "자연 풍경",
    description: "아름다운 자연의 순간들을 담은 사진 컬렉션",
    coverImageId: 10,
  },
  {
    slug: "architecture",
    name: "건축물",
    description: "세계 각지의 인상적인 건축물과 도시 풍경",
    coverImageId: 164,
  },
  {
    slug: "food",
    name: "음식",
    description: "식욕을 자극하는 아름다운 요리 사진들",
    coverImageId: 292,
  },
  {
    slug: "travel",
    name: "여행",
    description: "세계 곳곳의 여행지에서 촬영한 풍경과 문화",
    coverImageId: 100,
  },
];

// 전체 갤러리 이미지 데이터
export const galleryImages = [
  // 자연 풍경
  {
    id: 1,
    category: "nature",
    title: "산속 호수의 아침",
    description:
      "이른 아침 안개가 피어오르는 산속 호수의 고요한 풍경입니다. 잔잔한 수면 위로 비치는 산 그림자가 인상적입니다.",
    photographer: "김자연",
    picsumId: 10,
    width: 800,
    height: 600,
    tags: ["호수", "산", "아침", "안개"],
  },
  {
    id: 2,
    category: "nature",
    title: "노을 지는 해변",
    description:
      "해가 수평선 너머로 지는 순간, 하늘이 주황빛과 보라빛으로 물드는 해변의 일몰 풍경입니다.",
    photographer: "이바다",
    picsumId: 11,
    width: 800,
    height: 600,
    tags: ["해변", "일몰", "노을"],
  },
  {
    id: 3,
    category: "nature",
    title: "초록빛 숲길",
    description:
      "울창한 숲 속으로 이어지는 오솔길입니다. 나뭇잎 사이로 비치는 햇살이 환상적입니다.",
    photographer: "박숲",
    picsumId: 15,
    width: 800,
    height: 600,
    tags: ["숲", "오솔길", "햇살"],
  },
  {
    id: 4,
    category: "nature",
    title: "설산 파노라마",
    description:
      "겨울철 만년설로 뒤덮인 웅장한 산맥의 파노라마 뷰입니다.",
    photographer: "최산",
    picsumId: 29,
    width: 800,
    height: 600,
    tags: ["산", "눈", "겨울", "파노라마"],
  },
  {
    id: 5,
    category: "nature",
    title: "꽃이 만개한 들판",
    description:
      "봄이 오면 다양한 야생화가 만개하는 드넓은 들판의 모습입니다.",
    photographer: "정봄",
    picsumId: 36,
    width: 800,
    height: 600,
    tags: ["꽃", "들판", "봄", "야생화"],
  },
  {
    id: 6,
    category: "nature",
    title: "폭포와 무지개",
    description:
      "높은 절벽에서 쏟아지는 웅장한 폭포와 물보라 사이로 피어나는 무지개입니다.",
    photographer: "한물결",
    picsumId: 40,
    width: 800,
    height: 600,
    tags: ["폭포", "무지개", "물"],
  },

  // 건축물
  {
    id: 7,
    category: "architecture",
    title: "모던 유리 빌딩",
    description:
      "도심 한가운데 자리한 초고층 유리 건물입니다. 하늘을 반사하는 유리 외벽이 장관입니다.",
    photographer: "김건축",
    picsumId: 164,
    width: 800,
    height: 600,
    tags: ["빌딩", "유리", "모던", "도시"],
  },
  {
    id: 8,
    category: "architecture",
    title: "유럽풍 성당",
    description:
      "수백 년 역사를 간직한 유럽 고딕 양식의 성당입니다. 정교한 조각과 스테인드글라스가 돋보입니다.",
    photographer: "이유럽",
    picsumId: 122,
    width: 800,
    height: 600,
    tags: ["성당", "유럽", "고딕", "역사"],
  },
  {
    id: 9,
    category: "architecture",
    title: "한옥 마을 지붕",
    description:
      "전통 한옥의 기와 지붕이 겹겹이 이어지는 고즈넉한 한옥 마을 풍경입니다.",
    photographer: "박전통",
    picsumId: 177,
    width: 800,
    height: 600,
    tags: ["한옥", "전통", "기와", "한국"],
  },
  {
    id: 10,
    category: "architecture",
    title: "나선형 계단",
    description:
      "건물 내부의 나선형 계단을 위에서 내려다본 모습입니다. 기하학적 패턴이 아름답습니다.",
    photographer: "최곡선",
    picsumId: 133,
    width: 800,
    height: 600,
    tags: ["계단", "나선", "기하학", "실내"],
  },
  {
    id: 11,
    category: "architecture",
    title: "야간 도시 스카이라인",
    description:
      "밤이 되면 화려한 조명으로 빛나는 대도시의 스카이라인입니다.",
    photographer: "한야경",
    picsumId: 174,
    width: 800,
    height: 600,
    tags: ["야경", "도시", "스카이라인", "조명"],
  },
  {
    id: 12,
    category: "architecture",
    title: "콘크리트 미니멀리즘",
    description:
      "노출 콘크리트와 직선으로만 구성된 미니멀리즘 건축물의 외관입니다.",
    photographer: "정미니",
    picsumId: 176,
    width: 800,
    height: 600,
    tags: ["콘크리트", "미니멀", "모던"],
  },

  // 음식
  {
    id: 13,
    category: "food",
    title: "수제 파스타",
    description:
      "갓 만든 수제 파스타에 바질과 파르메산 치즈를 올린 이탈리안 요리입니다.",
    photographer: "김셰프",
    picsumId: 292,
    width: 800,
    height: 600,
    tags: ["파스타", "이탈리안", "수제"],
  },
  {
    id: 14,
    category: "food",
    title: "화려한 디저트 플레이팅",
    description:
      "파티시에가 정성스럽게 플레이팅한 고급 디저트입니다. 초콜릿과 베리가 조화를 이룹니다.",
    photographer: "이디저트",
    picsumId: 312,
    width: 800,
    height: 600,
    tags: ["디저트", "초콜릿", "베리", "플레이팅"],
  },
  {
    id: 15,
    category: "food",
    title: "신선한 해산물 플래터",
    description:
      "갓 잡아 올린 신선한 해산물을 얼음 위에 정갈하게 배열한 해산물 플래터입니다.",
    photographer: "박바다",
    picsumId: 315,
    width: 800,
    height: 600,
    tags: ["해산물", "신선", "플래터"],
  },
  {
    id: 16,
    category: "food",
    title: "모닝 브런치 세트",
    description:
      "토스트, 계란, 베이컨, 신선한 과일로 구성된 풍성한 브런치 세트입니다.",
    photographer: "최아침",
    picsumId: 326,
    width: 800,
    height: 600,
    tags: ["브런치", "아침", "토스트", "건강"],
  },
  {
    id: 17,
    category: "food",
    title: "전통 한정식",
    description:
      "여러 가지 반찬과 함께 차려진 정갈한 한정식 상차림입니다.",
    photographer: "한맛",
    picsumId: 429,
    width: 800,
    height: 600,
    tags: ["한정식", "한국", "전통", "반찬"],
  },
  {
    id: 18,
    category: "food",
    title: "라떼 아트",
    description:
      "숙련된 바리스타가 만든 섬세한 라떼 아트가 돋보이는 카페라떼입니다.",
    photographer: "정커피",
    picsumId: 431,
    width: 800,
    height: 600,
    tags: ["커피", "라떼아트", "카페"],
  },

  // 여행
  {
    id: 19,
    category: "travel",
    title: "그리스 산토리니",
    description:
      "새하얀 건물과 파란 지붕이 에게해와 어우러진 산토리니의 상징적인 풍경입니다.",
    photographer: "김여행",
    picsumId: 100,
    width: 800,
    height: 600,
    tags: ["그리스", "산토리니", "바다", "유럽"],
  },
  {
    id: 20,
    category: "travel",
    title: "일본 교토 대나무 숲",
    description:
      "하늘 높이 뻗은 대나무가 빽빽하게 늘어선 교토 아라시야마의 대나무 숲길입니다.",
    photographer: "이도쿄",
    picsumId: 142,
    width: 800,
    height: 600,
    tags: ["일본", "교토", "대나무", "아시아"],
  },
  {
    id: 21,
    category: "travel",
    title: "뉴욕 타임스퀘어",
    description:
      "화려한 네온사인과 거대한 전광판으로 가득한 뉴욕 타임스퀘어의 야경입니다.",
    photographer: "박뉴욕",
    picsumId: 180,
    width: 800,
    height: 600,
    tags: ["뉴욕", "타임스퀘어", "야경", "미국"],
  },
  {
    id: 22,
    category: "travel",
    title: "아이슬란드 오로라",
    description:
      "아이슬란드의 밤하늘을 초록빛으로 물들이는 장엄한 오로라입니다.",
    photographer: "최극지",
    picsumId: 188,
    width: 800,
    height: 600,
    tags: ["아이슬란드", "오로라", "밤하늘"],
  },
  {
    id: 23,
    category: "travel",
    title: "모로코 사막의 낙타",
    description:
      "끝없이 펼쳐진 사하라 사막을 횡단하는 낙타 카라반의 실루엣입니다.",
    photographer: "한사막",
    picsumId: 195,
    width: 800,
    height: 600,
    tags: ["모로코", "사막", "낙타", "아프리카"],
  },
  {
    id: 24,
    category: "travel",
    title: "스위스 알프스 열차",
    description:
      "만년설 알프스 산맥을 가로지르는 빨간색 스위스 열차의 장관입니다.",
    photographer: "정유럽",
    picsumId: 210,
    width: 800,
    height: 600,
    tags: ["스위스", "알프스", "열차", "유럽"],
  },
];

// 카테고리별 이미지 조회
export function getImagesByCategory(category) {
  return galleryImages.filter((img) => img.category === category);
}

// 개별 이미지 조회
export function getImageById(id) {
  return galleryImages.find((img) => img.id === Number(id));
}

// 카테고리 정보 조회
export function getCategoryBySlug(slug) {
  return categories.find((cat) => cat.slug === slug);
}

// picsum.photos URL 생성 헬퍼
export function getPicsumUrl(picsumId, width = 800, height = 600) {
  return `https://picsum.photos/id/${picsumId}/${width}/${height}`;
}
