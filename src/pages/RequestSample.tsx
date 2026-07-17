import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import "./RequestSample.css";

const links = [
  ["HOME", "/"],
  ["CATALOGS", "/catalogs"],
  ["FABRIC MOCKUP", "/mockup"],
  ["SERVICES", "/services"],
  ["ABOUT US", "/about-us"],
  ["DASHBOARD", "/dashboard"],
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="rs-header">
      <div className="rs-nav">
        <Link className="rs-logo" to="/">ANC<br />NAJJAR</Link>
        <nav className="rs-links">
          {links.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}
        </nav>
        <div className="rs-actions">
          <button type="button">EN/AR</button>
          <Link to="/request-sample">REQUEST<br />SAMPLE</Link>
        </div>
        <button className="rs-menu" type="button" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
          {open ? "×" : "☰"}
        </button>
      </div>
      {open && (
        <nav className="rs-mobile">
          {links.map(([label, to]) => <Link onClick={() => setOpen(false)} key={to} to={to}>{label}</Link>)}
          <Link onClick={() => setOpen(false)} to="/request-sample">REQUEST SAMPLE</Link>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="rs-footer">
      <div className="rs-footer-grid">
        <div>
          <h3>ANC NAJJAR</h3>
          <p>Pioneering excellence in luxury upholstery and interior<br className="rs-desktop-break" /> textiles since 1994. Quality crafted for the world's most<br className="rs-desktop-break" /> exclusive spaces.</p>
        </div>
        <div>
          <h4>DISCOVER</h4>
          <Link to="/catalogs">Catalogs</Link>
          <Link to="/services">Services</Link>
          <a href="#">New Arrivals</a>
        </div>
        <div>
          <h4>SUPPORT</h4>
          <Link to="/contact">Contact</Link>
          <Link to="/faq">FAQ</Link>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
        </div>
        <div>
          <h4>NEWSLETTER</h4>
          <form className="rs-newsletter">
            <input aria-label="Email Address" placeholder="Email Address" type="email" />
            <button type="submit">JOIN</button>
          </form>
        </div>
      </div>
      <div className="rs-footer-bottom">
        <span>© 2024 ANC NAJJAR FURNITURE. All rights reserved.</span>
        <div className="rs-social" aria-label="Social links">
          <span>◉</span><span>◉</span><span>✉</span>
        </div>
      </div>
    </footer>
  );
}

export default function RequestSample() {
  const submit = (event: FormEvent) => event.preventDefault();
  return (
    <div className="rs-page">
      <Header />
      <main className="rs-main">
        <section className="rs-intro">
          <h1>Request a Sample</h1>
          <p>Experience the tactile quality of our premium textiles before making your final selection.<br />Our curated samples help you ensure the perfect match for your space.</p>
          <div className="rs-steps">
            {[["1", "INFORMATION"], ["2", "SELECTION"], ["3", "DELIVERY"]].map(([number, label], index) => (
              <div className={index === 0 ? "active" : ""} key={number}>
                <span>{number}</span>
                <small>{label}</small>
              </div>
            ))}
          </div>
        </section>

        <form className="rs-card" onSubmit={submit}>
          <h2>Customer Details</h2>
          <div className="rs-fields">
            <label>
              <b>COMPANY NAME</b>
              <input defaultValue="Global Interiors Ltd." />
            </label>
            <label>
              <b>INDUSTRY</b>
              <input defaultValue="Interior Design" />
            </label>
            <label>
              <b>FULL NAME</b>
              <input defaultValue="Jonathan Doe" />
            </label>
            <label>
              <b>COUNTRY</b>
              <input defaultValue="United Arab Emirates" />
            </label>
          </div>
          <div className="rs-card-bottom">
            <button type="submit">NEXT<br />STEP <span>→</span></button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
