"use client";

import React from "react";
import Link from "next/link";
import { TrendingDown, TrendingUp, Zap, Radio } from "lucide-react";

export interface TickerItem {
  label: string;
  value: string;
  subtext?: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

const TICKER_DATA: TickerItem[] = [
  {
    label: "IEX DAM Avg",
    value: "₹4.42/kWh",
    change: "-3.2%",
    trend: "down",
    subtext: "₹4,420/MWh",
  },
  {
    label: "GDAM Solar Slot",
    value: "₹3.15/kWh",
    change: "-4.8%",
    trend: "down",
    subtext: "Slots 45-64",
  },
  {
    label: "RTM Block 68",
    value: "₹5.12/kWh",
    change: "+1.9%",
    trend: "up",
    subtext: "17:00 - 17:15",
  },
  {
    label: "Group Captive Solar PPA",
    value: "₹3.85/kWh",
    subtext: "0 CSS & 0 AS Landed",
    trend: "neutral",
  },
  {
    label: "REC Clearing",
    value: "₹1,200/Cert",
    change: "+0.0%",
    trend: "neutral",
    subtext: "IEX/PXIL Monthly",
  },
  {
    label: "National Grid Freq",
    value: "50.012 Hz",
    trend: "neutral",
    subtext: "Statutory 50.00 Hz Datum",
  },
  {
    label: "ESCerts (BEE PAT)",
    value: "₹1,840/MTOE",
    change: "+2.1%",
    trend: "up",
    subtext: "Cycle-VII Active",
  },
];

export function LiveTickerBar() {
  return (
    <div className="bg-grid-navy-900 border-b border-grid-slate-800 text-white overflow-hidden select-none relative z-40">
      <div className="flex items-center">
        {/* Left Sticky Label */}
        <div className="flex-shrink-0 bg-grid-navy-950 px-3 py-1.5 border-r border-grid-slate-800 flex items-center space-x-2 z-10 shadow-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-grid-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-grid-emerald-500" />
          </span>
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-grid-emerald-400 uppercase flex items-center">
            <Radio className="w-3 h-3 mr-1 inline" />
            LIVE IEX TICKER
          </span>
        </div>

        {/* Continuous Scrolling Marquee */}
        <div className="relative overflow-hidden w-full py-1.5 flex group">
          <div className="flex space-x-8 whitespace-nowrap animate-ticker group-hover:[animation-play-state:paused]">
            {[...TICKER_DATA, ...TICKER_DATA, ...TICKER_DATA].map((item, idx) => (
              <div key={idx} className="inline-flex items-center space-x-2 text-xs font-mono">
                <span className="text-grid-slate-400 font-sans text-[11px] font-medium">{item.label}:</span>
                <span className="font-bold text-white tabular-nums">{item.value}</span>
                {item.change && (
                  <span
                    className={`inline-flex items-center text-[10px] font-bold px-1 rounded ${
                      item.trend === "down"
                        ? "text-grid-emerald-400 bg-grid-emerald-500/10"
                        : item.trend === "up"
                        ? "text-grid-red-400 bg-grid-red-500/10"
                        : "text-grid-slate-400"
                    }`}
                  >
                    {item.trend === "down" && <TrendingDown className="w-2.5 h-2.5 mr-0.5 inline" />}
                    {item.trend === "up" && <TrendingUp className="w-2.5 h-2.5 mr-0.5 inline" />}
                    {item.change}
                  </span>
                )}
                {item.subtext && (
                  <span className="text-[10px] text-grid-slate-500">({item.subtext})</span>
                )}
                <span className="text-grid-slate-700 ml-2">●</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right CTA */}
        <div className="hidden lg:flex flex-shrink-0 bg-grid-navy-950 px-3 py-1.5 border-l border-grid-slate-800 z-10">
          <Link
            href="/market-intelligence"
            className="text-[11px] font-mono text-grid-cyan-400 hover:text-white flex items-center space-x-1"
          >
            <Zap className="w-3 h-3 text-grid-amber-400" />
            <span>Open 96-Block Terminal →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
