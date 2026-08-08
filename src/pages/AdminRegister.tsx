import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { errorMessage } from "@/lib/api";
import { useAuth } from "@/hooks/AuthContext";

export default function AdminRegister() {
  const { adminRegister } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", passwordConfirmation: "", registrationKey: "" });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    if (form.password !== form.passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    setSaving(true);
    try {
      await adminRegister(form.name, form.email, form.password, form.passwordConfirmation, form.registrationKey);
      navigate("/dashboard", { replace: true });
    } catch (requestError) {
      setError(errorMessage(requestError));
    } finally {
      setSaving(false);
    }
  };

  return <main className="auth-page auth-admin"><section className="auth-card"><header><img src="/images/anc-logo.jpeg" alt="" /><h1>Register Administrator</h1><p>Temporary test registration protected by the server registration key.</p></header><form onSubmit={submit}>{error && <p className="auth-error" role="alert">{error}</p>}<label>FULL NAME<input required autoComplete="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label><label>ADMIN EMAIL<input required type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label><label>PASSWORD<input required minLength={10} type="password" autoComplete="new-password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /><small>At least 10 characters with uppercase, lowercase, number, and symbol.</small></label><label>CONFIRM PASSWORD<input required minLength={10} type="password" autoComplete="new-password" value={form.passwordConfirmation} onChange={(event) => setForm({ ...form, passwordConfirmation: event.target.value })} /></label><label>REGISTRATION KEY<input required type="password" autoComplete="off" value={form.registrationKey} onChange={(event) => setForm({ ...form, registrationKey: event.target.value })} /></label><button disabled={saving} type="submit">{saving ? "Creating administrator…" : "Create Admin & Open Dashboard"}</button></form><p className="auth-switch">Already registered? <Link to="/admin/login">Admin login</Link></p></section></main>;
}
