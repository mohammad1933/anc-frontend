import { type FormEvent, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./PublicLayout.css";
import { company, whatsappUrl } from "@/constants/company";
import { api, errorMessage } from "@/lib/api";
import { useAuth } from "@/hooks/AuthContext";

const links = [
  ["HOME", "/"],
  ["CATALOGS", "/catalogs"],
  ["FABRIC MOCKUP", "/mockup"],
  ["SERVICES", "/services"],
  ["CONTACT", "/contact"],
  ["ABOUT US", "/about-us"],
  ["FAQ", "/faq"],
  ["DASHBOARD", "/dashboard"],
];

export default function PublicLayout() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const { pathname } = useLocation();
  const subscribe = async (event: FormEvent) => {
    event.preventDefault();
    setNewsletterStatus(null);
    try {
      await api.post("newsletter-subscriptions", { email: newsletterEmail, locale: "en" });
      setNewsletterEmail("");
      setNewsletterStatus("Subscribed successfully.");
    } catch (requestError) {
      setNewsletterStatus(errorMessage(requestError));
    }
  };

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
            {user ? <div className="account-menu"><button type="button" aria-label="Open account menu" onClick={()=>setAccountOpen(!accountOpen)}>{user.name.split(" ").map(part=>part[0]).slice(0,2).join("")}</button>{accountOpen&&<nav className="account-panel"><strong>{user.name}<small>{user.email}</small></strong><Link to="/projects" onClick={()=>setAccountOpen(false)}>Projects</Link><Link to="/favorites" onClick={()=>setAccountOpen(false)}>Favorites</Link>{user.role === "admin"&&<Link to="/dashboard">Admin Dashboard</Link>}<button type="button" onClick={logout}>Log Out</button></nav>}</div> : <><Link className="public-auth-link" to="/login">SIGN IN</Link><Link className="public-auth-link" to="/register">REGISTER</Link></>}
          </div>
          <button className="public-menu" type="button" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? "×" : "☰"}</button>
        </div>
        {open && <nav className="public-mobile">{links.map(([label, to]) => <Link onClick={() => setOpen(false)} to={to} key={to}>{label}</Link>)}<Link onClick={() => setOpen(false)} to="/request-sample">REQUEST SAMPLE</Link>{user ? <><Link to="/projects">PROJECTS</Link><Link to="/favorites">FAVORITES</Link><button onClick={() => { logout(); setOpen(false); }}>LOG OUT</button></> : <><Link onClick={() => setOpen(false)} to="/login">SIGN IN</Link><Link onClick={() => setOpen(false)} to="/register">REGISTER</Link></>}</nav>}
      </header>

      <div className="public-content"><Outlet /></div>

      <a className="public-whatsapp-float" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Contact ANC on WhatsApp" title="Chat with us on WhatsApp">
        <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3a13 13 0 0 0-11.3 19.4L3 29l6.8-1.8A13 13 0 1 0 16 3Zm0 23.6c-2 0-3.9-.5-5.6-1.5l-.4-.2-4 .9 1.1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.6 8.6 0 0 1-2.6-1.6 9.6 9.6 0 0 1-1.8-2.2c-.2-.3 0-.5.1-.7l.5-.6.3-.6c.1-.2 0-.4 0-.6l-1-2.3c-.3-.6-.6-.5-.8-.5h-.7c-.3 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.3 3.4 1.4 3.6c.2.2 2.5 3.8 6 5.3.9.4 1.5.6 2 .7.9.3 1.7.2 2.3.1.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4Z"/></svg>
        <span>WhatsApp</span>
      </a>

      <footer className="public-footer">
        <div className="public-footer-grid">
          <div><h3>{company.name}</h3><p>Luxurious curtain, upholstery, and indoor fabrics from the ANC brand. Founded in Lebanon in {company.founded}; serving the UAE from Sharjah since {company.uaeOpened}.</p></div>
          <div><h4>DISCOVER</h4><Link to="/catalogs">Catalogs</Link><Link to="/services">Services</Link><Link to="/about-us">About Us</Link></div>
          <div><h4>SUPPORT</h4><Link to="/contact">Contact</Link><Link to="/faq">FAQ</Link><Link to="/request-sample">Request Sample</Link><a href={whatsappUrl()} target="_blank" rel="noreferrer">WhatsApp</a></div>
          <div><h4>NEWSLETTER</h4><form onSubmit={subscribe}><input required value={newsletterEmail} onChange={(event) => setNewsletterEmail(event.target.value)} type="email" placeholder="Email Address" aria-label="Email Address" /><button type="submit">JOIN</button></form>{newsletterStatus && <small role="status">{newsletterStatus}</small>}</div>
        </div>
        <div className="public-footer-bottom"><span>© 2024 {company.name}. All rights reserved.</span><div><a href={company.instagramUrl} target="_blank" rel="noreferrer">{company.instagramHandle}</a></div></div>
      </footer>
    </div>
  );
}
