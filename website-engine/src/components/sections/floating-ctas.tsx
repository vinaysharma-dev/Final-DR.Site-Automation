"use client";

import { Phone, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import type { BusinessConfig } from "@/types/business";

interface FloatingCTAsProps {
  business: BusinessConfig;
}

export function FloatingCTAs({ business }: FloatingCTAsProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="hidden md:flex fixed bottom-6 right-6 z-50 flex-col gap-3">
      {!isMinimized && (
        <>
          <a
            href={`tel:${business.contact.phone}`}
            className="flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold shadow-xl transition-all hover:scale-105 hover:shadow-2xl border-2"
            style={{ borderColor: "var(--brand-primary)", color: "var(--brand-primary)" }}
            aria-label={`Call ${business.contact.phone}`}
          >
            <Phone size={18} />
            <span>Call Now</span>
          </a>
          <a
            href={`https://wa.me/${business.contact.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
            aria-label="WhatsApp"
          >
            <MessageCircle size={18} />
            <span>WhatsApp</span>
          </a>
        </>
      )}
      <button
        onClick={() => setIsMinimized(!isMinimized)}
        className="flex h-12 w-12 items-center justify-center rounded-full shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
        style={{ backgroundColor: "var(--brand-primary)" }}
        aria-label={isMinimized ? "Show contact options" : "Hide contact options"}
      >
        {isMinimized ? (
          <MessageCircle size={20} className="text-white" />
        ) : (
          <X size={20} className="text-white" />
        )}
      </button>
    </div>
  );
}
