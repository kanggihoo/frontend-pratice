// practice/app/components/ServiceCard.tsx
//
// ─── [Props 타입 정의] ─────────────────────────────────────────────────────
// import type { Service } from '@/lib/types';
//
// interface ServiceCardProps {
//   service: Service;
// }

// TODO: 1. import type { Service } from '@/lib/types'; 를 추가하세요.
// TODO: 2. ServiceCardProps interface를 정의하세요.

export default function ServiceCard({ service }) { // ← 타입 없음 (에러 발생)
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="text-4xl">{service.icon}</div>
      <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
    </div>
  );
}
