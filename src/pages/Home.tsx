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
const ArrowRightIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);
const CheckCircleIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
            if (link.to.startsWith("#")) {
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
              backgroundColor: "#C8A45A",
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
            link.to.startsWith("#") ? (
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

// ── Hero Section ───────────────────────────────────────────────────────────
const HeroSection: React.FC = () => (
  <section style={{ position: "relative", minHeight: "90vh", overflow: "hidden" }}>
    <img
      src="https://picsum.photos/seed/luxury-interior-anc/1920/1080.jpg"
      alt="Luxury interior"
      style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
    />
    {/* Gradient overlay */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to right, rgba(20,18,14,0.80) 40%, rgba(20,18,14,0.15) 100%)",
      }}
    />
    <div
      className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col justify-center"
      style={{ minHeight: "90vh", paddingTop: "80px", paddingBottom: "80px" }}
    >
      <p
        style={{
          color: "#C8A45A",
          fontSize: "11px",
          letterSpacing: "0.25em",
          fontWeight: 600,
          textTransform: "uppercase",
          marginBottom: "20px",
        }}
      >
        Since 1994 · Curated Luxury Fabrics
      </p>
      <h1
        style={{
          color: "#FFFFFF",
          fontSize: "clamp(36px, 6vw, 72px)",
          fontFamily: "Georgia, serif",
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
          marginBottom: "20px",
          maxWidth: "600px",
        }}
      >
        Premium Upholstery &amp;{" "}
        <span style={{ color: "#C8A45A" }}>Curtain Fabrics</span>
      </h1>
      <p
        style={{
          color: "rgba(255,255,255,0.70)",
          fontSize: "14px",
          lineHeight: 1.7,
          maxWidth: "420px",
          marginBottom: "36px",
        }}
      >
        Discover an exquisite collection of textiles crafted for discerning interiors.
        From sumptuous velvets to flowing silks, every fabric tells a story of artisanal excellence.
      </p>
      <div className="flex items-center gap-4 flex-wrap">
        <Link
          to="/catalogs"
          style={{
            backgroundColor: "#C8A45A",
            color: "#FFFFFF",
            fontSize: "12px",
            letterSpacing: "0.08em",
            padding: "12px 28px",
            borderRadius: "4px",
            fontWeight: 600,
            textTransform: "uppercase",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
          className="hover:opacity-90 transition-opacity"
        >
          Explore Now <ArrowRightIcon />
        </Link>
        <a
          href="#visualizer"
          style={{
            color: "rgba(255,255,255,0.80)",
            fontSize: "12px",
            letterSpacing: "0.08em",
            padding: "12px 24px",
            borderRadius: "4px",
            border: "1px solid rgba(255,255,255,0.30)",
            fontWeight: 500,
            textTransform: "uppercase",
          }}
          className="hover:border-white hover:text-white transition-all duration-200"
        >
          Try Visualizer
        </a>
      </div>
    </div>
  </section>
);

// ── Legacy Section ─────────────────────────────────────────────────────────
const LegacySection: React.FC = () => (
  <section
    style={{ backgroundColor: "#FAFAF8", paddingTop: "80px", paddingBottom: "80px" }}
    id="about"
  >
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Text */}
        <div>
          <p
            style={{
              color: "#C8A45A",
              fontSize: "10px",
              letterSpacing: "0.2em",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            Our Heritage
          </p>
          <h2
            style={{
              color: "#1A1814",
              fontSize: "clamp(26px, 3.5vw, 40px)",
              fontFamily: "Georgia, serif",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              marginBottom: "20px",
            }}
          >
            Legacy of Texture and Form
          </h2>
          <p style={{ color: "#6B6560", fontSize: "13px", lineHeight: 1.75, marginBottom: "14px" }}>
            For over three decades, we have sourced the world's finest textiles — from Belgian linens
            woven in centuries-old ateliers to Indian silks hand-dyed by master craftsmen. Each fabric
            in our collection is selected for its character, durability, and ability to transform a space.
          </p>
          <p style={{ color: "#6B6560", fontSize: "13px", lineHeight: 1.75, marginBottom: "30px" }}>
            Our curators travel to over 40 countries to discover materials that meet our exacting standards.
            The result is a library of over 2,000 fabrics, each one a testament to the art of textile making.
          </p>
          <a
            href="#"
            style={{
              color: "#C8A45A",
              fontSize: "12px",
              letterSpacing: "0.06em",
              fontWeight: 600,
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
            className="hover:opacity-80 transition-opacity"
          >
            Learn Our Story <ArrowRightIcon />
          </a>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-3">
            <div style={{ borderRadius: "6px", overflow: "hidden", aspectRatio: "3/4" }}>
              <img
                src="https://picsum.photos/seed/fabric-texture-anc1/500/670.jpg"
                alt="Fabric texture"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                className="hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div style={{ borderRadius: "6px", overflow: "hidden", aspectRatio: "1/1" }}>
              <img
                src="https://picsum.photos/seed/fabric-texture-anc2/500/500.jpg"
                alt="Fabric detail"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                className="hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
          <div className="space-y-3" style={{ paddingTop: "32px" }}>
            <div style={{ borderRadius: "6px", overflow: "hidden", aspectRatio: "1/1" }}>
              <img
                src="https://picsum.photos/seed/fabric-texture-anc3/500/500.jpg"
                alt="Woven fabric"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                className="hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div style={{ borderRadius: "6px", overflow: "hidden", aspectRatio: "3/4" }}>
              <img
                src="https://picsum.photos/seed/fabric-texture-anc4/500/670.jpg"
                alt="Silk drape"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                className="hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ── Stats Section ──────────────────────────────────────────────────────────
const stats = [
  { value: "40+", label: "Countries Sourced" },
  { value: "12k+", label: "Projects Completed" },
  { value: "85", label: "Expert Artisans" },
  { value: "500+", label: "Fabric Collections" },
];

const StatsSection: React.FC = () => (
  <section style={{ backgroundColor: "#F0EDE6", paddingTop: "48px", paddingBottom: "48px" }}>
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.value}
            style={{
              textAlign: "center",
              padding: "20px 16px",
              borderRight: i < stats.length - 1 ? "1px solid #D8D4CC" : "none",
              backgroundColor: i === stats.length - 1 ? "#C8A45A" : "transparent",
              borderRadius: i === stats.length - 1 ? "4px" : "0",
            }}
          >
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(28px, 4vw, 40px)",
                color: i === stats.length - 1 ? "#FFFFFF" : "#1A1814",
                fontWeight: 700,
                lineHeight: 1,
                marginBottom: "6px",
              }}
            >
              {stat.value}
            </p>
            <p
              style={{
                color: i === stats.length - 1 ? "rgba(255,255,255,0.80)" : "#8A857E",
                fontSize: "11px",
                letterSpacing: "0.04em",
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Collection Section ─────────────────────────────────────────────────────
const collectionItems = [
  {
    title: "The French Nappa II",
    category: "Upholstery",
    image: "https://picsum.photos/seed/collection-anc1/600/750.jpg",
  },
  {
    title: "Nord Sheer Terrace",
    category: "Curtain/Drape",
    image: "https://picsum.photos/seed/collection-anc2/600/750.jpg",
  },
  {
    title: "Marina Shade Stone",
    category: "Outdoor",
    image: "https://picsum.photos/seed/collection-anc3/600/750.jpg",
  },
];

const CollectionSection: React.FC = () => (
  <section
    style={{ backgroundColor: "#FAFAF8", paddingTop: "80px", paddingBottom: "80px" }}
    id="collections"
  >
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
        <div>
          <p
            style={{
              color: "#C8A45A",
              fontSize: "10px",
              letterSpacing: "0.2em",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            New Arrivals
          </p>
          <h2
            style={{
              color: "#1A1814",
              fontSize: "clamp(22px, 3vw, 36px)",
              fontFamily: "Georgia, serif",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
            }}
          >
            The 2024 Collection
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <p style={{ color: "#8A857E", fontSize: "12px" }}>
            Introducing our latest curated selection for discerning interiors.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {collectionItems.map((item) => (
          <div
            key={item.title}
            style={{ borderRadius: "6px", overflow: "hidden", cursor: "pointer" }}
            className="group"
          >
            <div style={{ aspectRatio: "4/5", overflow: "hidden", position: "relative" }}>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                className="group-hover:scale-105 transition-transform duration-700"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(20,18,14,0.5) 0%, transparent 50%)",
                  opacity: 0,
                }}
                className="group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <div style={{ padding: "14px 4px" }}>
              <p style={{ color: "#C8A45A", fontSize: "10px", letterSpacing: "0.12em", fontWeight: 600, marginBottom: "4px" }}>
                {item.category}
              </p>
              <h3 style={{ color: "#1A1814", fontSize: "14px", fontWeight: 600, letterSpacing: "0.01em" }}>
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "48px" }}>
        <Link
          to="/catalogs"
          style={{
            border: "1px solid #D5D0C8",
            color: "#1A1814",
            fontSize: "11px",
            letterSpacing: "0.1em",
            padding: "11px 32px",
            borderRadius: "4px",
            fontWeight: 500,
            textTransform: "uppercase",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
          className="hover:border-stone-500 hover:bg-stone-50 transition-all duration-200"
        >
          View Full Collection <ArrowRightIcon />
        </Link>
      </div>
    </div>
  </section>
);

// ── Visualizer Section ─────────────────────────────────────────────────────
const VisualizerSection: React.FC = () => (
  <section
    style={{ backgroundColor: "#1A1814", paddingTop: "80px", paddingBottom: "80px" }}
    id="visualizer"
  >
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left */}
        <div>
          <p
            style={{
              color: "#C8A45A",
              fontSize: "10px",
              letterSpacing: "0.2em",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            Design Tool
          </p>
          <h2
            style={{
              color: "#FFFFFF",
              fontSize: "clamp(22px, 3vw, 36px)",
              fontFamily: "Georgia, serif",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              marginBottom: "16px",
            }}
          >
            Interactive Fabric Visualizer
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", lineHeight: 1.75, marginBottom: "32px" }}>
            See how different fabrics and colors transform furniture pieces in real time.
            Experiment with combinations before making your final selection.
          </p>
          <ul style={{ marginBottom: "36px" }} className="space-y-3">
            {[
              "Realtime fabric rendering",
              "Dynamic Lighting Control",
            ].map((feat) => (
              <li key={feat} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: "#C8A45A" }}><CheckCircleIcon /></span>
                <span style={{ color: "rgba(255,255,255,0.70)", fontSize: "13px" }}>{feat}</span>
              </li>
            ))}
          </ul>
          <Link
            to="/mockup"
            style={{
              backgroundColor: "#C8A45A",
              color: "#FFFFFF",
              fontSize: "11px",
              letterSpacing: "0.08em",
              padding: "11px 24px",
              borderRadius: "4px",
              fontWeight: 600,
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
            className="hover:opacity-90 transition-opacity"
          >
            Try Now <ArrowRightIcon />
          </Link>
        </div>

        {/* Right – visualizer preview */}
        <div
          style={{
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid rgba(200,164,90,0.25)",
            aspectRatio: "16/10",
            backgroundColor: "#252118",
          }}
        >
          <img
            src="https://picsum.photos/seed/visualizer-anc/800/500.jpg"
            alt="Fabric Visualizer"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.75 }}
          />
        </div>
      </div>
    </div>
  </section>
);

// ── Spaces Section ─────────────────────────────────────────────────────────
const spaces = [
  {
    title: "Residential",
    image: "https://picsum.photos/seed/space-residential/600/400.jpg",
  },
  {
    title: "Commercial",
    image: "https://picsum.photos/seed/space-commercial/600/400.jpg",
  },
  {
    title: "Corporate",
    image: "https://picsum.photos/seed/space-corporate/600/400.jpg",
  },
];

const SpacesSection: React.FC = () => (
  <section
    style={{ backgroundColor: "#FAFAF8", paddingTop: "80px", paddingBottom: "80px" }}
    id="services"
  >
    <div className="max-w-7xl mx-auto px-6">
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p
          style={{
            color: "#C8A45A",
            fontSize: "10px",
            letterSpacing: "0.2em",
            fontWeight: 700,
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Tailored Solutions
        </p>
        <h2
          style={{
            color: "#1A1814",
            fontSize: "clamp(22px, 3vw, 36px)",
            fontFamily: "Georgia, serif",
            letterSpacing: "-0.01em",
          }}
        >
          Solutions for Every Space
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {spaces.map((space) => (
          <div
            key={space.title}
            style={{
              borderRadius: "6px",
              overflow: "hidden",
              position: "relative",
              height: "260px",
              cursor: "pointer",
            }}
            className="group"
          >
            <img
              src={space.image}
              alt={space.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              className="group-hover:scale-105 transition-transform duration-700"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(20,18,14,0.72) 0%, rgba(20,18,14,0.10) 60%)",
              }}
            />
            <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
              <h3
                style={{
                  color: "#FFFFFF",
                  fontFamily: "Georgia, serif",
                  fontSize: "18px",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                }}
              >
                {space.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Testimonial Section ────────────────────────────────────────────────────
const TestimonialSection: React.FC = () => (
  <section style={{ backgroundColor: "#FAFAF8", paddingTop: "80px", paddingBottom: "80px" }}>
    <div className="max-w-4xl mx-auto px-6 text-center">
      {/* Big quote mark */}
      <div
        style={{
          color: "#C8A45A",
          fontSize: "72px",
          fontFamily: "Georgia, serif",
          lineHeight: 0.8,
          marginBottom: "20px",
          opacity: 0.9,
        }}
      >
        "
      </div>
      <blockquote
        style={{
          color: "#1A1814",
          fontFamily: "Georgia, serif",
          fontSize: "clamp(18px, 2.5vw, 26px)",
          fontStyle: "italic",
          lineHeight: 1.55,
          letterSpacing: "-0.01em",
          marginBottom: "32px",
          maxWidth: "700px",
          margin: "0 auto 32px auto",
        }}
      >
        "ANC NAJJAR is our first choice for every project. Their understanding of textile weight
        and drape is unparalleled in the region."
      </blockquote>
      <div>
        <p style={{ color: "#1A1814", fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>
          ANC NAJJAR
        </p>
        <p style={{ color: "#8A857E", fontSize: "12px" }}>Interior Design Studio · Dubai</p>
      </div>
    </div>
  </section>
);

// ── CTA Section ────────────────────────────────────────────────────────────
const CTASection: React.FC = () => (
  <section style={{ backgroundColor: "#F0EDE6", paddingTop: "80px", paddingBottom: "80px" }}>
    <div className="max-w-3xl mx-auto px-6 text-center">
      <p
        style={{
          color: "#C8A45A",
          fontSize: "10px",
          letterSpacing: "0.2em",
          fontWeight: 700,
          textTransform: "uppercase",
          marginBottom: "14px",
        }}
      >
        Bespoke Consultation
      </p>
      <h2
        style={{
          color: "#1A1814",
          fontFamily: "Georgia, serif",
          fontSize: "clamp(22px, 3vw, 36px)",
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
          marginBottom: "16px",
        }}
      >
        Request a Curator Consultation
      </h2>
      <p
        style={{
          color: "#6B6560",
          fontSize: "13px",
          lineHeight: 1.75,
          maxWidth: "520px",
          margin: "0 auto 36px auto",
        }}
      >
        Schedule a private consultation with our fabric specialists. We'll help you select the
        perfect textiles for your project, with sample delivery to your door.
      </p>
      <button
        style={{
          backgroundColor: "#1A1814",
          color: "#FFFFFF",
          fontSize: "11px",
          letterSpacing: "0.12em",
          padding: "14px 40px",
          borderRadius: "4px",
          fontWeight: 600,
          textTransform: "uppercase",
        }}
        className="hover:opacity-80 transition-opacity"
      >
        Book Now
      </button>
    </div>
  </section>
);

// ── Footer ─────────────────────────────────────────────────────────────────
const Footer: React.FC = () => (
  <footer style={{ backgroundColor: "#F5F3EF", borderTop: "1px solid #E0DDD6" }}>
    <div className="max-w-7xl mx-auto px-6 pt-14 pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
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
          <p style={{ color: "#8A857E", fontSize: "12px", lineHeight: 1.7 }}>
            Pioneers in luxury textile craftsmanship and interior design solutions since 1994.
          </p>
        </div>

        <div>
          <p style={{ color: "#1A1814", fontSize: "11px", letterSpacing: "0.12em", fontWeight: 700, textTransform: "uppercase", marginBottom: "16px" }}>
            Collections
          </p>
          {["Catalog", "Curtains", "Upholstery", "Outdoor"].map((item) => (
            <a
              key={item}
              href="#"
              style={{ color: "#8A857E", fontSize: "12px", display: "block", marginBottom: "10px" }}
              className="hover:text-stone-800 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div>
          <p style={{ color: "#1A1814", fontSize: "11px", letterSpacing: "0.12em", fontWeight: 700, textTransform: "uppercase", marginBottom: "16px" }}>
            Company
          </p>
          {["Services", "About Us", "Contact", "FAQ", "Privacy Policy"].map((item) => (
            item === "FAQ" ? <Link key={item} to="/faq" style={{ color: "#8A857E", fontSize: "12px", display: "block", marginBottom: "10px" }}>FAQ</Link> : <a
              key={item}
              href="#"
              style={{ color: "#8A857E", fontSize: "12px", display: "block", marginBottom: "10px" }}
              className="hover:text-stone-800 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div>
          <p style={{ color: "#1A1814", fontSize: "11px", letterSpacing: "0.12em", fontWeight: 700, textTransform: "uppercase", marginBottom: "16px" }}>
            Contact
          </p>
          {[
            "123 Design District, Dubai",
            "hello@ancnajjar.com",
            "+971 4 123 4567",
          ].map((item) => (
            <p key={item} style={{ color: "#8A857E", fontSize: "12px", marginBottom: "10px", lineHeight: 1.5 }}>
              {item}
            </p>
          ))}
        </div>
      </div>

      <div
        style={{ borderTop: "1px solid #D5D0C8", paddingTop: "20px" }}
        className="flex flex-col md:flex-row items-center justify-between gap-3"
      >
        <p style={{ color: "#B0ABA5", fontSize: "11px" }}>© 2024 ANC NAJJAR FURNITURE. All rights reserved.</p>
        <div className="flex items-center gap-5">
          {["Terms of Service", "Cookie Policy"].map((item) => (
            <a
              key={item}
              href="#"
              style={{ color: "#B0ABA5", fontSize: "11px" }}
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

// ── Main Page ──────────────────────────────────────────────────────────────
const Home: React.FC = () => (
  <div style={{ backgroundColor: "#FAFAF8", fontFamily: "Inter, system-ui, sans-serif" }}>
    <Navbar />
    <HeroSection />
    <LegacySection />
    <StatsSection />
    <CollectionSection />
    <VisualizerSection />
    <SpacesSection />
    <TestimonialSection />
    <CTASection />
    <Footer />
  </div>
);

export default Home;
