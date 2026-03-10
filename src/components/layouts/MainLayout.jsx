import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../Sidebar";

export default function MainLayout() {
  const user = localStorage.getItem("loggedInUser");
  if (!user) return <Navigate to="/" replace />;

  return (
    <div className="flex h-screen bg-slate-900 text-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 max-md:pt-16">
        <Outlet />
      </main>
    </div>
  );
}
