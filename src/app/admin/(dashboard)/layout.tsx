import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminProvider } from "../components/AdminContext";
import { Sidebar } from "../components/Sidebar";
import { SaveBar } from "../components/SaveBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("mnm-admin-session");

  if (!session || session.value !== "authenticated") {
    redirect("/admin/login");
  }

  return (
    <AdminProvider>
      <div className="flex min-h-screen bg-brand-surface">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-8 pb-24">
            {children}
          </div>
          <SaveBar />
        </div>
      </div>
    </AdminProvider>
  );
}
