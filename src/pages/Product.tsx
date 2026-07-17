import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// ── Icons ──────────────────────────────────────────────────────────────────
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
const CheckShieldIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const FireIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
  </svg>
);
const DropletIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);
const LeafIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);
const MailIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const DocumentIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

// ── Nav links data ─────────────────────────────────────────────────────────
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

// ── Navbar ─────────────────────────────────────────────────────────────────
const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav
      style={{ backgroundColor: "#FAFAF8", borderBottom: "1px solid #E8E4DC" }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          style={{ fontFamily: "Georgia, serif", color: "#1A1814", letterSpacing: "0.05em" }}
          className="text-base font-bold tracking-widest uppercase"
        >
          ANC NAJJAR
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            const inner = (
              <span
                style={{
                  color: isActive ? "#1A1814" : "#6B6560",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  borderBottom: isActive ? "2px solid #C8A45A" : "2px solid transparent",
                  paddingBottom: "2px",
                  fontWeight: 500,
                }}
                className="hover:text-stone-900 transition-colors duration-200"
              >
                {link.label}
              </span>
            );
            if (link.to.startsWith("/#")) {
              return <a key={link.label} href={link.to}>{inner}</a>;
            }
            return <Link key={link.label} to={link.to}>{inner}</Link>;
          })}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            style={{ color: "#6B6560", fontSize: "11px", letterSpacing: "0.08em", fontWeight: 500 }}
            className="hover:text-stone-900 transition-colors"
          >
            EN/AR
          </button>
          <Link to="/request-sample"
            style={{
              backgroundColor: "#2C2A26",
              color: "#FFFFFF",
              fontSize: "11px",
              letterSpacing: "0.08em",
              padding: "8px 18px",
              borderRadius: "4px",
              fontWeight: 600,
            }}
            className="hover:opacity-90 transition-opacity"
          >
            REQUEST SAMPLE
          </Link>
        </div>

        <button className="md:hidden" style={{ color: "#1A1814" }} onClick={() => setOpen(!open)}>
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <div
          style={{ backgroundColor: "#FAFAF8", borderTop: "1px solid #E8E4DC" }}
          className="md:hidden px-6 py-5 space-y-4"
        >
          {navLinks.map((link) =>
            link.to.startsWith("/#") ? (
              <a
                key={link.label}
                href={link.to}
                style={{ color: "#6B6560", fontSize: "12px", letterSpacing: "0.08em" }}
                className="block font-medium"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                style={{ color: "#6B6560", fontSize: "12px", letterSpacing: "0.08em" }}
                className="block font-medium"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
          <Link to="/request-sample"
            style={{ backgroundColor: "#2C2A26", color: "#fff", fontSize: "11px", padding: "8px 18px", borderRadius: "4px" }}
            className="font-semibold w-full"
          >
            REQUEST SAMPLE
          </Link>
        </div>
      )}
    </nav>
  );
};

// ── Footer ─────────────────────────────────────────────────────────────────
const Footer: React.FC = () => (
  <footer style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid #EAE8E3" }}>
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        <div>
          <p
            style={{
              fontFamily: "Georgia, serif",
              color: "#1A1814",
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "0.05em",
              marginBottom: "10px",
            }}
          >
            ANC NAJJAR
          </p>
          <p style={{ color: "#6B6560", fontSize: "11px", lineHeight: 1.7 }}>
            Curating the world's finest textiles and furniture for the modern international architectural landscape. Craftsmanship without compromise.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <span style={{ cursor: "pointer", color: "#1A1814" }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.176 17.51a1.2 1.2 0 01-1.688.35c-4.48-2.61-9.97-3.23-16.51-1.78a1.2 1.2 0 01-.6-2.33c7.09-1.58 13.16-.88 18.17 2.05a1.2 1.2 0 01.628 1.71zm.17-5.59c-4.46-2.58-9.45-3.07-16.51-1.64a1.2 1.2 0 01-.58-2.32c7.87-1.6 13.56-1.04 18.63 1.86a1.2 1.2 0 01-1.54 2.1zm.14-5.6C12.39 3.37 6.47 3.2 1.95 4.62a1.2 1.2 0 01-.76-2.28C6.39.68 12.98.88 18.06 3.9a1.2 1.2 0 01-1.2 2.02z" /></svg>
            </span>
            <span style={{ cursor: "pointer", color: "#1A1814" }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            </span>
            <span style={{ cursor: "pointer", color: "#1A1814" }}>
              <MailIcon />
            </span>
          </div>
        </div>

        <div>
          <p style={{ color: "#1A1814", fontSize: "10px", letterSpacing: "0.12em", fontWeight: 700, textTransform: "uppercase", marginBottom: "16px" }}>
            COLLECTIONS
          </p>
          {["Velvets", "Linens", "Leather", "Contract"].map((item) => (
            <a
              key={item}
              href="#"
              style={{ color: "#6B6560", fontSize: "11px", display: "block", marginBottom: "10px" }}
              className="hover:text-stone-800 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div>
          <p style={{ color: "#1A1814", fontSize: "10px", letterSpacing: "0.12em", fontWeight: 700, textTransform: "uppercase", marginBottom: "16px" }}>
            RESOURCES
          </p>
          {["Catalogs", "Care Guides", "FR Certificates", "Sustainability"].map((item) => (
            <a
              key={item}
              href="#"
              style={{ color: "#6B6560", fontSize: "11px", display: "block", marginBottom: "10px" }}
              className="hover:text-stone-800 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div>
          <p style={{ color: "#1A1814", fontSize: "10px", letterSpacing: "0.12em", fontWeight: 700, textTransform: "uppercase", marginBottom: "16px" }}>
            NEWSLETTER
          </p>
          <p style={{ color: "#6B6560", fontSize: "11px", marginBottom: "12px", lineHeight: 1.5 }}>
            Subscribe to receive technical updates and new collection previews.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Email Address"
              style={{
                border: "1px solid #EAE8E3",
                backgroundColor: "#FAF9F6",
                padding: "8px 12px",
                fontSize: "11px",
                width: "100%",
                outline: "none",
                color: "#1A1814"
              }}
            />
            <button
              style={{
                backgroundColor: "#1A1814",
                color: "#FFFFFF",
                fontSize: "10px",
                letterSpacing: "0.1em",
                padding: "0 16px",
                fontWeight: 600,
              }}
            >
              JOIN
            </button>
          </div>
        </div>
      </div>

      <div
        style={{ borderTop: "1px solid #EAE8E3", paddingTop: "20px" }}
        className="flex flex-col md:flex-row items-center justify-between gap-3"
      >
        <p style={{ color: "#8A857E", fontSize: "10px" }}>© 2024 ANC NAJJAR FURNITURE. All rights reserved.</p>
        <div className="flex items-center gap-5">
          {["Privacy Policy", "Terms of Service"].map((item) => (
            <a
              key={item}
              href="#"
              style={{ color: "#8A857E", fontSize: "10px" }}
              className="hover:text-stone-600 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// ── Main Page Component ──────────────────────────────────────────────────
const Product: React.FC = () => {
  return (
    <div style={{ backgroundColor: "#FAFAF8", fontFamily: "Inter, system-ui, sans-serif", minHeight: "100vh" }} className="flex flex-col">
      <Navbar />

      <main className="flex-1" style={{ paddingBottom: "80px" }}>
        
        {/* Breadcrumb & Header */}
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-8">
          <p style={{ color: "#1A1814", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: "16px" }}>
            CATALOGS <span style={{ color: "#A8A39C", margin: "0 6px" }}>•</span> VELVET COLLECTION <span style={{ color: "#A8A39C", margin: "0 6px" }}>•</span> ROYAL VELVET
          </p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(32px, 4vw, 42px)", color: "#1A1814", letterSpacing: "-0.01em", marginBottom: "12px", fontWeight: 700 }}>
            Royal Velvet
          </h1>
          <p style={{ color: "#6B6560", fontSize: "12px", lineHeight: 1.6, maxWidth: "560px" }}>
            A masterpiece of textile engineering. Our signature Royal Velvet offers a deep, 
            light-absorbing pile that creates an unparalleled depth of color and a tactile 
            experience synonymous with timeless luxury.
          </p>
        </div>

        {/* Main content grid */}
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20">
          
          {/* Left: Images & Add to cart */}
          <div>
            <div style={{ position: "relative", marginBottom: "4px" }}>
              <div 
                style={{ 
                  position: "absolute", 
                  top: "16px", left: "16px", 
                  backgroundColor: "#FFFFFF", 
                  color: "#1A1814",
                  fontSize: "9px",
                  letterSpacing: "0.15em",
                  padding: "6px 12px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  zIndex: 10
                }}
              >
                FEATURED FINISH
              </div>
              <img 
                src="https://picsum.photos/seed/royal-velvet-main/1000/600.jpg" 
                alt="Royal Velvet" 
                style={{ width: "100%", height: "auto", aspectRatio: "16/10", objectFit: "cover" }}
              />
            </div>
            
            <div style={{ backgroundColor: "#F4F3F0", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div>
                <p style={{ color: "#1A1814", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Deep Midnight Blue</p>
                <p style={{ color: "#8A857E", fontSize: "10px" }}>400, 16pt, #6B7280</p>
              </div>
              <div>
                <p style={{ color: "#1A1814", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>$120 / meter</p>
                <p style={{ color: "#8A857E", fontSize: "10px" }}>Semi-Solid, 350t, #111827</p>
              </div>
              <div className="flex items-center gap-4">
                <div style={{ borderBottom: "1px solid #D5D0C8", display: "flex", alignItems: "center", paddingBottom: "4px", gap: "12px" }}>
                  <span style={{ color: "#A8A39C", fontSize: "10px", textTransform: "uppercase" }}>Quantity</span>
                  <button style={{ color: "#A8A39C" }}>−</button>
                  <span style={{ color: "#1A1814", fontSize: "12px", fontWeight: 600 }}>1</span>
                  <button style={{ color: "#A8A39C" }}>+</button>
                </div>
                <button 
                  style={{ 
                    backgroundColor: "#1A1814", color: "#FFFFFF", 
                    fontSize: "10px", letterSpacing: "0.1em", fontWeight: 600, 
                    padding: "10px 24px", borderRadius: "2px" 
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <img src="https://picsum.photos/seed/royal-velvet-1/400/400.jpg" alt="Detail 1" style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }} />
              <img src="https://picsum.photos/seed/royal-velvet-2/400/400.jpg" alt="Detail 2" style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }} />
              <img src="https://picsum.photos/seed/royal-velvet-3/400/400.jpg" alt="Detail 3" style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }} />
            </div>
          </div>

          {/* Right: Key Features & Inquiries */}
          <div style={{ paddingTop: "12px" }}>
            <p style={{ color: "#C8A45A", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, marginBottom: "20px" }}>
              KEY FEATURES
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <span style={{ color: "#C8A45A", marginTop: "2px" }}><CheckShieldIcon /></span>
                <div>
                  <p style={{ color: "#1A1814", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>Extreme Durability</p>
                  <p style={{ color: "#6B6560", fontSize: "11px", lineHeight: 1.5 }}>100,000+ Martindale cycles for high-traffic contract use.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span style={{ color: "#C8A45A", marginTop: "2px" }}><FireIcon /></span>
                <div>
                  <p style={{ color: "#1A1814", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>Fire Retardant</p>
                  <p style={{ color: "#6B6560", fontSize: "11px", lineHeight: 1.5 }}>Meets BS 5852 Crib 5 and CAL TB 117-2013 standards.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span style={{ color: "#C8A45A", marginTop: "2px" }}><DropletIcon /></span>
                <div>
                  <p style={{ color: "#1A1814", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>Stain Resistant</p>
                  <p style={{ color: "#6B6560", fontSize: "11px", lineHeight: 1.5 }}>Treated with nanotechnology for effortless liquid repellency.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span style={{ color: "#C8A45A", marginTop: "2px" }}><LeafIcon /></span>
                <div>
                  <p style={{ color: "#1A1814", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>Sustainable Origin</p>
                  <p style={{ color: "#6B6560", fontSize: "11px", lineHeight: 1.5 }}>OEKO-TEX® certified, produced with zero-waste water recycling.</p>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: "#F9F8F6", border: "1px solid #EAE8E3", padding: "24px" }}>
              <div className="flex justify-between items-center mb-6">
                <p style={{ color: "#1A1814", fontSize: "10px", letterSpacing: "0.15em", fontWeight: 600 }}>COMMERCIAL INQUIRIES</p>
                <p style={{ color: "#8A692D", fontSize: "13px", fontWeight: 700 }}>Price upon request</p>
              </div>
              <div className="space-y-3">
                <button 
                  style={{ 
                    width: "100%", backgroundColor: "#1A1814", color: "#FFFFFF", 
                    fontSize: "11px", letterSpacing: "0.1em", fontWeight: 600, 
                    padding: "12px 0", borderRadius: "2px",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
                  }}
                  className="hover:bg-stone-800 transition-colors"
                >
                  <MailIcon /> CONTACT SALES
                </button>
                <button 
                  style={{ 
                    width: "100%", backgroundColor: "#F9F8F6", color: "#1A1814", border: "1px solid #D5D0C8",
                    fontSize: "11px", letterSpacing: "0.1em", fontWeight: 600, 
                    padding: "12px 0", borderRadius: "2px",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
                  }}
                  className="hover:bg-stone-50 transition-colors"
                >
                  <DocumentIcon /> REQUEST SAMPLE SWATCH
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs & Table section */}
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
          <div style={{ borderBottom: "1px solid #EAE8E3", display: "flex", gap: "32px", marginBottom: "32px" }}>
            <button style={{ color: "#8A692D", fontSize: "10px", letterSpacing: "0.15em", fontWeight: 700, paddingBottom: "12px", borderBottom: "2px solid #C8A45A", textTransform: "uppercase" }}>SPECIFICATIONS</button>
            <button style={{ color: "#6B6560", fontSize: "10px", letterSpacing: "0.15em", fontWeight: 600, paddingBottom: "12px", borderBottom: "2px solid transparent", textTransform: "uppercase" }}>AVAILABLE COLORS</button>
            <button style={{ color: "#6B6560", fontSize: "10px", letterSpacing: "0.15em", fontWeight: 600, paddingBottom: "12px", borderBottom: "2px solid transparent", textTransform: "uppercase" }}>APPLICATIONS</button>
            <button style={{ color: "#6B6560", fontSize: "10px", letterSpacing: "0.15em", fontWeight: 600, paddingBottom: "12px", borderBottom: "2px solid transparent", textTransform: "uppercase" }}>CARE INSTRUCTIONS</button>
          </div>

          <div className="grid md:grid-cols-2 gap-x-20 gap-y-4 max-w-4xl">
            {/* Left Col */}
            <div style={{ borderBottom: "1px solid #F0EDE6", paddingBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#8A857E", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Composition</span>
              <span style={{ color: "#1A1814", fontSize: "11px" }}>100% Cotton Velvet with FR Backing</span>
            </div>
            {/* Right Col */}
            <div style={{ borderBottom: "1px solid #F0EDE6", paddingBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#8A857E", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Martindale</span>
              <span style={{ color: "#1A1814", fontSize: "11px" }}>100,000 Cycles</span>
            </div>
            
            {/* Left Col */}
            <div style={{ borderBottom: "1px solid #F0EDE6", paddingBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#8A857E", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Weight</span>
              <span style={{ color: "#1A1814", fontSize: "11px" }}>650 g/m</span>
            </div>
            {/* Right Col */}
            <div style={{ borderBottom: "1px solid #F0EDE6", paddingBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#8A857E", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Pilling</span>
              <span style={{ color: "#1A1814", fontSize: "11px" }}>Grade 4-5</span>
            </div>

            {/* Left Col */}
            <div style={{ paddingBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#8A857E", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Width</span>
              <span style={{ color: "#1A1814", fontSize: "11px" }}>140 cm (55")</span>
            </div>
            {/* Right Col */}
            <div style={{ paddingBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#8A857E", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Lightfastness</span>
              <span style={{ color: "#1A1814", fontSize: "11px" }}>Grade 6 (Xenon Test)</span>
            </div>
          </div>
        </div>

        {/* Complementary Collections */}
        <div style={{ backgroundColor: "#F7F6F3", borderTop: "1px solid #EAE8E3", paddingTop: "64px", paddingBottom: "64px" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(22px, 3vw, 28px)", color: "#1A1814", letterSpacing: "-0.01em", marginBottom: "8px" }}>
                  Complementary Collections
                </h2>
                <p style={{ color: "#6B6560", fontSize: "12px" }}>
                  Pair Royal Velvet with our lighter linens or metallic accents.
                </p>
              </div>
              <Link to="/catalogs" style={{ color: "#8A692D", fontSize: "10px", letterSpacing: "0.15em", fontWeight: 700, textTransform: "uppercase", borderBottom: "1px solid #8A692D", paddingBottom: "2px" }} className="hover:opacity-80 transition-opacity">
                VIEW ALL CATALOGS
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Liquid Silk", cat: "DRAPERY COLLECTION", img: "https://picsum.photos/seed/comp-1/600/400.jpg" },
                { name: "Nordic Bouclé", cat: "UPHOLSTERY COLLECTION", img: "https://picsum.photos/seed/comp-2/600/400.jpg" },
                { name: "Brutalist Linen", cat: "NATURAL FIBERS", img: "https://picsum.photos/seed/comp-3/600/400.jpg" }
              ].map(item => (
                <div key={item.name} style={{ cursor: "pointer" }} className="group">
                  <div style={{ aspectRatio: "16/10", overflow: "hidden", marginBottom: "12px" }}>
                    <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} className="group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <h3 style={{ color: "#1A1814", fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>{item.name}</h3>
                  <p style={{ color: "#8A857E", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase" }}>{item.cat}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default Product;
