"use client";

import React, { useState } from "react";
import { Check, X, AlertCircle, ArrowRight, Zap, Sun, TrendingUp, HelpCircle } from "lucide-react";
import Link from "next/link";

export function RooftopVsOpenAccessMatrix() {
  const [selectedLoadTier, setSelectedLoadTier] = useState<"tier1" | "tier2" | "tier3">("tier2");

  return (
    <div className="bg-grid-navy-950 border border-grid-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-grid-slate-800 pb-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-grid-emerald-500/20 text-grid-emerald-400 border border-grid-emerald-500/30 uppercase">
              Regulatory Decision Matrix
            </span>
          </div>
          <h3 className="text-base sm:text-xl font-bold text-white font-sans mt-1">
            Industrial Procurement Comparison: Onsite Rooftop vs. Group Captive vs. IEX Power Exchange
          </h3>
          <p className="text-xs text-grid-slate-400 font-mono mt-0.5">
            Evaluating Section 42 of Electricity Act 2003, Rule 3 Captive norms, and MoP Green Energy Open Access 2022.
          </p>
        </div>

        {/* Load Filter Selector */}
        <div className="flex items-center space-x-1.5 bg-grid-navy-900 p-1 rounded-xl border border-grid-slate-800 text-xs font-mono">
          <span className="text-[10px] text-grid-slate-400 px-2 hidden sm:inline">Contract Demand:</span>
          <button
            onClick={() => setSelectedLoadTier("tier1")}
            className={`px-3 py-1.5 rounded-lg transition-colors font-bold ${
              selectedLoadTier === "tier1"
                ? "bg-grid-slate-700 text-white"
                : "text-grid-slate-400 hover:text-white"
            }`}
          >
            100 kW - 500 kW
          </button>
          <button
            onClick={() => setSelectedLoadTier("tier2")}
            className={`px-3 py-1.5 rounded-lg transition-colors font-bold ${
              selectedLoadTier === "tier2"
                ? "bg-grid-emerald-500 text-grid-navy-950"
                : "text-grid-slate-400 hover:text-white"
            }`}
          >
            500 kW - 2 MW (Recommended)
          </button>
          <button
            onClick={() => setSelectedLoadTier("tier3")}
            className={`px-3 py-1.5 rounded-lg transition-colors font-bold ${
              selectedLoadTier === "tier3"
                ? "bg-grid-slate-700 text-white"
                : "text-grid-slate-400 hover:text-white"
            }`}
          >
            &gt; 2 MW (Heavy Industry)
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono border-collapse">
          <thead>
            <tr className="border-b border-grid-slate-800 bg-grid-navy-900/60 text-grid-slate-400 uppercase text-[11px]">
              <th className="p-3 font-semibold">Evaluation Criteria</th>
              <th className="p-3 font-semibold text-grid-amber-400">
                <div className="flex items-center space-x-1.5">
                  <Sun className="w-4 h-4" />
                  <span>Onsite Rooftop Solar</span>
                </div>
                <span className="text-[9px] text-grid-slate-400 lowercase font-normal block font-sans">
                  CAPEX / RESCO (OPEX)
                </span>
              </th>
              <th className="p-3 font-semibold text-grid-emerald-400 bg-grid-emerald-500/5">
                <div className="flex items-center space-x-1.5">
                  <Zap className="w-4 h-4" />
                  <span>Offsite Group Captive (26:51)</span>
                </div>
                <span className="text-[9px] text-grid-emerald-300 lowercase font-normal block font-sans">
                  Utility-scale Solar / Wind / Hybrid
                </span>
              </th>
              <th className="p-3 font-semibold text-grid-cyan-400">
                <div className="flex items-center space-x-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>Short-Term IEX Exchange</span>
                </div>
                <span className="text-[9px] text-grid-slate-400 lowercase font-normal block font-sans">
                  DAM / GDAM / RTM 96-Blocks
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-grid-slate-800 text-grid-slate-300">
            {/* Row 1: Minimum Load Eligibility */}
            <tr className="hover:bg-grid-navy-900/40 transition-colors">
              <td className="p-3 font-bold text-white font-sans">
                Minimum Load Eligibility
              </td>
              <td className="p-3">
                <strong className="text-white">10 kW+</strong>
                <span className="text-[10px] text-grid-slate-500 block">Up to 100% sanctioned load</span>
              </td>
              <td className="p-3 bg-grid-emerald-500/5">
                <strong className="text-grid-emerald-400">100 kW</strong>
                <span className="text-[10px] text-grid-slate-400 block">
                  MoP Green Energy Rules (reduced from 1 MW)
                </span>
              </td>
              <td className="p-3">
                <strong className="text-white">1 MW (1,000 kVA)</strong>
                <span className="text-[10px] text-grid-slate-500 block">Standard CERC Open Access</span>
              </td>
            </tr>

            {/* Row 2: Land & Roof Requirement */}
            <tr className="hover:bg-grid-navy-900/40 transition-colors">
              <td className="p-3 font-bold text-white font-sans">
                Roof / Space Constraint
              </td>
              <td className="p-3">
                <strong className="text-grid-amber-300">High Requirement</strong>
                <span className="text-[10px] text-grid-slate-400 block">
                  ~100 sq.ft per kWp on shadow-free shed
                </span>
              </td>
              <td className="p-3 bg-grid-emerald-500/5">
                <strong className="text-grid-emerald-400">Zero Factory Footprint</strong>
                <span className="text-[10px] text-grid-slate-400 block">
                  Remote solar park in high-solar state
                </span>
              </td>
              <td className="p-3">
                <strong className="text-white">Zero Physical Footprint</strong>
                <span className="text-[10px] text-grid-slate-400 block">
                  Pure trading via national grid
                </span>
              </td>
            </tr>

            {/* Row 3: Factory Power Replacement % */}
            <tr className="hover:bg-grid-navy-900/40 transition-colors">
              <td className="p-3 font-bold text-white font-sans">
                Power Replacement %
              </td>
              <td className="p-3">
                <span className="text-grid-amber-400 font-bold">15% - 30%</span>
                <span className="text-[10px] text-grid-slate-400 block">Limited by usable roof area</span>
              </td>
              <td className="p-3 bg-grid-emerald-500/5">
                <span className="text-grid-emerald-400 font-bold">70% - 90%</span>
                <span className="text-[10px] text-grid-emerald-300 block">
                  Wind-Solar Hybrid matches 24/7 load
                </span>
              </td>
              <td className="p-3">
                <span className="text-white font-bold">10% - 40%</span>
                <span className="text-[10px] text-grid-slate-400 block">Opportunistic slot arbitrage</span>
              </td>
            </tr>

            {/* Row 4: CSS & Additional Surcharge */}
            <tr className="hover:bg-grid-navy-900/40 transition-colors">
              <td className="p-3 font-bold text-white font-sans">
                Cross-Subsidy & Addl Surcharge
              </td>
              <td className="p-3">
                <span className="text-grid-emerald-400 font-bold">100% Exempt</span>
                <span className="text-[10px] text-grid-slate-500 block">Onsite behind-the-meter</span>
              </td>
              <td className="p-3 bg-grid-emerald-500/5">
                <span className="text-grid-emerald-400 font-bold">100% Statutory Exemption</span>
                <span className="text-[10px] text-grid-emerald-300 block">
                  Rule 3 (26% equity : 51% consumption)
                </span>
              </td>
              <td className="p-3">
                <span className="text-grid-red-400 font-bold">Applicable</span>
                <span className="text-[10px] text-grid-slate-400 block">CSS + AS charged by Discom</span>
              </td>
            </tr>

            {/* Row 5: Contract Lock-in Period */}
            <tr className="hover:bg-grid-navy-900/40 transition-colors">
              <td className="p-3 font-bold text-white font-sans">
                Contractual Lock-in
              </td>
              <td className="p-3">
                <span className="text-white">None (CAPEX) / 15-25 Yrs (RESCO)</span>
              </td>
              <td className="p-3 bg-grid-emerald-500/5">
                <span className="text-white font-bold">10 - 25 Years PPA</span>
                <span className="text-[10px] text-grid-slate-400 block">Firm long-term tariff hedge</span>
              </td>
              <td className="p-3">
                <span className="text-grid-cyan-300 font-bold">1 Day to 3 Months</span>
                <span className="text-[10px] text-grid-slate-400 block">Zero long-term liability</span>
              </td>
            </tr>

            {/* Row 6: Net Landed Tariff & Savings */}
            <tr className="bg-grid-navy-900/90 font-bold">
              <td className="p-3 text-white font-sans">
                Net Landed Cost vs Discom
              </td>
              <td className="p-3 text-grid-amber-300">
                ₹1.55 - ₹3.20/kWh
                <span className="text-[10px] text-grid-emerald-400 block font-normal">
                  Saves ~₹5.40/kWh on solar units
                </span>
              </td>
              <td className="p-3 text-grid-emerald-400 bg-grid-emerald-500/10">
                ₹3.90 - ₹4.40/kWh
                <span className="text-[10px] text-grid-emerald-300 block font-normal">
                  Saves ~₹3.60/kWh on 80% total units
                </span>
              </td>
              <td className="p-3 text-grid-cyan-300">
                ₹5.20 - ₹6.10/kWh
                <span className="text-[10px] text-grid-slate-400 block font-normal">
                  Saves ~₹2.10/kWh on cleared slots
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Recommended Strategy Banner based on Tier */}
      <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-grid-navy-900 via-grid-navy-850 to-grid-navy-900 border border-grid-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-grid-emerald-400 uppercase tracking-wider block">
            Topnotch Recommended Industrial Strategy:
          </span>
          <p className="text-xs text-white mt-1">
            {selectedLoadTier === "tier1" &&
              "For 100 kW - 500 kW loads: Deploy maximum Onsite PEB Rooftop Solar (CAPEX/RESCO) paired with Green Energy Open Access (GEOA 2022) to eliminate up to 45% of Discom bills."}
            {selectedLoadTier === "tier2" &&
              "For 500 kW - 2 MW loads: The Golden Hybrid Model — Combine a 26:51 Group Captive Solar/Wind PPA (65% baseload) + Onsite Rooftop (20%) + IEX RTM Balancing (15%) for maximum ROI."}
            {selectedLoadTier === "tier3" &&
              "For > 2 MW Heavy Industrial loads: Multi-state ISTS Group Captive Hybrid (75%) + 24x7 IEX Power Trading Desk (DAM/RTM) to achieve over ₹12-25 Crores annual savings."}
          </p>
        </div>

        <Link
          href="/tools/open-access-calculator"
          className="px-4 py-2 rounded-lg bg-grid-emerald-500 hover:bg-grid-emerald-400 text-grid-navy-950 font-bold font-mono text-xs whitespace-nowrap transition-colors flex items-center space-x-1.5 shadow-md flex-shrink-0"
        >
          <span>Calculate Plant Savings</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
