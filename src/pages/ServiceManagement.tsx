import "./ServiceManagement.css";

const services = [
  {
    type: "CORE SERVICE", image: "supply", title: "Premium Fabric Supply", state: "VISIBLE",
    description: "Direct access to our international mills and exclusive seasonal collections. This service covers wholesale distribution for interior designers, architects, and private estates globally.",
    tags: ["B2B Wholesale", "Global Logistics", "Exclusive Rights"], volume: "820 / Month", updated: "Alex M. · 2d ago", preview: "View Public Page",
  },
  {
    type: "SIGNATURE SERVICE", image: "consultation", title: "Bespoke Interior Consultation", state: "VISIBLE",
    description: "Comprehensive design advisory services led by our award-winning senior designers. We help curate atmospheres through materiality, lighting, and custom spatial planning for residential and commercial projects.",
    tags: ["Design Strategy", "Material Sourcing", "On-Site Advisory"], volume: "312 / Month", updated: "Sarah K. · 5h ago", preview: "View Public Page",
  },
  {
    type: "CUSTOM SERVICE", image: "craft", title: "Custom Weave & Dye Orders", state: "DRAFT",
    description: "Unique textile development for exclusive branding. We offer custom yarn dyeing, specific weave construction, and proprietary pattern development for projects that require a one-of-a-kind tactile identity.",
    tags: ["Proprietary Weaves", "Dye Matching", "Heritage Crafts"], volume: "45 / Month", updated: "Jordan L. · 1w ago", preview: "Preview Draft",
  },
];

function ServiceCard({ service }: { service: typeof services[number] }) {
  return (
    <article className="sv-card">
      <div className={`sv-image ${service.image}`}><span>{service.type}</span></div>
      <div className="sv-card-body">
        <header><h2>{service.title}</h2><div><i className={service.state === "DRAFT" ? "off" : ""}><b /></i><span>{service.state}</span><em>⋮</em></div></header>
        <p>{service.description}</p>
        <div className="sv-tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <footer>
          <div><small>INQUIRY<br />VOLUME</small><b>{service.volume}</b></div>
          <div><small>UPDATED BY</small><b>{service.updated}</b></div>
          <button>{service.preview}</button><button>✎　 Edit<br />　　Details</button>
        </footer>
      </div>
    </article>
  );
}

export default function ServiceManagement() {
  return (
    <main className="sv-main">
      <section className="sv-heading">
        <div><span>SERVICE INVENTORY</span><h1>Company Services</h1><p>Manage your luxury textile offerings and consultation tiers. Configure<br />visibility, details, and call-to-action behaviors for client-facing catalogs.</p></div>
        <button>＋　 Create New<br />　　 Service</button>
      </section>

      <section className="sv-stats">
        <article><span>ACTIVE SERVICES</span><strong>12</strong><em>Live</em></article>
        <article><span>CONSULTATION<br />ENQUIRIES</span><strong>148</strong><em>+12%</em></article>
        <article><span>DRAFT<br />CATALOGUES</span><strong>04</strong><em>Pending</em></article>
        <article><span>AVG. RESPONSE<br />TIME</span><strong>2.4h</strong><em>Target<br />met</em></article>
      </section>

      <section className="sv-list">{services.map(service => <ServiceCard service={service} key={service.title} />)}</section>

      <footer className="sv-pagination">
        <p>Showing 3 of 12 luxury services</p>
        <div><button>‹</button><button className="active">1</button><span>2</span><span>3</span><button>›</button></div>
      </footer>
    </main>
  );
}
