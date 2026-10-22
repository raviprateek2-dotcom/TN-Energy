"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Leaf,
  TrendingDown,
  Zap,
  ArrowRight,
  ShieldCheck,
  Calculator,
  Flame,
  Award,
  Sparkles,
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { BRAND } from "@/lib/constants/brand";

/**
 * National Industrial Decarbonization & Live Tariff Savings Barometer
 * Placed between Section 10 and the Footer to provide an interactive, visual showcase of
 * plant-level carbon abatement, rupee savings, and green sourcing share.
 */
export function IndustrialDecarbonizationBarometer() {
  // Interactive Slider State
  const [demandKva, setDemandKva] = useState(8500); // 8,500 kVA default
  const [discomTariff, setDiscomTariff] = useState(8.85); // ₹8.85/kWh default

  // Mathematical computations for industrial power dispatch
  // Assumes 70% average load factor over 24x7 (30 days/mo = 720 hours)
  const monthlyUnitsKwh = Math.round(demandKva * 0.9 * 0.70 * 720); // kVA * PF * LF * hrs
  const landedTopnotchRate = 4.25; // ₹4.25/kWh benchmark under Group Captive + IEX hybrid
  const tariffArbitrage = Math.max(0, discomTariff - landedTopnotchRate);
  
  const monthlySavingsRupees = monthlyUnitsKwh * tariffArbitrage;
  const annualSavingsCr = (monthlySavingsRupees * 12) / 10000000;
  
  // Decarbonization metrics (Central Electricity Authority grid emission factor ~0.716 kg CO2/kWh)
  const greenEnergySharePercent = 78; // 78% RE share under hybrid solar + wind + daytime exchange
  const annualGreenUnitsKwh = monthlyUnitsKwh * 12 * (greenEnergySharePercent / 100);
  const annualCo2AbatedTonnes = Math.round((annualGreenUnitsKwh * 0.716) / 1000);
  const coalAvoidedTonnes = Math.round(annualCo2AbatedTonnes * 0.62); // ~0.62T coal per T CO2

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#0B132B] via-[#0A0F1D] to-[#131F3F] text-white border border-white/20 p-6 sm:p-10 lg:p-12 shadow-2xl">
      {/* Merged Background Image: National Decarbonization & Grid Transmission Infrastructure */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <Image
          src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=2000&q=80"
          alt="National clean energy grid decarbonization infrastructure"
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover object-center opacity-30 lg:opacity-35 scale-105"
        />
        {/* Multi-Directional Gradient Masks for High Contrast and Visual Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/95 via-[#0A0F1D]/80 to-[#131F3F]/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-[#0B132B]/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15),transparent_70%)]" />
      </div>

      {/* Ambient background glow orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Grid Pattern Texture */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(#F8BC26 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-10">
        
        {/* Module Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>National Decarbonization &amp; Grid Barometer</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Instant Plant Tariff &amp; Carbon Abatement Gauge
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              Drag your facility&apos;s contract demand and state DISCOM tariff to simulate annual financial savings and verified carbon offsets under a Section 42 Group Captive hybrid model.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl flex-shrink-0">
            <Award className="w-5 h-5 text-[#F8BC26]" />
            <div className="text-left font-mono">
              <div className="text-xs font-bold text-white">CEA Grid Factor</div>
              <div className="text-[10px] text-slate-400">0.716 kg CO₂ / kWh Landed</div>
            </div>
          </div>
        </div>

        {/* Interactive Sliders + Dynamic Output Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Sliders (5 cols) */}
          <div className="lg:col-span-5 bg-white/[0.08] backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-8 space-y-7 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              
              {/* Slider 1: Contract Demand */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-semibold">Sanctioned Contract Demand:</span>
                  <span className="text-sm font-bold text-[#F8BC26] bg-[#F8BC26]/10 px-2.5 py-0.5 rounded-full border border-[#F8BC26]/20">
                    {demandKva.toLocaleString("en-IN")} kVA
                  </span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={25000}
                  step={250}
                  value={demandKva}
                  onChange={(e) => setDemandKva(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#F8BC26]"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>500 kVA (SME)</span>
                  <span>10,000 kVA</span>
                  <span>25,000 kVA (Heavy HT)</span>
                </div>
              </div>

              {/* Slider 2: DISCOM Retail Tariff */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-semibold">Current State DISCOM Tariff:</span>
                  <span className="text-sm font-bold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                    ₹{discomTariff.toFixed(2)} / kWh
                  </span>
                </div>
                <input
                  type="range"
                  min={7.50}
                  max={11.50}
                  step={0.05}
                  value={discomTariff}
                  onChange={(e) => setDiscomTariff(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>₹7.50 (Base)</span>
                  <span>₹9.50</span>
                  <span>₹11.50 (High ToD)</span>
                </div>
              </div>

            </div>

            {/* Target Landed Rate Callout */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Topnotch Landed Rate:</span>
              <span className="font-extrabold text-emerald-400 text-sm">
                ₹{landedTopnotchRate.toFixed(2)} / kWh (Fixed Hedge)
              </span>
            </div>
          </div>

          {/* Right Column: Dynamic KPIs & Impact Badges (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1: Annual Financial Savings */}
            <div className="bg-white/[0.08] backdrop-blur-md border border-white/15 rounded-2xl p-6 flex flex-col justify-between shadow-xl hover:border-[#F8BC26]/40 transition-colors">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#F8BC26] font-bold">
                <TrendingDown className="w-4 h-4" />
                <span>Annual Landed Power Savings</span>
              </div>
              <div className="my-3">
                <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                  ₹{annualSavingsCr.toFixed(2)}{" "}
                  <span className="text-lg text-emerald-400 font-sans font-bold">Cr/yr</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  ≈ ₹{Math.round(monthlySavingsRupees / 100000).toLocaleString("en-IN")} Lakhs saved monthly
                </span>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 inline-block">
                Zero CSS &amp; Additional Surcharge (Sec 42)
              </div>
            </div>

            {/* Card 2: Green Power Share Bar */}
            <div className="bg-white/[0.08] backdrop-blur-md border border-white/15 rounded-2xl p-6 flex flex-col justify-between shadow-xl hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 font-bold">
                <Zap className="w-4 h-4" />
                <span>Green Energy Procurement Share</span>
              </div>
              <div className="my-3">
                <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                  {greenEnergySharePercent}%{" "}
                  <span className="text-base text-slate-400 font-sans font-normal">Renewable</span>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full bg-slate-700/60 rounded-full h-2.5 mt-2 overflow-hidden flex">
                  <div className="bg-[#10B981] h-full" style={{ width: "55%" }} title="Group Captive Solar" />
                  <div className="bg-sky-400 h-full" style={{ width: "23%" }} title="Day-Ahead Wind/GDAM" />
                  <div className="bg-slate-500 h-full" style={{ width: "22%" }} title="DISCOM Grid Peak" />
                </div>
              </div>
              <div className="text-[10px] font-mono text-slate-400 flex justify-between">
                <span>55% Solar</span>
                <span>23% Wind/GDAM</span>
                <span>22% Grid</span>
              </div>
            </div>

            {/* Card 3: Annual CO2 Abated */}
            <div className="bg-white/[0.08] backdrop-blur-md border border-white/15 rounded-2xl p-6 flex flex-col justify-between shadow-xl hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 font-bold">
                <Leaf className="w-4 h-4" />
                <span>Verified Carbon Abatement</span>
              </div>
              <div className="my-3">
                <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                  {annualCo2AbatedTonnes.toLocaleString("en-IN")}{" "}
                  <span className="text-base text-emerald-400 font-sans font-bold">MT CO₂e/yr</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Direct BRSR &amp; ESG Scope-2 compliance
                </span>
              </div>
              <div className="text-[10px] font-mono text-slate-300">
                Equivalent to planting ~{Math.round(annualCo2AbatedTonnes * 4.2).toLocaleString("en-IN")} teak trees
              </div>
            </div>

            {/* Card 4: Coal Thermal Displacement */}
            <div className="bg-white/[0.08] backdrop-blur-md border border-white/15 rounded-2xl p-6 flex flex-col justify-between shadow-xl hover:border-amber-500/40 transition-colors">
              <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 font-bold">
                <Flame className="w-4 h-4" />
                <span>Fossil Coal Displaced</span>
              </div>
              <div className="my-3">
                <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                  {coalAvoidedTonnes.toLocaleString("en-IN")}{" "}
                  <span className="text-base text-amber-300 font-sans font-bold">Tonnes/yr</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Thermal pithead generation offset
                </span>
              </div>
              <div className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20 inline-block">
                Protects plant against future carbon surcharges
              </div>
            </div>

          </div>

        </div>

        {/* Action Footnote with Direct Conversion CTA */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <span>Ready for bilateral NDA execution • Guaranteed audit response within 2 hours</span>
          </div>

          <Link
            href="/contact?intent=feasibility-report"
            className="px-6 py-3 rounded-full bg-[#F8BC26] hover:bg-[#eab308] text-[#1C2C34] font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center space-x-2 self-stretch sm:self-auto justify-center"
          >
            <span>Request Detailed 45-Day Transition Dossier</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
