"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, Sparkles, TrendingDown, ShieldCheck } from "lucide-react";
import { POPULAR_STATES, calculateOpenAccessEconomics } from "@/lib/constants/indian-states-oa-data";

export function QuickSavingsEstimator() {
  const [stateId, setStateId] = useState("uttar-pradesh");
  const [contractDemandKva, setContractDemandKva] = useState(4000);
  const [existingTariff, setExistingTariff] = useState(8.5);

  const selectedState = useMemo(() => {
    return POPULAR_STATES.find((s) => s.stateId === stateId) || POPULAR_STATES[0];
  }, [stateId]);

  const economics = useMemo(() => {
    // Estimated monthly consumption at 75% load factor: CD * 0.9 PF * 730h * 0.75
    const monthlyUnits = Math.round(contractDemandKva * 0.9 * 730 * 0.75);
    const result = calculateOpenAccessEconomics({
      stateId,
      contractDemandKva,
      monthlyConsumptionKwh: monthlyUnits,
      openAccessModel: "group-captive",
      powerSource: "hybrid",
      voltageLevel: "33kV",
    });

    // Custom difference based on user's selected existing grid tariff
    const diffPerKwh = Math.max(0, existingTariff - result.landedOpenAccessRatePerKwh);
    const monthlySavingsInr = diffPerKwh * monthlyUnits;
    const annualSavingsInr = monthlySavingsInr * 12;

    return {
      landedRate: result.landedOpenAccessRatePerKwh,
      diffPerKwh,
      monthlySavingsInr,
      annualSavingsInr,
      monthlyUnits,
    };
  }, [stateId, contractDemandKva, existingTariff]);

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold text-[#D97706] flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Industrial Feasibility</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#1C2C34] tracking-tight">
              Estimate Your Plant&apos;s Monthly Power Bill Savings
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-mono">
              Adjust your facility&apos;s load to see potential Group Captive Open Access savings.
            </p>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {/* State Selection */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 uppercase">
                Plant Location (SERC Jurisdiction)
              </label>
              <select
                value={stateId}
                onChange={(e) => setStateId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F8BC26]"
              >
                {POPULAR_STATES.map((s) => (
                  <option key={s.stateId} value={s.stateId}>
                    {s.stateName} (Discom Base: ₹{s.industrialGridTariffPerKwh.toFixed(2)}/kWh)
                  </option>
                ))}
              </select>
            </div>

            {/* Contract Demand Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-slate-700 uppercase">
                  Contract Demand (Sanctioned kVA)
                </label>
                <span className="text-slate-900 font-bold">{contractDemandKva.toLocaleString()} kVA</span>
              </div>
              <input
                type="range"
                min={500}
                max={15000}
                step={250}
                value={contractDemandKva}
                onChange={(e) => setContractDemandKva(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-600">
                <span>500 kVA</span>
                <span>5,000 kVA</span>
                <span>10,000 kVA</span>
                <span>15,000 kVA</span>
              </div>
            </div>

            {/* Existing DISCOM Tariff Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-slate-700 uppercase">
                  Current Billed DISCOM Rate (₹/kVAh)
                </label>
                <span className="text-slate-900 font-bold">₹{existingTariff.toFixed(2)}/kWh</span>
              </div>
              <input
                type="range"
                min={6.5}
                max={12.0}
                step={0.1}
                value={existingTariff}
                onChange={(e) => setExistingTariff(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-600">
                <span>₹6.50</span>
                <span>₹8.50</span>
                <span>₹10.50</span>
                <span>₹12.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Card (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-7 space-y-5 font-mono shadow-2xl border border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold flex items-center space-x-1.5">
              <TrendingDown className="w-4 h-4" />
              <span>Projected Landed Tariff</span>
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold border border-emerald-500/30">
              Sec 42 Captive
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 tabular-nums">
              ₹{economics.landedRate.toFixed(2)}
              <span className="text-xs font-normal text-slate-400 ml-1">/kWh</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Net Reduction: <strong className="text-white">₹{economics.diffPerKwh.toFixed(2)}/kWh</strong> vs current utility bill
            </p>
          </div>

          {/* Savings Box */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">Monthly Savings</span>
              <span className="text-lg font-black text-white tabular-nums block mt-0.5">
                ₹{(economics.monthlySavingsInr / 100000).toFixed(2)} L
              </span>
            </div>

            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">Annual Savings</span>
              <span className="text-lg font-black text-amber-400 tabular-nums block mt-0.5">
                ₹{(economics.annualSavingsInr / 10000000).toFixed(2)} Cr
              </span>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-2">
            <Link
              href="/tools/open-access-calculator"
              className="w-full py-3 rounded-xl bg-[#F8BC26] hover:bg-[#eab308] text-[#1C2C34] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 shadow-md active:scale-95"
            >
              <span>Launch Full 96-Block Simulator →</span>
            </Link>
            <p className="text-[10px] text-slate-400 text-center mt-2 flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Grounded in {selectedState.sercName} Tariff Regulations</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
