export interface TrustSectionItem {
  icon: string;
  title: string;
  description: string;
  highlight: string;
}

export interface FloatingBadges {
  googleRating?: {
    show: boolean;
    rating: string;
    reviewCount: string;
  };
  trustedPatients?: {
    show: boolean;
    count: string;
    label: string;
  };
  experience?: {
    show: boolean;
    years: string;
    label: string;
  };
  sameDayAppointment?: {
    show: boolean;
    text: string;
  };
  availableToday?: {
    show: boolean;
    text: string;
  };
  consultationFee?: {
    show: boolean;
    fee: string;
    label: string;
  };
}

export interface EducationItem {
  year: string;
  degree: string;
  institution: string;
}

export interface SuccessNumbers {
  patients: string;
  smiles: string;
  years: string;
  rating: string;
}

export interface PatientJourneyStep {
  step: string;
  title: string;
  description: string;
  icon: string;
}

export interface Metric {
  label: string;
  value: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  cta?: string;
  treatmentTime?: string;
  painLevel?: string;
  recoveryTime?: string;
}

export interface GalleryItem {
  title: string;
  caption: string;
  image: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Differentiator {
  icon: string;
  text: string;
}

export interface DoctorProfile {
  name: string;
  title: string;
  credentials: string[];
  experience: string;
  bio: string;
  image: string;
  video?: string;
}

export interface BusinessConfig {
  brand: {
    name: string;
    tagline: string;
    shortName: string;
    logoText: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    emergencyPhone?: string;
    openingHours?: string;
    parking?: string;
    googleRating: string;
    reviewCount: string;
  };
  doctor: DoctorProfile;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    imageAlt: string;
    imageSrc: string;
    badges: string[];
    floatingBadges?: FloatingBadges;
  };
  trustMetrics: {
    items: Metric[];
  };
  trustSection: {
    eyebrow: string;
    title: string;
    intro: string;
    items: TrustSectionItem[];
  };
  patientJourney?: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: PatientJourneyStep[];
  };
  about: {
    eyebrow: string;
    title: string;
    description: string[];
    story?: string;
    mission?: string;
    philosophy?: string;
    education?: EducationItem[];
    awards?: string[];
    memberships?: string[];
    certifications?: string[];
    successNumbers?: SuccessNumbers;
    highlights: string[];
    imageAlt: string;
    imageSrc: string;
  };
  differentiators: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Differentiator[];
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    items: ServiceItem[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    intro: string;
    items: GalleryItem[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Testimonial[];
  };
  faq: {
    eyebrow: string;
    title: string;
    intro: string;
    items: FAQItem[];
  };
  appointment: {
    eyebrow: string;
    title: string;
    intro: string;
    departments?: string[];
    doctors?: string[];
    timeSlots?: string[];
  };
  footer: {
    note: string;
    openingHours?: string[];
    quickLinks?: string[];
    social?: Array<{ name: string; url: string }>;
  };
}

