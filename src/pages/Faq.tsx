import { useState } from "react";
import { Link } from "react-router-dom";
import "./Faq.css";
import { businessPolicies, company } from "@/constants/company";

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
    title: "Ordering & Payment",
    questions: [
      "What is the minimum order quantity?",
      "Which payment methods do you accept?",
    ],
  },
  {
    title: "Samples",
    questions: ["How do free A4 samples work?"],
  },
  {
    title: "Stock & Pricing",
    questions: ["How can I check stock and fabric prices?"],
  },
  {
    title: "Shipping & Logistics",
    questions: ["Where do you deliver and when is delivery free?"],
  },
  {
    title: "Returns",
    questions: ["What is your return and replacement policy?"],
  },
];

const answers: Record<string, string> = {
  "What is the minimum order quantity?": businessPolicies.minimumOrder,
  "Which payment methods do you accept?": businessPolicies.payments,
  "How do free A4 samples work?": businessPolicies.samples,
  "How can I check stock and fabric prices?": `${businessPolicies.pricing} Contact us on WhatsApp with the catalog name and color code for current availability.`,
  "Where do you deliver and when is delivery free?": `${businessPolicies.delivery} ${businessPolicies.sameDay} ${businessPolicies.international}`,
  "What is your return and replacement policy?": businessPolicies.returns,
};

export function LegacyFaqHeader() {
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

export function LegacyFaqFooter() {
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
      <main>
        <section className="fq-hero">
          <span>B2B SUPPORT CENTER</span>
          <h1>Frequently Asked Questions</h1>
          <p>Clear information about ordering, samples, stock, delivery, payment, and returns<br />from the {company.name} UAE branch.</p>
        </section>

        <section className="fq-content">
          <aside>
            <h2>CATEGORIES</h2>
            {["ORDERING & PAYMENT", "SAMPLES", "STOCK & PRICING", "DELIVERY", "RETURNS"].map((item, index) => (
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
    </div>
  );
}
