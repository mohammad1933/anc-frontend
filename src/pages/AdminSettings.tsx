import { type FormEvent, useEffect, useState } from "react";
import "./AdminSettings.css";
import { api, errorMessage, type ApiResource } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import type { Setting } from "@/types/api";

export default function AdminSettings() {
  const { data, loading, error, reload } = useApi(() => api.get<{ data: Setting[] }>("settings"), []);
  const [form, setForm] = useState({ brand_name: "", legal_entity: "" });
  const [original, setOriginal] = useState(form);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  useEffect(() => {
    if (!data) return;
    const value = (key: string) => data.data.find((setting) => setting.key === key)?.value;
    const next = { brand_name: String(value("brand_name") ?? ""), legal_entity: String(value("legal_entity") ?? "") };
    setForm(next); setOriginal(next);
  }, [data]);
  const save = async (event: FormEvent) => {
    event.preventDefault(); setSaving(true); setMessage(null);
    try {
      await Promise.all([
        api.post<ApiResource<Setting>>("settings", { key: "brand_name", value: form.brand_name, group: "general", is_public: true }),
        api.post<ApiResource<Setting>>("settings", { key: "legal_entity", value: form.legal_entity, group: "general", is_public: true }),
      ]);
      setOriginal(form); setMessage("Settings saved successfully."); await reload();
    } catch (requestError) { setMessage(errorMessage(requestError)); } finally { setSaving(false); }
  };
  return <main className="st-main">
    <section className="st-heading"><h1>Admin Settings</h1><p>Configure your global platform preferences and team permissions.</p></section>
    <div className="st-layout">
      <form className="st-content" onSubmit={save}>
        {loading && <p role="status">Loading settings…</p>}{error && <p role="alert">{error}</p>}
        <section className="st-card st-brand"><h2>Brand Identity</h2>
          <label><span>BRAND NAME</span><input value={form.brand_name} onChange={(e) => setForm({ ...form, brand_name: e.target.value })} /></label>
          <label><span>LEGAL ENTITY</span><input value={form.legal_entity} onChange={(e) => setForm({ ...form, legal_entity: e.target.value })} /></label>
        </section>
        {message && <p role="status">{message}</p>}
        <section className="st-save"><button type="button" onClick={() => setForm(original)}>Cancel</button><button type="submit" disabled={saving}>{saving ? "Saving…" : "Save Changes"}</button></section>
      </form>
    </div>
  </main>;
}
