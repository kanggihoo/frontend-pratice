import { FilterType } from '../types';

interface TodoFilterProps {
  currentFilter: any; // TODO: FilterType 타입으로 변경
  onChangeFilter: any; // TODO: (filter: FilterType) => void 타입으로 변경
}

export default function TodoFilter({ currentFilter, onChangeFilter }: TodoFilterProps) {
  // 필터 버튼들을 렌더링하기 위한 배열 데이터 (각 객체는 value와 label을 가집니다)
  const filters: { value: string; label: string }[] = [ // TODO: value 타입을 FilterType으로 변경
    { value: 'all', label: '전체' },
    { value: 'active', label: '진행 중' },
    { value: 'completed', label: '완료' },
  ];

  return (
    <div className="">
      {/* ─── [리스트 렌더링] ────────────────────────────── */}
      {/* filters 배열을 map()으로 순회하며 button 요소들을 생성하세요. */}
      {/* 반드시 key prop에 고유한 값(예: value)을 제공해야 합니다. */}
      {/* onClick 이벤트에는 onChangeFilter를 호출하도록 연결하세요. */}
      {/* currentFilter 값과 일치하는 버튼에 활성화된 스타일을 주도록 조건부 CSS 클래스를 적용하세요. */}
      버튼들이 여기에 렌더링되어야 합니다.
    </div>
  );
}
