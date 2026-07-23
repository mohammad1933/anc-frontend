import { type FormEvent, useEffect, useState } from "react";
import "./CustomerDirectory.css";
import AdminModal from "@/components/admin/AdminModal";
import { api, errorMessage } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import type { Customer } from "@/types/api";
import { paginationItems } from "@/utils/pagination";

interface CustomerRowData {
  source: Customer;
  initial: string; company: string; location: string; person: string; email: string;
  industry: string; requests: string; tier: string; date: string; status: string;
}

function CustomerRow({ customer, onEdit, onDelete }: { customer: CustomerRowData; onEdit: (customer: Customer) => void; onDelete: (customer: Customer) => Promise<void> }) {
  return (
    <div className="cu-row">
      <div className="cu-company"><i>{customer.initial}</i><p><b>{customer.company}</b><small>{customer.location}</small></p></div>
      <div><b>{customer.person}</b><small>{customer.email}</small></div>
      <div><span className="cu-industry">{customer.industry}</span></div>
      <div><b>{customer.requests}</b><small className="gold">{customer.tier}</small></div>
      <div className="cu-date">{customer.date}</div>
      <div className={`cu-status ${customer.status.toLowerCase()}`}>● &nbsp;{customer.status}</div>
      <div className="admin-inline-actions"><button onClick={() => onEdit(customer.source)}>Edit</button><button className="admin-danger" onClick={() => void onDelete(customer.source)}>Delete</button></div>
    </div>
  );
}

export default function CustomerDirectory() {
  const { data, loading, error, reload } = useApi(
    () => api.getAll<Customer>("customers", { per_page: 100 }),
    [],
  );
  const [editing, setEditing] = useState<Customer | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const emptyForm = { company_name: "", contact_name: "", email: "", phone: "", industry: "", country: "", city: "", address: "", tier: "standard", status: "active" };
  const [form, setForm] = useState(emptyForm);
  const [industryFilter, setIndustryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const customersFromApi: CustomerRowData[] = (data?.data ?? []).map((customer) => ({
    source: customer,
    initial: (customer.company_name ?? customer.contact_name).charAt(0).toUpperCase(),
    company: customer.company_name ?? "Individual customer",
    location: [customer.city, customer.country].filter(Boolean).join(", "),
    person: customer.contact_name,
    email: customer.email,
    industry: customer.industry?.toUpperCase() ?? "UNSPECIFIED",
    requests: String(customer.sample_requests_count ?? 0),
    tier: `${customer.tier} Tier`,
    date: new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(customer.created_at)),
    status: customer.status.charAt(0).toUpperCase() + customer.status.slice(1),
  }));
  const edit = (customer?: Customer) => { setEditing(customer ?? null); setForm(customer ? { company_name: customer.company_name ?? "", contact_name: customer.contact_name, email: customer.email, phone: customer.phone ?? "", industry: customer.industry ?? "", country: customer.country ?? "", city: customer.city ?? "", address: "", tier: customer.tier, status: customer.status } : emptyForm); setFormError(null); setOpen(true); };
  const save = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSaving(true); setFormError(null); const payload = { ...form, company_name: form.company_name || null, phone: form.phone || null, industry: form.industry || null, country: form.country || null, city: form.city || null, address: form.address || null }; try { editing ? await api.put(`customers/${editing.id}`, payload) : await api.post("customers", payload); setOpen(false); await reload(); } catch (requestError) { setFormError(errorMessage(requestError)); } finally { setSaving(false); } };
  const remove = async (customer: Customer) => { if (!window.confirm(`Delete customer “${customer.contact_name}”? Their requests will remain but become unassigned.`)) return; try { await api.delete(`customers/${customer.id}`); await reload(); } catch (requestError) { window.alert(errorMessage(requestError)); } };
  const exportCsv = () => {
    const rows = [["Company", "Contact", "Email", "Industry", "Country", "Status"], ...filteredCustomers.map((customer) => [customer.company, customer.person, customer.email, customer.industry, customer.location, customer.status])];
    const csv = rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(",")).join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    link.download = "customers.csv"; link.click(); URL.revokeObjectURL(link.href);
  };
  const industries = [...new Set(customersFromApi.map((customer) => customer.industry))].sort();
  const filteredCustomers = customersFromApi.filter((customer) =>
    (!industryFilter || customer.industry === industryFilter) &&
    (!statusFilter || customer.status.toLowerCase() === statusFilter)
  );
  const pageCount = Math.max(1, Math.ceil(filteredCustomers.length / pageSize));
  const visibleCustomers = filteredCustomers.slice((page - 1) * pageSize, page * pageSize);
  useEffect(() => { setPage(1); }, [industryFilter, statusFilter]);
  useEffect(() => { if (page > pageCount) setPage(pageCount); }, [page, pageCount]);

  return (
    <main className="cu-main">
      <section className="cu-heading">
        <div><h1>Customer Directory</h1><p>Manage and monitor your B2B textile partnerships across the globe.</p></div>
        <div><button onClick={exportCsv} disabled={filteredCustomers.length === 0}>Export CSV</button><button onClick={() => edit()}>♧　Add Customer</button></div>
      </section>

      <section className="cu-stats">
        <article><span>TOTAL CUSTOMERS</span><strong>{data?.meta.total ?? 0}</strong><em>All</em></article>
        <article><span>ACTIVE CUSTOMERS</span><strong>{customersFromApi.filter((customer) => customer.status === "Active").length}</strong><em>●</em></article>
        <article><span>PENDING CUSTOMERS</span><strong>{customersFromApi.filter((customer) => customer.status === "Pending").length}</strong><em>◷</em></article>
        <article><span>INDUSTRIES</span><strong>{industries.length}</strong><em>Types</em></article>
      </section>

      <section className="cu-directory">
        <header className="cu-filters">
          <label>INDUSTRY:　 <select value={industryFilter} onChange={(event) => setIndustryFilter(event.target.value)}><option value="">All types</option>{industries.map((industry) => <option key={industry}>{industry}</option>)}</select></label>
          <label>STATUS:　 <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="">All statuses</option><option value="active">Active</option><option value="pending">Pending</option><option value="inactive">Inactive</option></select></label>
          <div>Showing　<b>{visibleCustomers.length}</b>　of {filteredCustomers.length}</div>
        </header>
        <div className="cu-table-head"><span>COMPANY NAME</span><span>CONTACT PERSON</span><span>INDUSTRY</span><span>TOTAL REQUESTS</span><span>REG. DATE</span><span>STATUS / ACTIONS</span></div>
        {loading && <p role="status">Loading customers…</p>}
        {error && <p role="alert">{error}</p>}
        {!loading && !error && visibleCustomers.map(customer => <CustomerRow customer={customer} onEdit={edit} onDelete={remove} key={customer.source.id} />)}
        {!loading && !error && filteredCustomers.length === 0 && <p>No customers match the selected filters.</p>}
        <footer className="cu-pagination"><button disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>←</button>{paginationItems(page,pageCount).map((pageNumber) => typeof pageNumber === "number" ? <button className={page === pageNumber ? "active" : ""} onClick={() => setPage(pageNumber)} key={pageNumber}>{pageNumber}</button> : <span aria-hidden="true" key={pageNumber}>…</span>)}<button disabled={page === pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))}>→</button></footer>
      </section>
      <AdminModal open={open} title={editing ? "Edit Customer" : "Create Customer"} saving={saving} error={formError} onClose={() => setOpen(false)} onSubmit={save}>
        <label>CONTACT NAME<input required value={form.contact_name} onChange={(e) => setForm({ ...form, contact_name: e.target.value })} /></label><label>COMPANY<input value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} /></label>
        <label>EMAIL<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label><label>PHONE<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
        <label>INDUSTRY<input value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} /></label><label>COUNTRY<input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} /></label>
        <label>CITY<input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></label><label>TIER<select value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })}><option value="standard">Standard</option><option value="signature">Signature</option><option value="elite">Elite</option></select></label>
        <label>STATUS<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option value="active">Active</option><option value="pending">Pending</option><option value="inactive">Inactive</option></select></label><label className="full">ADDRESS<textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></label>
      </AdminModal>
    </main>
  );
}
