import { type FormEvent, useState } from "react";
import "./CategoryManagement.css";
import AdminModal from "@/components/admin/AdminModal";
import { api, errorMessage, toFormData, type ApiResource } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import type { Category } from "@/types/api";

const emptyForm = { parent_id: "", name: "", slug: "", description: "", status: "active", image_path: "", sort_order: 0 };

export default function CategoryManagement() {
  const { data, loading, error, reload } = useApi(() => api.getAll<Category>("categories", { per_page: 100 }), []);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const categories = data?.data ?? [];
  const edit = (category?: Category) => {
    setEditing(category ?? null); setForm(category ? { parent_id: category.parent_id ? String(category.parent_id) : "", name: category.name, slug: category.slug, description: category.description ?? "", status: category.status, image_path: category.image_path ?? "", sort_order: category.sort_order ?? 0 } : emptyForm);
    setFormError(null); setImage(null); setOpen(true);
  };
  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setSaving(true); setFormError(null);
    const payload = toFormData({ ...form, parent_id: form.parent_id, description: form.description, tags: [] }, "image", image);
    try { editing ? await api.putForm<ApiResource<Category>>(`categories/${editing.id}`, payload) : await api.postForm<ApiResource<Category>>("categories", payload); setOpen(false); await reload(); }
    catch (requestError) { setFormError(errorMessage(requestError)); } finally { setSaving(false); }
  };
  const remove = async (category: Category) => {
    if (!window.confirm(`Delete category “${category.name}”? Catalogs will become unassigned.`)) return;
    try { await api.delete(`categories/${category.id}`); await reload(); } catch (requestError) { window.alert(errorMessage(requestError)); }
  };
  return <main className="cg-main">
    <section className="cg-heading"><div><p>Admin › Category Management</p><h1>Fabric Categories</h1><h2>Define and organize the textile architecture.</h2></div><button onClick={() => edit()}>＋ ADD NEW CATEGORY</button></section>
    {loading && <p role="status">Loading categories…</p>}{error && <p role="alert">{error}</p>}
    <section className="cg-grid">{categories.map((category) => <article className="cg-card" key={category.id}>
      <div className="cg-image" style={category.image_path ? { backgroundImage: `url(${category.image_path})` } : undefined} />
      <div className="cg-card-copy"><div><h2>{category.name}</h2><span>{category.catalogs_count ?? 0} Catalogs</span></div><p>{category.description}</p>
        <footer><span>{category.status.toUpperCase()}</span><div className="admin-inline-actions"><button onClick={() => edit(category)}>Edit</button><button className="admin-danger" onClick={() => void remove(category)}>Delete</button></div></footer>
      </div></article>)}</section>
    {!loading && categories.length === 0 && <p>No categories yet. Create the first category to organize catalogs.</p>}
    <AdminModal open={open} title={editing ? "Edit Category" : "Create Category"} saving={saving} error={formError} onClose={() => setOpen(false)} onSubmit={save}>
      <label>NAME<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
      <label>SLUG<input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></label>
      <label>STATUS<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option value="active">Active</option><option value="draft">Draft</option><option value="hidden">Hidden</option></select></label>
      <label>PARENT CATEGORY<select value={form.parent_id} onChange={(e) => setForm({ ...form, parent_id: e.target.value })}><option value="">None</option>{categories.filter((category) => category.id !== editing?.id).map((category) => <option value={category.id} key={category.id}>{category.name}</option>)}</select></label>
      <label>SORT ORDER<input type="number" min="0" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} /></label>
      <label className="full">CATEGORY IMAGE<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setImage(e.target.files?.[0] ?? null)} /><small>{image?.name ?? (editing?.image_path ? "Keep current image" : "JPG, PNG or WebP, max 5 MB")}</small></label>
      <label className="full">DESCRIPTION<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
    </AdminModal>
  </main>;
}
