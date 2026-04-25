import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { business } from "../config/business";
import { storyPoints, values } from "../data/siteContent";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A family-rooted silver workshop with Jaipur at its heart"
        description="We combine traditional craftsmanship, factory discipline, and relationship-led service for retail and bulk custom work."
      />

      <section className="section-pad">
        <div className="container-shell grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="panel h-full p-8 sm:p-10">
            <p className="eyebrow mb-4">Our Story</p>
            <h2 className="font-display text-4xl text-silver-900">Built on heritage, refined for modern trust.</h2>
            <p className="mt-5 text-base leading-8 text-silver-600">
              {business.name} is shaped by a family-owned approach to silver manufacturing where craftsmanship,
              purity, and long-term relationships matter. From ceremonial silverware to customized gifting pieces,
              the goal remains the same: create work that feels meaningful and lasts beautifully.
            </p>
            <p className="mt-5 text-base leading-8 text-silver-600">
              Our factory in Jaipur supports consistent finishing and flexible production, allowing us to serve
              both personal buyers and larger custom orders with the same care.
            </p>
          </Reveal>

          <div className="grid gap-6">
            {storyPoints.map((item) => (
              <Reveal key={item.title} className="panel p-8">
                <h3 className="font-display text-3xl text-silver-900">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-silver-600">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-shell grid gap-6 lg:grid-cols-3">
          {values.map((item) => (
            <Reveal key={item.title} className="panel p-8">
              <p className="eyebrow mb-4">Mission & Values</p>
              <h3 className="font-display text-3xl text-silver-900">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-silver-600">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

