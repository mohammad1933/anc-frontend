import "./CategoryManagement.css";

const categories = [
  { style: "curtains", name: "Curtain & Sheers", count: "28 Catalogs", description: "Fluid, lightweight fabrics with varying opacity levels for window treatments and spatial division.", dots: 1 },
  { style: "outdoor", name: "Outdoor Performance", count: "15 Catalogs", description: "UV-resistant, water-repellent, and anti-microbial textiles engineered for terrace and poolside environments.", dots: 2 },
  { style: "wall", name: "Wallcoverings", count: "12 Catalogs", description: "Textured and patterned wall textiles including silk, grasscloth, and vinyl-backed architectural solutions.", dots: 0 },
  { style: "office", name: "Contract / Office", count: "31 Catalogs", description: "Acoustic solutions and flame-retardant (FR) textiles designed specifically for corporate and hospitality environments.", dots: 1 },
];

function CategoryCard({ category }: { category: typeof categories[number] }) {
  return (
    <article className="cg-card">
      <div className={`cg-image ${category.style}`} />
      <div className="cg-card-copy">
        <div><h2>{category.name}</h2><span>{category.count}</span></div>
        <p>{category.description}</p>
        <footer><i>{[0, 1, 2].map(dot => <b className={dot < category.dots ? "on" : ""} key={dot} />)}</i><span>EDIT　 HIDE</span></footer>
      </div>
    </article>
  );
}

export default function CategoryManagement() {
  return (
    <main className="cg-main">
      <section className="cg-heading">
        <div>
          <p>Admin　›　<span>Category Management</span></p>
          <h1>Fabric Categories</h1>
          <h2>Define and organize the textile architecture. Categorize by material usage,<br />environment, and specialized properties.</h2>
        </div>
        <button>＋　 ADD NEW<br />　　CATEGORY</button>
      </section>

      <section className="cg-grid">
        <article className="cg-featured">
          <div className="cg-featured-image" />
          <div className="cg-featured-copy">
            <header><span>ACTIVE</span><div>✎　◉</div></header>
            <h2>Upholstery</h2>
            <p>Heavy-duty textiles designed for furniture covering, characterized by high Martindale rub counts and durability.</p>
            <div className="cg-counts"><div><small>CATALOGS</small><b>42</b></div><div><small>SKUS</small><b>812</b></div></div>
            <footer><span>VELVET</span><span>LINEN BLEND</span><span>LEATHER</span></footer>
          </div>
        </article>
        {categories.map(category => <CategoryCard category={category} key={category.name} />)}
      </section>

      <section className="cg-archive">
        <div className="cg-archive-title"><h2>Archive & Pending</h2><div><button>≡　Filter by Property</button><button>≡　Sort: Most Catalogs</button></div></div>
        <div className="cg-table">
          <div className="cg-table-head"><span>CATEGORY NAME</span><span>PARENT CATEGORY</span><span>INVENTORY</span><span>STATUS</span><span>ACTIONS</span></div>
          <div className="cg-table-row">
            <div><i>◒</i><p><b>Eco-Textiles</b><small>Recycled polyesters and organic cottons</small></p></div><span>General Fabrics</span><span><b>08</b> Catalogs</span><em>DRAFT</em><span className="actions">REVIEW　 DELETE</span>
          </div>
          <div className="cg-table-row">
            <div><i>♢</i><p><b>Signature Silk</b><small>Hand-woven luxury mulberry silks</small></p></div><span>Upholstery / Wall</span><span><b>03</b> Catalogs</span><em className="hidden">HIDDEN</em><span className="actions">PUBLISH　 DELETE</span>
          </div>
        </div>
      </section>
    </main>
  );
}
