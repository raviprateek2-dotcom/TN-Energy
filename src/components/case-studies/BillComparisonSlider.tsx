"use client";

import React, { useState } from "react";
import {
  TrendingDown,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Factory,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface PlantArchetype {
  id: string;
  name: string;
  industry: string;
  state: string;
  connectedLoad: string;
  monthlyConsumption: string;
  before: {
    discom: string;
    effectiveRate: number;
    monthlyBillLakhs: number;
    cssCharge: number;
    asCharge: number;
    peakDemandPenalty: string;
    cleanEnergyPercent: number;
  };
  after: {
    structure: string;
    effectiveRate: number;
    monthlyBillLakhs: number;
    cssCharge: number;
    asCharge: number;
    monthlySavingsLakhs: number;
    percentSaved: number;
    annualSavingsCrores: number;
    cleanEnergyPercent: number;
  };
}

const ARCHETYPES: PlantArchetype[] = [
  {
    id: "fmcg-up",
    name: "FMCG Food & Beverage Packaging Campus",
    industry: "FMCG / Agro Processing",
    state: "Uttar Pradesh (PVVNL HT-2)",
    connectedLoad: "3.2 MVA at 33 kV",
    monthlyConsumption: "11,50,000 kWh",
    before: {
      discom: "PVVNL 33 kV Industrial Tariff",
      effectiveRate: 9.35,
      monthlyBillLakhs: 107.52,
      cssCharge: 1.95,
      asCharge: 0.94,
      peakDemandPenalty: "₹450/kVA over-drawl penalty",
      cleanEnergyPercent: 6,
    },
    after: {
      structure: "Group Captive Solar SPV + GDAM Green Bourse",
      effectiveRate: 5.82,
      monthlyBillLakhs: 66.93,
      cssCharge: 0.0,
      asCharge: 0.0,
      monthlySavingsLakhs: 40.59,
      percentSaved: 37.8,
      annualSavingsCrores: 4.87,
      cleanEnergyPercent: 82,
    },
  },
  {
    id: "steel-gujarat",
    name: "Continuous Steel Rolling & Billet Mill",
    industry: "Heavy Metallurgy",
    state: "Gujarat (UGVCL 66 kV)",
    connectedLoad: "8.5 MVA at 66 kV",
    monthlyConsumption: "34,00,000 kWh",
    before: {
      discom: "UGVCL HTP-1 High Tension",
      effectiveRate: 8.75,
      monthlyBillLakhs: 297.5,
      cssCharge: 1.68,
      asCharge: 0.72,
      peakDemandPenalty: "Strict TOD night/day differential",
      cleanEnergyPercent: 8,
    },
    after: {
      structure: "Wind-Solar Hybrid Captive + RTM 15-Min Arbitrage",
      effectiveRate: 5.48,
      monthlyBillLakhs: 186.32,
      cssCharge: 0.0,
      asCharge: 0.0,
      monthlySavingsLakhs: 111.18,
      percentSaved: 37.4,
      annualSavingsCrores: 13.34,
      cleanEnergyPercent: 86,
    },
  },
  {
    id: "textile-haryana",
    name: "Synthetic Yarn & Textile Spinning Mill",
    industry: "Textile & Polymers",
    state: "Haryana (DHBVN 33 kV)",
    connectedLoad: "4.8 MVA at 33 kV",
    monthlyConsumption: "17,20,000 kWh",
    before: {
      discom: "DHBVN HT Industrial Category",
      effectiveRate: 9.60,
      monthlyBillLakhs: 165.12,
      cssCharge: 2.12,
      asCharge: 0.88,
      peakDemandPenalty: "FSA Fuel Surcharge variations",
      cleanEnergyPercent: 4,
    },
    after: {
      structure: "BTM Rooftop Solar (1.2 MWp) + ISTS Captive PPA",
      effectiveRate: 5.95,
      monthlyBillLakhs: 102.34,
      cssCharge: 0.0,
      asCharge: 0.0,
      monthlySavingsLakhs: 62.78,
      percentSaved: 38.0,
      annualSavingsCrores: 7.53,
      cleanEnergyPercent: 78,
    },
  },
];

export function BillComparisonSlider() {
  const [selectedId, setSelectedId] = useState(ARCHETYPES[0].id);
  const [sliderPos, setSliderPos] = useState(50); // 0 to 100 percent

  const plant = ARCHETYPES.find((p) => p.id === selectedId) || ARCHETYPES[0];

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
      {/* Header Bar: Industrial Archetype Selector */}
      <div className="bg-[#0B132B] text-white p-6 sm:p-8 border-b border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Bill Audit Comparator</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Before vs. After Power Bill Comparison
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-xl leading-relaxed">
              Drag the central divider to inspect itemized tariff components, statutory surcharge waivers, and bottom-line rupee savings verified against actual monthly utility bills.
            </p>
          </div>

          {/* Archetype Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {ARCHETYPES.map((arch) => (
              <button
                key={arch.id}
                type="button"
                onClick={() => setSelectedId(arch.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 font-bold ${
                  selectedId === arch.id
                    ? "bg-[#F8BC26] text-[#1C2C34] shadow-md"
                    : "bg-white/10 hover:bg-white/20 text-slate-300"
                }`}
              >
                {arch.industry.split("/")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Plant Metadata Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Facility</span>
            <span className="text-white font-bold">{plant.name}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">State & Grid Code</span>
            <span className="text-[#F8BC26] font-bold">{plant.state}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Connected Load</span>
            <span className="text-white font-bold">{plant.connectedLoad}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Monthly Consumption</span>
            <span className="text-emerald-400 font-bold">{plant.monthlyConsumption}</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Slider Split Stage */}
      <div className="relative select-none overflow-hidden bg-slate-50 min-h-[460px]">
        {/* Left Side: BEFORE (Old DISCOM Monopoly Bill) */}
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-br from-rose-50/70 to-slate-100 overflow-hidden border-r border-rose-200/50"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="p-6 sm:p-8 min-w-[320px] sm:min-w-[420px] space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-800 text-xs font-mono font-bold uppercase">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>BEFORE: DISCOM Standard Monopoly</span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-rose-950 font-mono">
                ₹{plant.before.effectiveRate.toFixed(2)}
                <span className="text-sm font-sans text-slate-500 font-normal"> / kWh Landed</span>
              </div>
              <div className="text-sm font-mono text-rose-700 font-bold">
                Monthly Bill: ₹{plant.before.monthlyBillLakhs.toFixed(2)} Lakhs
              </div>
              <p className="text-xs text-slate-600 font-sans">{plant.before.discom}</p>
            </div>

            {/* Surcharge Burden Breakdown */}
            <div className="space-y-2.5 pt-2 border-t border-rose-200/60 text-xs font-mono">
              <div className="flex justify-between text-slate-700">
                <span>Cross-Subsidy Surcharge (CSS):</span>
                <span className="font-bold text-rose-800">+₹{plant.before.cssCharge.toFixed(2)} / kWh</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Additional Surcharge (AS):</span>
                <span className="font-bold text-rose-800">+₹{plant.before.asCharge.toFixed(2)} / kWh</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Demand &amp; Peak Penalties:</span>
                <span className="text-rose-700 font-medium">{plant.before.peakDemandPenalty}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Clean RE Share:</span>
                <span className="font-bold text-slate-600">{plant.before.cleanEnergyPercent}% (Coal Dominated)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/80 border border-rose-200 text-xs text-rose-900 font-sans">
              ⚠️ High exposure to unpredictable fuel surcharge adjustments (FSA) and annual SERC retail tariff escalations.
            </div>
          </div>
        </div>

        {/* Right Side: AFTER (Topnotch Group Captive + IEX Optimized Bill) */}
        <div
          className="absolute inset-y-0 right-0 bg-gradient-to-bl from-emerald-50/70 to-slate-100 overflow-hidden"
          style={{ width: `${100 - sliderPos}%` }}
        >
          <div className="p-6 sm:p-8 min-w-[320px] sm:min-w-[420px] space-y-6 ml-auto">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-mono font-bold uppercase">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>AFTER: Topnotch Group Captive + IEX</span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-emerald-900 font-mono">
                ₹{plant.after.effectiveRate.toFixed(2)}
                <span className="text-sm font-sans text-slate-500 font-normal"> / kWh Landed</span>
              </div>
              <div className="text-sm font-mono text-emerald-700 font-bold">
                Monthly Bill: ₹{plant.after.monthlyBillLakhs.toFixed(2)} Lakhs
              </div>
              <p className="text-xs text-emerald-800 font-sans font-medium">{plant.after.structure}</p>
            </div>

            {/* Surcharge Waiver Breakdown */}
            <div className="space-y-2.5 pt-2 border-t border-emerald-200/60 text-xs font-mono">
              <div className="flex justify-between text-slate-700">
                <span>Section 42 Statutory CSS Waiver:</span>
                <span className="font-bold text-emerald-700">₹0.00 / kWh (100% Waived)</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Additional Surcharge Waiver:</span>
                <span className="font-bold text-emerald-700">₹0.00 / kWh (100% Waived)</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Monthly Net Savings:</span>
                <span className="font-black text-emerald-700">₹{plant.after.monthlySavingsLakhs.toFixed(2)} Lakhs</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Clean Energy Decarbonization:</span>
                <span className="font-bold text-emerald-700">{plant.after.cleanEnergyPercent}% (ESG Compliant)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/80 border border-emerald-200 text-xs text-emerald-900 font-sans font-medium flex items-center justify-between">
              <span>Verified Annual Recurring Savings:</span>
              <span className="text-emerald-700 font-black text-sm font-mono">₹{plant.after.annualSavingsCrores.toFixed(2)} Cr / yr</span>
            </div>
          </div>
        </div>

        {/* Central Draggable Divider Bar */}
        <div
          className="absolute inset-y-0 w-1 bg-[#1C2C34] shadow-2xl cursor-ew-resize z-20 flex items-center justify-center -translate-x-1/2"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-10 h-10 rounded-full bg-[#1C2C34] border-2 border-white text-white flex items-center justify-center shadow-2xl">
            <div className="flex items-center -space-x-1">
              <ChevronLeft className="w-4 h-4 text-[#F8BC26]" />
              <ChevronRight className="w-4 h-4 text-[#10B981]" />
            </div>
          </div>
        </div>

        {/* Range Slider Invisible Overlay for Touch / Mouse Dragging */}
        <input
          type="range"
          min="10"
          max="90"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-ew-resize z-30 w-full h-full"
          aria-label="Drag before and after bill comparison slider"
        />
      </div>

      {/* Footer Banner: Net Rupee Impact Summary & Action CTA */}
      <div className="p-6 sm:p-8 bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-800">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <TrendingDown className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-[#F8BC26] font-mono">
              {plant.after.percentSaved}% Direct Bill Reduction
            </div>
            <p className="text-xs text-slate-300 font-sans">
              Delivering ₹{plant.after.annualSavingsCrores.toFixed(2)} Crores recurring annual EBITDA improvement for this facility.
            </p>
          </div>
        </div>

        <Link
          href="/tools/open-access-calculator"
          className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#F8BC26] hover:bg-[#eab308] text-[#1C2C34] font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg active:scale-95 flex-shrink-0"
        >
          <span>Model Your Factory Bill</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
