export default function SectionHeading({ eyebrow, title, description, align = "left", inverse = false }) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  const titleClass = inverse ? "text-white" : "text-silver-900";
  const descriptionClass = inverse ? "text-white/70" : "text-silver-600";
  const eyebrowClass = inverse ? "text-white/55" : "text-silver-500";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow ? <p className={`eyebrow mb-3 ${eyebrowClass}`}>{eyebrow}</p> : null}
      <h2 className={`font-display text-4xl leading-tight sm:text-5xl ${titleClass}`}>{title}</h2>
      {description ? <p className={`mt-4 text-base leading-8 ${descriptionClass}`}>{description}</p> : null}
    </div>
  );
}
