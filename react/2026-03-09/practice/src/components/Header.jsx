export default function Header({ userCount }) {
  return (
    // - 배경색: bg-white
    // - 그림자: shadow-sm
    // - 하단 테두리: border-b border-slate-200
    <header className="bg-white shadow-sm border-b border-slate-200 ">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">유저 대시보드</h1>
            <p className="text-sm text-slate-500 mt-1">
              JSONPlaceholder API에서 불러온 유저 목록
            </p>
          </div>
          <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold ">
            총 {userCount}명
          </div>
        </div>
      </div>
    </header>
  );
}
