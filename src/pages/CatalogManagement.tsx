import { type FormEvent, useState } from "react";
import "./CatalogManagement.css";
import AdminModal from "@/components/admin/AdminModal";
import { api, errorMessage, toFormData, type ApiResource } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import type { Catalog, Category } from "@/types/api";

const emptyForm = { name: "", slug: "", sku: "", category_id: "", description: "", material: "", composition: "", applications: "", specifications: "", status: "draft", is_featured: false, is_new: false, thumbnail_path: "", pdf_path: "" };

export default function CatalogManagement() {
  const { data, loading, error, reload } = useApi(() => api.getAll<Catalog>("catalogs", { per_page: 100 }), []);
  const { data: categoryData } = useApi(() => api.getAll<Category>("categories", { per_page: 100 }), []);
  const [editing, setEditing] = useState<Catalog | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const catalogs = data?.data ?? [];
  const filteredCatalogs = catalogs.filter((catalog) => {
    const query = search.trim().toLowerCase();
    return (!query || [catalog.name, catalog.sku ?? "", catalog.material ?? ""].some((value) => value.toLowerCase().includes(query))) &&
      (!categoryFilter || catalog.category_id === Number(categoryFilter)) &&
      (!statusFilter || catalog.status === statusFilter);
  });

  const openForm = (catalog?: Catalog) => {
    setEditing(catalog ?? null);
    setForm(catalog ? {
      name: catalog.name, slug: catalog.slug, sku: catalog.sku ?? "", category_id: catalog.category_id ? String(catalog.category_id) : "",
      description: catalog.description ?? "", material: catalog.material ?? "", composition: catalog.composition ?? "", status: catalog.status,
      applications: (catalog.applications ?? []).join(", "), specifications: catalog.specifications ? JSON.stringify(catalog.specifications, null, 2) : "",
      is_featured: catalog.is_featured, is_new: catalog.is_new, thumbnail_path: catalog.thumbnail_path ?? "", pdf_path: catalog.pdf_path ?? "",
    } : emptyForm);
    setFormError(null);
    setThumbnail(null);
    setPdf(null);
    setModalOpen(true);
  };
  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setSaving(true); setFormError(null);
    try {
      const specifications = form.specifications.trim() ? JSON.parse(form.specifications) : null;
      if (specifications !== null && (Array.isArray(specifications) || typeof specifications !== "object")) throw new Error("Specifications must be a JSON object.");
      const applications = form.applications.split(",").map((item) => item.trim()).filter(Boolean);
      const payload = toFormData({
        ...form,
        category_id: form.category_id,
        applications,
        specifications: undefined,
      }, "thumbnail", thumbnail);
      if (applications.length === 0) payload.append("applications", "");
      Object.entries(specifications ?? {}).forEach(([key, value]) => payload.append(`specifications[${key}]`, String(value)));
      if (specifications === null) payload.append("specifications", "");
      if (pdf) payload.append("pdf", pdf);
      if (editing) await api.putForm<ApiResource<Catalog>>(`catalogs/${editing.id}`, payload);
      else await api.postForm<ApiResource<Catalog>>("catalogs", payload);
      setModalOpen(false); await reload();
    } catch (requestError) { setFormError(errorMessage(requestError)); } finally { setSaving(false); }
  };
  const remove = async (catalog: Catalog) => {
    if (!window.confirm(`Delete “${catalog.name}”? Its colors will also be deleted.`)) return;
    try { await api.delete(`catalogs/${catalog.id}`); await reload(); } catch (requestError) { window.alert(errorMessage(requestError)); }
  };

  return <main className="cm-main">
    <p className="cm-crumb">Admin / Inventory</p>
    <div className="cm-title"><h1>Catalog Management</h1><button onClick={() => openForm()}><b>＋</b> Add New Catalog</button></div>
    <div className="cm-stats">
      <article><h2>TOTAL CATALOGS</h2><strong>{data?.meta.total ?? 0}</strong><span>All records</span></article>
      <article><h2>ACTIVE DESIGNS</h2><strong>{catalogs.filter((item) => item.status === "published").length}</strong><span>Published</span></article>
      <article><h2>MISSING SPECS</h2><strong className="danger">{catalogs.filter((item) => !item.specifications).length}</strong><span className="alert">Action Req.</span></article>
      <article><h2>FEATURED ITEMS</h2><strong>{catalogs.filter((item) => item.is_featured).length}</strong><span>☆</span></article>
    </div>
    <section className="cm-catalog-panel">
      <div className="cm-filters">
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, SKU, or material" />
        <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}><option value="">All categories</option>{categoryData?.data.map((category) => <option value={category.id} key={category.id}>{category.name}</option>)}</select>
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="">All statuses</option><option value="draft">Draft</option><option value="published">Published</option><option value="hidden">Hidden</option></select>
        <button onClick={() => { setSearch(""); setCategoryFilter(""); setStatusFilter(""); }}>Clear</button>
      </div>
      <div className="cm-table">
      <div className="cm-head"><span>THUMBNAIL</span><span>CATALOG NAME</span><span>CATEGORY</span><span>COLORS</span><span>STATUS</span><span>ATTRIBUTES</span><span>ACTIONS</span></div>
      {loading && <p role="status">Loading catalogs…</p>}{error && <p role="alert">{error}</p>}
      {filteredCatalogs.map((catalog) => <div className="cm-row" key={catalog.id}>
        {catalog.thumbnail_path ? <img className="cm-thumb" src={catalog.thumbnail_path} alt="" /> : <div className="cm-no-image">▧</div>}
        <div><h3>{catalog.name}</h3><p>SKU: {catalog.sku ?? "—"}</p></div>
        <div><span className="category">{catalog.category?.name ?? "UNASSIGNED"}</span></div>
        <div>{catalog.colors_count ?? 0} Colors</div><div className={catalog.status === "published" ? "published" : "muted"}>● {catalog.status}</div>
        <div>{catalog.is_featured && <span className="featured">☆ FEATURED</span>}{catalog.is_new && <span className="new">NEW</span>}</div>
        <div className="admin-inline-actions"><button onClick={() => openForm(catalog)}>Edit</button><button className="admin-danger" onClick={() => void remove(catalog)}>Delete</button></div>
      </div>)}
      {!loading && !error && filteredCatalogs.length === 0 && <p>No catalogs match the selected filters.</p>}
      <div className="cm-pagination"><p>Showing <b>{filteredCatalogs.length}</b> of <b>{data?.meta.total ?? 0}</b> catalogs</p></div>
    </div></section>
    <AdminModal open={modalOpen} title={editing ? "Edit Catalog" : "Create Catalog"} saving={saving} error={formError} onClose={() => setModalOpen(false)} onSubmit={save}>
      <label>NAME<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
      <label>SLUG<input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></label>
      <label>SKU<input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} /></label>
      <label>CATEGORY<select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}><option value="">Unassigned</option>{categoryData?.data.map((category) => <option value={category.id} key={category.id}>{category.name}</option>)}</select></label>
      <label>MATERIAL<input value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} /></label>
      <label>COMPOSITION<input value={form.composition} onChange={(e) => setForm({ ...form, composition: e.target.value })} /></label>
      <label className="full">APPLICATIONS (COMMA SEPARATED)<input value={form.applications} onChange={(e) => setForm({ ...form, applications: e.target.value })} /></label>
      <label className="full">SPECIFICATIONS (JSON OBJECT)<textarea placeholder={'{"width": "140 cm", "weight": "450 gsm"}'} value={form.specifications} onChange={(e) => setForm({ ...form, specifications: e.target.value })} /></label>
      <label>STATUS<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option value="draft">Draft</option><option value="published">Published</option><option value="hidden">Hidden</option></select></label>
      <label>CATALOG IMAGE<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setThumbnail(e.target.files?.[0] ?? null)} /><small>{thumbnail?.name ?? (editing?.thumbnail_path ? "Keep current image" : "JPG, PNG or WebP, max 5 MB")}</small></label>
      <label>CATALOG PDF<input type="file" accept="application/pdf" onChange={(e) => setPdf(e.target.files?.[0] ?? null)} /><small>{pdf?.name ?? (editing?.pdf_path ? "Keep current PDF" : "PDF, max 10 MB")}</small></label>
      <label><span>FEATURED</span><input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} /></label>
      <label><span>NEW ARRIVAL</span><input type="checkbox" checked={form.is_new} onChange={(e) => setForm({ ...form, is_new: e.target.checked })} /></label>
      <label className="full">DESCRIPTION<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
    </AdminModal>
  </main>;
}
