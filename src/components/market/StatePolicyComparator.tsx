"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  POPULAR_STATES,
  type StateOpenAccessProfile,
} from "@/lib/constants/indian-states-oa-data";
import {
  ArrowRight,
  Shield,
  Zap,
  CheckCircle2,
  ExternalLink,
  Scale,
  Building,
} from "lucide-react";

export function StatePolicyComparator() {
  const [state1Id, setState1Id] = useState<string>("uttar-pradesh");
  const [state2Id, setState2Id] = useState<string>("gujarat");
  const [state3Id, setState3Id] = useState<string>("rajasthan");
  const [voltage, setVoltage] = useState<"11kV" | "33kV" | "132kV">("33kV");

  const s1 = POPULAR_STATES.find((s) => s.stateId === state1Id) || POPULAR_STATES[0];
  const s2 = POPULAR_STATES.find((s) => s.stateId === state2Id) || POPULAR_STATES[1];
  const s3 = POPULAR_STATES.find((s) => s.stateId === state3Id) || POPULAR_STATES[2];

  const comparedStates = [s1, s2, s3];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* State Selector Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b border-slate-200">
        <div>
          <label className="block text-xs font-mono font-bold uppercase text-slate-500 mb-1.5">
            Compare State 1 (Primary Plant)
          </label>
          <select
            value={state1Id}
            onChange={(e) => setState1Id(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-emerald-600 font-mono"
          >
            {POPULAR_STATES.map((s) => (
              <option key={s.stateId} value={s.stateId}>
                {s.stateName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold uppercase text-slate-500 mb-1.5">
            Compare State 2
          </label>
          <select
            value={state2Id}
            onChange={(e) => setState2Id(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-emerald-600 font-mono"
          >
            {POPULAR_STATES.map((s) => (
              <option key={s.stateId} value={s.stateId}>
                {s.stateName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold uppercase text-slate-500 mb-1.5">
            Compare State 3
          </label>
          <select
            value={state3Id}
            onChange={(e) => setState3Id(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-emerald-600 font-mono"
          >
            {POPULAR_STATES.map((s) => (
              <option key={s.stateId} value={s.stateId}>
                {s.stateName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Voltage Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-b border-slate-100 text-xs font-mono">
        <span className="text-slate-500 font-semibold">
          Select Interconnection Voltage Level for Wheeling Comparison:
        </span>
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {(["11kV", "33kV", "132kV"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setVoltage(v)}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                voltage === v
                  ? "bg-[#F8BC26] text-[#1C2C34] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="overflow-x-auto mt-6">
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-200 text-slate-500 uppercase text-[11px]">
              <th className="py-3 px-3 w-1/4">Policy Metric / Charge</th>
              {comparedStates.map((s) => (
                <th key={s.stateId} className="py-3 px-4 w-1/4">
                  <div className="text-sm font-black text-[#1C2C34]">{s.stateName}</div>
                  <div className="text-[10px] text-slate-400 font-normal">{s.sldcName.split("(")[0].trim()}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {/* HT Base Grid Tariff */}
            <tr className="hover:bg-slate-50/80">
              <td className="py-3.5 px-3 font-semibold text-slate-700">
                DISCOM HT Base Tariff
                <span className="block text-[10px] text-slate-400 font-normal">Prevailing SERC retail schedule</span>
              </td>
              {comparedStates.map((s) => (
                <td key={s.stateId} className="py-3.5 px-4 font-black text-slate-900 tabular-nums">
                  ₹{s.industrialGridTariffPerKwh.toFixed(2)}/kWh
                </td>
              ))}
            </tr>

            {/* Cross-Subsidy Surcharge (CSS) */}
            <tr className="hover:bg-slate-50/80">
              <td className="py-3.5 px-3 font-semibold text-slate-700">
                Cross-Subsidy Surcharge (CSS)
                <span className="block text-[10px] text-slate-400 font-normal">Third-Party OA drawl rate</span>
              </td>
              {comparedStates.map((s) => (
                <td key={s.stateId} className="py-3.5 px-4 font-bold text-amber-800 tabular-nums">
                  ₹{s.crossSubsidySurchargePerKwh.toFixed(2)}/kWh
                </td>
              ))}
            </tr>

            {/* Additional Surcharge (AS) */}
            <tr className="hover:bg-slate-50/80">
              <td className="py-3.5 px-3 font-semibold text-slate-700">
                Additional Surcharge (AS)
                <span className="block text-[10px] text-slate-400 font-normal">Stranded capacity fee</span>
              </td>
              {comparedStates.map((s) => (
                <td key={s.stateId} className="py-3.5 px-4 font-bold text-slate-700 tabular-nums">
                  ₹{s.additionalSurchargePerKwh.toFixed(2)}/kWh
                </td>
              ))}
            </tr>

            {/* Wheeling Charge */}
            <tr className="hover:bg-slate-50/80">
              <td className="py-3.5 px-3 font-semibold text-slate-700">
                Wheeling Charge ({voltage})
                <span className="block text-[10px] text-slate-400 font-normal">Distribution line wheeling fee</span>
              </td>
              {comparedStates.map((s) => (
                <td key={s.stateId} className="py-3.5 px-4 font-bold text-slate-800 tabular-nums">
                  ₹{s.wheelingChargesPerKwh[voltage].toFixed(2)}/kWh
                </td>
              ))}
            </tr>

            {/* STU Transmission Loss % */}
            <tr className="hover:bg-slate-50/80">
              <td className="py-3.5 px-3 font-semibold text-slate-700">
                STU Grid Transmission Loss %
                <span className="block text-[10px] text-slate-400 font-normal">In-kind loss deducted by state grid</span>
              </td>
              {comparedStates.map((s) => (
                <td key={s.stateId} className="py-3.5 px-4 font-medium text-slate-700 tabular-nums">
                  {s.stuLossesPercent.toFixed(2)}%
                </td>
              ))}
            </tr>

            {/* Group Captive (Section 42) Exemption */}
            <tr className="hover:bg-slate-50/80 bg-emerald-50/40">
              <td className="py-3.5 px-3 font-bold text-emerald-900">
                Group Captive (26:51) Waiver
                <span className="block text-[10px] text-emerald-700 font-normal">Section 42 statutory exemption</span>
              </td>
              {comparedStates.map((s) => (
                <td key={s.stateId} className="py-3.5 px-4 font-black text-emerald-800">
                  100% CSS &amp; AS Exempt
                  <span className="block text-[10px] text-emerald-700 font-mono mt-0.5">
                    Save ₹{(s.crossSubsidySurchargePerKwh + s.additionalSurchargePerKwh).toFixed(2)}/kWh
                  </span>
                </td>
              ))}
            </tr>

            {/* Banking Framework */}
            <tr className="hover:bg-slate-50/80">
              <td className="py-3.5 px-3 font-semibold text-slate-700">
                Energy Banking Framework
                <span className="block text-[10px] text-slate-400 font-normal">Allowed cycle &amp; state fee</span>
              </td>
              {comparedStates.map((s) => (
                <td key={s.stateId} className="py-3.5 px-4 text-slate-700">
                  <strong>{s.bankingCycle}</strong> ({s.bankingChargesPercent}% fee)
                </td>
              ))}
            </tr>

            {/* Green Energy Open Access Minimum Load */}
            <tr className="hover:bg-slate-50/80">
              <td className="py-3.5 px-3 font-semibold text-slate-700">
                Green OA Threshold (MoP 2022)
                <span className="block text-[10px] text-slate-400 font-normal">Minimum sanctioned demand</span>
              </td>
              {comparedStates.map((s) => (
                <td key={s.stateId} className="py-3.5 px-4 font-bold text-slate-800">
                  {s.greenOpenAccessMinLoadKw} kW
                </td>
              ))}
            </tr>

            {/* Regulatory Order Citation */}
            <tr className="hover:bg-slate-50/80">
              <td className="py-3.5 px-3 font-semibold text-slate-700">
                Statutory SERC Reference
                <span className="block text-[10px] text-slate-400 font-normal">Official regulatory order</span>
              </td>
              {comparedStates.map((s) => (
                <td key={s.stateId} className="py-3.5 px-4 text-[11px] text-slate-500">
                  {s.regulatoryOrderRef}
                </td>
              ))}
            </tr>

            {/* Action Row */}
            <tr className="bg-slate-50/60">
              <td className="py-4 px-3 font-bold text-slate-900">
                Model Plant Economics
              </td>
              {comparedStates.map((s) => (
                <td key={s.stateId} className="py-4 px-4">
                  <Link
                    href={`/tools/open-access-calculator`}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#F8BC26] hover:bg-[#e6ab1e] text-[#1C2C34] font-bold text-[11px] transition-all shadow-2xs"
                  >
                    <span>Simulate {s.stateName}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
