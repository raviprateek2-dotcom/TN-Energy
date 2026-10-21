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
      iconColor: "text-blue-700",
      iconBg: "bg-blue-50",
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
      iconColor: "text-emerald-700",
      iconBg: "bg-emerald-50",
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
      iconColor: "text-amber-700",
      iconBg: "bg-amber-50",
      icon: Zap,
    },
    {
      id: "grid",
      title: "National Grid Frequency",
      tag: "CERC IEGC Band",
      primaryValue: `${kpis.nationalGridFrequencyAvgHz.toFixed(3)} Hz`,
      delta: "Normal (49.90 - 50.05 Hz)",
      deltaType: "positive" as const,
      secondaryLabel: "DSM Rate Multiplier",
      secondaryValue: "1.00x Nominal",
      subtext: "Zero Penal Deviation Settlement",
      iconColor: "text-slate-700",
      iconBg: "bg-slate-100",
      icon: Gauge,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Unit switch bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-600">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            IEX / PXIL Trading Session: <strong className="text-slate-900 font-bold">Active</strong> (CERC Regulated)
          </span>
        </div>
        <div className="flex items-center space-x-1.5 bg-slate-100 border border-slate-200 rounded-xl p-1 text-xs font-mono self-start sm:self-auto">
          <span className="text-slate-500 px-2 flex items-center space-x-1">
            <ArrowUpDown className="w-3 h-3" />
            <span>Unit:</span>
          </span>
          <button
            onClick={() => setUnitMode("kwh")}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              unitMode === "kwh"
                ? "bg-[#F8BC26] text-[#1C2C34] shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            ₹/kWh
          </button>
          <button
            onClick={() => setUnitMode("mwh")}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              unitMode === "mwh"
                ? "bg-[#F8BC26] text-[#1C2C34] shadow-sm"
                : "text-slate-600 hover:text-slate-900"
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
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2.5 rounded-xl ${c.iconBg} ${c.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1C2C34] leading-tight">{c.title}</h4>
                    <span className="text-[10px] font-mono text-slate-500">{c.tag}</span>
                  </div>
                </div>

                {/* Main Metric */}
                <div className="mt-3">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-black font-mono text-[#1C2C34] tabular-nums tracking-tight">
                      {c.primaryValue}
                    </span>
                    {c.deltaType === "decrease" && (
                      <span className="text-xs font-mono font-bold text-emerald-700 flex items-center">
                        <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
                        {c.delta}
                      </span>
                    )}
                    {c.deltaType === "increase" && (
                      <span className="text-xs font-mono font-bold text-amber-800 flex items-center">
                        <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                        {c.delta}
                      </span>
                    )}
                    {c.deltaType === "positive" && (
                      <span className="text-[11px] font-mono font-bold text-emerald-700">
                        ✓ Normal
                      </span>
                    )}
                    {c.deltaType === "neutral" && (
                      <span className="text-[11px] font-mono font-bold text-slate-500">
                        ~ Dynamic
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Secondary Sub-Metric */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">{c.secondaryLabel}</span>
                  <span className="font-bold text-slate-800 tabular-nums">{c.secondaryValue}</span>
                </div>
                <div className="mt-1 text-[10px] font-mono text-slate-400 truncate">
                  {c.subtext}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Regulatory Badge Strip */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center space-x-2 text-slate-700">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>CERC Statutory Cap: <strong className="text-slate-900">₹10.00/kWh (₹10,000/MWh)</strong></span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-slate-600">
          <span>Total Cleared Volume: <strong className="text-[#1C2C34] tabular-nums font-bold">{kpis.totalClearedVolumeMus.toFixed(1)} MUs</strong></span>
          <span>REC Solar: <strong className="text-emerald-700 tabular-nums font-bold">₹{kpis.recMarket.solarRecPriceInr}/Cert</strong></span>
          <span>ESCert: <strong className="text-slate-900 tabular-nums font-bold">₹{kpis.escertsMarket.pricePerMtoeInr}/MTOE</strong></span>
        </div>
      </div>
    </div>
  );
}
