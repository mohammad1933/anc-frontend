import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./PublicLayout.css";
import { company, whatsappUrl } from "@/constants/company";

const links = [
  ["HOME", "/"],
  ["CATALOGS", "/catalogs"],
  ["FABRIC MOCKUP", "/mockup"],
  ["SERVICES", "/services"],
  ["ABOUT US", "/about-us"],
  ["FAQ", "/faq"],
  ["DASHBOARD", "/dashboard"],
];

export default function PublicLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="public-layout">
      <header className="public-header">
        <div className="public-nav">
          <Link className="public-brand" to="/" aria-label="ANC Furnishing Fabrics home">
            <img src="/images/anc-logo.jpeg" alt="ANC Furnishing Fabrics" />
            <span>{company.name}</span>
          </Link>
          <nav className="public-links">
            {links.map(([label, to]) => <Link className={pathname === to ? "active" : ""} to={to} key={to}>{label}</Link>)}
          </nav>
          <div className="public-actions">
            <button type="button">EN/AR</button>
            <a href={whatsappUrl()} target="_blank" rel="noreferrer">WHATSAPP</a>
          </div>
          <button className="public-menu" type="button" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? "×" : "☰"}</button>
        </div>
        {open && <nav className="public-mobile">{links.map(([label, to]) => <Link onClick={() => setOpen(false)} to={to} key={to}>{label}</Link>)}<Link onClick={() => setOpen(false)} to="/request-sample">REQUEST SAMPLE</Link></nav>}
      </header>

      <div className="public-content"><Outlet /></div>

      <footer className="public-footer">
        <div className="public-footer-grid">
          <div><h3>{company.name}</h3><p>Luxurious curtain, upholstery, and indoor fabrics from the ANC brand. Founded in Lebanon in {company.founded}; serving the UAE from Sharjah since {company.uaeOpened}.</p></div>
          <div><h4>DISCOVER</h4><Link to="/catalogs">Catalogs</Link><Link to="/services">Services</Link><Link to="/about-us">About Us</Link></div>
          <div><h4>SUPPORT</h4><Link to="/contact">Contact</Link><Link to="/faq">FAQ</Link><Link to="/request-sample">Request Sample</Link><a href={whatsappUrl()} target="_blank" rel="noreferrer">WhatsApp</a></div>
          <div><h4>NEWSLETTER</h4><form><input type="email" placeholder="Email Address" aria-label="Email Address" /><button type="submit">JOIN</button></form></div>
        </div>
        <div className="public-footer-bottom"><span>© 2024 {company.name}. All rights reserved.</span><div><a href={company.instagramUrl} target="_blank" rel="noreferrer">{company.instagramHandle}</a><a href="#">Terms of Use</a></div></div>
      </footer>
    </div>
  );
}
