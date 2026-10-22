import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
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
  CheckCircle2,
  TrendingUp,
  Globe2,
  ArrowRight,
  Clock,
  Sparkles,
  Building,
  PhoneCall,
  Scale,
} from "lucide-react";
import { BRAND } from "@/lib/constants/brand";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { PageDivider } from "@/components/ui/PageDivider";
import { CornerIndustrialWatermark } from "@/components/ui/CornerIndustrialWatermark";
import { AccreditationsShowcase } from "@/components/home/AccreditationsShowcase";
import { SplitImageMergeSection } from "@/components/ui/SplitImageMergeSection";

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
  { year: "2015", title: "Inception in Ghaziabad", event: "Founded in Ghaziabad, UP as an industrial power procurement and regulatory advisory firm." },
  { year: "2017", title: "NOAR Registration", event: "Accredited as NOAR Institutional Consultant on the Ministry of Power National Open Access Registry." },
  { year: "2018", title: "First Group Captive PPA", event: "Structured landmark 6.8 MW Group Captive Solar PPA for DS Group FMCG manufacturing campus in Noida." },
  { year: "2019", title: "ABT Metering Division", event: "Commissioned dedicated ABT 0.2s SEM telemetry engineering team; executed first SLDC real-time telemetry bay." },
  { year: "2021", title: "₹50 Cr Savings Milestone", event: "Crossed ₹50 Crores in cumulative annual power cost savings facilitated for steel and textile clients." },
  { year: "2022", title: "GEOA 100 kW Rollout", event: "Pioneered Green Energy Open Access (GEOA 2022) adoption for SME manufacturing loads above 100 kW." },
  { year: "2023", title: "14-State Network", event: "Reached active standing clearances across 14 state SLDCs; onboarded first HPX exchange bidding industrial client." },
  { year: "2024", title: "24×7 NOC Bidding Desk", event: "Launched continuous 24×7 desk monitoring 48 RTM trading windows and real-time DSM frequency deviations." },
  { year: "2025", title: "₹185 Cr+ Cumulative Savings", event: "Expanded portfolio to 110+ industrial enterprises with over ₹185 Crores in verified landed savings." },
];

const ACCREDITATIONS = [
  {
    icon: Shield,
    label: "NOAR Institutional Consultant",
    detail: "National Open Access Registry (Government of India, MoP)",
    badge: "Ministry of Power",
  },
  {
    icon: Award,
    label: "CERC Category-IV Advisory",
    detail: "Central Electricity Regulatory Commission, New Delhi",
    badge: "CERC Regulated",
  },
  {
    icon: CheckCircle2,
    label: "BEE Certified Energy Auditors",
    detail: "Bureau of Energy Efficiency, Ministry of Power",
    badge: "Grade-A Certified",
  },
  {
    icon: Zap,
    label: "CEA 0.2s SEM Infrastructure",
    detail: "Central Electricity Authority – Special Energy Meter Standards",
    badge: "CEA Compliant",
  },
  {
    icon: Globe2,
    label: "QCA – Pooling Substations",
    detail: "Qualified Coordinating Agency for Group Captive Renewable Plants",
    badge: "RLDC / SLDC",
  },
];

const COVERAGE_STATES = [
  "Uttar Pradesh", "Haryana", "Rajasthan", "Gujarat", "Maharashtra",
  "Punjab", "Tamil Nadu", "Karnataka", "Madhya Pradesh",
  "Delhi NCR", "Himachal Pradesh", "Uttarakhand", "Bihar", "Jharkhand",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      
      {/* =========================================================================
          HERO SECTION WITH CINEMATIC DISPATCH PHOTOGRAPHY
         ========================================================================= */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-[#0A0F1D] py-20 px-4 sm:px-6 lg:px-8 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=2000&q=80"
            alt="Corporate clean energy infrastructure"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1D]/95 via-[#0A0F1D]/85 to-[#0A0F1D]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>Headquartered in Ghaziabad, UP • Serving 14 States</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Pioneering India&apos;s Industrial{" "}
              <span className="text-[#F8BC26]">
                Open Access Revolution
              </span>
            </h1>
            
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
              Topnotch Energy Solutions is a NOAR-registered institutional consultant and CERC Category-IV power advisory firm. Since 2015, we have enabled heavy manufacturing and commercial power consumers across 14 Indian states to reduce landed electricity costs by 18%–42% through IEX/PXIL exchange trading, Group Captive solar-wind procurement, and end-to-end SLDC/RLDC Open Access execution.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full bg-[#F8BC26] hover:bg-[#eab308] text-[#1C2C34] font-bold text-xs uppercase tracking-wider transition-all shadow-xl active:scale-95 flex items-center space-x-2"
              >
                <span>Schedule a Confidential Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tools/open-access-calculator"
                className="px-6 py-4 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-colors"
              >
                Calculate Factory ROI
              </Link>
            </div>
          </div>
        </div>

        {/* Waaree Fluid Wave Divider: Dark Hero into Ghost Slate Metrics */}
        <div className="absolute bottom-0 inset-x-0 pointer-events-none">
          <PageDivider type="layered-wave" fillColor="#F9FAFB" position="bottom" height={55} />
        </div>
      </section>

      {/* =========================================================================
          KEY METRICS BAND
         ========================================================================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB] border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm">
            <div className="text-3xl sm:text-4xl font-black text-emerald-700 font-mono">
              <AnimatedCounter value={185} prefix="₹" suffix=" Cr+" />
            </div>
            <div className="text-[#1C2C34] font-bold text-sm mt-1.5">Landed Cost Savings</div>
            <div className="text-slate-500 text-xs font-mono mt-0.5">Across 110+ manufacturing clients</div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm">
            <div className="text-3xl sm:text-4xl font-black text-[#1C2C34] font-mono">
              <AnimatedCounter value={14} suffix=" States" />
            </div>
            <div className="text-[#1C2C34] font-bold text-sm mt-1.5">SLDC Regulatory Coverage</div>
            <div className="text-slate-500 text-xs font-mono mt-0.5">Standing clearances &amp; GNA network</div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm">
            <div className="text-3xl sm:text-4xl font-black text-emerald-700 font-mono">
              <AnimatedCounter value={40} suffix="+" />
            </div>
            <div className="text-[#1C2C34] font-bold text-sm mt-1.5">ABT 0.2s SEM Bays</div>
            <div className="text-slate-500 text-xs font-mono mt-0.5">Installed with AMR SCADA modems</div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm">
            <div className="text-3xl sm:text-4xl font-black text-amber-600 font-mono">
              <AnimatedCounter value={380} suffix="+ MW" />
            </div>
            <div className="text-[#1C2C34] font-bold text-sm mt-1.5">Open Access Portfolio</div>
            <div className="text-slate-500 text-xs font-mono mt-0.5">Active schedule management</div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STATUTORY ACCREDITATIONS & REGULATORY STANDING (ANIMATED SHOWCASE)
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-white relative overflow-hidden">
        <CornerIndustrialWatermark type="substation" position="top-right" size={320} opacity={0.06} />
        <CornerIndustrialWatermark type="transmission-tower" position="bottom-left" size={300} opacity={0.06} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D97706]">
              Regulatory Credentials
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1C2C34] tracking-tight">
              Institutional Licences &amp; Regulatory Standing
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
              Our certifications from the Ministry of Power, CERC, and CEA guarantee compliance with every statutory rule.
            </p>
          </div>
        </div>

        {/* Full-Width Single-Line Continuous Rightward Moving Marquee Ticker */}
        <div className="w-full mt-10 relative z-10">
          <AccreditationsShowcase />
        </div>
      </section>

      {/* =========================================================================
          LEADERSHIP TEAM
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB] border-b border-slate-200 relative overflow-hidden">
        <CornerIndustrialWatermark type="windmills" position="top-right" size={300} opacity={0.05} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D97706]">
              Subject Matter Experts
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1C2C34] tracking-tight">
              Power Trading Floor Leadership
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
              Experienced market dispatchers, certified energy auditors, and regulatory liaisons managing industrial portfolios.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {LEADERSHIP.map((leader, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#1C2C34] text-[#F8BC26] flex items-center justify-center font-black text-xl font-mono shadow-md">
                    {leader.name.split(" ")[1]?.charAt(0) || "T"}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#1C2C34] tracking-tight">{leader.name}</h3>
                    <div className="text-xs font-mono text-[#D97706] font-bold mt-0.5">{leader.role}</div>
                    <div className="text-[11px] font-mono text-slate-400 mt-1">{leader.credentials}</div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {leader.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                    Core Specializations:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {leader.expertise.map((exp, eIdx) => (
                      <span
                        key={eIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          INSTITUTIONAL TIMELINE / MILESTONES
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D97706]">
              A Decade of Impact
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1C2C34] tracking-tight">
              Company Milestones &amp; Evolution
            </h2>
          </div>

          <div className="space-y-6">
            {MILESTONES.map((m, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-6 p-6 rounded-3xl bg-[#F9FAFB] border border-slate-200/90 shadow-2xs"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#1C2C34] text-[#F8BC26] flex items-center justify-center font-black text-sm font-mono flex-shrink-0 shadow-md">
                  {m.year}
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#1C2C34]">{m.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          24x7 NOC DISPATCH FLOOR & TRADING OPERATIONS (HALF-MERGING IMAGE ON WHITE)
         ========================================================================= */}
      <SplitImageMergeSection
        badgeText="Ghaziabad NOC Operations Floor"
        badgeIcon={Zap}
        title={
          <>
            Direct Access to India&apos;s <span className="text-[#D97706]">Power Trading Floor</span>
          </>
        }
        description="Our central NOC and power bidding desk in Ghaziabad monitors real-time 15-minute grid frequency dynamics, IEX/PXIL Day-Ahead and Real-Time Market order books, and SLDC scheduling telemetry 24 hours a day, 365 days a year."
        bullets={[
          "Live 96-Block Algorithmic Bidding Optimization",
          "Automated DSM Deviation Settlement Protection",
          "Direct Hotline to Senior Licensed Power Traders",
          "Daily SLDC Scheduling & Reconciliation Audits",
        ]}
        imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Modern high-tech financial operations and power trading floor"
        primaryCta={{
          label: "Call 24x7 NOC Trading Floor",
          href: `tel:${BRAND.contacts.phonePrimary}`,
          icon: PhoneCall,
        }}
        secondaryCta={{
          label: "View Live Market Intelligence",
          href: "/market-intelligence",
          icon: BarChart3,
        }}
        stats={[
          { value: "24x7", label: "NOC Floor", sublabel: "Continuous Bidding" },
          { value: "48 Windows", label: "RTM Auctions", sublabel: "Monitored Daily" },
          { value: "50.0 Hz", label: "Frequency Band", sublabel: "Grid Synchronized" },
        ]}
      />

      {/* =========================================================================
          PAN-INDIA COVERAGE STATES
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB] border-b border-slate-200">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D97706]">
            Pan-India Standing Clearances
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#1C2C34] tracking-tight">
            14 Industrial States Under Active Management
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto pt-4">
            {COVERAGE_STATES.map((state) => (
              <span
                key={state}
                className="px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-2xs font-mono text-xs font-bold text-slate-800"
              >
                📍 {state}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Waaree Fluid Wave Divider: Ghost Slate into Dark Navy Pre-Footer */}
      <PageDivider type="layered-wave" fillColor="#0F172A" bgColor="#F9FAFB" position="bottom" height={60} />

      {/* =========================================================================
          PRE-FOOTER CTA
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0F172A] text-white">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.25em] font-bold text-[#F8BC26]">
            Confidential Consultation
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Speak Directly with Our Power Trading Desk
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-sans">
            Connect directly with our senior energy trading floor in Ghaziabad or schedule an initial 15-minute consultation.
          </p>
          <div className="pt-6 flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-[#F8BC26] hover:bg-[#e6ab1e] text-[#1C2C34] font-bold text-xs uppercase tracking-wider transition-all shadow-xl active:scale-95 flex items-center space-x-2"
            >
              <span>Schedule Strategic Consultation →</span>
            </Link>
            <a
              href={`tel:${BRAND.contacts.phonePrimary}`}
              className="px-6 py-4 rounded-full border border-slate-600 hover:border-white text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center space-x-2"
            >
              <PhoneCall className="w-4 h-4 text-[#F8BC26]" />
              <span>Call 24x7 NOC Floor</span>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
