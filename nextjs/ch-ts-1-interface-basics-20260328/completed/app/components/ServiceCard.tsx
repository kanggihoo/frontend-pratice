import type { Service } from "@/lib/types";

// ─── ServiceCard Props 타입 ───────────────────────────────────────────────────
interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="text-4xl">{service.icon}</div>
      <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
    </div>
  );
}
