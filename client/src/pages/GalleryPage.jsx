import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { galleryItems } from "../data/siteContent";

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A look inside the world of handcrafted Jaipur silver"
        description="From workshop moments to finished ceremonial and gifting pieces, this gallery reflects the spirit of the craft."
      />

      <section className="section-pad">
        <div className="container-shell grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <Reveal key={item.title} className="panel overflow-hidden">
              <img src={item.image} alt={item.title} className="h-80 w-full object-cover" loading="lazy" />
              <div className="p-6">
                <h3 className="font-display text-3xl text-silver-900">{item.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

