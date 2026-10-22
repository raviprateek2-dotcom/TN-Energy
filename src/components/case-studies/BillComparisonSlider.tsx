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
  Award,
  ChevronDown,
  FileSpreadsheet,
  Leaf,
  Scale,
} from "lucide-react";
import Link from "next/link";
import { EsgAuditCertificateModal, type EsgCertificateData } from "./EsgAuditCertificateModal";

export interface PlantArchetype {
  id: string;
  name: string;
  clientBrand: string;
  industry: string;
  state: string;
  connectedLoad: string;
  monthlyConsumption: string;
  annualConsumptionMus: number;
  annualCo2AbatedTons: number;
  certNumber: string;
  before: {
    discom: string;
    effectiveRate: number;
    monthlyBillLakhs: number;
    baseEnergyCharge: number;
    cssCharge: number;
    asCharge: number;
    wheelingCharge: number;
    taxesDuty: number;
    peakDemandPenalty: string;
    cleanEnergyPercent: number;
  };
  after: {
    structure: string;
    effectiveRate: number;
    monthlyBillLakhs: number;
    baseEnergyCharge: number;
    cssCharge: number;
    asCharge: number;
    wheelingCharge: number;
    taxesDuty: number;
    monthlySavingsLakhs: number;
    percentSaved: number;
    annualSavingsCrores: number;
    cleanEnergyPercent: number;
  };
}

const ARCHETYPES: PlantArchetype[] = [
  {
    id: "fmcg-varun",
    name: "Varun Beverages Ltd (Unit II)",
    clientBrand: "Varun Beverages",
    industry: "FMCG / Beverage Bottling",
    state: "Uttar Pradesh (PVVNL 33 kV)",
    connectedLoad: "5,000 kVA at 33 kV",
    monthlyConsumption: "18,50,000 kWh",
    annualConsumptionMus: 22.2,
    annualCo2AbatedTons: 14200,
    certNumber: "TES-ESG-2026-VBL02",
    before: {
      discom: "PVVNL 33 kV Industrial Tariff (HT-2)",
      effectiveRate: 8.45,
      monthlyBillLakhs: 156.32,
      baseEnergyCharge: 6.90,
      cssCharge: 1.95,
      asCharge: 0.78,
      wheelingCharge: 0.42,
      taxesDuty: 0.40,
      peakDemandPenalty: "₹450/kVA over-drawl penalty",
      cleanEnergyPercent: 8,
    },
    after: {
      structure: "Group Captive Solar SPV + GDAM Green Exchange",
      effectiveRate: 5.18,
      monthlyBillLakhs: 95.83,
      baseEnergyCharge: 3.85,
      cssCharge: 0.0,
      asCharge: 0.0,
      wheelingCharge: 0.28,
      taxesDuty: 0.15,
      monthlySavingsLakhs: 60.49,
      percentSaved: 38.7,
      annualSavingsCrores: 7.26,
      cleanEnergyPercent: 84,
    },
  },
  {
    id: "plywood-century",
    name: "Century Plyboards (I) Ltd",
    clientBrand: "Century Ply",
    industry: "Plywood, Panels & MDF",
    state: "West Bengal (WBSEDCL 33 kV)",
    connectedLoad: "7,500 kVA at 33 kV",
    monthlyConsumption: "26,00,000 kWh",
    annualConsumptionMus: 31.2,
    annualCo2AbatedTons: 19800,
    certNumber: "TES-ESG-2026-CPIL01",
    before: {
      discom: "WBSEDCL Class-E Industrial Rate",
      effectiveRate: 8.90,
      monthlyBillLakhs: 231.4,
      baseEnergyCharge: 7.25,
      cssCharge: 2.10,
      asCharge: 0.85,
      wheelingCharge: 0.48,
      taxesDuty: 0.45,
      peakDemandPenalty: "High evening peak multiplier (+20%)",
      cleanEnergyPercent: 5,
    },
    after: {
      structure: "ISTS Inter-State Captive PPA + RTM Dynamic Balancing",
      effectiveRate: 5.62,
      monthlyBillLakhs: 146.12,
      baseEnergyCharge: 4.15,
      cssCharge: 0.0,
      asCharge: 0.0,
      wheelingCharge: 0.32,
      taxesDuty: 0.18,
      monthlySavingsLakhs: 85.28,
      percentSaved: 36.9,
      annualSavingsCrores: 10.23,
      cleanEnergyPercent: 82,
    },
  },
  {
    id: "chemical-shriram",
    name: "DCM Shriram Industries Ltd",
    clientBrand: "DCM Shriram",
    industry: "Chemicals, Sugar & Alcohol",
    state: "Uttar Pradesh (PVVNL 33 kV)",
    connectedLoad: "12,000 kVA at 33 kV",
    monthlyConsumption: "45,00,000 kWh",
    annualConsumptionMus: 54.0,
    annualCo2AbatedTons: 34500,
    certNumber: "TES-ESG-2026-DCM01",
    before: {
      discom: "PVVNL Heavy Industrial HT-2 Grid Supply",
      effectiveRate: 8.25,
      monthlyBillLakhs: 371.25,
      baseEnergyCharge: 6.80,
      cssCharge: 1.95,
      asCharge: 0.78,
      wheelingCharge: 0.42,
      taxesDuty: 0.38,
      peakDemandPenalty: "Strict contract demand penalty triggers",
      cleanEnergyPercent: 9,
    },
    after: {
      structure: "Wind-Solar Hybrid Group Captive (35 MW Asset)",
      effectiveRate: 5.12,
      monthlyBillLakhs: 230.4,
      baseEnergyCharge: 3.78,
      cssCharge: 0.0,
      asCharge: 0.0,
      wheelingCharge: 0.28,
      taxesDuty: 0.14,
      monthlySavingsLakhs: 140.85,
      percentSaved: 37.9,
      annualSavingsCrores: 16.9,
      cleanEnergyPercent: 88,
    },
  },
  {
    id: "steel-jindal",
    name: "Jindal Steel & Alloys Rolling Mill",
    clientBrand: "Jindal Steel",
    industry: "Heavy Metallurgy & Rolling",
    state: "Gujarat (UGVCL / GETCO 66 kV)",
    connectedLoad: "16,000 kVA at 66 kV",
    monthlyConsumption: "62,00,000 kWh",
    annualConsumptionMus: 74.4,
    annualCo2AbatedTons: 47800,
    certNumber: "TES-ESG-2026-JSL01",
    before: {
      discom: "UGVCL HTP-1 High Tension 66 kV",
      effectiveRate: 8.65,
      monthlyBillLakhs: 536.3,
      baseEnergyCharge: 7.10,
      cssCharge: 1.68,
      asCharge: 0.72,
      wheelingCharge: 0.36,
      taxesDuty: 0.42,
      peakDemandPenalty: "TOD peak furnace surcharge",
      cleanEnergyPercent: 6,
    },
    after: {
      structure: "24/7 IEX 96-Block Algo Trading + Wind-Solar Captive",
      effectiveRate: 5.4,
      monthlyBillLakhs: 334.8,
      baseEnergyCharge: 3.98,
      cssCharge: 0.0,
      asCharge: 0.0,
      wheelingCharge: 0.22,
      taxesDuty: 0.16,
      monthlySavingsLakhs: 201.5,
      percentSaved: 37.6,
      annualSavingsCrores: 24.18,
      cleanEnergyPercent: 86,
    },
  },
  {
    id: "textile-gujarat",
    name: "Consolidated Gujarat Synthetic Textiles",
    clientBrand: "Gujarat Textiles",
    industry: "Textiles, Weaving & Dyeing",
    state: "Gujarat (DGVCL 66 kV)",
    connectedLoad: "9,500 kVA at 66 kV",
    monthlyConsumption: "38,00,000 kWh",
    annualConsumptionMus: 45.6,
    annualCo2AbatedTons: 29100,
    certNumber: "TES-ESG-2026-GTX01",
    before: {
      discom: "DGVCL HTP-1 Industrial Category",
      effectiveRate: 7.85,
      monthlyBillLakhs: 298.3,
      baseEnergyCharge: 6.55,
      cssCharge: 1.68,
      asCharge: 0.4,
      wheelingCharge: 0.32,
      taxesDuty: 0.35,
      peakDemandPenalty: "High continuous water jet load exposure",
      cleanEnergyPercent: 7,
    },
    after: {
      structure: "Wind-Solar Hybrid (Kutch) + 15-Min Energy Banking",
      effectiveRate: 4.85,
      monthlyBillLakhs: 184.3,
      baseEnergyCharge: 3.65,
      cssCharge: 0.0,
      asCharge: 0.0,
      wheelingCharge: 0.22,
      taxesDuty: 0.14,
      monthlySavingsLakhs: 114.0,
      percentSaved: 38.2,
      annualSavingsCrores: 13.68,
      cleanEnergyPercent: 90,
    },
  },
];

export function BillComparisonSlider() {
  const [selectedId, setSelectedId] = useState(ARCHETYPES[0].id);
  const [sliderPos, setSliderPos] = useState(50); // 0 to 100 percent
  const [showForensicTable, setShowForensicTable] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);

  const plant = ARCHETYPES.find((p) => p.id === selectedId) || ARCHETYPES[0];

  const certData: EsgCertificateData = {
    id: plant.id,
    name: plant.name,
    industry: plant.industry,
    state: plant.state,
    connectedLoad: plant.connectedLoad,
    annualConsumptionMus: plant.annualConsumptionMus,
    cleanEnergyPercent: plant.after.cleanEnergyPercent,
    annualCo2AbatedTons: plant.annualCo2AbatedTons,
    annualSavingsCrores: plant.after.annualSavingsCrores,
    auditPeriod: "FY 2025–26 (BEE Grade-A Certified)",
    meteringStandard: "CEA Class 0.2s Dual SEM AMR Telemetry",
    certNumber: plant.certNumber,
  };

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

          {/* Marquee Archetype Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {ARCHETYPES.map((arch) => (
              <button
                key={arch.id}
                type="button"
                onClick={() => setSelectedId(arch.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-200 font-bold whitespace-nowrap ${
                  selectedId === arch.id
                    ? "bg-[#F8BC26] text-[#1C2C34] shadow-md scale-105"
                    : "bg-white/10 hover:bg-white/20 text-slate-300"
                }`}
              >
                {arch.clientBrand}
              </button>
            ))}
          </div>
        </div>

        {/* Plant Metadata Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Facility &amp; Enterprise</span>
            <span className="text-white font-bold">{plant.name}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">State &amp; Discom Grid</span>
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

      {/* Forensic Tariff Reconciliation Toggle Bar */}
      <div className="bg-slate-100 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs font-mono">
        <button
          type="button"
          onClick={() => setShowForensicTable(!showForensicTable)}
          className="flex items-center space-x-2 text-slate-700 hover:text-[#1C2C34] font-bold transition-colors"
        >
          <FileSpreadsheet className="w-4 h-4 text-[#D97706]" />
          <span>{showForensicTable ? "Hide Forensic Tariff Audit Table" : "View Itemized Surcharge & Tariff Reconciliation Table"}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showForensicTable ? "rotate-180" : ""}`} />
        </button>

        <button
          type="button"
          onClick={() => setCertModalOpen(true)}
          className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold transition-all"
        >
          <Award className="w-3.5 h-3.5 text-emerald-600" />
          <span>View ESG Audit Certificate</span>
        </button>
      </div>

      {/* Expandable Forensic Line-Item Table */}
      {showForensicTable && (
        <div className="p-6 bg-slate-50 border-t border-slate-200 overflow-x-auto animate-in slide-in-from-top-2 duration-150">
          <table className="w-full text-left text-xs font-mono border border-slate-200 rounded-xl overflow-hidden bg-white">
            <thead className="bg-[#0B132B] text-white">
              <tr>
                <th className="p-3">Cost Head / Tariff Line-Item</th>
                <th className="p-3 text-rose-300">DISCOM Utility Baseline</th>
                <th className="p-3 text-emerald-300">Topnotch Open Access</th>
                <th className="p-3 text-[#F8BC26]">Net Unit Delta (₹/kWh)</th>
                <th className="p-3">Statutory Regulatory Basis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3 font-semibold">Energy Charge (Base / ToD blended)</td>
                <td className="p-3 text-rose-700 font-bold">₹{plant.before.baseEnergyCharge.toFixed(2)}</td>
                <td className="p-3 text-emerald-700 font-bold">₹{plant.after.baseEnergyCharge.toFixed(2)}</td>
                <td className="p-3 text-emerald-700 font-bold">-₹{(plant.before.baseEnergyCharge - plant.after.baseEnergyCharge).toFixed(2)}</td>
                <td className="p-3 text-slate-500">Group Captive Generation PPA / IEX DAM</td>
              </tr>
              <tr className="bg-emerald-50/30">
                <td className="p-3 font-semibold">Cross-Subsidy Surcharge (CSS)</td>
                <td className="p-3 text-rose-700 font-bold">₹{plant.before.cssCharge.toFixed(2)}</td>
                <td className="p-3 text-emerald-700 font-black">₹0.00 (100% Waived)</td>
                <td className="p-3 text-emerald-700 font-bold">-₹{plant.before.cssCharge.toFixed(2)}</td>
                <td className="p-3 text-emerald-800 font-bold">Section 42(2) Electricity Act 2003 Exemption</td>
              </tr>
              <tr className="bg-emerald-50/30">
                <td className="p-3 font-semibold">Additional Surcharge (AS)</td>
                <td className="p-3 text-rose-700 font-bold">₹{plant.before.asCharge.toFixed(2)}</td>
                <td className="p-3 text-emerald-700 font-black">₹0.00 (100% Waived)</td>
                <td className="p-3 text-emerald-700 font-bold">-₹{plant.before.asCharge.toFixed(2)}</td>
                <td className="p-3 text-emerald-800 font-bold">CGP Captive Rule 3 Statutory Immunity</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Wheeling Charge &amp; Transmission Loss</td>
                <td className="p-3">₹{plant.before.wheelingCharge.toFixed(2)}</td>
                <td className="p-3">₹{plant.after.wheelingCharge.toFixed(2)}</td>
                <td className="p-3 text-emerald-700 font-bold">-₹{(plant.before.wheelingCharge - plant.after.wheelingCharge).toFixed(2)}</td>
                <td className="p-3 text-slate-500">SERC STU Transmission Tariff Schedule</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">State Electricity Duty &amp; Cess</td>
                <td className="p-3">₹{plant.before.taxesDuty.toFixed(2)}</td>
                <td className="p-3">₹{plant.after.taxesDuty.toFixed(2)}</td>
                <td className="p-3 text-emerald-700 font-bold">-₹{(plant.before.taxesDuty - plant.after.taxesDuty).toFixed(2)}</td>
                <td className="p-3 text-slate-500">Industrial Green Power Incentive Rules</td>
              </tr>
              <tr className="bg-slate-900 text-white font-bold text-sm">
                <td className="p-3">Effective Landed Power Rate</td>
                <td className="p-3 text-rose-400 font-mono">₹{plant.before.effectiveRate.toFixed(2)} / kWh</td>
                <td className="p-3 text-emerald-400 font-mono">₹{plant.after.effectiveRate.toFixed(2)} / kWh</td>
                <td className="p-3 text-[#F8BC26] font-mono">-₹{(plant.before.effectiveRate - plant.after.effectiveRate).toFixed(2)} / kWh</td>
                <td className="p-3 text-emerald-300 font-mono">{plant.after.percentSaved}% Net Savings</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

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
              Delivering ₹{plant.after.annualSavingsCrores.toFixed(2)} Crores recurring annual EBITDA improvement for {plant.name}.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setCertModalOpen(true)}
            className="w-full sm:w-auto px-5 py-3.5 rounded-full border border-emerald-400/40 hover:border-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all active:scale-95"
          >
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Scope-2 ESG Certificate</span>
          </button>

          <Link
            href="/tools/open-access-calculator"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#F8BC26] hover:bg-[#eab308] text-[#1C2C34] font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg active:scale-95 flex-shrink-0"
          >
            <span>Model Your Factory Bill</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ESG Audit Certificate Dialog Modal */}
      <EsgAuditCertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        data={certData}
      />
    </div>
  );
}
