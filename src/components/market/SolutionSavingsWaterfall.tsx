"use client";

import React, { useState } from "react";
import {
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Info,
} from "lucide-react";

interface WaterfallStep {
  name: string;
  type: "baseline" | "deduction" | "addition" | "final";
  rate: number; // in ₹/kWh
  note: string;
}

const WATERFALL_DATA: Record<string, WaterfallStep[]> = {
  "group-captive": [
    { name: "DISCOM Retail Industrial Tariff", type: "baseline", rate: 8.85, note: "Baseline retail tariff for HT-2 heavy industry (UP/MH/GJ average)" },
    { name: "Cross-Subsidy Surcharge (CSS) Waiver", type: "deduction", rate: -2.15, note: "100% statutory exemption under Electricity Act 2003 (Section 42)" },
    { name: "Additional Surcharge (AS) Waiver", type: "deduction", rate: -0.95, note: "100% waiver for captive consumers under Rule 3 regulations" },
    { name: "STU Wheeling & Transmission Charges", type: "addition", rate: 0.42, note: "State Transmission Utility wheeling tariff for 33kV/66kV voltage" },
    { name: "InSTS Technical Grid Losses (3.8%)", type: "addition", rate: 0.18, note: "System technical losses compensated in energy units" },
    { name: "Net Landed Clean Power Cost", type: "final", rate: 4.35, note: "Delivered at plant meter bay • ₹4.50/kWh Net Reduction (51% Savings)" },
  ],
  "power-trading": [
    { name: "DISCOM Peak Period Retail Tariff", type: "baseline", rate: 9.20, note: "Time-of-Day (ToD) peak industrial tariff including surcharges" },
    { name: "IEX Day-Ahead (DAM) / GDAM Arbitrage", type: "deduction", rate: -4.80, note: "Power cleared at competitive bourse clearing rates (avg ₹3.80/kWh)" },
    { name: "Open Access Surcharges (Third-Party)", type: "addition", rate: 1.65, note: "Applicable Cross-Subsidy Surcharge under third-party PPA" },
    { name: "CTU/STU Transmission & Scheduling Fee", type: "addition", rate: 0.35, note: "NLDC & SLDC scheduling and NOAR access transaction fee" },
    { name: "Net Landed Bourse Cost", type: "final", rate: 6.40, note: "Net delivered cost during peak hours • Save ₹2.80/kWh (30% Savings)" },
  ],
  "rooftop-solar": [
    { name: "DISCOM Day-Shift Industrial Tariff", type: "baseline", rate: 8.40, note: "Normal daytime manufacturing tariff including fuel surcharge" },
    { name: "Zero Transmission & Wheeling Losses", type: "deduction", rate: -4.90, note: "Behind-the-meter generation eliminates 100% of grid transit fees" },
    { name: "Turnkey LCOE (Levelized Cost of Energy)", type: "addition", rate: 3.10, note: "Tier-1 TOPCon bifacial modules amortized over 25-year design life" },
    { name: "Net Solar Landed Rate", type: "final", rate: 3.10, note: "Direct rooftop energy • Save ₹5.30/kWh (63% Savings vs DISCOM)" },
  ],
};

export function SolutionSavingsWaterfall({ solutionSlug }: { solutionSlug: string }) {
  let activeKey = "group-captive";
  if (solutionSlug.includes("trading") || solutionSlug.includes("bilateral")) {
    activeKey = "power-trading";
  } else if (solutionSlug.includes("renewable") || solutionSlug.includes("rooftop") || solutionSlug.includes("sustainability")) {
    activeKey = "rooftop-solar";
  }

  const steps = WATERFALL_DATA[activeKey] || WATERFALL_DATA["group-captive"];
  const baseline = steps.find((s) => s.type === "baseline")?.rate || 8.85;
  const finalRate = steps.find((s) => s.type === "final")?.rate || 4.35;
  const netSavings = (baseline - finalRate).toFixed(2);
  const percentageSavings = Math.round(((baseline - finalRate) / baseline) * 100);

  return (
    <div className="bg-slate-900/90 text-white border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#F8BC26]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Statutory Tariff Mechanics</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">
            Landed Cost Economics: <span className="text-[#F8BC26]">Waterfall Breakdown</span>
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Exact step-by-step mathematical dissection of DISCOM base tariffs vs. delivered clean power under CERC and SERC regulations.
          </p>
        </div>

        <div className="flex items-baseline space-x-2 bg-emerald-950/70 border border-emerald-500/40 px-5 py-3 rounded-2xl">
          <span className="text-xs font-mono text-emerald-300">Net Tariff Slash:</span>
          <span className="text-2xl font-black font-mono text-[#10B981]">
            -₹{netSavings}
          </span>
          <span className="text-xs font-mono font-bold text-emerald-300">
            / kWh ({percentageSavings}%)
          </span>
        </div>
      </div>

      {/* Waterfall Steps Stack */}
      <div className="space-y-3.5 pt-8">
        {steps.map((step, idx) => {
          const isBaseline = step.type === "baseline";
          const isDeduction = step.type === "deduction";
          const isAddition = step.type === "addition";
          const isFinal = step.type === "final";

          return (
            <div
              key={idx}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isFinal
                  ? "bg-emerald-950/60 border-emerald-500/60 shadow-lg shadow-emerald-950/40"
                  : isBaseline
                  ? "bg-slate-800/80 border-slate-700"
                  : isDeduction
                  ? "bg-slate-850/80 border-emerald-500/30 bg-emerald-950/20"
                  : "bg-slate-800/50 border-amber-500/30 bg-amber-950/10"
              }`}
            >
              <div className="flex items-start sm:items-center space-x-3.5">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 ${
                    isFinal
                      ? "bg-[#10B981] text-[#0A0F1D]"
                      : isBaseline
                      ? "bg-slate-700 text-white"
                      : isDeduction
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                  }`}
                >
                  {isFinal ? "=" : isBaseline ? "01" : isDeduction ? "–" : "+"}
                </div>

                <div>
                  <div className="font-bold text-sm sm:text-base text-white flex items-center space-x-2">
                    <span>{step.name}</span>
                    {isFinal && (
                      <span className="px-2 py-0.5 rounded-md bg-[#10B981] text-[#0A0F1D] text-[10px] font-mono font-black uppercase">
                        Guaranteed
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">{step.note}</div>
                </div>
              </div>

              <div className="flex items-baseline space-x-1.5 self-end sm:self-auto flex-shrink-0">
                <span
                  className={`text-xl sm:text-2xl font-black font-mono tabular-nums ${
                    isFinal
                      ? "text-[#10B981]"
                      : isBaseline
                      ? "text-slate-200"
                      : isDeduction
                      ? "text-emerald-400"
                      : "text-amber-400"
                  }`}
                >
                  {step.rate > 0 && !isBaseline && !isFinal ? `+₹${step.rate.toFixed(2)}` : step.rate < 0 ? `-₹${Math.abs(step.rate).toFixed(2)}` : `₹${step.rate.toFixed(2)}`}
                </span>
                <span className="text-xs font-mono text-slate-400">/ kWh</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Notes */}
      <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Section 42 of Electricity Act 2003 guarantees statutory exemption for captive consumers.</span>
        </div>
        <div className="text-slate-300">
          Audited by BEE Grade-A Accredited Energy Auditors
        </div>
      </div>
    </div>
  );
}