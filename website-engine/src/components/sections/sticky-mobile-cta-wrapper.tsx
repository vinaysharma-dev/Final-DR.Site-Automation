"use client";

import { StickyMobileCTA } from "@/components/sections/sticky-mobile-cta";
import type { BusinessConfig } from "@/types/business";
import { useState, useEffect } from "react";

interface StickyMobileCTAWrapperProps {
  business: BusinessConfig;
}

export function StickyMobileCTAWrapper({ business }: StickyMobileCTAWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 400px
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return <StickyMobileCTA business={business} />;
}
