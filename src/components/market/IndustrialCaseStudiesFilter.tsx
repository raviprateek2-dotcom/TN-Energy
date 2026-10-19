"use client";

import React, { useState } from "react";
import { INDUSTRIAL_CASE_STUDIES, IndustrialCaseStudy } from "@/lib/constants/enterprise-content";
import {
  Factory,
  TrendingDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  PieChart,
  Quote,
} from "lucide-react";

export function IndustrialCaseStudiesFilter() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredStudies = INDUSTRIAL_CASE_STUDIES.filter((cs) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "fmcg") return cs.clientSector.toLowerCase().includes("fmcg");
    if (selectedFilter === "steel") return cs.clientSector.toLowerCase().includes("steel");
    if (selectedFilter === "textile") return cs.clientSector.toLowerCase().includes("textile");
    if (selectedFilter === "paper") return cs.clientSector.toLowerCase().includes("paper");
    return true;
  });

  return (
    <div className="bg-grid-navy-950 border border-grid-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-grid-slate-800 pb-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-grid-cyan-500/20 text-grid-cyan-400 border border-grid-cyan-500/30 uppercase">
              Audited Client Transformations
            </span>
          </div>
          <h3 className="text-base sm:text-xl font-bold text-white font-sans mt-1">
            Industrial Client Case Studies & Multi-Crore Tariff Savings
          </h3>
          <p className="text-xs text-grid-slate-400 font-mono mt-0.5">
            Real C&I power procurement portfolios audited and managed by Topnotch Energy Solutions.
          </p>
        </div>

        {/* Industry Filter Pills */}
        <div className="flex flex-wrap gap-1.5 text-xs font-mono">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`px-3 py-1.5 rounded-lg transition-colors font-bold ${
              selectedFilter === "all"
                ? "bg-grid-emerald-500 text-grid-navy-950"
                : "bg-grid-navy-900 text-grid-slate-400 hover:text-white border border-grid-slate-800"
            }`}
          >
            All Sectors ({INDUSTRIAL_CASE_STUDIES.length})
          </button>
          <button
            onClick={() => setSelectedFilter("fmcg")}
            className={`px-3 py-1.5 rounded-lg transition-colors font-bold ${
              selectedFilter === "fmcg"
                ? "bg-grid-emerald-500 text-grid-navy-950"
                : "bg-grid-navy-900 text-grid-slate-400 hover:text-white border border-grid-slate-800"
            }`}
          >
            FMCG - DS Group
          </button>
          <button
            onClick={() => setSelectedFilter("steel")}
            className={`px-3 py-1.5 rounded-lg transition-colors font-bold ${
              selectedFilter === "steel"
                ? "bg-grid-emerald-500 text-grid-navy-950"
                : "bg-grid-navy-900 text-grid-slate-400 hover:text-white border border-grid-slate-800"
            }`}
          >
            Steel & Metallurgy
          </button>
          <button
            onClick={() => setSelectedFilter("textile")}
            className={`px-3 py-1.5 rounded-lg transition-colors font-bold ${
              selectedFilter === "textile"
                ? "bg-grid-emerald-500 text-grid-navy-950"
                : "bg-grid-navy-900 text-grid-slate-400 hover:text-white border border-grid-slate-800"
            }`}
          >
            Textiles & Weaving
          </button>
          <button
            onClick={() => setSelectedFilter("paper")}
            className={`px-3 py-1.5 rounded-lg transition-colors font-bold ${
              selectedFilter === "paper"
                ? "bg-grid-emerald-500 text-grid-navy-950"
                : "bg-grid-navy-900 text-grid-slate-400 hover:text-white border border-grid-slate-800"
            }`}
          >
            Paper & Packaging
          </button>
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStudies.map((study) => (
          <div
            key={study.id}
            className="bg-grid-navy-900/90 border border-grid-slate-700/80 rounded-2xl p-5 shadow-xl hover:border-grid-slate-600 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Top Meta */}
              <div className="flex justify-between items-start gap-2 border-b border-grid-slate-800 pb-3 mb-3">
                <div>
                  <span className="text-[10px] font-mono text-grid-cyan-300 bg-grid-cyan-950 px-2 py-0.5 rounded border border-grid-cyan-800 uppercase">
                    {study.clientSector}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white font-sans mt-1.5">
                    {study.clientTitle}
                  </h4>
                  <span className="text-[11px] text-grid-slate-400 font-mono block">
                    📍 {study.location} ({study.state})
                  </span>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-mono font-bold text-grid-emerald-400 block">
                    -{study.percentageSavings.toFixed(1)}% Cost Cut
                  </span>
                  <span className="text-lg font-extrabold text-white font-mono tabular-nums">
                    ₹{study.annualSavingsInrCrores} Cr/yr
                  </span>
                </div>
              </div>

              {/* Technical Operating Parameters */}
              <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-grid-navy-950 border border-grid-slate-800 font-mono text-center text-xs mb-3">
                <div>
                  <span className="text-[10px] text-grid-slate-400 block">Contract Demand</span>
                  <span className="font-bold text-white tabular-nums">
                    {(study.sanctionedDemandKva / 1000).toFixed(1)} MVA
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-grid-slate-400 block">Peak Load</span>
                  <span className="font-bold text-grid-cyan-300 tabular-nums">{study.peakLoadMw} MW</span>
                </div>
                <div>
                  <span className="text-[10px] text-grid-slate-400 block">Annual Volume</span>
                  <span className="font-bold text-white tabular-nums">{study.annualConsumptionMus} MUs</span>
                </div>
              </div>

              {/* Procurement Mix */}
              <div className="space-y-1.5 text-xs font-mono mb-4">
                <span className="text-[10px] text-grid-slate-400 uppercase tracking-wider block font-bold flex items-center">
                  <PieChart className="w-3 h-3 mr-1 text-grid-emerald-400" />
                  Optimized Procurement Mix:
                </span>
                {study.procurementMix.map((mix, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[11px]">
                    <span className="text-grid-slate-300 truncate max-w-[240px]">• {mix.source}</span>
                    <span className="text-white font-bold tabular-nums">
                      {mix.percentage}% (@ ₹{mix.landedCostPerKwh.toFixed(2)})
                    </span>
                  </div>
                ))}
              </div>

              {/* Tariff Comparison */}
              <div className="flex items-center justify-between text-xs font-mono p-2.5 rounded-lg bg-grid-navy-950/60 border border-grid-slate-800 mb-3">
                <span className="text-grid-slate-400">
                  Tariff: <span className="line-through text-grid-red-400">₹{study.baselineDiscomTariffPerKwh.toFixed(2)}</span>
                </span>
                <span className="text-grid-emerald-400 font-bold text-sm">
                  → ₹{study.optimizedBlendedTariffPerKwh.toFixed(2)}/kWh Blended
                </span>
              </div>

              {/* Quote / Testimonial */}
              <div className="bg-grid-navy-950/80 p-3 rounded-lg border border-grid-slate-800 text-[11px] text-grid-slate-300 italic mb-3">
                <Quote className="w-3.5 h-3.5 text-grid-slate-500 mb-1 inline" /> &ldquo;{study.testimonial.quote}&rdquo;
                <div className="text-[10px] font-sans font-bold text-grid-slate-400 not-italic mt-1.5 text-right">
                  — {study.testimonial.designation}, <span className="text-white">{study.testimonial.organization}</span>
                </div>
              </div>
            </div>

            {/* Bottom Carbon & Timeline Footnote */}
            <div className="pt-3 border-t border-grid-slate-800 flex justify-between items-center text-[10px] font-mono text-grid-slate-400">
              <span className="flex items-center text-grid-emerald-400">
                <Sparkles className="w-3 h-3 mr-1" />
                {study.co2EmissionsAbatedTonsAnnual.toLocaleString("en-IN")} tCO₂e Abated
              </span>
              <span>Sync Timeline: {study.implementationTimelineMonths} Months</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
