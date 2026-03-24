import { useRef } from "react";

// 리렌더링 횟수를 시각적으로 보여주는 디버깅용 컴포넌트
// 성능 최적화 전후를 비교할 때 유용합니다.
export default function RenderCounter({ label }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
      🔄 {label}: {renderCount.current}회
    </span>
  );
}
