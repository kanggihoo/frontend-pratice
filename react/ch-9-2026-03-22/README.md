# 회차 9 — TanStack Query 심화

## 주제 및 기획 의도

**게시판** — JSONPlaceholder API를 활용하여 게시글 CRUD(작성/조회/수정/삭제)와 무한 스크롤 목록을 구현합니다.

이 주제를 선택한 이유:
- CRUD는 실무에서 가장 흔한 패턴이며, useMutation의 활용을 자연스럽게 배울 수 있습니다.
- 낙관적 업데이트로 "즉각적인 피드백"이 주는 UX 차이를 직접 체감할 수 있습니다.
- 무한 스크롤은 SNS, 이커머스 등 현대 웹앱에서 매우 많이 쓰이는 패턴입니다.

## 학습 목표

이 예제를 통해 다음을 배울 수 있습니다:

1. **useMutation**으로 데이터 변경(Create/Update/Delete) 처리하기
2. **낙관적 업데이트(Optimistic Update)** 패턴 이해 및 구현하기
3. **onMutate / onError / onSettled** 콜백의 역할과 흐름 이해하기
4. **invalidateQueries**로 캐시 무효화 및 서버 동기화하기
5. **useInfiniteQuery**로 무한 스크롤 구현하기
6. **getNextPageParam**으로 페이지네이션 로직 제어하기
7. **Intersection Observer**와 TanStack Query 연동하기

## 사전 준비

```bash
# completed (완성본) 실행
cd completed
npm install
npm run dev

# practice (실습용) 실행
cd practice
npm install
npm run dev
```

> 참고: JSONPlaceholder는 실제로 데이터를 저장하지 않습니다. POST/PATCH/DELETE 요청에 대해 성공 응답을 반환하지만 서버 데이터는 변경되지 않습니다. 그래서 낙관적 업데이트가 더욱 중요합니다!

## 핵심 학습 개념

### useMutation — 데이터 변경의 핵심

8회차의 `useQuery`가 데이터를 **읽는** 것이라면, `useMutation`은 데이터를 **변경**하는 것입니다.

```jsx
const mutation = useMutation({
  mutationFn: (newPost) => createPost(newPost),  // API 호출
  onSuccess: () => { /* 성공 시 실행 */ },
  onError: (error) => { /* 실패 시 실행 */ },
});

// 사용: mutation.mutate({ title: "제목", body: "내용" })
// 상태: mutation.isPending, mutation.isError, mutation.isSuccess
```

### 낙관적 업데이트 — 왜 UX가 좋아지는가?

**일반적인 흐름** (서버 응답 대기):
```
[삭제 클릭] → [서버 요청] → [1~2초 대기] → [응답 받음] → [UI 업데이트]
                              ❌ 사용자가 기다림
```

**낙관적 업데이트** (즉시 반영):
```
[삭제 클릭] → [즉시 UI에서 제거] + [서버 요청 (백그라운드)]
              ✅ 사용자는 바로 결과를 봄
              → 성공: 그대로 유지
              → 실패: 이전 상태로 롤백
```

### 낙관적 업데이트의 3단계 콜백

```jsx
const deleteMutation = useMutation({
  mutationFn: deletePost,

  // 1️⃣ onMutate: 서버 응답 전 (낙관적으로 UI 업데이트)
  onMutate: async (deletedId) => {
    // 진행 중인 쿼리 취소 (낙관적 업데이트를 덮어쓰지 않도록)
    await queryClient.cancelQueries({ queryKey: ["posts"] });

    // 이전 데이터 백업 (롤백용)
    const previousPosts = queryClient.getQueryData(["posts"]);

    // 캐시에서 즉시 제거
    queryClient.setQueryData(["posts"], (old) => ({
      ...old,
      pages: old.pages.map((page) => ({
        ...page,
        posts: page.posts.filter((p) => p.id !== deletedId),
      })),
    }));

    // context로 반환 → onError에서 사용
    return { previousPosts };
  },

  // 2️⃣ onError: 실패 시 (롤백)
  onError: (err, deletedId, context) => {
    queryClient.setQueryData(["posts"], context.previousPosts);
  },

  // 3️⃣ onSettled: 성공이든 실패든 (서버와 동기화)
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  },
});
```

### invalidateQueries — 캐시 무효화

```jsx
// 특정 쿼리의 캐시를 "stale"로 표시 → 자동으로 다시 가져옴
queryClient.invalidateQueries({ queryKey: ["posts"] });

// 여러 관련 쿼리를 한 번에 무효화
queryClient.invalidateQueries({ queryKey: ["post", postId] });
queryClient.invalidateQueries({ queryKey: ["posts"] });
```

### useInfiniteQuery — 무한 스크롤

```jsx
const {
  data,                // { pages: [page1, page2, ...], pageParams: [1, 2, ...] }
  fetchNextPage,       // 다음 페이지 로드 함수
  hasNextPage,         // 다음 페이지 존재 여부
  isFetchingNextPage,  // 다음 페이지 로딩 중?
} = useInfiniteQuery({
  queryKey: ["posts"],
  queryFn: ({ pageParam }) => fetchPosts(pageParam),
  initialPageParam: 1,          // 첫 페이지 파라미터
  getNextPageParam: (lastPage) => lastPage.nextPage, // 다음 페이지 결정
});

// 모든 페이지의 게시글을 하나의 배열로 합치기
const allPosts = data.pages.flatMap((page) => page.posts);
```

### Intersection Observer + useInfiniteQuery

```jsx
const lastPostRef = useCallback(
  (node) => {
    if (isFetchingNextPage) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage(); // 마지막 요소가 보이면 다음 페이지 로드
      }
    });

    if (node) observerRef.current.observe(node);
  },
  [isFetchingNextPage, hasNextPage, fetchNextPage]
);

// 마지막 게시글에 ref 연결
{allPosts.map((post, index) => (
  <div
    key={post.id}
    ref={index === allPosts.length - 1 ? lastPostRef : null}
  >
    ...
  </div>
))}
```

## 프로젝트 구조 안내

```
src/
├── main.jsx              ← QueryClient 설정 (8회차와 동일, 제공됨)
├── App.jsx               ← 화면 전환 로직 + 토스트 (실습 대상)
├── index.css             ← Tailwind CSS
├── data/
│   └── api.js            ← JSONPlaceholder API 함수 (제공됨)
└── components/
    ├── PostList.jsx       ← useInfiniteQuery + 무한 스크롤 (핵심 실습)
    ├── PostDetail.jsx     ← useQuery + useMutation 삭제 (핵심 실습)
    ├── PostForm.jsx       ← useMutation 작성/수정 + 낙관적 업데이트 (핵심 실습)
    ├── Toast.jsx          ← 토스트 알림 UI (제공됨)
    ├── LoadingSpinner.jsx ← 로딩 UI (제공됨)
    └── ErrorMessage.jsx   ← 에러 UI (제공됨)
```

## 추천 실습 순서

### Step 1: App.jsx — 화면 전환 로직
1. view, selectedPostId, toast 상태 선언
2. showToast, goToList, goToDetail, goToCreate, goToEdit 함수 작성
3. view에 따른 조건부 렌더링

### Step 2: PostList.jsx — useInfiniteQuery + 무한 스크롤 (핵심!)
1. `useInfiniteQuery` import
2. queryKey, queryFn, initialPageParam, getNextPageParam 설정
3. Intersection Observer로 lastPostRef 콜백 구현
4. 로딩/에러 상태 처리
5. allPosts = data.pages.flatMap(...) 으로 데이터 합치기
6. 게시글 카드 렌더링 (마지막 요소에 lastPostRef 연결)

### Step 3: PostDetail.jsx — useMutation으로 삭제 (핵심!)
1. useQuery로 게시글 + 댓글 조회
2. useQueryClient() 가져오기
3. useMutation으로 삭제 뮤테이션 구현
4. onMutate → onError → onSettled 낙관적 업데이트 흐름 작성
5. 게시글 정보 + 댓글 렌더링

### Step 4: PostForm.jsx — useMutation으로 작성/수정 (심화!)
1. 작성 뮤테이션 (createMutation) — 낙관적으로 목록에 추가
2. 수정 뮤테이션 (updateMutation) — 낙관적으로 상세 캐시 업데이트
3. handleSubmit에서 isEditing 분기

## 교육자의 팁

1. **낙관적 업데이트는 "보험"이 핵심입니다**
   - onMutate에서 반드시 이전 데이터를 백업(return)하세요.
   - onError에서 백업 데이터로 롤백하는 것이 안전망입니다.
   - onSettled에서 invalidateQueries로 서버와 최종 동기화합니다.

2. **cancelQueries를 빠뜨리지 마세요**
   - onMutate 첫 줄에서 진행 중인 쿼리를 취소해야 합니다.
   - 그렇지 않으면 백그라운드 리패칭이 낙관적 업데이트를 덮어쓸 수 있습니다.

3. **useInfiniteQuery의 data 구조를 이해하세요**
   ```jsx
   // data.pages = [
   //   { posts: [...10개], nextPage: 2 },  ← 1페이지
   //   { posts: [...10개], nextPage: 3 },  ← 2페이지
   //   { posts: [...10개], nextPage: null }, ← 마지막 페이지
   // ]
   ```

4. **JSONPlaceholder의 특성을 기억하세요**
   - POST/PATCH/DELETE는 성공 응답을 주지만 실제 데이터는 변경되지 않습니다.
   - 그래서 invalidateQueries 후 서버에서 다시 가져오면 원래 데이터가 나옵니다.
   - 실무에서는 서버 데이터가 실제로 변경되므로 자연스럽게 동작합니다.

5. **setQueryData의 데이터 구조를 정확히 맞춰야 합니다**
   - useInfiniteQuery의 캐시 데이터는 `{ pages: [...], pageParams: [...] }` 형태입니다.
   - setQueryData에서 이 구조를 유지하면서 수정해야 합니다.

## 최종 기대 효과

이 회차를 마치면 다음을 할 수 있게 됩니다:
- useMutation으로 CRUD 작업을 구현할 수 있다
- 낙관적 업데이트의 3단계(onMutate/onError/onSettled) 흐름을 설명하고 구현할 수 있다
- invalidateQueries로 캐시를 무효화하고 서버와 동기화할 수 있다
- useInfiniteQuery + Intersection Observer로 무한 스크롤을 구현할 수 있다
- 서버 상태 관리에서 TanStack Query의 강력함을 실감할 수 있다

## 심화 도전 과제

1. **댓글 작성 기능**: PostDetail에 댓글 입력 폼을 추가하고, useMutation으로 댓글 작성 + 낙관적 업데이트를 구현해보세요.

2. **게시글 좋아요 기능**: 각 게시글에 좋아요 버튼을 추가하고, 클릭 즉시 숫자가 올라가는 낙관적 업데이트를 구현해보세요. (로컬 상태와 조합)
