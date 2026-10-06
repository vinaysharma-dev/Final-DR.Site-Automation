"use client";

import { useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { BusinessConfig } from "@/types/business";

interface FaqProps {
  business: BusinessConfig;
}

export function Faq({ business }: FaqProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItem, setOpenItem] = useState<string | null>(null);

  const filteredItems = business.faq.items.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleItem = (question: string) => {
    setOpenItem(openItem === question ? null : question);
  };

  return (
    <section id="faq" className="mx-auto max-w-7xl px-[var(--section-px)] py-8 sm:py-14 lg:py-20" aria-labelledby="faq-heading">
      <SectionHeader eyebrow={business.faq.eyebrow} title={business.faq.title} intro={business.faq.intro} centered />

      <div className="mx-auto mt-6 max-w-xl sm:mt-10">
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-base shadow-sm focus:border-[color:var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-primary)]/20"
            aria-label="Search FAQ"
          />
        </div>
      </div>

      <div className="mt-6 space-y-3 sm:mt-10 sm:space-y-4">
        {filteredItems.length === 0 ? (
          <p className="text-center text-slate-500">No questions found matching your search.</p>
        ) : (
          filteredItems.map((item, index) => (
            <ScrollReveal key={item.question} delay={index * 0.05}>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <button
                  onClick={() => toggleItem(item.question)}
                  className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-3 p-4 text-left text-base font-medium text-slate-950 transition-colors hover:bg-slate-50 active:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-primary)] focus:ring-offset-2 sm:min-h-16 sm:gap-4 sm:p-5 sm:text-lg"
                  aria-expanded={openItem === item.question}
                >
                  <span className="leading-snug">{item.question}</span>
                  <ChevronRight
                    className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                      openItem === item.question ? "rotate-90" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openItem === item.question ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-4 pb-4 text-sm leading-relaxed text-slate-600 sm:px-5 sm:pb-5 sm:text-base">
                    {item.answer}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))
        )}
      </div>
    </section>
  );
}
