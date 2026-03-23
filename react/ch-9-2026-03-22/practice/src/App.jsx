import { useState } from "react";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import PostForm from "./components/PostForm";
import Toast from "./components/Toast";

export default function App() {
  // ─── [화면 전환 상태] ─────────────────────────────────
  // view 상태: "list" | "detail" | "create" | "edit"
  // selectedPostId: 선택된 게시글 ID (상세/수정 시 사용)
  // toast: 토스트 알림 상태 { message, type }
  //
  // 힌트:
  // const [view, setView] = useState("list");
  // const [selectedPostId, setSelectedPostId] = useState(null);
  // const [toast, setToast] = useState(null);


  // ─── [토스트 알림 함수] ────────────────────────────────
  // 토스트를 표시하고 3초 후 자동으로 사라지게 하는 함수
  // 힌트:
  // const showToast = (message, type = "success") => {
  //   setToast({ message, type });
  //   setTimeout(() => setToast(null), 3000);
  // };


  // ─── [화면 전환 함수들] ────────────────────────────────
  // goToList: 목록으로 이동 (view="list", selectedPostId=null)
  // goToDetail(id): 상세로 이동
  // goToCreate: 작성으로 이동
  // goToEdit(id): 수정으로 이동


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      {/* 헤더 */}
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-indigo-500/20 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white text-lg font-bold">B</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                게시판
              </h1>
              <p className="text-sm text-indigo-300">
                TanStack Query 심화 — useMutation & 무한 스크롤
              </p>
            </div>
          </button>

          {/* ─── [새 글 작성 버튼] ────────────────────────── */}
          {/* view === "list"일 때만 표시                        */}
        </div>
      </header>

      {/* ─── [조건부 렌더링] ──────────────────────────────── */}
      {/* view 값에 따라 다른 컴포넌트를 렌더링하세요.             */}
      {/*                                                         */}
      {/* view === "list"   → <PostList onSelect={goToDetail} />   */}
      {/* view === "detail" → <PostDetail                          */}
      {/*   postId={selectedPostId}                                */}
      {/*   onBack={goToList}                                      */}
      {/*   onEdit={goToEdit}                                      */}
      {/*   showToast={showToast}                                  */}
      {/* />                                                       */}
      {/* view === "create" → <PostForm                            */}
      {/*   onBack={goToList}                                      */}
      {/*   showToast={showToast}                                  */}
      {/* />                                                       */}
      {/* view === "edit"   → <PostForm                            */}
      {/*   postId={selectedPostId}                                */}
      {/*   onBack={() => goToDetail(selectedPostId)}              */}
      {/*   showToast={showToast}                                  */}
      {/* />                                                       */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-indigo-300 text-center">
          여기에 조건부 렌더링을 구현하세요.
        </p>
      </main>

      {/* ─── [토스트 알림] ───────────────────────────────── */}
      {/* toast가 있으면 <Toast message={...} type={...} /> 렌더링 */}
    </div>
  );
}
