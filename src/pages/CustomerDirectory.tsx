import "./CustomerDirectory.css";

const customers = [
  { initial: "V", company: "Velvet & Vine Interiors", location: "Paris, FR", person: "Elodie Moreau", email: "elodie@velvetvine.fr", industry: "INTERIOR DESIGNER", requests: "142", tier: "Signature Tier", date: "Oct 12, 2023", status: "Active" },
  { initial: "M", company: "Modern Loom Mfg.", location: "Milan, IT", person: "Marco Rossi", email: "m.rossi@modernloom.it", industry: "MANUFACTURER", requests: "89", tier: "Standard Tier", date: "Nov 04, 2023", status: "Active" },
  { initial: "S", company: "Silk Road Retailers", location: "Istanbul, TR", person: "Ayşe Yilmaz", email: "ayse@silkroad.com", industry: "RETAILER", requests: "214", tier: "Elite Partner", date: "Jan 18, 2024", status: "Pending" },
  { initial: "A", company: "Atelier 42", location: "New York, US", person: "Jameson Cole", email: "j.cole@atelier42.nyc", industry: "INTERIOR DESIGNER", requests: "56", tier: "Standard Tier", date: "Feb 02, 2024", status: "Active" },
];

function CustomerRow({ customer }: { customer: typeof customers[number] }) {
  return (
    <div className="cu-row">
      <div className="cu-company"><i>{customer.initial}</i><p><b>{customer.company}</b><small>{customer.location}</small></p></div>
      <div><b>{customer.person}</b><small>{customer.email}</small></div>
      <div><span className="cu-industry">{customer.industry}</span></div>
      <div><b>{customer.requests}</b><small className="gold">{customer.tier}</small></div>
      <div className="cu-date">{customer.date}</div>
      <div className={`cu-status ${customer.status.toLowerCase()}`}>● &nbsp;{customer.status}</div>
    </div>
  );
}

export default function CustomerDirectory() {
  return (
    <main className="cu-main">
      <section className="cu-heading">
        <div><h1>Customer Directory</h1><p>Manage and monitor your B2B textile partnerships across the globe.</p></div>
        <div><button>Export CSV</button><button>♧　Add Customer</button></div>
      </section>

      <section className="cu-stats">
        <article><span>TOTAL B2B CLIENTS</span><strong>1,248</strong><em>+12%</em></article>
        <article><span>ACTIVE MANUFACTURERS</span><strong>342</strong><em>♜</em></article>
        <article><span>INTERIOR DESIGNERS</span><strong>716</strong><em>♙</em></article>
        <article><span>RETAIL PARTNERS</span><strong>190</strong><em>▤</em></article>
      </section>

      <section className="cu-directory">
        <header className="cu-filters">
          <label>INDUSTRY:　 <button>All Types　⌄</button></label>
          <label>STATUS:　 <button>Active　⌄</button></label>
          <div>Showing　<b>1-10</b>　of 1,248　　‹　›</div>
        </header>
        <div className="cu-table-head"><span>COMPANY NAME</span><span>CONTACT PERSON</span><span>INDUSTRY</span><span>TOTAL<br />REQUESTS</span><span>REG.<br />DATE</span><span>STATUS</span></div>
        {customers.map(customer => <CustomerRow customer={customer} key={customer.company} />)}
        <footer className="cu-pagination"><button>←</button><button className="active">1</button><span>2</span><span>3</span><span>...</span><span>125</span><button>→</button></footer>
      </section>

      <section className="cu-insights">
        <div className="cu-spotlight"><div><span>PARTNER SPOTLIGHT</span><h2>Velvet &amp; Vine Interiors</h2><p>Design Excellence Award Winner · 2024</p></div></div>
        <div className="cu-side-insights">
          <article className="cu-growth"><h2>Client Growth Metrics</h2><p>Historical request analysis shows a 45% increase in high-end silk orders from our top 5% partners this quarter.</p></article>
          <article className="cu-activity">
            <header>RECENT ACTIVITY <b>⌁</b></header>
            <p><i />New contract signed with <b>Luxe Spaces UK</b><small>2 hours ago</small></p>
            <p><i />Catalog update requested by <b>Milan Fabrics Ltd.</b><small>5 hours ago</small></p>
            <p><i />5 new manufacturers pending verification<small>Yesterday</small></p>
            <button>Full Audit Log</button>
          </article>
        </div>
      </section>
    </main>
  );
}
