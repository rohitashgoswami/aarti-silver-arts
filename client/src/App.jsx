import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AdminRoute from "./components/AdminRoute";
import AboutPage from "./pages/AboutPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import ContactPage from "./pages/ContactPage";
import CustomOrdersPage from "./pages/CustomOrdersPage";
import GalleryPage from "./pages/GalleryPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductsPage from "./pages/ProductsPage";

function PublicShell() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<PublicShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/custom-orders" element={<CustomOrdersPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/home" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

