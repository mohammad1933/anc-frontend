import "./AdminSettings.css";

const tabs = [["▣", "GENERAL"], ["◉", "LOCALIZATION"], ["♙", "TEAM MANAGEMENT"], ["♧", "NOTIFICATIONS"]];

export default function AdminSettings() {
  return (
    <main className="st-main">
      <section className="st-heading"><h1>Admin Settings</h1><p>Configure your global platform preferences and team permissions.</p></section>

      <div className="st-layout">
        <nav className="st-tabs">
          {tabs.map(([icon, label], index) => <button className={index === 0 ? "active" : ""} key={label}><i>{icon}</i><span>{label}</span></button>)}
        </nav>

        <div className="st-content">
          <section className="st-card st-brand">
            <h2>Brand Identity</h2>
            <div className="st-logo-row">
              <div><b>COMPANY LOGO</b><span>PNG, SVG or WEBP<br />(Max 2MB)</span></div>
              <div className="st-logo-placeholder" />
              <button>Replace</button><button>Remove</button>
            </div>
            <label><span>BRAND NAME</span><input defaultValue="Loom & Thread" /></label>
            <label><span>LEGAL ENTITY</span><input defaultValue="ANC NAJJAR TEXTILES LTD" /></label>
          </section>

          <section className="st-card st-preferences">
            <h2>Platform Preferences</h2>
            <div><p><b>Maintenance Mode</b><span>Temporarily disable public access to the catalog.</span></p><button aria-label="Toggle maintenance mode"><i /></button></div>
          </section>

          <section className="st-save"><button>Cancel</button><button>Save Changes</button></section>
        </div>
      </div>

      <footer className="st-footer"><span>© 2024 ANC NAJJAR Dashboard. All rights reserved.</span><div>Privacy Policy　　System Status</div></footer>
    </main>
  );
}
