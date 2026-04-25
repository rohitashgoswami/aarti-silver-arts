import { Link } from "react-router-dom";
import { business } from "../config/business";

export default function Footer() {
  return (
    <footer className="border-t border-silver-200 bg-white/70">
      <div className="container-shell grid gap-10 py-12 lg:grid-cols-[1.4fr_0.8fr_1fr]">
        <div>
          <p className="font-display text-3xl text-silver-900">{business.name}</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-silver-600">{business.description}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-silver-500">Explore</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-silver-700">
            <Link to="/products">Collection</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/about">Our Story</Link>
            <Link to="/admin/login">Admin</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-silver-500">Contact</p>
          <div className="mt-4 space-y-2 text-sm leading-7 text-silver-700">
            <p>{business.addressLine1}</p>
            <p>{business.addressLine2}</p>
            <p>{business.phone}</p>
            <a href={`mailto:${business.email}`}>{business.email}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

