interface TodoHeaderProps {
  totalCount: number;
  completedCount: number;
}

export default function TodoHeader({ totalCount, completedCount }: TodoHeaderProps) {
  const isAllDone = totalCount > 0 && totalCount === completedCount;
  
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">오늘의 할 일</h1>
          <p className="text-blue-100 opacity-90">
            {isAllDone 
              ? '모든 일정을 완료했습니다! 휴식을 취해보세요 🎉'
              : '오늘도 힘차게 하루를 시작해볼까요? 💪'}
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-blue-200 uppercase tracking-wider mb-1">진행률</div>
          <div className="text-3xl font-bold">
            {completedCount}<span className="text-blue-300 text-xl font-medium">/{totalCount}</span>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-6 w-full bg-black/20 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-white h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${totalCount === 0 ? 0 : (completedCount / totalCount) * 100}%` }}
        />
      </div>
    </header>
  );
}
