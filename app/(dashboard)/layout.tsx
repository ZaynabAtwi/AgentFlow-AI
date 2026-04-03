import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-[260px_1fr] gap-6 p-6">
      <Sidebar />
      <div className="gradient-border rounded-2xl p-6">{children}</div>
    </div>
  );
}
