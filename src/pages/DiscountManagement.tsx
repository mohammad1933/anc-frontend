import { type FormEvent, useMemo, useState } from "react";
import AdminModal from "@/components/admin/AdminModal";
import { api, assetUrl, errorMessage, type ApiResource } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import type { Catalog } from "@/types/api";
import "./DiscountManagement.css";

const emptyForm = { catalogId: "", price: "", currency: "AED", discountPercent: "", startsAt: "", endsAt: "" };
const money = (amount: string | undefined, currency = "AED") => amount ? new Intl.NumberFormat("en-AE", { style: "currency", currency }).format(Number(amount)) : "—";

function saleState(catalog: Catalog): "active" | "scheduled" | "expired" | "none" {
  if (!catalog.discount_percent) return "none";
  const now = Date.now();
  if (catalog.discount_starts_at && new Date(catalog.discount_starts_at).getTime() > now) return "scheduled";
  if (catalog.discount_ends_at && new Date(catalog.discount_ends_at).getTime() < now) return "expired";
  return "active";
}

export default function DiscountManagement() {
  const { data, loading, error, reload } = useApi(() => api.getAll<Catalog>("catalogs", { per_page: 100 }), []);
  const catalogs = data?.data ?? [];
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Catalog | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const discounted = useMemo(() => catalogs.filter((catalog) => catalog.discount_percent), [catalogs]);
  const visible = discounted.filter((catalog) => catalog.name.toLowerCase().includes(search.trim().toLowerCase()));

  const openForm = (catalog?: Catalog) => {
    setEditing(catalog ?? null);
    setForm(catalog ? {
      catalogId: String(catalog.id), price: catalog.price ?? "", currency: catalog.currency ?? "AED",
      discountPercent: catalog.discount_percent ? String(catalog.discount_percent) : "",
      startsAt: catalog.discount_starts_at?.slice(0, 16) ?? "", endsAt: catalog.discount_ends_at?.slice(0, 16) ?? "",
    } : emptyForm);
    setFormError(null);
    setOpen(true);
  };

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setFormError(null);
    try {
      await api.patch<ApiResource<Catalog>>(`admin/catalogs/${form.catalogId}/discount`, {
        enabled: true,
        price: Number(form.price),
        currency: form.currency,
        discount_percent: Number(form.discountPercent),
        discount_starts_at: form.startsAt || null,
        discount_ends_at: form.endsAt || null,
      });
      setOpen(false);
      await reload();
    } catch (requestError) {
      setFormError(errorMessage(requestError));
    } finally {
      setSaving(false);
    }
  };

  const remove = async (catalog: Catalog) => {
    if (!window.confirm(`Remove the discount from “${catalog.name}”?`)) return;
    try {
      await api.patch(`admin/catalogs/${catalog.id}/discount`, { enabled: false });
      await reload();
    } catch (requestError) {
      window.alert(errorMessage(requestError));
    }
  };

  return <main className="dm-main">
    <div className="dm-heading"><div><p>Admin / Promotions</p><h1>Collection Discounts</h1><span>Create, schedule, and manage sale pricing shown across the storefront.</span></div><button onClick={() => openForm()}>＋ Add Discount</button></div>
    <section className="dm-stats">
      <article><small>ACTIVE SALES</small><strong>{discounted.filter((item) => saleState(item) === "active").length}</strong><span>Live now</span></article>
      <article><small>SCHEDULED</small><strong>{discounted.filter((item) => saleState(item) === "scheduled").length}</strong><span>Upcoming</span></article>
      <article><small>DISCOUNTED</small><strong>{discounted.length}</strong><span>Configured</span></article>
      <article><small>PUBLISHED COLLECTIONS</small><strong>{catalogs.filter((item) => item.status === "published").length}</strong><span>Eligible</span></article>
    </section>
    <section className="dm-panel">
      <header><div><h2>Sale collections</h2><p>Only active, published sales appear on the public Discounts page.</p></div><input aria-label="Search discounts" placeholder="Search collections" value={search} onChange={(event) => setSearch(event.target.value)} /></header>
      {loading && <p className="dm-message" role="status">Loading discounts…</p>}
      {error && <p className="dm-message dm-error" role="alert">{error}</p>}
      {!loading && !error && visible.length === 0 && <div className="dm-empty"><b>No discounts configured</b><span>Choose Add Discount to put a collection on sale.</span></div>}
      <div className="dm-list">{visible.map((catalog) => {
        const state = saleState(catalog);
        return <article key={catalog.id}>
          {catalog.thumbnail_path ? <img src={assetUrl(catalog.thumbnail_path)} alt="" /> : <div className="dm-placeholder">ANC</div>}
          <div className="dm-name"><small>{catalog.category?.name ?? "COLLECTION"}</small><h3>{catalog.name}</h3><span>{catalog.sku ?? "No SKU"}</span></div>
          <div className="dm-price"><del>{money(catalog.price, catalog.currency)}</del><strong>{money(catalog.sale_price ?? (catalog.price ? String(Number(catalog.price) * (100 - (catalog.discount_percent ?? 0)) / 100) : undefined), catalog.currency)}</strong></div>
          <b className="dm-percent">−{catalog.discount_percent}%</b>
          <div className="dm-schedule"><small>SALE WINDOW</small><span>{catalog.discount_starts_at ? new Date(catalog.discount_starts_at).toLocaleDateString() : "Immediately"} → {catalog.discount_ends_at ? new Date(catalog.discount_ends_at).toLocaleDateString() : "No end date"}</span></div>
          <span className={`dm-status ${state}`}>● {state}</span>
          <div className="dm-actions"><button onClick={() => openForm(catalog)}>Edit</button><button onClick={() => void remove(catalog)}>Remove</button></div>
        </article>;
      })}</div>
    </section>
    <AdminModal open={open} title={editing ? `Edit ${editing.name} Discount` : "Add Collection Discount"} saving={saving} error={formError} onClose={() => setOpen(false)} onSubmit={save}>
      <label className="full">COLLECTION<select required disabled={Boolean(editing)} value={form.catalogId} onChange={(event) => { const catalog = catalogs.find((item) => item.id === Number(event.target.value)); setForm({ ...form, catalogId: event.target.value, price: catalog?.price ?? "", currency: catalog?.currency ?? "AED" }); }}><option value="">Select a collection</option>{catalogs.filter((catalog) => catalog.status === "published" && (!catalog.discount_percent || catalog.id === editing?.id)).map((catalog) => <option value={catalog.id} key={catalog.id}>{catalog.name}{catalog.sku ? ` — ${catalog.sku}` : ""}</option>)}</select></label>
      <label>REGULAR PRICE<input required type="number" min="0.01" step="0.01" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} /></label>
      <label>CURRENCY<select value={form.currency} onChange={(event) => setForm({ ...form, currency: event.target.value })}><option>AED</option><option>USD</option><option>EUR</option></select></label>
      <label>DISCOUNT PERCENT<input required type="number" min="1" max="99" value={form.discountPercent} onChange={(event) => setForm({ ...form, discountPercent: event.target.value })} /></label>
      <label>SALE PRICE<input readOnly value={form.price && form.discountPercent ? money(String(Number(form.price) * (100 - Number(form.discountPercent)) / 100), form.currency) : "Calculated automatically"} /></label>
      <label>START DATE & TIME<input type="datetime-local" value={form.startsAt} onChange={(event) => setForm({ ...form, startsAt: event.target.value })} /><small>Leave empty to start immediately.</small></label>
      <label>END DATE & TIME<input type="datetime-local" value={form.endsAt} onChange={(event) => setForm({ ...form, endsAt: event.target.value })} /><small>Leave empty to run until removed.</small></label>
    </AdminModal>
  </main>;
}
