import "./RequestManagement.css";

const requests = [
  { id: "2940", date: "Oct 24, 2023", initials: "JD", name: "Jonathan Doe", company: "Global Interiors Ltd.", fabric: "ROYAL VELVET", extra: "+2 others", colors: "3 Colors total", status: "PENDING" },
  { id: "2938", date: "Oct 23, 2023", initials: "AS", name: "Amara Singh", company: "The Milan Studio", fabric: "TUSCAN LINEN", colors: "1 Item total", status: "APPROVED" },
  { id: "2937", date: "Oct 22, 2023", initials: "MK", name: "Marcus Kohler", company: "Bauhaus Collectives", fabric: "SILK JACQUARD", extra: "+5 others", colors: "12 Colors total", status: "REJECTED" },
  { id: "2936", date: "Oct 22, 2023", initials: "LW", name: "Lisa Wong", company: "Wong & Associates", fabric: "CHENILLE GOLD", colors: "2 Colors total", status: "PENDING" },
];

function RequestRow({ request }: { request: typeof requests[number] }) {
  return (
    <div className="rq-row">
      <div><strong>#REQ-<br />{request.id}</strong><small>{request.date}</small></div>
      <div className="rq-customer"><i>{request.initials}</i><p><strong>{request.name}</strong><span>{request.company}</span></p></div>
      <div className="rq-items"><b>{request.fabric}</b>{request.extra && <b>{request.extra}</b>}<span>{request.colors}</span></div>
      <div><span className={`rq-status ${request.status.toLowerCase()}`}>● &nbsp;{request.status}</span></div>
      <div className="rq-row-actions">
        <button title="Email">✉</button><button title="View">◉</button>
        {request.status === "PENDING" ? <><i /><button className="approve">✓</button><button className="reject">×</button></> : <button>⋮</button>}
      </div>
    </div>
  );
}

export default function RequestManagement() {
  return (
    <main className="rq-main">
      <div className="rq-title">
        <div><p>Admin　›　<span>Sample Requests</span></p><h1>Sample Requests</h1><h2>Manage and fulfill inbound customer fabric sample requests.</h2></div>
        <button>⇩　Export to Excel</button>
      </div>

      <section className="rq-filters">
        <label><span>CUSTOMER / COMPANY</span><div>♙　<input placeholder="Search customer" /></div></label>
        <label><span>STATUS</span><button>All Statuses　⌄</button></label>
        <label><span>COUNTRY</span><button>All Countries　⌄</button></label>
        <div><button>Clear</button><button>Apply</button></div>
      </section>

      <section className="rq-table">
        <div className="rq-head"><span>ID / DATE</span><span>CUSTOMER &<br />COMPANY</span><span>REQUESTED<br />ITEMS</span><span>STATUS</span><span>ACTIONS</span></div>
        {requests.map(request => <RequestRow request={request} key={request.id} />)}
        <footer className="rq-pagination"><p>Showing 1 - 4 of <b>128</b> requests</p><div><span>‹</span><b>1</b><span>2</span><span>3</span><span>...</span><span>32</span><span>›</span></div></footer>
      </section>

      <section className="rq-stats">
        <article><h3>↗　WEEKLY GROWTH</h3><strong>+12.5%</strong><span>Inquiries vs Last week</span></article>
        <article><h3>◴　AVG. RESPONSE TIME</h3><strong>4.2h</strong><span>Target: Under 8h</span></article>
        <article><h3>☆　TOP FABRIC REQUESTED</h3><strong>Royal Velvet Onyx</strong></article>
      </section>
    </main>
  );
}
