"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Factory,
  TrendingDown,
  Zap,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sliders,
} from "lucide-react";

interface IndustryOption {
  name: string;
  loadFactor: number;
  typicalShift: string;
}

const INDUSTRIES: Record<string, IndustryOption> = {
  steel: {
    name: "Steel & Induction Furnace",
    loadFactor: 0.85,
    typicalShift: "Continuous 24x7 (3 Shifts)",
  },
  textile: {
    name: "Textile & Yarn Spinning",
    loadFactor: 0.80,
    typicalShift: "Continuous 24x7 (3 Shifts)",
  },
  chemical: {
    name: "Chemical & Active Pharma",
    loadFactor: 0.75,
    typicalShift: "Continuous 24x7 (3 Shifts)",
  },
  coldchain: {
    name: "Cold Storage & Agro Processing",
    loadFactor: 0.65,
    typicalShift: "Dual Shift + Compressor Cycling",
  },
  auto: {
    name: "Automotive Ancillary / PEB Shed",
    loadFactor: 0.60,
    typicalShift: "Double Shift (16 Hours/Day)",
  },
};

const STATE_RATES: Record<string, { discomTariff: number; state: string }> = {
  up: { state: "Uttar Pradesh (PVVNL/DVVNL/MVVNL)", discomTariff: 8.85 },
  gujarat: { state: "Gujarat (UGVCL/DGVCL/MGVCL)", discomTariff: 7.95 },
  maharashtra: { state: "Maharashtra (MSEDCL)", discomTariff: 9.40 },
  haryana: { state: "Haryana (DHBVN/UHBVN)", discomTariff: 8.20 },
  rajasthan: { state: "Rajasthan (JVVNL/AVVNL)", discomTariff: 8.65 },
  karnataka: { state: "Karnataka (BESCOM/MESCOM)", discomTariff: 8.40 },
};

export function PlantArbitrageSimulator() {
  const [selectedIndustry, setSelectedIndustry] = useState("steel");
  const [contractDemandKva, setContractDemandKva] = useState(5000); // 5000 kVA default
  const [selectedState, setSelectedState] = useState("up");
  const [shiftPattern, setShiftPattern] = useState<"continuous" | "solar_heavy" | "night_valley">("continuous");

  const industry = INDUSTRIES[selectedIndustry];
  const stateData = STATE_RATES[selectedState];

  // Effective operating hours per day
  const dailyHours = shiftPattern === "continuous" ? 24 : shiftPattern === "solar_heavy" ? 14 : 10;
  
  // Daily energy consumption (kWh) = kVA * Power Factor (0.95) * Load Factor * Operating Hours
  const dailyKwh = Math.round(contractDemandKva * 0.95 * industry.loadFactor * dailyHours);
  const monthlyKwh = dailyKwh * 30;

  // Average Sourced Tariff based on 96-block optimization strategy
  let topnotchLandedRate = 4.40;
  if (shiftPattern === "solar_heavy") {
    // Heavy sourcing during daytime solar dip (GDAM ₹3.15 + wheeling/losses ₹1.05)
    topnotchLandedRate = 4.15;
  } else if (shiftPattern === "night_valley") {
    // Night valley hours (RTM/DAM off-peak ₹3.60 + wheeling ₹1.05)
    topnotchLandedRate = 4.35;
  } else {
    // Continuous round-the-clock hybrid blend
    topnotchLandedRate = 4.55;
  }

  // Monthly financials in Lakhs
  const monthlyDiscomSpendLakhs = Number(((monthlyKwh * stateData.discomTariff) / 100000).toFixed(2));
  const monthlyTopnotchSpendLakhs = Number(((monthlyKwh * topnotchLandedRate) / 100000).toFixed(2));
  const monthlySavingsLakhs = Number((monthlyDiscomSpendLakhs - monthlyTopnotchSpendLakhs).toFixed(2));
  const annualSavingsCrores = Number(((monthlySavingsLakhs * 12) / 100).toFixed(2));
  const percentageSavings = Math.round(((stateData.discomTariff - topnotchLandedRate) / stateData.discomTariff) * 100);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-[#0E172A] to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-700/80 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F8BC26]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive Bourse Arbitrage Engine</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Simulate Your Plant&apos;s <span className="text-[#F8BC26]">24-Hour Bourse Savings</span>
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Compute financial arbitrage against DISCOM retail tariffs using our 96-block Day-Ahead (DAM) and Green Day-Ahead (GDAM) optimization models.
          </p>
        </div>

        <div className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white/5 border border-slate-700 text-xs font-mono text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>CERC Approved Dispatch Models</span>
        </div>
      </div>

      {/* Main Grid: Controls vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        
        {/* Left Column: Interactive Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Industry Selection */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block mb-2">
              Select Industry Profile
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(INDUSTRIES).map(([key, ind]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedIndustry(key)}
                  className={`p-3 rounded-xl text-left transition-all border text-xs font-mono ${
                    selectedIndustry === key
                      ? "bg-[#F8BC26] text-[#1C2C34] border-[#F8BC26] font-bold shadow-md"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  }`}
                >
                  <div className="font-sans font-bold text-sm leading-tight">{ind.name}</div>
                  <div className="text-[10px] opacity-80 mt-1">{ind.typicalShift}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Plant Contract Demand Slider */}
          <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                Plant Contract Demand:
              </span>
              <span className="text-lg font-black font-mono text-[#F8BC26]">
                {contractDemandKva.toLocaleString()} kVA
              </span>
            </div>
            <input
              type="range"
              min={1000}
              max={25000}
              step={500}
              value={contractDemandKva}
              onChange={(e) => setContractDemandKva(Number(e.target.value))}
              className="w-full accent-[#F8BC26] cursor-pointer h-2 bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-2">
              <span>1,000 kVA (Small HT)</span>
              <span>10,000 kVA (Medium)</span>
              <span>25,000 kVA (Heavy Continuous)</span>
            </div>
          </div>

          {/* State & DISCOM Selection */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block mb-2">
              State Electricity Regulatory Commission (SERC) Zone
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F8BC26] font-mono"
            >
              {Object.entries(STATE_RATES).map(([key, data]) => (
                <option key={key} value={key}>
                  {data.state} — Baseline Retail: ₹{data.discomTariff}/kWh
                </option>
              ))}
            </select>
          </div>

          {/* Dispatch Shift Pattern */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block mb-2">
              Factory Operating Dispatch Schedule
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "continuous", label: "24x7 Continuous", hours: "24 Hours" },
                { id: "solar_heavy", label: "Solar Dip Heavy", hours: "Day Shift (GDAM)" },
                { id: "night_valley", label: "Night Valley", hours: "Night Batches" },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setShiftPattern(p.id as typeof shiftPattern)}
                  className={`p-2.5 rounded-xl text-center border text-xs font-mono transition-all ${
                    shiftPattern === p.id
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold"
                      : "bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white"
                  }`}
                >
                  <div className="font-bold">{p.label}</div>
                  <div className="text-[10px] opacity-75">{p.hours}</div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Computed Arbitrage KPIs (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-slate-800/70 border border-slate-700/80 p-6 sm:p-7 rounded-2xl">
          
          <div className="space-y-5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
                Projected Annual Energy Bill Reduction
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl sm:text-5xl font-black text-[#10B981] font-mono">
                  ₹{annualSavingsCrores}
                </span>
                <span className="text-xl font-black text-slate-300 font-mono">
                  Cr / year
                </span>
              </div>
              <div className="inline-flex items-center space-x-1.5 mt-2 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>{percentageSavings}% Net Tariff Reduction vs DISCOM</span>
              </div>
            </div>

            {/* Monthly Comparison Breakdown */}
            <div className="space-y-3 pt-4 border-t border-slate-700">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Monthly Power Draw:</span>
                <span className="text-white font-bold">{monthlyKwh.toLocaleString()} kWh</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Current DISCOM Spend:</span>
                <span className="text-slate-300 font-bold">₹{monthlyDiscomSpendLakhs} Lakhs/mo</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Topnotch 96-Block Sourced:</span>
                <span className="text-[#F8BC26] font-bold">₹{monthlyTopnotchSpendLakhs} Lakhs/mo</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-slate-700/60">
                <span className="text-emerald-400 font-bold">Net Monthly Cash Retained:</span>
                <span className="text-emerald-400 font-black text-sm">₹{monthlySavingsLakhs} Lakhs/mo</span>
              </div>
            </div>

            {/* Strategic Notes */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-[11px] font-mono text-slate-300 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-[#F8BC26] font-bold">
                <Zap className="w-3.5 h-3.5" />
                <span>Trading Floor Optimization Strategy:</span>
              </div>
              <p className="leading-relaxed text-slate-400">
                Power dynamically co-optimized via Day-Ahead Market (DAM) baseload and GDAM solar dip slots. Deviation Settlement (DSM) managed automatically via 24x7 SCADA automation.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <Link
            href="/tools/open-access-calculator"
            className="w-full py-4 rounded-xl bg-[#F8BC26] hover:bg-[#e6ab1e] text-[#1C2C34] font-black text-xs font-mono uppercase tracking-wider transition-all shadow-xl active:scale-95 flex items-center justify-center space-x-2 text-center"
          >
            <span>Open Advanced 96-Block Dispatch Solver</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

        </div>

      </div>
    </div>
  );
}