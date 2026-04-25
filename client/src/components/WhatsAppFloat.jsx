import { business } from "../config/business";

export default function WhatsAppFloat() {
  const href = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
    business.whatsappMessage,
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-full bg-[#1f7a55] px-5 py-3 text-sm font-semibold text-white shadow-luxe transition hover:-translate-y-1"
      aria-label="Chat on WhatsApp"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15">WA</span>
      WhatsApp
    </a>
  );
}

