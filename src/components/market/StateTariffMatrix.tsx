"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  CheckCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Shield,
  Zap,
  Info,
  ArrowRight,
} from "lucide-react";
import { INDIAN_STATES_OA_DATA, POPULAR_STATES, type StateOpenAccessProfile } from "@/lib/constants/indian-states-oa-data";

export function StateTariffMatrix() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVoltage, setSelectedVoltage] = useState<"11kV" | "33kV" | "132kV">("33kV");
  const [expandedStateId, setExpandedStateId] = useState<string | null>("uttar-pradesh");

  const states = POPULAR_STATES.filter((state) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    const matchesState = state.stateName.toLowerCase().includes(q);
    const matchesDiscom = state.discomNames.some((d) => d.toLowerCase().includes(q));
    const matchesHub = state.keyIndustrialHubs.some((h) => h.toLowerCase().includes(q));
    return matchesState || matchesDiscom || matchesHub;
  });

  const toggleExpand = (stateId: string) => {
    setExpandedStateId((prev) => (prev === stateId ? null : stateId));
  };

  return (
    <div className="bg-grid-navy-950 border border-grid-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-grid-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-grid-cyan-400" />
            <h3 className="text-base sm:text-lg font-bold text-white font-sans">
              State-Wise Open Access &amp; Tariff Surcharge Matrix
            </h3>
          </div>
          <p className="text-xs text-grid-slate-400 font-mono mt-0.5">
            SERC FY 2024–25 Orders &amp; MoP Green Energy Open Access (GEOA) Rules 2022
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Voltage Selector */}
          <div className="flex items-center space-x-1 bg-grid-navy-900 border border-grid-slate-800 rounded-xl p-1 text-[11px] font-mono">
            <span className="text-grid-slate-500 px-2">Voltage:</span>
            {(["11kV", "33kV", "132kV"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setSelectedVoltage(v)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  selectedVoltage === v
                    ? "bg-grid-cyan-500 text-grid-navy-950 shadow-sm"
                    : "text-grid-slate-400 hover:text-white"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-grid-slate-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search state, hub, or Discom..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-grid-navy-900 border border-grid-slate-800 rounded-xl text-xs text-white placeholder:text-grid-slate-600 font-mono focus:outline-none focus:border-grid-cyan-500 transition-colors w-48 sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-grid-slate-800 text-grid-slate-400 uppercase text-[10px] tracking-wider bg-grid-navy-900/50">
              <th className="py-3 px-3">State &amp; Nodal SLDC</th>
              <th className="py-3 px-3 text-right">HT Base Tariff</th>
              <th className="py-3 px-3 text-right">CSS (₹/kWh)</th>
              <th className="py-3 px-3 text-right">Addl. Surcharge</th>
              <th className="py-3 px-3 text-right">Wheeling ({selectedVoltage})</th>
              <th className="py-3 px-3 text-right">STU Loss %</th>
              <th className="py-3 px-3 text-center">Captive CSS Status</th>
              <th className="py-3 px-3 text-center">Green OA Min</th>
              <th className="py-3 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-grid-slate-800/60">
            {states.map((state) => {
              const isExpanded = expandedStateId === state.stateId;
              const wheeling = state.wheelingChargesPerKwh[selectedVoltage];

              return (
                <React.Fragment key={state.stateId}>
                  <tr
                    onClick={() => toggleExpand(state.stateId)}
                    className="hover:bg-grid-navy-900/60 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-2">
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5 text-grid-cyan-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-grid-slate-500 flex-shrink-0" />
                        )}
                        <div>
                          <span className="font-bold text-white block">{state.stateName}</span>
                          <span className="text-[10px] text-grid-slate-500 truncate block max-w-xs">
                            {state.sldcName.split("(")[0].trim()}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-right font-bold text-white tabular-nums">
                      ₹{state.industrialGridTariffPerKwh.toFixed(2)}/kWh
                    </td>

                    <td className="py-3 px-3 text-right text-grid-amber-400 font-bold tabular-nums">
                      ₹{state.crossSubsidySurchargePerKwh.toFixed(2)}
                    </td>

                    <td className="py-3 px-3 text-right text-purple-400 tabular-nums">
                      ₹{state.additionalSurchargePerKwh.toFixed(2)}
                    </td>

                    <td className="py-3 px-3 text-right text-grid-cyan-400 tabular-nums">
                      ₹{wheeling.toFixed(2)}
                    </td>

                    <td className="py-3 px-3 text-right text-grid-slate-300 tabular-nums">
                      {state.stuLossesPercent.toFixed(2)}%
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-grid-emerald-500/10 text-grid-emerald-400 border border-grid-emerald-500/30">
                        100% Exempt
                      </span>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] bg-grid-navy-800 text-grid-slate-300 border border-grid-slate-700">
                        {state.greenOpenAccessMinLoadKw} kW
                      </span>
                    </td>

                    <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <Link
                        href={`/tools/open-access-calculator`}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-grid-emerald-500/10 border border-grid-emerald-500/30 text-grid-emerald-400 hover:bg-grid-emerald-500 hover:text-grid-navy-950 font-bold text-[11px] transition-all"
                      >
                        <span>Simulate</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>

                  {/* Expanded Detail Drawer */}
                  {isExpanded && (
                    <tr className="bg-grid-navy-900/30 border-b border-grid-slate-800">
                      <td colSpan={9} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                          {/* Discoms */}
                          <div className="bg-grid-navy-950/80 border border-grid-slate-800 rounded-xl p-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-grid-slate-500 block mb-2">
                              Operating Distribution Utilities (Discoms)
                            </span>
                            <ul className="space-y-1">
                              {state.discomNames.map((d) => (
                                <li key={d} className="text-grid-slate-300 text-[11px] flex items-start space-x-1.5">
                                  <span className="text-grid-cyan-400 mt-0.5">›</span>
                                  <span>{d}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Industrial Hubs */}
                          <div className="bg-grid-navy-950/80 border border-grid-slate-800 rounded-xl p-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-grid-slate-500 block mb-2">
                              Key Industrial Demand Clusters
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {state.keyIndustrialHubs.map((hub) => (
                                <span
                                  key={hub}
                                  className="px-2 py-0.5 rounded bg-grid-navy-900 border border-grid-slate-700 text-grid-slate-300 text-[10px]"
                                >
                                  {hub}
                                </span>
                              ))}
                            </div>
                            <div className="mt-3 pt-2 border-t border-grid-slate-800 text-[10px] text-grid-slate-400">
                              Banking Framework: <strong className="text-white">{state.bankingCycle}</strong> ({state.bankingChargesPercent}% fee)
                            </div>
                          </div>

                          {/* Regulatory Reference & Economics */}
                          <div className="bg-grid-navy-950/80 border border-grid-slate-800 rounded-xl p-3 flex flex-col justify-between">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-grid-slate-500 block mb-1">
                                Regulatory Basis
                              </span>
                              <p className="text-[11px] text-grid-slate-300 leading-relaxed">
                                {state.regulatoryOrderRef}
                              </p>
                              <div className="mt-2 text-[10px] text-grid-slate-500">
                                SERC Portal:{" "}
                                <a
                                  href={state.sercWebsite}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-grid-cyan-400 hover:underline inline-flex items-center"
                                >
                                  {state.sercName.split("(")[0].trim()}
                                  <ExternalLink className="w-2.5 h-2.5 ml-1" />
                                </a>
                              </div>
                            </div>

                            <div className="mt-3 pt-2 border-t border-grid-slate-800 flex items-center justify-between text-[11px]">
                              <span className="text-grid-slate-400">Captive Savings:</span>
                              <span className="text-grid-emerald-400 font-bold">
                                Save ₹{(state.crossSubsidySurchargePerKwh + state.additionalSurchargePerKwh).toFixed(2)}/kWh (CSS+AS waiver)
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      <div className="mt-4 pt-3 border-t border-grid-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-grid-slate-500">
        <div className="flex items-center space-x-2">
          <Shield className="w-3.5 h-3.5 text-grid-emerald-400" />
          <span>Section 42 of Electricity Act 2003: Group Captive SPVs are 100% exempt from CSS and Additional Surcharge across all states.</span>
        </div>
        <Link href="/statutory-compliance" className="text-grid-cyan-400 hover:underline">
          View SERC Tariff Orders →
        </Link>
      </div>
    </div>
  );
}
