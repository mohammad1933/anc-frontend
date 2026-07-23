import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { api, errorMessage, type ApiResource } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import type { Catalog, SampleRequest as SampleRequestData } from "@/types/api";
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
  const { data: catalogData, loading: catalogsLoading, error: catalogsError } = useApi(
    () => api.getAll<Catalog>("catalogs", { status: "published", per_page: 100 }),
    [],
  );
  const catalogs = catalogData?.data ?? [];
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedSamples, setSelectedSamples] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [details, setDetails] = useState({
    company_name: "", industry: "", full_name: "", country: "United Arab Emirates",
    delivery_address: "", city: "", email: "", phone: "",
  });

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitError(null);
    if (step < 2) {
      setStep((current) => current + 1);
      return;
    }

    setSubmitting(true);
    try {
      await api.post<ApiResource<SampleRequestData>>("sample-requests", {
        ...details,
        items: selectedSamples.map((sample_name) => ({ sample_name, catalog_id: catalogs.find((catalog) => catalog.name === sample_name)?.id, quantity: 1 })),
      });
      setSubmitted(true);
    } catch (requestError) {
      setSubmitError(errorMessage(requestError));
    } finally {
      setSubmitting(false);
    }
  };

  const updateDetail = (field: keyof typeof details, value: string) => {
    setDetails((current) => ({ ...current, [field]: value }));
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
                <label><b>COMPANY NAME</b><input value={details.company_name} onChange={(event) => updateDetail("company_name", event.target.value)} placeholder="Company name (optional)" /></label>
                <label><b>INDUSTRY</b><input value={details.industry} onChange={(event) => updateDetail("industry", event.target.value)} placeholder="Your industry" /></label>
                <label><b>FULL NAME</b><input required value={details.full_name} onChange={(event) => updateDetail("full_name", event.target.value)} placeholder="Full name" /></label>
                <label><b>COUNTRY</b><input required value={details.country} onChange={(event) => updateDetail("country", event.target.value)} /></label>
              </div>
            </>
          ) : step === 1 ? (
            <>
              <h2>Select Samples</h2>
              <p className="rs-card-intro">Choose up to three free A4 samples.</p>
              {catalogsLoading && <p role="status">Loading available catalogs…</p>}
              {catalogsError && <p role="alert">{catalogsError}</p>}
              <div className="rs-sample-options">
                {catalogs.map((catalog) => (
                  (() => {
                    const sample = catalog.name;
                    return (
                  <label className={selectedSamples.includes(sample) ? "selected" : ""} key={sample}>
                    <input type="checkbox" checked={selectedSamples.includes(sample)} onChange={() => toggleSample(sample)} />
                    <span>{sample}</span><small>{catalog.material ?? (selectedSamples.includes(sample) ? "SELECTED" : "SELECT")}</small>
                  </label>
                    );
                  })()
                ))}
              </div>
              {!catalogsLoading && !catalogsError && catalogs.length === 0 && <p>No published catalogs are currently available for sampling.</p>}
            </>
          ) : (
            <>
              <h2>Delivery Details</h2>
              <div className="rs-fields">
                <label><b>DELIVERY ADDRESS</b><input required value={details.delivery_address} onChange={(event) => updateDetail("delivery_address", event.target.value)} placeholder="Street and building" /></label>
                <label><b>CITY</b><input required value={details.city} onChange={(event) => updateDetail("city", event.target.value)} placeholder="Sharjah" /></label>
                <label><b>EMAIL ADDRESS</b><input required type="email" value={details.email} onChange={(event) => updateDetail("email", event.target.value)} placeholder="name@company.com" /></label>
                <label><b>PHONE NUMBER</b><input required type="tel" value={details.phone} onChange={(event) => updateDetail("phone", event.target.value)} placeholder="+971 00 000 0000" /></label>
              </div>
            </>
          )}
          {submitError && <p role="alert" className="rs-card-intro">{submitError}</p>}
          <div className="rs-card-bottom">
            {!submitted && step > 0 && <button className="rs-back" type="button" onClick={() => setStep((current) => current - 1)}>←　BACK</button>}
            {!submitted && <button type="submit" disabled={submitting || (step === 1 && selectedSamples.length === 0)}>{submitting ? <>SENDING<br />REQUEST</> : step === 2 ? <>SUBMIT<br />REQUEST</> : <>NEXT<br />STEP <span>→</span></>}</button>}
            {submitted && <button type="button" onClick={() => { setStep(0); setSubmitted(false); setSelectedSamples([]); setDetails({ company_name: "", industry: "", full_name: "", country: "United Arab Emirates", delivery_address: "", city: "", email: "", phone: "" }); }}>NEW<br />REQUEST <span>→</span></button>}
          </div>
        </form>
      </main>
    </div>
  );
}
