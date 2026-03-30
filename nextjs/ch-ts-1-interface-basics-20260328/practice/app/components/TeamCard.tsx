// practice/app/components/TeamCard.tsx
//
// ─── [Props 타입 정의] ─────────────────────────────────────────────────────
// JavaScript: function TeamCard({ member }) { ... }
// TypeScript: lib/types.ts에서 TeamMember를 import해 사용합니다.
//
// import type { TeamMember } from '@/lib/types';
//
// interface TeamCardProps {
//   member: TeamMember;
// }

// TODO: 1. import type { TeamMember } from '@/lib/types'; 를 추가하세요.
// TODO: 2. TeamCardProps interface를 정의하세요.
import type { TeamMember } from "@/lib/types";
interface TeamCardProps {
  member: TeamMember;
}
export default function TeamCard({ member }: TeamCardProps) {
  // ← 타입 없음 (에러 발생)
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-2 shadow-sm">
      <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600">
        {member.name[0]}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
        <p className="text-sm text-indigo-600 font-medium">{member.role}</p>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
    </div>
  );
}
