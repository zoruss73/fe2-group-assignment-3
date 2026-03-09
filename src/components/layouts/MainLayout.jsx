import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-slate-900 text-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 max-md:pt-16">
        <Outlet />
      </main>
    </div>
  );
}
