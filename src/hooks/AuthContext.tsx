import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "customer" | "admin";
}

interface AuthResponse {
  token: string;
  user: AuthUser;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  adminLogin: (email: string, password: string) => Promise<AuthUser>;
  register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<AuthUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const remember = (response: AuthResponse) => {
    localStorage.setItem("anc_auth_token", response.token);
    setUser(response.user);
    return response.user;
  };

  useEffect(() => {
    if (!localStorage.getItem("anc_auth_token")) {
      setLoading(false);
      return;
    }
    api.get<{ user: AuthUser }>("auth/me")
      .then((response) => setUser(response.user))
      .catch(() => localStorage.removeItem("anc_auth_token"))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    login: async (email, password) => remember(await api.post<AuthResponse>("auth/login", { email, password })),
    adminLogin: async (email, password) => remember(await api.post<AuthResponse>("auth/admin/login", { email, password })),
    register: async (name, email, password, passwordConfirmation) => remember(await api.post<AuthResponse>("auth/register", {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    })),
    logout: () => {
      localStorage.removeItem("anc_auth_token");
      setUser(null);
    },
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider.");
  return context;
}
