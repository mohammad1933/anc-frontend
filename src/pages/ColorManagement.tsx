import "./ColorManagement.css";

const colors = [
  { tone: "midnight", type: "PLAIN", name: "Deep Midnight Blue", sku: "ANC-RV-102", price: "$124.00", stock: "In Stock", level: "normal" },
  { tone: "champagne", type: "PATTERN", name: "Champagne Gold", sku: "ANC-RV-105", price: "$158.00", stock: "Low Stock", level: "low" },
  { tone: "moss", type: "PLAIN", name: "Forest Moss", sku: "ANC-RV-112", price: "$115.00", stock: "In Stock", level: "normal" },
  { tone: "birch", type: "PATTERN", name: "Silver Birch", sku: "ANC-RV-118", price: "$142.00", stock: "Out of Stock", level: "out" },
];

function ColorCard({ color }: { color: typeof colors[number] }) {
  return (
    <article className="cl-card">
      <div className={`cl-swatch ${color.tone}`}>
        <span>{color.type}</span>
        {color.level === "out" && <b>OUT OF STOCK</b>}
      </div>
      <div className="cl-card-info">
        <div className="cl-name"><h2>{color.name}</h2><strong>{color.price}</strong></div>
        <p>{color.sku}</p>
      </div>
      <div className={`cl-stock ${color.level}`}>
        <i>●</i><span>{color.stock}</span><span>Stock<br />Toggle</span><button aria-label={`Toggle ${color.name}`}><i /></button>
      </div>
    </article>
  );
}

export default function ColorManagement() {
  return (
    <main className="cl-main">
      <div className="cl-heading-row">
        <div>
          <p>Admin　›　<span>Color Management</span></p>
          <h1>Color Management</h1>
        </div>
        <div className="cl-actions">
          <button>↥　Bulk Upload Images</button>
          <button>❀　Add New Color</button>
        </div>
      </div>

      <section className="cl-filters">
        <label>
          <span>PARENT CATALOG</span>
          <button>Select Catalog: Royal Velvet <b>⌄</b></button>
        </label>
        <label>
          <span>AVAILABILITY</span>
          <div><button className="active">All</button><button>Plain</button><button>Pattern</button></div>
        </label>
        <label>
          <span>SORT BY</span>
          <button>Recently Added　≡</button>
        </label>
      </section>

      <section className="cl-grid">
        {colors.map(color => <ColorCard color={color} key={color.sku} />)}
        <button className="cl-add-card">
          <i>⊕</i><b>Add New Color</b>
          <span>Upload a high-<br />fidelity fabric<br />swatch to begin</span>
        </button>
      </section>

      <footer className="cl-pagination">
        <p>Showing 24 of 142 colors in Royal Velvet</p>
        <div><button>‹</button><button className="active">1</button><button>2</button><button>3</button><span>...</span><button>6</button><button>›</button></div>
      </footer>
    </main>
  );
}
