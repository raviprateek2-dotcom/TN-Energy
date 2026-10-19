import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  CheckCircle,
  ArrowRight,
  FileText,
  Zap,
  HelpCircle,
  BarChart3,
} from "lucide-react";
import {
  ENTERPRISE_SOLUTIONS,
  type EnterpriseSolution,
  type SolutionSubFeature,
  type RegulatoryCitation,
  type SolutionFaq,
  type SolutionKpi,
} from "@/lib/constants/enterprise-content";

// Tailwind color map per solution index
const SOLUTION_ACCENT_COLORS = [
  { text: "text-grid-cyan-400", bg: "bg-grid-cyan-400/10", border: "border-grid-cyan-400/30" },
  { text: "text-grid-emerald-400", bg: "bg-grid-emerald-400/10", border: "border-grid-emerald-400/30" },
  { text: "text-grid-amber-400", bg: "bg-grid-amber-400/10", border: "border-grid-amber-400/30" },
  { text: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30" },
  { text: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/30" },
];

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
  const accent = SOLUTION_ACCENT_COLORS[solutionIndex % SOLUTION_ACCENT_COLORS.length];
  const otherSolutions = ENTERPRISE_SOLUTIONS.filter(
    (s: EnterpriseSolution) => s.slug !== slug
  ).slice(0, 3);

  return (
    <main className="min-h-screen bg-grid-navy-950 text-white">
      {/* Breadcrumb */}
      <div className="border-b border-grid-slate-800 bg-grid-navy-950/90 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center space-x-2 text-[11px] font-mono text-grid-slate-500">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/#solutions" className="hover:text-white transition-colors">
            Solutions
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-grid-slate-300 truncate">{solution.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-grid-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Title + Executive Summary */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span
                className={`inline-block px-3 py-1 rounded-full border text-[11px] font-mono font-bold uppercase tracking-widest ${accent.bg} ${accent.border} ${accent.text}`}
              >
                Solution {solution.number}
              </span>
              <span className="text-[11px] font-mono text-grid-slate-500">{solution.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              {solution.title}
            </h1>
            <p className={`mt-2 font-mono text-sm ${accent.text}`}>{solution.tagline}</p>
            <p className="mt-4 text-grid-slate-300 text-sm leading-relaxed">
              {solution.executiveSummary}
            </p>

            {/* Target Audience */}
            <div className="mt-6">
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-grid-slate-500 mb-2">
                Target Industrial Segments
              </div>
              <div className="space-y-1.5">
                {solution.targetAudience.map((segment: string) => (
                  <div key={segment} className="flex items-start space-x-2 text-xs">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${accent.text.replace("text-", "bg-")}`} />
                    <span className="text-grid-slate-300">{segment}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="px-5 py-3 rounded-xl bg-grid-emerald-500 hover:bg-grid-emerald-400 text-grid-navy-950 font-bold font-mono text-sm transition-all shadow-lg shadow-grid-emerald-500/20 flex items-center space-x-2"
              >
                <span>Request Technical Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tools/open-access-calculator"
                className="px-5 py-3 rounded-xl border border-grid-slate-700 bg-grid-navy-900 hover:bg-grid-navy-800 text-white font-mono text-sm font-bold transition-colors"
              >
                Calculate Plant ROI
              </Link>
            </div>
          </div>

          {/* Right: KPIs + Deliverables */}
          <div className="space-y-5">
            {/* KPIs */}
            <div className="grid grid-cols-2 gap-3">
              {solution.kpis.map((kpi: SolutionKpi) => (
                <div
                  key={kpi.label}
                  className="bg-grid-navy-900 border border-grid-slate-800 rounded-xl p-4"
                >
                  <div className={`text-xl font-extrabold font-mono tabular-nums ${accent.text}`}>
                    {kpi.value}
                  </div>
                  <div className="text-white font-bold text-xs mt-0.5">{kpi.label}</div>
                  <div className="text-grid-slate-500 font-mono text-[10px] mt-0.5">{kpi.subtext}</div>
                </div>
              ))}
            </div>

            {/* Statutory Deliverables */}
            <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-5">
              <h3 className="text-white font-extrabold text-sm mb-3 flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-grid-emerald-400" />
                <span>Statutory Deliverables</span>
              </h3>
              <div className="space-y-2">
                {solution.statutoryDeliverables.map((d: string) => (
                  <div key={d} className="flex items-start space-x-2 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-grid-emerald-400 flex-shrink-0 mt-1.5" />
                    <span className="text-grid-slate-300">{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Regulatory References */}
            <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-5">
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-grid-slate-500 mb-2 flex items-center space-x-1.5">
                <FileText className="w-3 h-3" />
                <span>Regulatory Framework</span>
              </div>
              <div className="space-y-2">
                {solution.regulatoryReferences.map((ref: RegulatoryCitation) => (
                  <div key={ref.clauseReference} className="text-xs">
                    <span className={`font-mono font-bold text-[11px] ${accent.text}`}>
                      {ref.authority}
                    </span>{" "}
                    <span className="text-grid-slate-400">{ref.regulationTitle}</span>
                    <div className="text-grid-slate-600 font-mono text-[10px]">
                      § {ref.clauseReference}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Sub-Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-grid-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <span className={`text-[11px] font-mono font-bold uppercase tracking-widest ${accent.text}`}>
              Deep-Dive Capability Suite
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Technical Sub-Features
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {solution.subFeatures.map((feature: SolutionSubFeature) => (
              <div
                key={feature.title}
                className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-6 hover:border-grid-slate-700 transition-colors"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${accent.bg} border ${accent.border}`}
                >
                  <Zap className={`w-4 h-4 ${accent.text}`} />
                </div>
                <h3 className="text-white font-extrabold text-sm">{feature.title}</h3>
                <p className="text-grid-slate-400 text-xs leading-relaxed mt-2">
                  {feature.technicalDetails}
                </p>
                <div className="mt-4 pt-4 border-t border-grid-slate-800/80 grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-grid-slate-600 mb-1">
                      Business Impact
                    </div>
                    <p className="text-grid-slate-300 text-xs">{feature.businessImpact}</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-grid-slate-600 mb-1">
                      Benchmark
                    </div>
                    <p className={`font-mono font-bold text-xs ${accent.text}`}>
                      {feature.benchmarkMetric}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      {solution.faqs.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-grid-slate-800">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10 text-center">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-grid-amber-400">
                Technical FAQs
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-2">
                Common Questions from Industrial Procurement Teams
              </h2>
            </div>
            <div className="space-y-4">
              {solution.faqs.map((faq: SolutionFaq, idx: number) => (
                <div
                  key={idx}
                  className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-5"
                >
                  <div className="flex items-start space-x-3">
                    <HelpCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${accent.text}`} />
                    <div>
                      <h4 className="text-white font-bold text-sm">{faq.question}</h4>
                      <p className="text-grid-slate-400 text-xs leading-relaxed mt-2">
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

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-grid-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-grid-emerald-400">
            Ready to Proceed?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            Get a Confidential Tariff Assessment
          </h2>
          <p className="text-grid-slate-400 text-sm font-mono mt-3 max-w-xl mx-auto">
            Our BEE Certified Energy Auditors will analyse your last 12 months of Discom billing data, ABT
            meter readings, and production schedules to quantify {solution.title.toLowerCase()} savings with
            financial precision.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-grid-emerald-500 hover:bg-grid-emerald-400 text-grid-navy-950 font-bold font-mono text-sm transition-all shadow-lg shadow-grid-emerald-500/20 flex items-center space-x-2"
            >
              <span>Schedule Tariff Audit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/case-studies"
              className="px-6 py-3 rounded-xl border border-grid-slate-700 bg-grid-navy-900 hover:bg-grid-navy-800 text-white font-mono text-sm font-bold transition-colors flex items-center space-x-2"
            >
              <BarChart3 className="w-4 h-4 text-grid-cyan-400" />
              <span>View Client Case Studies</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Other Solutions */}
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-extrabold text-white mb-6">Related Solutions</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {otherSolutions.map((s: EnterpriseSolution, i: number) => {
              const otherAccent = SOLUTION_ACCENT_COLORS[
                ENTERPRISE_SOLUTIONS.findIndex((es: EnterpriseSolution) => es.slug === s.slug) %
                  SOLUTION_ACCENT_COLORS.length
              ];
              return (
                <Link
                  key={s.slug}
                  href={`/solutions/${s.slug}`}
                  className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-5 hover:border-grid-slate-700 hover:bg-grid-navy-800 transition-all group"
                >
                  <span
                    className={`text-[10px] font-mono font-bold uppercase tracking-widest ${otherAccent.text}`}
                  >
                    Solution {s.number}
                  </span>
                  <h3 className="text-white font-bold text-sm mt-1.5 group-hover:text-grid-emerald-400 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-grid-slate-500 text-xs font-mono mt-1 line-clamp-2">
                    {s.tagline}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
