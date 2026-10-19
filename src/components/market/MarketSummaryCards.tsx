"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Leaf,
  ShieldAlert,
  ArrowUpDown,
  Gauge,
  HelpCircle,
} from "lucide-react";
import { IEX_MARKET_SUMMARY_KPIS } from "@/lib/constants/market-blocks-seed";

export function MarketSummaryCards() {
  const [unitMode, setUnitMode] = useState<"kwh" | "mwh">("kwh");
  const kpis = IEX_MARKET_SUMMARY_KPIS;

  const formatPrice = (mwh: number, kwh: number) => {
    if (unitMode === "mwh") {
      return `₹${mwh.toLocaleString("en-IN")}/MWh`;
    }
    return `₹${kwh.toFixed(2)}/kWh`;
  };

  const cards = [
    {
      id: "dam",
      title: "IEX Day-Ahead Market (DAM)",
      tag: "Base Collective",
      primaryValue: formatPrice(kpis.dailyAvgDamMwh, kpis.dailyAvgDamKwh),
      delta: "-3.2%",
      deltaType: "decrease" as const,
      secondaryLabel: "Peak Evening MCP",
      secondaryValue: formatPrice(kpis.peakEveningMcpMwh, kpis.peakEveningMcpKwh),
      subtext: "Blocks 73–92 (18:00–23:00 IST)",
      accentColor: "text-grid-cyan-400",
      borderColor: "border-grid-cyan-500/30",
      bgColor: "bg-grid-cyan-500/5",
      icon: Activity,
    },
    {
      id: "gdam",
      title: "Green Day-Ahead Market (GDAM)",
      tag: "100% RE Attribute",
      primaryValue: formatPrice(kpis.gdamDailyAvgMwh, kpis.gdamDailyAvgKwh),
      delta: "+1.8%",
      deltaType: "increase" as const,
      secondaryLabel: "Solar Hours Avg (Slot 25-64)",
      secondaryValue: formatPrice(kpis.solarHoursAvgMcpMwh, kpis.solarHoursAvgMcpKwh),
      subtext: "Eligible for Scope-2 RPO Compliance",
      accentColor: "text-grid-emerald-400",
      borderColor: "border-grid-emerald-500/30",
      bgColor: "bg-grid-emerald-500/5",
      icon: Leaf,
    },
    {
      id: "rtm",
      title: "Real-Time Market (RTM)",
      tag: "48 Sessions / Day",
      primaryValue: formatPrice(kpis.rtmDailyAvgMwh, kpis.rtmDailyAvgKwh),
      delta: "Volatile",
      deltaType: "neutral" as const,
      secondaryLabel: "Night Valley Avg (Slot 1-24)",
      secondaryValue: formatPrice(kpis.nightValleyAvgMcpMwh, kpis.nightValleyAvgMcpKwh),
      subtext: "1-Hour Statutory Gate Closure",
      accentColor: "text-purple-400",
      borderColor: "border-purple-500/30",
      bgColor: "bg-purple-500/5",
      icon: Zap,
    },
    {
      id: "grid",
      title: "National Grid Frequency",
      tag: "CERC IEGC Band",
      primaryValue: `${kpis.nationalGridFrequencyAvgHz.toFixed(3)} Hz`,
      delta: "Normal Band (49.90 - 50.05 Hz)",
      deltaType: "positive" as const,
      secondaryLabel: "DSM Rate Multiplier",
      secondaryValue: "1.00x Nominal",
      subtext: "Zero Penal Deviation Settlement",
      accentColor: "text-grid-amber-400",
      borderColor: "border-grid-amber-500/30",
      bgColor: "bg-grid-amber-500/5",
      icon: Gauge,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Unit switch bar */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-grid-slate-400">
          <span className="w-2 h-2 rounded-full bg-grid-emerald-400 animate-pulse" />
          <span>IEX / PXIL Trading Session: <strong className="text-white">Active</strong></span>
        </div>
        <div className="flex items-center space-x-1.5 bg-grid-navy-900 border border-grid-slate-800 rounded-lg p-1 text-[11px] font-mono">
          <span className="text-grid-slate-500 px-1.5 flex items-center space-x-1">
            <ArrowUpDown className="w-3 h-3" />
            <span>Unit:</span>
          </span>
          <button
            onClick={() => setUnitMode("kwh")}
            className={`px-2 py-0.5 rounded font-bold transition-all ${
              unitMode === "kwh"
                ? "bg-grid-emerald-500 text-grid-navy-950 shadow-sm"
                : "text-grid-slate-400 hover:text-white"
            }`}
          >
            ₹/kWh
          </button>
          <button
            onClick={() => setUnitMode("mwh")}
            className={`px-2 py-0.5 rounded font-bold transition-all ${
              unitMode === "mwh"
                ? "bg-grid-emerald-500 text-grid-navy-950 shadow-sm"
                : "text-grid-slate-400 hover:text-white"
            }`}
          >
            ₹/MWh
          </button>
        </div>
      </div>

      {/* Grid of 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.id}
              className={`rounded-2xl border p-5 ${c.borderColor} ${c.bgColor} bg-grid-navy-950/80 backdrop-blur transition-all hover:border-grid-slate-600`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-xl bg-grid-navy-900 border border-grid-slate-800 ${c.accentColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">{c.title}</h4>
                    <span className="text-[10px] font-mono text-grid-slate-400">{c.tag}</span>
                  </div>
                </div>
              </div>

              {/* Main Metric */}
              <div className="mt-4">
                <div className="flex items-baseline space-x-2">
                  <span className={`text-2xl font-extrabold font-mono tabular-nums tracking-tight ${c.accentColor}`}>
                    {c.primaryValue}
                  </span>
                  {c.deltaType === "decrease" && (
                    <span className="text-[11px] font-mono text-grid-emerald-400 flex items-center">
                      <TrendingDown className="w-3 h-3 mr-0.5" />
                      {c.delta}
                    </span>
                  )}
                  {c.deltaType === "increase" && (
                    <span className="text-[11px] font-mono text-red-400 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-0.5" />
                      {c.delta}
                    </span>
                  )}
                  {c.deltaType === "positive" && (
                    <span className="text-[10px] font-mono text-grid-emerald-400">
                      ✓ Normal
                    </span>
                  )}
                  {c.deltaType === "neutral" && (
                    <span className="text-[10px] font-mono text-purple-400">
                      ~ Dynamic
                    </span>
                  )}
                </div>
              </div>

              {/* Secondary Sub-Metric */}
              <div className="mt-3 pt-3 border-t border-grid-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                <span className="text-grid-slate-500">{c.secondaryLabel}</span>
                <span className="font-bold text-white tabular-nums">{c.secondaryValue}</span>
              </div>

              <div className="mt-1 text-[10px] font-mono text-grid-slate-600 truncate">
                {c.subtext}
              </div>
            </div>
          );
        })}
      </div>

      {/* Regulatory Badge Strip */}
      <div className="bg-grid-navy-900/60 border border-grid-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
        <div className="flex items-center space-x-2 text-grid-slate-400">
          <ShieldAlert className="w-3.5 h-3.5 text-grid-amber-400" />
          <span>CERC Statutory Cap: <strong className="text-white">₹10.00/kWh (₹10,000/MWh)</strong></span>
        </div>
        <div className="flex items-center space-x-4 text-grid-slate-500">
          <span>Total Cleared Volume: <strong className="text-grid-cyan-400 tabular-nums">{kpis.totalClearedVolumeMus.toFixed(1)} MUs</strong></span>
          <span>REC Solar: <strong className="text-grid-emerald-400 tabular-nums">₹{kpis.recMarket.solarRecPriceInr}/Cert</strong></span>
          <span>ESCert: <strong className="text-purple-400 tabular-nums">₹{kpis.escertsMarket.pricePerMtoeInr}/MTOE</strong></span>
        </div>
      </div>
    </div>
  );
}
