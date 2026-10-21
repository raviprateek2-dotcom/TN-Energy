"use client";

import React, { useState, useEffect } from "react";
import { Radio, Clock, ShieldCheck, Zap } from "lucide-react";

export interface TickerItem {
  label: string;
  value: string;
  subtext?: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

function getIstTimeBlock(): { block: number; timeWindow: string; session: string } {
  const now = new Date();
  // IST is UTC + 5:30
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const istTime = new Date(utc + 5.5 * 3600000);
  const hours = istTime.getHours();
  const minutes = istTime.getMinutes();
  const totalMinutes = hours * 60 + minutes;
  const block = Math.min(96, Math.max(1, Math.floor(totalMinutes / 15) + 1));

  const startH = Math.floor(((block - 1) * 15) / 60);
  const startM = ((block - 1) * 15) % 60;
  const endH = Math.floor((block * 15) / 60) % 24;
  const endM = (block * 15) % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");
  const timeWindow = `${pad(startH)}:${pad(startM)}–${pad(endH)}:${pad(endM)} IST`;

  let session = "RTM 48 Sessions";
  if (hours >= 10 && hours < 12) {
    session = "DAM Bidding Open";
  } else if (hours >= 12 && hours < 14) {
    session = "DAM Clearing";
  } else if (hours >= 18 && hours < 23) {
    session = "Evening Peak";
  } else if (hours >= 6 && hours < 16) {
    session = "Solar GDAM Generation";
  }

  return { block, timeWindow, session };
}

const BASE_TICKER_DATA: TickerItem[] = [
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
    subtext: "Slots 25-64",
  },
  {
    label: "RTM Gate Closure",
    value: "₹5.12/kWh",
    change: "+1.9%",
    trend: "up",
    subtext: "1-Hr Statutory",
  },
  {
    label: "Group Captive Solar PPA",
    value: "₹3.85/kWh",
    subtext: "0 CSS & 0 AS Landed",
    trend: "neutral",
  },
  {
    label: "National Grid Freq",
    value: "50.012 Hz",
    trend: "neutral",
    subtext: "IEGC Band (49.90-50.05)",
  },
  {
    label: "Solar REC Clearing",
    value: "₹1,200/Cert",
    change: "Normal",
    trend: "neutral",
    subtext: "IEX/PXIL Monthly",
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
  const [timeBlock, setTimeBlock] = useState({
    block: 37,
    timeWindow: "09:00–09:15 IST",
    session: "Solar GDAM Generation",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeBlock(getIstTimeBlock());
    }, 0);
    const interval = setInterval(() => {
      setTimeBlock(getIstTimeBlock());
    }, 30000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-[#F8FAFC] border-b border-gray-200 text-[#1C2C34] overflow-hidden select-none relative z-40">
      <div className="flex items-center">
        {/* Left Sticky Clock-Synchronized 96-Block Badge */}
        <div className="flex-shrink-0 bg-white px-3 sm:px-4 py-1.5 border-r border-gray-200 flex items-center space-x-2.5 z-10 shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
          </span>
          <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono font-bold text-[#1C2C34]">
            <span className="text-[#047857] font-black uppercase tracking-wider">
              BLOCK {timeBlock.block}/96
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-600 font-normal">
              {timeBlock.timeWindow}
            </span>
            <span className="hidden lg:inline px-1.5 py-0.2 rounded text-[9px] bg-slate-100 text-slate-700 border border-slate-200">
              {timeBlock.session}
            </span>
          </div>
        </div>

        {/* Marquee Container */}
        <div className="flex overflow-hidden whitespace-nowrap py-1">
          <div className="flex animate-ticker hover:[animation-play-state:paused] space-x-8 text-xs font-mono">
            {[...BASE_TICKER_DATA, ...BASE_TICKER_DATA].map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <span className="text-gray-500 font-semibold">{item.label}:</span>
                <span className="font-bold text-[#1C2C34] tabular-nums">{item.value}</span>
                {item.change && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                      item.trend === "down"
                        ? "text-emerald-700 bg-emerald-50"
                        : item.trend === "up"
                        ? "text-amber-700 bg-amber-50"
                        : "text-gray-600 bg-gray-100"
                    }`}
                  >
                    {item.change}
                  </span>
                )}
                {item.subtext && (
                  <span className="text-[10px] text-gray-400">({item.subtext})</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
