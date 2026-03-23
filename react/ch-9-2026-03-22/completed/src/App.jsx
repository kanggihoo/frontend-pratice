import { useState } from "react";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import PostForm from "./components/PostForm";
import Toast from "./components/Toast";

export default function App() {
  const [view, setView] = useState("list"); // "list" | "detail" | "create" | "edit"
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const goToList = () => {
    setView("list");
    setSelectedPostId(null);
  };

  const goToDetail = (id) => {
    setSelectedPostId(id);
    setView("detail");
  };

  const goToCreate = () => {
    setView("create");
  };

  const goToEdit = (id) => {
    setSelectedPostId(id);
    setView("edit");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      {/* 헤더 */}
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-indigo-500/20 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={goToList} className="flex items-center gap-3 cursor-pointer">
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

          {view === "list" && (
            <button
              onClick={goToCreate}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-500 transition-colors cursor-pointer"
            >
              + 새 글 작성
            </button>
          )}
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {view === "list" && (
          <PostList onSelect={goToDetail} />
        )}
        {view === "detail" && (
          <PostDetail
            postId={selectedPostId}
            onBack={goToList}
            onEdit={goToEdit}
            showToast={showToast}
          />
        )}
        {view === "create" && (
          <PostForm
            onBack={goToList}
            showToast={showToast}
          />
        )}
        {view === "edit" && (
          <PostForm
            postId={selectedPostId}
            onBack={() => goToDetail(selectedPostId)}
            showToast={showToast}
          />
        )}
      </main>

      {/* 토스트 알림 */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
