import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
const MailIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const FireIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14h2" />
  </svg>
);
const DropIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a6 6 0 006-6c0-4-6-10-6-10S6 11 6 15a6 6 0 006 6z" />
  </svg>
);
const LeafIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);
const DiamondIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);
const ShowroomIcon: React.FC = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12l-4-4-4 4M12 8v8" />
  </svg>
);
const PlayIcon: React.FC = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
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
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            const inner = (
              <span
                style={{
                  color: isActive ? "#1A1814" : "#6B6560",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  borderBottom: isActive ? "2px solid #8A692D" : "2px solid transparent",
                  paddingBottom: "2px",
                  fontWeight: 600,
                  textTransform: "uppercase"
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
        <div className="hidden lg:flex items-center gap-4">
          <button style={{ color: "#6B6560", fontSize: "10px", letterSpacing: "0.08em", fontWeight: 600 }}>
            EN/AR
          </button>
          <Link to="/request-sample"
            style={{
              backgroundColor: "#8A692D",
              color: "#FFFFFF",
              fontSize: "10px",
              letterSpacing: "0.1em",
              padding: "10px 18px",
              borderRadius: "2px",
              fontWeight: 600,
              textTransform: "uppercase"
            }}
            className="hover:opacity-90 transition-opacity"
          >
            REQUEST SAMPLE
          </Link>
        </div>
        <button className="lg:hidden" style={{ color: "#1A1814" }} onClick={() => setOpen(!open)}>
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-stone-50 border-t border-stone-200 px-6 py-5 space-y-4">
          {navLinks.map((link) => (
             <Link key={link.label} to={link.to} className="block text-stone-600 text-xs tracking-wider uppercase font-semibold">
               {link.label}
             </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

// ── Footer ─────────────────────────────────────────────────────────────────
const Footer: React.FC = () => (
  <footer style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid #EAE8E3" }}>
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        <div>
          <p style={{ fontFamily: "Georgia, serif", color: "#1A1814", fontSize: "15px", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "10px" }}>
            ANC NAJJAR
          </p>
          <p style={{ color: "#6B6560", fontSize: "11px", lineHeight: 1.7 }}>
            Redefining luxury through architectural precision and heritage craftsmanship in bespoke furniture design.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <span style={{ cursor: "pointer", color: "#1A1814" }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.176 17.51a1.2 1.2 0 01-1.688.35c-4.48-2.61-9.97-3.23-16.51-1.78a1.2 1.2 0 01-.6-2.33c7.09-1.58 13.16-.88 18.17 2.05a1.2 1.2 0 01.628 1.71zm.17-5.59c-4.46-2.58-9.45-3.07-16.51-1.64a1.2 1.2 0 01-.58-2.32c7.87-1.6 13.56-1.04 18.63 1.86a1.2 1.2 0 01-1.54 2.1zm.14-5.6C12.39 3.37 6.47 3.2 1.95 4.62a1.2 1.2 0 01-.76-2.28C6.39.68 12.98.88 18.06 3.9a1.2 1.2 0 01-1.2 2.02z" /></svg>
            </span>
            <span style={{ cursor: "pointer", color: "#1A1814" }}>
              <MailIcon />
            </span>
          </div>
        </div>

        <div>
          <p style={{ color: "#1A1814", fontSize: "10px", letterSpacing: "0.12em", fontWeight: 700, textTransform: "uppercase", marginBottom: "16px" }}>EXPLORE</p>
          {["Catalogs", "Services", "Contact"].map(item => (
            <a key={item} href="#" style={{ color: "#6B6560", fontSize: "11px", display: "block", marginBottom: "10px" }}>{item}</a>
          ))}
        </div>
        
        <div>
          <p style={{ visibility: "hidden", fontSize: "10px", marginBottom: "16px" }}>LEGAL</p>
          {["Privacy Policy", "Terms of Use"].map(item => (
            <a key={item} href="#" style={{ color: "#6B6560", fontSize: "11px", display: "block", marginBottom: "10px" }}>{item}</a>
          ))}
        </div>

        <div>
          <p style={{ color: "#1A1814", fontSize: "10px", letterSpacing: "0.12em", fontWeight: 700, textTransform: "uppercase", marginBottom: "16px" }}>NEWSLETTER</p>
          <p style={{ color: "#6B6560", fontSize: "11px", marginBottom: "12px", lineHeight: 1.5 }}>
            Stay updated with our latest collections and textile innovations.
          </p>
          <div className="flex items-center" style={{ borderBottom: "1px solid #D6D2C9", paddingBottom: "6px" }}>
            <input type="email" placeholder="Email Address" style={{ backgroundColor: "transparent", fontSize: "11px", width: "100%", outline: "none", color: "#1A1814" }} />
            <button style={{ color: "#8A692D" }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid #EAE8E3", paddingTop: "20px", textAlign: "left" }}>
        <p style={{ color: "#8A857E", fontSize: "10px" }}>© 2024 ANC NAJJAR FURNITURE. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export const Services: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#FAFAF8", fontFamily: "Inter, system-ui, sans-serif", minHeight: "100vh" }} className="flex flex-col">
      <Navbar />

      <main className="flex-1">
        
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p style={{ color: "#C8A45A", fontSize: "10px", letterSpacing: "0.2em", fontWeight: 700, textTransform: "uppercase", marginBottom: "20px" }}>
                OUR EXPERTISE
              </p>
              <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(40px, 6vw, 64px)", color: "#1A1814", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "24px" }}>
                Elevated Textiles<br />for<br />
                <span style={{ fontStyle: "italic", fontWeight: 400 }}>Refined Interiors</span>
              </h1>
              <p style={{ color: "#6B6560", fontSize: "14px", lineHeight: 1.6, maxWidth: "480px" }}>
                From meticulous fabric sourcing to bespoke consultation, we provide end-to-end solutions for architects, designers, and luxury retailers.
              </p>
            </div>
            <div style={{ position: "relative" }}>
              <img 
                src="https://picsum.photos/seed/anc-fabrics/800/600.jpg" 
                alt="Refined Textiles" 
                style={{ width: "100%", height: "auto", objectFit: "cover" }} 
              />
              <div style={{ position: "absolute", bottom: "-20px", left: "-20px", backgroundColor: "#7F6218", color: "#FFFFFF", padding: "40px", width: "240px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
                <p style={{ fontSize: "28px", fontWeight: 600, fontFamily: "Georgia, serif", marginBottom: "4px" }}>50+</p>
                <p style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>YEARS OF HERITAGE</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid Section */}
        <div style={{ backgroundColor: "#F4F3F0", padding: "100px 0" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 relative">
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(28px, 4vw, 36px)", color: "#1A1814", marginBottom: "16px" }}>
                Comprehensive Services
              </h2>
              <div style={{ width: "40px", height: "1px", backgroundColor: "#8A692D", margin: "0 auto" }}></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Card 1 */}
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #EAE8E3" }} className="flex flex-col group">
                <div style={{ position: "relative" }}>
                  <img src="https://picsum.photos/seed/anc-service1/600/400.jpg" alt="Fabric Supply" style={{ width: "100%", height: "240px", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: "16px", left: "16px", backgroundColor: "#FFFFFF", padding: "4px 8px", fontSize: "10px", fontWeight: 600, color: "#1A1814" }}>01</div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 style={{ fontSize: "18px", color: "#1A1814", fontWeight: 600, marginBottom: "12px" }}>Fabric Supply</h3>
                  <p style={{ fontSize: "13px", color: "#6B6560", lineHeight: 1.6, marginBottom: "32px", flex: 1 }}>
                    Access an extensive library of premium upholstery and drapery fabrics sourced from the world's most prestigious mills.
                  </p>
                  <button style={{ border: "1px solid #1A1814", color: "#1A1814", backgroundColor: "transparent", fontSize: "10px", letterSpacing: "0.1em", fontWeight: 600, padding: "12px", width: "100%", textTransform: "uppercase" }} className="hover:bg-stone-900 hover:text-white transition-colors duration-300">
                    INQUIRE NOW
                  </button>
                </div>
              </div>

              {/* Card 2 */}
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #EAE8E3" }} className="flex flex-col group">
                <div style={{ position: "relative" }}>
                  <img src="https://picsum.photos/seed/anc-service2/600/400.jpg" alt="Interior Consultation" style={{ width: "100%", height: "240px", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: "16px", left: "16px", backgroundColor: "#FFFFFF", padding: "4px 8px", fontSize: "10px", fontWeight: 600, color: "#1A1814" }}>02</div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 style={{ fontSize: "18px", color: "#1A1814", fontWeight: 600, marginBottom: "12px" }}>Interior Consultation</h3>
                  <p style={{ fontSize: "13px", color: "#6B6560", lineHeight: 1.6, marginBottom: "32px", flex: 1 }}>
                    Collaborative design sessions with our textile experts to select the perfect material after your specific architectural project requirements.
                  </p>
                  <button style={{ border: "1px solid #1A1814", color: "#1A1814", backgroundColor: "transparent", fontSize: "10px", letterSpacing: "0.1em", fontWeight: 600, padding: "12px", width: "100%", textTransform: "uppercase" }} className="hover:bg-stone-900 hover:text-white transition-colors duration-300">
                    INQUIRE NOW
                  </button>
                </div>
              </div>

              {/* Card 3 */}
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #EAE8E3" }} className="flex flex-col group">
                <div style={{ position: "relative" }}>
                  <img src="https://picsum.photos/seed/anc-service3/600/400.jpg" alt="Custom Orders" style={{ width: "100%", height: "240px", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: "16px", left: "16px", backgroundColor: "#FFFFFF", padding: "4px 8px", fontSize: "10px", fontWeight: 600, color: "#1A1814" }}>03</div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 style={{ fontSize: "18px", color: "#1A1814", fontWeight: 600, marginBottom: "12px" }}>Custom Orders</h3>
                  <p style={{ fontSize: "13px", color: "#6B6560", lineHeight: 1.6, marginBottom: "32px", flex: 1 }}>
                    Bespoke manufacturing capabilities including custom colorways, unique weaving patterns, and specific performance treatments.
                  </p>
                  <button style={{ border: "1px solid #1A1814", color: "#1A1814", backgroundColor: "transparent", fontSize: "10px", letterSpacing: "0.1em", fontWeight: 600, padding: "12px", width: "100%", textTransform: "uppercase" }} className="hover:bg-stone-900 hover:text-white transition-colors duration-300">
                    INQUIRE NOW
                  </button>
                </div>
              </div>

              {/* Card 4 */}
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #EAE8E3" }} className="flex flex-col group">
                <div style={{ position: "relative" }}>
                  <img src="https://picsum.photos/seed/anc-service4/600/400.jpg" alt="Sample Delivery" style={{ width: "100%", height: "240px", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: "16px", left: "16px", backgroundColor: "#FFFFFF", padding: "4px 8px", fontSize: "10px", fontWeight: 600, color: "#1A1814" }}>04</div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 style={{ fontSize: "18px", color: "#1A1814", fontWeight: 600, marginBottom: "12px" }}>Sample Delivery</h3>
                  <p style={{ fontSize: "13px", color: "#6B6560", lineHeight: 1.6, marginBottom: "32px", flex: 1 }}>
                    Priority worldwide shipping of physical fabric swatches to ensure the material meets your sensory and visual expectations before order.
                  </p>
                  <button style={{ border: "1px solid #1A1814", color: "#1A1814", backgroundColor: "transparent", fontSize: "10px", letterSpacing: "0.1em", fontWeight: 600, padding: "12px", width: "100%", textTransform: "uppercase" }} className="hover:bg-stone-900 hover:text-white transition-colors duration-300">
                    INQUIRE NOW
                  </button>
                </div>
              </div>

              {/* Card 5 */}
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #EAE8E3" }} className="flex flex-col group">
                <div style={{ position: "relative" }}>
                  <img src="https://picsum.photos/seed/anc-service5/600/400.jpg" alt="B2B Wholesale" style={{ width: "100%", height: "240px", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: "16px", left: "16px", backgroundColor: "#FFFFFF", padding: "4px 8px", fontSize: "10px", fontWeight: 600, color: "#1A1814" }}>05</div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 style={{ fontSize: "18px", color: "#1A1814", fontWeight: 600, marginBottom: "12px" }}>B2B Wholesale</h3>
                  <p style={{ fontSize: "13px", color: "#6B6560", lineHeight: 1.6, marginBottom: "32px", flex: 1 }}>
                    Scalable solutions for furniture manufacturers and retailers with tiered pricing models and dedicated account management support.
                  </p>
                  <button style={{ border: "1px solid #1A1814", color: "#1A1814", backgroundColor: "transparent", fontSize: "10px", letterSpacing: "0.1em", fontWeight: 600, padding: "12px", width: "100%", textTransform: "uppercase" }} className="hover:bg-stone-900 hover:text-white transition-colors duration-300">
                    INQUIRE NOW
                  </button>
                </div>
              </div>

              {/* Card 6 - Virtual Showroom */}
              <div style={{ backgroundColor: "#7F6218", color: "#FFFFFF" }} className="flex flex-col items-center justify-center p-12 text-center group">
                <div className="mb-6"><ShowroomIcon /></div>
                <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px" }}>Virtual Showroom</h3>
                <p style={{ fontSize: "13px", lineHeight: 1.6, marginBottom: "32px", opacity: 0.9 }}>
                  Explore our entire collection from the comfort of your office through our 3D immersive experience.
                </p>
                <button 
                  onClick={() => navigate('/mockup')}
                  style={{ backgroundColor: "#FFFFFF", color: "#7F6218", fontSize: "10px", letterSpacing: "0.1em", fontWeight: 600, padding: "12px", width: "100%", textTransform: "uppercase" }} 
                  className="hover:bg-stone-100 transition-colors duration-300"
                >
                  LAUNCH EXPERIENCE
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Certified Performance Section */}
        <div style={{ backgroundColor: "#F0EEED" }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2">
              <div className="px-6 py-20 lg:p-24 flex flex-col justify-center">
                <h2 style={{ fontSize: "24px", color: "#1A1814", fontWeight: 600, marginBottom: "16px" }}>Certified Performance</h2>
                <p style={{ fontSize: "14px", color: "#6B6560", lineHeight: 1.6, marginBottom: "40px", maxWidth: "400px" }}>
                  Our textiles aren't just beautiful - they are engineered to withstand the rigors of high-traffic commercial environments.
                </p>
                <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                  <div className="flex items-center gap-3">
                    <div style={{ color: "#8A692D" }}><FireIcon /></div>
                    <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.05em", color: "#1A1814" }}>FIRE RETARDANT</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div style={{ color: "#8A692D" }}><DropIcon /></div>
                    <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.05em", color: "#1A1814" }}>STAIN RESISTANT</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div style={{ color: "#8A692D" }}><LeafIcon /></div>
                    <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.05em", color: "#1A1814" }}>ECO-CERTIFIED</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div style={{ color: "#8A692D" }}><DiamondIcon /></div>
                    <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.05em", color: "#1A1814" }}>HIGH MARTINDALE</span>
                  </div>
                </div>
              </div>
              <div style={{ position: "relative", minHeight: "400px" }}>
                <img 
                  src="https://picsum.photos/seed/anc-lab/800/800.jpg" 
                  alt="Lab Testing" 
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} 
                />
                <button style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "64px", height: "64px", backgroundColor: "rgba(255,255,255,0.3)", backdropFilter: "blur(4px)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF" }}>
                  <PlayIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ backgroundColor: "#FFFFFF", padding: "100px 0", textAlign: "center" }}>
          <div className="max-w-2xl mx-auto px-6">
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(32px, 5vw, 44px)", color: "#1A1814", letterSpacing: "-0.02em", marginBottom: "20px", lineHeight: 1.1 }}>
              Ready to start your<br />project?
            </h2>
            <p style={{ fontSize: "13px", color: "#6B6560", lineHeight: 1.6, marginBottom: "40px" }}>
              Contact our dedicated team for a personalized quotation or to book a visit to our flagship showroom.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => navigate('/contact')}
                style={{ backgroundColor: "#1A1814", color: "#FFFFFF", fontSize: "10px", letterSpacing: "0.1em", fontWeight: 600, padding: "14px 32px", textTransform: "uppercase" }} className="hover:opacity-90 transition-opacity">
                CONTACT SALES
              </button>
              <button style={{ border: "1px solid #1A1814", color: "#1A1814", backgroundColor: "transparent", fontSize: "10px", letterSpacing: "0.1em", fontWeight: 600, padding: "14px 32px", textTransform: "uppercase" }} className="hover:bg-stone-50 transition-colors">
                DOWNLOAD BROCHURE
              </button>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default Services;
