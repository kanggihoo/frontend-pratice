import { FilterType } from '../types';

interface TodoFilterProps {
  currentFilter: FilterType;
  onChangeFilter: (filter: FilterType) => void;
}

export default function TodoFilter({ currentFilter, onChangeFilter }: TodoFilterProps) {
  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: '전체' },
    { value: 'active', label: '진행 중' },
    { value: 'completed', label: '완료' },
  ];

  return (
    <div className="flex space-x-2">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChangeFilter(value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            currentFilter === value
              ? 'bg-slate-800 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
