import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import "./ServiceManagement.css";
import AdminModal from "@/components/admin/AdminModal";
import { api, errorMessage, toFormData } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import type { Service } from "@/types/api";

interface ServiceCardData {
  source: Service;
  type: string; image: string; title: string; state: string; description: string;
  tags: string[]; volume: string; updated: string; preview: string;
}

function ServiceCard({ service, onEdit, onDelete }: { service: ServiceCardData; onEdit: (service: Service) => void; onDelete: (service: Service) => Promise<void> }) {
  return (
    <article className="sv-card">
      <div className={`sv-image ${service.image ? "" : "supply"}`} style={service.image ? { backgroundImage: `url(${service.image})` } : undefined}><span>{service.type}</span></div>
      <div className="sv-card-body">
        <header><h2>{service.title}</h2><div><span>{service.state}</span></div></header>
        <p>{service.description}</p>
        <div className="sv-tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <footer>
          <div><small>INQUIRY<br />VOLUME</small><b>{service.volume}</b></div>
          <div><small>UPDATED BY</small><b>{service.updated}</b></div>
          <Link to="/services">{service.preview}</Link><button onClick={() => onEdit(service.source)}>✎ Edit Details</button><button className="admin-danger" onClick={() => void onDelete(service.source)}>Delete</button>
        </footer>
      </div>
    </article>
  );
}

export default function ServiceManagement() {
  const { data, loading, error, reload } = useApi(
    () => api.getAll<Service>("services", { per_page: 100 }),
    [],
  );
  const [editing, setEditing] = useState<Service | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", type: "", description: "", tags: "", image_path: "", cta_label: "", cta_url: "", status: "draft", sort_order: 0 });
  const [image, setImage] = useState<File | null>(null);
  const servicesFromApi: ServiceCardData[] = (data?.data ?? []).map((service) => ({
    source: service,
    type: (service.type ?? "Service").toUpperCase(),
    image: service.image_path ?? "",
    title: service.title,
    state: service.status.toUpperCase(),
    description: service.description,
    tags: service.tags ?? [],
    volume: `${service.inquiries_count ?? service.inquiry_count ?? 0} Total`,
    updated: new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(service.updated_at)),
    preview: service.status === "draft" ? "Preview Draft" : "View Public Page",
  }));
  const edit = (service?: Service) => { setEditing(service ?? null); setForm(service ? { title: service.title, slug: service.slug, type: service.type ?? "", description: service.description, tags: (service.tags ?? []).join(", "), image_path: service.image_path ?? "", cta_label: service.cta_label ?? "", cta_url: service.cta_url ?? "", status: service.status, sort_order: 0 } : { title: "", slug: "", type: "", description: "", tags: "", image_path: "", cta_label: "", cta_url: "", status: "draft", sort_order: 0 }); setFormError(null); setImage(null); setOpen(true); };
  const save = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSaving(true); setFormError(null); const payload = toFormData({ ...form, type: form.type, tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean), cta_label: form.cta_label, cta_url: form.cta_url }, "image", image); try { editing ? await api.putForm(`services/${editing.id}`, payload) : await api.postForm("services", payload); setOpen(false); await reload(); } catch (requestError) { setFormError(errorMessage(requestError)); } finally { setSaving(false); } };
  const remove = async (service: Service) => { if (!window.confirm(`Delete service “${service.title}”?`)) return; try { await api.delete(`services/${service.id}`); await reload(); } catch (requestError) { window.alert(errorMessage(requestError)); } };

  return (
    <main className="sv-main">
      <section className="sv-heading">
        <div><span>SERVICE INVENTORY</span><h1>Company Services</h1><p>Manage your luxury textile offerings and consultation tiers. Configure<br />visibility, details, and call-to-action behaviors for client-facing catalogs.</p></div>
        <button onClick={() => edit()}>＋ Create New Service</button>
      </section>

      <section className="sv-stats">
        <article><span>TOTAL SERVICES</span><strong>{data?.meta.total ?? 0}</strong><em>All</em></article>
        <article><span>VISIBLE SERVICES</span><strong>{servicesFromApi.filter((service) => service.source.status === "visible").length}</strong><em>Live</em></article>
        <article><span>DRAFT SERVICES</span><strong>{servicesFromApi.filter((service) => service.source.status === "draft").length}</strong><em>Pending</em></article>
        <article><span>TOTAL ENQUIRIES</span><strong>{servicesFromApi.reduce((total, service) => total + (service.source.inquiries_count ?? service.source.inquiry_count ?? 0), 0)}</strong><em>Received</em></article>
      </section>

      {loading && <p role="status">Loading services…</p>}
      {error && <p role="alert">{error}</p>}
      <section className="sv-list">{servicesFromApi.map(service => <ServiceCard service={service} onEdit={edit} onDelete={remove} key={service.source.id} />)}</section>

      <footer className="sv-pagination">
        <p>Showing {servicesFromApi.length} of {data?.meta.total ?? 0} services</p>
      </footer>
      <AdminModal open={open} title={editing ? "Edit Service" : "Create Service"} saving={saving} error={formError} onClose={() => setOpen(false)} onSubmit={save}>
        <label>TITLE<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label><label>SLUG<input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></label>
        <label>TYPE<input value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} /></label><label>STATUS<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option value="draft">Draft</option><option value="visible">Visible</option><option value="hidden">Hidden</option></select></label>
        <label className="full">DESCRIPTION<textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label><label className="full">TAGS (COMMA SEPARATED)<input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} /></label>
        <label>CTA LABEL<input value={form.cta_label} onChange={(e) => setForm({ ...form, cta_label: e.target.value })} /></label><label>CTA URL<input value={form.cta_url} onChange={(e) => setForm({ ...form, cta_url: e.target.value })} /></label><label className="full">SERVICE IMAGE<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setImage(e.target.files?.[0] ?? null)} /><small>{image?.name ?? (editing?.image_path ? "Keep current image" : "JPG, PNG or WebP, max 5 MB")}</small></label>
      </AdminModal>
    </main>
  );
}
