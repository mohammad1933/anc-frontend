import { type FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Auth.css";
import { errorMessage } from "@/lib/api";
import { useAuth } from "@/hooks/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault(); setSaving(true); setError(null);
    try {
      await login(email, password);
      navigate((location.state as { from?: string } | null)?.from ?? "/", { replace: true });
    } catch (requestError) {
      setError(errorMessage(requestError));
    } finally {
      setSaving(false);
    }
  };

  return <main className="auth-page"><section className="auth-card"><header><img src="/images/anc-logo.jpeg" alt="" /><h1>Welcome Back</h1><p>Sign in to your ANC customer account.</p></header><form onSubmit={submit}>{error && <p className="auth-error" role="alert">{error}</p>}<label>EMAIL<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label><label>PASSWORD<input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} /></label><button disabled={saving} type="submit">{saving ? "Signing in…" : "Sign In"}</button></form><p className="auth-switch">New customer? <Link to="/register">Create an account</Link></p></section></main>;
}
