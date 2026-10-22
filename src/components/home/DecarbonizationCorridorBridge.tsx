"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Zap,
  ShieldCheck,
  TrendingDown,
  CheckCircle2,
  ArrowRight,
  Activity,
  Gauge,
  Factory,
  Building2,
  ChevronRight,
  Sparkles,
  Award,
} from "lucide-react";

interface StateCorridor {
  state: string;
  gridRegion: string;
  discomTariff: number; // ₹/kWh
  topnotchTariff: number; // ₹/kWh
  cleanEnergyShare: string;
  bankingAllowed: string;
  sldcClearanceDays: number;
  featuredIndustries: string;
  cssExemption: string;
}

const CORRIDOR_DATA: StateCorridor[] = [
  {
    state: "Uttar Pradesh",
    gridRegion: "Northern Regional Grid (NR)",
    discomTariff: 8.85,
    topnotchTariff: 4.45,
    cleanEnergyShare: "82%",
    bankingAllowed: "100% Annual Banking",
    sldcClearanceDays: 30,
    featuredIndustries: "Heavy Steel Rolling, Yarn Spinning, Distilleries",
    cssExemption: "100% Exempt (Sec 42 Group Captive)",
  },
  {
    state: "Gujarat",
    gridRegion: "Western Regional Grid (WR)",
    discomTariff: 7.95,
    topnotchTariff: 4.15,
    cleanEnergyShare: "90%",
    bankingAllowed: "Monthly Settlement",
    sldcClearanceDays: 25,
    featuredIndustries: "Chemicals, Textile Processing, Engineering",
    cssExemption: "100% Exempt (Sec 42 Group Captive)",
  },
  {
    state: "Maharashtra",
    gridRegion: "Western Regional Grid (WR)",
    discomTariff: 9.40,
    topnotchTariff: 4.60,
    cleanEnergyShare: "85%",
    bankingAllowed: "Time-of-Day Banking",
    sldcClearanceDays: 32,
    featuredIndustries: "Auto Ancillary, Forging, API Pharma",
    cssExemption: "100% Exempt (Sec 42 Group Captive)",
  },
  {
    state: "Haryana",
    gridRegion: "Northern Regional Grid (NR)",
    discomTariff: 8.20,
    topnotchTariff: 4.35,
    cleanEnergyShare: "80%",
    bankingAllowed: "Daily Banking Allowed",
    sldcClearanceDays: 28,
    featuredIndustries: "Auto Component PEB Sheds, Cold Chains, Footwear",
    cssExemption: "100% Exempt (Sec 42 Group Captive)",
  },
  {
    state: "Rajasthan",
    gridRegion: "Northern Regional Grid (NR)",
    discomTariff: 8.65,
    topnotchTariff: 3.95,
    cleanEnergyShare: "95%",
    bankingAllowed: "Annual Banking with Settlement",
    sldcClearanceDays: 21,
    featuredIndustries: "Cement Grinding, Ceramic Tiles, Marble Units",
    cssExemption: "100% Exempt (Sec 42 Group Captive)",
  },
  {
    state: "Karnataka",
    gridRegion: "Southern Regional Grid (SR)",
    discomTariff: 8.40,
    topnotchTariff: 4.25,
    cleanEnergyShare: "88%",
    bankingAllowed: "6-Month Settlement",
    sldcClearanceDays: 30,
    featuredIndustries: "Precision Machine Tooling, Heavy Fabrication, Foundries",
    cssExemption: "100% Exempt (Sec 42 Group Captive)",
  },
];

const FAST_TRACK_STAGES = [
  {
    stage: "01",
    days: "Days 1–7",
    title: "HT Bill & Load Audit",
    description: "BEE Grade-A audit of 12-month 15-minute load curves, contract demand, and penalty recovery analysis.",
    badge: "Zero Factory Downtime",
  },
  {
    stage: "02",
    days: "Days 8–20",
    title: "SPV Equity & PPA",
    description: "26% captive equity structuring strictly per Electricity Rules 2005 (Rule 3) with zero Cross-Subsidy Surcharge.",
    badge: "100% Legal Exemption",
  },
  {
    stage: "03",
    days: "Days 21–35",
    title: "NOAR & 0.2s ABT Bay",
    description: "SLDC connectivity, National Open Access Registry (NOAR) registration, and CEA 0.2s accuracy metering bay installation.",
    badge: "SLDC & CTU Clearance",
  },
  {
    stage: "04",
    days: "Days 36–45",
    title: "Live Synchronized Power",
    description: "Automated 96-block bourse dispatch kicks in. Factory bill slashes by ₹2.80–₹4.90 per unit from the very first cycle.",
    badge: "Up to 42% Net Savings",
  },
];

export function DecarbonizationCorridorBridge() {
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);
  const activeCorridor = CORRIDOR_DATA[selectedStateIndex];
  const unitSavings = (activeCorridor.discomTariff - activeCorridor.topnotchTariff).toFixed(2);
  const percentageSavings = Math.round(
    ((activeCorridor.discomTariff - activeCorridor.topnotchTariff) / activeCorridor.discomTariff) * 100
  );

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#0F172A] via-[#111C32] to-[#0A0F1D] text-white overflow-hidden border-t border-slate-800/80">
      {/* Deep Blue Industrial Photography Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2000&q=80"
          alt="Transmission grid infrastructure"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/95 via-[#111C32]/90 to-[#0A0F1D]/95" />
      </div>

      {/* Background Decorative Grid and Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-[#F8BC26]/20 rounded-full blur-3xl" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>National Clean Energy Transmission Corridor</span>
          </div>

          <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            How Your Factory Bridges to <span className="text-[#F8BC26]">Low-Cost Clean Power</span>
          </h3>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
            Explore state-specific open access economics, zero-CSS Group Captive mechanics, and our certified 45-day turnkey commissioning pathway.
          </p>
        </div>

        {/* =========================================================================
            PART 1: INTERACTIVE STATE OPEN ACCESS CORRIDOR SELECTOR
           ========================================================================= */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-700/80 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl mb-14">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                Select Your Factory Location
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-2">
                <Factory className="w-5 h-5 text-[#F8BC26]" />
                <span>Inter-State &amp; Intra-State Power Corridors</span>
              </h4>
            </div>

            {/* State Selection Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {CORRIDOR_DATA.map((item, index) => {
                const isActive = index === selectedStateIndex;
                return (
                  <button
                    key={item.state}
                    type="button"
                    onClick={() => setSelectedStateIndex(index)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                      isActive
                        ? "bg-[#F8BC26] text-[#1C2C34] shadow-md shadow-[#F8BC26]/20 scale-105"
                        : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700"
                    }`}
                  >
                    {item.state}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active State Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
            
            {/* Tariff Comparison Card */}
            <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  DISCOM vs Topnotch Landed
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl sm:text-3xl font-black text-white">
                    ₹{activeCorridor.topnotchTariff}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    ₹{activeCorridor.discomTariff}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    / kWh
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Net Tariff Slash:</span>
                <span className="font-bold text-emerald-400 flex items-center space-x-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>-₹{unitSavings} ({percentageSavings}%)</span>
                </span>
              </div>
            </div>

            {/* Clean Energy & Banking Card */}
            <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Clean Renewable Share
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl sm:text-3xl font-black text-[#10B981]">
                    {activeCorridor.cleanEnergyShare}
                  </span>
                  <span className="text-xs font-mono text-slate-400">Solar + Wind</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Banking Rules:</span>
                <span className="font-bold text-slate-200">{activeCorridor.bankingAllowed}</span>
              </div>
            </div>

            {/* Regulatory Exemption Card */}
            <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Cross-Subsidy Surcharge (CSS)
                </span>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm font-bold text-emerald-300">
                    ₹0.00 / kWh
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-700/60 text-xs font-mono text-slate-300">
                <span>{activeCorridor.cssExemption}</span>
              </div>
            </div>

            {/* SLDC Clearance & Grid Region */}
            <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Turnkey Commissioning
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl sm:text-3xl font-black text-[#F8BC26]">
                    {activeCorridor.sldcClearanceDays}
                  </span>
                  <span className="text-xs font-mono text-slate-300">Days to Power Flow</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Grid Connectivity:</span>
                <span className="font-bold text-slate-200 truncate max-w-[140px]" title={activeCorridor.gridRegion}>
                  {activeCorridor.gridRegion}
                </span>
              </div>
            </div>

          </div>

          {/* Industry Focus Footer */}
          <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-[#F8BC26]" />
              <span>Key {activeCorridor.state} Industries Benefiting:</span>
              <span className="text-slate-200 font-bold">{activeCorridor.featuredIndustries}</span>
            </div>

            <Link
              href="/tools/compare-states"
              className="inline-flex items-center space-x-1.5 text-[#F8BC26] hover:text-[#e5ac1f] font-bold transition-colors group"
            >
              <span>View Full 14-State Policy Matrix</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* =========================================================================
            PART 2: 4-STAGE FAST-TRACK TRANSITION PATHWAY (VISUAL PIPELINE)
           ========================================================================= */}
        <div className="mt-14 relative rounded-3xl overflow-hidden border border-white/20 p-6 sm:p-10 lg:p-12 bg-[#0A0F1D] shadow-2xl">
          {/* Contrasty Merged High-Voltage Engineering Background Image */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
            <Image
              src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2000&q=80"
              alt="High-voltage transmission pylon and industrial engineering grid infrastructure"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center opacity-70 sm:opacity-80 scale-105"
            />
            {/* Contrasty Multi-Directional Gradient Masks */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-[#0A0F1D]/50 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1D]/85 via-transparent to-[#0A0F1D]/80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,15,29,0.7)_100%)]" />
          </div>

          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#F8BC26]/20 border border-[#F8BC26]/40 text-xs font-mono uppercase tracking-widest text-[#F8BC26] font-bold shadow-md">
                Predictable Engineering Timeline
              </span>
              <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mt-1 drop-shadow-md">
                From Plant Audit to Synchronized Power in 45 Days
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 font-sans max-w-lg mx-auto drop-shadow-sm leading-relaxed">
                Structured timeline execution backed by institutional SLA milestones, NABL-calibrated CEA Class 0.2s metering, and automated SLDC connectivity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FAST_TRACK_STAGES.map((step, idx) => (
                <div
                  key={step.stage}
                  className="relative p-6 rounded-2xl bg-[#0B132B]/85 backdrop-blur-md border border-white/20 hover:border-[#F8BC26]/60 transition-all duration-300 hover:-translate-y-1 group shadow-2xl flex flex-col justify-between"
                >
                  <div>
                    {/* Step Number Glow */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-black font-mono text-slate-400 group-hover:text-[#F8BC26] transition-colors">
                        {step.stage}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#F8BC26]/15 border border-[#F8BC26]/40 text-[10px] font-mono font-bold text-[#F8BC26]">
                        {step.days}
                      </span>
                    </div>

                    <h5 className="text-base font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {step.title}
                    </h5>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center space-x-1.5 text-[11px] font-mono text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{step.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA Strip */}
        <div className="mt-12 text-center">
          <Link
            href="/procurement-dossier"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono font-bold text-white hover:text-[#F8BC26] transition-all"
          >
            <Award className="w-4 h-4 text-[#F8BC26]" />
            <span>Download CERC Accredited Vendor Empanelment Dossier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}