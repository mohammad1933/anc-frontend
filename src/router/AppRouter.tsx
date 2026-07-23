import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import { ConfiguratorPage } from "@/pages/Configurator";
import CatalogsPage from "@/pages/Catalogs";
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
import AdminProjectManagement from "@/pages/AdminProjectManagement";
import PublicLayout from "@/components/layout/PublicLayout";
import RoyalVelvetColors from "@/pages/RoyalVelvetColors";
import InquiryManagement from "@/pages/InquiryManagement";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AdminLogin from "@/pages/AdminLogin";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { AuthProvider } from "@/hooks/AuthContext";
import { Favorites } from "@/pages/Workspace";
import { ProjectBoardDetails, ProjectBoards } from "@/pages/ProjectBoards";

export function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/catalogs" element={<CatalogsPage />} />
            <Route path="/catalogs/:catalogId/colors" element={<RoyalVelvetColors />} />
            <Route path="/catalogs/velvet-8020/colors" element={<RoyalVelvetColors />} />
            <Route path="/catalogs/royal-velvet/colors" element={<Navigate to="/catalogs/velvet-8020/colors" replace />} />
            <Route path="/product" element={<Navigate to="/catalogs" replace />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route
              path="/mockup"
              element={
                <ProtectedRoute>
                  <ConfiguratorPage />
                </ProtectedRoute>
              }
            />
            <Route path="/request-sample" element={<RequestSample />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/projects" element={<ProtectedRoute><ProjectBoards /></ProtectedRoute>} />
            <Route path="/projects/:projectId" element={<ProtectedRoute><ProjectBoardDetails /></ProtectedRoute>} />
            <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/dashboard" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="catalogs" element={<CatalogManagement />} />
            <Route path="colors" element={<ColorManagement />} />
            <Route path="requests" element={<RequestManagement />} />
            <Route path="inquiries" element={<InquiryManagement />} />
            <Route path="categories" element={<CategoryManagement />} />
            <Route path="customers" element={<CustomerDirectory />} />
            <Route path="projects" element={<AdminProjectManagement />} />
            <Route path="services" element={<ServiceManagement />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
