"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn, Loader2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { BusinessConfig } from "@/types/business";

interface GalleryProps {
  business: BusinessConfig;
}

export function Gallery({ business }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<(typeof business.gallery.items)[0] | null>(null);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const handleImageLoad = (title: string) => {
    setLoadingStates((prev) => ({ ...prev, [title]: false }));
  };

  return (
    <>
      <section id="gallery" className="mx-auto max-w-7xl px-[var(--section-px)] py-8 sm:py-14 lg:py-20">
        <SectionHeader eyebrow={business.gallery.eyebrow} title={business.gallery.title} intro={business.gallery.intro} centered />
        <div className="mt-6 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {business.gallery.items.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.1}>
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg sm:rounded-[2rem]">
                {loadingStates[item.title] !== false && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-100">
                    <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                  </div>
                )}

                <div className="relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={900}
                    height={700}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onLoad={() => handleImageLoad(item.title)}
                  />
                  <button
                    onClick={() => setSelectedImage(item)}
                    className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all active:bg-black/30 sm:group-hover:bg-black/20"
                    aria-label={`View ${item.title} larger`}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                      <ZoomIn size={22} className="text-slate-800" />
                    </span>
                  </button>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-base font-semibold text-slate-950 sm:text-lg">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.caption}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/95 p-4 safe-area-bottom"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            className="touch-target absolute right-3 top-3 flex items-center justify-center rounded-full bg-white/15 text-white transition active:bg-white/25 sm:right-4 sm:top-4"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>
          <div
            className="flex w-full max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[70vh] w-full sm:max-h-[80vh]">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                width={1200}
                height={900}
                className="mx-auto max-h-[70vh] w-auto max-w-full rounded-xl object-contain sm:max-h-[80vh] sm:rounded-2xl"
                quality={95}
              />
            </div>
            <div className="mt-4 max-w-lg px-2 text-center">
              <h3 className="text-lg font-semibold text-white sm:text-xl">{selectedImage.title}</h3>
              <p className="mt-1 text-sm text-slate-300 sm:text-base">{selectedImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
