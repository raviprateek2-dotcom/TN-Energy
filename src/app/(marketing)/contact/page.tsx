"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Loader2,
  ChevronDown,
  PhoneCall,
  MessageSquare,
  ShieldCheck,
  Building2,
  FileCheck2,
  Sparkles,
} from "lucide-react";
import { BRAND } from "@/lib/constants/brand";
import { HoneypotField } from "@/components/ui/HoneypotField";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { PageDivider } from "@/components/ui/PageDivider";
import { CornerIndustrialWatermark } from "@/components/ui/CornerIndustrialWatermark";
import { SplitImageMergeSection } from "@/components/ui/SplitImageMergeSection";

const INDIAN_STATES = [
  "Uttar Pradesh", "Haryana", "Rajasthan", "Gujarat", "Maharashtra",
  "Punjab", "Tamil Nadu", "Karnataka", "Madhya Pradesh", "Delhi NCR",
  "Himachal Pradesh", "Uttarakhand", "Bihar", "Jharkhand", "Other",
];

const GSTIN_STATE_MAP: Record<string, string> = {
  "01": "Jammu & Kashmir",
  "02": "Himachal Pradesh",
  "03": "Punjab",
  "04": "Chandigarh",
  "06": "Haryana",
  "07": "Delhi NCR",
  "08": "Rajasthan",
  "09": "Uttar Pradesh",
  "10": "Bihar",
  "20": "Jharkhand",
  "23": "Madhya Pradesh",
  "24": "Gujarat",
  "27": "Maharashtra",
  "29": "Karnataka",
  "33": "Tamil Nadu",
  "36": "Telangana",
  "37": "Andhra Pradesh",
};

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
  email: z.string().email("Enter a valid corporate email"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  gstin: z
    .string()
    .regex(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      "Invalid GSTIN format (e.g., 09AAACT1234F1Z8)"
    )
    .optional()
    .or(z.literal("")),
  state: z.string().min(1, "Please select your state"),
  contractDemandKva: z.string().min(1, "Contract demand is required"),
  enquiryType: z.string().min(1, "Please select enquiry type"),
  currentDiscomTariffPerKwh: z.string().optional(),
  message: z.string().min(6, "Please describe your requirement (min 6 characters)"),
  consentGiven: z.boolean().refine((v) => v === true, "Please give consent to proceed"),
  website: z.string().optional(), // Honeypot
});

type LeadFormData = z.infer<typeof leadSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [gstinFeedback, setGstinFeedback] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      phone: "",
      gstin: "",
      consentGiven: true,
    },
  });

  const watchedGstin = watch("gstin");

  const handleGstinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().trim();
    setValue("gstin", val, { shouldValidate: val.length === 15 });

    if (val.length >= 2) {
      const code = val.slice(0, 2);
      const matchedState = GSTIN_STATE_MAP[code];
      if (matchedState) {
        setGstinFeedback(`${matchedState} Registered Entity`);
        // If state is not selected, auto-populate
        setValue("state", matchedState);
      } else {
        setGstinFeedback(null);
      }
    } else {
      setGstinFeedback(null);
    }
  };

  const onSubmit = async (data: LeadFormData) => {
    setSubmitting(true);
    setError(null);
    try {
      // Post to our resilient API endpoint
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || "Submission failed");
      }

      setReferenceId(resData.referenceId || "TES-CONFIRMED");
      setSubmitted(true);
    } catch {
      // Fallback try to /api/query
      try {
        const fallbackRes = await fetch("/api/query", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.contactName,
            email: data.email,
            contactNo: data.phone,
            message: `${data.companyName} (${data.state}) - Demand: ${data.contractDemandKva} - Type: ${data.enquiryType} - GSTIN: ${data.gstin || "N/A"}: ${data.message}`,
            company: data.companyName,
            state: data.state,
          }),
        });

        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          setReferenceId(fallbackData.queryId || "QRY-CONFIRMED");
          setSubmitted(true);
          return;
        }
      } catch {}

      setError("Submission encountered an issue. Please call our 24x7 desk directly at " + BRAND.contacts.phonePrimary);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#1C2C34]">
      {/* Cinematic Hero Header Banner */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden bg-[#0A0F1D] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
            alt="Corporate power advisory trading office"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1D]/95 via-[#0A0F1D]/85 to-[#0A0F1D]/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[#F8BC26] font-bold">24x7 NOC Bidding Desk Active</span>
            <span className="text-white/40">|</span>
            <span className="text-slate-200">Guaranteed Response SLA &lt; 2 Hours</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Consult Our Power Trading &amp;{" "}
            <span className="text-[#F8BC26]">
              Open Access Advisory Desk
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mt-3 font-sans leading-relaxed">
            Connect directly with our CERC Category-IV power market specialists and BEE Certified Energy Auditors in Ghaziabad for Group Captive structuring, 15-minute IEX bidding optimization, and HT bill audits.
          </p>
        </div>

        {/* Waaree Fluid Wave Divider: Dark Hero into White Form Workspace */}
        <div className="absolute bottom-0 inset-x-0 pointer-events-none">
          <PageDivider type="layered-wave" fillColor="#FFFFFF" position="bottom" height={55} />
        </div>
      </section>

      {/* Main Grid: Form + Office Details */}
      <section className="relative py-12 lg:py-16 bg-white overflow-hidden">
        <CornerIndustrialWatermark type="windmills" position="top-right" size={320} opacity={0.06} />
        <CornerIndustrialWatermark type="substation" position="bottom-left" size={300} opacity={0.06} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
        {/* Left Form Area (2 cols) */}
        <div className="lg:col-span-2">
          {submitted ? (
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-8 sm:p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-[#1C2C34]">
                Enquiry Successfully Registered
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 font-mono max-w-lg mx-auto">
                Your request has been routed to our commercial power desk. A designated energy trader will review your contract demand and SERC tariff slab within 2 hours.
              </p>
              {referenceId && (
                <div className="inline-block px-4 py-2 rounded-xl bg-white border border-emerald-200 text-xs font-mono font-bold text-emerald-800">
                  Tracking Reference: {referenceId}
                </div>
              )}
              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <Link
                  href="/"
                  className="px-6 py-3 rounded-full bg-[#1C2C34] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#F8BC26] hover:text-[#1C2C34] transition-colors"
                >
                  Return to Homepage
                </Link>
                <a
                  href={BRAND.contacts.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#20BD5A] transition-colors"
                >
                  Chat with Desk Now →
                </a>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6"
            >
              <HoneypotField {...register("website")} />

              <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold text-[#1C2C34] tracking-tight">
                    Commercial &amp; Industrial Facility Information
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    All shared electricity data is treated under strict non-disclosure.
                  </p>
                </div>
                <div className="flex items-center space-x-1.5 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 self-start sm:self-center">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Bilateral NDA Protected</span>
                </div>
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1C2C34]">
                    Company / Factory Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("companyName")}
                    type="text"
                    placeholder="e.g. Varun Beverages Ltd"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#F8BC26] focus:border-[#F8BC26] transition-all"
                  />
                  {errors.companyName && (
                    <p className="text-xs text-red-500">{errors.companyName.message}</p>
                  )}
                </div>

                {/* Contact Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1C2C34]">
                    Authorized Contact Person <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("contactName")}
                    type="text"
                    placeholder="e.g. Rajeev Singhal"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#F8BC26] focus:border-[#F8BC26] transition-all"
                  />
                  {errors.contactName && (
                    <p className="text-xs text-red-500">{errors.contactName.message}</p>
                  )}
                </div>

                {/* Designation */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1C2C34]">
                    Designation <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("designation")}
                    type="text"
                    placeholder="e.g. CFO / Plant Head / VP Operations"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#F8BC26] focus:border-[#F8BC26] transition-all"
                  />
                  {errors.designation && (
                    <p className="text-xs text-red-500">{errors.designation.message}</p>
                  )}
                </div>

                {/* Business Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1C2C34]">
                    Corporate Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#F8BC26] focus:border-[#F8BC26] transition-all"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone Number with Carrier Validation */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1C2C34]">
                    Mobile Phone (WhatsApp Enabled) <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    control={control}
                    name="phone"
                    render={({ field }) => (
                      <PhoneInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="98765 43210"
                        error={errors.phone?.message}
                        required
                      />
                    )}
                  />
                </div>

                {/* Optional GSTIN with State Code Detection */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#1C2C34]">
                      Plant GSTIN (Optional)
                    </label>
                    {gstinFeedback && (
                      <span className="text-[11px] font-mono text-emerald-700 font-semibold flex items-center space-x-1">
                        <Sparkles className="w-3 h-3" />
                        <span>{gstinFeedback}</span>
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    maxLength={15}
                    value={watchedGstin || ""}
                    onChange={handleGstinChange}
                    placeholder="e.g. 09AAACT1234F1Z8"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[#F8BC26] focus:border-[#F8BC26] transition-all placeholder:normal-case"
                  />
                  {errors.gstin && (
                    <p className="text-xs text-red-500">{errors.gstin.message}</p>
                  )}
                </div>

                {/* State */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1C2C34]">
                    Plant State (SERC Jurisdiction) <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("state")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#F8BC26] focus:border-[#F8BC26] transition-all bg-white"
                  >
                    <option value="">Select Indian State</option>
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-xs text-red-500">{errors.state.message}</p>
                  )}
                </div>

                {/* Contract Demand */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1C2C34]">
                    Contract Demand (kVA / MVA) <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("contractDemandKva")}
                    type="text"
                    placeholder="e.g. 2,500 kVA or 5 MVA"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#F8BC26] focus:border-[#F8BC26] transition-all font-mono"
                  />
                  {errors.contractDemandKva && (
                    <p className="text-xs text-red-500">{errors.contractDemandKva.message}</p>
                  )}
                </div>

                {/* Enquiry Type */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-[#1C2C34]">
                    Primary Solution Requirement <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("enquiryType")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#F8BC26] focus:border-[#F8BC26] transition-all bg-white"
                  >
                    <option value="">Select Service Vertical</option>
                    {ENQUIRY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.enquiryType && (
                    <p className="text-xs text-red-500">{errors.enquiryType.message}</p>
                  )}
                </div>
              </div>

              {/* Message / Load Details */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1C2C34]">
                  Additional Load Profile or Bill Context <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Share details regarding your connected voltage level (11kV/33kV), monthly electricity bill in ₹ Lakhs, existing rooftop area, or specific Open Access goals."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#F8BC26] focus:border-[#F8BC26] transition-all"
                />
                {errors.message && (
                  <p className="text-xs text-red-500">{errors.message.message}</p>
                )}
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start space-x-2.5 pt-1">
                <input
                  {...register("consentGiven")}
                  type="checkbox"
                  id="consent"
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#F8BC26] focus:ring-[#F8BC26]"
                />
                <label htmlFor="consent" className="text-xs text-gray-600 leading-normal">
                  I authorize Topnotch Energy Solutions to conduct an initial regulatory and tariff review for my facility under bilateral NDA custody and contact me regarding Open Access feasibility.
                </label>
              </div>
              {errors.consentGiven && (
                <p className="text-xs text-red-500">{errors.consentGiven.message}</p>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#F8BC26] hover:bg-[#eab308] text-[#1C2C34] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting to Advisory Desk...</span>
                    </>
                  ) : (
                    <span>Submit Tariff Audit Request →</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Head Office Card */}
          <div className="bg-[#F9FAFB] border border-gray-200/90 rounded-3xl p-6 sm:p-7 space-y-4">
            <div className="flex items-center space-x-2 text-amber-800 font-mono text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              <span>Headquarters</span>
            </div>
            <h3 className="text-base font-bold text-[#1C2C34]">
              Ghaziabad Corporate Office
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed font-mono">
              {BRAND.headquarters.fullAddress}
            </p>

            <div className="pt-4 border-t border-gray-200/80 space-y-3 text-xs font-mono">
              <div className="flex items-center space-x-2.5">
                <PhoneCall className="w-4 h-4 text-amber-700" />
                <a href={`tel:${BRAND.contacts.phonePrimary}`} className="font-bold text-[#1C2C34] hover:text-amber-700">
                  {BRAND.contacts.phonePrimary}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <PhoneCall className="w-4 h-4 text-amber-700" />
                <a href={`tel:${BRAND.contacts.phoneSecondary}`} className="font-bold text-[#1C2C34] hover:text-amber-700">
                  {BRAND.contacts.phoneSecondary}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-sky-700" />
                <a href={`mailto:${BRAND.contacts.emailGeneral}`} className="text-gray-600 hover:text-[#1C2C34]">
                  {BRAND.contacts.emailGeneral}
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200/80">
              <a
                href={BRAND.contacts.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp Desk</span>
              </a>
            </div>
          </div>

          {/* Accreditations Trust Badge */}
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-3xl p-6 space-y-3">
            <div className="flex items-center space-x-2 text-amber-800 font-mono text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>CERC Verified Advisory</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Operating under Central Electricity Regulatory Commission (CERC) Power Market Regulations 2021 and National Open Access Registry (NOAR) consulting accreditation.
            </p>
          </div>
        </div>
      </div>
      </section>

      {/* =========================================================================
          WAAREE-GRADE 24x7 NOC DISPATCH FLOOR CONTACT STRIP (HALF-MERGING IMAGE ON WHITE)
         ========================================================================= */}
      <SplitImageMergeSection
        badgeText="24x7 NOC Dispatch Floor"
        badgeIcon={Sparkles}
        title={
          <>
            Direct Line to Ghaziabad <span className="text-[#D97706]">Bidding Floor</span>
          </>
        }
        description="For live exchange bidding emergencies, SLDC standing clearance status, or urgent RTM power scheduling requests, speak directly with our senior power trader floor in Ghaziabad."
        bullets={[
          "24x7 Continuous Bidding Operations",
          "Average Call Pickup SLA under 3 Rings",
          "Dedicated Account Energy Manager",
          "Bilateral NDA Protected Consultations",
        ]}
        imageUrl="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2000&q=80"
        imageAlt="National power grid transmission infrastructure at sunset"
        primaryCta={{
          label: `Call ${BRAND.contacts.phonePrimary}`,
          href: `tel:${BRAND.contacts.phonePrimary}`,
          icon: PhoneCall,
        }}
        secondaryCta={{
          label: "Open Access Calculator",
          href: "/tools/open-access-calculator",
        }}
        stats={[
          { value: "< 2h SLA", label: "Initial Response", sublabel: "Guaranteed Turnaround" },
          { value: "14 States", label: "Grid Jurisdiction", sublabel: "Active Standing NOCs" },
        ]}
      />
    </main>
  );
}
