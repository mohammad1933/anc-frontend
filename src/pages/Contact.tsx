import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { img as textileImages } from "@/pages/AboutUs";
import { businessPolicies, company, whatsappUrl } from "@/constants/company";

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
const PhoneIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const MailIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const MapPinIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const ChatIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);
const ChevronDownIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

// ── Nav links data ─────────────────────────────────────────────────────────
const navLinks = [
  { label: "HOME", to: "/" },
  { label: "CATALOGS", to: "/catalogs" },
  { label: "PRODUCT", to: "/product" },
  { label: "CONTACT", to: "/contact" },
  { label: "FABRIC MOCKUP", to: "/mockup" },
  { label: "SERVICES", to: "/#services" },
  { label: "ABOUT US", to: "/about-us" },
  { label: "DASHBOARD", to: "/dashboard" },
];

// ── Navbar ─────────────────────────────────────────────────────────────────
export const LegacyContactNavbar: React.FC = () => {
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
export const LegacyContactFooter: React.FC = () => (
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
          {["Catalogs", "Contact", "Newsletter"].map(item => (
            <a key={item} href="#" style={{ color: "#6B6560", fontSize: "11px", display: "block", marginBottom: "10px" }}>{item}</a>
          ))}
        </div>
        
        <div>
          <p style={{ visibility: "hidden", fontSize: "10px", marginBottom: "16px" }}>SPACER</p>
          {["Services", "Privacy Policy"].map(item => (
            <a key={item} href="#" style={{ color: "#6B6560", fontSize: "11px", display: "block", marginBottom: "10px" }}>{item}</a>
          ))}
        </div>

        <div>
          <p style={{ color: "#1A1814", fontSize: "10px", letterSpacing: "0.12em", fontWeight: 700, textTransform: "uppercase", marginBottom: "16px" }}>JOIN OUR NEWSLETTER</p>
          <p style={{ color: "#6B6560", fontSize: "11px", marginBottom: "12px", lineHeight: 1.5 }}>
            Receive exclusive invitations to collection previews and design events.
          </p>
          <div className="flex">
            <input type="email" placeholder="Email Address" style={{ border: "1px solid #EAE8E3", backgroundColor: "#FAF9F6", padding: "8px 12px", fontSize: "11px", width: "100%", outline: "none" }} />
            <button style={{ backgroundColor: "#1A1814", color: "#FFFFFF", fontSize: "10px", letterSpacing: "0.1em", padding: "0 16px", fontWeight: 600 }}>JOIN</button>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid #EAE8E3", paddingTop: "20px", textAlign: "center" }}>
        <p style={{ color: "#8A857E", fontSize: "10px" }}>© 2024 ANC NAJJAR FURNITURE. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export const Contact: React.FC = () => {
  return (
    <div style={{ backgroundColor: "#FAFAF8", fontFamily: "Inter, system-ui, sans-serif", minHeight: "100vh" }} className="flex flex-col">

      <main className="flex-1">
        
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
          <p style={{ color: "#C8A45A", fontSize: "10px", letterSpacing: "0.2em", fontWeight: 700, textTransform: "uppercase", marginBottom: "12px" }}>
            GET IN TOUCH
          </p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(36px, 5vw, 48px)", color: "#1A1814", letterSpacing: "-0.02em", marginBottom: "16px", lineHeight: 1.1 }}>
            We're here to help you create <br className="hidden md:block" /> your <span style={{ fontStyle: "italic", fontWeight: 400 }}>perfect space.</span>
          </h1>
          <p style={{ color: "#6B6560", fontSize: "13px", lineHeight: 1.6, maxWidth: "560px" }}>
            Contact our Sharjah team for catalog inquiries, stock checks, samples, quotations,
            wholesale orders, retail orders, and delivery support.
          </p>
        </div>

        {/* Contact Form & Info */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            
            {/* Form */}
            <div style={{ backgroundColor: "#FFFFFF", borderRadius: "4px", padding: "32px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#1A1814", marginBottom: "24px" }}>Send an Inquiry</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label style={{ display: "block", fontSize: "9px", letterSpacing: "0.15em", color: "#8A857E", textTransform: "uppercase", marginBottom: "8px" }}>FULL NAME</label>
                  <input type="text" placeholder="John Doe" style={{ width: "100%", borderBottom: "1px solid #EAE8E3", padding: "8px 0", fontSize: "12px", color: "#1A1814", outline: "none", backgroundColor: "transparent" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "9px", letterSpacing: "0.15em", color: "#8A857E", textTransform: "uppercase", marginBottom: "8px" }}>EMAIL ADDRESS</label>
                  <input type="email" placeholder="john@example.com" style={{ width: "100%", borderBottom: "1px solid #EAE8E3", padding: "8px 0", fontSize: "12px", color: "#1A1814", outline: "none", backgroundColor: "transparent" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "9px", letterSpacing: "0.15em", color: "#8A857E", textTransform: "uppercase", marginBottom: "8px" }}>DEPARTMENT</label>
                  <select style={{ width: "100%", borderBottom: "1px solid #EAE8E3", padding: "8px 0", fontSize: "12px", color: "#1A1814", outline: "none", backgroundColor: "transparent", WebkitAppearance: "none", cursor: "pointer" }}>
                    <option>Sales & Commercial</option>
                    <option>Support</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "9px", letterSpacing: "0.15em", color: "#8A857E", textTransform: "uppercase", marginBottom: "8px" }}>PHONE NUMBER</label>
                  <input type="text" placeholder="+971 00 000 0000" style={{ width: "100%", borderBottom: "1px solid #EAE8E3", padding: "8px 0", fontSize: "12px", color: "#1A1814", outline: "none", backgroundColor: "transparent" }} />
                </div>
              </div>

              <div className="mb-10">
                <label style={{ display: "block", fontSize: "9px", letterSpacing: "0.15em", color: "#8A857E", textTransform: "uppercase", marginBottom: "8px" }}>YOUR MESSAGE</label>
                <input type="text" placeholder="How can our design team assist you today?" style={{ width: "100%", borderBottom: "1px solid #EAE8E3", padding: "8px 0", fontSize: "12px", color: "#1A1814", outline: "none", backgroundColor: "transparent" }} />
              </div>

              <button style={{ backgroundColor: "#1A1814", color: "#FFFFFF", fontSize: "10px", letterSpacing: "0.1em", fontWeight: 600, padding: "12px 24px", textTransform: "uppercase" }}>
                SEND MESSAGE
              </button>
            </div>

            {/* Info Cards */}
            <div className="space-y-6">
              <div style={{ backgroundColor: "#F0EDE6", borderRadius: "4px", padding: "32px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#1A1814", marginBottom: "20px" }}>Contact Information</h3>
                
                <div className="space-y-5">
                  <div className="flex gap-4">
                    <div style={{ width: "32px", height: "32px", backgroundColor: "#FFFFFF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#8A692D" }}>
                      <PhoneIcon />
                    </div>
                    <div>
                      <p style={{ fontSize: "9px", letterSpacing: "0.1em", color: "#8A857E", textTransform: "uppercase", marginBottom: "2px" }}>PHONE</p>
                      <a href={company.phoneHref} style={{ fontSize: "12px", color: "#1A1814", fontWeight: 500 }}>{company.phoneDisplay}</a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div style={{ width: "32px", height: "32px", backgroundColor: "#FFFFFF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#8A692D" }}>
                      <ChatIcon />
                    </div>
                    <div>
                      <p style={{ fontSize: "9px", letterSpacing: "0.1em", color: "#8A857E", textTransform: "uppercase", marginBottom: "2px" }}>WHATSAPP</p>
                      <a href={whatsappUrl()} target="_blank" rel="noreferrer" style={{ fontSize: "12px", color: "#1A1814", fontWeight: 500 }}>+971 56 412 7448</a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div style={{ width: "32px", height: "32px", backgroundColor: "#FFFFFF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#8A692D" }}>
                      <MailIcon />
                    </div>
                    <div>
                      <p style={{ fontSize: "9px", letterSpacing: "0.1em", color: "#8A857E", textTransform: "uppercase", marginBottom: "2px" }}>EMAIL</p>
                      <a href={`mailto:${company.email}`} style={{ fontSize: "12px", color: "#1A1814", fontWeight: 500 }}>{company.email}</a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div style={{ width: "32px", height: "32px", backgroundColor: "#FFFFFF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#8A692D", flexShrink: 0 }}>
                      <MapPinIcon />
                    </div>
                    <div>
                      <p style={{ fontSize: "9px", letterSpacing: "0.1em", color: "#8A857E", textTransform: "uppercase", marginBottom: "2px" }}>ADDRESS</p>
                      <p style={{ fontSize: "12px", color: "#1A1814", fontWeight: 500, lineHeight: 1.5 }}>
                        {company.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: "#2C2A26", borderRadius: "4px", padding: "32px", color: "#FFFFFF" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "20px" }}>Showroom Hours</h3>
                <div className="space-y-4">
                  <div className="flex justify-between" style={{ fontSize: "11px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "12px" }}>
                    <span style={{ color: "#A8A39C" }}>Saturday - Thursday</span>
                    <span>09:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between" style={{ fontSize: "11px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "12px" }}>
                    <span style={{ color: "#A8A39C" }}>Daily Break</span>
                    <span>14:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between" style={{ fontSize: "11px" }}>
                    <span style={{ color: "#A8A39C" }}>Friday</span>
                    <span style={{ color: "#C8A45A", fontWeight: 500 }}>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div style={{ backgroundColor: "#EAE8E3", position: "relative", overflow: "hidden" }}>
          
          <img 
            src={textileImages.shop} 
            alt="Map"
            style={{ width: "100%", height: "400px", objectFit: "cover", opacity: 0.6 }} 
          />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <a href={company.mapsUrl} target="_blank" rel="noreferrer" style={{ backgroundColor: "#1A1814", color: "#FFFFFF", fontSize: "10px", letterSpacing: "0.1em", fontWeight: 600, padding: "12px 24px", borderRadius: "30px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
              <MapPinIcon /> VISIT ANC NAJJAR
            </a>
          </div>
        </div>
        <div style={{ backgroundColor: "#EAE8E3", paddingBottom: "40px", textAlign: "center" }}>
           <p style={{ fontFamily: "Georgia, serif", color: "#1A1814", fontSize: "16px", marginBottom: "6px" }}>{company.name}</p>
           <p style={{ color: "#6B6560", fontSize: "11px", lineHeight: 1.5, marginBottom: "8px" }}>{company.address}</p>
           <p style={{ color: "#1A1814", fontSize: "12px", fontWeight: 600, marginBottom: "2px" }}>Contact Us</p>
           <p style={{ color: "#6B6560", fontSize: "11px" }}>E: {company.email} · T: {company.phoneDisplay}</p>
        </div>

        {/* FAQ Section */}
        <div style={{ backgroundColor: "#FAFAF8", paddingTop: "80px", paddingBottom: "80px" }}>
          <div className="max-w-3xl mx-auto px-6">
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(24px, 3vw, 32px)", color: "#1A1814", letterSpacing: "-0.01em", marginBottom: "12px", textAlign: "center" }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: "#6B6560", fontSize: "12px", textAlign: "center", marginBottom: "40px" }}>
              Quick answers about fabric orders, samples, delivery, payment, and returns.
            </p>

            <div className="space-y-4">
              {[
                businessPolicies.samples,
                businessPolicies.delivery,
                businessPolicies.minimumOrder,
                businessPolicies.returns
              ].map(q => (
                <div key={q} style={{ backgroundColor: "#F4F3F0", padding: "20px 24px", borderRadius: "4px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                  <p style={{ color: "#1A1814", fontSize: "12px", fontWeight: 500 }}>{q}</p>
                  <span style={{ color: "#6B6560" }}><ChevronDownIcon /></span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Contact;
