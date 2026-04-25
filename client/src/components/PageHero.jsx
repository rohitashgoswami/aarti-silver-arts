import Reveal from "./Reveal";
import Seo from "./Seo";

export default function PageHero({ title, description, eyebrow }) {
  return (
    <>
      <Seo title={title} description={description} />
      <section className="pt-12 sm:pt-16">
        <div className="container-shell">
          <Reveal className="panel overflow-hidden px-6 py-14 sm:px-10 lg:px-14">
            <div className="max-w-3xl">
              <p className="eyebrow mb-4">{eyebrow}</p>
              <h1 className="font-display text-5xl leading-tight text-silver-900 sm:text-6xl">{title}</h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-silver-600 sm:text-lg">{description}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

