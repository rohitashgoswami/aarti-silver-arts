import { Helmet } from "react-helmet-async";
import { business } from "../config/business";

export default function Seo({ title, description }) {
  const fullTitle = `${title} | ${business.name}`;
  const metaDescription = description || business.description;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}

