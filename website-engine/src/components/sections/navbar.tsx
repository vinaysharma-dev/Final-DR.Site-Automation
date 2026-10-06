"use client";

import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import type { BusinessConfig } from "@/types/business";

interface NavbarProps {
  business: BusinessConfig;
}

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#appointment", label: "Book" },
];

export function Navbar({ business }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/95 backdrop-blur-lg supports-[backdrop-filter]:bg-white/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3"
          aria-label={`${business.doctor.name} - ${business.brand.tagline}`}
        >
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white shadow-sm"
            style={{ backgroundColor: "var(--brand-primary)" }}
            aria-hidden="true"
          >
            {business.brand.shortName}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-950">{business.doctor.name}</p>
            <p className="truncate text-xs text-slate-500">{business.brand.tagline}</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex lg:gap-8" aria-label="Main navigation">
          {navLinks.slice(0, 4).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-primary)] focus:ring-offset-2"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={`tel:${business.contact.phone}`}
            className="inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-full px-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--brand-primary)] sm:min-w-0 sm:px-4"
            style={{ backgroundColor: "var(--brand-primary)" }}
            aria-label={`Call ${business.contact.phone}`}
          >
            <Phone size={18} aria-hidden="true" />
            <span className="hidden sm:inline">Call now</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="touch-target relative flex items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-primary)] focus:ring-offset-2 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <Menu
              size={24}
              className={`absolute transition-all duration-300 ${mobileMenuOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
            />
            <X
              size={24}
              className={`absolute transition-all duration-300 ${mobileMenuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <nav className="space-y-1 px-4 py-3" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex min-h-12 items-center rounded-xl px-3 text-base font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950 active:bg-slate-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={`tel:${business.contact.phone}`}
            className="mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-4 text-base font-semibold text-white shadow-md transition hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: "var(--brand-primary)" }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Phone size={18} aria-hidden="true" />
            Call {business.contact.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
