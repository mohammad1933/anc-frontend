import "./CatalogManagement.css";

const stats = [
  ["TOTAL CATALOGS", "124", "+12% vs LY"],
  ["ACTIVE DESIGNS", "89", "Published"],
  ["MISSING SPECS", "14", "Action Req."],
  ["FEATURED ITEMS", "18", "☆"],
];

function CatalogRow({ type }: { type: "velvet" | "missing" | "linen" }) {
  if (type === "missing") {
    return (
      <div className="cm-row missing">
        <div className="cm-no-image">▧</div>
        <div><h3>Unnamed<br />Catalog</h3><p className="red">⚠ Missing<br />Specs</p></div>
        <div className="muted">Unassigned</div><div className="muted">0 Colors</div>
        <div className="muted">● &nbsp;Hidden</div><div><span className="no-pdf">NO PDF</span></div>
        <div><button className="setup">Complete<br />Setup</button></div>
      </div>
    );
  }
  const velvet = type === "velvet";
  return (
    <div className="cm-row">
      <div className={`cm-thumb ${type}`} />
      <div><h3>{velvet ? <>Royal<br />Velvet</> : <>Artisan<br />Linen</>}</h3><p>SKU: {velvet ? "RV-2024-EM" : "AL-LN-112"}</p></div>
      <div><span className="category">{velvet ? "UPHOLSTERY" : "CURTAINS"}</span></div>
      <div className={`cm-swatches ${velvet ? "dark" : "light"}`}><i /><i /><i />{velvet && <em>+12</em>}</div>
      <div className="published"><b>●</b> Published</div>
      <div>{velvet ? <><span className="featured">☆ &nbsp;FEATURED</span><span className="new">NEW</span></> : <div className="cm-toggle"><i /><span>NEW</span></div>}</div>
      <div className="cm-actions">{velvet ? "✎　▣" : "◉　✎"}</div>
    </div>
  );
}

export default function CatalogManagement() {
  return (
    <main className="cm-main">
      <p className="cm-crumb">Admin&nbsp; / &nbsp;Inventory</p>
      <div className="cm-title"><h1>Catalog Management</h1><button><b>＋</b> Add New Catalog</button></div>
      <div className="cm-stats">
        {stats.map(([label, value, note], index) => <article key={label}><h2>{label}</h2><strong className={index === 2 ? "danger" : ""}>{value}</strong><span className={index === 2 ? "alert" : ""}>{note}</span></article>)}
      </div>
      <section className="cm-catalog-panel">
        <div className="cm-filters">
          <button>All Categories　⌄</button><button>Status: All　⌄</button><button>▽　Advanced Filters</button>
          <div>Display: <button className="selected">☷</button><button>▦</button></div>
        </div>
        <div className="cm-table">
          <div className="cm-head"><span>THUMBNAIL</span><span>CATALOG<br />NAME</span><span>CATEGORY</span><span>COLORS</span><span>STATUS</span><span>ATTRIBUTES</span><span>ACTIONS</span></div>
          <CatalogRow type="velvet" /><CatalogRow type="missing" /><CatalogRow type="linen" />
          <div className="cm-pagination"><p>Showing 1 - 10 of <b>124</b> catalogs</p><div><span>‹</span><b>1</b><span>2</span><span>3</span><span>...</span><span>13</span><span>›</span></div></div>
        </div>
      </section>
    </main>
  );
}
