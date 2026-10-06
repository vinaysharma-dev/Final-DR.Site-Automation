"use client";

import Image from "next/image";
import { PlayCircle, Star, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BusinessConfig } from "@/types/business";
import { useState, useEffect } from "react";

interface HeroProps {
  business: BusinessConfig;
}

export function Hero({ business }: HeroProps) {
  const [animatedCount, setAnimatedCount] = useState(0);
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

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[color:var(--brand-accent)] to-white px-[var(--section-px)] py-4 sm:py-10 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-5 sm:gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
        {/* Image first on mobile for visual impact */}
        <div className="relative order-first lg:order-last">
          {/* Mobile trust badges row — below image on xs, overlaid on sm+ */}
          <div className="mb-3 flex flex-wrap items-center justify-center gap-2 sm:absolute sm:bottom-3 sm:left-3 sm:right-3 sm:z-10 sm:mb-0 sm:justify-between">
            {business.hero.floatingBadges?.googleRating?.show && (
              <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 shadow-md">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} fill="#FBBC05" color="#FBBC05" />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-slate-950">
                  {business.hero.floatingBadges.googleRating.rating}
                </span>
                <span className="text-[10px] text-slate-500">({animatedCount.toLocaleString()})</span>
              </div>
            )}
            {business.hero.floatingBadges?.availableToday?.show && (
              <div className="flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-1.5 shadow-md">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                <span className="text-[10px] font-semibold text-green-700">
                  {business.hero.floatingBadges.availableToday.text}
                </span>
              </div>
            )}
          </div>

          <div
            className="absolute inset-0 rounded-2xl opacity-20 blur-3xl sm:rounded-[2rem]"
            style={{ backgroundColor: "var(--brand-primary)" }}
            aria-hidden="true"
          />
          <div
            className="relative overflow-hidden rounded-2xl border-2 shadow-xl sm:rounded-[2rem] sm:shadow-2xl"
            style={{ borderColor: "var(--brand-primary)" }}
          >
            <Image
              src={business.hero.imageSrc}
              alt={business.hero.imageAlt}
              width={600}
              height={700}
              className="aspect-[5/6] w-full object-cover object-top sm:aspect-[6/7] lg:aspect-auto lg:h-[600px]"
              priority
              quality={85}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-900 sm:mb-4 sm:text-sm">
            <Star size={12} fill="currentColor" />
            {business.hero.eyebrow}
          </div>

          <h1 className="text-display font-bold text-slate-950">
            {business.hero.title}
          </h1>

          <p className="text-body mt-3 text-slate-600 sm:mt-5">
            {business.hero.description}
          </p>

          <div className="mt-5 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:gap-3">
            <Button
              size="lg"
              className="w-full shadow-lg sm:w-auto"
              style={{ backgroundColor: "var(--brand-primary)" }}
            >
              {business.hero.ctaPrimary}
            </Button>
            <Button variant="outline" size="lg" className="w-full border-2 sm:w-auto">
              <PlayCircle size={18} className="mr-2 shrink-0" />
              {business.hero.ctaSecondary}
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600 sm:mt-6 sm:gap-6 sm:text-sm">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" style={{ color: "var(--brand-primary)" }} />
                ))}
              </div>
              <span className="font-semibold text-slate-950">4.9</span>
              <span className="text-slate-500">({business.contact.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award size={14} style={{ color: "var(--brand-primary)" }} />
              <span className="font-medium text-slate-950">{business.doctor.experience}</span>
            </div>
            {business.hero.floatingBadges?.sameDayAppointment?.show && (
              <div className="flex items-center gap-1.5 rounded-full bg-blue-50 px-2 py-1 text-blue-700">
                <span className="text-[11px] font-semibold sm:text-xs">
                  {business.hero.floatingBadges.sameDayAppointment.text}
                </span>
              </div>
            )}
            {business.hero.floatingBadges?.experience?.show && (
              <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-2 py-1 text-amber-700">
                <span className="text-[11px] font-semibold sm:text-xs">
                  {business.hero.floatingBadges.experience.years} {business.hero.floatingBadges.experience.label}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
