import { promises as fs } from "fs";
import path from "path";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { TrustMetrics } from "@/components/sections/trust-metrics";
import { TrustSection } from "@/components/sections/trust-section";
import { Differentiators } from "@/components/sections/differentiators";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Gallery } from "@/components/sections/gallery";
import { PatientJourney } from "@/components/sections/patient-journey";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Appointment } from "@/components/sections/appointment";
import { Footer } from "@/components/sections/footer";
import { MobileStickyActionsWrapper } from "@/components/sections/mobile-sticky-actions-wrapper";
import { FloatingCTAs } from "@/components/sections/floating-ctas";
import { AiReceptionist } from "@/components/sections/ai-receptionist";
import type { BusinessConfig } from "@/types/business";

async function getBusinessConfig(): Promise<BusinessConfig> {
  const filePath = path.join(process.cwd(), "src/config/business.json");
  const file = await fs.readFile(filePath, "utf8");
  return JSON.parse(file) as BusinessConfig;
}

export default async function Home() {
  const business = await getBusinessConfig();

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-950 pb-[var(--mobile-sticky-bar-height)] md:pb-0" style={{
      ['--brand-primary' as string]: business.brand.primaryColor,
      ['--brand-secondary' as string]: business.brand.secondaryColor,
      ['--brand-accent' as string]: business.brand.accentColor,
      ['--font-brand' as string]: business.brand.fontFamily,
    }}>
      <Navbar business={business} />
      <Hero business={business} />
      <TrustMetrics items={business.trustMetrics.items} />
      <TrustSection business={business} />
      <Differentiators business={business} />
      <About business={business} />
      <Services business={business} />
      <Gallery business={business} />
      <PatientJourney business={business} />
      <Testimonials business={business} />
      <Faq business={business} />
      <Appointment business={business} />
      <Footer business={business} />
      <MobileStickyActionsWrapper business={business} />
      <FloatingCTAs business={business} />
      <AiReceptionist business={business} />
    </div>
  );
}

