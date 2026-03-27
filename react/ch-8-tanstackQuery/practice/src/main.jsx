import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// ─── [TanStack Query 임포트] ────────────────────────────
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App.jsx";
import "./index.css";

// ─── [QueryClient 생성] ─────────────────────────────────
// QueryClient 인스턴스를 생성하세요.
// defaultOptions에서 queries의 기본 옵션을 설정할 수 있습니다:
//   - staleTime: 데이터가 "신선"하게 유지되는 시간 (밀리초)
//     → 이 시간 동안은 같은 queryKey로 요청해도 API를 다시 호출하지 않습니다.
//     → 예: 1000 * 60 * 5 = 5분
//   - gcTime: 사용하지 않는 캐시 데이터를 메모리에 보관하는 시간 (구 cacheTime)
//     → 예: 1000 * 60 * 10 = 10분
//   - retry: API 호출 실패 시 재시도 횟수
//   - refetchOnWindowFocus: 브라우저 탭 전환 시 자동 재요청 여부
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 "신선"하게 유지
      gcTime: 1000 * 60 * 10, // 10분 동안 캐시 보관 (구 cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* ─── [QueryClientProvider 감싸기] ──────────────────── */}
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  </StrictMode>,
);
