import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "@/pages/Dashboard.css";
import { company } from "@/constants/company";
import { useAuth } from "@/hooks/AuthContext";

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
      ["✉", "Inquiries", "/dashboard/inquiries"],
      ["♧", "Customers", "/dashboard/customers"],
      ["▥", "Projects", "/dashboard/projects"],
    ],
  },
  {
    title: "SYSTEM",
    items: [
      ["⚙", "Settings", "/dashboard/settings"],
    ],
  },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive = (to: string) => to === "/dashboard" ? pathname === to : pathname.startsWith(to);

  return (
    <div className="db-page">
      <aside className="db-sidebar">
        <Link className="db-logo" to="/">
          <img src="/images/anc-logo.jpeg" alt="ANC Furnishing Fabrics" />
          <b>{company.name}</b>
        </Link>
        <div className="db-menu">
          {menuGroups.map(group => (
            <section key={group.title}>
              <h2>{group.title}</h2>
              {group.items.map(([icon, label, to]) => (
                <Link className={isActive(to) ? "active" : ""} to={to} key={label}>
                  <i>{icon}</i><span>{label}</span>
                </Link>
              ))}
            </section>
          ))}
        </div>
        <div className="db-profile">
          <div className="db-avatar">IN</div>
          <div><b>{user?.name ?? "Administrator"}</b><span>Admin Account</span></div>
          <button type="button" aria-label="Log out" onClick={() => { logout(); navigate("/admin/login"); }}>⇥</button>
        </div>
      </aside>

      <div className="db-shell">
        <header className="db-header">
          <div className="db-account">
            <i>♧<b /></i><span />
            <div><strong>{user?.name ?? "Administrator"}</strong><small>ADMIN ACCOUNT</small></div>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
}
