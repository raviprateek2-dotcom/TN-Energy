"use client";

import React, { useState } from "react";
import Link from "next/link";
import { INDUSTRIAL_CASE_STUDIES } from "@/lib/constants/enterprise-content";
import {
  Factory,
  TrendingDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  PieChart,
  Quote,
  Building2,
  Zap,
} from "lucide-react";

// Distinct brand monograms for verified case study leaders
const CLIENT_BRAND_MARKS: Record<string, { initials: string; bgClass: string; textClass: string }> = {
  "cs-ds-group-fmcg": { initials: "DSG", bgClass: "bg-emerald-600", textClass: "text-white" },
  "cs-north-india-steel": { initials: "NIS", bgClass: "bg-blue-600", textClass: "text-white" },
  "cs-gujarat-textile-park": { initials: "GTP", bgClass: "bg-purple-600", textClass: "text-white" },
  "cs-up-paper-packaging": { initials: "UPP", bgClass: "bg-amber-600", textClass: "text-white" },
};

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
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Audited Industrial Client Transformations</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-[#1C2C34] mt-2 tracking-tight">
            Multi-Crore Tariff Savings by Industry Sector
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-mono mt-1">
            Real commercial and industrial portfolios audited and executed by Topnotch Energy Solutions.
          </p>
        </div>

        {/* Industry Filter Pills */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`px-4 py-2 rounded-xl transition-all font-bold ${
              selectedFilter === "all"
                ? "bg-[#F8BC26] text-[#1C2C34] shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
            }`}
          >
            All Sectors ({INDUSTRIAL_CASE_STUDIES.length})
          </button>
          <button
            onClick={() => setSelectedFilter("fmcg")}
            className={`px-4 py-2 rounded-xl transition-all font-bold ${
              selectedFilter === "fmcg"
                ? "bg-[#F8BC26] text-[#1C2C34] shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
            }`}
          >
            FMCG – DS Group
          </button>
          <button
            onClick={() => setSelectedFilter("steel")}
            className={`px-4 py-2 rounded-xl transition-all font-bold ${
              selectedFilter === "steel"
                ? "bg-[#F8BC26] text-[#1C2C34] shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
            }`}
          >
            Steel &amp; Metallurgy
          </button>
          <button
            onClick={() => setSelectedFilter("textile")}
            className={`px-4 py-2 rounded-xl transition-all font-bold ${
              selectedFilter === "textile"
                ? "bg-[#F8BC26] text-[#1C2C34] shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
            }`}
          >
            Textiles &amp; Weaving
          </button>
          <button
            onClick={() => setSelectedFilter("paper")}
            className={`px-4 py-2 rounded-xl transition-all font-bold ${
              selectedFilter === "paper"
                ? "bg-[#F8BC26] text-[#1C2C34] shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
            }`}
          >
            Paper &amp; Packaging
          </button>
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredStudies.map((study) => {
          const brandMark = CLIENT_BRAND_MARKS[study.id] || {
            initials: "C&I",
            bgClass: "bg-slate-800",
            textClass: "text-white",
          };

          return (
            <div
              key={study.id}
              className="bg-[#F9FAFB] border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top Header with Prominent Company Logo & Monogram */}
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5 mb-5">
                  <div className="flex items-start space-x-3.5">
                    {/* Company Monogram Logo */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm tracking-tight shadow-md flex-shrink-0 ${brandMark.bgClass} ${brandMark.textClass}`}
                    >
                      {brandMark.initials}
                    </div>

                    <div>
                      <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase">
                        {study.clientSector}
                      </span>
                      <h4 className="text-base sm:text-lg font-black text-[#1C2C34] mt-1.5 leading-snug">
                        {study.clientTitle}
                      </h4>
                      <span className="text-xs text-slate-500 font-mono block mt-1">
                        📍 {study.location} ({study.state}) • {study.gridInterconnection.split(",")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Savings Badge */}
                  <div className="text-right flex-shrink-0 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
                    <span className="text-[11px] font-mono font-bold text-emerald-700 block">
                      -{study.percentageSavings.toFixed(1)}% Cost Cut
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-[#1C2C34] font-mono tabular-nums">
                      ₹{study.annualSavingsInrCrores} Cr
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono block">Annualized Savings</span>
                  </div>
                </div>

                {/* Technical Operating Parameters */}
                <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-white border border-slate-200 font-mono text-center text-xs mb-5 shadow-2xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Sanctioned Demand</span>
                    <span className="font-bold text-slate-900 text-sm tabular-nums">
                      {study.sanctionedDemandKva.toLocaleString("en-IN")} kVA
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Peak Load</span>
                    <span className="font-bold text-emerald-700 text-sm tabular-nums">{study.peakLoadMw} MW</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Annual Drawl</span>
                    <span className="font-bold text-slate-900 text-sm tabular-nums">{study.annualConsumptionMus} MUs</span>
                  </div>
                </div>

                {/* Procurement Mix Progress Bar & Breakdown */}
                <div className="space-y-2 text-xs font-mono mb-5 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] text-slate-600 uppercase tracking-wider block font-bold flex items-center mb-1.5">
                    <PieChart className="w-3.5 h-3.5 mr-1.5 text-emerald-700" />
                    Optimized Procurement Mix Architecture:
                  </span>

                  {/* Multi-segment Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-slate-100 flex overflow-hidden mb-2">
                    {study.procurementMix.map((mix, idx) => (
                      <div
                        key={idx}
                        style={{ width: `${mix.percentage}%` }}
                        className={`h-full ${
                          idx === 0 ? "bg-emerald-500" : idx === 1 ? "bg-amber-500" : "bg-slate-400"
                        }`}
                        title={`${mix.source}: ${mix.percentage}%`}
                      />
                    ))}
                  </div>

                  {study.procurementMix.map((mix, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs text-slate-700">
                      <span className="truncate max-w-[240px] sm:max-w-xs text-slate-600">
                        • {mix.source}
                      </span>
                      <span className="text-slate-900 font-bold tabular-nums">
                        {mix.percentage}% (@ ₹{mix.landedCostPerKwh.toFixed(2)})
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tariff Comparison Pill */}
                <div className="flex items-center justify-between text-xs font-mono p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 mb-5">
                  <span className="text-slate-600">
                    DISCOM Retail: <span className="line-through text-red-600 font-bold">₹{study.baselineDiscomTariffPerKwh.toFixed(2)}/kWh</span>
                  </span>
                  <span className="text-emerald-900 font-black text-sm">
                    → ₹{study.optimizedBlendedTariffPerKwh.toFixed(2)}/kWh Landed
                  </span>
                </div>

                {/* Technical Highlights Checklist */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs mb-5 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-500 block">
                    Execution Highlights &amp; Statutory Approvals:
                  </span>
                  <ul className="space-y-1.5">
                    {study.technicalHighlights.slice(0, 2).map((item, hIdx) => (
                      <li key={hIdx} className="flex items-start space-x-2 text-slate-600 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Executive Quote */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 italic mb-5">
                  <Quote className="w-3.5 h-3.5 text-slate-400 mb-1 inline" /> &ldquo;{study.testimonial.quote}&rdquo;
                  <div className="text-[11px] font-sans font-bold text-slate-800 not-italic mt-2 text-right">
                    — {study.testimonial.designation}, <span className="text-[#1C2C34]">{study.testimonial.organization}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Footer Action */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                <span className="flex items-center text-emerald-700 font-bold">
                  <Sparkles className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  {study.co2EmissionsAbatedTonsAnnual.toLocaleString("en-IN")} tCO₂e Abated Annually
                </span>
                <Link
                  href="/tools/open-access-calculator"
                  className="px-4 py-2 rounded-full bg-[#F8BC26] hover:bg-[#eab308] text-[#1C2C34] font-bold text-xs font-mono transition-colors flex items-center space-x-1"
                >
                  <span>Model Similar Facility</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
