import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page Not Found" description="The page you requested could not be found." />
      <section className="section-pad">
        <div className="container-shell">
          <div className="panel mx-auto max-w-2xl p-10 text-center">
            <h1 className="font-display text-5xl text-silver-900">Page not found</h1>
            <p className="mt-4 text-base leading-8 text-silver-600">
              The page you requested is not available. Return to the home page to continue exploring the collection.
            </p>
            <Link className="btn-primary mt-8" to="/">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
