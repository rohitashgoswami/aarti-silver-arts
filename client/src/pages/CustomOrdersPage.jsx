import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { submitInquiry } from "../api/client";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { productCategories } from "../config/business";
import { customOrderSteps } from "../data/siteContent";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  productType: "",
  description: "",
  productId: "",
};

export default function CustomOrdersPage() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setForm((current) => ({
      ...current,
      productId: searchParams.get("productId") || "",
      productType: searchParams.get("productType") || current.productType,
      description: searchParams.get("productName")
        ? `I would like to know more about ${searchParams.get("productName")}.`
        : current.description,
    }));
  }, [searchParams]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await submitInquiry(form);
      const message = response.emailNotification?.delivered
        ? "Your inquiry has been sent successfully. The owner has also received it by email."
        : "Your inquiry has been submitted successfully.";

      setStatus({ type: "success", message });
      setForm({
        ...initialForm,
        productType: form.productType,
      });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Custom Orders"
        title="Tell us what you want to create in silver"
        description="Share your requirement for personalized gifts, ceremonial pieces, devotional silverwork, or bulk custom manufacturing."
      />

      <section className="section-pad">
        <div className="container-shell grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <Reveal className="panel p-8 sm:p-10">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-silver-700">Name</label>
                  <input className="field" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-silver-700">Phone</label>
                  <input className="field" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 ..." required />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-silver-700">Email</label>
                  <input
                    className="field"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-silver-700">Product Type</label>
                  <select className="field" name="productType" value={form.productType} onChange={handleChange} required>
                    <option value="">Select a product type</option>
                    {productCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                    <option value="Custom Gift Items">Custom Gift Items</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-silver-700">Description</label>
                <textarea
                  className="field min-h-40"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Tell us about quantity, dimensions, finish, engraving, gifting use case, or timeline."
                  required
                />
              </div>
              {status.message ? (
                <p className={`text-sm ${status.type === "success" ? "text-green-700" : "text-red-600"}`}>
                  {status.message}
                </p>
              ) : null}
              <button className="btn-primary" type="submit" disabled={submitting}>
                {submitting ? "Sending..." : "Submit Inquiry"}
              </button>
            </form>
          </Reveal>

          <div className="grid gap-6">
            <Reveal className="panel p-8">
              <p className="eyebrow mb-4">How It Works</p>
              <div className="space-y-4">
                {customOrderSteps.map((step, index) => (
                  <div key={step} className="rounded-[1.5rem] border border-silver-200 bg-white/70 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-silver-500">Step {index + 1}</p>
                    <p className="mt-2 text-sm leading-7 text-silver-600">{step}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal className="panel p-8">
              <p className="eyebrow mb-4">Best For</p>
              <ul className="space-y-3 text-sm leading-7 text-silver-600">
                <li>Wedding and family gifting collections</li>
                <li>Temple and devotional silver commissions</li>
                <li>Retail and institution bulk silver orders</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
