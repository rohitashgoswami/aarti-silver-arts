import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { business } from "../config/business";

export default function ContactPage() {
  const whatsappHref = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(business.whatsappMessage)}`;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Connect with our Jaipur silver workshop"
        description="Reach out for collection inquiries, custom gifting, temple orders, or bulk silver manufacturing discussions."
      />

      <section className="section-pad">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-6">
            <Reveal className="panel p-8">
              <p className="eyebrow mb-4">Contact Details</p>
              <div className="space-y-3 text-sm leading-7 text-silver-700">
                <p>{business.addressLine1}</p>
                <p>{business.addressLine2}</p>
                <p>{business.phone}</p>
                <a href={`mailto:${business.email}`} className="block">{business.email}</a>
              </div>
            </Reveal>
            <Reveal className="panel p-8">
              <p className="eyebrow mb-4">Quick Connect</p>
              <div className="flex flex-col gap-3">
                <a className="btn-primary" href={whatsappHref} target="_blank" rel="noreferrer">
                  Message on WhatsApp
                </a>
                <a className="btn-secondary" href={business.mapLink} target="_blank" rel="noreferrer">
                  Open in Google Maps
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal className="panel overflow-hidden p-3">
            <iframe
              title={`${business.name} workshop map`}
              src={business.mapEmbedUrl}
              className="h-[28rem] w-full rounded-[1.6rem] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
