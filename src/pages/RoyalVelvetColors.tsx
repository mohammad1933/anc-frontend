import { Link, useNavigate } from "react-router-dom";
import { img as textileImages } from "@/pages/AboutUs";
import "./RoyalVelvetColors.css";
import { businessPolicies, whatsappUrl } from "@/constants/company";

function fabricTexture(base: string, highlight: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><defs><filter id="n"><feTurbulence baseFrequency=".055" numOctaves="4" seed="8"/><feComposite in="SourceGraphic" operator="in"/><feBlend mode="soft-light" in2="SourceGraphic"/></filter><linearGradient id="g" x2="1" y2="1"><stop stop-color="${highlight}"/><stop offset=".52" stop-color="${base}"/><stop offset="1" stop-color="${highlight}"/></linearGradient></defs><rect width="512" height="512" fill="url(#g)"/><rect width="512" height="512" fill="${base}" opacity=".48" filter="url(#n)"/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const swatches = [
  { id: "8020-01", style: "midnight", stock: "AVAILABLE", name: "8020-01", texture: fabricTexture("#0b1730", "#263e67") },
  { id: "8020-02", style: "sienna", stock: "CHECK STOCK", name: "8020-02", texture: fabricTexture("#9e4930", "#cb7956") },
  { id: "8020-03", style: "emerald", stock: "AVAILABLE", name: "8020-03", texture: fabricTexture("#123d2b", "#357357") },
  { id: "8020-04", style: "champagne", stock: "AVAILABLE", name: "8020-04", texture: fabricTexture("#b58435", "#f2d18b") },
  { id: "8020-05", style: "slate", stock: "AVAILABLE", name: "8020-05", texture: fabricTexture("#657278", "#9ba5a8") },
  { id: "8020-06", style: "rose", stock: "AVAILABLE", name: "8020-06", texture: fabricTexture("#c58c98", "#edcbd0") },
];

function SwatchCard({ swatch }: { swatch: typeof swatches[number] }) {
  const navigate = useNavigate();
  const openMockup = () => navigate("/mockup", {
    state: {
      selectedFabric: {
        id: swatch.id,
        name: swatch.name,
        fileName: `${swatch.id}.svg`,
        fileSize: swatch.texture.length,
        mimeType: "image/svg+xml",
        objectUrl: swatch.texture,
        thumbnail: swatch.texture,
        width: 512,
        height: 512,
        createdAt: Date.now(),
      },
    },
  });

  return (
    <article className="rv-card" role="link" tabIndex={0} onClick={openMockup} onKeyDown={(event) => { if (event.key === "Enter") openMockup(); }}>
      <div className={`rv-swatch ${swatch.style}`} style={{ backgroundImage: `url("${swatch.texture}")` }}><span>{swatch.stock}</span></div>
      <div className="rv-card-copy">
        <div><h2>{swatch.name}</h2><strong>PRICE ON REQUEST</strong></div>
        <p>Velvet 8020 · ANC Brand</p>
        <footer>
          <a href={whatsappUrl(`Hello ANC Najjar Furniture Fabrics, please provide the price for Velvet 8020 color ${swatch.name}.`)} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>▧　Request<br />　　Price</a>
          <button type="button" onClick={(event) => { event.stopPropagation(); openMockup(); }}>▣　Preview Sofa</button>
        </footer>
      </div>
    </article>
  );
}

export default function RoyalVelvetColors() {
  return (
    <div className="rv-page">
      <main>
        <div className="rv-breadcrumb">Catalogs　›　Velvet 8020　›　<b>Colors</b></div>
        <section className="rv-heading">
          <h1>Velvet 8020 Colors</h1>
          <p>Explore the 75 available color codes in ANC Velvet 8020. Visit our Sharjah shop to experience the fabric<br />in person, request up to three free A4 samples, or contact our team for current stock and pricing.</p>
        </section>

        <section className="rv-toolbar">
          <div><span>FILTER:</span><button className="active">All</button><button>Plain</button><button>Pattern</button></div>
          <div><span>SORT BY:</span><button>Latest Arrival　⌄</button></div>
        </section>

        <section className="rv-grid">{swatches.map(swatch => <SwatchCard swatch={swatch} key={swatch.name} />)}</section>
      </main>

      <section className="rv-consultation">
        <div className="rv-consultation-copy">
          <h2>Expert Consultation</h2>
          <p>Our team speaks Arabic, English, and Hindi and can help<br />you compare colors, check current stock, arrange samples,<br />and prepare wholesale or retail quotations.</p>
          <div><span>♢　<b>Free A4 Samples</b><small>{businessPolicies.samples}</small></span><span>▱　<b>Same-Day UAE Delivery</b><small>{businessPolicies.sameDay}</small></span></div>
        </div>
        <figure style={{ backgroundImage: `linear-gradient(#0001,#0001),url(${textileImages.shop})` }}><Link to="/contact">Schedule a Visit</Link></figure>
      </section>
    </div>
  );
}
