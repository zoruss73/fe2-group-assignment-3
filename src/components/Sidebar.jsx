
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Students", to: "/students", icon: "pi pi-users" },
  { label: "Attendance", to: "/attendance", icon: "pi pi-check-circle" },
  { label: "Appointments", to: "/appointments", icon: "pi pi-clock" },
  { label: "Documents", to: "/documents", icon: "pi pi-file" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  // Close mobile sidebar on route change (via resize or nav)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {/* Mobile burger button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
      >
        <i className="pi pi-bars text-lg" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          h-screen bg-slate-950 border-r border-slate-800 flex flex-col transition-all duration-300 font-poppins z-50
          ${collapsed ? "w-20" : "w-64"}
          max-md:fixed max-md:top-0 max-md:left-0 max-md:shadow-2xl
          ${mobileOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full"}
        `}
      >
        {/* Logo / Brand */}
        <div className="flex items-center justify-between px-5 py-6 border-b border-slate-800">
          {!collapsed && (
            <span className="text-xl font-bold text-violet-400 font-montserrat tracking-wide">
              FE2
            </span>
          )}
          <div className="flex items-center gap-1">
            {/* Close button on mobile */}
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <i className="pi pi-times text-sm" />
            </button>
            {/* Collapse toggle on desktop */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:block p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <i className={`pi pi-angle-double-left text-sm transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group border ${
                  isActive
                    ? "bg-violet-600/15 text-white shadow-lg shadow-violet-500/10 border-violet-500/20"
                    : "border-transparent text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <i
                    className={`${item.icon} text-base shrink-0 ${
                      isActive ? "text-violet-400" : "text-slate-500 group-hover:text-violet-400"
                    } transition-colors`}
                  />
                  {!collapsed && <span>{item.label}</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="px-3 py-4 border-t border-slate-800">
          <button
            onClick={() => { navigate("/"); setMobileOpen(false); }}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <i className="pi pi-sign-out text-base shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
