import "./Dashboard.css";

const colors = [
  ["#303333", "Midnight Velvet", "32%"],
  ["#c69215", "Royal Gold", "24%"],
  ["#dddddd", "Pearl Silk", "18%"],
  ["#553b2b", "Rustic Walnut", "15%"],
];

function MetricCards() {
  return (
    <div className="db-metrics">
      <article>
        <div className="db-metric-top"><i>↗</i><span className="gold">+12.4% ↑</span></div>
        <h3>TOTAL VISITORS</h3><strong>42,851</strong>
        <div className="db-bars">{[24,37,31,49,42,59].map((height, index) => <span key={index} style={{ height, background: index === 5 ? "#916800" : "#e5dfcf" }} />)}</div>
      </article>
      <article>
        <div className="db-metric-top"><i>♙</i><span className="tag">8 NEW</span></div>
        <h3>SAMPLE<br />REQUESTS</h3><strong>156</strong><p>Active pending requests</p>
      </article>
      <article>
        <div className="db-metric-top"><i>◉</i><span>Today</span></div>
        <h3>CATALOG VIEWS</h3><strong>12.2k</strong><p>1,204 views per average</p>
      </article>
      <article>
        <div className="db-metric-top"><i className="customer">♙</i></div>
        <h3>TOTAL<br />CUSTOMERS</h3><strong>2,840</strong><p>+42 from last week</p>
      </article>
    </div>
  );
}

function TrendingColors() {
  return (
    <article className="db-trending">
      <div className="db-panel-title"><h2>Trending Colors</h2><button>View All</button></div>
      {colors.map(([color, label, value]) => (
        <div className="db-color" key={label}>
          <span style={{ background: color }} />
          <div><p><b>{label}</b><em>{value}</em></p><i><u style={{ width: value }} /></i></div>
        </div>
      ))}
    </article>
  );
}

function Collections() {
  return (
    <article className="db-collections">
      <div className="db-panel-title"><h2>Top Performing Collections</h2><button className="db-period">This Month⌄</button></div>
      <div className="db-collection-grid">
        <div className="db-collection royal">
          <div><small>COLLECTION</small><h3>Royal Velvet 2024</h3><p>◉ &nbsp; 4.2k views</p></div>
        </div>
        <div className="db-collection linens">
          <div><small>COLLECTION</small><h3>Modern Linens</h3><p>◉ &nbsp; 3.8k views</p></div>
        </div>
      </div>
    </article>
  );
}

export default function Dashboard() {
  return (
    <main className="db-main">
      <div className="db-overview"><h1>System Overview</h1><p>Monitoring operations and textile archive performance.</p></div>
      <MetricCards />
      <div className="db-middle"><TrendingColors /><Collections /></div>
      <div className="db-bottom">
        <article><div className="db-panel-title"><h2>Recent Sample Requests</h2><b>⋮</b></div><div className="db-placeholder" /></article>
        <article><div className="db-panel-title"><h2>Latest Inquiries</h2><span>✉</span></div><div className="db-placeholder" /></article>
      </div>
    </main>
  );
}
