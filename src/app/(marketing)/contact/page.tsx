"use client";

import React, { useState } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  CheckCircle,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { BRAND } from "@/lib/constants/brand";

const INDIAN_STATES = [
  "Uttar Pradesh", "Haryana", "Rajasthan", "Gujarat", "Maharashtra",
  "Punjab", "Tamil Nadu", "Karnataka", "Madhya Pradesh", "Delhi NCR",
  "Himachal Pradesh", "Uttarakhand", "Bihar", "Jharkhand", "Other",
];

const ENQUIRY_TYPES = [
  "Power Trading & IEX Bidding Advisory",
  "Group Captive Solar / Wind PPA (26:51 SPV)",
  "Open Access Execution (SLDC Standing Clearance)",
  "Rooftop Solar – CAPEX / OPEX / RESCO",
  "ABT 0.2s SEM Metering Installation",
  "Energy Cost Audit & Bill Reconciliation",
  "REC / ESCerts Trading",
  "DSM Penalty Reduction Advisory",
  "Other / General Inquiry",
];

const leadSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  designation: z.string().min(2, "Designation is required"),
  email: z.string().email("Enter a valid business email"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  state: z.string().min(1, "Please select your state"),
  contractDemandKva: z.string().min(1, "Contract demand is required"),
  enquiryType: z.string().min(1, "Please select enquiry type"),
  currentDiscomTariffPerKwh: z.string().optional(),
  message: z.string().min(10, "Please describe your requirement (min 10 characters)"),
  consentGiven: z.boolean().refine((v) => v === true, "Please give consent to proceed"),
});

type LeadFormData = z.infer<typeof leadSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>({ resolver: zodResolver(leadSchema) });

  const onSubmit = async (data: LeadFormData) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Submission failed. Please call us directly at " + BRAND.contacts.phonePrimary);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-grid-navy-950 text-white">
      {/* Page Hero */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-grid-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-grid-emerald-500/10 border border-grid-emerald-500/30 text-grid-emerald-400 text-[11px] font-mono font-bold uppercase tracking-widest mb-4">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Request a Confidential{" "}
              <span className="text-grid-emerald-400">Tariff Audit</span>
            </h1>
            <p className="mt-3 text-grid-slate-300 text-sm leading-relaxed max-w-xl">
              Share your plant load profile and Discom bill details with our BEE Certified Energy Auditors. We will
              return a formal savings estimate within 48 working hours — covering IEX exchange procurement, Group
              Captive solar structuring, and SLDC Open Access pathways.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid lg:grid-cols-3 gap-10">
        {/* Lead Form */}
        <div className="lg:col-span-2">
          {submitted ? (
            <div className="bg-grid-navy-900 border border-grid-emerald-500/40 rounded-2xl p-10 text-center">
              <CheckCircle className="w-14 h-14 text-grid-emerald-400 mx-auto mb-4" />
              <h2 className="text-xl font-extrabold text-white">Enquiry Received</h2>
              <p className="text-grid-slate-300 text-sm mt-2 font-mono max-w-md mx-auto">
                Our power trading advisory team will contact you within 48 working hours. For urgent requirements,
                call our 24×7 desk:{" "}
                <a href={`tel:${BRAND.contacts.phonePrimary}`} className="text-grid-emerald-400 font-bold">
                  {BRAND.contacts.phonePrimary}
                </a>
              </p>
              <Link
                href="/"
                className="mt-6 inline-block px-5 py-3 rounded-xl bg-grid-navy-800 border border-grid-slate-700 hover:bg-grid-navy-700 text-white font-mono text-sm font-bold transition-colors"
              >
                Back to Homepage
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-6 sm:p-8 space-y-5"
            >
              <h2 className="text-lg font-extrabold text-white border-b border-grid-slate-800 pb-4 mb-2">
                Industrial Load Enquiry Form
              </h2>

              {/* Row 1 */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-grid-slate-400 mb-1.5">
                    Company / Plant Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    {...register("companyName")}
                    placeholder="e.g. Shree Cement Ltd., Unit IV"
                    className="w-full bg-grid-navy-950 border border-grid-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono placeholder-grid-slate-600 focus:outline-none focus:border-grid-emerald-500 transition-colors"
                  />
                  {errors.companyName && (
                    <p className="text-red-400 text-[11px] font-mono mt-1">{errors.companyName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-grid-slate-400 mb-1.5">
                    Contact Person Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    {...register("contactName")}
                    placeholder="e.g. Rajesh Kumar Gupta"
                    className="w-full bg-grid-navy-950 border border-grid-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono placeholder-grid-slate-600 focus:outline-none focus:border-grid-emerald-500 transition-colors"
                  />
                  {errors.contactName && (
                    <p className="text-red-400 text-[11px] font-mono mt-1">{errors.contactName.message}</p>
                  )}
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-grid-slate-400 mb-1.5">
                    Designation <span className="text-red-400">*</span>
                  </label>
                  <input
                    {...register("designation")}
                    placeholder="e.g. GM – Electrical & Utilities"
                    className="w-full bg-grid-navy-950 border border-grid-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono placeholder-grid-slate-600 focus:outline-none focus:border-grid-emerald-500 transition-colors"
                  />
                  {errors.designation && (
                    <p className="text-red-400 text-[11px] font-mono mt-1">{errors.designation.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-grid-slate-400 mb-1.5">
                    Mobile Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    {...register("phone")}
                    placeholder="10-digit Indian mobile"
                    maxLength={10}
                    className="w-full bg-grid-navy-950 border border-grid-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono placeholder-grid-slate-600 focus:outline-none focus:border-grid-emerald-500 transition-colors"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-[11px] font-mono mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-grid-slate-400 mb-1.5">
                    Business Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="e.g. energy@company.co.in"
                    className="w-full bg-grid-navy-950 border border-grid-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono placeholder-grid-slate-600 focus:outline-none focus:border-grid-emerald-500 transition-colors"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-[11px] font-mono mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-grid-slate-400 mb-1.5">
                    Plant State <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      {...register("state")}
                      className="w-full bg-grid-navy-950 border border-grid-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-grid-emerald-500 transition-colors appearance-none"
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grid-slate-500 pointer-events-none" />
                  </div>
                  {errors.state && (
                    <p className="text-red-400 text-[11px] font-mono mt-1">{errors.state.message}</p>
                  )}
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-grid-slate-400 mb-1.5">
                    Contract Demand (kVA / MVA) <span className="text-red-400">*</span>
                  </label>
                  <input
                    {...register("contractDemandKva")}
                    placeholder="e.g. 5,000 kVA or 12.5 MVA"
                    className="w-full bg-grid-navy-950 border border-grid-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono placeholder-grid-slate-600 focus:outline-none focus:border-grid-emerald-500 transition-colors"
                  />
                  {errors.contractDemandKva && (
                    <p className="text-red-400 text-[11px] font-mono mt-1">{errors.contractDemandKva.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-grid-slate-400 mb-1.5">
                    Current Discom Tariff (₹/kWh) <span className="text-grid-slate-600">(approx.)</span>
                  </label>
                  <input
                    {...register("currentDiscomTariffPerKwh")}
                    placeholder="e.g. ₹8.40 / kWh all-in"
                    className="w-full bg-grid-navy-950 border border-grid-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono placeholder-grid-slate-600 focus:outline-none focus:border-grid-emerald-500 transition-colors"
                  />
                </div>
              </div>

              {/* Enquiry Type */}
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-grid-slate-400 mb-1.5">
                  Nature of Enquiry <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register("enquiryType")}
                    className="w-full bg-grid-navy-950 border border-grid-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-grid-emerald-500 transition-colors appearance-none"
                  >
                    <option value="">Select enquiry type</option>
                    {ENQUIRY_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grid-slate-500 pointer-events-none" />
                </div>
                {errors.enquiryType && (
                  <p className="text-red-400 text-[11px] font-mono mt-1">{errors.enquiryType.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-grid-slate-400 mb-1.5">
                  Describe Your Requirement <span className="text-red-400">*</span>
                </label>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="e.g. Our steel rolling plant in Meerut has a 8 MVA sanctioned demand. We want to explore Group Captive solar + IEX exchange combination to reduce our current Uttar Pradesh PVVNL tariff of ₹8.20/kWh. Please advise on the Open Access standing clearance requirements..."
                  className="w-full bg-grid-navy-950 border border-grid-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono placeholder-grid-slate-600 focus:outline-none focus:border-grid-emerald-500 transition-colors resize-none"
                />
                {errors.message && (
                  <p className="text-red-400 text-[11px] font-mono mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Consent */}
              <div className="flex items-start space-x-3">
                <input
                  {...register("consentGiven")}
                  type="checkbox"
                  id="consent"
                  className="mt-0.5 w-4 h-4 rounded border-grid-slate-700 bg-grid-navy-800 text-grid-emerald-500 focus:ring-grid-emerald-500"
                />
                <label htmlFor="consent" className="text-grid-slate-400 text-xs leading-relaxed">
                  I consent to Topnotch Energy Solutions contacting me regarding this enquiry. My data will be
                  used solely for power advisory purposes and not shared with third parties without consent.
                </label>
              </div>
              {errors.consentGiven && (
                <p className="text-red-400 text-[11px] font-mono">{errors.consentGiven.message}</p>
              )}

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-xs font-mono">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-grid-emerald-500 hover:bg-grid-emerald-400 disabled:opacity-60 text-grid-navy-950 font-extrabold font-mono text-sm transition-all shadow-lg shadow-grid-emerald-500/20 flex items-center justify-center space-x-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Enquiry...</span>
                  </>
                ) : (
                  <span>Submit — Request Tariff Audit</span>
                )}
              </button>
              <p className="text-grid-slate-600 text-[10px] font-mono text-center">
                Expected response: 48 working hours | Confidential plant data policy applies
              </p>
            </form>
          )}
        </div>

        {/* Contact Info Sidebar */}
        <div className="space-y-5">
          {/* Office */}
          <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-5">
            <h3 className="text-white font-extrabold text-sm mb-4">Registered Office</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-grid-cyan-400 flex-shrink-0 mt-0.5" />
                <address className="not-italic font-mono text-xs text-grid-slate-300 leading-relaxed">
                  {BRAND.headquarters.fullAddress}
                </address>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-grid-emerald-400 flex-shrink-0" />
                <div className="font-mono text-xs">
                  <a href={`tel:${BRAND.contacts.phonePrimary}`} className="text-white hover:text-grid-emerald-400 transition-colors">
                    {BRAND.contacts.phonePrimary}
                  </a>
                  <span className="text-grid-slate-600 mx-1">/</span>
                  <a href={`tel:${BRAND.contacts.phoneSecondary}`} className="text-grid-slate-400 hover:text-grid-emerald-400 transition-colors">
                    {BRAND.contacts.phoneSecondary}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-grid-amber-400 flex-shrink-0" />
                <a href={`mailto:${BRAND.contacts.emailGeneral}`} className="text-grid-slate-300 hover:text-white font-mono text-xs transition-colors">
                  {BRAND.contacts.emailGeneral}
                </a>
              </div>
            </div>
          </div>

          {/* Desk Hours */}
          <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-5">
            <h3 className="text-white font-extrabold text-sm mb-3 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-grid-emerald-400" />
              <span>Desk Availability</span>
            </h3>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-grid-slate-400">Advisory Helpdesk</span>
                <span className="text-white">Mon–Sat, 9:00–19:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-grid-slate-400">24×7 NOC – RTM Bids</span>
                <span className="text-grid-emerald-400 font-bold">24 Hours / 365 Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-grid-slate-400">DAM Bidding Window</span>
                <span className="text-white">10:00–12:00 Daily</span>
              </div>
              <div className="flex justify-between">
                <span className="text-grid-slate-400">SLDC Emergency Ops</span>
                <span className="text-white">On-call 24×7</span>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={BRAND.contacts.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl p-5 hover:bg-[#25D366]/20 transition-colors"
          >
            <MessageSquare className="w-8 h-8 text-[#25D366]" />
            <div>
              <div className="text-white font-bold text-sm">WhatsApp the 24×7 Desk</div>
              <div className="text-grid-slate-400 font-mono text-xs">Instant response for urgent dispatch queries</div>
            </div>
          </a>

          {/* Quick Links */}
          <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-5">
            <h3 className="text-white font-bold text-sm mb-3">Quick Links</h3>
            <div className="space-y-2 text-xs font-mono">
              {[
                { label: "Plant ROI Calculator", href: "/tools/open-access-calculator" },
                { label: "Live 96-Block IEX Terminal", href: "/market-intelligence" },
                { label: "Case Studies", href: "/case-studies" },
                { label: "Statutory Compliance", href: "/statutory-compliance" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-grid-slate-400 hover:text-grid-emerald-400 transition-colors py-0.5"
                >
                  → {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
