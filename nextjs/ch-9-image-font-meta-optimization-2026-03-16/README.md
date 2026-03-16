# 회차 9 — 성능 최적화 (Image, Font, Meta)

## 주제 및 기획 의도

**SnapGallery** — 초고속 반응형 사진 갤러리

4가지 카테고리(자연, 건축, 음식, 여행)의 사진을 아름다운 그리드로 보여주는 갤러리 애플리케이션입니다. 이 주제를 선택한 이유는 **이미지가 많은 웹사이트**에서 Next.js의 성능 최적화 기능이 가장 극적으로 체감되기 때문입니다.

## 학습 목표

이 예제를 통해 다음을 배웁니다:

1. **`next/image`** — 이미지 자동 최적화 (WebP/AVIF 변환, lazy loading, CLS 방지)
2. **`next/font`** — Google 폰트 self-hosting (FOUT 방지, 외부 네트워크 요청 제거)
3. **`generateMetadata`** — 페이지별 동적 SEO 메타 태그 생성
4. **`dynamic()` import** — SSR 미지원 컴포넌트를 클라이언트 전용으로 동적 로딩

## React와의 차이점

| React (기존 방식)                       | Next.js (App Router)                          |
| --------------------------------------- | --------------------------------------------- |
| `<img src="...">` 그대로 사용           | `<Image>` 컴포넌트로 자동 최적화              |
| Google Fonts `<link>` 태그 직접 삽입    | `next/font`로 빌드 타임 self-hosting          |
| `react-helmet`으로 메타 태그 수동 관리  | `generateMetadata()` export로 자동 주입       |
| `React.lazy()` + `Suspense`             | `dynamic()` + `{ ssr: false }` 옵션           |
| 이미지 최적화 별도 설정 (webpack 플러그인) | `next/image`가 자동으로 처리                |

## 사전 준비

```bash
# 1. completed (완성본) 실행
cd completed
npm install
npm run dev
# → http://localhost:3000 에서 완성된 갤러리 확인

# 2. practice (실습용) 실행
cd practice
npm install
npm run dev
# → http://localhost:3001 에서 뼈대 확인 (포트 충돌 시 자동 변경)
```

> **참고**: 이번 회차에서는 `next.config.ts`에 `remotePatterns` 설정이 추가되어 있습니다. `next/image`에서 외부 이미지(picsum.photos)를 사용하기 위해 필요한 설정입니다.

## 핵심 학습 개념

### 1. `next/image` — 이미지 최적화 컴포넌트

**왜 필요한가?**
일반 `<img>` 태그는 원본 이미지를 그대로 다운로드합니다. 5MB짜리 PNG 이미지를 모바일에서도 그대로 받아야 하죠. `next/image`는 이를 자동으로 해결합니다.

**주요 기능:**
- **자동 포맷 변환**: 브라우저가 지원하면 WebP/AVIF로 변환 (용량 30~50% 감소)
- **반응형 크기 조절**: `sizes` 속성에 따라 적절한 크기의 이미지만 전송
- **Lazy Loading**: 뷰포트에 보일 때만 로드 (스크롤 전 이미지는 다운로드하지 않음)
- **CLS 방지**: `width`/`height` 또는 `fill`로 레이아웃 이동 방지

**두 가지 사용 모드:**

```jsx
// 1. 크기 지정 모드 — 카드, 썸네일 등
<Image src="/photo.jpg" alt="설명" width={800} height={600} />

// 2. fill 모드 — 배경, 히어로 이미지 등 (부모 크기에 맞춤)
<div className="relative h-[400px]">
  <Image src="/hero.jpg" alt="히어로" fill className="object-cover" />
</div>
```

**`priority` 속성:**
페이지의 LCP(Largest Contentful Paint) 이미지에는 `priority`를 추가하세요. Lazy loading이 비활성화되어 즉시 다운로드됩니다.

**`sizes` 속성:**
뷰포트에 따른 이미지 표시 크기를 알려줍니다. 불필요하게 큰 이미지를 다운로드하지 않아 성능이 향상됩니다.

```jsx
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
// 모바일: 화면 전체, 태블릿: 50%, 데스크톱: 33%
```

### 2. `next/font` — 폰트 최적화

**왜 필요한가?**
일반적으로 Google Fonts를 사용하면 브라우저가 Google 서버에 네트워크 요청을 보냅니다. 이로 인해:
- **FOUT (Flash of Unstyled Text)**: 폰트 로딩 전 기본 폰트가 보였다가 전환
- **CLS**: 폰트 변경으로 레이아웃이 밀림
- **프라이버시**: 사용자 IP가 Google에 전송

`next/font`는 빌드 시점에 폰트를 다운로드하여 자체 서버에서 제공합니다.

```jsx
import { Noto_Sans_KR } from "next/font/google";

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-sans",   // CSS 변수로 등록
  display: "swap",                // 폰트 로딩 전략
});

// layout.js의 <body>에 적용
<body className={`${notoSans.variable} font-[family-name:var(--font-noto-sans)]`}>
```

### 3. `generateMetadata` — 동적 SEO

**왜 필요한가?**
SNS에 링크를 공유하거나 검색 엔진이 크롤링할 때, 페이지마다 고유한 제목/설명/이미지가 필요합니다.

```jsx
// 정적 메타데이터 (layout.js)
export const metadata = {
  title: { default: "사이트명", template: "%s | 사이트명" },
  description: "설명",
};

// 동적 메타데이터 (page.js)
export async function generateMetadata({ params }) {
  const { id } = await params;
  const data = getData(id);
  return {
    title: data.title,           // → "제목 | 사이트명" (template 적용)
    description: data.description,
    openGraph: { images: [...] },  // SNS 미리보기 이미지
  };
}
```

### 4. `dynamic()` import — 동적 컴포넌트 로딩

**왜 필요한가?**
일부 라이브러리/컴포넌트는 `window`, `document`, Canvas API 등 브라우저 전용 API를 사용합니다. 서버에서 이를 렌더링하면 에러가 발생합니다.

```jsx
// ⚠️ Next.js 16에서는 dynamic({ ssr: false })를
// 반드시 "use client" 컴포넌트 안에서 사용해야 합니다!

// ── DynamicMap.js (클라이언트 래퍼 컴포넌트) ──
"use client";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,         // 서버에서 렌더링하지 않음
  loading: () => <p>지도 로딩 중...</p>,  // 폴백 UI
});

export default function DynamicMap(props) {
  return <MapComponent {...props} />;
}

// ── page.js (서버 컴포넌트) ──
import DynamicMap from "./DynamicMap";
// <DynamicMap center={[37.5, 127]} /> 로 사용
```

**사용 사례:**
- 지도 라이브러리 (Leaflet, Google Maps)
- 차트 라이브러리 (Chart.js, D3)
- Canvas/WebGL 기반 컴포넌트
- 에디터 (Quill, TipTap)

## 프로젝트 구조 안내

```
ch-9-image-font-meta-optimization-2026-03-16/
├── completed/                     # 완성본
│   ├── next.config.ts             # remotePatterns 설정 (picsum.photos 허용)
│   ├── data/
│   │   └── galleryData.js         # 갤러리 목업 데이터 (24개 이미지)
│   ├── app/
│   │   ├── layout.js              # ★ next/font 설정 + 정적 metadata
│   │   ├── page.js                # ★ next/image fill/priority 사용
│   │   ├── not-found.js           # 404 페이지
│   │   ├── components/
│   │   │   ├── Header.js          # 네비게이션 (서버 컴포넌트)
│   │   │   ├── GalleryGrid.js     # 이미지 그리드 레이아웃
│   │   │   ├── ImageCard.js       # ★ next/image width/height 모드
│   │   │   ├── LikeButton.js      # 좋아요 버튼 (클라이언트 컴포넌트)
│   │   │   ├── ImageViewer.js     # ★ Canvas 기반 뷰어 (SSR 불가)
│   │   │   └── DynamicImageViewer.js # ★ dynamic() 래퍼 (use client)
│   │   └── gallery/
│   │       └── [category]/
│   │           ├── page.js        # ★ generateMetadata + generateStaticParams
│   │           └── [id]/
│   │               └── page.js    # ★ dynamic() import + 동적 메타데이터
│   └── globals.css
├── practice/                      # 실습용 (동일 구조, 뼈대+힌트)
└── README.md                      # 이 파일
```

## 추천 실습 순서

### Step 1: `layout.js` — next/font 설정 (기초)
1. `Noto_Sans_KR`, `Playfair_Display` 폰트를 import
2. 폰트 인스턴스 생성 (subsets, weight, variable, display 설정)
3. `<body>`의 className에 CSS 변수 적용
4. 정적 metadata 객체의 title.template 설정

### Step 2: `components/Header.js` — next/link 적용
1. `import Link from "next/link"` 추가
2. 로고와 네비게이션의 `<span>`을 `<Link>`로 교체
3. 제목에 Playfair 폰트 CSS 변수 적용

### Step 3: `page.js` (홈) — next/image 기초
1. `import Image from "next/image"` 추가
2. 히어로 섹션에 `fill` + `priority` 모드 이미지 추가
3. 카테고리 카드에 `fill` 모드 이미지 + `sizes` 적용
4. `<div>`를 `<Link>`로 교체

### Step 4: `components/ImageCard.js` — next/image width/height 모드
1. Image 컴포넌트로 `width`/`height` 지정 방식 이미지 추가
2. `sizes` 속성으로 반응형 크기 힌트 설정
3. `<div>`를 `<Link>`로 교체

### Step 5: `gallery/[category]/page.js` — generateMetadata
1. `generateMetadata` 함수 작성 (카테고리명 → 페이지 타이틀)
2. `generateStaticParams` 함수 작성 (빌드 타임 경로 생성)
3. 제목에 Playfair 폰트 적용

### Step 6: `components/DynamicImageViewer.js` — dynamic() 래퍼 (새 파일 생성)
1. `"use client"` 지시어 추가
2. `import dynamic from "next/dynamic"` 추가
3. ImageViewer를 `dynamic()`으로 import (`ssr: false`, `loading` 폴백 UI)
4. props를 전달하는 래퍼 컴포넌트 작성

### Step 7: `gallery/[category]/[id]/page.js` — 동적 메타데이터 + 이미지 최적화
1. DynamicImageViewer import
2. `generateMetadata` 작성 (이미지 제목/설명 + openGraph 이미지)
3. 메인 이미지에 `fill` + `priority` 적용
4. 브레드크럼에 `Link` 적용
5. DynamicImageViewer 컴포넌트 렌더링

### Step 8: `components/LikeButton.js` & `ImageViewer.js` — 클라이언트 컴포넌트
1. LikeButton: `"use client"` 추가, useState 구현
2. ImageViewer: `"use client"` 추가, Canvas 로직 구현

## 교육자의 팁

### 흔히 하는 실수

1. **`fill` 모드 사용 시 부모에 `relative` 없음**
   - `fill`은 `position: absolute`로 동작하므로 부모에 `relative`와 크기가 필수

2. **`priority`를 모든 이미지에 적용**
   - LCP 이미지(첫 화면 메인 이미지)에만 적용하세요. 나머지는 lazy loading이 효율적

3. **`sizes` 생략**
   - sizes 없이 fill을 사용하면 뷰포트 전체 크기 이미지를 다운로드합니다

4. **서버 컴포넌트에서 `dynamic()` 사용 시 혼동**
   - `dynamic()`은 import하는 쪽(부모)에서 설정합니다. ImageViewer 자체가 아닌 그것을 사용하는 page.js에서 설정

5. **외부 이미지 사용 시 `remotePatterns` 미설정**
   - `next.config.ts`에 허용할 호스트를 등록해야 합니다 (이 프로젝트에서는 이미 설정됨)

### 꼭 기억할 포인트

- **`next/image`의 `sizes`는 성능의 핵심**: 올바른 sizes 설정이 불필요한 대역폭 낭비를 방지합니다
- **metadata의 `template`**: Root Layout의 `title.template: "%s | 사이트명"`을 설정하면 하위 페이지에서 title만 반환해도 자동으로 형식이 적용됩니다
- **`dynamic()`의 `loading` 옵션**: 폴백 UI를 제공하면 컴포넌트 로딩 중에도 좋은 UX를 유지할 수 있습니다

## 최종 기대 효과

이 회차를 마치면:
- `next/image`로 이미지 성능을 자동 최적화할 수 있습니다
- `next/font`로 폰트 로딩 성능을 개선할 수 있습니다
- `generateMetadata`로 페이지별 동적 SEO를 구현할 수 있습니다
- `dynamic()`으로 SSR 미지원 라이브러리를 안전하게 통합할 수 있습니다

## 심화 도전 과제

1. **Blur Placeholder 적용**: `next/image`의 `placeholder="blur"` + `blurDataURL`을 사용하여 이미지 로딩 중 블러 효과를 적용해보세요.
2. **다크 모드 지원**: `next/font`와 Tailwind CSS의 `dark:` 접두사를 활용하여 다크 모드를 구현해보세요.
