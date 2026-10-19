"use client";

import React, { useState } from "react";
import {
  Sun,
  Zap,
  TrendingUp,
  BatteryCharging,
  Factory,
  CheckCircle2,
  Sliders,
  Sparkles,
} from "lucide-react";

interface EnergySource {
  id: string;
  name: string;
  capacity: string;
  costPerKwh: number;
  active: boolean;
  powerMw: number;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

export function LiveEnergyFlowTopology() {
  const [sources, setSources] = useState<EnergySource[]>([
    {
      id: "rooftop",
      name: "Onsite Rooftop Solar",
      capacity: "2.5 MWp",
      costPerKwh: 1.55,
      active: true,
      powerMw: 2.2,
      color: "#F59E0B", // amber
      icon: Sun,
      tag: "Generating @ ₹1.55/kWh LCOE",
    },
    {
      id: "group-captive",
      name: "Group Captive Hybrid Farm",
      capacity: "6.0 MW",
      costPerKwh: 3.90,
      active: true,
      powerMw: 5.4,
      color: "#10B981", // emerald
      icon: Zap,
      tag: "Wheeling @ ₹3.90/kWh (0 CSS / 0 AS)",
    },
    {
      id: "exchange",
      name: "IEX DAM / GDAM Exchange",
      capacity: "Flexible Bidding",
      costPerKwh: 3.40,
      active: true,
      powerMw: 3.2,
      color: "#06B6D4", // cyan
      icon: TrendingUp,
      tag: "96-Block Balancing @ ₹3.40/kWh Solar Slot",
    },
    {
      id: "bess",
      name: "BESS Peak Storage",
      capacity: "4.0 MWh LFP",
      costPerKwh: 4.80,
      active: true,
      powerMw: 1.7,
      color: "#8B5CF6", // purple
      icon: BatteryCharging,
      tag: "Discharging during Peak Slots 73-92",
    },
  ]);

  const toggleSource = (id: string) => {
    setSources((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const activeSources = sources.filter((s) => s.active);
  const totalSuppliedMw = activeSources.reduce((acc, s) => acc + s.powerMw, 0);
  const plantTotalDemandMw = 12.5; // 12.5 MVA ~ 11.25 MW
  const discomDeficitMw = Math.max(0, plantTotalDemandMw - totalSuppliedMw);

  const baselineDiscomRate = 8.60; // ₹/kWh

  // Blended tariff calculation
  let totalCostSum = 0;
  activeSources.forEach((s) => {
    totalCostSum += s.powerMw * s.costPerKwh;
  });
  if (discomDeficitMw > 0) {
    totalCostSum += discomDeficitMw * baselineDiscomRate;
  }

  const blendedRate = Number((totalCostSum / plantTotalDemandMw).toFixed(2));
  const perKwhSavings = Math.max(0, baselineDiscomRate - blendedRate);
  
  // Approximate annual numbers (assuming 7,500 operating hours)
  const annualConsumptionMus = (plantTotalDemandMw * 7500) / 1000;
  const annualSavingsCrores = Number(((perKwhSavings * annualConsumptionMus * 1000000) / 10000000).toFixed(2));
  const annualCo2OffsetTons = Math.round((totalSuppliedMw * 7500 * 0.82) * (activeSources.some(s => s.id === 'rooftop' || s.id === 'group-captive') ? 0.9 : 0.4));

  return (
    <div className="bg-grid-navy-900/90 border border-grid-slate-700/80 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Background Subtle Radar Grid */}
      <div className="absolute inset-0 bg-grid-dense opacity-20 pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-grid-slate-800 pb-3 relative z-10">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-grid-emerald-400 animate-pulse" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center">
            Live Energy Flow Topology
          </h3>
        </div>
        <span className="text-[11px] font-mono text-grid-cyan-400 bg-grid-cyan-950/60 border border-grid-cyan-500/30 px-2.5 py-0.5 rounded-full">
          Simulation: 12.5 MVA Industrial Consumer
        </span>
      </div>

      {/* Interactive Flow Canvas */}
      <div className="relative my-6 py-2">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Left: 4 Toggleable Power Sources */}
          <div className="md:col-span-5 space-y-2.5 relative z-10">
            <div className="text-[11px] font-mono font-semibold text-grid-slate-400 uppercase tracking-wider flex items-center justify-between mb-1">
              <span>Interactive Power Sources</span>
              <span className="text-[10px] text-grid-slate-500">(Tap to Toggle)</span>
            </div>

            {sources.map((source) => {
              const Icon = source.icon;
              return (
                <button
                  key={source.id}
                  onClick={() => toggleSource(source.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                    source.active
                      ? "bg-grid-navy-950/90 border-grid-slate-700 shadow-md ring-1"
                      : "bg-grid-navy-950/40 border-grid-slate-900 opacity-50 hover:opacity-80"
                  }`}
                  style={{
                    borderColor: source.active ? `${source.color}60` : undefined,
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: source.active ? `${source.color}20` : "rgba(30, 41, 59, 0.4)",
                        color: source.active ? source.color : "#64748B",
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                        <span>{source.name}</span>
                        <span className="text-[10px] font-mono text-grid-slate-400">({source.capacity})</span>
                      </div>
                      <div className="text-[10px] text-grid-slate-400 font-mono mt-0.5">
                        {source.tag}
                      </div>
                    </div>
                  </div>

                  <div className="text-right pl-2">
                    <span
                      className={`text-xs font-mono font-bold block ${
                        source.active ? "text-white" : "text-grid-slate-600 line-through"
                      }`}
                    >
                      {source.powerMw} MW
                    </span>
                    <span
                      className="text-[10px] font-mono"
                      style={{ color: source.active ? source.color : "#64748B" }}
                    >
                      ₹{source.costPerKwh.toFixed(2)}/kWh
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Center: Animated SVG Vector Flow Pipelines (Hidden on mobile, prominent on desktop) */}
          <div className="hidden md:flex md:col-span-2 justify-center items-center h-full relative">
            <svg className="w-full h-64 overflow-visible" viewBox="0 0 100 200" fill="none">
              <defs>
                {/* Path definitions for reuse and particle tracking */}
                <path id="path-rooftop" d="M 5 30 C 50 30, 50 100, 95 100" />
                <path id="path-captive" d="M 5 75 C 50 75, 50 100, 95 100" />
                <path id="path-exchange" d="M 5 125 C 50 125, 50 100, 95 100" />
                <path id="path-bess" d="M 5 170 C 50 170, 50 100, 95 100" />
              </defs>

              {/* 1. Inactive conduit base tracks */}
              <path d="M 5 30 C 50 30, 50 100, 95 100" stroke="#1E293B" strokeWidth="2" strokeOpacity="0.4" />
              <path d="M 5 75 C 50 75, 50 100, 95 100" stroke="#1E293B" strokeWidth="2" strokeOpacity="0.4" />
              <path d="M 5 125 C 50 125, 50 100, 95 100" stroke="#1E293B" strokeWidth="2" strokeOpacity="0.4" />
              <path d="M 5 170 C 50 170, 50 100, 95 100" stroke="#1E293B" strokeWidth="2" strokeOpacity="0.4" />

              {/* 2. Active Animated Flow Beams */}
              {sources[0].active && (
                <>
                  <path
                    d="M 5 30 C 50 30, 50 100, 95 100"
                    stroke={sources[0].color}
                    strokeWidth="2.5"
                    className="animate-energy-flow"
                  />
                  <circle r="3" fill="#FCD34D" filter="drop-shadow(0 0 4px #F59E0B)">
                    <animateMotion dur="1.8s" repeatCount="indefinite" path="M 5 30 C 50 30, 50 100, 95 100" />
                  </circle>
                  <circle r="2" fill="#FFFFFF">
                    <animateMotion dur="1.8s" begin="0.9s" repeatCount="indefinite" path="M 5 30 C 50 30, 50 100, 95 100" />
                  </circle>
                </>
              )}

              {sources[1].active && (
                <>
                  <path
                    d="M 5 75 C 50 75, 50 100, 95 100"
                    stroke={sources[1].color}
                    strokeWidth="2.5"
                    className="animate-energy-flow"
                  />
                  <circle r="3" fill="#6EE7B7" filter="drop-shadow(0 0 4px #10B981)">
                    <animateMotion dur="2.1s" repeatCount="indefinite" path="M 5 75 C 50 75, 50 100, 95 100" />
                  </circle>
                  <circle r="2" fill="#FFFFFF">
                    <animateMotion dur="2.1s" begin="1.05s" repeatCount="indefinite" path="M 5 75 C 50 75, 50 100, 95 100" />
                  </circle>
                </>
              )}

              {sources[2].active && (
                <>
                  <path
                    d="M 5 125 C 50 125, 50 100, 95 100"
                    stroke={sources[2].color}
                    strokeWidth="2.5"
                    className="animate-energy-flow"
                  />
                  <circle r="3" fill="#67E8F9" filter="drop-shadow(0 0 4px #06B6D4)">
                    <animateMotion dur="1.6s" repeatCount="indefinite" path="M 5 125 C 50 125, 50 100, 95 100" />
                  </circle>
                  <circle r="2" fill="#FFFFFF">
                    <animateMotion dur="1.6s" begin="0.8s" repeatCount="indefinite" path="M 5 125 C 50 125, 50 100, 95 100" />
                  </circle>
                </>
              )}

              {sources[3].active && (
                <>
                  <path
                    d="M 5 170 C 50 170, 50 100, 95 100"
                    stroke={sources[3].color}
                    strokeWidth="2.5"
                    className="animate-energy-flow"
                  />
                  <circle r="3" fill="#C4B5FD" filter="drop-shadow(0 0 4px #8B5CF6)">
                    <animateMotion dur="2.4s" repeatCount="indefinite" path="M 5 170 C 50 170, 50 100, 95 100" />
                  </circle>
                  <circle r="2" fill="#FFFFFF">
                    <animateMotion dur="2.4s" begin="1.2s" repeatCount="indefinite" path="M 5 170 C 50 170, 50 100, 95 100" />
                  </circle>
                </>
              )}

              {/* Convergence Hub & Energy Pulse */}
              <circle cx="95" cy="100" r="10" fill="#00F5A0" opacity="0.25" className="animate-ping" />
              <circle cx="95" cy="100" r="6" fill="#00F5A0" opacity="0.6" />
              <circle cx="95" cy="100" r="3.5" fill="#FFFFFF" />
            </svg>
          </div>

          {/* Right: Central Industrial Manufacturing Plant Hub */}
          <div className="md:col-span-5 bg-grid-navy-950/90 border border-grid-slate-700 p-4 sm:p-5 rounded-2xl relative shadow-xl">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-grid-emerald-500 to-grid-cyan-600 flex items-center justify-center text-grid-navy-950 shadow-lg shadow-grid-emerald-500/20">
                <Factory className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  Industrial Plant (12.5 MVA Load)
                </h4>
                <span className="text-[10px] font-mono text-grid-slate-400">
                  Continuous Induction & Machining Hub
                </span>
              </div>
            </div>

            {/* Power Influx Breakdown */}
            <div className="space-y-1.5 py-2 text-xs font-mono border-t border-b border-grid-slate-800">
              <div className="flex justify-between">
                <span className="text-grid-slate-400">Total Plant Demand:</span>
                <span className="font-bold text-white tabular-nums">{plantTotalDemandMw} MW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-grid-emerald-400">Solar + Captive + BESS:</span>
                <span className="font-bold text-grid-emerald-400 tabular-nums">
                  {totalSuppliedMw.toFixed(1)} MW (
                  {((totalSuppliedMw / plantTotalDemandMw) * 100).toFixed(0)}%)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-grid-slate-400">Grid Discom Residual:</span>
                <span className="font-bold text-grid-amber-400 tabular-nums">
                  {discomDeficitMw.toFixed(1)} MW
                </span>
              </div>
            </div>

            {/* Live Tariff Scoreboard */}
            <div className="mt-4 pt-1 grid grid-cols-2 gap-3">
              <div className="bg-grid-navy-900 p-3 rounded-xl border border-grid-slate-800">
                <span className="text-[10px] uppercase font-mono text-grid-slate-400 block">
                  Blended Tariff
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-grid-emerald-400 font-mono tabular-nums">
                  ₹{blendedRate.toFixed(2)}
                </span>
                <span className="text-[10px] text-grid-slate-400 font-mono block">
                  vs ₹{baselineDiscomRate.toFixed(2)} Discom
                </span>
              </div>

              <div className="bg-grid-navy-900 p-3 rounded-xl border border-grid-slate-800">
                <span className="text-[10px] uppercase font-mono text-grid-slate-400 block">
                  Annual Savings
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-grid-cyan-300 font-mono tabular-nums">
                  ₹{annualSavingsCrores} Cr
                </span>
                <span className="text-[10px] text-grid-emerald-400 font-mono block">
                  -{((perKwhSavings / baselineDiscomRate) * 100).toFixed(0)}% Reduction
                </span>
              </div>
            </div>

            {/* Scope-2 CO2 Counter */}
            <div className="mt-3 flex items-center justify-between text-[11px] font-mono bg-grid-emerald-950/40 border border-grid-emerald-500/20 px-3 py-1.5 rounded-lg text-grid-emerald-300">
              <span className="flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-grid-emerald-400" />
                Scope-2 Carbon Abatement:
              </span>
              <span className="font-bold tabular-nums">
                {annualCo2OffsetTons.toLocaleString("en-IN")} tCO₂e/yr
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
