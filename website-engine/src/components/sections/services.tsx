"use client";

import { Sparkles, ShieldCheck, HeartPulse, Smile, Clock, Zap, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { BusinessConfig } from "@/types/business";

const iconMap = {
  Sparkles,
  ShieldCheck,
  HeartPulse,
  Smile,
};

interface ServicesProps {
  business: BusinessConfig;
}

export function Services({ business }: ServicesProps) {
  return (
    <section id="services" className="bg-white px-[var(--section-px)] py-8 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow={business.services.eyebrow} title={business.services.title} intro={business.services.intro} centered />
        <div className="mt-6 grid gap-4 sm:mt-10 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {business.services.items.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] ?? Sparkles;
            return (
              <ScrollReveal key={service.title} delay={index * 0.1}>
                <Card className="group flex h-full flex-col justify-between overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                  <div className="relative">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 sm:h-14 sm:w-14 sm:rounded-2xl"
                      style={{ backgroundColor: `color-mix(in srgb, var(--brand-primary) 15%, white)` }}
                    >
                      <Icon size={20} style={{ color: "var(--brand-primary)" }} />
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-slate-950 sm:mt-5 sm:text-xl">{service.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600 sm:mt-2 sm:text-base sm:leading-7">
                      {service.description}
                    </p>

                    {(service.treatmentTime || service.painLevel || service.recoveryTime) && (
                      <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                        {service.treatmentTime && (
                          <div className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 sm:text-xs">
                            <Clock size={11} />
                            {service.treatmentTime}
                          </div>
                        )}
                        {service.painLevel && (
                          <div className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 sm:text-xs">
                            <Zap size={11} />
                            {service.painLevel}
                          </div>
                        )}
                        {service.recoveryTime && (
                          <div className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 sm:text-xs">
                            <RefreshCw size={11} />
                            {service.recoveryTime}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="relative mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row sm:gap-2">
                    <Button
                      variant="ghost"
                      className="min-h-12 w-full justify-center px-0 font-semibold sm:flex-1 sm:justify-start"
                      style={{ color: "var(--brand-primary)" }}
                    >
                      {service.cta} →
                    </Button>
                    <Button
                      className="min-h-12 w-full shadow-md sm:flex-1"
                      style={{ backgroundColor: "var(--brand-primary)" }}
                    >
                      Book
                    </Button>
                  </div>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
