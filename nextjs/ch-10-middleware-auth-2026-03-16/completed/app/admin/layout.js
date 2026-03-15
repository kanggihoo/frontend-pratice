import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex gap-6">
      <AdminSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
