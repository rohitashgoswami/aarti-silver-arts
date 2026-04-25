import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { business } from "../config/business";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Custom Orders", to: "/custom-orders" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/50 bg-pearl/80 backdrop-blur-xl">
      <div className="container-shell flex items-center justify-between gap-4 py-4">
        <Link to="/" className="min-w-0">
          <p className="font-display text-3xl text-silver-900">{business.name}</p>
          <p className="text-xs uppercase tracking-[0.28em] text-silver-500">Jaipur Silver Manufacturer</p>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-semibold transition ${
                  isActive ? "text-silver-900" : "text-silver-600 hover:text-silver-900"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link className="btn-primary" to="/custom-orders">
            Request Custom Order
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-full border border-silver-300 px-4 py-2 text-sm font-semibold text-silver-800 lg:hidden"
          onClick={() => setOpen((current) => !current)}
        >
          Menu
        </button>
      </div>

      {open ? (
        <div className="container-shell pb-4 lg:hidden">
          <div className="panel flex flex-col gap-3 p-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-semibold ${
                    isActive ? "bg-silver-900 text-white" : "bg-white/70 text-silver-700"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link className="btn-primary" to="/custom-orders">
              Request Custom Order
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
