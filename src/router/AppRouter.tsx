import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import { ConfiguratorPage } from "@/pages/Configurator";
import CatalogsPage from "@/pages/Catalogs";
import Product from "@/pages/Product";
import Contact from "@/pages/Contact";
import Services from "@/pages/Services";
import AboutUs from "@/pages/AboutUs";
import RequestSample from "@/pages/RequestSample";
import Faq from "@/pages/Faq";
import Dashboard from "@/pages/Dashboard";
import CatalogManagement from "@/pages/CatalogManagement";
import AdminLayout from "@/components/admin/AdminLayout";
import ColorManagement from "@/pages/ColorManagement";
import RequestManagement from "@/pages/RequestManagement";
import CategoryManagement from "@/pages/CategoryManagement";
import CustomerDirectory from "@/pages/CustomerDirectory";
import ServiceManagement from "@/pages/ServiceManagement";
import AdminSettings from "@/pages/AdminSettings";
import PublicLayout from "@/components/layout/PublicLayout";
import RoyalVelvetColors from "@/pages/RoyalVelvetColors";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalogs" element={<CatalogsPage />} />
          <Route path="/catalogs/velvet-8020/colors" element={<RoyalVelvetColors />} />
          <Route path="/catalogs/royal-velvet/colors" element={<Navigate to="/catalogs/velvet-8020/colors" replace />} />
          <Route path="/product" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/mockup" element={<ConfiguratorPage />} />
          <Route path="/request-sample" element={<RequestSample />} />
          <Route path="/faq" element={<Faq />} />
        </Route>
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="catalogs" element={<CatalogManagement />} />
          <Route path="colors" element={<ColorManagement />} />
          <Route path="requests" element={<RequestManagement />} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="customers" element={<CustomerDirectory />} />
          <Route path="services" element={<ServiceManagement />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
