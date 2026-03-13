import UserCard from "./UserCard";

export default function UserList({
  users,
  loading,
  error,
  onRetry,
  onToggleFavorite,
  isFavorite,
}) {
  // ─── [로딩 상태 처리] ───────────────────────────
  // loading이 true일 때 스켈레톤 UI를 표시하세요.
  // 스켈레톤은 실제 카드와 비슷한 모양의 회색 블록들입니다.
  //
  // 힌트: if (loading) return ( <div>로딩 중...</div> );
  // 또는 아래처럼 animate-pulse를 사용한 스켈레톤 UI를 만들어보세요:
  //
  //   if (loading) {
  //     return (
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //         {[...Array(4)].map((_, i) => (
  //           <div key={i} className="bg-white rounded-xl p-5 animate-pulse">
  //             <div className="flex items-center gap-3">
  //               <div className="w-12 h-12 rounded-full bg-gray-200" />
  //               <div className="space-y-2">
  //                 <div className="h-4 w-28 bg-gray-200 rounded" />
  //                 <div className="h-3 w-20 bg-gray-200 rounded" />
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     );
  //   }


  // ─── [에러 상태 처리] ───────────────────────────
  // error가 있을 때 에러 메시지와 "다시 시도" 버튼을 표시하세요.
  // "다시 시도" 버튼은 onRetry를 호출합니다.
  //
  // 힌트:
  //   if (error) {
  //     return (
  //       <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
  //         <p className="text-red-700 font-medium">데이터를 불러오지 못했습니다</p>
  //         <p className="text-red-500 text-sm">{error}</p>
  //         <button onClick={onRetry} className="...">다시 시도</button>
  //       </div>
  //     );
  //   }


  // ─── [빈 결과 처리] ───────────────────────────
  // users.length === 0일 때 "검색 결과가 없습니다" 메시지를 표시하세요.
  //
  // 힌트: if (users.length === 0) return ( <div>검색 결과가 없습니다</div> );


  // ─── [유저 카드 리스트 렌더링] ───────────────────────────
  // users 배열을 map()으로 순회하며 UserCard 컴포넌트를 렌더링하세요.
  // - key: user.id
  // - user, onToggleFavorite, isFavorite props 전달
  //
  // 힌트:
  //   return (
  //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //       {users.map((user) => (
  //         <UserCard
  //           key={user.id}
  //           user={user}
  //           onToggleFavorite={onToggleFavorite}
  //           isFavorite={isFavorite}
  //         />
  //       ))}
  //     </div>
  //   );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* users.map()으로 UserCard를 렌더링하세요 */}
    </div>
  );
}
