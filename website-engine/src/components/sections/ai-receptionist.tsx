"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  Bot,
  Calendar,
  Wallet,
  Clock,
  MapPin,
  Stethoscope,
  MessageCircle,
  X,
} from "lucide-react";
import type { BusinessConfig } from "@/types/business";

interface AiReceptionistProps {
  business: BusinessConfig;
}

type Message = {
  id: string;
  from: "bot" | "user";
  text: string;
};

type QuickOption = {
  key: string;
  label: string;
  icon: React.ElementType;
};

const OPTIONS: QuickOption[] = [
  { key: "book", label: "Book Appointment", icon: Calendar },
  { key: "fee", label: "Consultation Fee", icon: Wallet },
  { key: "timings", label: "Clinic Timings", icon: Clock },
  { key: "directions", label: "Directions", icon: MapPin },
  { key: "treatments", label: "Treatments", icon: Stethoscope },
];

export function AiReceptionist({ business }: AiReceptionistProps) {
  const [isOpen, setIsOpen] = useState(false);
  const greeting = `👋 Hi, I'm ${business.brand.shortName || business.brand.name}'s clinic assistant. How can I help you today?`;
  const [messages, setMessages] = useState<Message[]>(() => [
    { id: "greeting", from: "bot", text: greeting },
  ]);
  const [askedKeys, setAskedKeys] = useState<Set<string>>(new Set());
  const listRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const pushMessages = (newOnes: Omit<Message, "id">[]) => {
    setMessages((prev) => [
      ...prev,
      ...newOnes.map((m, i) => ({ ...m, id: `${Date.now()}-${i}` })),
    ]);
  };

  const handleOption = (key: string, label: string) => {
    setAskedKeys((prev) => new Set(prev).add(key));

    let reply = "";

    switch (key) {
      case "book": {
        reply = "Great! I've scrolled you to our booking form — pick a date & time that works for you 👇";
        const el = document.getElementById("appointment");
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      }
      case "fee": {
        const fee = business.hero.floatingBadges?.consultationFee?.fee;
        reply = fee
          ? `Our consultation fee is ${fee}. Fees for specific treatments vary — feel free to book a consultation for an exact quote.`
          : `Consultation pricing depends on the treatment you need. Call or WhatsApp us and we'll share exact numbers right away.`;
        break;
      }
      case "timings": {
        reply = business.contact.openingHours
          ? `We're open ${business.contact.openingHours}.`
          : "Please call us for our current opening hours.";
        break;
      }
      case "directions": {
        reply = `Opening directions to ${business.contact.address} in Google Maps 📍`;
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.contact.address)}`,
          "_blank",
          "noopener,noreferrer",
        );
        break;
      }
      case "treatments": {
        const names = business.services.items.map((s) => s.title).join(", ");
        reply = names
          ? `We offer: ${names}. Want to see full details?`
          : "Take a look at our Services section for the full treatment list.";
        const el = document.getElementById("services");
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      }
      default:
        reply = "Let me connect you with our team for that — call or WhatsApp us anytime.";
    }

    pushMessages([
      { from: "user", text: label },
      { from: "bot", text: reply },
    ]);
  };

  return (
    <div
      className="fixed z-50 bottom-32 right-4 md:bottom-6 md:left-6 md:right-auto"
      aria-live="polite"
    >
      {isOpen && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Clinic assistant chat"
          className="absolute bottom-[calc(100%+0.75rem)] right-0 flex w-[min(90vw,360px)] max-h-[min(70dvh,32rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl md:right-auto md:left-0"
        >
          {/* Header */}
          <div
            className="flex shrink-0 items-center gap-2.5 px-4 py-3 text-white"
            style={{ backgroundColor: "var(--brand-primary)" }}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20">
              <Bot size={18} aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Clinic Assistant</p>
              <p className="flex items-center gap-1.5 text-[11px] text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" aria-hidden="true" />
                Online demo
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="touch-target -mr-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/90 transition hover:bg-white/15 active:bg-white/20"
              aria-label="Close chat"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            className="flex-1 space-y-2.5 overflow-y-auto bg-slate-50 px-3 py-3"
            style={{ minHeight: "9rem" }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    m.from === "user"
                      ? "rounded-br-md text-white"
                      : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
                  }`}
                  style={m.from === "user" ? { backgroundColor: "var(--brand-primary)" } : undefined}
                >
                  {m.text}
                </p>
              </div>
            ))}
          </div>

          {/* Quick replies */}
          <div className="shrink-0 border-t border-slate-200 bg-white p-2.5">
            <p className="mb-2 px-1 text-[11px] font-medium text-slate-400">
              Quick questions
            </p>
            <div className="flex flex-wrap gap-1.5">
              {OPTIONS.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => handleOption(opt.key, opt.label)}
                    className="flex min-h-10 items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-700 transition active:scale-[0.97] hover:border-slate-300 hover:bg-slate-100"
                  >
                    <Icon size={13} style={{ color: "var(--brand-primary)" }} aria-hidden="true" />
                    {opt.label}
                    {askedKeys.has(opt.key) && (
                      <span className="sr-only"> (already asked)</span>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 px-1 text-center text-[10px] text-slate-400">
              Demo assistant — for real help, call or WhatsApp us anytime.
            </p>
          </div>
        </div>
      )}

      {/* Toggle bubble */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="touch-target relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl transition-transform hover:scale-105 active:scale-95"
        style={{ backgroundColor: "var(--brand-primary)" }}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? "Close clinic assistant" : "Open clinic assistant chat"}
      >
        {!isOpen && (
          <span className="absolute right-0 top-0 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
          </span>
        )}
        {isOpen ? (
          <X size={24} aria-hidden="true" />
        ) : (
          <MessageCircle size={24} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
