import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  TrendingDown,
  Leaf,
  Factory,
  Download,
  CheckCircle2,
  ShieldCheck,
  Award,
  FileCheck2,
  Scale,
  Sparkles,
} from "lucide-react";
import { IndustrialCaseStudiesFilter } from "@/components/market/IndustrialCaseStudiesFilter";
import { BillComparisonSlider } from "@/components/case-studies/BillComparisonSlider";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { PageDivider } from "@/components/ui/PageDivider";
import { SplitImageMergeSection } from "@/components/ui/SplitImageMergeSection";
import { BRAND } from "@/lib/constants/brand";

export const metadata: Metadata = {
  title: "Client Case Studies | Topnotch Energy Solutions – Industrial Power Cost Reduction",
  description:
    "Verified industrial case studies showing 24%–39% power cost reduction for FMCG, Steel, Textile, and Paper manufacturers across UP, Gujarat, and North India through Group Captive Solar, IEX Exchange Trading, and Open Access execution.",
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* =========================================================================
          HERO SECTION WITH CINEMATIC INDUSTRIAL BACKGROUND PHOTOGRAPHY
         ========================================================================= */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-[#0B132B] py-20 px-4 sm:px-6 lg:px-8 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=2000&q=80"
            alt="Heavy manufacturing plant and energy infrastructure"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#0F172A]/85 to-[#0F172A]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>Audited Results Across 14 States</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Verified Industrial{" "}
              <span className="text-[#F8BC26]">
                Power Cost Reductions
              </span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
              Documented annual tariff reductions across Steel Rolling Mills, FMCG Manufacturing Campuses, Textile Weaving Parks, and Paper &amp; Packaging Plants — achieved through structured Group Captive Solar SPVs, IEX/PXIL exchange trading, and turnkey SLDC Open Access execution.
            </p>
          </div>

          {/* Aggregate Performance Cards */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-5">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-3">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                <AnimatedCounter value={54} prefix="₹" suffix=" Cr+" />
              </div>
              <div className="text-white font-bold text-xs mt-1">Annualised Savings Shown</div>
              <div className="text-slate-300 font-mono text-[11px]">Across top 4 case studies</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-3">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#F8BC26] font-mono">
                <AnimatedCounter value={39} suffix="%" />
              </div>
              <div className="text-white font-bold text-xs mt-1">Peak Bill Reduction</div>
              <div className="text-slate-300 font-mono text-[11px]">vs. DISCOM retail tariff</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center mb-3">
                <Factory className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-blue-400 font-mono">
                <AnimatedCounter value={47} suffix=" MVA" />
              </div>
              <div className="text-white font-bold text-xs mt-1">Combined Portfolio Load</div>
              <div className="text-slate-300 font-mono text-[11px]">FMCG, Steel, Textile, Paper</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-3">
                <Leaf className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                <AnimatedCounter value={100500} suffix=" T" />
              </div>
              <div className="text-white font-bold text-xs mt-1">Annual CO₂ Abated</div>
              <div className="text-slate-300 font-mono text-[11px]">Verified REC attributes</div>
            </div>
          </div>
        </div>

        {/* Waaree Fluid Wave Divider: Merging Dark Hero into Ghost Slate Content */}
        <div className="absolute bottom-0 inset-x-0 pointer-events-none">
          <PageDivider type="layered-wave" fillColor="#F9FAFB" position="bottom" height={55} />
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE BEFORE / AFTER POWER BILL COMPARISON SLIDER
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D97706]">
              Visual Surcharge Diff &amp; Landed Rate
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1C2C34] tracking-tight">
              Interactive Before &amp; After Bill Comparison
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
              Compare actual utility tariffs against Topnotch Group Captive and Exchange hybrid structures. Zero Cross-Subsidy Surcharges (CSS), zero Additional Surcharges (AS), and immediate bottom-line EBITDA lift.
            </p>
          </div>

          <BillComparisonSlider />
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE FILTER + DETAILED CASE STUDY CARDS
         ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB] border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <IndustrialCaseStudiesFilter />
        </div>
      </section>

      {/* =========================================================================
          SCOPE-2 CARBON ABATEMENT & INDUSTRIAL ESG DECARBONIZATION HUB
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono font-bold uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>Scope-2 ESG Decarbonization &amp; BRSR Core Standard</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1C2C34] tracking-tight">
              Verified Carbon Abatement &amp; Statutory ESG Compliance
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
              Topnotch transitions heavy industrial power drawl into auditable, investment-grade ESG capital. Every kilowatt-hour delivered through our Group Captive and Green Exchange channels carries authenticated statutory attributes for BRSR Core, CDP, and RE100 filings.
            </p>
          </div>

          {/* 4 Compliance Pillars Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#F9FAFB] border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-700">GHG Protocol</span>
                <h4 className="text-base font-bold text-[#1C2C34]">Scope-2 Market Accounting</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Full market-based methodology alignment backed by CEA grid emission factor baselines (0.82 tCO₂/MWh) and contract-specific bundled REC retirements.
              </p>
            </div>

            <div className="bg-[#F9FAFB] border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100/80 text-amber-700 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-amber-700">BEE PAT Cycle VI</span>
                <h4 className="text-base font-bold text-[#1C2C34]">ESCerts Energy Certificates</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Specific Energy Consumption (SEC) reductions documented by Grade-A Energy Auditors, qualifying facilities for tradable statutory ESCerts.
              </p>
            </div>

            <div className="bg-[#F9FAFB] border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100/80 text-blue-700 flex items-center justify-center">
                <Scale className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-blue-700">Electricity Act 2003</span>
                <h4 className="text-base font-bold text-[#1C2C34]">Section 42 CGP Immunity</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Rigorous 26% equity and 51% captive power consumption covenants shielding your balance sheet from SERC Cross-Subsidy and Additional Surcharges.
              </p>
            </div>

            <div className="bg-[#F9FAFB] border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100/80 text-purple-700 flex items-center justify-center">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-purple-700">CEA Telemetry</span>
                <h4 className="text-base font-bold text-[#1C2C34]">0.2s SEM JMR Verification</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Tamper-evident optical AMR logs integrated directly with State Load Despatch Centres (SLDC), ensuring 100% first-pass Discom bill audit clearance.
              </p>
            </div>
          </div>

          {/* Interactive Carbon Abatement Counter Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0B132B] to-[#1C2C34] text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-2 max-w-xl text-center lg:text-left">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F8BC26] bg-[#F8BC26]/20 px-3 py-1 rounded-full border border-[#F8BC26]/30 inline-block">
                National Industrial Decarbonization Footprint
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Over 100,000 Metric Tonnes of Annual Industrial CO₂ Abated
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Equivalent to removing 22,000 internal combustion commercial vehicles from Indian highways each year, while delivering double-digit bottom-line power savings.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto flex-shrink-0">
              <Link
                href="/procurement-dossier"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 border border-white/20 transition-all"
              >
                <Download className="w-4 h-4 text-[#F8BC26]" />
                <span>Empanelment Dossier</span>
              </Link>

              <Link
                href="/tools/open-access-calculator"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#F8BC26] hover:bg-[#eab308] text-[#1C2C34] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95"
              >
                <span>Simulate Carbon Cut</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          WAAREE-GRADE AUDITED SAVINGS VERIFICATION PROTOCOL (HALF-MERGING IMAGE ON WHITE)
         ========================================================================= */}
      <SplitImageMergeSection
        badgeText="BEE Grade-A Verification Protocol"
        title={
          <>
            How Topnotch Audits &amp; <span className="text-[#D97706]">Guarantees Savings</span>
          </>
        }
        description="All case studies are audited by BEE Grade-A Certified Energy Auditors comparing actual Joint Meter Readings (JMR) from CEA Class 0.2s Special Energy Meters against official SERC retail supply tariffs. Net landed savings are verified after all wheeling charges, losses, and SLDC scheduling fees."
        bullets={[
          "BEE Grade-A Certified Engineering Signoff",
          "15-Minute CEA Class 0.2s SEM Meter Telemetry",
          "DISCOM Reconciliation & Net Rupee Audit",
          "Zero Production Interruption Guarantee",
        ]}
        imageUrl="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80"
        imageAlt="BEE accredited electrical engineering audit on industrial site"
        primaryCta={{
          label: "Benchmark Your Plant Economics",
          href: "/tools/open-access-calculator",
        }}
        secondaryCta={{
          label: "Download Full Empanelment Kit",
          href: "/procurement-dossier",
        }}
        stats={[
          { value: "₹185+ Cr", label: "Client Rupee Savings", sublabel: "Direct Landed Impact" },
          { value: "110+ Plants", label: "Audited Facilities", sublabel: "Across 14 States" },
        ]}
      />
    </main>
  );
}
