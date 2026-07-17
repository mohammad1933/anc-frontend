import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
const fabrics = [
  {
    id: 1,
    name: "Velvet Royal II",
    badge: "Premium",
    description: "Ultra-soft heavy velvet with double-sided finish.",
    type: "Upholstery",
    composition: "100% Cotton Velvet",
    image: "https://picsum.photos/seed/velvet-royal/600/420.jpg",
  },
  {
    id: 2,
    name: "Nordic Sheer",
    badge: null,
    description: "Sustainable organic linen for ethereal drapery.",
    type: "Curtain",
    composition: "85% Linen, 15% Silk",
    image: "https://picsum.photos/seed/nordic-sheer/600/420.jpg",
  },
  {
    id: 3,
    name: "Marina Shield",
    badge: null,
    description: "High-performance weather-proof performance textile.",
    type: "Outdoor",
    composition: "Solution-dyed Acrylic",
    image: "https://picsum.photos/seed/marina-shield/600/420.jpg",
  },
  {
    id: 4,
    name: "Antique Gold Jacquard",
    badge: null,
    description: "Traditional motifs reimagined for modern spaces.",
    type: "Upholstery",
    composition: "60% Silk, 40% Viscose",
    image: "https://picsum.photos/seed/antique-gold/600/420.jpg",
  },
  {
    id: 5,
    name: "Urban Geometric",
    badge: null,
    description: "Architectural textures for hospitality projects.",
    type: "Curtain/Wall",
    composition: "100% Trevira CS",
    image: "https://picsum.photos/seed/urban-geometric/600/420.jpg",
  },
  {
    id: 6,
    name: "Cloud Bouclé",
    badge: null,
    description: "Luxe comfort with a timeless organic feel.",
    type: "Upholstery",
    composition: "Wool-Poly Blend",
    image: "https://picsum.photos/seed/cloud-boucle/600/420.jpg",
  },
];

const colorFamily = [
  { color: "#C8A45A", label: "Gold" },
  { color: "#D4CFC9", label: "Light Gray" },
  { color: "#8C8C8C", label: "Gray" },
  { color: "#5B3F8C", label: "Purple" },
  { color: "#E8E4DC", label: "Cream" },
  { color: "#1A1A2E", label: "Navy" },
];

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

const CatalogsNavbar: React.FC = () => {
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
const SidebarFilters: React.FC = () => {
  const [categories, setCategories] = useState({ Upholstery: false, Curtain: true, Outdoor: false });
  const [materials, setMaterials] = useState({ Wool: false, Linen: false, Cotton: false, Silk: false, Synthetic: false });
  const [selectedColor, setSelectedColor] = useState<string | null>("#C8A45A");
  const [applications, setApplications] = useState({
    Residential: false,
    "Hotel & Hospitality": false,
    "Commercial Office": false,
  });

  const toggleCategory = (key: keyof typeof categories) =>
    setCategories((p) => ({ ...p, [key]: !p[key] }));
  const toggleMaterial = (key: keyof typeof materials) =>
    setMaterials((p) => ({ ...p, [key]: !p[key] }));
  const toggleApplication = (key: keyof typeof applications) =>
    setApplications((p) => ({ ...p, [key]: !p[key] }));

  return (
    <aside className="w-full md:w-56 shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <span style={{ color: "#1A1814", fontSize: "13px", fontWeight: 600, letterSpacing: "0.02em" }}>
          Filters
        </span>
        <button style={{ color: "#C8A45A", fontSize: "11px", letterSpacing: "0.05em" }} className="font-medium">
          Reset All
        </button>
      </div>

      {/* Category */}
      <div className="mb-6">
        <p style={{ color: "#9B9590", fontSize: "9px", letterSpacing: "0.15em", fontWeight: 700 }} className="uppercase mb-3">
          Category
        </p>
        {(Object.keys(categories) as (keyof typeof categories)[]).map((cat) => (
          <label key={cat} className="flex items-center gap-2.5 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={categories[cat]}
              onChange={() => toggleCategory(cat)}
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
          {(Object.keys(materials) as (keyof typeof materials)[]).map((mat) => (
            <button
              key={mat}
              onClick={() => toggleMaterial(mat)}
              style={{
                fontSize: "11px",
                padding: "4px 12px",
                borderRadius: "20px",
                border: materials[mat] ? "1px solid #C8A45A" : "1px solid #D5D0C8",
                backgroundColor: materials[mat] ? "#FBF6EE" : "transparent",
                color: materials[mat] ? "#C8A45A" : "#6B6560",
                letterSpacing: "0.03em",
              }}
              className="transition-all duration-150"
            >
              {mat}
            </button>
          ))}
        </div>
      </div>

      {/* Color Family */}
      <div className="mb-6">
        <p style={{ color: "#9B9590", fontSize: "9px", letterSpacing: "0.15em", fontWeight: 700 }} className="uppercase mb-3">
          Color Family
        </p>
        <div className="flex gap-2 flex-wrap">
          {colorFamily.map((c) => (
            <button
              key={c.label}
              title={c.label}
              onClick={() => setSelectedColor(c.color === selectedColor ? null : c.color)}
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                backgroundColor: c.color,
                border: selectedColor === c.color ? "2px solid #C8A45A" : "2px solid transparent",
                outline: selectedColor === c.color ? "2px solid #C8A45A" : "2px solid transparent",
                outlineOffset: "2px",
              }}
              className="transition-all duration-150"
            />
          ))}
        </div>
      </div>

      {/* Applications */}
      <div className="mb-6">
        <p style={{ color: "#9B9590", fontSize: "9px", letterSpacing: "0.15em", fontWeight: 700 }} className="uppercase mb-3">
          Applications
        </p>
        {(Object.keys(applications) as (keyof typeof applications)[]).map((app) => (
          <label key={app} className="flex items-center gap-2.5 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={applications[app]}
              onChange={() => toggleApplication(app)}
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
const FabricCard: React.FC<typeof fabrics[number]> = ({ name, badge, description, type, composition, image }) => (
  <div
    style={{ backgroundColor: "#FFFFFF", border: "1px solid #EDECE8", borderRadius: "6px", overflow: "hidden" }}
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
  </div>
);

// ── Pagination ──────────────────────────────────────────────────────────────
const Pagination: React.FC = () => {
  const [page, setPage] = useState(1);
  return (
    <div className="flex items-center justify-center gap-1 mt-12">
      <button
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        style={{
          width: "32px", height: "32px", borderRadius: "4px",
          border: "1px solid #D5D0C8", color: "#6B6560",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
        className="hover:border-stone-400 transition-colors"
      >
        <ChevronLeftIcon />
      </button>
      {[1, 2, 3].map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          style={{
            width: "32px", height: "32px", borderRadius: "4px",
            border: page === p ? "1px solid #C8A45A" : "1px solid #D5D0C8",
            backgroundColor: page === p ? "#C8A45A" : "transparent",
            color: page === p ? "#FFFFFF" : "#6B6560",
            fontSize: "12px", fontWeight: page === p ? 600 : 400,
          }}
          className="transition-all duration-150"
        >
          {p}
        </button>
      ))}
      <span style={{ color: "#B0ABA5", fontSize: "13px", padding: "0 4px" }}>...</span>
      <button
        onClick={() => setPage((p) => p + 1)}
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
const CatalogsFooter: React.FC = () => (
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

  const filtered = fabrics.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "#FAFAF8", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      <CatalogsNavbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex gap-10">
          {/* Sidebar */}
          <SidebarFilters />

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
                    </select>
                    <span style={{ position: "absolute", right: "0", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6B6560" }}>
                      <ChevronDownIcon />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((fabric) => (
                <FabricCard key={fabric.id} {...fabric} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination />
          </main>
        </div>
      </div>

      <CatalogsFooter />
    </div>
  );
};

export default CatalogsPage;
