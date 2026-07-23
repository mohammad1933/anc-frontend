import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/AuthContext";

export default function ProtectedRoute({ children, role }: { children: ReactNode; role?: "customer" | "admin" }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <main className="auth-loading" role="status">Checking your session…</main>;
  if (!user) return <Navigate to={role === "admin" ? "/admin/login" : "/login"} state={{ from: location.pathname }} replace />;
  if (role && user.role !== role) return <Navigate to={role === "admin" ? "/admin/login" : "/"} replace />;

  return children;
}
