import { Phone, MapPin, Clock } from "lucide-react";
import type { BusinessConfig } from "@/types/business";

interface FooterProps {
  business: BusinessConfig;
}

export function Footer({ business }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 px-[var(--section-px)] py-8 text-slate-100 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg text-sm font-bold text-white"
              style={{ backgroundColor: "var(--brand-primary)" }}
            >
              {business.brand.shortName}
            </div>
            <h3 className="text-base font-semibold sm:text-lg">{business.doctor.name}</h3>
            <p className="mt-1.5 text-sm text-slate-300">{business.doctor.title}</p>
            <p className="mt-1 text-sm text-slate-400">{business.brand.tagline}</p>
          </div>

          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold sm:mb-4">
              <Clock size={16} aria-hidden="true" />
              Opening Hours
            </h4>
            <ul className="space-y-2 text-sm leading-relaxed text-slate-300">
              {business.footer.openingHours?.map((hour) => (
                <li key={hour}>{hour}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold sm:mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${business.contact.phone}`}
                  className="flex min-h-12 items-center gap-2.5 text-slate-300 transition hover:text-white"
                >
                  <Phone size={16} className="shrink-0" aria-hidden="true" />
                  <span className="break-all">{business.contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.contact.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-slate-300 transition hover:text-white"
                >
                  <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="leading-relaxed hover:underline">{business.contact.address}</span>
                </a>
              </li>
              <li className="text-slate-300">
                <strong>Emergency:</strong> {business.contact.emergencyPhone}
              </li>
              <li className="text-slate-300">
                <strong>Parking:</strong> {business.contact.parking}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold sm:mb-4">Follow Us</h4>
            <div className="mb-5 flex gap-2.5 sm:mb-6 sm:gap-3">
              {[
                { label: "Instagram", abbr: "IG", idx: 0 },
                { label: "Facebook", abbr: "FB", idx: 1 },
                { label: "Google", abbr: "G", idx: 2 },
              ].map(({ label, abbr, idx }) => (
                <a
                  key={label}
                  href={business.footer.social?.[idx]?.url || "#"}
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-800 transition active:scale-95 hover:bg-slate-700 sm:h-10 sm:w-10"
                  aria-label={label}
                >
                  <span className="text-sm font-semibold">{abbr}</span>
                </a>
              ))}
            </div>
            <h4 className="mb-2 text-sm font-semibold sm:mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {business.footer.quickLinks?.map((link) => (
                <li key={link}>
                  <a href="#" className="inline-flex min-h-10 items-center text-slate-300 transition hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-700 pt-6 sm:mt-10 sm:pt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-slate-400">{business.footer.note}</p>
            <p className="text-xs text-slate-500">
              {business.contact.googleRating} ★ ({business.contact.reviewCount} Google Reviews)
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
