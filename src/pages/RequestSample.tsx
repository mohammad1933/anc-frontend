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

export function LegacyRequestSampleHeader() {
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

export function LegacyRequestSampleFooter() {
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
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedSamples, setSelectedSamples] = useState(["Velvet 8020"]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (step < 2) setStep((current) => current + 1);
    else setSubmitted(true);
  };

  const toggleSample = (sample: string) => {
    setSelectedSamples((current) =>
      current.includes(sample)
        ? current.filter((item) => item !== sample)
        : current.length < 3 ? [...current, sample] : current,
    );
  };

  return (
    <div className="rs-page">
      <main className="rs-main">
        <section className="rs-intro">
          <h1>Request a Sample</h1>
          <p>Choose up to three free A4 fabric samples before making your final selection.<br />Sample delivery is free in Sharjah and Ajman; courier charges apply elsewhere.</p>
          <div className="rs-steps">
            {[["1", "INFORMATION"], ["2", "SELECTION"], ["3", "DELIVERY"]].map(([number, label], index) => (
              <button
                type="button"
                className={`${index === step ? "active" : ""}${index < step ? " completed" : ""}`}
                onClick={() => { if (index <= step) setStep(index); }}
                key={number}
              >
                <span>{number}</span>
                <small>{label}</small>
              </button>
            ))}
          </div>
        </section>

        <form className="rs-card" onSubmit={submit}>
          {submitted ? (
            <div className="rs-success">
              <span>✓</span>
              <h2>Request Submitted</h2>
              <p>Your sample request has been received. Our team will contact you with delivery details.</p>
            </div>
          ) : step === 0 ? (
            <>
              <h2>Customer Details</h2>
              <div className="rs-fields">
                <label><b>COMPANY NAME</b><input placeholder="Company name (optional)" /></label>
                <label><b>INDUSTRY</b><input placeholder="Your industry" /></label>
                <label><b>FULL NAME</b><input required placeholder="Full name" /></label>
                <label><b>COUNTRY</b><input required defaultValue="United Arab Emirates" /></label>
              </div>
            </>
          ) : step === 1 ? (
            <>
              <h2>Select Samples</h2>
              <p className="rs-card-intro">Choose up to three free A4 samples.</p>
              <div className="rs-sample-options">
                {["Velvet 8020", "Blackout 9902", "Sheer 9902", "Linen 11106", "Bouclé 2660", "Chenille Canna"].map((sample) => (
                  <label className={selectedSamples.includes(sample) ? "selected" : ""} key={sample}>
                    <input type="checkbox" checked={selectedSamples.includes(sample)} onChange={() => toggleSample(sample)} />
                    <span>{sample}</span><small>{selectedSamples.includes(sample) ? "SELECTED" : "SELECT"}</small>
                  </label>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2>Delivery Details</h2>
              <div className="rs-fields">
                <label><b>DELIVERY ADDRESS</b><input required placeholder="Street and building" /></label>
                <label><b>CITY</b><input required placeholder="Sharjah" /></label>
                <label><b>EMAIL ADDRESS</b><input required type="email" placeholder="name@company.com" /></label>
                <label><b>PHONE NUMBER</b><input required type="tel" placeholder="+971 00 000 0000" /></label>
              </div>
            </>
          )}
          <div className="rs-card-bottom">
            {!submitted && step > 0 && <button className="rs-back" type="button" onClick={() => setStep((current) => current - 1)}>←　BACK</button>}
            {!submitted && <button type="submit">{step === 2 ? <>SUBMIT<br />REQUEST</> : <>NEXT<br />STEP <span>→</span></>}</button>}
            {submitted && <button type="button" onClick={() => { setStep(0); setSubmitted(false); }}>NEW<br />REQUEST <span>→</span></button>}
          </div>
        </form>
      </main>
    </div>
  );
}
