import { useState } from "react";
import "./RequestManagement.css";
import { api, errorMessage, type ApiResource } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import type { SampleRequest } from "@/types/api";

interface RequestRowData {
  databaseId: number; id: string; date: string; initials: string; name: string; company: string;
  email: string; country: string; fabric: string; extra?: string; colors: string; status: string;
}

function RequestRow({ request, onStatus }: { request: RequestRowData; onStatus: (id: number, status: "approved" | "rejected" | "fulfilled") => Promise<void> }) {
  return (
    <div className="rq-row">
      <div><strong>#REQ-<br />{request.id}</strong><small>{request.date}</small></div>
      <div className="rq-customer"><i>{request.initials}</i><p><strong>{request.name}</strong><span>{request.company}</span></p></div>
      <div className="rq-items"><b>{request.fabric}</b>{request.extra && <b>{request.extra}</b>}<span>{request.colors}</span></div>
      <div><span className={`rq-status ${request.status.toLowerCase()}`}>● &nbsp;{request.status}</span></div>
      <div className="rq-row-actions">
        <a title={`Email ${request.name}`} href={`mailto:${request.email}`}>✉</a>
        {request.status === "PENDING" && <><i /><button aria-label={`Approve ${request.id}`} onClick={() => void onStatus(request.databaseId, "approved")} className="approve">✓</button><button aria-label={`Reject ${request.id}`} onClick={() => void onStatus(request.databaseId, "rejected")} className="reject">×</button></>}
        {request.status === "APPROVED" && <button onClick={() => void onStatus(request.databaseId, "fulfilled")}>Mark fulfilled</button>}
      </div>
    </div>
  );
}

export default function RequestManagement() {
  const { data, loading, error, reload } = useApi(
    () => api.getAll<SampleRequest>("sample-requests", { per_page: 100 }),
    [],
  );
  const [actionError, setActionError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [country, setCountry] = useState("");
  const updateStatus = async (id: number, status: "approved" | "rejected" | "fulfilled") => {
    setActionError(null);
    try {
      await api.patch<ApiResource<SampleRequest>>(`sample-requests/${id}/status`, { status });
      await reload();
    } catch (requestError) {
      setActionError(errorMessage(requestError));
    }
  };
  const requestsFromApi: RequestRowData[] = (data?.data ?? []).map((request) => ({
    databaseId: request.id,
    id: request.reference.replace(/^REQ-/, ""),
    date: new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(request.created_at)),
    initials: request.full_name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase(),
    name: request.full_name,
    company: request.company_name ?? "Individual customer",
    email: request.email,
    country: request.country,
    fabric: request.items[0]?.sample_name ?? "No sample",
    extra: request.items.length > 1 ? `+${request.items.length - 1} others` : undefined,
    colors: `${request.items.length} ${request.items.length === 1 ? "Item" : "Items"} total`,
    status: request.status.toUpperCase(),
  }));
  const countries = [...new Set(requestsFromApi.map((request) => request.country))].sort();
  const filteredRequests = requestsFromApi.filter((request) => {
    const query = search.trim().toLowerCase();
    return (!query || [request.id, request.name, request.company, request.email].some((value) => value.toLowerCase().includes(query))) &&
      (!status || request.status.toLowerCase() === status) &&
      (!country || request.country === country);
  });
  const exportCsv = () => {
    const rows = [["Reference", "Customer", "Company", "Email", "Country", "Items", "Status"], ...filteredRequests.map((request) => [request.id, request.name, request.company, request.email, request.country, request.colors, request.status])];
    const csv = rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(",")).join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    link.download = "sample-requests.csv"; link.click(); URL.revokeObjectURL(link.href);
  };

  return (
    <main className="rq-main">
      <div className="rq-title">
        <div><p>Admin　›　<span>Sample Requests</span></p><h1>Sample Requests</h1><h2>Manage and fulfill inbound customer fabric sample requests.</h2></div>
        <button onClick={exportCsv} disabled={filteredRequests.length === 0}>⇩　Export CSV</button>
      </div>

      <section className="rq-filters">
        <label><span>CUSTOMER / COMPANY</span><div>♙　<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search customer" /></div></label>
        <label><span>STATUS</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="">All statuses</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option><option value="fulfilled">Fulfilled</option></select></label>
        <label><span>COUNTRY</span><select value={country} onChange={(event) => setCountry(event.target.value)}><option value="">All countries</option>{countries.map((item) => <option key={item}>{item}</option>)}</select></label>
        <div><button onClick={() => { setSearch(""); setStatus(""); setCountry(""); }}>Clear</button></div>
      </section>

      <section className="rq-table">
        <div className="rq-head"><span>ID / DATE</span><span>CUSTOMER &<br />COMPANY</span><span>REQUESTED<br />ITEMS</span><span>STATUS</span><span>ACTIONS</span></div>
        {loading && <p role="status">Loading sample requests…</p>}
        {(error || actionError) && <p role="alert">{error ?? actionError}</p>}
        {!loading && !error && filteredRequests.map(request => <RequestRow request={request} onStatus={updateStatus} key={request.databaseId} />)}
        {!loading && !error && filteredRequests.length === 0 && <p>No sample requests match the filters.</p>}
        <footer className="rq-pagination"><p>Showing <b>{filteredRequests.length}</b> of <b>{data?.meta.total ?? 0}</b> requests</p></footer>
      </section>

      <section className="rq-stats">
        <article><h3>PENDING</h3><strong>{requestsFromApi.filter((request) => request.status === "PENDING").length}</strong><span>Awaiting review</span></article>
        <article><h3>APPROVED</h3><strong>{requestsFromApi.filter((request) => request.status === "APPROVED").length}</strong><span>Ready to fulfill</span></article>
        <article><h3>FULFILLED</h3><strong>{requestsFromApi.filter((request) => request.status === "FULFILLED").length}</strong><span>Completed requests</span></article>
      </section>
    </main>
  );
}
