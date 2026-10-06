"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { BarChart3, Star, Users, Award, Shield, CheckCircle } from "lucide-react";
import type { Metric } from "@/types/business";

const iconMap: Record<string, React.ReactNode> = {
  rating: <Star className="h-6 w-6 sm:h-8 sm:w-8" />,
  reviews: <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8" />,
  experience: <Award className="h-6 w-6 sm:h-8 sm:w-8" />,
  patients: <Users className="h-6 w-6 sm:h-8 sm:w-8" />,
  certification: <Shield className="h-6 w-6 sm:h-8 sm:w-8" />,
  insurance: <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8" />,
};

interface TrustMetricsProps {
  items: Metric[];
}

interface ParsedMetric {
  target: number;
  decimals: number;
  hasCommas: boolean;
  suffix: string;
}

function parseMetricValue(value: string): ParsedMetric | null {
  const match = value.match(/^([\d,]+(?:\.\d+)?)/);
  if (!match) return null;
  const numericStr = match[1];
  const target = parseFloat(numericStr.replace(/,/g, ""));
  if (Number.isNaN(target)) return null;
  const decimals = numericStr.includes(".") ? numericStr.split(".")[1].length : 0;
  const hasCommas = numericStr.includes(",");
  const suffix = value.slice(match[0].length);
  return { target, decimals, hasCommas, suffix };
}

function formatMetric(current: number, parsed: ParsedMetric) {
  const fixed = current.toFixed(parsed.decimals);
  const numberPart = parsed.hasCommas
    ? Number(fixed).toLocaleString(undefined, {
        minimumFractionDigits: parsed.decimals,
        maximumFractionDigits: parsed.decimals,
      })
    : fixed;
  return `${numberPart}${parsed.suffix}`;
}

function AnimatedMetric({ value, animate, delay }: { value: string; animate: boolean; delay: number }) {
  const parsed = useMemo(() => parseMetricValue(value), [value]);
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = Boolean(parsed) && !prefersReducedMotion;
  const [display, setDisplay] = useState(() => (shouldAnimate && parsed ? formatMetric(0, parsed) : value));

  useEffect(() => {
    if (!shouldAnimate || !parsed || !animate) return;

    let frame: number;
    const duration = 1200;
    const startTimer = setTimeout(() => {
      const startTime = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(formatMetric(parsed.target * eased, parsed));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(startTimer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [shouldAnimate, animate, delay, parsed]);

  if (!shouldAnimate) {
    return <span className="tabular-nums">{value}</span>;
  }

  return <span className="tabular-nums">{display}</span>;
}

export function TrustMetrics({ items }: TrustMetricsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="px-[var(--section-px)] py-5 sm:py-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
          {items.map((item, idx) => {
            const iconKey =
              ["rating", "reviews", "experience", "patients", "certification", "insurance"][idx] || "rating";
            return (
              <div
                key={item.label}
                className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-3 text-center shadow-sm transition sm:rounded-2xl sm:p-5"
              >
                <div
                  className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full sm:mb-3 sm:h-12 sm:w-12"
                  style={{
                    backgroundColor: `color-mix(in srgb, var(--brand-primary) 10%, white)`,
                    color: "var(--brand-primary)",
                  }}
                >
                  {iconMap[iconKey]}
                </div>
                <p className="text-lg font-bold leading-tight text-slate-950 sm:text-2xl">
                  <AnimatedMetric value={item.value} animate={isInView} delay={idx * 120} />
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-slate-600 sm:mt-1.5 sm:text-sm">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
