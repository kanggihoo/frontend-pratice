// ─── [컴포넌트 Props 타입 정의] ────────────────────
// totalCount, completedCount 두 가지 숫자형 프롭스를 받는 타입을 정의하세요.
interface TodoHeaderProps {
  // 여기에 코드를 작성하세요.
}

export default function TodoHeader(props: any) { // TODO: props 타입을 TodoHeaderProps로 변경하세요
  // 구조 분해 할당으로 props에서 필요한 값을 가져오세요.
  const totalCount = 0; // TODO: props.totalCount 대체
  const completedCount = 0; // TODO: props.completedCount 대체

  const isAllDone = totalCount > 0 && totalCount === completedCount;
  
  return (
    <header className="">
      <div className="">
        <div>
          <h1 className="">오늘의 할 일</h1>
          <p className="">
            {/* 조건부 렌더링: isAllDone이 참이면 완료 메시지, 거짓이면 응원 메시지 출력 */}
          </p>
        </div>
        <div className="">
          <div className="">진행률</div>
          <div className="">
            {/* 완료 개수 / 전체 개수 출력 */}
          </div>
        </div>
      </div>
      
      {/* Progress Bar 기능 구현 */}
      {/* 힌트: style={{ width: `${퍼센트}%` }} 형태로 인라인 스타일을 줄 수 있습니다. */}
      <div className="">
        <div 
          className=""
        />
      </div>
    </header>
  );
}
