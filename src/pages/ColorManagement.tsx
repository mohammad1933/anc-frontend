import { type FormEvent, useEffect, useState } from "react";
import "./ColorManagement.css";
import AdminModal from "@/components/admin/AdminModal";
import { api, errorMessage, toFormData } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import type { Catalog, Color } from "@/types/api";
import { paginationItems } from "@/utils/pagination";

interface ColorCardData {
  source: Color; id: number; tone: string; type: string; name: string; sku: string; price: string; stock: string; level: string;
}

function ColorCard({ color, onEdit, onDelete }: { color: ColorCardData; onEdit: (color: Color) => void; onDelete: (color: Color) => Promise<void> }) {
  return (
    <article className="cl-card">
      <div className={`cl-swatch ${color.tone}`} style={color.source.swatch_path ? { backgroundImage: `url(${color.source.swatch_path})` } : undefined}>
        <span>{color.type}</span>
        {color.level === "out" && <b>OUT OF STOCK</b>}
      </div>
      <div className="cl-card-info">
        <div className="cl-name"><h2>{color.name}</h2><strong>{color.price}</strong></div>
        <p>{color.sku}</p>
      </div>
      <div className={`cl-stock ${color.level}`}>
        <i>●</i><span>{color.stock}</span><span>{color.source.stock_quantity} units</span>
      </div>
      <div className="admin-inline-actions"><button onClick={() => onEdit(color.source)}>Edit</button><button className="admin-danger" onClick={() => void onDelete(color.source)}>Delete</button></div>
    </article>
  );
}

export default function ColorManagement() {
  const { data, loading, error, reload } = useApi(() => api.getAll<Color>("colors", { per_page: 100 }), []);
  const { data: catalogData } = useApi(() => api.getAll<Catalog>("catalogs", { per_page: 100 }), []);
  const [actionError, setActionError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Color | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ catalog_id: "", name: "", code: "", sku: "", type: "plain", hex_code: "", price: "", currency: "AED", stock_quantity: 0, stock_status: "in_stock", swatch_path: "", is_active: true });
  const [swatch, setSwatch] = useState<File | null>(null);
  const [selectedCatalog, setSelectedCatalog] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | Color["type"]>("all");
  const [sortBy, setSortBy] = useState("recent");
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const colorsFromApi: ColorCardData[] = (data?.data ?? []).map((color) => ({
    source: color,
    id: color.id,
    tone: color.type,
    type: color.type.toUpperCase(),
    name: color.name,
    sku: color.sku,
    price: color.price ? `${color.currency} ${color.price}` : "Price on request",
    stock: color.stock_status.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase()),
    level: color.stock_status === "out_of_stock" ? "out" : color.stock_status === "low_stock" ? "low" : "normal",
  }));
  const filteredColors = colorsFromApi
    .filter((color) => !selectedCatalog || color.source.catalog_id === Number(selectedCatalog))
    .filter((color) => selectedType === "all" || color.source.type === selectedType)
    .sort((left, right) => {
      if (sortBy === "oldest") return left.id - right.id;
      if (sortBy === "name-asc") return left.name.localeCompare(right.name);
      if (sortBy === "name-desc") return right.name.localeCompare(left.name);
      if (sortBy === "stock-high") return right.source.stock_quantity - left.source.stock_quantity;
      if (sortBy === "stock-low") return left.source.stock_quantity - right.source.stock_quantity;
      return right.id - left.id;
    });
  const pageCount = Math.max(1, Math.ceil(filteredColors.length / pageSize));
  const visibleColors = filteredColors.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [selectedCatalog, selectedType, sortBy]);
  useEffect(() => { if (page > pageCount) setPage(pageCount); }, [page, pageCount]);
  const edit = (color?: Color) => {
    setEditing(color ?? null); setActionError(null); setSwatch(null);
    setForm(color ? { catalog_id: String(color.catalog_id), name: color.name, code: color.code, sku: color.sku, type: color.type, hex_code: color.hex_code ?? "", price: color.price ?? "", currency: color.currency, stock_quantity: color.stock_quantity, stock_status: color.stock_status, swatch_path: color.swatch_path ?? "", is_active: color.is_active } : { catalog_id: "", name: "", code: "", sku: "", type: "plain", hex_code: "", price: "", currency: "AED", stock_quantity: 0, stock_status: "in_stock", swatch_path: "", is_active: true }); setOpen(true);
  };
  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setSaving(true); setActionError(null);
    const payload = toFormData({ ...form, hex_code: form.hex_code, price: form.price }, "swatch", swatch);
    try { editing ? await api.putForm(`colors/${editing.id}`, payload) : await api.postForm("colors", payload); setOpen(false); await reload(); } catch (requestError) { setActionError(errorMessage(requestError)); } finally { setSaving(false); }
  };
  const remove = async (color: Color) => { if (!window.confirm(`Delete color “${color.name}”?`)) return; try { await api.delete(`colors/${color.id}`); await reload(); } catch (requestError) { setActionError(errorMessage(requestError)); } };

  return (
    <main className="cl-main">
      <div className="cl-heading-row">
        <div>
          <p>Admin　›　<span>Color Management</span></p>
          <h1>Color Management</h1>
        </div>
        <div className="cl-actions">
          <button onClick={() => edit()}>❀　Add New Color</button>
        </div>
      </div>

      <section className="cl-filters">
        <label>
          <span>PARENT CATALOG</span>
          <select value={selectedCatalog} onChange={(event) => setSelectedCatalog(event.target.value)}>
            <option value="">All catalogs</option>
            {catalogData?.data.map((catalog) => <option value={catalog.id} key={catalog.id}>{catalog.name}</option>)}
          </select>
        </label>
        <label>
          <span>COLOR TYPE</span>
          <div>
            <button className={selectedType === "all" ? "active" : ""} onClick={() => setSelectedType("all")}>All</button>
            <button className={selectedType === "plain" ? "active" : ""} onClick={() => setSelectedType("plain")}>Plain</button>
            <button className={selectedType === "pattern" ? "active" : ""} onClick={() => setSelectedType("pattern")}>Pattern</button>
          </div>
        </label>
        <label>
          <span>SORT BY</span>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="recent">Recently Added</option>
            <option value="oldest">Oldest First</option>
            <option value="name-asc">Name A–Z</option>
            <option value="name-desc">Name Z–A</option>
            <option value="stock-high">Stock: High to Low</option>
            <option value="stock-low">Stock: Low to High</option>
          </select>
        </label>
      </section>

      <section className="cl-grid">
        {loading && <p role="status">Loading colors…</p>}
        {(error || actionError) && <p role="alert">{error ?? actionError}</p>}
        {!loading && !error && visibleColors.map(color => <ColorCard color={color} onEdit={edit} onDelete={remove} key={color.sku} />)}
        {!loading && !error && filteredColors.length === 0 && <p>No colors match the selected filters.</p>}
        <button className="cl-add-card" onClick={() => edit()}>
          <i>⊕</i><b>Add New Color</b>
          <span>Upload a high-<br />fidelity fabric<br />swatch to begin</span>
        </button>
      </section>

      <footer className="cl-pagination">
        <p>Showing {visibleColors.length} of {filteredColors.length} matching colors ({data?.meta.total ?? 0} total)</p>
        <div>
          <button disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>‹</button>
          {paginationItems(page, pageCount).map((pageNumber) => typeof pageNumber === "number" ? (
            <button className={page === pageNumber ? "active" : ""} onClick={() => setPage(pageNumber)} key={pageNumber}>{pageNumber}</button>
          ) : <span aria-hidden="true" key={pageNumber}>…</span>)}
          <button disabled={page === pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))}>›</button>
        </div>
      </footer>
      <AdminModal open={open} title={editing ? "Edit Color" : "Create Color"} saving={saving} error={actionError} onClose={() => setOpen(false)} onSubmit={save}>
        <label>CATALOG<select required value={form.catalog_id} onChange={(e) => setForm({ ...form, catalog_id: e.target.value })}><option value="">Select catalog</option>{catalogData?.data.map((catalog) => <option value={catalog.id} key={catalog.id}>{catalog.name}</option>)}</select></label>
        <label>NAME<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label>CODE<input required value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} /></label>
        <label>SKU<input required value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} /></label>
        <label>TYPE<select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option value="plain">Plain</option><option value="pattern">Pattern</option></select></label>
        <label>HEX COLOR<input value={form.hex_code} placeholder="#112233" onChange={(e) => setForm({ ...form, hex_code: e.target.value })} /></label>
        <label>PRICE<input type="number" min="0" step=".01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></label>
        <label>CURRENCY<input maxLength={3} value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value.toUpperCase() })} /></label>
        <label>QUANTITY<input type="number" min="0" value={form.stock_quantity} onChange={(e) => setForm({ ...form, stock_quantity: Number(e.target.value) })} /></label>
        <label>STOCK STATUS<select value={form.stock_status} onChange={(e) => setForm({ ...form, stock_status: e.target.value })}><option value="in_stock">In stock</option><option value="low_stock">Low stock</option><option value="out_of_stock">Out of stock</option><option value="check_stock">Check stock</option></select></label>
        <label className="full">SWATCH IMAGE<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setSwatch(e.target.files?.[0] ?? null)} /><small>{swatch?.name ?? (editing?.swatch_path ? "Keep current swatch" : "JPG, PNG or WebP, max 5 MB")}</small></label>
      </AdminModal>
    </main>
  );
}
