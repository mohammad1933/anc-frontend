import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { img as textileImages } from "@/pages/AboutUs";
import { api } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import type { Catalog } from "@/types/api";
import { paginationItems } from "@/utils/pagination";

// ── Icons ──────────────────────────────────────────────────────────────────
const SearchIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z" />
  </svg>
);

const ChevronDownIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronLeftIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
  </svg>
);

const InstagramIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={1.5} />
    <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

const ShareIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M4 12v8a1 1 0 001 1h14a1 1 0 001-1v-8M16 6l-4-4-4 4M12 2v13" />
  </svg>
);

const MailIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const MenuIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// ── Data ───────────────────────────────────────────────────────────────────
const colorFamilyColors: Record<string, string> = {
  Gold: "#C8A45A", "Light Gray": "#D4CFC9", Gray: "#8C8C8C", Purple: "#5B3F8C",
  Cream: "#E8E4DC", Navy: "#1A1A2E", Red: "#A43B35", Green: "#4F7047",
  Blue: "#426C9D", Brown: "#76513C", Black: "#191919", White: "#F7F7F5",
};

// ── Navbar ─────────────────────────────────────────────────────────────────
const navLinks = [
  { label: "HOME", to: "/" },
  { label: "CATALOGS", to: "/catalogs" },
  { label: "PRODUCT", to: "/product" },
  { label: "CONTACT", to: "/contact" },
  { label: "FABRIC MOCKUP", to: "/mockup" },
  { label: "SERVICES", to: "/services" },
  { label: "ABOUT US", to: "/about-us" },
  { label: "DASHBOARD", to: "/dashboard" },
];

export const LegacyCatalogsNavbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav
      style={{ backgroundColor: "#FAFAF8", borderBottom: "1px solid #E8E4DC" }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          style={{ fontFamily: "Georgia, serif", color: "#1A1814", letterSpacing: "0.05em" }}
          className="text-base font-bold tracking-widest uppercase"
        >
          ANC NAJJAR
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return link.to.startsWith("#") ? (
              <a
                key={link.label}
                href={link.to}
                style={{
                  color: "#6B6560",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  borderBottom: isActive ? "2px solid #C8A45A" : "2px solid transparent",
                  paddingBottom: "2px",
                }}
                className="hover:text-stone-900 transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                style={{
                  color: isActive ? "#1A1814" : "#6B6560",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  borderBottom: isActive ? "2px solid #C8A45A" : "2px solid transparent",
                  paddingBottom: "2px",
                }}
                className="hover:text-stone-900 transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right */}
        <div className="hidden md:flex items-center gap-4">
          <button
            style={{ color: "#6B6560", fontSize: "11px", letterSpacing: "0.08em" }}
            className="font-medium hover:text-stone-900 transition-colors"
          >
            EN/AR
          </button>
          <Link to="/request-sample"
            style={{
              backgroundColor: "#C8A45A",
              color: "#FFFFFF",
              fontSize: "11px",
              letterSpacing: "0.08em",
              padding: "8px 18px",
              borderRadius: "4px",
            }}
            className="font-semibold hover:opacity-90 transition-opacity"
          >
            REQUEST SAMPLE
          </Link>
        </div>

        <button className="md:hidden" style={{ color: "#1A1814" }} onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {mobileOpen && (
        <div style={{ backgroundColor: "#FAFAF8", borderTop: "1px solid #E8E4DC" }} className="md:hidden px-6 py-5 space-y-4">
          {navLinks.map((link) =>
            link.to.startsWith("#") ? (
              <a key={link.label} href={link.to}
                style={{ color: "#6B6560", fontSize: "12px", letterSpacing: "0.08em" }}
                className="block font-medium" onClick={() => setMobileOpen(false)}>
                {link.label}
              </a>
            ) : (
              <Link key={link.label} to={link.to}
                style={{ color: "#6B6560", fontSize: "12px", letterSpacing: "0.08em" }}
                className="block font-medium" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            )
          )}
          <Link to="/request-sample"
            style={{ backgroundColor: "#C8A45A", color: "#fff", fontSize: "11px", padding: "8px 18px", borderRadius: "4px" }}
            className="font-semibold w-full"
          >
            REQUEST SAMPLE
          </Link>
        </div>
      )}
    </nav>
  );
};

// ── Sidebar Filters ─────────────────────────────────────────────────────────
interface CatalogFilters {
  categories: string[];
  materials: string[];
  compositions: string[];
  colorFamilies: string[];
  applications: string[];
  featuredOnly: boolean;
  newOnly: boolean;
  withColorsOnly: boolean;
  withSpecificationsOnly: boolean;
  withPdfOnly: boolean;
}

interface SidebarFiltersProps {
  filters: CatalogFilters;
  options: { categories: string[]; materials: string[]; compositions: string[]; colorFamilies: string[]; applications: string[] };
  onChange: (filters: CatalogFilters) => void;
}

const SidebarFilters: React.FC<SidebarFiltersProps> = ({ filters, options, onChange }) => {
  const toggle = (field: "categories" | "materials" | "compositions" | "colorFamilies" | "applications", value: string) => {
    const selected = filters[field];
    onChange({ ...filters, [field]: selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value] });
  };

  return (
    <aside className="w-full md:w-56 shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <span style={{ color: "#1A1814", fontSize: "13px", fontWeight: 600, letterSpacing: "0.02em" }}>
          Filters
        </span>
        <button onClick={() => onChange({ categories: [], materials: [], compositions: [], colorFamilies: [], applications: [], featuredOnly: false, newOnly: false, withColorsOnly: false, withSpecificationsOnly: false, withPdfOnly: false })} style={{ color: "#C8A45A", fontSize: "11px", letterSpacing: "0.05em" }} className="font-medium">
          Reset All
        </button>
      </div>

      {/* Category */}
      <div className="mb-6">
        <p style={{ color: "#9B9590", fontSize: "9px", letterSpacing: "0.15em", fontWeight: 700 }} className="uppercase mb-3">
          Category
        </p>
        {options.categories.map((cat) => (
          <label key={cat} className="flex items-center gap-2.5 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.categories.includes(cat)}
              onChange={() => toggle("categories", cat)}
              style={{ accentColor: "#C8A45A", width: "13px", height: "13px" }}
            />
            <span style={{ color: "#3D3830", fontSize: "12px" }}>{cat}</span>
          </label>
        ))}
      </div>

      {/* Material */}
      <div className="mb-6">
        <p style={{ color: "#9B9590", fontSize: "9px", letterSpacing: "0.15em", fontWeight: 700 }} className="uppercase mb-3">
          Material
        </p>
        <div className="flex flex-wrap gap-2">
          {options.materials.map((mat) => (
            <button
              key={mat}
              onClick={() => toggle("materials", mat)}
              style={{
                fontSize: "11px",
                padding: "4px 12px",
                borderRadius: "20px",
                border: filters.materials.includes(mat) ? "1px solid #C8A45A" : "1px solid #D5D0C8",
                backgroundColor: filters.materials.includes(mat) ? "#FBF6EE" : "transparent",
                color: filters.materials.includes(mat) ? "#C8A45A" : "#6B6560",
                letterSpacing: "0.03em",
              }}
              className="transition-all duration-150"
            >
              {mat}
            </button>
          ))}
        </div>
      </div>

      {/* Composition */}
      <div className="mb-6">
        <p style={{ color: "#9B9590", fontSize: "9px", letterSpacing: "0.15em", fontWeight: 700 }} className="uppercase mb-3">
          Composition
        </p>
        {options.compositions.map((composition) => (
          <label key={composition} className="flex items-start gap-2.5 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.compositions.includes(composition)}
              onChange={() => toggle("compositions", composition)}
              style={{ accentColor: "#C8A45A", width: "13px", height: "13px", marginTop: "2px" }}
            />
            <span style={{ color: "#3D3830", fontSize: "12px", lineHeight: 1.4 }}>{composition}</span>
          </label>
        ))}
      </div>

      {/* Color Family */}
      <div className="mb-6">
        <p style={{ color: "#9B9590", fontSize: "9px", letterSpacing: "0.15em", fontWeight: 700 }} className="uppercase mb-3">
          Color Family
        </p>
        <div className="flex flex-wrap gap-2">
          {options.colorFamilies.map((family) => (
            <button
              key={family}
              title={family}
              aria-pressed={filters.colorFamilies.includes(family)}
              onClick={() => toggle("colorFamilies", family)}
              style={{
                display: "flex", alignItems: "center", gap: "5px", padding: "4px 8px", borderRadius: "16px",
                border: filters.colorFamilies.includes(family) ? "1px solid #C8A45A" : "1px solid #D5D0C8",
                backgroundColor: filters.colorFamilies.includes(family) ? "#FBF6EE" : "transparent",
                color: "#5F5952", fontSize: "10px",
              }}
              className="transition-all duration-150"
            >
              <i style={{ width: "12px", height: "12px", borderRadius: "50%", background: colorFamilyColors[family] ?? "#B7ADA0", border: "1px solid #00000012" }} />
              {family}
            </button>
          ))}
        </div>
      </div>

      {/* Attributes */}
      <div className="mb-6">
        <p style={{ color: "#9B9590", fontSize: "9px", letterSpacing: "0.15em", fontWeight: 700 }} className="uppercase mb-3">
          Collection Attributes
        </p>
        {([
          ["featuredOnly", "Featured collections"],
          ["newOnly", "New arrivals"],
          ["withColorsOnly", "Has available colors"],
          ["withSpecificationsOnly", "Has specifications"],
          ["withPdfOnly", "Has catalog PDF"],
        ] as const).map(([field, label]) => (
          <label key={field} className="flex items-center gap-2.5 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters[field]}
              onChange={(event) => onChange({ ...filters, [field]: event.target.checked })}
              style={{ accentColor: "#C8A45A", width: "13px", height: "13px" }}
            />
            <span style={{ color: "#3D3830", fontSize: "12px" }}>{label}</span>
          </label>
        ))}
      </div>

      {/* Applications */}
      <div className="mb-6">
        <p style={{ color: "#9B9590", fontSize: "9px", letterSpacing: "0.15em", fontWeight: 700 }} className="uppercase mb-3">
          Applications
        </p>
        {options.applications.map((app) => (
          <label key={app} className="flex items-center gap-2.5 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.applications.includes(app)}
              onChange={() => toggle("applications", app)}
              style={{ accentColor: "#C8A45A", width: "13px", height: "13px" }}
            />
            <span style={{ color: "#3D3830", fontSize: "12px" }}>{app}</span>
          </label>
        ))}
      </div>
    </aside>
  );
};

// ── Fabric Card ─────────────────────────────────────────────────────────────
interface FabricCardProps {
  id: number; name: string; sku: string; badge: string | null; description: string; category: string; type: string; material: string;
  composition: string; applications: string[]; colorFamilies: string[]; colorCount: number; isFeatured: boolean;
  isNew: boolean; hasSpecifications: boolean; hasPdf: boolean; viewCount: number; image: string;
}

const FabricCard: React.FC<FabricCardProps> = ({ id, name, badge, description, type, composition, image }) => (
  <Link
    to={`/catalogs/${id}/colors`}
    style={{ backgroundColor: "#FFFFFF", border: "1px solid #EDECE8", borderRadius: "6px", overflow: "hidden", textDecoration: "none", display: "block" }}
    className="group cursor-pointer transition-shadow duration-300 hover:shadow-md"
  >
    <div className="overflow-hidden" style={{ height: "200px" }}>
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
    </div>
    <div style={{ padding: "16px" }}>
      <div className="flex items-center gap-2 mb-1">
        <h3 style={{ color: "#1A1814", fontSize: "13px", fontWeight: 600, letterSpacing: "0.01em" }}>{name}</h3>
        {badge && (
          <span
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              padding: "2px 7px",
              borderRadius: "3px",
              backgroundColor: "#FBF6EE",
              color: "#C8A45A",
              border: "1px solid #E8D9B8",
            }}
          >
            {badge.toUpperCase()}
          </span>
        )}
      </div>
      <p style={{ color: "#8A857E", fontSize: "11px", lineHeight: 1.5, marginBottom: "12px" }}>{description}</p>
      <div style={{ borderTop: "1px solid #EDECE8", paddingTop: "10px" }} className="flex justify-between">
        <div>
          <p style={{ color: "#B0ABA5", fontSize: "9px", letterSpacing: "0.08em" }}>Type</p>
          <p style={{ color: "#3D3830", fontSize: "11px", fontWeight: 500 }}>{type}</p>
        </div>
        <div className="text-right">
          <p style={{ color: "#B0ABA5", fontSize: "9px", letterSpacing: "0.08em" }}>Composition</p>
          <p style={{ color: "#3D3830", fontSize: "11px", fontWeight: 500 }}>{composition}</p>
        </div>
      </div>
    </div>
  </Link>
);

// ── Pagination ──────────────────────────────────────────────────────────────
const Pagination: React.FC<{ page: number; pageCount: number; onChange: (page: number) => void }> = ({ page, pageCount, onChange }) => {
  const pageNumbers = paginationItems(page, pageCount);
  return (
    <div className="flex items-center justify-center gap-1 mt-12">
      <button
        disabled={page === 1}
        onClick={() => onChange(Math.max(1, page - 1))}
        style={{
          width: "32px", height: "32px", borderRadius: "4px",
          border: "1px solid #D5D0C8", color: "#6B6560",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
        className="hover:border-stone-400 transition-colors"
      >
        <ChevronLeftIcon />
      </button>
      {pageNumbers.map((pageNumber) => typeof pageNumber === "number" ? (
        <button
          key={pageNumber}
          onClick={() => onChange(pageNumber)}
          style={{
            width: "32px", height: "32px", borderRadius: "4px",
            border: page === pageNumber ? "1px solid #C8A45A" : "1px solid #D5D0C8",
            backgroundColor: page === pageNumber ? "#C8A45A" : "transparent",
            color: page === pageNumber ? "#FFFFFF" : "#6B6560",
            fontSize: "12px", fontWeight: page === pageNumber ? 600 : 400,
          }}
          className="transition-all duration-150"
        >
          {pageNumber}
        </button>
      ) : <span aria-hidden="true" key={pageNumber}>…</span>)}
      <button
        disabled={page === pageCount}
        onClick={() => onChange(Math.min(pageCount, page + 1))}
        style={{
          width: "32px", height: "32px", borderRadius: "4px",
          border: "1px solid #D5D0C8", color: "#6B6560",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
        className="hover:border-stone-400 transition-colors"
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};

// ── Footer ──────────────────────────────────────────────────────────────────
export const LegacyCatalogsFooter: React.FC = () => (
  <footer style={{ backgroundColor: "#F5F3EF", borderTop: "1px solid #E0DDD6" }} className="mt-20">
    <div className="max-w-7xl mx-auto px-6 pt-14 pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div>
          <p style={{ fontFamily: "Georgia, serif", color: "#1A1814", fontSize: "15px", fontWeight: 700, letterSpacing: "0.05em" }} className="mb-3">
            ANC NAJJAR
          </p>
          <p style={{ color: "#8A857E", fontSize: "12px", lineHeight: 1.7 }}>
            Pioneers in luxury textile craftsmanship and interior design solutions since 1994.
          </p>
          <div className="flex items-center gap-3 mt-5">
            {[InstagramIcon, ShareIcon, MailIcon].map((Icon, i) => (
              <button
                key={i}
                style={{
                  width: "30px", height: "30px", borderRadius: "50%",
                  border: "1px solid #D5D0C8", color: "#6B6560",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
                className="hover:border-stone-400 hover:text-stone-800 transition-colors"
              >
                <Icon />
              </button>
            ))}
          </div>
        </div>

        {/* Collections */}
        <div>
          <p style={{ color: "#1A1814", fontSize: "11px", letterSpacing: "0.12em", fontWeight: 700 }} className="uppercase mb-4">
            Collections
          </p>
          {["Catalog", "Curtains", "Upholstery", "Outdoor"].map((item) => (
            <a key={item} href="#"
              style={{ color: "#8A857E", fontSize: "12px", display: "block", marginBottom: "10px" }}
              className="hover:text-stone-800 transition-colors">
              {item}
            </a>
          ))}
        </div>

        {/* Company */}
        <div>
          <p style={{ color: "#1A1814", fontSize: "11px", letterSpacing: "0.12em", fontWeight: 700 }} className="uppercase mb-4">
            Company
          </p>
          {["Services", "About Us", "Contact", "FAQ", "Privacy Policy"].map((item) => (
            item === "FAQ" ? <Link key={item} to="/faq" style={{ color: "#8A857E", fontSize: "12px", display: "block", marginBottom: "10px" }}>FAQ</Link> : <a key={item} href="#"
              style={{ color: "#8A857E", fontSize: "12px", display: "block", marginBottom: "10px" }}
              className="hover:text-stone-800 transition-colors">
              {item}
            </a>
          ))}
        </div>

        {/* Newsletter */}
        <div>
          <p style={{ color: "#1A1814", fontSize: "11px", letterSpacing: "0.12em", fontWeight: 700 }} className="uppercase mb-4">
            Newsletter
          </p>
          <p style={{ color: "#8A857E", fontSize: "12px", lineHeight: 1.6, marginBottom: "14px" }}>
            Subscribe for early access to new collections and design trends.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Email Address"
              style={{
                flex: 1,
                border: "1px solid #D5D0C8",
                borderRight: "none",
                borderRadius: "4px 0 0 4px",
                padding: "8px 12px",
                fontSize: "11px",
                color: "#3D3830",
                backgroundColor: "#FFFFFF",
                outline: "none",
              }}
            />
            <button
              style={{
                backgroundColor: "#C8A45A",
                color: "#FFFFFF",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                padding: "8px 14px",
                borderRadius: "0 4px 4px 0",
              }}
              className="hover:opacity-90 transition-opacity"
            >
              JOIN
            </button>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #D5D0C8", paddingTop: "20px" }} className="flex flex-col md:flex-row items-center justify-between gap-3">
        <p style={{ color: "#B0ABA5", fontSize: "11px" }}>© 2024 ANC NAJJAR FURNITURE. All rights reserved.</p>
        <div className="flex items-center gap-5">
          {["Terms of Service", "Cookie Policy"].map((item) => (
            <a key={item} href="#"
              style={{ color: "#B0ABA5", fontSize: "11px" }}
              className="hover:text-stone-600 transition-colors">
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// ── Main Page ───────────────────────────────────────────────────────────────
const CatalogsPage: React.FC = () => {
  const [sortBy, setSortBy] = useState("Newest First");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<CatalogFilters>({
    categories: [], materials: [], compositions: [], colorFamilies: [], applications: [],
    featuredOnly: false, newOnly: false, withColorsOnly: false, withSpecificationsOnly: false, withPdfOnly: false,
  });
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const { data, loading, error } = useApi(
    () => api.getAll<Catalog>("catalogs", { status: "published", per_page: 100 }),
    [],
  );

  const catalogCards: FabricCardProps[] = (data?.data ?? []).map((catalog) => ({
    id: catalog.id,
    name: catalog.name,
    sku: catalog.sku ?? "",
    badge: catalog.colors_count ? `${catalog.colors_count} Colors` : null,
    description: catalog.description ?? "",
    category: catalog.category?.name ?? "",
    type: catalog.category?.name ?? catalog.material ?? "Fabric",
    material: catalog.material ?? "",
    composition: catalog.composition ?? "",
    applications: catalog.applications ?? [],
    colorFamilies: [...new Set((catalog.colors ?? []).map((color) => color.color_family).filter((family): family is string => Boolean(family)))],
    colorCount: catalog.colors_count ?? 0,
    isFeatured: catalog.is_featured,
    isNew: catalog.is_new,
    hasSpecifications: Boolean(catalog.specifications && Object.keys(catalog.specifications).length),
    hasPdf: Boolean(catalog.pdf_path),
    viewCount: catalog.view_count ?? 0,
    image: catalog.thumbnail_path ?? textileImages.velvet,
  }));

  const filterOptions = {
    categories: [...new Set(catalogCards.map((catalog) => catalog.category).filter(Boolean))].sort(),
    materials: [...new Set(catalogCards.map((catalog) => catalog.material).filter(Boolean))].sort(),
    compositions: [...new Set(catalogCards.map((catalog) => catalog.composition).filter(Boolean))].sort(),
    colorFamilies: [...new Set(catalogCards.flatMap((catalog) => catalog.colorFamilies))].sort(),
    applications: [...new Set(catalogCards.flatMap((catalog) => catalog.applications))].sort(),
  };
  const query = search.trim().toLowerCase();
  const filtered = catalogCards.filter((catalog) => {
    const matchesSearch = !query || [catalog.name, catalog.sku, catalog.type, catalog.material, catalog.composition, catalog.description, ...catalog.applications, ...catalog.colorFamilies]
      .some((value) => value.toLowerCase().includes(query));
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(catalog.category);
    const matchesMaterial = filters.materials.length === 0 || filters.materials.includes(catalog.material);
    const matchesComposition = filters.compositions.length === 0 || filters.compositions.includes(catalog.composition);
    const matchesApplication = filters.applications.length === 0 || filters.applications.some((application) => catalog.applications.includes(application));
    const matchesColor = filters.colorFamilies.length === 0 || filters.colorFamilies.some((family) => catalog.colorFamilies.includes(family));
    const matchesFeatured = !filters.featuredOnly || catalog.isFeatured;
    const matchesNew = !filters.newOnly || catalog.isNew;
    const matchesColorsAvailable = !filters.withColorsOnly || catalog.colorCount > 0;
    const matchesSpecifications = !filters.withSpecificationsOnly || catalog.hasSpecifications;
    const matchesPdf = !filters.withPdfOnly || catalog.hasPdf;

    return matchesSearch && matchesCategory && matchesMaterial && matchesComposition && matchesApplication &&
      matchesColor && matchesFeatured && matchesNew && matchesColorsAvailable && matchesSpecifications && matchesPdf;
  }).sort((left, right) => {
    if (sortBy === "Name A-Z") return left.name.localeCompare(right.name);
    if (sortBy === "Name Z-A") return right.name.localeCompare(left.name);
    if (sortBy === "Most Colors") return right.colorCount - left.colorCount;
    if (sortBy === "Most Popular") return right.viewCount - left.viewCount;
    return sortBy === "Oldest First" ? left.id - right.id : right.id - left.id;
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visibleCatalogs = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [search, sortBy, filters]);

  return (
    <div style={{ backgroundColor: "#FAFAF8", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex gap-10">
          {/* Sidebar */}
          <SidebarFilters filters={filters} options={filterOptions} onChange={setFilters} />

          {/* Main */}
          <main className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-6">
              <h1 style={{ color: "#1A1814", fontSize: "28px", fontWeight: 700, letterSpacing: "-0.01em", marginBottom: "6px" }}>
                Our Catalogs
              </h1>
              <p style={{ color: "#8A857E", fontSize: "13px", lineHeight: 1.6 }}>
                Curated premium textile collections from international artisans, designed for sophisticated interiors.
              </p>
            </div>

            {/* Search + Sort bar */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <p style={{ color: "#6B6560", fontSize: "12px" }}>
                  <strong style={{ color: "#1A1814" }}>{filtered.length}</strong> collections found
                </p>
              </div>
              <div className="flex items-center gap-4">
                {/* Search */}
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#B0ABA5" }}>
                    <SearchIcon />
                  </span>
                  <input
                    type="text"
                    placeholder="Find a collection..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      border: "1px solid #D5D0C8",
                      borderRadius: "4px",
                      padding: "7px 12px 7px 32px",
                      fontSize: "11px",
                      color: "#3D3830",
                      backgroundColor: "#FFFFFF",
                      width: "200px",
                      outline: "none",
                    }}
                  />
                </div>
                {/* Sort */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ color: "#9B9590", fontSize: "11px", letterSpacing: "0.06em", fontWeight: 600 }}>SORT BY</span>
                  <div style={{ position: "relative" }}>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      style={{
                        appearance: "none",
                        border: "none",
                        backgroundColor: "transparent",
                        color: "#1A1814",
                        fontSize: "12px",
                        fontWeight: 500,
                        paddingRight: "18px",
                        cursor: "pointer",
                        outline: "none",
                      }}
                    >
                      <option>Newest First</option>
                      <option>Oldest First</option>
                      <option>Name A-Z</option>
                      <option>Name Z-A</option>
                      <option>Most Colors</option>
                      <option>Most Popular</option>
                    </select>
                    <span style={{ position: "absolute", right: "0", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6B6560" }}>
                      <ChevronDownIcon />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid */}
            {loading && <p role="status">Loading catalogs…</p>}
            {error && <p role="alert">{error}</p>}
            {!loading && !error && filtered.length === 0 && <p>No published catalogs match your search and filters.</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleCatalogs.map((fabric) => (
                <FabricCard key={fabric.id} {...fabric} />
              ))}
            </div>

            {/* Pagination */}
            {filtered.length > 0 && <Pagination page={page} pageCount={pageCount} onChange={setPage} />}
          </main>
        </div>
      </div>

    </div>
  );
};

export default CatalogsPage;
