"use client";

import React, { useState } from "react";
import {
  Sun,
  Zap,
  TrendingUp,
  BatteryCharging,
  Factory,
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
      color: "#0284C7", // sky blue
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
      color: "#7C3AED", // purple
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
    <div className="bg-white border border-gray-200/90 rounded-3xl p-5 sm:p-7 shadow-xl relative overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-4 relative z-10">
        <div className="flex items-center space-x-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
          <h3 className="text-sm font-bold text-[#1C2C34] uppercase tracking-wider font-mono">
            Live Energy Flow Topology
          </h3>
        </div>
        <span className="text-[11px] font-mono font-bold text-gray-700 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full">
          Plant Model: 12.5 MVA Industrial C&I
        </span>
      </div>

      {/* Interactive Flow Canvas */}
      <div className="relative my-6 py-2">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          
          {/* Left: 4 Toggleable Power Sources */}
          <div className="md:col-span-6 space-y-2.5 relative z-10">
            <div className="text-[11px] font-mono font-bold text-gray-500 uppercase tracking-wider flex items-center justify-between mb-1">
              <span>Interactive Generation Feeders</span>
              <span className="text-[10px] text-gray-400 font-normal">(Click to Toggle)</span>
            </div>

            {sources.map((source) => {
              const Icon = source.icon;
              return (
                <button
                  key={source.id}
                  onClick={() => toggleSource(source.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                    source.active
                      ? "bg-white border-gray-300 shadow-sm ring-1 ring-amber-100"
                      : "bg-gray-50 border-gray-200 opacity-40 hover:opacity-70"
                  }`}
                  style={{
                    borderColor: source.active ? source.color : undefined,
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors shadow-2xs"
                      style={{
                        backgroundColor: source.active ? `${source.color}15` : "#F1F5F9",
                        color: source.active ? source.color : "#94A3B8",
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1C2C34] flex items-center space-x-1.5">
                        <span>{source.name}</span>
                        <span className="text-[10px] font-mono text-gray-500">({source.capacity})</span>
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono mt-0.5">
                        {source.tag}
                      </div>
                    </div>
                  </div>

                  <div className="text-right pl-2">
                    <span
                      className={`text-xs font-mono font-bold block ${
                        source.active ? "text-[#1C2C34]" : "text-gray-400 line-through"
                      }`}
                    >
                      {source.powerMw} MW
                    </span>
                    <span
                      className="text-[10px] font-mono font-bold"
                      style={{ color: source.active ? source.color : "#94A3B8" }}
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
                <path id="path-rooftop-light" d="M 5 30 C 50 30, 50 100, 95 100" />
                <path id="path-captive-light" d="M 5 75 C 50 75, 50 100, 95 100" />
                <path id="path-exchange-light" d="M 5 125 C 50 125, 50 100, 95 100" />
                <path id="path-bess-light" d="M 5 170 C 50 170, 50 100, 95 100" />
              </defs>

              {/* Inactive conduit base tracks */}
              <path d="M 5 30 C 50 30, 50 100, 95 100" stroke="#E2E8F0" strokeWidth="2.5" />
              <path d="M 5 75 C 50 75, 50 100, 95 100" stroke="#E2E8F0" strokeWidth="2.5" />
              <path d="M 5 125 C 50 125, 50 100, 95 100" stroke="#E2E8F0" strokeWidth="2.5" />
              <path d="M 5 170 C 50 170, 50 100, 95 100" stroke="#E2E8F0" strokeWidth="2.5" />

              {/* Active Animated Flow Beams */}
              {sources[0].active && (
                <>
                  <path
                    d="M 5 30 C 50 30, 50 100, 95 100"
                    stroke={sources[0].color}
                    strokeWidth="3"
                    className="animate-energy-flow-light"
                  />
                  <circle r="3.5" fill="#F59E0B">
                    <animateMotion dur="1.8s" repeatCount="indefinite" path="M 5 30 C 50 30, 50 100, 95 100" />
                  </circle>
                </>
              )}

              {sources[1].active && (
                <>
                  <path
                    d="M 5 75 C 50 75, 50 100, 95 100"
                    stroke={sources[1].color}
                    strokeWidth="3"
                    className="animate-energy-flow-light"
                  />
                  <circle r="3.5" fill="#10B981">
                    <animateMotion dur="1.6s" repeatCount="indefinite" path="M 5 75 C 50 75, 50 100, 95 100" />
                  </circle>
                </>
              )}

              {sources[2].active && (
                <>
                  <path
                    d="M 5 125 C 50 125, 50 100, 95 100"
                    stroke={sources[2].color}
                    strokeWidth="3"
                    className="animate-energy-flow-light"
                  />
                  <circle r="3.5" fill="#0284C7">
                    <animateMotion dur="1.4s" repeatCount="indefinite" path="M 5 125 C 50 125, 50 100, 95 100" />
                  </circle>
                </>
              )}

              {sources[3].active && (
                <>
                  <path
                    d="M 5 170 C 50 170, 50 100, 95 100"
                    stroke={sources[3].color}
                    strokeWidth="3"
                    className="animate-energy-flow-light"
                  />
                  <circle r="3.5" fill="#7C3AED">
                    <animateMotion dur="2.0s" repeatCount="indefinite" path="M 5 170 C 50 170, 50 100, 95 100" />
                  </circle>
                </>
              )}
            </svg>
          </div>

          {/* Right: Substation Convergence Node */}
          <div className="md:col-span-4 relative z-10">
            <div className="bg-gradient-to-b from-gray-50 to-white border border-gray-200/90 rounded-2xl p-5 shadow-sm text-center relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3 text-[#1C2C34] shadow-xs">
                <Factory className="w-6 h-6" />
              </div>

              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-gray-500 block">
                Physical Substation InSTS 33 kV
              </span>
              <h4 className="text-base font-bold text-[#1C2C34] mt-0.5">
                Plant Central Busbar
              </h4>

              <div className="mt-4 pt-3 border-t border-gray-200/80 space-y-2 font-mono">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Contract Demand:</span>
                  <span className="font-bold text-[#1C2C34]">12.5 MVA (11.25 MW)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Clean Power Drawn:</span>
                  <span className="font-bold text-[#10B981] tabular-nums">{totalSuppliedMw.toFixed(1)} MW</span>
                </div>
                {discomDeficitMw > 0 && (
                  <div className="flex items-center justify-between text-[11px] text-amber-700 bg-amber-50 px-2 py-1 rounded-md">
                    <span>Grid DISCOM Spillover:</span>
                    <span className="font-bold tabular-nums">+{discomDeficitMw.toFixed(1)} MW</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Blended Tariff Box */}
      <div className="mt-4 p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#F8BC26] flex items-center justify-center text-[#1C2C34] shadow-xs font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase font-bold text-amber-900 tracking-wider block">
              Optimized Landed Tariff Result
            </span>
            <div className="flex items-baseline space-x-2 mt-0.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#1C2C34] tabular-nums">
                ₹{blendedRate}/kWh
              </span>
              <span className="text-xs text-gray-500 line-through tabular-nums">
                ₹{baselineDiscomRate.toFixed(2)} Discom Base
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-right">
          <div>
            <span className="text-[10px] font-mono uppercase text-gray-500 block">
              Annual Plant Savings
            </span>
            <span className="text-lg sm:text-xl font-extrabold text-[#10B981] font-mono tabular-nums">
              ₹{annualSavingsCrores} Crores
            </span>
          </div>
          <div className="hidden sm:block">
            <span className="text-[10px] font-mono uppercase text-gray-500 block">
              CO₂ Abated / Yr
            </span>
            <span className="text-lg sm:text-xl font-extrabold text-[#0284C7] font-mono tabular-nums">
              {annualCo2OffsetTons.toLocaleString()} tCO₂e
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
