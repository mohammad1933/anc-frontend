import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { img as textileImages } from "@/pages/AboutUs";
import "./RoyalVelvetColors.css";
import { businessPolicies, whatsappUrl } from "@/constants/company";
import { api, type ApiResource } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import type { Catalog, Color } from "@/types/api";
import { useAuth } from "@/hooks/AuthContext";

function fabricTexture(base: string, highlight: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><defs><filter id="n"><feTurbulence baseFrequency=".055" numOctaves="4" seed="8"/><feComposite in="SourceGraphic" operator="in"/><feBlend mode="soft-light" in2="SourceGraphic"/></filter><linearGradient id="g" x2="1" y2="1"><stop stop-color="${highlight}"/><stop offset=".52" stop-color="${base}"/><stop offset="1" stop-color="${highlight}"/></linearGradient></defs><rect width="512" height="512" fill="url(#g)"/><rect width="512" height="512" fill="${base}" opacity=".48" filter="url(#n)"/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

interface Swatch {
  id: string; numericId: number; style: Color["type"]; stock: string; stockQuantity: number;
  name: string; texture: string;
}

function SwatchCard({ swatch, catalogName, isFavorite, favoritePending, onToggleFavorite }: {
  swatch: Swatch;
  catalogName: string;
  isFavorite: boolean;
  favoritePending: boolean;
  onToggleFavorite: (colorId: number) => void;
}) {
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
        <p>{catalogName} · ANC Brand</p>
        <footer>
          <a href={whatsappUrl(`Hello ANC Najjar Furniture Fabrics, please provide the price for ${catalogName} color ${swatch.name}.`)} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>▧　Request<br />　　Price</a>
          <button className={`rv-favorite${isFavorite ? " active" : ""}`} type="button" disabled={favoritePending} aria-pressed={isFavorite} onClick={(event) => { event.stopPropagation(); onToggleFavorite(swatch.numericId); }}>
            {isFavorite ? "♥ Favorited" : "♡ Favorite"}
          </button>
          <button className="rv-preview" type="button" onClick={(event) => { event.stopPropagation(); openMockup(); }}>▣　Preview Sofa</button>
        </footer>
      </div>
    </article>
  );
}

export default function RoyalVelvetColors() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { catalogId } = useParams();
  const numericCatalogId = catalogId && /^\d+$/.test(catalogId) ? Number(catalogId) : null;
  const [typeFilter, setTypeFilter] = useState<"all" | Color["type"]>("all");
  const [sortBy, setSortBy] = useState("latest");
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());
  const [favoritePendingId, setFavoritePendingId] = useState<number | null>(null);
  const [favoriteError, setFavoriteError] = useState<string | null>(null);
  const { data: catalogResponse, loading: catalogLoading, error: catalogError } = useApi<ApiResource<Catalog> | null>(
    () => numericCatalogId ? api.get<ApiResource<Catalog>>(`catalogs/${numericCatalogId}`) : Promise.resolve(null),
    [numericCatalogId],
  );
  const { data, loading, error } = useApi(
    () => api.getAll<Color>("colors", { catalog_id: numericCatalogId, per_page: 100 }),
    [numericCatalogId],
  );
  const catalogName = catalogResponse?.data.name ?? data?.data[0]?.catalog?.name ?? "Velvet 8020";
  const colorCount = data?.meta.total ?? 0;

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setFavoriteIds(new Set());
      return;
    }

    api.get<{ data: Color[] }>("color-favorites")
      .then((response) => setFavoriteIds(new Set(response.data.map((color) => color.id))))
      .catch(() => setFavoriteError("Your favorites could not be loaded."));
  }, [authLoading, user]);

  const toggleFavorite = async (colorId: number) => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    setFavoritePendingId(colorId);
    setFavoriteError(null);
    try {
      const response = await api.patch<{ data: { color_id: number; is_favorite: boolean } }>(`colors/${colorId}/favorite`);
      setFavoriteIds((current) => {
        const next = new Set(current);
        if (response.data.is_favorite) next.add(colorId);
        else next.delete(colorId);
        return next;
      });
    } catch {
      setFavoriteError("The favorite could not be updated. Please try again.");
    } finally {
      setFavoritePendingId(null);
    }
  };
  const swatches: Swatch[] = (data?.data ?? [])
    .filter((color) => typeFilter === "all" || color.type === typeFilter)
    .map((color) => {
      const base = color.hex_code ?? "#777777";
      return {
        id: color.code,
        numericId: color.id,
        name: color.code,
        style: color.type,
        stock: color.stock_status === "in_stock" ? "AVAILABLE" : color.stock_status.replaceAll("_", " ").toUpperCase(),
        stockQuantity: color.stock_quantity,
        texture: color.swatch_path ?? fabricTexture(base, base),
      };
    })
    .sort((left, right) => {
      if (sortBy === "oldest") return left.numericId - right.numericId;
      if (sortBy === "name-asc") return left.name.localeCompare(right.name, undefined, { numeric: true });
      if (sortBy === "name-desc") return right.name.localeCompare(left.name, undefined, { numeric: true });
      if (sortBy === "stock-high") return right.stockQuantity - left.stockQuantity;
      return right.numericId - left.numericId;
    });

  return (
    <div className="rv-page">
      <main>
        <div className="rv-breadcrumb">Catalogs　›　{catalogName}　›　<b>Colors</b></div>
        <section className="rv-heading">
          <h1>{catalogName} Colors</h1>
          <p>Explore the {colorCount} available color codes in ANC {catalogName}. Visit our Sharjah shop to experience the fabric<br />in person, request up to three free A4 samples, or contact our team for current stock and pricing.</p>
        </section>

        <section className="rv-toolbar">
          <div>
            <span>FILTER:</span>
            <button className={typeFilter === "all" ? "active" : ""} onClick={() => setTypeFilter("all")}>All</button>
            <button className={typeFilter === "plain" ? "active" : ""} onClick={() => setTypeFilter("plain")}>Plain</button>
            <button className={typeFilter === "pattern" ? "active" : ""} onClick={() => setTypeFilter("pattern")}>Pattern</button>
          </div>
          <label>
            <span>SORT BY:</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="latest">Latest Arrival</option>
              <option value="oldest">Oldest First</option>
              <option value="name-asc">Code A–Z</option>
              <option value="name-desc">Code Z–A</option>
              <option value="stock-high">Most Stock</option>
            </select>
          </label>
        </section>

        {(loading || catalogLoading) && <p role="status">Loading available colors…</p>}
        {(error || catalogError) && <p role="alert">{error ?? catalogError}</p>}
        {favoriteError && <p className="rv-favorite-error" role="alert">{favoriteError}</p>}
        {!loading && !error && swatches.length === 0 && <p>No colors match the selected filter.</p>}
        <section className="rv-grid">{swatches.map(swatch => <SwatchCard swatch={swatch} catalogName={catalogName} isFavorite={favoriteIds.has(swatch.numericId)} favoritePending={favoritePendingId === swatch.numericId} onToggleFavorite={toggleFavorite} key={swatch.id} />)}</section>
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
