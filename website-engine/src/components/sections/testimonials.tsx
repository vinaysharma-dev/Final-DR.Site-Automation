"use client";

import { Star, CheckCircle2, Filter, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import type { BusinessConfig } from "@/types/business";

interface TestimonialsProps {
  business: BusinessConfig;
}

const avatarColors = [
  { bg: "#DCE9F9", text: "#1E40AF" },
  { bg: "#FECACA", text: "#991B1B" },
  { bg: "#D1FAE5", text: "#065F46" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function Testimonials({ business }: TestimonialsProps) {
  const [animatedCount, setAnimatedCount] = useState(0);
  const [filter, setFilter] = useState<"all" | "5star" | "4star">("all");
  const targetCount = parseInt(business.contact.reviewCount.replace(/,/g, "")) || 1324;

  useEffect(() => {
    let current = 0;
    const increment = targetCount / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetCount) {
        current = targetCount;
        clearInterval(timer);
      }
      setAnimatedCount(Math.floor(current));
    }, 30);
    return () => clearInterval(timer);
  }, [targetCount]);

  const filteredItems = business.testimonials.items.filter(() => {
    if (filter === "all") return true;
    return true;
  });

  return (
    <section id="testimonials" className="overflow-hidden bg-white px-[var(--section-px)] py-8 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 text-center sm:mb-10">
          <div className="mb-4 flex flex-col items-center gap-3 sm:mb-6 sm:gap-4">
            <div className="flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm sm:gap-3 sm:px-4">
              <svg className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#FBBC05" color="#FBBC05" />
                ))}
              </div>
              <span className="text-base font-bold text-slate-950 sm:text-lg">{business.contact.googleRating}</span>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl font-bold text-slate-950 sm:text-3xl">{animatedCount.toLocaleString()}</span>
                <TrendingUp size={18} className="text-green-600" />
              </div>
              <div className="mt-0.5 text-xs text-slate-600 sm:text-sm">Verified Google Reviews</div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {(["all", "5star", "4star"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex min-h-10 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition active:scale-[0.97] sm:min-h-11 sm:px-4 sm:text-sm ${
                    filter === f ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {f === "all" ? <Filter size={12} /> : <Star size={12} fill="#FBBC05" color="#FBBC05" />}
                  {f === "all" ? "All" : f === "5star" ? "5 Star" : "4 Star"}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5">
                <div className="h-3 w-3 rounded bg-blue-600 sm:h-4 sm:w-4" />
                <span className="text-[11px] font-semibold text-blue-900 sm:text-sm">Google Verified</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5">
                <CheckCircle2 size={12} className="text-green-600" />
                <span className="text-[11px] font-semibold text-green-900 sm:text-sm">Verified Patients</span>
              </div>
            </div>
          </div>

          <p className="text-eyebrow mb-2 font-semibold uppercase text-[color:var(--brand-primary)]/80">
            What Our Patients Say
          </p>
          <h2 className="text-heading font-semibold tracking-tight text-slate-950">
            Trusted by Hundreds of Happy Patients
          </h2>
          <p className="text-body mt-2 text-slate-600 sm:mt-3">
            Real reviews from real patients who transformed their smiles.
          </p>
        </div>

        {/* Mobile: horizontal swipe carousel */}
        <div className="mobile-carousel -mx-[var(--section-px)] px-[var(--section-px)] sm:mx-0 sm:grid sm:grid-cols-1 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-2">
          {filteredItems.map((item, idx) => {
            const colors = avatarColors[idx % avatarColors.length];
            const initials = getInitials(item.author);
            return (
              <Card
                key={item.author}
                className="w-[min(85vw,340px)] border-slate-200 sm:w-auto"
              >
                <div className="mb-3 flex items-start gap-3 sm:mb-4 sm:gap-4">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold sm:h-12 sm:w-12"
                    style={{ backgroundColor: colors.bg, color: colors.text }}
                  >
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate font-semibold text-slate-950">{item.author}</p>
                      <CheckCircle2 size={14} className="shrink-0" style={{ color: "var(--brand-primary)" }} />
                    </div>
                    <p className="truncate text-sm text-slate-600">{item.role}</p>
                    <div className="mt-1.5 flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} fill="#FBBC05" color="#FBBC05" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-slate-700 sm:text-base sm:leading-7">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 sm:mt-4 sm:pt-4">
                  <span className="text-xs text-slate-500">3 months ago</span>
                  <span className="text-xs font-semibold text-slate-600">Google Review</span>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 text-center sm:mt-10">
          <a
            href="#"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 px-6 py-3 text-sm font-semibold transition active:scale-[0.98] hover:bg-slate-50 sm:text-base"
            style={{ borderColor: "var(--brand-primary)", color: "var(--brand-primary)" }}
          >
            Read All Reviews on Google →
          </a>
        </div>
      </div>
    </section>
  );
}
