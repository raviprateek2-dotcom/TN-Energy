import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, TrendingDown, Leaf, Factory, Download } from "lucide-react";
import { INDUSTRIAL_CASE_STUDIES } from "@/lib/constants/enterprise-content";
import { IndustrialCaseStudiesFilter } from "@/components/market/IndustrialCaseStudiesFilter";

export const metadata: Metadata = {
  title: "Client Case Studies | Topnotch Energy Solutions – Industrial Power Cost Reduction",
  description:
    "Verified industrial case studies showing 24%–36% power cost reduction for FMCG, Steel, Textile, and Paper manufacturers across UP, Gujarat, and North India through Group Captive Solar, IEX Exchange Trading, and Open Access execution.",
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-grid-navy-950 text-white">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-grid-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-grid-cyan-500/10 border border-grid-cyan-500/30 text-grid-cyan-400 text-[11px] font-mono font-bold uppercase tracking-widest mb-4">
              Client Case Studies
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Verified Industrial{" "}
              <span className="text-grid-emerald-400">Power Cost</span> Reductions
            </h1>
            <p className="mt-4 text-grid-slate-300 text-base leading-relaxed max-w-2xl">
              Quantified annual savings across Steel Rolling Mills, FMCG Manufacturing, Textile Parks, and Paper &amp;
              Packaging Units — achieved through structured combinations of Group Captive Solar SPVs, IEX/PXIL
              exchange procurement, and end-to-end SLDC Open Access execution.
            </p>
          </div>

          {/* Aggregate Stats */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: BarChart3,
                value: "₹53.95 Cr",
                label: "Annualised Savings Shown",
                sub: "Across 4 case studies",
                color: "text-grid-emerald-400",
              },
              {
                icon: TrendingDown,
                value: "24%–36%",
                label: "Avg Power Cost Reduction",
                sub: "vs. Discom retail tariff",
                color: "text-grid-cyan-400",
              },
              {
                icon: Factory,
                value: "37.9 MW",
                label: "Total Load Managed",
                sub: "DS Group + Steel + Textiles + Paper",
                color: "text-grid-amber-400",
              },
              {
                icon: Leaf,
                value: "68,500+ T",
                label: "Annual CO₂ Abated",
                sub: "CERC RECs issued",
                color: "text-green-400",
              },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-4"
                >
                  <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
                  <div className={`text-xl font-extrabold font-mono tabular-nums ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-white font-bold text-xs mt-0.5">{stat.label}</div>
                  <div className="text-grid-slate-500 font-mono text-[10px]">{stat.sub}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Filter + Case Study Cards */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 border-b border-grid-slate-800">
        <div className="max-w-7xl mx-auto">
          <IndustrialCaseStudiesFilter />
        </div>
      </section>

      {/* Methodology Note */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-grid-slate-800">
        <div className="max-w-4xl mx-auto bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-8">
          <h2 className="text-white font-extrabold text-lg mb-4">
            Data Methodology &amp; Statutory Basis
          </h2>
          <div className="space-y-3 text-xs text-grid-slate-300 leading-relaxed font-mono">
            <p>
              All savings figures are computed as the difference between the client&apos;s trailing 12-month Discom
              KVAH billing rate (inclusive of Fixed Charges, Energy Charges, Fuel Surcharge, Power Factor Incentive/
              Penalty, and TOD tariff elements) and the blended landed procurement cost from the optimised energy mix.
            </p>
            <p>
              Landed IEX/PXIL procurement costs include: Market Clearing Price (MCP), CTU/STU transmission charges,
              applicable loss factors (3.2%–4.5% STU losses), wheeling charges (11kV / 33kV / 132kV), scheduling
              charges, and power exchange transaction fees (₹0.04–₹0.06/kWh for IEX DAM/RTM).
            </p>
            <p>
              Group Captive Solar PPA costs include: levelised PPA rate, CSS/AS exemption savings (full under
              Section 9 captive framework), STU wheeling at 33kV, scheduling fees, and QCA coordination charges.
              ALMM-II certified TOPCon bifacial modules are used for all Topnotch-structured captive projects.
            </p>
            <p className="text-grid-slate-500 text-[11px]">
              Disclaimer: Future savings cannot be guaranteed. Market clearing prices are subject to CERC/SERC
              regulatory changes, grid congestion, and generation-demand balance at NLDC/SLDC dispatch level.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            What Would Your Plant Save?
          </h2>
          <p className="text-grid-slate-400 text-sm font-mono mt-3 max-w-xl mx-auto">
            Run an instant indicative calculation for your sanctioned demand, state, and procurement mix — then request
            a detailed BEE-grade audit from our team.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/tools/open-access-calculator"
              className="px-6 py-3 rounded-xl bg-grid-emerald-500 hover:bg-grid-emerald-400 text-grid-navy-950 font-bold font-mono text-sm transition-all shadow-lg shadow-grid-emerald-500/20 flex items-center space-x-2"
            >
              <span>Open Access ROI Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl border border-grid-slate-700 bg-grid-navy-900 hover:bg-grid-navy-800 text-white font-mono text-sm font-bold transition-colors"
            >
              Request Confidential Tariff Audit
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
