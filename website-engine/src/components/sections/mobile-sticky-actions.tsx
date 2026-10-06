"use client";

import { Phone, MessageCircle, Calendar } from "lucide-react";
import type { BusinessConfig } from "@/types/business";

interface MobileStickyActionsProps {
  business: BusinessConfig;
}

export function MobileStickyActions({ business }: MobileStickyActionsProps) {
  return (
    <div
      className="safe-area-bottom fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200/80 bg-white/95 shadow-[0_-4px_24px_-4px_rgba(15,23,42,0.12)] backdrop-blur-lg supports-[backdrop-filter]:bg-white/90 md:hidden"
      role="navigation"
      aria-label="Quick actions"
    >
      <div className="mx-auto flex max-w-lg gap-2 px-3 py-2.5">
        <a
          href={`tel:${business.contact.phone}`}
          className="flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl bg-slate-100 px-2 py-2 text-center transition active:scale-[0.97] active:bg-slate-200"
          aria-label={`Call ${business.contact.phone}`}
        >
          <Phone size={20} className="text-slate-700" aria-hidden="true" />
          <span className="text-[11px] font-semibold text-slate-700">Call</span>
        </a>
        <a
          href={`https://wa.me/${business.contact.whatsapp.replace(/\D/g, "")}`}
          className="flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl bg-green-50 px-2 py-2 text-center transition active:scale-[0.97] active:bg-green-100"
          aria-label="WhatsApp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={20} className="text-green-600" aria-hidden="true" />
          <span className="text-[11px] font-semibold text-green-700">WhatsApp</span>
        </a>
        <a
          href="#appointment"
          className="flex min-h-12 flex-[1.15] flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-2 text-center text-white shadow-sm transition active:scale-[0.97] hover:opacity-95"
          style={{ backgroundColor: "var(--brand-primary)" }}
          aria-label="Book Appointment"
        >
          <Calendar size={20} aria-hidden="true" />
          <span className="text-[11px] font-semibold">Book</span>
        </a>
      </div>
    </div>
  );
}
