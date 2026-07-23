import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { errorMessage } from "@/lib/api";
import { useAuth } from "@/hooks/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", passwordConfirmation: "" });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setSaving(true); setError(null);
    if (form.password !== form.passwordConfirmation) {
      setError("Passwords do not match."); setSaving(false); return;
    }
    try {
      await register(form.name, form.email, form.password, form.passwordConfirmation);
      navigate("/", { replace: true });
    } catch (requestError) {
      setError(errorMessage(requestError));
    } finally {
      setSaving(false);
    }
  };

  return <main className="auth-page"><section className="auth-card"><header><img src="/images/anc-logo.jpeg" alt="" /><h1>Create Account</h1><p>Register for a personal ANC customer account.</p></header><form onSubmit={submit}>{error && <p className="auth-error" role="alert">{error}</p>}<label>FULL NAME<input required autoComplete="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label><label>EMAIL<input required type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label><label>PASSWORD<input required minLength={8} type="password" autoComplete="new-password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label><label>CONFIRM PASSWORD<input required minLength={8} type="password" autoComplete="new-password" value={form.passwordConfirmation} onChange={(event) => setForm({ ...form, passwordConfirmation: event.target.value })} /></label><button disabled={saving} type="submit">{saving ? "Creating account…" : "Register"}</button></form><p className="auth-switch">Already registered? <Link to="/login">Sign in</Link></p></section></main>;
}
