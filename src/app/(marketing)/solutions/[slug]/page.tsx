export const instant = false;
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  FileText,
  Zap,
  HelpCircle,
  BarChart3,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  Award,
} from "lucide-react";
import {
  ENTERPRISE_SOLUTIONS,
  type EnterpriseSolution,
  type SolutionSubFeature,
  type RegulatoryCitation,
  type SolutionFaq,
  type SolutionKpi,
} from "@/lib/constants/enterprise-content";
import { BRAND } from "@/lib/constants/brand";
import { PageDivider } from "@/components/ui/PageDivider";
import { CornerIndustrialWatermark } from "@/components/ui/CornerIndustrialWatermark";
import { SolutionSavingsWaterfall } from "@/components/market/SolutionSavingsWaterfall";
import { SplitImageMergeSection } from "@/components/ui/SplitImageMergeSection";
import { SubstationBayExplorer } from "@/components/market/SubstationBayExplorer";

const SOLUTION_HERO_PHOTOS: Record<string, string> = {
  "power-trading-bilateral-contracts": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80",
  "open-access-execution-regulatory": "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=2000&q=80",
  "renewable-energy-sustainability": "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=2000&q=80",
  "abt-metering-telemetry-infrastructure": "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=2000&q=80",
  "energy-cost-optimization-bill-audits": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=80",
};

export async function generateStaticParams() {
  return ENTERPRISE_SOLUTIONS.map((s: EnterpriseSolution) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = ENTERPRISE_SOLUTIONS.find((s: EnterpriseSolution) => s.slug === slug);
  if (!solution) return { title: "Not Found | Topnotch Energy Solutions" };
  return {
    title: `${solution.title} | Topnotch Energy Solutions`,
    description: solution.shortDescription,
    openGraph: {
      title: `${solution.title} | Topnotch Energy Solutions`,
      description: solution.shortDescription,
      type: "website",
    },
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solutionIndex = ENTERPRISE_SOLUTIONS.findIndex(
    (s: EnterpriseSolution) => s.slug === slug
  );
  if (solutionIndex === -1) notFound();

  const solution = ENTERPRISE_SOLUTIONS[solutionIndex];
  const otherSolutions = ENTERPRISE_SOLUTIONS.filter(
    (s: EnterpriseSolution) => s.slug !== slug
  ).slice(0, 3);

  const heroPhoto =
    SOLUTION_HERO_PHOTOS[solution.slug] ||
    "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=2000&q=80";

  return (
    <main className="min-h-screen bg-white text-slate-800">
      
      {/* Breadcrumb Strip */}
      <div className="border-b border-slate-200 bg-white/95 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center space-x-2 text-xs font-mono text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/#solutions" className="hover:text-slate-900 transition-colors">
            Solutions
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold truncate">{solution.title}</span>
        </div>
      </div>

      {/* =========================================================================
          HERO SECTION WITH CINEMATIC PHOTOGRAPHY BACKDROP
         ========================================================================= */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-[#0A0F1D] py-20 px-4 sm:px-6 lg:px-8 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroPhoto}
            alt={solution.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1D]/95 via-[#0A0F1D]/85 to-[#0A0F1D]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Solution Brief */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md border border-white/20 text-[#F8BC26]">
                Module {solution.number}
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40">
                {solution.badge}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {solution.title}
            </h1>
            
            <p className="font-semibold text-base sm:text-lg text-slate-200 font-sans leading-snug">
              {solution.tagline}
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
              {solution.executiveSummary}
            </p>

            <div className="flex flex-wrap gap-4 pt-3">
              <Link
                href="/tools/open-access-calculator"
                className="px-8 py-4 rounded-full bg-[#F8BC26] hover:bg-[#eab308] text-[#1C2C34] font-bold text-xs uppercase tracking-wider transition-all shadow-xl active:scale-95 flex items-center space-x-2"
              >
                <span>Simulate Plant Economics</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <a
                href={`tel:${BRAND.contacts.phonePrimary}`}
                className="px-6 py-4 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-colors flex items-center space-x-2"
              >
                <PhoneCall className="w-4 h-4 text-[#F8BC26]" />
                <span>Talk to Lead Specialist</span>
              </a>
            </div>
          </div>

          {/* Right Column: Key KPIs Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {solution.kpis.map((kpi: SolutionKpi) => (
              <div
                key={kpi.label}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 shadow-lg text-white"
              >
                <div className="text-2xl sm:text-3xl font-black font-mono text-[#F8BC26] tabular-nums">
                  {kpi.value}
                </div>
                <div className="text-white font-bold text-xs mt-1.5">{kpi.label}</div>
                <div className="text-slate-300 font-mono text-[11px] mt-0.5">{kpi.subtext}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          TARGET AUDIENCE & STATUTORY DELIVERABLES
         ========================================================================= */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB] border-b border-slate-200 overflow-hidden">
        <CornerIndustrialWatermark type="solar-array" position="top-right" opacity={0.05} />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* Target Industrial Segments (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D97706] block">
              Facility Eligibility &amp; Feasibility
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#1C2C34] tracking-tight">
              Target Industrial Segments &amp; Plant Profiles
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              This module is engineered for high-tension manufacturing plants operating at 11 kV, 33 kV, 66 kV, or 132 kV voltage levels with multi-shift continuous or batch electrical demand.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {solution.targetAudience.map((segment: string) => (
                <div key={segment} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-snug font-medium">{segment}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Statutory Deliverables & Accreditations (5 cols) */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 block">
              Contractual Assurance
            </span>
            <h3 className="text-xl font-black text-[#1C2C34] tracking-tight flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Statutory Deliverables</span>
            </h3>

            <div className="space-y-3 pt-1">
              {solution.statutoryDeliverables.map((d: string) => (
                <div key={d} className="flex items-start space-x-3 text-xs text-slate-700">
                  <div className="w-2 h-2 rounded-full bg-[#10B981] flex-shrink-0 mt-1.5" />
                  <span className="font-medium leading-relaxed">{d}</span>
                </div>
              ))}
            </div>

            {/* Regulatory References */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                CERC / SERC Citations:
              </span>
              {solution.regulatoryReferences.map((ref: RegulatoryCitation) => (
                <div key={ref.clauseReference} className="text-xs font-mono text-slate-600">
                  <span className="font-bold text-slate-800">{ref.authority}:</span> {ref.regulationTitle} ({ref.clauseReference})
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          33 kV SUBSTATION & TELEMETRY BAY EXPLORER (FOR ABT INFRASTRUCTURE)
         ========================================================================= */}
      {slug === "abt-metering-telemetry-infrastructure" && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB] border-b border-slate-200 relative overflow-hidden">
          <CornerIndustrialWatermark type="substation" position="top-right" opacity={0.06} />
          <div className="max-w-7xl mx-auto relative z-10">
            <SubstationBayExplorer />
          </div>
        </section>
      )}

      {/* =========================================================================
          STATUTORY LANDED COST WATERFALL ECONOMICS
         ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200 relative overflow-hidden">
        <CornerIndustrialWatermark type="windmills" position="bottom-left" opacity={0.05} />
        <div className="max-w-7xl mx-auto relative z-10">
          <SolutionSavingsWaterfall solutionSlug={slug} />
        </div>
      </section>

      {/* =========================================================================
          TECHNICAL SUB-FEATURES ARCHITECTURE
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-[#F9FAFB] relative overflow-hidden">
        <CornerIndustrialWatermark type="transmission-tower" position="top-right" opacity={0.05} />
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D97706]">
              Deep-Dive Execution Modules
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1C2C34] tracking-tight">
              Technical Architecture &amp; Delivery Specifications
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
              Precision engineering grounded in Indian electricity market regulations and physical grid connection standards.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {solution.subFeatures.map((feature: SolutionSubFeature) => (
              <div
                key={feature.title}
                className="bg-[#F9FAFB] border border-slate-200/90 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#D97706] border border-amber-200 flex items-center justify-center font-bold">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-[#1C2C34] font-black text-lg tracking-tight">{feature.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                    {feature.technicalDetails}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white rounded-2xl border border-slate-200">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Business Impact
                    </div>
                    <p className="text-slate-900 text-xs font-bold leading-snug">{feature.businessImpact}</p>
                  </div>
                  <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 mb-1">
                      Benchmark Metric
                    </div>
                    <p className="font-mono font-black text-xs text-emerald-800 leading-snug">
                      {feature.benchmarkMetric}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          TECHNICAL FAQ ACCORDION
         ========================================================================= */}
      {solution.faqs.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB] border-b border-slate-200">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
                Technical FAQ
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1C2C34] tracking-tight">
                Frequently Asked Regulatory &amp; Commercial Questions
              </h2>
            </div>
            
            <div className="space-y-4">
              {solution.faqs.map((faq: SolutionFaq, idx: number) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs"
                >
                  <div className="flex items-start space-x-4">
                    <HelpCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <h4 className="text-[#1C2C34] font-bold text-base">{faq.question}</h4>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          WAAREE-GRADE EXECUTIVE SOLUTION IMPLEMENTATION BANNER (HALF-MERGING IMAGE ON WHITE)
         ========================================================================= */}
      <SplitImageMergeSection
        badgeText={`Module ${solution.number} Technical Consultation`}
        title={
          <>
            Deploy <span className="text-[#D97706]">{solution.title}</span> at Your Facility
          </>
        }
        description={`Our BEE Certified Energy Auditors and CERC Power Traders will analyze your last 12 months of DISCOM electricity bills, ABT meter logs, and shift load curves to structure an optimized ${solution.title} architecture.`}
        bullets={[
          "12-Month Joint Meter Reading (JMR) Analysis",
          "Customized Single Line Diagram (SLD) Engineering",
          "Turnkey SLDC NOC & Standing Clearance Filings",
          "Guaranteed Tariff Reduction Signoff",
        ]}
        imageUrl={heroPhoto}
        imageAlt={`Industrial execution of ${solution.title}`}
        primaryCta={{
          label: "Simulate Plant Savings →",
          href: "/tools/open-access-calculator",
        }}
        secondaryCta={{
          label: "Download Vendor Empanelment Kit",
          href: "/procurement-dossier",
        }}
        stats={[
          { value: solution.kpis[0]?.value || "18%–42%", label: solution.kpis[0]?.label || "Net Savings", sublabel: "Guaranteed Reduction" },
          { value: solution.kpis[1]?.value || "45 Days", label: solution.kpis[1]?.label || "Turnkey Flow", sublabel: "From Audit to Grid" },
        ]}
      />

      {/* =========================================================================
          RELATED SOLUTIONS GRID
         ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-black text-[#1C2C34] mb-8 tracking-tight">
            Related Enterprise Solutions
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {otherSolutions.map((s: EnterpriseSolution) => (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                className="bg-[#F9FAFB] border border-slate-200/90 rounded-3xl p-6 hover:shadow-xl hover:border-slate-300 hover:bg-white transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Module {s.number}
                  </span>
                  <h3 className="text-[#1C2C34] font-bold text-base mt-3 group-hover:text-[#D97706] transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-2 line-clamp-2">
                    {s.tagline}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-[#1C2C34] group-hover:text-[#D97706]">
                  <span>Explore Module</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
