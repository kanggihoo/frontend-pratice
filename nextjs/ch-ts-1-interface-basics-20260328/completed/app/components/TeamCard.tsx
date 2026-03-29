import type { TeamMember } from "@/lib/types";

// ─── TeamCard Props 타입 ──────────────────────────────────────────────────────
// lib/types.ts에 정의한 TeamMember interface를 import해서 Props 타입으로 사용합니다.
// 타입을 한 곳에서 관리하므로, TeamMember가 변경되면 이 컴포넌트도 자동으로 체크됩니다.
interface TeamCardProps {
  member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-2 shadow-sm">
      {/* member.imageUrl은 선택적 속성(imageUrl?: string)이므로 없을 수 있습니다 */}
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
