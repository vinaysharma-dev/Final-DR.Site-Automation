"use client";

import { Phone } from "lucide-react";
import type { BusinessConfig } from "@/types/business";

interface StickyMobileCTAProps {
  business: BusinessConfig;
}

export function StickyMobileCTA({ business }: StickyMobileCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white p-4 shadow-lg md:hidden">
      <a
        href={`tel:${business.contact.phone}`}
        className="flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white shadow-md transition hover:opacity-90"
        style={{ backgroundColor: "var(--brand-primary)" }}
        aria-label={`Call ${business.contact.phone}`}
      >
        <Phone size={20} aria-hidden="true" />
        Call Now
      </a>
    </div>
  );
}
