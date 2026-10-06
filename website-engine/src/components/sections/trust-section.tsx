import { Star, ShieldCheck, Sparkles, Zap, Shield, Phone, FileText, Award } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { BusinessConfig, TrustSectionItem } from "@/types/business";

const iconMap: Record<string, React.FC<{ size: number; className?: string; style?: React.CSSProperties }>> = {
  Star,
  ShieldCheck,
  Sparkles,
  Zap,
  Shield,
  Phone,
  FileText,
  Award,
};

interface TrustSectionProps {
  business: BusinessConfig;
}

export function TrustSection({ business }: TrustSectionProps) {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white px-[var(--section-px)] py-8 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={business.trustSection.eyebrow}
          title={business.trustSection.title}
          intro={business.trustSection.intro}
          centered
        />
        <div className="mt-6 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          {business.trustSection.items.map((item: TrustSectionItem, index: number) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || Star;
            return (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-slate-300 hover:shadow-lg sm:rounded-3xl sm:p-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--brand-primary)]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl sm:h-12 sm:w-12 sm:rounded-2xl"
                      style={{ backgroundColor: `color-mix(in srgb, var(--brand-primary) 15%, white)` }}
                    >
                      <Icon size={18} style={{ color: "var(--brand-primary)" }} />
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-slate-950 sm:mt-4 sm:text-lg">{item.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:mt-2 sm:text-sm">{item.description}</p>
                    <div
                      className="mt-3 inline-flex max-w-full items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold sm:mt-4 sm:px-3 sm:py-1.5 sm:text-xs"
                      style={{ color: "var(--brand-primary)" }}
                    >
                      {item.highlight}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
