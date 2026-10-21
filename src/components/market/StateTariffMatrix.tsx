"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Shield,
  ArrowRight,
  Zap,
} from "lucide-react";
import { POPULAR_STATES } from "@/lib/constants/indian-states-oa-data";

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
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <h3 className="text-lg sm:text-xl font-black text-[#1C2C34]">
              State-Wise Open Access &amp; Tariff Surcharge Matrix
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-mono mt-1">
            SERC FY 2024–25 Orders &amp; MoP Green Energy Open Access (GEOA) Rules 2022
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Voltage Selector */}
          <div className="flex items-center space-x-1 bg-slate-100 border border-slate-200 rounded-xl p-1 text-xs font-mono">
            <span className="text-slate-500 px-2 font-medium">Voltage:</span>
            {(["11kV", "33kV", "132kV"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setSelectedVoltage(v)}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  selectedVoltage === v
                    ? "bg-[#F8BC26] text-[#1C2C34] shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search state, hub, or DISCOM..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 font-mono focus:outline-none focus:border-emerald-600 transition-colors w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* 1. Desktop High-Density Table */}
      <div className="hidden md:block overflow-x-auto mt-4">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider bg-slate-50/80">
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
          <tbody className="divide-y divide-slate-100">
            {states.map((state) => {
              const isExpanded = expandedStateId === state.stateId;
              const wheeling = state.wheelingChargesPerKwh[selectedVoltage];

              return (
                <React.Fragment key={state.stateId}>
                  <tr
                    onClick={() => toggleExpand(state.stateId)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-2">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        )}
                        <div>
                          <span className="font-bold text-slate-900 block">{state.stateName}</span>
                          <span className="text-[10px] text-slate-500 truncate block max-w-xs">
                            {state.sldcName.split("(")[0].trim()}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-right font-bold text-slate-900 tabular-nums">
                      ₹{state.industrialGridTariffPerKwh.toFixed(2)}/kWh
                    </td>

                    <td className="py-3 px-3 text-right text-amber-800 font-bold tabular-nums">
                      ₹{state.crossSubsidySurchargePerKwh.toFixed(2)}
                    </td>

                    <td className="py-3 px-3 text-right text-slate-700 tabular-nums">
                      ₹{state.additionalSurchargePerKwh.toFixed(2)}
                    </td>

                    <td className="py-3 px-3 text-right text-slate-800 font-medium tabular-nums">
                      ₹{wheeling.toFixed(2)}
                    </td>

                    <td className="py-3 px-3 text-right text-slate-600 tabular-nums">
                      {state.stuLossesPercent.toFixed(2)}%
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        100% Exempt
                      </span>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] bg-slate-100 text-slate-700 border border-slate-200">
                        {state.greenOpenAccessMinLoadKw} kW
                      </span>
                    </td>

                    <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <Link
                        href={`/tools/open-access-calculator`}
                        className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-600 hover:text-white font-bold text-[11px] transition-all"
                      >
                        <span>Simulate</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>

                  {/* Expanded Detail Drawer */}
                  {isExpanded && (
                    <tr className="bg-slate-50/60 border-b border-slate-200">
                      <td colSpan={9} className="p-4 sm:p-5">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                          {/* DISCOMs */}
                          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                              Operating Distribution Utilities (DISCOMs)
                            </span>
                            <ul className="space-y-1">
                              {state.discomNames.map((d) => (
                                <li key={d} className="text-slate-700 text-[11px] flex items-start space-x-1.5">
                                  <span className="text-emerald-700 mt-0.5">›</span>
                                  <span>{d}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Industrial Hubs */}
                          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                              Key Industrial Demand Clusters
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {state.keyIndustrialHubs.map((hub) => (
                                <span
                                  key={hub}
                                  className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 text-[10px]"
                                >
                                  {hub}
                                </span>
                              ))}
                            </div>
                            <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-500">
                              Banking Framework: <strong className="text-slate-800">{state.bankingCycle}</strong> ({state.bankingChargesPercent}% fee)
                            </div>
                          </div>

                          {/* Regulatory Reference & Economics */}
                          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col justify-between">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                                Regulatory Basis
                              </span>
                              <p className="text-[11px] text-slate-700 leading-relaxed">
                                {state.regulatoryOrderRef}
                              </p>
                              <div className="mt-2 text-[10px] text-slate-500">
                                SERC Portal:{" "}
                                <a
                                  href={state.sercWebsite}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-emerald-700 font-semibold hover:underline inline-flex items-center"
                                >
                                  {state.sercName.split("(")[0].trim()}
                                  <ExternalLink className="w-2.5 h-2.5 ml-1" />
                                </a>
                              </div>
                            </div>

                            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                              <span className="text-slate-500">Captive Savings:</span>
                              <span className="text-emerald-800 font-bold">
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

      {/* 2. Mobile Responsive Card Deck */}
      <div className="md:hidden space-y-3 mt-4">
        {states.map((state) => {
          const isExpanded = expandedStateId === state.stateId;
          const wheeling = state.wheelingChargesPerKwh[selectedVoltage];

          return (
            <div
              key={state.stateId}
              className="bg-[#F9FAFB] border border-slate-200 rounded-xl p-4 font-mono transition-colors"
            >
              {/* Card Header */}
              <div
                onClick={() => toggleExpand(state.stateId)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-black text-slate-900 text-sm font-sans">{state.stateName}</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Captive 100% Exempt
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    {state.sldcName.split("(")[0].trim()}
                  </span>
                </div>
                <button
                  type="button"
                  aria-label={isExpanded ? "Collapse state details" : "Expand state details"}
                  className="p-1 rounded text-slate-500 hover:text-slate-900"
                >
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-emerald-700" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Card Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">HT Base Tariff</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    ₹{state.industrialGridTariffPerKwh.toFixed(2)}/kWh
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">CSS (₹/kWh)</span>
                  <span className="font-bold text-amber-800 tabular-nums">
                    ₹{state.crossSubsidySurchargePerKwh.toFixed(2)}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Addl. Surcharge</span>
                  <span className="font-bold text-slate-800 tabular-nums">
                    ₹{state.additionalSurchargePerKwh.toFixed(2)}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Wheeling ({selectedVoltage})</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    ₹{wheeling.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Expanded Card Details */}
              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-slate-200 space-y-3 text-xs animate-in fade-in duration-150">
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1">
                      Operating DISCOMs
                    </span>
                    <div className="text-[11px] text-slate-700">
                      {state.discomNames.join(", ")}
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1">
                      Key Industrial Hubs
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {state.keyIndustrialHubs.map((hub) => (
                        <span
                          key={hub}
                          className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] text-slate-700"
                        >
                          {hub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg text-[11px] text-emerald-800 flex items-center justify-between">
                    <span>Captive Net Waiver (CSS + AS):</span>
                    <span className="font-bold">
                      Save ₹{(state.crossSubsidySurchargePerKwh + state.additionalSurchargePerKwh).toFixed(2)}/kWh
                    </span>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="mt-3">
                <Link
                  href="/tools/open-access-calculator"
                  className="w-full flex items-center justify-center space-x-1.5 py-2.5 rounded-xl bg-[#F8BC26] text-[#1C2C34] font-bold text-xs shadow-sm"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Simulate {state.stateName} Plant Savings</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-slate-500">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-emerald-700" />
          <span>Section 42 of Electricity Act 2003: Group Captive SPVs are 100% exempt from CSS and Additional Surcharge across all states.</span>
        </div>
        <Link href="/statutory-compliance" className="text-emerald-700 font-bold hover:underline">
          View SERC Tariff Orders →
        </Link>
      </div>
    </div>
  );
}
