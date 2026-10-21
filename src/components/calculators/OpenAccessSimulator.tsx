"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Sun,
  Zap,
  Building2,
  BatteryCharging,
  ArrowRight,
  CheckCircle,
  Shield,
  Download,
  FileText,
  Calculator,
  TrendingDown,
  Leaf,
  Info,
  Printer,
  X,
  Phone,
  MessageSquare,
  AlertTriangle,
  Layers,
  ChevronLeft,
  ChevronDown,
  Sparkles,
  TreeDeciduous,
  DollarSign,
  TrendingUp,
  Percent,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  INDIAN_STATES_OA_DATA,
  POPULAR_STATES,
  type StateOpenAccessProfile,
} from "@/lib/constants/indian-states-oa-data";
import { BRAND } from "@/lib/constants/brand";

/* -------------------------------------------------------------------------- */
/* Types & Enums                                                              */
/* -------------------------------------------------------------------------- */

export type SolarFinancialModel = "capex" | "opex" | "none";
export type OffsiteModel = "group-captive" | "iex-exchange" | "third-party" | "none";
export type VoltageLevel = "11kV" | "33kV" | "66kV" | "132kV+";

export interface SimulatorInputs {
  // Step 1: Plant Grid Profile
  stateId: string;
  discomName: string;
  voltageLevel: VoltageLevel;
  contractDemandKva: number;
  monthlyConsumptionLakhUnits: number; // in Lakh kWh (e.g. 5.0 = 500,000 kWh)
  discomTariffPerKwh: number;

  // Step 2: Onsite Solar & Financing
  roofAreaSqFt: number;
  roofAreaUnit: "sqft" | "sqm";
  manualSolarKwpOverride?: number;
  solarFinancialModel: SolarFinancialModel;

  // Step 3: Offsite Open Access & BESS
  offsiteStrategy: OffsiteModel;
  offsiteSharePercent: number; // % of remaining load met by offsite
  includeBess: boolean;
  bessCapacityMwh: number;
}

export interface ProposalLeadData {
  companyName: string;
  locationPin: string;
  gstin?: string;
  contactName: string;
  designation: string;
  phone: string;
  email: string;
}

/* -------------------------------------------------------------------------- */
/* Solar Irradiance & Yield Benchmarks per State                              */
/* -------------------------------------------------------------------------- */

const STATE_SOLAR_YIELDS: Record<string, { cuf: number; kwhPerKwpYear: number; irradiance: number }> = {
  rajasthan: { cuf: 0.198, kwhPerKwpYear: 1560, irradiance: 5.8 },
  gujarat: { cuf: 0.192, kwhPerKwpYear: 1520, irradiance: 5.6 },
  "madhya-pradesh": { cuf: 0.188, kwhPerKwpYear: 1490, irradiance: 5.5 },
  "tamil-nadu": { cuf: 0.188, kwhPerKwpYear: 1480, irradiance: 5.4 },
  karnataka: { cuf: 0.186, kwhPerKwpYear: 1470, irradiance: 5.4 },
  maharashtra: { cuf: 0.182, kwhPerKwpYear: 1440, irradiance: 5.2 },
  haryana: { cuf: 0.180, kwhPerKwpYear: 1430, irradiance: 5.1 },
  punjab: { cuf: 0.178, kwhPerKwpYear: 1420, irradiance: 5.0 },
  "uttar-pradesh": { cuf: 0.178, kwhPerKwpYear: 1420, irradiance: 5.0 },
};

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function OpenAccessSimulator() {
  // Active Step for Mobile Stepper
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);

  // Proposal Modals
  const [showTermSheetModal, setShowTermSheetModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  // Form State
  const [inputs, setInputs] = useState<SimulatorInputs>({
    stateId: "uttar-pradesh",
    discomName: "Paschimanchal Vidyut Vitran Nigam Ltd (PVVNL)",
    voltageLevel: "33kV",
    contractDemandKva: 3500, // 3.5 MVA
    monthlyConsumptionLakhUnits: 8.5, // 850,000 kWh/mo
    discomTariffPerKwh: 7.90,
    roofAreaSqFt: 65000,
    roofAreaUnit: "sqft",
    solarFinancialModel: "capex",
    offsiteStrategy: "group-captive",
    offsiteSharePercent: 65,
    includeBess: true,
    bessCapacityMwh: 2.0,
  });

  // Lead capture state for WhatsApp / PDF term sheet
  const [lead, setLead] = useState<ProposalLeadData>({
    companyName: "Varun Beverages / DS Group Unit",
    locationPin: "Greater Noida, UP (201306)",
    gstin: "09AAACD1234F1Z5",
    contactName: "Rajeev Singhal",
    designation: "CFO / Director - Finance",
    phone: "9818012345",
    email: "finance@enterprise.co.in",
  });

  // Track if pre-loaded from an audited electricity bill
  const [importedBillProfile, setImportedBillProfile] = useState<string | null>(null);

  useEffect(() => {
    function handleImport(e: Event) {
      const customEvent = e as CustomEvent;
      if (!customEvent.detail) return;
      const d = customEvent.detail;
      setInputs((prev) => ({
        ...prev,
        stateId: d.stateId || prev.stateId,
        discomName: d.discomName || prev.discomName,
        voltageLevel: d.voltageLevel || prev.voltageLevel,
        contractDemandKva: d.contractDemandKva || prev.contractDemandKva,
        monthlyConsumptionLakhUnits: d.monthlyConsumptionLakhUnits || prev.monthlyConsumptionLakhUnits,
        discomTariffPerKwh: d.discomTariffPerKwh || prev.discomTariffPerKwh,
      }));
      if (d.clientProfile) {
        setImportedBillProfile(d.clientProfile);
        setLead((prev) => ({
          ...prev,
          companyName: d.clientProfile,
        }));
      }
    }

    window.addEventListener("load-bill-audit-to-sim", handleImport);
    return () => window.removeEventListener("load-bill-audit-to-sim", handleImport);
  }, []);

  // Active State Data Profile
  const stateProfile = useMemo<StateOpenAccessProfile>(() => {
    return INDIAN_STATES_OA_DATA[inputs.stateId] || INDIAN_STATES_OA_DATA["uttar-pradesh"];
  }, [inputs.stateId]);

  // Handle State Change
  const handleStateChange = (newStateId: string) => {
    const newProfile = INDIAN_STATES_OA_DATA[newStateId];
    if (!newProfile) return;
    setInputs((prev) => ({
      ...prev,
      stateId: newStateId,
      discomName: newProfile.discomNames[0] || "",
      discomTariffPerKwh: newProfile.industrialGridTariffPerKwh,
    }));
  };

  /* -------------------------------------------------------------------------- */
  /* Calculation Engine                                                         */
  /* -------------------------------------------------------------------------- */

  const calculations = useMemo(() => {
    const annualConsumptionKwh = inputs.monthlyConsumptionLakhUnits * 100000 * 12;
    const monthlyConsumptionKwh = inputs.monthlyConsumptionLakhUnits * 100000;
    const baseDiscomTariff = inputs.discomTariffPerKwh;
    const baseAnnualDiscomCost = annualConsumptionKwh * baseDiscomTariff;

    // 1. Onsite Solar Sizing & Generation
    const rawSqFt =
      inputs.roofAreaUnit === "sqm" ? inputs.roofAreaSqFt * 10.7639 : inputs.roofAreaSqFt;
    const calculatedSolarKwp = Math.round(rawSqFt / 100); // 100 sq ft = 1 kWp rule of thumb
    const effectiveSolarKwp =
      inputs.solarFinancialModel === "none"
        ? 0
        : inputs.manualSolarKwpOverride !== undefined && inputs.manualSolarKwpOverride > 0
        ? inputs.manualSolarKwpOverride
        : calculatedSolarKwp;

    const yieldData = STATE_SOLAR_YIELDS[inputs.stateId] || STATE_SOLAR_YIELDS["uttar-pradesh"];
    const grossSolarAnnualKwh = effectiveSolarKwp * yieldData.kwhPerKwpYear;
    // Cap rooftop solar at 40% of plant demand to account for lunch hours, Sundays, and night base
    const solarAnnualKwh = Math.min(grossSolarAnnualKwh, annualConsumptionKwh * 0.40);
    const solarMonthlyKwh = solarAnnualKwh / 12;

    // Rooftop Solar Financials
    const rooftopCapexPerKwp = 38000; // ₹38,000/kWp for industrial Tier-1 ALMM TOPCon bifacial
    const rooftopTotalCapexInr = effectiveSolarKwp * rooftopCapexPerKwp;
    const corporateTaxRate = 0.2517; // 25.17% with cess
    const acceleratedDeprecTaxShieldInr =
      inputs.solarFinancialModel === "capex"
        ? rooftopTotalCapexInr * 0.40 * corporateTaxRate
        : 0;

    const rooftopLcoePerKwh =
      inputs.solarFinancialModel === "capex"
        ? 1.55 // LCOE over 25 years with O&M
        : inputs.solarFinancialModel === "opex"
        ? 3.75 // OPEX / RESCO zero-capex PPA rate
        : baseDiscomTariff;

    const rooftopAnnualCost = solarAnnualKwh * rooftopLcoePerKwh;
    const rooftopAnnualSavings =
      solarAnnualKwh * (baseDiscomTariff - rooftopLcoePerKwh);

    // 2. Offsite Open Access Modeling
    const remainingAnnualKwh = Math.max(0, annualConsumptionKwh - solarAnnualKwh);
    const offsiteShareRatio =
      inputs.offsiteStrategy === "none" ? 0 : inputs.offsiteSharePercent / 100;
    const offsiteAnnualKwh = remainingAnnualKwh * offsiteShareRatio;
    const offsiteMonthlyKwh = offsiteAnnualKwh / 12;

    // Voltage mapping for wheeling
    const voltageKey =
      inputs.voltageLevel === "132kV+"
        ? "132kV"
        : inputs.voltageLevel === "66kV"
        ? "33kV" // 66kV uses sub-transmission tariff
        : inputs.voltageLevel;

    const wheelingCharge = stateProfile.wheelingChargesPerKwh[voltageKey] || 0.42;
    const stuLossFactor = 1 + stateProfile.stuLossesPercent / 100;
    const sldcAndTxCharge = stateProfile.transmissionChargesPerKwh + 0.04;

    // Cross-Subsidy & Additional Surcharge application
    let cssApplicable = 0;
    let asApplicable = 0;
    let baseGenTariff = 3.85;

    if (inputs.offsiteStrategy === "group-captive") {
      // 100% exempt from CSS and Additional Surcharge under Section 42 of Electricity Act 2003
      cssApplicable = 0;
      asApplicable = 0;
      baseGenTariff = stateProfile.benchmarkSolarPpaRatePerKwh || 3.45;
    } else if (inputs.offsiteStrategy === "iex-exchange") {
      // GDAM purchases have 0 CSS per Green Energy Open Access Rules 2022
      cssApplicable = 0;
      asApplicable = stateProfile.additionalSurchargePerKwh;
      baseGenTariff = 3.65; // Blended GDAM solar slot rate
    } else if (inputs.offsiteStrategy === "third-party") {
      // Full CSS and AS applied
      cssApplicable = stateProfile.crossSubsidySurchargePerKwh;
      asApplicable = stateProfile.additionalSurchargePerKwh;
      baseGenTariff = stateProfile.benchmarkSolarPpaRatePerKwh || 3.45;
    }

    const landedOffsiteTariffPerKwh =
      (baseGenTariff * stuLossFactor) +
      wheelingCharge +
      sldcAndTxCharge +
      cssApplicable +
      asApplicable;

    const offsiteAnnualCost = offsiteAnnualKwh * landedOffsiteTariffPerKwh;
    const offsiteAnnualSavings =
      offsiteAnnualKwh * (baseDiscomTariff - landedOffsiteTariffPerKwh);

    // 3. BESS Peak Shaving Modeling (Slots 73–92: 18:00–22:00 IST)
    const bessAnnualCycles = 320;
    const bessDepthOfDischarge = 0.85;
    const bessEffectiveAnnualKwh = inputs.includeBess
      ? inputs.bessCapacityMwh * 1000 * bessDepthOfDischarge * bessAnnualCycles
      : 0;

    // BESS arbitrage: charges at daytime solar slot (~₹2.85/kWh) and offsets DISCOM peak TOD tariff (+20% = ~₹9.48/kWh)
    const bessChargingCostPerKwh = 2.85;
    const bessOffsetDiscomRatePerKwh = baseDiscomTariff * 1.20; // +20% ToD peak
    const bessNetSpreadPerKwh = bessOffsetDiscomRatePerKwh - bessChargingCostPerKwh;
    const bessAnnualSavingsInr = bessEffectiveAnnualKwh * bessNetSpreadPerKwh;

    // 4. Residual Grid Power on DISCOM
    const remainingGridAnnualKwh = Math.max(
      0,
      annualConsumptionKwh - solarAnnualKwh - offsiteAnnualKwh
    );
    const remainingGridMonthlyKwh = remainingGridAnnualKwh / 12;
    const remainingGridAnnualCost = remainingGridAnnualKwh * baseDiscomTariff;

    // 5. Total Consolidated Economics
    const totalNewAnnualCost =
      rooftopAnnualCost + offsiteAnnualCost + remainingGridAnnualCost - bessAnnualSavingsInr;
    const totalAnnualSavingsInr = Math.max(0, baseAnnualDiscomCost - totalNewAnnualCost);
    const totalMonthlySavingsInr = totalAnnualSavingsInr / 12;

    const blendedLandedTariffPerKwh =
      annualConsumptionKwh > 0 ? totalNewAnnualCost / annualConsumptionKwh : baseDiscomTariff;
    const netPerKwhSavings = Math.max(0, baseDiscomTariff - blendedLandedTariffPerKwh);
    const percentageBillReduction =
      baseDiscomTariff > 0 ? (netPerKwhSavings / baseDiscomTariff) * 100 : 0;

    // 6. Cumulative 25-Year Projection & IRR
    // Assumes 2.5% annual DISCOM tariff inflation and 0.5% annual solar degradation
    let cumulative25YearSavingsInr = 0;
        for (let yr = 1; yr <= 25; yr++) {
      const inflatedSavings =
        totalAnnualSavingsInr * Math.pow(1.025, yr - 1) * Math.pow(0.995, yr - 1);
      cumulative25YearSavingsInr += inflatedSavings;
    }

    // Payback & IRR for Rooftop Capex
    let simplePaybackYears = 0;
    let estimatedProjectIrrPercent = 0;
    if (inputs.solarFinancialModel === "capex" && effectiveSolarKwp > 0) {
      const netEffectiveCapex = Math.max(0, rooftopTotalCapexInr - acceleratedDeprecTaxShieldInr);
      simplePaybackYears = rooftopAnnualSavings > 0 ? netEffectiveCapex / rooftopAnnualSavings : 0;
      // Approximate 25-yr IRR from capital outlay and steady cash flow
      estimatedProjectIrrPercent =
        netEffectiveCapex > 0 ? (rooftopAnnualSavings / netEffectiveCapex) * 100 * 0.95 : 0;
    }

    // 7. ESG & Carbon Footprint
    // Central Electricity Authority (CEA) emission factor: 0.716 kg CO2e / kWh
    const greenEnergyAnnualKwh =
      solarAnnualKwh +
      (inputs.offsiteStrategy === "group-captive" || inputs.offsiteStrategy === "iex-exchange"
        ? offsiteAnnualKwh
        : 0);

    const co2AbatedTonnesAnnual = (greenEnergyAnnualKwh * 0.716) / 1000;
    const equivalentTreesPlanted = Math.round(co2AbatedTonnesAnnual * 45);
    const renewableSharePercent =
      annualConsumptionKwh > 0 ? (greenEnergyAnnualKwh / annualConsumptionKwh) * 100 : 0;

    // 8. Supply Mix Data for Charts
    const supplyMixData = [
      {
        name: "Onsite Rooftop Solar",
        kwh: solarAnnualKwh,
        pct: Number(((solarAnnualKwh / annualConsumptionKwh) * 100).toFixed(1)),
        color: "#F59E0B", // amber
      },
      {
        name:
          inputs.offsiteStrategy === "group-captive"
            ? "Group Captive Solar / Hybrid"
            : inputs.offsiteStrategy === "iex-exchange"
            ? "IEX DAM/GDAM Exchange"
            : "Third-Party Bilateral PPA",
        kwh: offsiteAnnualKwh,
        pct: Number(((offsiteAnnualKwh / annualConsumptionKwh) * 100).toFixed(1)),
        color: "#10B981", // emerald
      },
      {
        name: "Baseline DISCOM Grid",
        kwh: remainingGridAnnualKwh,
        pct: Number(((remainingGridAnnualKwh / annualConsumptionKwh) * 100).toFixed(1)),
        color: "#475569", // slate
      },
    ].filter((item) => item.kwh > 0);

    // 9. Waterfall Chart Breakdown Data
    const waterfallData = [
      { component: "Base DISCOM Grid", rate: baseDiscomTariff, fill: "#EF4444" },
      { component: "Offsite Generation", rate: baseGenTariff, fill: "#10B981" },
      { component: "+ STU Loss Factor", rate: Number((baseGenTariff * (stuLossFactor - 1)).toFixed(2)), fill: "#64748B" },
      { component: "+ Wheeling Charge", rate: wheelingCharge, fill: "#06B6D4" },
      { component: "+ Cross-Subsidy (CSS)", rate: cssApplicable, fill: cssApplicable === 0 ? "#10B981" : "#F59E0B" },
      { component: "+ Addl. Surcharge (AS)", rate: asApplicable, fill: asApplicable === 0 ? "#10B981" : "#A855F7" },
      { component: "Net Blended Landed", rate: Number(blendedLandedTariffPerKwh.toFixed(2)), fill: "#10B981" },
    ];

    return {
      annualConsumptionKwh,
      monthlyConsumptionKwh,
      effectiveSolarKwp,
      solarAnnualKwh,
      solarMonthlyKwh,
      offsiteAnnualKwh,
      offsiteMonthlyKwh,
      remainingGridAnnualKwh,
      remainingGridMonthlyKwh,
      bessEffectiveAnnualKwh,
      bessAnnualSavingsInr,
      baseDiscomTariff,
      blendedLandedTariffPerKwh,
      netPerKwhSavings,
      percentageBillReduction,
      totalMonthlySavingsInr,
      totalAnnualSavingsInr,
      cumulative25YearSavingsInr,
      rooftopTotalCapexInr,
      acceleratedDeprecTaxShieldInr,
      simplePaybackYears,
      estimatedProjectIrrPercent,
      co2AbatedTonnesAnnual,
      equivalentTreesPlanted,
      renewableSharePercent,
      supplyMixData,
      waterfallData,
      landedOffsiteTariffPerKwh,
      rooftopLcoePerKwh,
      cssApplicable,
      asApplicable,
      wheelingCharge,
    };
  }, [inputs, stateProfile]);

  /* -------------------------------------------------------------------------- */
  /* WhatsApp Link Builder                                                      */
  /* -------------------------------------------------------------------------- */

  const whatsappUrl = useMemo(() => {
    const text = `*TOPNOTCH ENERGY SOLUTIONS — PLANT TARIFF OPTIMIZATION PROPOSAL*
--------------------------------------------------
*Plant:* ${lead.companyName}
*Location:* ${lead.locationPin}
*Contact:* ${lead.contactName} (${lead.designation})
*Phone:* +91 ${lead.phone}
--------------------------------------------------
*PLANT LOAD & GRID PROFILE:*
• State & Discom: ${stateProfile.stateName} (${inputs.discomName})
• Sanctioned Demand: ${inputs.contractDemandKva.toLocaleString()} kVA (${inputs.voltageLevel})
• Monthly Consumption: ${inputs.monthlyConsumptionLakhUnits} Lakh kWh (${(inputs.monthlyConsumptionLakhUnits * 0.1).toFixed(2)} MUs)
• Baseline DISCOM Tariff: ₹${inputs.discomTariffPerKwh.toFixed(2)}/kWh
--------------------------------------------------
*PROPOSED HYBRID PROCUREMENT MIX:*
• Onsite Rooftop Solar: ${calculations.effectiveSolarKwp} kWp (${inputs.solarFinancialModel.toUpperCase()})
• Offsite Clean Energy: ${inputs.offsiteStrategy.toUpperCase()} (${inputs.offsiteSharePercent}% allocation)
• Peak Battery BESS: ${inputs.includeBess ? `${inputs.bessCapacityMwh} MWh (Slots 73-92)` : "Not Included"}
• Clean Energy Share: ${calculations.renewableSharePercent.toFixed(1)}% RE100
--------------------------------------------------
*FINANCIAL & CFO IMPACT:*
• New Blended Landed Tariff: ₹${calculations.blendedLandedTariffPerKwh.toFixed(2)}/kWh
• Net Savings per Unit: ₹${calculations.netPerKwhSavings.toFixed(2)}/kWh (-${calculations.percentageBillReduction.toFixed(1)}%)
• Projected Monthly Savings: ₹${(calculations.totalMonthlySavingsInr / 100000).toFixed(2)} Lakhs/month
• Projected Annual Savings: ₹${(calculations.totalAnnualSavingsInr / 10000000).toFixed(2)} Crores/year
• 25-Year Cumulative Savings: ₹${(calculations.cumulative25YearSavingsInr / 10000000).toFixed(2)} Crores
• Scope-2 CO2 Abatement: ${Math.round(calculations.co2AbatedTonnesAnnual).toLocaleString()} tCO2e/year
--------------------------------------------------
Requesting formal technical diligence, SLDC standing clearance filing, and PPA term sheet.`;

    return `https://wa.me/917408318214?text=${encodeURIComponent(text)}`;
  }, [lead, stateProfile, inputs, calculations]);

  return (
    <div id="simulator-engine" className="relative scroll-mt-24">
      {/* ==================================================================== */}
      {/* Desktop Split-Pane & Mobile Step-Wizard Container                    */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ------------------------------------------------------------------ */}
        {/* Left Column: Multi-Step Input Engine (7 Columns on Desktop)         */}
        {/* ------------------------------------------------------------------ */}
        <div className="lg:col-span-7 space-y-6">
          {/* Telemetry Import Notification Banner */}
          {importedBillProfile && (
            <div className="bg-grid-cyan-950/60 border border-grid-cyan-500/40 rounded-2xl p-4 flex items-center justify-between text-xs font-mono text-grid-cyan-300 shadow-lg animate-in fade-in duration-200">
              <div className="flex items-center space-x-2.5">
                <Sparkles className="w-5 h-5 text-grid-cyan-400 animate-pulse flex-shrink-0" />
                <div>
                  <span className="font-bold text-white block">
                    Telemetry Pre-Loaded: {importedBillProfile}
                  </span>
                  <span className="text-[11px] text-grid-cyan-400/80">
                    Contract demand, monthly units, and DISCOM tariff auto-populated from bill audit.
                  </span>
                </div>
              </div>
              <button
                onClick={() => setImportedBillProfile(null)}
                className="text-grid-slate-400 hover:text-white p-1 rounded-lg hover:bg-grid-navy-800 transition-colors"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step Navigation Bar */}
          <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-2 flex items-center justify-between">
            <button
              onClick={() => setActiveStep(1)}
              className={`flex-1 py-3 px-3 rounded-xl flex items-center justify-center space-x-2 text-xs font-mono font-bold transition-all ${
                activeStep === 1
                  ? "bg-grid-emerald-500 text-grid-navy-950 shadow-md"
                  : "text-grid-slate-400 hover:text-white"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>1. Plant Grid</span>
            </button>
            <button
              onClick={() => setActiveStep(2)}
              className={`flex-1 py-3 px-3 rounded-xl flex items-center justify-center space-x-2 text-xs font-mono font-bold transition-all ${
                activeStep === 2
                  ? "bg-grid-amber-500 text-grid-navy-950 shadow-md"
                  : "text-grid-slate-400 hover:text-white"
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>2. Onsite Solar</span>
            </button>
            <button
              onClick={() => setActiveStep(3)}
              className={`flex-1 py-3 px-3 rounded-xl flex items-center justify-center space-x-2 text-xs font-mono font-bold transition-all ${
                activeStep === 3
                  ? "bg-grid-cyan-500 text-grid-navy-950 shadow-md"
                  : "text-grid-slate-400 hover:text-white"
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>3. Offsite &amp; BESS</span>
            </button>
          </div>

          {/* ================================================================ */}
          {/* STEP 1: Plant Grid Profile                                       */}
          {/* ================================================================ */}
          {activeStep === 1 && (
            <div className="bg-grid-navy-900/90 border border-grid-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-grid-slate-800 pb-4">
                <div className="flex items-center space-x-2 text-grid-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <Building2 className="w-4 h-4" />
                  <span>Step 1 of 3 — Electrical Grid &amp; Tariff Profile</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  Factory Location &amp; Connected Utility
                </h3>
                <p className="text-xs text-grid-slate-400 font-mono mt-1">
                  Auto-loads SERC-notified CSS, Additional Surcharge, Wheeling Charges, and STU losses.
                </p>
              </div>

              {/* State & Discom Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-grid-slate-300 uppercase mb-2">
                    Operating State
                  </label>
                  <div className="relative">
                    <select
                      value={inputs.stateId}
                      onChange={(e) => handleStateChange(e.target.value)}
                      className="w-full bg-grid-navy-950 border border-grid-slate-700 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-grid-emerald-500 appearance-none pr-10"
                    >
                      {POPULAR_STATES.map((s) => (
                        <option key={s.stateId} value={s.stateId}>
                          {s.stateName}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-grid-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-grid-slate-300 uppercase mb-2">
                    Connected DISCOM
                  </label>
                  <div className="relative">
                    <select
                      value={inputs.discomName}
                      onChange={(e) => setInputs({ ...inputs, discomName: e.target.value })}
                      className="w-full bg-grid-navy-950 border border-grid-slate-700 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-grid-emerald-500 appearance-none pr-10"
                    >
                      {stateProfile.discomNames.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-grid-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Connected Voltage & Contract Demand */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-grid-slate-300 uppercase mb-2">
                    Connected Grid Voltage
                  </label>
                  <div className="grid grid-cols-4 gap-1.5 bg-grid-navy-950 p-1 rounded-xl border border-grid-slate-700">
                    {(["11kV", "33kV", "66kV", "132kV+"] as const).map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setInputs({ ...inputs, voltageLevel: v })}
                        className={`py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                          inputs.voltageLevel === v
                            ? "bg-grid-emerald-500 text-grid-navy-950 shadow-sm"
                            : "text-grid-slate-400 hover:text-white"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-grid-slate-300 uppercase mb-2 flex items-center justify-between">
                    <span>Sanctioned Demand</span>
                    <span className="text-[11px] text-grid-emerald-400">
                      {(inputs.contractDemandKva / 1000).toFixed(1)} MVA
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={100}
                      max={50000}
                      step={50}
                      value={inputs.contractDemandKva}
                      onChange={(e) =>
                        setInputs({
                          ...inputs,
                          contractDemandKva: Number(e.target.value) || 100,
                        })
                      }
                      className="w-full bg-grid-navy-950 border border-grid-slate-700 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-grid-emerald-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-grid-slate-500">
                      kVA
                    </span>
                  </div>
                </div>
              </div>

              {/* Monthly Consumption & Current DISCOM Tariff */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-grid-slate-300 uppercase mb-2 flex items-center justify-between">
                    <span>Monthly Electricity Drawl</span>
                    <span className="text-[11px] text-grid-cyan-400 font-mono">
                      {(inputs.monthlyConsumptionLakhUnits * 0.1).toFixed(2)} MUs / mo
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step={0.1}
                      min={0.1}
                      value={inputs.monthlyConsumptionLakhUnits}
                      onChange={(e) =>
                        setInputs({
                          ...inputs,
                          monthlyConsumptionLakhUnits: Math.max(0.1, Number(e.target.value)),
                        })
                      }
                      className="w-full bg-grid-navy-950 border border-grid-slate-700 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-grid-emerald-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-grid-slate-500">
                      Lakh Units (kWh)
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-grid-slate-300 uppercase mb-2">
                    Current DISCOM Billed Rate
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step={0.05}
                      min={4}
                      max={18}
                      value={inputs.discomTariffPerKwh}
                      onChange={(e) =>
                        setInputs({
                          ...inputs,
                          discomTariffPerKwh: Number(e.target.value) || 7.0,
                        })
                      }
                      className="w-full bg-grid-navy-950 border border-grid-slate-700 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-grid-emerald-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-grid-slate-500">
                      ₹/kWh
                    </span>
                  </div>
                </div>
              </div>

              {/* State Regulatory Snapshot Pill */}
              <div className="bg-grid-navy-950 border border-grid-slate-800 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div>
                  <span className="text-grid-slate-500 text-[10px] uppercase block">Cross-Subsidy (CSS)</span>
                  <span className="text-grid-amber-400 font-bold tabular-nums">
                    ₹{stateProfile.crossSubsidySurchargePerKwh.toFixed(2)}/kWh
                  </span>
                </div>
                <div>
                  <span className="text-grid-slate-500 text-[10px] uppercase block">Addl. Surcharge (AS)</span>
                  <span className="text-purple-400 font-bold tabular-nums">
                    ₹{stateProfile.additionalSurchargePerKwh.toFixed(2)}/kWh
                  </span>
                </div>
                <div>
                  <span className="text-grid-slate-500 text-[10px] uppercase block">STU Loss Gross-Up</span>
                  <span className="text-grid-slate-300 font-bold tabular-nums">
                    {stateProfile.stuLossesPercent.toFixed(2)}%
                  </span>
                </div>
                <div>
                  <span className="text-grid-slate-500 text-[10px] uppercase block">Captive CSS Waiver</span>
                  <span className="text-grid-emerald-400 font-bold">100% Exempt</span>
                </div>
              </div>

              {/* Next Step Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-6 py-3 rounded-xl bg-grid-emerald-500 hover:bg-grid-emerald-400 text-grid-navy-950 font-bold font-mono text-xs flex items-center space-x-2 transition-all shadow-lg shadow-grid-emerald-500/20"
                >
                  <span>Configure Onsite Solar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* STEP 2: Onsite Solar & Financing                                 */}
          {/* ================================================================ */}
          {activeStep === 2 && (
            <div className="bg-grid-navy-900/90 border border-grid-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-grid-slate-800 pb-4">
                <div className="flex items-center space-x-2 text-grid-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <Sun className="w-4 h-4" />
                  <span>Step 2 of 3 — Onsite Rooftop Solar &amp; Financing Model</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  Rooftop Capacity &amp; Financial Structure
                </h3>
                <p className="text-xs text-grid-slate-400 font-mono mt-1">
                  100 sq. ft. of PEB shed or RCC roof yields ~1 kWp of Tier-1 TOPCon Bifacial Solar.
                </p>
              </div>

              {/* Financial Model Selection */}
              <div>
                <label className="block text-xs font-mono font-bold text-grid-slate-300 uppercase mb-3">
                  Solar Financing Model
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setInputs({ ...inputs, solarFinancialModel: "capex" })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      inputs.solarFinancialModel === "capex"
                        ? "border-grid-amber-500 bg-grid-amber-500/10 ring-1 ring-grid-amber-500"
                        : "border-grid-slate-800 bg-grid-navy-950 hover:border-grid-slate-700"
                    }`}
                  >
                    <div className="font-bold text-sm text-white">CAPEX Model</div>
                    <div className="text-[11px] text-grid-amber-400 font-mono mt-1">
                      Own Asset + 40% Tax Shield
                    </div>
                    <p className="text-[11px] text-grid-slate-400 mt-2 leading-relaxed font-sans">
                      Maximizes 25-yr returns. LCOE of ~₹1.55/kWh. Qualifies for 40% Accelerated Depreciation.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInputs({ ...inputs, solarFinancialModel: "opex" })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      inputs.solarFinancialModel === "opex"
                        ? "border-grid-emerald-500 bg-grid-emerald-500/10 ring-1 ring-grid-emerald-500"
                        : "border-grid-slate-800 bg-grid-navy-950 hover:border-grid-slate-700"
                    }`}
                  >
                    <div className="font-bold text-sm text-white">OPEX / RESCO</div>
                    <div className="text-[11px] text-grid-emerald-400 font-mono mt-1">
                      Zero Upfront Capital
                    </div>
                    <p className="text-[11px] text-grid-slate-400 mt-2 leading-relaxed font-sans">
                      Topnotch builds &amp; operates. Flat PPA tariff at ~₹3.75/kWh with zero Capex.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInputs({ ...inputs, solarFinancialModel: "none" })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      inputs.solarFinancialModel === "none"
                        ? "border-grid-cyan-500 bg-grid-cyan-500/10 ring-1 ring-grid-cyan-500"
                        : "border-grid-slate-800 bg-grid-navy-950 hover:border-grid-slate-700"
                    }`}
                  >
                    <div className="font-bold text-sm text-white">No Roof Space</div>
                    <div className="text-[11px] text-grid-cyan-400 font-mono mt-1">
                      100% Offsite Procurement
                    </div>
                    <p className="text-[11px] text-grid-slate-400 mt-2 leading-relaxed font-sans">
                      Substitute onsite solar with 100% offsite Group Captive or IEX Exchange trading.
                    </p>
                  </button>
                </div>
              </div>

              {/* Roof Area Inputs (Only visible if not "none") */}
              {inputs.solarFinancialModel !== "none" && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-mono font-bold text-grid-slate-300 uppercase">
                          Available Roof Area
                        </label>
                        <div className="flex items-center space-x-1 text-[11px] font-mono">
                          <button
                            type="button"
                            onClick={() => setInputs({ ...inputs, roofAreaUnit: "sqft" })}
                            className={`px-2 py-0.5 rounded ${
                              inputs.roofAreaUnit === "sqft"
                                ? "bg-grid-amber-500 text-grid-navy-950 font-bold"
                                : "text-grid-slate-400"
                            }`}
                          >
                            Sq. Ft.
                          </button>
                          <button
                            type="button"
                            onClick={() => setInputs({ ...inputs, roofAreaUnit: "sqm" })}
                            className={`px-2 py-0.5 rounded ${
                              inputs.roofAreaUnit === "sqm"
                                ? "bg-grid-amber-500 text-grid-navy-950 font-bold"
                                : "text-grid-slate-400"
                            }`}
                          >
                            Sq. Mtr.
                          </button>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          step={1000}
                          min={1000}
                          value={inputs.roofAreaSqFt}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              roofAreaSqFt: Number(e.target.value) || 0,
                              manualSolarKwpOverride: undefined,
                            })
                          }
                          className="w-full bg-grid-navy-950 border border-grid-slate-700 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-grid-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-grid-slate-300 uppercase mb-2 flex items-center justify-between">
                        <span>Installable Solar Capacity</span>
                        <span className="text-[11px] text-grid-amber-400 font-mono">
                          {(calculations.effectiveSolarKwp / 1000).toFixed(2)} MWp
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={calculations.effectiveSolarKwp}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              manualSolarKwpOverride: Number(e.target.value) || 0,
                            })
                          }
                          className="w-full bg-grid-navy-950 border border-grid-slate-700 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-grid-amber-500"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-grid-slate-500">
                          kWp
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CAPEX Benefit Callout Card */}
                  {inputs.solarFinancialModel === "capex" && (
                    <div className="bg-grid-amber-500/10 border border-grid-amber-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center space-x-2 text-xs font-bold text-grid-amber-400 font-mono">
                          <DollarSign className="w-4 h-4" />
                          <span>40% Accelerated Depreciation (Sec 32 IT Act)</span>
                        </div>
                        <p className="text-xs text-grid-slate-300 mt-1">
                          Estimated Year-1 Corporate Tax Shield:{" "}
                          <strong className="text-white font-mono tabular-nums">
                            ₹{(calculations.acceleratedDeprecTaxShieldInr / 100000).toFixed(2)} Lakhs
                          </strong>
                        </p>
                      </div>
                      <div className="text-right sm:border-l sm:border-grid-amber-500/30 sm:pl-4">
                        <span className="text-[10px] text-grid-slate-400 uppercase font-mono block">Estimated Payback</span>
                        <span className="text-lg font-extrabold text-white font-mono tabular-nums">
                          {calculations.simplePaybackYears.toFixed(1)} Years
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="pt-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="px-5 py-2.5 rounded-xl border border-grid-slate-700 bg-grid-navy-950 text-grid-slate-300 font-mono text-xs hover:text-white"
                >
                  ← Back to Grid
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className="px-6 py-3 rounded-xl bg-grid-cyan-500 hover:bg-grid-cyan-400 text-grid-navy-950 font-bold font-mono text-xs flex items-center space-x-2 transition-all shadow-lg shadow-grid-cyan-500/20"
                >
                  <span>Configure Offsite &amp; BESS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* STEP 3: Offsite Open Access & BESS Strategy                      */}
          {/* ================================================================ */}
          {activeStep === 3 && (
            <div className="bg-grid-navy-900/90 border border-grid-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-grid-slate-800 pb-4">
                <div className="flex items-center space-x-2 text-grid-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <Zap className="w-4 h-4" />
                  <span>Step 3 of 3 — Offsite Power Trading &amp; Energy Storage</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  Open Access Procurement &amp; Peak BESS
                </h3>
                <p className="text-xs text-grid-slate-400 font-mono mt-1">
                  Group Captive SPVs eliminate Cross-Subsidy Surcharge (CSS) and Additional Surcharge (AS).
                </p>
              </div>

              {/* Offsite Strategy Selector */}
              <div>
                <label className="block text-xs font-mono font-bold text-grid-slate-300 uppercase mb-3">
                  Offsite Procurement Route
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setInputs({ ...inputs, offsiteStrategy: "group-captive" })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      inputs.offsiteStrategy === "group-captive"
                        ? "border-grid-emerald-500 bg-grid-emerald-500/10 ring-1 ring-grid-emerald-500"
                        : "border-grid-slate-800 bg-grid-navy-950 hover:border-grid-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white">Group Captive</span>
                      <span className="text-[9px] bg-grid-emerald-500 text-grid-navy-950 font-bold px-1.5 py-0.5 rounded">
                        RECOMMENDED
                      </span>
                    </div>
                    <div className="text-[11px] text-grid-emerald-400 font-mono mt-1">
                      0 CSS &amp; 0 Additional Surcharge
                    </div>
                    <p className="text-[11px] text-grid-slate-400 mt-2 font-sans leading-relaxed">
                      26% SPV equity structure under Rule 3. Delivers ~₹4.20–₹4.60/kWh landed power.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInputs({ ...inputs, offsiteStrategy: "iex-exchange" })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      inputs.offsiteStrategy === "iex-exchange"
                        ? "border-grid-cyan-500 bg-grid-cyan-500/10 ring-1 ring-grid-cyan-500"
                        : "border-grid-slate-800 bg-grid-navy-950 hover:border-grid-slate-700"
                    }`}
                  >
                    <div className="font-bold text-sm text-white">IEX GDAM / DAM</div>
                    <div className="text-[11px] text-grid-cyan-400 font-mono mt-1">
                      96-Block Dynamic Clearing
                    </div>
                    <p className="text-[11px] text-grid-slate-400 mt-2 font-sans leading-relaxed">
                      Short-term exchange purchase with green attribute. 0 CSS under MoP 2022 Rules.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInputs({ ...inputs, offsiteStrategy: "third-party" })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      inputs.offsiteStrategy === "third-party"
                        ? "border-purple-500 bg-purple-500/10 ring-1 ring-purple-500"
                        : "border-grid-slate-800 bg-grid-navy-950 hover:border-grid-slate-700"
                    }`}
                  >
                    <div className="font-bold text-sm text-white">Third-Party PPA</div>
                    <div className="text-[11px] text-purple-400 font-mono mt-1">
                      Full Surcharges Apply
                    </div>
                    <p className="text-[11px] text-grid-slate-400 mt-2 font-sans leading-relaxed">
                      Standard IPP bilateral contract. Absorbs both CSS (₹{stateProfile.crossSubsidySurchargePerKwh}) and AS.
                    </p>
                  </button>
                </div>
              </div>

              {/* Offsite Share Slider */}
              {inputs.offsiteStrategy !== "none" && (
                <div className="bg-grid-navy-950 border border-grid-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-grid-slate-300">
                      Offsite Replacement Share (of Remaining Load)
                    </span>
                    <span className="text-grid-cyan-400 font-bold text-sm">
                      {inputs.offsiteSharePercent}% ({((calculations.offsiteAnnualKwh / 1200000)).toFixed(2)} MUs/mo)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={95}
                    step={5}
                    value={inputs.offsiteSharePercent}
                    onChange={(e) =>
                      setInputs({ ...inputs, offsiteSharePercent: Number(e.target.value) })
                    }
                    className="w-full accent-grid-cyan-400 cursor-pointer h-2 bg-grid-navy-900 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-grid-slate-500">
                    <span>10% (Peak Shaving)</span>
                    <span>50% (Balanced Portfolio)</span>
                    <span>95% (Maximum Decarbonization)</span>
                  </div>
                </div>
              )}

              {/* BESS Evening Peak Shaving Toggle */}
              <div className="border border-grid-slate-800 bg-grid-navy-950/80 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                      <BatteryCharging className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center space-x-2">
                        <span>BESS Peak Shaving Battery Storage</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                          Slots 73–92
                        </span>
                      </div>
                      <p className="text-xs text-grid-slate-400 font-mono mt-0.5">
                        Discharges during 18:00–22:00 IST peak ToD tariff surcharge slots.
                      </p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inputs.includeBess}
                      onChange={(e) => setInputs({ ...inputs, includeBess: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-grid-navy-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                  </label>
                </div>

                {inputs.includeBess && (
                  <div className="pt-2 border-t border-grid-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-mono text-grid-slate-400">
                      Storage Capacity:
                    </span>
                    <div className="flex items-center space-x-2">
                      {[1.0, 2.0, 4.0, 8.0].map((cap) => (
                        <button
                          key={cap}
                          type="button"
                          onClick={() => setInputs({ ...inputs, bessCapacityMwh: cap })}
                          className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                            inputs.bessCapacityMwh === cap
                              ? "bg-purple-500 text-white shadow-sm"
                              : "bg-grid-navy-900 border border-grid-slate-700 text-grid-slate-400 hover:text-white"
                          }`}
                        >
                          {cap} MWh
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="pt-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-5 py-2.5 rounded-xl border border-grid-slate-700 bg-grid-navy-950 text-grid-slate-300 font-mono text-xs hover:text-white"
                >
                  ← Back to Solar
                </button>
                <button
                  type="button"
                  onClick={() => setShowTermSheetModal(true)}
                  className="px-6 py-3 rounded-xl bg-grid-emerald-500 hover:bg-grid-emerald-400 text-grid-navy-950 font-bold font-mono text-xs flex items-center space-x-2 transition-all shadow-lg shadow-grid-emerald-500/20"
                >
                  <FileText className="w-4 h-4" />
                  <span>Review Bankable Feasibility</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Right Column: Live Financial, Landed-Cost & ESG Dashboard (5 Cols)  */}
        {/* ------------------------------------------------------------------ */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Net Landed Cost & Savings Hero Card */}
          <div className="bg-gradient-to-br from-grid-navy-900 via-grid-navy-950 to-grid-navy-900 border border-grid-emerald-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-grid-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between pb-3 border-b border-grid-slate-800">
              <span className="text-[11px] font-mono uppercase tracking-widest text-grid-emerald-400 font-bold flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Consolidated Plant Economics</span>
              </span>
              <span className="text-[10px] font-mono text-grid-slate-400">
                {stateProfile.stateName}
              </span>
            </div>

            {/* Landed Tariff vs Grid */}
            <div className="mt-4 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono text-grid-slate-500 block">
                  New Blended Landed Cost
                </span>
                <span className="text-3xl font-extrabold font-mono text-white tracking-tight tabular-nums">
                  ₹{calculations.blendedLandedTariffPerKwh.toFixed(2)}
                  <span className="text-xs text-grid-slate-400 font-normal ml-1">/kWh</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-mono text-grid-slate-500 block">
                  Current Grid Tariff
                </span>
                <span className="text-lg font-mono line-through text-red-400 tabular-nums">
                  ₹{calculations.baseDiscomTariff.toFixed(2)}/kWh
                </span>
              </div>
            </div>

            {/* Savings Callout Badges */}
            <div className="mt-4 grid grid-cols-2 gap-3 pt-3 border-t border-grid-slate-800/80">
              <div className="bg-grid-navy-950/80 border border-grid-slate-800 rounded-xl p-3">
                <span className="text-[10px] font-mono text-grid-slate-500 uppercase block">Annual Net Savings</span>
                <span className="text-xl font-extrabold font-mono text-grid-emerald-400 tabular-nums">
                  ₹{(calculations.totalAnnualSavingsInr / 10000000).toFixed(2)} Cr
                </span>
                <span className="text-[10px] font-mono text-grid-emerald-500 block mt-0.5">
                  -{calculations.percentageBillReduction.toFixed(1)}% Bill Reduction
                </span>
              </div>

              <div className="bg-grid-navy-950/80 border border-grid-slate-800 rounded-xl p-3">
                <span className="text-[10px] font-mono text-grid-slate-500 uppercase block">Monthly Cashflow</span>
                <span className="text-xl font-extrabold font-mono text-white tabular-nums">
                  ₹{(calculations.totalMonthlySavingsInr / 100000).toFixed(2)} L
                </span>
                <span className="text-[10px] font-mono text-grid-slate-400 block mt-0.5">
                  Save ₹{calculations.netPerKwhSavings.toFixed(2)}/kWh net
                </span>
              </div>
            </div>

            {/* 25-Year Cumulative Figure */}
            <div className="mt-3 bg-grid-emerald-500/10 border border-grid-emerald-500/20 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs font-mono">
              <span className="text-grid-slate-300">25-Year Cumulative Net Savings:</span>
              <span className="font-bold text-grid-emerald-400 text-sm tabular-nums">
                ₹{(calculations.cumulative25YearSavingsInr / 10000000).toFixed(2)} Crores
              </span>
            </div>
          </div>

          {/* 1. Blended Supply Mix Donut & Stack Bar */}
          <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-white flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-grid-cyan-400" />
                <span>Blended Energy Supply Mix</span>
              </h4>
              <span className="text-[10px] font-mono text-grid-emerald-400 font-bold">
                {calculations.renewableSharePercent.toFixed(1)}% Net-Zero Share
              </span>
            </div>

            {/* Recharts Donut */}
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={calculations.supplyMixData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={68}
                    paddingAngle={3}
                    dataKey="pct"
                  >
                    {calculations.supplyMixData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    formatter={(value: unknown, name: unknown) => [`${value}% of Load`, String(name)]}
                    contentStyle={{
                      backgroundColor: "#0F172A",
                      border: "1px solid #334155",
                      borderRadius: "0.5rem",
                      fontSize: "11px",
                      fontFamily: "monospace",
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>

            {/* Stack Legend Breakdown */}
            <div className="space-y-2 text-xs font-mono">
              {calculations.supplyMixData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 truncate">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-grid-slate-300 truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <span className="text-white font-bold tabular-nums">{item.pct}%</span>
                    <span className="text-[10px] text-grid-slate-500 tabular-nums">
                      ({(item.kwh / 1200000).toFixed(2)} MUs/mo)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Landed Cost Waterfall Breakdown (₹/kWh) */}
          <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-white flex items-center space-x-1.5">
              <TrendingDown className="w-3.5 h-3.5 text-grid-emerald-400" />
              <span>Landed Tariff Cost Build-Up (₹/kWh)</span>
            </h4>

            <div className="space-y-2 pt-1 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-grid-slate-800">
                <span className="text-grid-slate-400">1. Base Generation / PPA Tariff</span>
                <span className="text-white font-bold tabular-nums">₹{stateProfile.benchmarkSolarPpaRatePerKwh.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-grid-slate-800">
                <span className="text-grid-slate-400">2. STU Technical Losses ({stateProfile.stuLossesPercent}%)</span>
                <span className="text-grid-slate-300 tabular-nums">+₹{(stateProfile.benchmarkSolarPpaRatePerKwh * (stateProfile.stuLossesPercent / 100)).toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-grid-slate-800">
                <span className="text-grid-slate-400">3. Wheeling &amp; Transmission ({inputs.voltageLevel})</span>
                <span className="text-grid-cyan-400 tabular-nums">+₹{calculations.wheelingCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-grid-slate-800">
                <span className="text-grid-slate-400">4. Cross-Subsidy (CSS)</span>
                <span className="tabular-nums">
                  {calculations.cssApplicable === 0 ? (
                    <span className="text-grid-emerald-400 font-bold">₹0.00 (EXEMPT)</span>
                  ) : (
                    <span className="text-grid-amber-400">+₹{calculations.cssApplicable.toFixed(2)}</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-grid-slate-800">
                <span className="text-grid-slate-400">5. Additional Surcharge (AS)</span>
                <span className="tabular-nums">
                  {calculations.asApplicable === 0 ? (
                    <span className="text-grid-emerald-400 font-bold">₹0.00 (EXEMPT)</span>
                  ) : (
                    <span className="text-purple-400">+₹{calculations.asApplicable.toFixed(2)}</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-2 text-sm font-bold">
                <span className="text-grid-emerald-400">Net Blended Landed Rate:</span>
                <span className="text-white font-mono tabular-nums">
                  ₹{calculations.blendedLandedTariffPerKwh.toFixed(2)}/kWh
                </span>
              </div>
            </div>
          </div>

          {/* 3. ESG & Net-Zero Impact Panel */}
          <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-white flex items-center space-x-1.5">
              <Leaf className="w-3.5 h-3.5 text-green-400" />
              <span>ESG, BRSR &amp; EU CBAM Decarbonization</span>
            </h4>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-grid-navy-950 border border-grid-slate-800 rounded-xl p-3">
                <span className="text-[10px] text-grid-slate-500 uppercase font-mono block">Annual Scope-2 Offset</span>
                <span className="text-lg font-extrabold text-green-400 font-mono tabular-nums">
                  {Math.round(calculations.co2AbatedTonnesAnnual).toLocaleString()}
                </span>
                <span className="text-[10px] text-grid-slate-400 font-mono block mt-0.5">tCO₂e / Year</span>
              </div>

              <div className="bg-grid-navy-950 border border-grid-slate-800 rounded-xl p-3">
                <span className="text-[10px] text-grid-slate-500 uppercase font-mono block">Mature Trees Equivalent</span>
                <span className="text-lg font-extrabold text-white font-mono tabular-nums">
                  {calculations.equivalentTreesPlanted.toLocaleString()}
                </span>
                <span className="text-[10px] text-grid-slate-400 font-mono block mt-0.5">Trees Planted / Yr</span>
              </div>
            </div>

            <div className="bg-grid-navy-950/80 border border-grid-slate-800/80 rounded-xl p-2.5 flex items-center justify-between text-[11px] font-mono">
              <span className="text-grid-slate-400">BRSR Principle 6:</span>
              <span className="text-grid-emerald-400 font-bold">Audit-Ready Report</span>
            </div>
          </div>

          {/* 4. Action Cards (Desktop) */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => setShowTermSheetModal(true)}
              className="w-full py-3.5 rounded-xl bg-grid-emerald-500 hover:bg-grid-emerald-400 text-grid-navy-950 font-bold font-mono text-xs transition-all shadow-lg shadow-grid-emerald-500/20 flex items-center justify-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Bankable PDF Feasibility Proposal</span>
            </button>

            <button
              onClick={() => setShowWhatsAppModal(true)}
              className="w-full py-3 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] font-bold font-mono text-xs transition-all flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send Calculation Summary to My WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* Mobile Sticky Bottom Floating Action Bar (< lg)                      */}
      {/* ==================================================================== */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 bg-grid-navy-950/95 backdrop-blur-md border-t border-grid-slate-800 p-3 z-40 shadow-2xl">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div>
            <div className="text-[10px] font-mono text-grid-slate-400">Projected Savings:</div>
            <div className="text-base font-extrabold text-grid-emerald-400 font-mono tabular-nums leading-tight">
              ₹{(calculations.totalAnnualSavingsInr / 10000000).toFixed(2)} Cr/yr
            </div>
            <div className="text-[9px] font-mono text-grid-slate-500">
              ₹{calculations.blendedLandedTariffPerKwh.toFixed(2)}/kWh (-{calculations.percentageBillReduction.toFixed(0)}%)
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowWhatsAppModal(true)}
              className="p-2.5 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366]"
              title="Send to WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowTermSheetModal(true)}
              className="px-4 py-2.5 rounded-xl bg-grid-emerald-500 text-grid-navy-950 font-bold font-mono text-xs shadow-lg shadow-grid-emerald-500/20"
            >
              Get PDF Proposal
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* MODAL 1: Bankable PDF Feasibility Proposal Generator                 */}
      {/* ==================================================================== */}
      {showTermSheetModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-grid-navy-950 border border-grid-slate-700 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl text-white font-sans">
            {/* Header */}
            <div className="sticky top-0 bg-grid-navy-900 border-b border-grid-slate-800 p-4 sm:p-5 flex items-center justify-between z-10">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-grid-emerald-400" />
                <h3 className="text-base font-bold text-white">
                  Bankable Energy Transition Proposal — Executive Term Sheet
                </h3>
              </div>
              <button
                onClick={() => setShowTermSheetModal(false)}
                className="p-1 rounded-lg hover:bg-grid-navy-800 text-grid-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Term Sheet Content */}
            <div className="p-6 sm:p-8 space-y-6 text-xs font-mono" id="printable-term-sheet">
              {/* Letterhead */}
              <div className="border-b border-grid-slate-800 pb-4 flex justify-between items-start">
                <div>
                  <span className="text-lg font-extrabold text-white font-sans tracking-tight block">
                    Topnotch <span className="text-grid-emerald-400">Energy Solutions</span>
                  </span>
                  <span className="text-[10px] text-grid-slate-400 block mt-0.5">
                    {BRAND.headquarters.fullAddress}
                  </span>
                  <span className="text-[10px] text-grid-slate-500 block">
                    NOAR Institutional Consultant • CERC Category-IV Advisory • BEE Certified Auditors
                  </span>
                </div>
                <div className="text-right text-[10px] text-grid-slate-500">
                  <span>Ref: TES-FEAS-84920</span>
                  <span className="block mt-0.5">Valid: 30 Days</span>
                </div>
              </div>

              {/* Client & Plant Specifics */}
              <div className="grid grid-cols-2 gap-4 bg-grid-navy-900/60 p-4 rounded-xl border border-grid-slate-800">
                <div>
                  <span className="text-[10px] text-grid-slate-500 uppercase block">Client Enterprise</span>
                  <input
                    type="text"
                    value={lead.companyName}
                    onChange={(e) => setLead({ ...lead, companyName: e.target.value })}
                    className="bg-transparent border-b border-grid-slate-700 text-white font-bold text-xs py-0.5 focus:outline-none focus:border-grid-emerald-400 w-full"
                  />
                  <span className="text-[10px] text-grid-slate-400 block mt-1">
                    Location: {lead.locationPin} • Discom: {inputs.discomName}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-grid-slate-500 uppercase block">Plant Capacity &amp; Grid</span>
                  <span className="text-white font-bold block mt-0.5">
                    {inputs.contractDemandKva.toLocaleString()} kVA Contract Demand ({inputs.voltageLevel})
                  </span>
                  <span className="text-[10px] text-grid-slate-400 block mt-1">
                    Monthly Drawl: {inputs.monthlyConsumptionLakhUnits} Lakh Units (₹{inputs.discomTariffPerKwh}/kWh)
                  </span>
                </div>
              </div>

              {/* Proposed Energy Transition Portfolio */}
              <div>
                <h5 className="font-bold uppercase text-[11px] text-grid-emerald-400 mb-2">
                  1. Structured Supply Portfolio Breakdown
                </h5>
                <table className="w-full text-left border border-grid-slate-800">
                  <thead className="bg-grid-navy-900 text-grid-slate-400 text-[10px]">
                    <tr>
                      <th className="p-2">Source Component</th>
                      <th className="p-2">Allocated Capacity</th>
                      <th className="p-2">Monthly Generation</th>
                      <th className="p-2">Landed Tariff</th>
                      <th className="p-2 text-right">Regulatory Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-grid-slate-800 text-grid-slate-300">
                    <tr>
                      <td className="p-2 font-bold text-white">Onsite Rooftop Solar</td>
                      <td className="p-2">{calculations.effectiveSolarKwp} kWp ({inputs.solarFinancialModel.toUpperCase()})</td>
                      <td className="p-2">{(calculations.solarMonthlyKwh / 100000).toFixed(2)} L kWh</td>
                      <td className="p-2 text-grid-amber-400">₹{calculations.rooftopLcoePerKwh.toFixed(2)}/kWh</td>
                      <td className="p-2 text-right text-grid-emerald-400">0 CSS &amp; 0 Wheeling</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold text-white">Offsite Group Captive / IEX</td>
                      <td className="p-2">{inputs.offsiteStrategy.toUpperCase()}</td>
                      <td className="p-2">{(calculations.offsiteMonthlyKwh / 100000).toFixed(2)} L kWh</td>
                      <td className="p-2 text-grid-cyan-400">₹{calculations.landedOffsiteTariffPerKwh.toFixed(2)}/kWh</td>
                      <td className="p-2 text-right text-grid-emerald-400">Section 42 Exempt</td>
                    </tr>
                    {inputs.includeBess && (
                      <tr>
                        <td className="p-2 font-bold text-white">BESS Peak Storage</td>
                        <td className="p-2">{inputs.bessCapacityMwh} MWh (4-Hr LFP)</td>
                        <td className="p-2">Slots 73–92 (Peak)</td>
                        <td className="p-2 text-purple-400">Arbitrage Engine</td>
                        <td className="p-2 text-right text-grid-slate-400">Peak Demand Shaving</td>
                      </tr>
                    )}
                    <tr className="bg-grid-navy-900/40">
                      <td className="p-2 font-bold text-white">Baseline Grid Remaining</td>
                      <td className="p-2">DISCOM Drawl</td>
                      <td className="p-2">{(calculations.remainingGridMonthlyKwh / 100000).toFixed(2)} L kWh</td>
                      <td className="p-2">₹{inputs.discomTariffPerKwh.toFixed(2)}/kWh</td>
                      <td className="p-2 text-right text-grid-slate-400">Standard HT Surcharge</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Financial Metrics Summary */}
              <div>
                <h5 className="font-bold uppercase text-[11px] text-grid-cyan-400 mb-2">
                  2. Executive Financial Summary
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-grid-navy-900/60 p-3 rounded-xl border border-grid-slate-800">
                  <div>
                    <span className="text-[10px] text-grid-slate-500 uppercase block">Blended Landed Tariff</span>
                    <span className="text-base font-bold text-white tabular-nums">
                      ₹{calculations.blendedLandedTariffPerKwh.toFixed(2)}/kWh
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-grid-slate-500 uppercase block">Annual Net Savings</span>
                    <span className="text-base font-bold text-grid-emerald-400 tabular-nums">
                      ₹{(calculations.totalAnnualSavingsInr / 10000000).toFixed(2)} Crores
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-grid-slate-500 uppercase block">Bill Reduction</span>
                    <span className="text-base font-bold text-grid-emerald-400 tabular-nums">
                      -{calculations.percentageBillReduction.toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-grid-slate-500 uppercase block">25-Yr Cumulative</span>
                    <span className="text-base font-bold text-white tabular-nums">
                      ₹{(calculations.cumulative25YearSavingsInr / 10000000).toFixed(2)} Cr
                    </span>
                  </div>
                </div>
              </div>

              {/* Signatures & Execution Protocol */}
              <div className="pt-4 border-t border-grid-slate-800 grid grid-cols-2 gap-8 text-[11px]">
                <div>
                  <span className="text-grid-slate-500 block mb-6">Prepared by Topnotch Energy Advisory Desk:</span>
                  <span className="text-white font-bold block">Rajeev Vats, Director</span>
                  <span className="text-grid-slate-500 text-[10px]">Head of Power Trading &amp; Open Access</span>
                </div>
                <div className="text-right">
                  <span className="text-grid-slate-500 block mb-6">Accepted on behalf of Client:</span>
                  <span className="text-white font-bold block">{lead.contactName || "Authorized Signatory"}</span>
                  <span className="text-grid-slate-500 text-[10px]">{lead.designation || "CFO / Director"}</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="sticky bottom-0 bg-grid-navy-900 border-t border-grid-slate-800 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
              <span className="text-[11px] font-mono text-grid-slate-400">
                Print or Save as PDF using your browser dialog.
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-xl border border-grid-slate-700 bg-grid-navy-950 text-white font-mono text-xs font-bold hover:bg-grid-navy-800 transition-colors flex items-center space-x-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={() => {
                    setShowTermSheetModal(false);
                    setShowWhatsAppModal(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-grid-emerald-500 hover:bg-grid-emerald-400 text-grid-navy-950 font-bold font-mono text-xs transition-all shadow-lg shadow-grid-emerald-500/20 flex items-center space-x-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send to WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL 2: WhatsApp Executive Memo Dispatch                            */}
      {/* ==================================================================== */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-grid-navy-950 border border-grid-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl text-white font-sans space-y-4">
            <div className="flex items-center justify-between border-b border-grid-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-[#25D366]">
                <MessageSquare className="w-5 h-5" />
                <h3 className="font-bold text-base text-white">Send Feasibility to WhatsApp</h3>
              </div>
              <button
                onClick={() => setShowWhatsAppModal(false)}
                className="text-grid-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-grid-slate-400 font-mono">
              Pre-formats an executive energy breakdown directly to your WhatsApp and dispatches an inquiry
              to Topnotch&apos;s 24x7 Bidding Desk (<span className="text-white">+91 7408318214</span>).
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-grid-slate-400 text-[10px] uppercase block mb-1">
                  Plant / Company Name
                </label>
                <input
                  type="text"
                  value={lead.companyName}
                  onChange={(e) => setLead({ ...lead, companyName: e.target.value })}
                  className="w-full bg-grid-navy-900 border border-grid-slate-700 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-grid-slate-400 text-[10px] uppercase block mb-1">
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    value={lead.contactName}
                    onChange={(e) => setLead({ ...lead, contactName: e.target.value })}
                    className="w-full bg-grid-navy-900 border border-grid-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-grid-slate-400 text-[10px] uppercase block mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={lead.designation}
                    onChange={(e) => setLead({ ...lead, designation: e.target.value })}
                    className="w-full bg-grid-navy-900 border border-grid-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-grid-slate-400 text-[10px] uppercase block mb-1">
                  WhatsApp Number (10 Digits)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-grid-slate-500 text-xs">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={lead.phone}
                    onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                    className="w-full bg-grid-navy-900 border border-grid-slate-700 rounded-lg pl-10 pr-3 py-2 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowWhatsAppModal(false)}
                className="flex-1 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-grid-navy-950 font-bold font-mono text-xs flex items-center justify-center space-x-2 transition-all shadow-lg shadow-[#25D366]/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Launch WhatsApp Term Sheet</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
