import { useState } from "react";
import { Link } from "react-router-dom";
import "./Faq.css";

const navLinks = [
  ["HOME", "/"],
  ["CATALOGS", "/catalogs"],
  ["FABRIC MOCKUP", "/mockup"],
  ["SERVICES", "/services"],
  ["ABOUT US", "/about-us"],
  ["DASHBOARD", "/dashboard"],
];

const sections = [
  {
    title: "Ordering & MOQ",
    questions: [
      "What are the minimum order quantities (MOQ) for different fabric types?",
      "Can I modify an order after the deposit has been paid?",
    ],
  },
  {
    title: "Samples",
    questions: ["Do you offer international sample shipping for showrooms?"],
  },
  {
    title: "Production & Lead Times",
    questions: ["What are the standard lead times for bespoke manufacturing?"],
  },
  {
    title: "Shipping & Logistics",
    questions: ["What global delivery options are available for large-scale projects?"],
  },
  {
    title: "Custom Solutions",
    questions: ["Can ANC NAJJAR develop proprietary textiles for a specific brand?"],
  },
];

const answers: Record<string, string> = {
  "What are the minimum order quantities (MOQ) for different fabric types?": "Minimum quantities vary by textile, finish, and production method. Our B2B team will confirm the applicable MOQ with your quotation.",
  "Can I modify an order after the deposit has been paid?": "Changes are reviewed individually and depend on the current production stage. Please contact your account representative as soon as possible.",
  "Do you offer international sample shipping for showrooms?": "Yes. We coordinate international sample delivery for approved trade and showroom partners.",
  "What are the standard lead times for bespoke manufacturing?": "Lead times depend on material availability, specification, and order volume, and are confirmed before production begins.",
  "What global delivery options are available for large-scale projects?": "Our logistics team supports coordinated air, sea, and road freight for international commercial projects.",
  "Can ANC NAJJAR develop proprietary textiles for a specific brand?": "Yes. Our bespoke program supports custom color, weave, finish, and performance development for qualified projects.",
};

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fq-header">
      <div className="fq-nav">
        <Link className="fq-brand" to="/">ANC NAJJAR</Link>
        <nav className="fq-links">
          {navLinks.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}
        </nav>
        <div className="fq-actions">
          <button type="button">EN/AR</button>
          <Link to="/request-sample">REQUEST SAMPLE</Link>
        </div>
        <button className="fq-menu" type="button" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? "×" : "☰"}</button>
      </div>
      {open && <nav className="fq-mobile">{navLinks.map(([label, to]) => <Link onClick={() => setOpen(false)} key={to} to={to}>{label}</Link>)}</nav>}
    </header>
  );
}

function AccordionRow({ question }: { question: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`fq-question${open ? " open" : ""}`}>
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span>{question}</span><span className="fq-chevron">⌄</span>
      </button>
      {open && <p>{answers[question]}</p>}
    </div>
  );
}

function Footer() {
  return (
    <footer className="fq-footer">
      <div className="fq-footer-grid">
        <div>
          <h3>ANC NAJJAR FURNITURE</h3>
          <p>Crafting the future of luxury textiles and furniture<br />through precision, tradition, and innovation since<br />1984.</p>
        </div>
        <div>
          <h4>QUICK LINKS</h4>
          <Link to="/catalogs">Catalogs</Link><Link to="/services">Services</Link><Link to="/contact">Contact</Link>
        </div>
        <div>
          <h4>SUPPORT</h4>
          <Link to="/faq">FAQ</Link><a href="#">Privacy Policy</a><a href="#">Newsletter</a>
        </div>
        <div>
          <h4>STAY INSPIRED</h4>
          <form><input type="email" placeholder="Email address" aria-label="Email address" /><button type="submit" aria-label="Subscribe">→</button></form>
        </div>
      </div>
      <div className="fq-copyright">
        <span>© 2024 ANC NAJJAR FURNITURE. All rights reserved.</span>
        <div><span>⌯</span><span>◉</span></div>
      </div>
    </footer>
  );
}

export default function Faq() {
  return (
    <div className="fq-page">
      <Header />
      <main>
        <section className="fq-hero">
          <span>B2B SUPPORT CENTER</span>
          <h1>Frequently Asked Questions</h1>
          <p>Comprehensive guide for our global partners regarding specifications, logistics,<br />and bespoke manufacturing processes.</p>
        </section>

        <section className="fq-content">
          <aside>
            <h2>CATEGORIES</h2>
            {["ORDERING & MOQ", "SAMPLES", "PRODUCTION", "SHIPPING", "CUSTOM SOLUTIONS"].map((item, index) => (
              <a href={`#faq-${index}`} key={item}><span>{item}</span><b>→</b></a>
            ))}
          </aside>
          <div className="fq-accordions">
            {sections.map((section, index) => (
              <section id={`faq-${index}`} key={section.title}>
                <h2><span />{section.title}</h2>
                {section.questions.map(question => <AccordionRow key={question} question={question} />)}
              </section>
            ))}
          </div>
        </section>

        <section className="fq-contact">
          <h2>Still have questions?</h2>
          <p>Our dedicated B2B consultants are ready to assist you with technical<br />specifications and commercial quotes.</p>
          <div><Link to="/contact">CONTACT US</Link><Link to="/catalogs">DOWNLOAD CATALOG</Link></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
