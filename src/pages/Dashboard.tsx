import "./Dashboard.css";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import type { DashboardData } from "@/types/api";

function MetricCards({ dashboard }: { dashboard: DashboardData }) {
  return (
    <div className="db-metrics">
      <article>
        <div className="db-metric-top"><i>✉</i><span className="tag">{dashboard.inquiries.new} NEW</span></div>
        <h3>TOTAL<br />INQUIRIES</h3><strong>{dashboard.inquiries.total}</strong><p>Customer contact submissions</p>
      </article>
      <article>
        <div className="db-metric-top"><i>♙</i><span className="tag">8 NEW</span></div>
        <h3>SAMPLE<br />REQUESTS</h3><strong>{dashboard.sample_requests.total}</strong><p>{dashboard.sample_requests.pending} active pending requests</p>
      </article>
      <article>
        <div className="db-metric-top"><i>◉</i><span>Today</span></div>
        <h3>PUBLISHED<br />CATALOGS</h3><strong>{dashboard.catalogs.published}</strong><p>{dashboard.catalogs.total} catalogs total</p>
      </article>
      <article>
        <div className="db-metric-top"><i className="customer">♙</i></div>
        <h3>TOTAL<br />CUSTOMERS</h3><strong>{dashboard.customers.total}</strong><p>{dashboard.customers.active} active customers</p>
      </article>
    </div>
  );
}

function TrendingColors({ dashboard }: { dashboard: DashboardData }) {
  return (
    <article className="db-trending">
      <div className="db-panel-title"><h2>Most Viewed Colors</h2><Link to="/dashboard/colors">View All</Link></div>
      {dashboard.trending_colors.map((color) => (
        <div className="db-color" key={color.id}>
          <span style={{ background: color.hex_code ?? "#8d887f" }} />
          <div><p><b>{color.name}</b><em>{color.view_count ?? 0} views</em></p><small>{color.catalog?.name ?? "Unassigned catalog"}</small></div>
        </div>
      ))}
      {dashboard.trending_colors.length === 0 && <p>No color activity yet.</p>}
    </article>
  );
}

function Collections({ dashboard }: { dashboard: DashboardData }) {
  return (
    <article className="db-collections">
      <div className="db-panel-title"><h2>Top Performing Collections</h2><Link to="/dashboard/catalogs">Manage</Link></div>
      <div className="db-live-list">
        {dashboard.top_catalogs.map((catalog) => <Link to={`/catalogs/${catalog.id}/colors`} key={catalog.id}><b>{catalog.name}</b><span>{catalog.view_count ?? 0} views · {catalog.colors_count ?? 0} colors</span></Link>)}
        {dashboard.top_catalogs.length === 0 && <p>No catalog activity yet.</p>}
      </div>
    </article>
  );
}

export default function Dashboard() {
  const { data: dashboard, loading, error } = useApi(() => api.get<DashboardData>("dashboard"), []);

  if (loading) return <main className="db-main"><p role="status">Loading dashboard…</p></main>;
  if (error || !dashboard) return <main className="db-main"><p role="alert">{error ?? "Dashboard data is unavailable."}</p></main>;

  return (
    <main className="db-main">
      <div className="db-overview"><h1>System Overview</h1><p>Monitoring operations and textile archive performance.</p></div>
      <MetricCards dashboard={dashboard} />
      <div className="db-middle"><TrendingColors dashboard={dashboard} /><Collections dashboard={dashboard} /></div>
      <div className="db-bottom">
        <article><div className="db-panel-title"><h2>Recent Sample Requests</h2><Link to="/dashboard/requests">Manage</Link></div><div className="db-live-list">{dashboard.sample_requests.recent.map((request) => <Link to="/dashboard/requests" key={request.id}><b>{request.reference} · {request.full_name}</b><span>{request.status} · {request.items.length} items</span></Link>)}{dashboard.sample_requests.recent.length === 0 && <p>No sample requests yet.</p>}</div></article>
        <article><div className="db-panel-title"><h2>Latest Inquiries</h2><Link to="/dashboard/inquiries">Manage</Link></div><div className="db-live-list">{dashboard.inquiries.recent.map((inquiry) => <Link to="/dashboard/inquiries" key={inquiry.id}><b>{inquiry.full_name}</b><span>{inquiry.subject ?? "General inquiry"} · {inquiry.status}</span></Link>)}{dashboard.inquiries.recent.length === 0 && <p>No inquiries yet.</p>}</div></article>
      </div>
    </main>
  );
}
