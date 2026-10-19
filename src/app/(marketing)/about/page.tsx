import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Zap,
  BarChart3,
  Users,
  MapPin,
  Phone,
  Mail,
  Award,
  CheckCircle,
  TrendingUp,
  Globe,
} from "lucide-react";
import { BRAND } from "@/lib/constants/brand";

export const metadata: Metadata = {
  title: "About Us | Topnotch Energy Solutions – NOAR-Registered Power Trading Advisory",
  description:
    "Topnotch Energy Solutions is a CERC Category-IV advisory firm and NOAR-registered Open Access consultant headquartered in Ghaziabad, UP. BEE Certified Energy Auditors, CEA 0.2s SEM specialists, serving heavy industries across 14 Indian states.",
  openGraph: {
    title: "About Topnotch Energy Solutions",
    description:
      "NOAR-registered power trading advisory and Group Captive Open Access consultant. Serving industrial consumers across 14 states with IEX/PXIL algorithmic trading, SLDC standing clearances, and BEE-grade energy audits.",
    type: "website",
  },
};

const LEADERSHIP = [
  {
    name: "Mr. Rajeev Vats",
    role: "Director – Power Trading & Open Access",
    credentials: "NOAR-Registered Consultant | CERC Category-IV Advisory",
    bio: "15+ years in short-term power markets, DAM/RTM bidding strategy, and interstate Open Access coordination across RLDC (NR) and SLDC (UP, Haryana, Rajasthan). Former PTC India analyst.",
    expertise: ["DAM/RTM Algorithmic Bidding", "SLDC Standing Clearances", "GNA/T-GNA Procedures", "ABT Settlement"],
  },
  {
    name: "Mr. Ankit Sharma",
    role: "Head – Renewable Energy & Group Captive",
    credentials: "BEE Certified Energy Auditor | MNRE Empanelled",
    bio: "Structured 14+ Group Captive Solar-Wind power purchase agreements under the Electricity Act 2003 Section 9 (captive) framework. Expert in ALMM-certified module procurement and CERC GDAM green tariff optimization.",
    expertise: ["Group Captive (26:51 Rule)", "GDAM/GTAM Procurement", "REC & ESCerts", "ALMM-II Panels"],
  },
  {
    name: "Ms. Priya Singh",
    role: "Lead – ABT Metering & SCADA Telemetry",
    credentials: "CEA 0.2s SEM Specialist | SLDC-Certified",
    bio: "Commissioning engineer for 40+ ABT 0.2s Class Special Energy Meter (SEM) installations under PGCIL/STU telemetry frameworks. Manages real-time SCADA data integration with SLDC (UP) and RLDC (NR) scheduling portals.",
    expertise: ["ABT 0.2s SEM Installation", "CT/PT Calibration", "SLDC Telemetry", "DSM Compliance"],
  },
];

const MILESTONES = [
  { year: "2015", event: "Founded in Ghaziabad, UP as a power trading advisory firm" },
  { year: "2017", event: "Registered as NOAR Institutional Consultant on National Open Access Registry" },
  { year: "2018", event: "First Group Captive Solar PPA signed – 6.8 MW for DS Group FMCG, Noida" },
  { year: "2019", event: "Expanded to ABT 0.2s SEM metering infrastructure services; first SLDC telemetry project" },
  { year: "2021", event: "Crossed ₹50 Cr cumulative annual savings facilitated for industrial clients" },
  { year: "2022", event: "Post-MNRE Green Energy Open Access Rules (GoI 2022) – launched 100 kW GDAM rooftop advisory" },
  { year: "2023", event: "Reached 14 state coverage; ₹100 Cr annual savings milestone; first HPX (Hindi Power Exchange) bidding client onboarded" },
  { year: "2024", event: "Launched 24x7 NOC Bidding Desk for RTM real-time market participation" },
  { year: "2025", event: "Onboarded 110+ active industrial consumers; total facilitated savings exceeding ₹185 Cr" },
];

const ACCREDITATIONS = [
  {
    icon: Shield,
    label: "NOAR Institutional Consultant",
    detail: "National Open Access Registry (Government of India, MoP)",
    color: "text-grid-emerald-400",
  },
  {
    icon: Award,
    label: "CERC Category-IV Advisory",
    detail: "Central Electricity Regulatory Commission, New Delhi",
    color: "text-grid-cyan-400",
  },
  {
    icon: CheckCircle,
    label: "BEE Certified Energy Auditors",
    detail: "Bureau of Energy Efficiency, Ministry of Power",
    color: "text-grid-amber-400",
  },
  {
    icon: Zap,
    label: "CEA 0.2s SEM Infrastructure",
    detail: "Central Electricity Authority – Special Energy Meter Standards",
    color: "text-purple-400",
  },
  {
    icon: Globe,
    label: "QCA – Pooling Substations",
    detail: "Qualified Coordinating Agency for Group Captive Renewable Plants",
    color: "text-blue-400",
  },
];

const COVERAGE_STATES = [
  "Uttar Pradesh", "Haryana", "Rajasthan", "Gujarat", "Maharashtra",
  "Punjab", "Tamil Nadu", "Karnataka", "Madhya Pradesh",
  "Delhi NCR", "Himachal Pradesh", "Uttarakhand", "Bihar", "Jharkhand",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-grid-navy-950 text-white">
      {/* Page Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-grid-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-grid-navy-950 via-grid-navy-900/80 to-grid-navy-950 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-grid-emerald-500/10 border border-grid-emerald-500/30 text-grid-emerald-400 text-[11px] font-mono font-bold uppercase tracking-widest mb-4">
              About Us
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              India&apos;s Enterprise{" "}
              <span className="text-grid-emerald-400">Power Trading</span> &amp;{" "}
              <span className="text-grid-cyan-400">Open Access</span> Advisory
            </h1>
            <p className="mt-4 text-grid-slate-300 text-base leading-relaxed max-w-2xl">
              Topnotch Energy Solutions is a NOAR-registered institutional consultant and CERC Category-IV advisory
              firm headquartered in Ghaziabad, Uttar Pradesh. Since 2015, we have been enabling industrial consumers
              across 14 Indian states to reduce their power cost by 18%–42% through IEX/PXIL algorithmic trading,
              Group Captive renewable procurement, and end-to-end SLDC/RLDC Open Access execution.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="px-5 py-3 rounded-xl bg-grid-emerald-500 hover:bg-grid-emerald-400 text-grid-navy-950 font-bold font-mono text-sm transition-all shadow-lg shadow-grid-emerald-500/20"
              >
                Schedule a Tariff Audit
              </Link>
              <Link
                href="/tools/open-access-calculator"
                className="px-5 py-3 rounded-xl border border-grid-slate-700 bg-grid-navy-900 hover:bg-grid-navy-800 text-white font-mono text-sm font-bold transition-colors"
              >
                Plant ROI Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 border-b border-grid-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "₹185 Cr+", label: "Total Savings Facilitated", sub: "Across 110+ active clients" },
            { value: "14", label: "States Operational Coverage", sub: "SLDC/RLDC standing clearances" },
            { value: "40+", label: "ABT 0.2s SEM Installations", sub: "CEA-standard Special Energy Meters" },
            { value: "10 Years", label: "Continuous Operations", sub: "Since 2015, Ghaziabad, UP" },
          ].map((m) => (
            <div key={m.label} className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-5">
              <div className="text-2xl sm:text-3xl font-extrabold text-grid-emerald-400 font-mono tabular-nums">
                {m.value}
              </div>
              <div className="text-white font-bold text-sm mt-1">{m.label}</div>
              <div className="text-grid-slate-500 text-[11px] font-mono mt-0.5">{m.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Philosophy */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-grid-slate-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-grid-cyan-400">
              Our Mission
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 leading-tight">
              Making India&apos;s Power Markets Work for Heavy Industry
            </h2>
            <p className="text-grid-slate-300 text-sm leading-relaxed mt-4">
              The Indian power ecosystem — with its 96 time-blocks, IEX/PXIL market mechanisms, Deviation Settlement
              Mechanism (DSM) under CERC regulations, and complex Open Access framework governed by Sections 38–42 of
              the Electricity Act 2003 — demands specialist expertise that most industrial enterprises do not have in-house.
            </p>
            <p className="text-grid-slate-300 text-sm leading-relaxed mt-3">
              Topnotch Energy Solutions bridges this gap. We act as the in-house power procurement desk for our clients:
              executing 96-block DAM, GDAM, and RTM bids on IEX and PXIL, negotiating bilateral PPAs and banking
              contracts, filing SLDC standing clearance applications, managing ABT metering infrastructure, and
              continuously optimising the blended procurement tariff against the prevailing DISCOM retail tariff schedule.
            </p>
            <div className="mt-6 space-y-3">
              {[
                "CERC (Power Market) Regulations 2021 – full compliance advisory",
                "Electricity Act 2003 Sections 38–42 – Open Access & captive rights",
                "Ministry of Power Green Energy Open Access Rules, 2022",
                "CEA (Installation & Operation of Meters) Amendment Regulations 2019",
                "CERC (Deviation Settlement Mechanism) Regulations 2022",
              ].map((item) => (
                <div key={item} className="flex items-start space-x-2 text-xs text-grid-slate-300">
                  <CheckCircle className="w-4 h-4 text-grid-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-6">
              <h3 className="text-white font-bold text-sm mb-3 flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-grid-cyan-400" />
                <span>Why IEX Over DISCOM for Industrial Consumers?</span>
              </h3>
              <p className="text-grid-slate-400 text-xs leading-relaxed">
                Industrial DISCOM tariffs across UP, Haryana, and Rajasthan averaged ₹8.20–₹9.80/kWh in FY 2024-25
                (including fixed charges, fuel surcharge, and wheeling). IEX DAM Solar Hour slots (Blocks 25–64, 06:15
                to 16:00 IST) cleared at ₹2.85–₹3.40/kWh in the same period — a direct 58%–65% tariff reduction on
                replacement units, before accounting for wheeling charges and CSS.
              </p>
            </div>
            <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-6">
              <h3 className="text-white font-bold text-sm mb-3 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-grid-amber-400" />
                <span>Group Captive vs. Third-Party Open Access</span>
              </h3>
              <p className="text-grid-slate-400 text-xs leading-relaxed">
                Under Section 9 of the Electricity Act, Group Captive plants (minimum 26% equity by captive user group,
                51% consumption by members) are fully exempt from Cross-Subsidy Surcharge (CSS) and Additional Surcharge
                (AS) — the two largest cost components that make Third-Party Open Access economics marginal for most
                states. A 6 MW Group Captive Solar farm delivering power at ₹3.85/kWh all-in (including wheeling at
                33kV) versus a DISCOM rate of ₹8.50/kWh yields a landed saving of ₹4.65/kWh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-grid-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-grid-emerald-400">
              Leadership Team
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Specialists in Indian Power Markets
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {LEADERSHIP.map((leader) => (
              <div
                key={leader.name}
                className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-6 hover:border-grid-slate-700 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-grid-emerald-500/20 to-grid-cyan-600/20 border border-grid-emerald-500/30 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-grid-emerald-400" />
                </div>
                <h3 className="text-white font-extrabold text-sm">{leader.name}</h3>
                <p className="text-grid-cyan-400 font-mono text-[11px] mt-0.5">{leader.role}</p>
                <p className="text-grid-slate-500 font-mono text-[10px] mt-0.5">{leader.credentials}</p>
                <p className="text-grid-slate-300 text-xs leading-relaxed mt-3">{leader.bio}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {leader.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-grid-navy-800 border border-grid-slate-700 text-grid-slate-400 font-mono text-[10px]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-grid-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-grid-amber-400">
              Corporate Timeline
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">10 Years of Power Market Leadership</h2>
          </div>
          <div className="relative pl-8 border-l border-grid-slate-800 space-y-6">
            {MILESTONES.map((m) => (
              <div key={m.year} className="relative">
                <div className="absolute -left-[37px] w-6 h-6 rounded-full bg-grid-navy-900 border-2 border-grid-emerald-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-grid-emerald-400" />
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-grid-emerald-400 font-mono font-extrabold text-sm tabular-nums w-12 flex-shrink-0">
                    {m.year}
                  </span>
                  <p className="text-grid-slate-300 text-sm leading-relaxed">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-grid-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-grid-cyan-400">
              Accreditations &amp; Registrations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">Regulatory Standing</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ACCREDITATIONS.map((acc) => {
              const Icon = acc.icon;
              return (
                <div
                  key={acc.label}
                  className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-5 flex items-start space-x-4 hover:border-grid-slate-700 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-grid-navy-800 border border-grid-slate-700 flex items-center justify-center flex-shrink-0">
                    <Icon className={`w-5 h-5 ${acc.color}`} />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{acc.label}</div>
                    <div className="text-grid-slate-400 text-xs font-mono mt-0.5">{acc.detail}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* State Coverage */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-grid-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-grid-emerald-400">
              Geographic Coverage
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-2">14-State SLDC/RLDC Operational Network</h2>
            <p className="text-grid-slate-400 text-sm font-mono mt-2">
              Standing clearances and registered clients across Northern, Western &amp; Southern regions
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {COVERAGE_STATES.map((state) => (
              <span
                key={state}
                className="px-3 py-1.5 rounded-lg bg-grid-navy-900 border border-grid-slate-800 text-grid-slate-300 font-mono text-xs hover:border-grid-emerald-500/40 hover:text-white transition-colors"
              >
                {state}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* HQ & Contact */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-grid-cyan-400">
              Registered Office
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-2">Headquartered in Ghaziabad, UP</h2>
            <p className="text-grid-slate-400 text-sm font-mono mt-3">
              Topnotch Energy Solutions operates from its registered office in Ghaziabad, with proximity to SLDC
              (Uttar Pradesh) in Lucknow and RLDC (Northern Region) in New Delhi — enabling fast-turnaround
              regulatory coordination.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="w-5 h-5 text-grid-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-grid-slate-300 font-mono text-xs">
                  {BRAND.headquarters.fullAddress}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-5 h-5 text-grid-emerald-400 flex-shrink-0" />
                <div className="font-mono text-xs">
                  <a href={`tel:${BRAND.contacts.phonePrimary}`} className="text-white hover:text-grid-emerald-400 transition-colors block">
                    {BRAND.contacts.phonePrimary}
                  </a>
                  <a href={`tel:${BRAND.contacts.phoneSecondary}`} className="text-grid-slate-400 hover:text-grid-emerald-400 transition-colors block">
                    {BRAND.contacts.phoneSecondary}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-5 h-5 text-grid-amber-400 flex-shrink-0" />
                <a href={`mailto:${BRAND.contacts.emailGeneral}`} className="text-grid-slate-300 hover:text-white font-mono text-xs transition-colors">
                  {BRAND.contacts.emailGeneral}
                </a>
              </div>
            </div>
          </div>
          <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-6">
            <h3 className="text-white font-extrabold text-base mb-4">24×7 Bidding Desk Access</h3>
            <p className="text-grid-slate-400 text-xs font-mono leading-relaxed mb-6">
              India&apos;s electricity markets operate in real-time. Our 24×7 NOC (Network Operations Center) monitors
              ABT meter telemetry, IEX RTM block windows, and SLDC scheduling in continuous shifts — ensuring your
              industrial plant is never exposed to an avoidable DSM penalty or missed a low-priced RTM arbitrage window.
            </p>
            <div className="space-y-2">
              <Link
                href="/contact"
                className="block w-full py-3 rounded-xl bg-grid-emerald-500 hover:bg-grid-emerald-400 text-grid-navy-950 font-bold font-mono text-sm transition-all text-center shadow-lg shadow-grid-emerald-500/20"
              >
                Schedule a Tariff Audit
              </Link>
              <a
                href={BRAND.contacts.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 rounded-xl border border-grid-slate-700 bg-grid-navy-800 hover:bg-grid-navy-700 text-white font-mono text-sm font-bold transition-colors text-center"
              >
                WhatsApp 24×7 Desk
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
