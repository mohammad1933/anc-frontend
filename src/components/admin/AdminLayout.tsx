import { Link, Outlet, useLocation } from "react-router-dom";
import "@/pages/Dashboard.css";

const menuGroups = [
  {
    title: "MAIN MENU",
    items: [
      ["▦", "Dashboard", "/dashboard"],
      ["▤", "Catalogs", "/dashboard/catalogs"],
      ["❀", "Colors", "/dashboard/colors"],
      ["♙", "Categories", "/dashboard/categories"],
      ["⚒", "Services", "/dashboard/services"],
    ],
  },
  {
    title: "CRM & OPERATIONS",
    items: [
      ["▣", "Requests", "/dashboard/requests"],
      ["♧", "Customers", "/dashboard/customers"],
      ["◧", "Pages", "/dashboard/pages"],
      ["▧", "Media Library", "/dashboard/media"],
    ],
  },
  {
    title: "SYSTEM",
    items: [
      ["♧", "Users", "/dashboard/users"],
      ["⚙", "Settings", "/dashboard/settings"],
      ["▥", "Analytics", "/dashboard/analytics"],
    ],
  },
];

const searchPlaceholders: Record<string, string> = {
  "/dashboard/catalogs": "Search catalogs by name or SKU...",
  "/dashboard/colors": "Search catalogs or colors...",
  "/dashboard/requests": "Global search for collections or items...",
};

export default function AdminLayout() {
  const { pathname } = useLocation();
  const isActive = (to: string) => to === "/dashboard" ? pathname === to : pathname.startsWith(to);

  return (
    <div className="db-page">
      <aside className="db-sidebar">
        <Link className="db-logo" to="/">
          <span>╱<br />╱</span><b>ANC NAJJAR</b>
        </Link>
        <div className="db-menu">
          {menuGroups.map(group => (
            <section key={group.title}>
              <h2>{group.title}</h2>
              {group.items.map(([icon, label, to]) => (
                <Link className={isActive(to) ? "active" : ""} to={to} key={label}>
                  <i>{icon}</i><span>{label}</span>{label === "Requests" && <em>12</em>}
                </Link>
              ))}
            </section>
          ))}
        </div>
        <div className="db-profile">
          <div className="db-avatar">IN</div>
          <div><b>Ibrahim Najjar</b><span>Admin Account</span></div>
          <i>⇥</i>
        </div>
      </aside>

      <div className="db-shell">
        <header className="db-header">
          <label>
            <span>⌕</span>
            <input placeholder={searchPlaceholders[pathname] ?? "Search catalogs, requests, or customers..."} />
          </label>
          <div className="db-account">
            <i>♧<b /></i><span />
            <div><strong>Ibrahim Najjar</strong><small>SUPER ADMIN</small></div>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
}
