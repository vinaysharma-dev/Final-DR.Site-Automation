import { Calendar, Users, Search, Sparkles, Heart, CheckCircle, ArrowDown } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { BusinessConfig } from "@/types/business";

const iconMap: Record<string, React.FC<{ size: number; className?: string; style?: React.CSSProperties }>> = {
  Calendar,
  Users,
  Search,
  Sparkles,
  Heart,
  CheckCircle,
};

interface PatientJourneyProps {
  business: BusinessConfig;
}

export function PatientJourney({ business }: PatientJourneyProps) {
  if (!business.patientJourney) return null;

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white px-[var(--section-px)] py-8 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={business.patientJourney.eyebrow}
          title={business.patientJourney.title}
          intro={business.patientJourney.intro}
          centered
        />
        <div className="relative mt-8 sm:mt-10">
          <div
            className="absolute bottom-0 top-0 hidden w-0.5 bg-gradient-to-b from-[color:var(--brand-primary)] via-[color:var(--brand-primary)]/50 to-transparent md:block"
            style={{ left: "calc(50% - 2px)" }}
          />

          <div className="space-y-4 md:space-y-0">
            {business.patientJourney?.steps &&
              business.patientJourney.steps.map((step, index) => {
                const Icon = iconMap[step.icon as keyof typeof iconMap] || Calendar;
                const isEven = index % 2 === 0;

                return (
                  <ScrollReveal key={step.step} delay={index * 0.1}>
                    <div
                      className={`relative flex flex-col items-stretch gap-4 md:flex-row md:items-center md:gap-6 ${
                        isEven ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      <div
                        className="relative z-10 mx-auto flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 bg-white shadow-lg md:absolute md:left-1/2 md:-translate-x-1/2"
                        style={{ borderColor: "var(--brand-primary)" }}
                      >
                        <span className="text-base font-bold sm:text-lg" style={{ color: "var(--brand-primary)" }}>
                          {step.step}
                        </span>
                      </div>

                      <div className={`flex-1 md:w-1/2 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:border-slate-300 hover:shadow-md sm:p-5">
                          <div className={`flex items-center gap-3 ${isEven ? "md:justify-end" : ""}`}>
                            <div
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                              style={{ backgroundColor: `color-mix(in srgb, var(--brand-primary) 15%, white)` }}
                            >
                              <Icon size={18} className="text-[color:var(--brand-primary)]" />
                            </div>
                            <h3 className="text-base font-semibold text-slate-950 sm:text-lg">{step.title}</h3>
                          </div>
                          <p className={`mt-2 text-sm leading-relaxed text-slate-600 sm:mt-3 ${isEven ? "md:text-right" : ""}`}>
                            {step.description}
                          </p>
                        </div>
                      </div>

                      <div className="hidden md:block md:w-1/2" />
                    </div>

                    {index < business.patientJourney!.steps.length - 1 && (
                      <div className="flex justify-center py-1 md:hidden">
                        <ArrowDown size={20} className="text-slate-300" aria-hidden="true" />
                      </div>
                    )}
                  </ScrollReveal>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
