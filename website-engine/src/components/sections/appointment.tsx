"use client";

import { useState } from "react";
import { Phone, MapPin, Clock, MessageCircle, CheckCircle, Calendar, User, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BusinessConfig } from "@/types/business";

interface AppointmentProps {
  business: BusinessConfig;
}

export function Appointment({ business }: AppointmentProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const inputClass =
    "min-h-12 w-full rounded-xl border-0 bg-white/10 px-4 py-3 text-base text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50";

  if (isSubmitted) {
    return (
      <section id="appointment" className="px-[var(--section-px)] py-8 sm:py-14 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div
            className="overflow-hidden rounded-2xl p-6 text-center text-white sm:rounded-[2rem] sm:p-12 lg:p-16"
            style={{ backgroundColor: "var(--brand-primary)" }}
          >
            <div className="mb-5 flex justify-center sm:mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 sm:h-20 sm:w-20">
                <CheckCircle size={32} className="text-white sm:w-10 sm:h-10" />
              </div>
            </div>
            <h2 className="text-heading font-bold">Appointment Requested!</h2>
            <p className="text-body mt-3 text-white/90 sm:mt-4">
              Thank you for choosing us. We&apos;ll confirm your appointment within 30 minutes.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              className="mt-6 min-h-12 w-full bg-white text-[color:var(--brand-primary)] hover:bg-white/90 sm:mt-8 sm:w-auto"
            >
              Book Another Appointment
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="appointment" className="px-[var(--section-px)] py-8 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div
          className="overflow-hidden rounded-2xl p-5 text-white sm:rounded-[2rem] sm:p-10 lg:p-16"
          style={{ backgroundColor: "var(--brand-primary)" }}
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-12">
            <div>
              <p className="text-eyebrow font-semibold uppercase text-white/70">
                {business.appointment.eyebrow}
              </p>
              <h2 className="text-heading mt-2 font-bold tracking-tight sm:mt-3">
                {business.appointment.title}
              </h2>
              <p className="text-body mt-3 max-w-2xl text-white/85 sm:mt-4">
                {business.appointment.intro}
              </p>

              <div className="mt-6 space-y-4 sm:mt-8">
                {business.appointment.departments && (
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-white/90">
                      <Building2 size={16} aria-hidden="true" />
                      Select Department
                    </label>
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className={inputClass}
                    >
                      <option value="" className="text-slate-900">Choose department...</option>
                      {business.appointment.departments.map((dept) => (
                        <option key={dept} value={dept} className="text-slate-900">{dept}</option>
                      ))}
                    </select>
                  </div>
                )}

                {business.appointment.doctors && (
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-white/90">
                      <User size={16} aria-hidden="true" />
                      Preferred Doctor
                    </label>
                    <select
                      value={selectedDoctor}
                      onChange={(e) => setSelectedDoctor(e.target.value)}
                      className={inputClass}
                    >
                      <option value="" className="text-slate-900">Choose doctor...</option>
                      {business.appointment.doctors.map((doctor) => (
                        <option key={doctor} value={doctor} className="text-slate-900">{doctor}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-white/90">
                    <Calendar size={16} aria-hidden="true" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className={`${inputClass} [color-scheme:dark]`}
                  />
                </div>

                {business.appointment.timeSlots && (
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-white/90">
                      <Clock size={16} aria-hidden="true" />
                      Preferred Time
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                      {business.appointment.timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`min-h-12 rounded-xl px-2 py-2.5 text-sm font-medium transition-all active:scale-[0.97] ${
                            selectedTime === time
                              ? "bg-white text-[color:var(--brand-primary)]"
                              : "bg-white/10 text-white hover:bg-white/20"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                <Button
                  className="min-h-12 w-full text-base font-semibold"
                  style={{ backgroundColor: "white", color: "var(--brand-primary)" }}
                  onClick={handleSubmit}
                >
                  Book Consultation
                </Button>
                <a
                  href={`https://wa.me/${business.contact.whatsapp.replace(/\D/g, "")}`}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-white px-5 text-sm font-semibold text-white transition active:scale-[0.98] hover:bg-white/10 sm:w-auto sm:px-6 sm:text-base"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  WhatsApp
                </a>
              </div>

              <p className="mt-5 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-xs text-white/90 backdrop-blur sm:mt-6 sm:px-4 sm:text-sm">
                <CheckCircle size={14} className="shrink-0" aria-hidden="true" />
                We&apos;ll confirm your appointment within 30 minutes
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur sm:rounded-[1.5rem] sm:p-7">
              <h3 className="mb-4 text-base font-semibold sm:text-lg">Quick Info</h3>
              <div className="space-y-4 text-sm text-white/90">
                <div className="flex items-start gap-3">
                  <Phone size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold">Call</p>
                    <a href={`tel:${business.contact.phone}`} className="break-all transition hover:text-white">
                      {business.contact.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold">Hours</p>
                    <p>{business.contact.openingHours}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="leading-relaxed">{business.contact.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
