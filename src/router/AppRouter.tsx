import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import { ConfiguratorPage } from "@/pages/Configurator";
import CatalogsPage from "@/pages/Catalogs";
import Product from "@/pages/Product";
import Contact from "@/pages/Contact";
import Services from "@/pages/Services";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogs" element={<CatalogsPage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/mockup" element={<ConfiguratorPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
