"use client";

import Image from "next/image";
import { CheckCircle2, Award, GraduationCap, Shield, Heart } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { BusinessConfig } from "@/types/business";

interface AboutProps {
  business: BusinessConfig;
}

export function About({ business }: AboutProps) {
  return (
    <section id="about" className="mx-auto max-w-7xl px-[var(--section-px)] py-8 sm:py-14 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-10">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm sm:rounded-[2rem]">
          <Image
            src={business.about.imageSrc}
            alt={business.about.imageAlt}
            width={900}
            height={900}
            className="aspect-square w-full object-cover object-top sm:aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[400px]"
            quality={85}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="min-w-0">
          <p className="text-eyebrow font-semibold uppercase text-[color:var(--brand-primary)]/80">
            {business.about.eyebrow}
          </p>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-[color:var(--brand-primary)]/5 to-transparent p-4 sm:p-6">
            <h3 className="text-xl font-bold text-slate-950 sm:text-2xl">{business.doctor.name}</h3>
            <p className="mt-1 text-base font-semibold text-[color:var(--brand-primary)] sm:text-lg">{business.doctor.title}</p>
            <div className="mt-3 space-y-2 sm:mt-4">
              {business.doctor.credentials.map((cred, idx) => (
                <p key={idx} className="flex items-start gap-2 text-sm leading-relaxed text-slate-700">
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: "var(--brand-primary)" }} />
                  <span>{cred}</span>
                </p>
              ))}
            </div>
            <div className="mt-4 border-t border-slate-200 pt-4">
              <p className="text-xs font-semibold uppercase text-slate-600">Experience</p>
              <p className="mt-1 text-xl font-bold text-slate-950">{business.doctor.experience}</p>
            </div>
          </div>

          {business.about.story && (
            <ScrollReveal>
              <div className="mt-4 rounded-2xl bg-slate-50 p-4 sm:mt-5 sm:p-5">
                <div className="mb-2 flex items-center gap-2 sm:mb-3">
                  <Heart size={18} style={{ color: "var(--brand-primary)" }} aria-hidden="true" />
                  <h4 className="font-semibold text-slate-950">My Story</h4>
                </div>
                <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{business.about.story}</p>
              </div>
            </ScrollReveal>
          )}

          {business.about.mission && (
            <ScrollReveal delay={0.1}>
              <div className="mt-3 rounded-2xl bg-slate-50 p-4 sm:mt-4 sm:p-5">
                <div className="mb-2 flex items-center gap-2 sm:mb-3">
                  <Shield size={18} style={{ color: "var(--brand-primary)" }} aria-hidden="true" />
                  <h4 className="font-semibold text-slate-950">Mission</h4>
                </div>
                <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{business.about.mission}</p>
              </div>
            </ScrollReveal>
          )}

          {business.about.philosophy && (
            <ScrollReveal delay={0.2}>
              <div className="mt-3 rounded-2xl bg-slate-50 p-4 sm:mt-4 sm:p-5">
                <div className="mb-2 flex items-center gap-2 sm:mb-3">
                  <Award size={18} style={{ color: "var(--brand-primary)" }} aria-hidden="true" />
                  <h4 className="font-semibold text-slate-950">Philosophy</h4>
                </div>
                <p className="text-sm italic leading-relaxed text-slate-600 sm:text-base">&ldquo;{business.about.philosophy}&rdquo;</p>
              </div>
            </ScrollReveal>
          )}

          {business.about.education && business.about.education.length > 0 && (
            <ScrollReveal delay={0.3}>
              <div className="mt-5 sm:mt-6">
                <div className="mb-3 flex items-center gap-2 sm:mb-4">
                  <GraduationCap size={18} style={{ color: "var(--brand-primary)" }} aria-hidden="true" />
                  <h4 className="font-semibold text-slate-950">Education</h4>
                </div>
                <div className="space-y-2.5 sm:space-y-3">
                  {business.about.education.map((edu, idx) => (
                    <div key={idx} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: `color-mix(in srgb, var(--brand-primary) 15%, white)` }}
                      >
                        <span className="text-xs font-bold" style={{ color: "var(--brand-primary)" }}>{edu.year}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-950">{edu.degree}</p>
                        <p className="text-sm text-slate-600">{edu.institution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {business.about.successNumbers && (
            <ScrollReveal delay={0.4}>
              <div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3">
                {[
                  { value: business.about.successNumbers.patients, label: "Patients" },
                  { value: business.about.successNumbers.smiles, label: "Smiles" },
                  { value: business.about.successNumbers.years, label: "Years" },
                  { value: `${business.about.successNumbers.rating} ★`, label: "Rating" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-slate-200 bg-gradient-to-br from-[color:var(--brand-primary)]/5 to-transparent p-3.5 text-center sm:p-4"
                  >
                    <p className="text-xl font-bold text-slate-950 sm:text-2xl">{stat.value}</p>
                    <p className="text-xs text-slate-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}

          <h2 className="text-heading mt-5 font-semibold tracking-tight text-slate-950 sm:mt-6">
            {business.about.title}
          </h2>
          <div className="text-body mt-4 space-y-3 text-slate-600 sm:mt-5 sm:space-y-4">
            {business.about.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-3">
            {business.about.highlights.map((item) => (
              <div
                key={item}
                className="flex min-h-12 items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 sm:rounded-2xl sm:px-4 sm:py-3"
              >
                <CheckCircle2 size={16} className="shrink-0" style={{ color: "var(--brand-primary)" }} />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
