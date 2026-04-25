import { useEffect, useState } from "react";
import { getProducts } from "../api/client";
import ProductCard from "../components/ProductCard";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { productCategories } from "../config/business";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getProducts()
      .then((data) => {
        if (active) {
          setProducts(data);
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.message);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const visibleProducts =
    selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory);

  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Silver bartan, devotional chhatar, and keepsake boxes"
        description="Browse our handcrafted product categories and send a direct inquiry for any piece that matches your requirement."
      />

      <section className="section-pad">
        <div className="container-shell">
          <div className="flex flex-wrap gap-3">
            {["All", ...productCategories].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  selectedCategory === category
                    ? "bg-silver-900 text-white"
                    : "border border-silver-300 bg-white/70 text-silver-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {error ? <p className="mt-6 text-sm text-red-600">{error}</p> : null}

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {loading
              ? [1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="panel h-[31rem] animate-pulse bg-silver-100" />
                ))
              : visibleProducts.map((product) => (
                  <Reveal key={product._id}>
                    <ProductCard product={product} />
                  </Reveal>
                ))}
          </div>

          {!loading && visibleProducts.length === 0 ? (
            <div className="panel mt-10 p-10 text-center">
              <h3 className="font-display text-3xl text-silver-900">No products found in this category yet.</h3>
              <p className="mt-3 text-sm text-silver-600">Try another category or check back after the next admin update.</p>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}

