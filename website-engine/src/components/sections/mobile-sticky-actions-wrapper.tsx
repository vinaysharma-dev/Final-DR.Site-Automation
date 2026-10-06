"use client";

import { MobileStickyActions } from "@/components/sections/mobile-sticky-actions";
import type { BusinessConfig } from "@/types/business";

interface MobileStickyActionsWrapperProps {
  business: BusinessConfig;
}

export function MobileStickyActionsWrapper({ business }: MobileStickyActionsWrapperProps) {
  return <MobileStickyActions business={business} />;
}
