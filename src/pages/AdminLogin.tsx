import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { errorMessage } from "@/lib/api";
import { useAuth } from "@/hooks/AuthContext";

export default function AdminLogin() {
  const { adminLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setSaving(true); setError(null);
    try {
      await adminLogin(email, password);
      navigate("/dashboard", { replace: true });
    } catch (requestError) {
      setError(errorMessage(requestError));
    } finally {
      setSaving(false);
    }
  };

  return <main className="auth-page auth-admin"><section className="auth-card"><header><img src="/images/anc-logo.jpeg" alt="" /><h1>Admin Access</h1><p>Authorized ANC administrators only.</p></header><form onSubmit={submit}>{error && <p className="auth-error" role="alert">{error}</p>}<label>ADMIN EMAIL<input required type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} /></label><label>PASSWORD<input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} /></label><button disabled={saving} type="submit">{saving ? "Verifying…" : "Open Dashboard"}</button></form></section></main>;
}
