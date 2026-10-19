"use client";

import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { IEX_96_BLOCKS_DATA, Iex96TimeBlock } from "@/lib/constants/market-blocks-seed";
import { Sun, TrendingUp, Zap, Clock, ShieldAlert, BarChart2 } from "lucide-react";

export interface ChartDataPoint extends Iex96TimeBlock {
  solarOutputPct: number; // 0 to 100%
  solarGenerationKwhEquivalent: number;
}

export function Iex96BlockChart() {
  const [showDam, setShowDam] = useState(true);
  const [showGdam, setShowGdam] = useState(true);
  const [showRtm, setShowRtm] = useState(true);
  const [showSolar, setShowSolar] = useState(true);

  // Mobile active scrubber slot
  const [activeSlotIndex, setActiveSlotIndex] = useState<number>(51); // Default Slot 52 (12:45 - 13:00)

  // Augment dataset with Solar Generation Bell Curve
  const chartData = useMemo(() => {
    return IEX_96_BLOCKS_DATA.map((block) => {
      const b = block.blockNumber;
      let solarPct = 0;
      if (b >= 26 && b <= 72) {
        // Generates from ~06:30 to 18:00, peaking at slot 49-51 (12:15 - 12:45)
        const progress = (b - 26) / 46;
        solarPct = Math.round(Math.sin(progress * Math.PI) * 98);
      }
      return {
        ...block,
        solarOutputPct: solarPct,
        solarGenerationKwhEquivalent: Number(((solarPct / 100) * 8.5).toFixed(2)), // Scale for dual Y-axis
      };
    });
  }, []);

  const activeSlot = chartData[activeSlotIndex] || chartData[51];

  return (
    <div className="bg-grid-navy-950 border border-grid-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl relative">
      {/* Top Header & Toggles */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-grid-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-grid-emerald-400 animate-ping" />
            <h3 className="text-base sm:text-lg font-bold text-white font-sans flex items-center">
              IEX 96-Time-Block Real-Time Curve vs. Onsite Solar
            </h3>
          </div>
          <p className="text-xs text-grid-slate-400 font-mono mt-0.5">
            Full 24-Hour Dispatch Matrix (15-Minute Intervals) | Prices in ₹/kWh & Solar Generation %
          </p>
        </div>

        {/* Curve Visibility Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowDam(!showDam)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1.5 border ${
              showDam
                ? "bg-grid-cyan-500/20 text-grid-cyan-300 border-grid-cyan-500/40"
                : "bg-grid-navy-900 text-grid-slate-500 border-grid-slate-800"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-grid-cyan-400" />
            <span>DAM (Day-Ahead)</span>
          </button>

          <button
            onClick={() => setShowGdam(!showGdam)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1.5 border ${
              showGdam
                ? "bg-grid-emerald-500/20 text-grid-emerald-300 border-grid-emerald-500/40"
                : "bg-grid-navy-900 text-grid-slate-500 border-grid-slate-800"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-grid-emerald-400" />
            <span>GDAM (Green)</span>
          </button>

          <button
            onClick={() => setShowRtm(!showRtm)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1.5 border ${
              showRtm
                ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                : "bg-grid-navy-900 text-grid-slate-500 border-grid-slate-800"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span>RTM (Real-Time)</span>
          </button>

          <button
            onClick={() => setShowSolar(!showSolar)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1.5 border ${
              showSolar
                ? "bg-grid-amber-500/20 text-grid-amber-300 border-grid-amber-500/40"
                : "bg-grid-navy-900 text-grid-slate-500 border-grid-slate-800"
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-grid-amber-400" />
            <span>Solar Bell Curve</span>
          </button>
        </div>
      </div>

      {/* Sticky Mobile/Desktop Crosshair Scrubber Pill */}
      <div className="my-3 p-3 bg-grid-navy-900/90 border border-grid-slate-700/80 rounded-xl flex flex-wrap items-center justify-between gap-2 shadow-inner">
        <div className="flex items-center space-x-2 text-xs font-mono text-white">
          <Clock className="w-4 h-4 text-grid-cyan-400" />
          <span className="font-bold text-grid-emerald-400">
            Slot {activeSlot.blockNumber}
          </span>
          <span className="text-grid-slate-400">({activeSlot.timeLabel})</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-grid-navy-950 border border-grid-slate-800 text-grid-slate-300">
            {activeSlot.period}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <span className="text-grid-cyan-300">
            DAM: <strong className="text-white tabular-nums">₹{activeSlot.damKwh.toFixed(2)}/kWh</strong>
          </span>
          <span className="text-grid-emerald-400">
            GDAM: <strong className="text-white tabular-nums">₹{activeSlot.gdamKwh.toFixed(2)}/kWh</strong>
          </span>
          <span className="text-purple-300">
            RTM: <strong className="text-white tabular-nums">₹{activeSlot.rtmKwh.toFixed(2)}/kWh</strong>
          </span>
          <span className="text-grid-amber-400 font-bold">
            Solar: <strong className="text-white tabular-nums">{activeSlot.solarOutputPct}% Peak</strong>
          </span>
        </div>
      </div>

      {/* Main Recharts Container */}
      <div className="w-full h-80 sm:h-96 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            onMouseMove={(e) => {
              if (e && typeof e.activeTooltipIndex === "number") {
                setActiveSlotIndex(e.activeTooltipIndex);
              }
            }}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
            
            <XAxis
              dataKey="startTime"
              stroke="#64748B"
              tickLine={false}
              interval={7} // Show every 2 hours
              tick={{ fill: "#94A3B8", fontSize: 11, fontFamily: "monospace" }}
            />
            
            {/* Left Y-Axis: Price in ₹/kWh */}
            <YAxis
              yAxisId="price"
              stroke="#64748B"
              domain={[0, 10.5]}
              ticks={[0, 2, 4, 6, 8, 10]}
              tick={{ fill: "#94A3B8", fontSize: 11, fontFamily: "monospace" }}
              tickFormatter={(val) => `₹${val}`}
            />

            {/* Right Y-Axis: Solar Generation % */}
            <YAxis
              yAxisId="solar"
              orientation="right"
              stroke="#F59E0B"
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tick={{ fill: "#F59E0B", fontSize: 10, fontFamily: "monospace" }}
              tickFormatter={(val) => `${val}%`}
            />

            <Tooltip content={<CustomEnterpriseTooltip />} />

            {/* Solar Generation Area Bell Curve */}
            {showSolar && (
              <Area
                yAxisId="solar"
                type="monotone"
                dataKey="solarOutputPct"
                name="Solar Output %"
                fill="url(#solarGradient)"
                stroke="#F59E0B"
                strokeWidth={2}
                fillOpacity={0.25}
              />
            )}

            {/* DAM Line */}
            {showDam && (
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="damKwh"
                name="DAM (₹/kWh)"
                stroke="#06B6D4"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: "#06B6D4" }}
              />
            )}

            {/* GDAM Line */}
            {showGdam && (
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="gdamKwh"
                name="GDAM (₹/kWh)"
                stroke="#10B981"
                strokeWidth={2}
                dot={false}
                strokeDasharray="4 2"
                activeDot={{ r: 5, fill: "#10B981" }}
              />
            )}

            {/* RTM Line */}
            {showRtm && (
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="rtmKwh"
                name="RTM (₹/kWh)"
                stroke="#A855F7"
                strokeWidth={1.8}
                dot={false}
                activeDot={{ r: 5, fill: "#A855F7" }}
              />
            )}

            {/* Solar Gradient Def */}
            <defs>
              <linearGradient id="solarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
              </linearGradient>
            </defs>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Mobile Touch Scrub Range Slider */}
      <div className="mt-4 pt-3 border-t border-grid-slate-800 block md:hidden">
        <label htmlFor="slot-scrubber" className="flex justify-between text-[11px] font-mono text-grid-slate-400 mb-1">
          <span>Touch Scrubber (Slot {activeSlotIndex + 1} of 96)</span>
          <span className="text-grid-cyan-400">{activeSlot.startTime}</span>
        </label>
        <input
          id="slot-scrubber"
          type="range"
          min="0"
          max="95"
          value={activeSlotIndex}
          onChange={(e) => setActiveSlotIndex(Number(e.target.value))}
          className="w-full accent-grid-emerald-500 h-2 bg-grid-navy-800 rounded-lg cursor-pointer"
        />
      </div>

      {/* Legend & Period Highlights */}
      <div className="mt-4 pt-3 border-t border-grid-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
        <div className="p-2 rounded bg-grid-navy-900 border border-grid-slate-800">
          <span className="text-[10px] text-grid-slate-400 block">Night Valley (00-06h)</span>
          <span className="text-grid-cyan-300 font-bold">~₹3.80/kWh Base</span>
        </div>
        <div className="p-2 rounded bg-grid-navy-900 border border-grid-slate-800">
          <span className="text-[10px] text-grid-slate-400 block">Solar Slot (11-16h)</span>
          <span className="text-grid-emerald-400 font-bold">~₹2.90/kWh Dip</span>
        </div>
        <div className="p-2 rounded bg-grid-navy-900 border border-grid-slate-800">
          <span className="text-[10px] text-grid-slate-400 block">Peak Hours (18-22h)</span>
          <span className="text-grid-amber-400 font-bold">₹8.50 - ₹9.98/kWh</span>
        </div>
        <div className="p-2 rounded bg-grid-navy-900 border border-grid-slate-800">
          <span className="text-[10px] text-grid-slate-400 block">Regulatory Cap</span>
          <span className="text-grid-red-400 font-bold">₹10.00/kWh CERC</span>
        </div>
      </div>
    </div>
  );
}

interface TooltipPayloadItem {
  payload: ChartDataPoint;
  [key: string]: unknown;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

// Custom Tooltip with Tabular Figure Alignment
function CustomEnterpriseTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload;

  return (
    <div className="bg-grid-navy-900/98 border border-grid-slate-700 p-3 rounded-xl shadow-2xl text-xs font-mono backdrop-blur-md">
      <div className="text-white font-bold border-b border-grid-slate-800 pb-1.5 mb-2 flex justify-between items-center">
        <span>Slot {data.blockNumber}: {data.timeLabel}</span>
        <span className="text-[10px] font-sans px-1.5 py-0.5 rounded bg-grid-slate-800 text-grid-slate-300">
          {data.period}
        </span>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between space-x-4">
          <span className="text-grid-cyan-400">DAM MCP:</span>
          <span className="text-white font-bold tabular-nums">
            ₹{data.damKwh.toFixed(2)}/kWh ({data.damMwh} ₹/MWh)
          </span>
        </div>
        <div className="flex justify-between space-x-4">
          <span className="text-grid-emerald-400">GDAM MCP:</span>
          <span className="text-white font-bold tabular-nums">
            ₹{data.gdamKwh.toFixed(2)}/kWh
          </span>
        </div>
        <div className="flex justify-between space-x-4">
          <span className="text-purple-400">RTM MCP:</span>
          <span className="text-white font-bold tabular-nums">
            ₹{data.rtmKwh.toFixed(2)}/kWh
          </span>
        </div>
        <div className="flex justify-between space-x-4 border-t border-grid-slate-800 pt-1 mt-1">
          <span className="text-grid-amber-400 flex items-center">
            <Sun className="w-3 h-3 mr-1" /> Solar Output:
          </span>
          <span className="text-grid-amber-300 font-bold tabular-nums">
            {data.solarOutputPct}% Peak
          </span>
        </div>
      </div>
    </div>
  );
}
