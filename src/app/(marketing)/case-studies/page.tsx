import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, TrendingDown, Leaf, Factory, Download, CheckCircle2, ShieldCheck } from "lucide-react";
import { IndustrialCaseStudiesFilter } from "@/components/market/IndustrialCaseStudiesFilter";
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
          INTERACTIVE FILTER + DETAILED CASE STUDY CARDS
         ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB] border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <IndustrialCaseStudiesFilter />
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
