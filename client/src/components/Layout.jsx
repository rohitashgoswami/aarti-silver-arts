import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import WhatsAppFloat from "./WhatsAppFloat";

export default function Layout({ children }) {
  return (
    <div className="page-shell min-h-screen">
      <Navbar />
      <main className="relative z-10">{children || <Outlet />}</main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

