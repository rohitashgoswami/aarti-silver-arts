import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const params = new URLSearchParams({
    productType: product.category,
    productName: product.name,
  });

  if (/^[a-fA-F0-9]{24}$/.test(product._id)) {
    params.set("productId", product._id);
  }

  return (
    <article className="panel group overflow-hidden">
      <div className="relative h-72 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {product.featured ? (
          <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-silver-700">
            Featured
          </span>
        ) : null}
      </div>
      <div className="space-y-4 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-silver-500">{product.category}</p>
        <h3 className="font-display text-3xl text-silver-900">{product.name}</h3>
        <p className="text-sm leading-7 text-silver-600">{product.description}</p>
        <Link className="btn-secondary w-full" to={`/custom-orders?${params.toString()}`}>
          Send Inquiry
        </Link>
      </div>
    </article>
  );
}
