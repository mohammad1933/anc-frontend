import { useState } from "react";
import "./InquiryManagement.css";
import { api, errorMessage } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import type { Inquiry } from "@/types/api";

const statuses = ["new", "in_progress", "responded", "closed"] as const;

export default function InquiryManagement() {
  const { data, loading, error, reload } = useApi(() => api.getAll<Inquiry>("inquiries", { per_page: 100 }), []);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);
  const inquiries = data?.data ?? [];
  const query = search.trim().toLowerCase();
  const filtered = inquiries.filter((inquiry) =>
    (!query || [inquiry.full_name, inquiry.email, inquiry.company_name ?? "", inquiry.subject ?? "", inquiry.message].some((value) => value.toLowerCase().includes(query))) &&
    (!statusFilter || inquiry.status === statusFilter)
  );

  const updateStatus = async (inquiry: Inquiry, status: string) => {
    setActionError(null);
    try {
      await api.put(`inquiries/${inquiry.id}`, { ...inquiry, status });
      await reload();
    } catch (requestError) {
      setActionError(errorMessage(requestError));
    }
  };

  const remove = async (inquiry: Inquiry) => {
    if (!window.confirm(`Delete inquiry from “${inquiry.full_name}”?`)) return;
    try {
      await api.delete(`inquiries/${inquiry.id}`);
      await reload();
    } catch (requestError) {
      setActionError(errorMessage(requestError));
    }
  };

  return <main className="iq-main">
    <header className="iq-heading"><div><h1>Customer Inquiries</h1><p>Review and process messages submitted through the public contact page.</p></div><strong>{data?.meta.total ?? 0} total</strong></header>
    <section className="iq-filters">
      <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, email, company, or message" />
      <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="">All statuses</option>{statuses.map((status) => <option value={status} key={status}>{status.replaceAll("_", " ")}</option>)}</select>
      <button onClick={() => { setSearch(""); setStatusFilter(""); }}>Clear</button>
    </section>
    {(error || actionError) && <p role="alert">{error ?? actionError}</p>}
    {loading && <p role="status">Loading inquiries…</p>}
    <section className="iq-list">
      {filtered.map((inquiry) => <article key={inquiry.id}>
        <header><div><h2>{inquiry.subject ?? "General inquiry"}</h2><p>{inquiry.full_name} · {inquiry.company_name ?? "Individual"} · <a href={`mailto:${inquiry.email}`}>{inquiry.email}</a></p></div><select value={inquiry.status} onChange={(event) => void updateStatus(inquiry, event.target.value)}>{statuses.map((status) => <option value={status} key={status}>{status.replaceAll("_", " ")}</option>)}</select></header>
        <p>{inquiry.message}</p>
        <footer><span>{new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(inquiry.created_at))}</span><div><a href={`mailto:${inquiry.email}?subject=${encodeURIComponent(`Re: ${inquiry.subject ?? "Your inquiry"}`)}`}>Reply by email</a><button onClick={() => void remove(inquiry)}>Delete</button></div></footer>
      </article>)}
      {!loading && !error && filtered.length === 0 && <p>No inquiries match the filters.</p>}
    </section>
  </main>;
}
