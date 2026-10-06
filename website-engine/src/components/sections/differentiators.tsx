import { Clock, Eye, Zap, DollarSign, Shield, Smartphone } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { BusinessConfig } from "@/types/business";

const iconMap: Record<string, React.FC<{ size: number; style?: React.CSSProperties }>> = {
  Clock,
  Eye,
  Zap,
  DollarSign,
  Shield,
  Smartphone,
};

interface DifferentiatorsProps {
  business: BusinessConfig;
}

export function Differentiators({ business }: DifferentiatorsProps) {
  return (
    <section className="bg-slate-50/50 px-[var(--section-px)] py-8 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={business.differentiators.eyebrow}
          title={business.differentiators.title}
          intro={business.differentiators.intro}
          centered
        />
        <div className="mt-6 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-6">
          {business.differentiators.items.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || Clock;
            return (
              <ScrollReveal key={item.text} delay={index * 0.1}>
                <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md sm:gap-4 sm:rounded-2xl sm:p-5">
                  <div
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg sm:h-11 sm:w-11"
                    style={{ backgroundColor: `color-mix(in srgb, var(--brand-primary) 15%, white)` }}
                  >
                    <Icon size={18} style={{ color: "var(--brand-primary)" }} />
                  </div>
                  <p className="text-sm font-semibold leading-relaxed text-slate-950 sm:text-base lg:text-lg">{item.text}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
