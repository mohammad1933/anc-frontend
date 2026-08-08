import { Link } from "react-router-dom";
import { img as textileImages } from "@/pages/AboutUs";
import { api } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import type { Catalog } from "@/types/api";
import "./Discounts.css";

const money = (amount: string | undefined, currency: string) =>
  amount ? new Intl.NumberFormat("en-AE", { style: "currency", currency }).format(Number(amount)) : "";

export default function Discounts() {
  const { data, loading, error } = useApi(
    () => api.getAll<Catalog>("catalogs", { status: "published", discounted: true, per_page: 100 }),
    [],
  );
  const catalogs = data?.data ?? [];

  return <main className="discounts-page">
    <section className="discounts-hero">
      <span>LIMITED-TIME OFFERS</span>
      <h1>Selected textiles, exceptional value.</h1>
      <p>Explore special pricing across our premium collections. Each offer is applied automatically while available.</p>
    </section>
    <section className="discounts-content">
      <header><div><span>THE SALE EDIT</span><h2>Current Discounts</h2></div><p>{catalogs.length} {catalogs.length === 1 ? "collection" : "collections"}</p></header>
      {loading && <p role="status" className="discounts-message">Loading offers…</p>}
      {error && <p role="alert" className="discounts-message">{error}</p>}
      {!loading && !error && catalogs.length === 0 && <div className="discounts-empty"><h2>New offers are coming soon.</h2><p>Browse our complete textile collection in the meantime.</p><Link to="/catalogs">VIEW ALL CATALOGS</Link></div>}
      <div className="discounts-grid">
        {catalogs.map((catalog) => <Link className="discount-card" to={`/catalogs/${catalog.id}/colors`} key={catalog.id}>
          <div className="discount-card-image"><img src={catalog.thumbnail_path ?? textileImages.velvet} alt={catalog.name} /><b>−{catalog.discount_percent}%</b></div>
          <div className="discount-card-body"><small>{catalog.category?.name ?? catalog.material ?? "ANC COLLECTION"}</small><h3>{catalog.name}</h3><p>{catalog.description}</p>
            <div className="discount-price"><del>{money(catalog.price, catalog.currency)}</del><strong>{money(catalog.sale_price, catalog.currency)}</strong></div>
            <span>EXPLORE COLLECTION <i>→</i></span>
          </div>
        </Link>)}
      </div>
    </section>
  </main>;
}
