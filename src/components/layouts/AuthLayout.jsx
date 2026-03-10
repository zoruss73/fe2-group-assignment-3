import { Outlet, Navigate } from "react-router-dom"

export default function AuthLayout() {
  const user = localStorage.getItem("loggedInUser");
  if (user) return <Navigate to="/students" replace />;

  return (
    <div className="h-screen w-full">
      <Outlet />
    </div>
  )
}
