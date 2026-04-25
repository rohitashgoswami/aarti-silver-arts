import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../api/client";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import Seo from "../components/Seo";
import { business } from "../config/business";
import { heroImages, stats, testimonials, whyChooseUs } from "../data/siteContent";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getProducts({ featured: true })
      .then((products) => {
        if (active) {
          setFeaturedProducts(products.slice(0, 3));
        }
      })
      .catch(() => {
        if (active) {
          setFeaturedProducts([]);
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

  return (
    <>
      <Seo
        title="Home"
        description="Premium handcrafted silver products from Jaipur, including silver bartan, chhatar, silver boxes, and custom order manufacturing."
      />

      <section className="overflow-hidden pt-10 sm:pt-14">
        <div className="container-shell grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal className="panel px-6 py-12 sm:px-10 lg:px-12">
            <p className="eyebrow mb-4">Jaipur Crafted Heritage</p>
            <h1 className="font-display text-5xl leading-tight text-silver-900 sm:text-6xl lg:text-7xl">
              {business.tagline}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-silver-600 sm:text-lg">{business.subtitle}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link className="btn-primary" to="/products">
                Explore Collection
              </Link>
              <Link className="btn-secondary" to="/custom-orders">
                Request Custom Order
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-[1.5rem] border border-silver-200 bg-white/70 p-5">
                  <p className="font-display text-3xl text-silver-900">{stat.value}</p>
                  <p className="mt-2 text-sm leading-6 text-silver-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[2rem] shadow-luxe sm:col-span-2">
              <img src={heroImages[0]} alt="Om silver chhatar" className="h-72 w-full object-cover sm:h-80" />
            </div>
            <div className="overflow-hidden rounded-[2rem] shadow-luxe">
              <img src={heroImages[1]} alt="Floral silver gift box" className="h-56 w-full object-cover sm:h-64" />
            </div>
            <div className="overflow-hidden rounded-[2rem] shadow-luxe">
              <img src={heroImages[2]} alt="Silver dining thali set" className="h-56 w-full object-cover sm:h-64" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell">
          <Reveal>
            <SectionHeading
              eyebrow="Featured Collection"
              title="A premium silver catalogue shaped by ritual, gifting, and tradition."
              description="Explore curated handcrafted pieces from our seeded collection. Every inquiry can lead into custom production for a tailored order."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {loading
              ? [1, 2, 3].map((item) => (
                  <div key={item} className="panel h-[31rem] animate-pulse bg-silver-100" />
                ))
              : featuredProducts.map((product) => (
                  <Reveal key={product._id}>
                    <ProductCard product={product} />
                  </Reveal>
                ))}
          </div>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-shell grid gap-6 lg:grid-cols-3">
          {whyChooseUs.map((item) => (
            <Reveal key={item.title} className="panel h-full p-8">
              <p className="eyebrow mb-4">Why Choose Us</p>
              <h3 className="font-display text-3xl text-silver-900">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-silver-600">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad bg-silver-900/95 text-white">
        <div className="container-shell">
          <Reveal>
            <SectionHeading
              eyebrow="Client Trust"
              title="What customers value in our silver work"
              description="The business serves private families, temple committees, and gifting partners looking for trust and craftsmanship."
              inverse
            />
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <Reveal key={item.name} className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
                <p className="text-base leading-8 text-white/80">“{item.quote}”</p>
                <p className="mt-6 font-display text-3xl text-white">{item.name}</p>
                <p className="mt-1 text-sm uppercase tracking-[0.24em] text-white/50">{item.role}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell">
          <Reveal className="panel grid gap-8 overflow-hidden px-6 py-10 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow mb-4">Custom Silver Production</p>
              <h2 className="font-display text-4xl text-silver-900 sm:text-5xl">
                Need a made-to-order silver piece for gifting, temple use, or bulk supply?
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-silver-600">
                Share your design intent, quantity, and timeline. We’ll respond with the next best path from our Jaipur workshop.
              </p>
            </div>
            <Link className="btn-primary" to="/custom-orders">
              Start Custom Inquiry
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

