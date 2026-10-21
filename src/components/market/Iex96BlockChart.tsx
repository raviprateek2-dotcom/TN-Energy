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
} from "recharts";
import { IEX_96_BLOCKS_DATA, Iex96TimeBlock } from "@/lib/constants/market-blocks-seed";
import { Sun, Clock } from "lucide-react";
import { DatePickerBranded } from "@/components/ui/DatePickerBranded";

export interface ChartDataPoint extends Iex96TimeBlock {
  solarOutputPct: number;
  solarGenerationKwhEquivalent: number;
}

export function Iex96BlockChart() {
  const [showDam, setShowDam] = useState(true);
  const [showGdam, setShowGdam] = useState(true);
  const [showRtm, setShowRtm] = useState(true);
  const [showSolar, setShowSolar] = useState(true);
  const [selectedDate, setSelectedDate] = useState("2026-10-21");

  // Mobile active scrubber slot
  const [activeSlotIndex, setActiveSlotIndex] = useState<number>(51); // Slot 52 (12:45 - 13:00)

  // Augment dataset with Solar Generation Bell Curve
  const chartData = useMemo(() => {
    return IEX_96_BLOCKS_DATA.map((block) => {
      const b = block.blockNumber;
      let solarPct = 0;
      if (b >= 26 && b <= 72) {
        const progress = (b - 26) / 46;
        solarPct = Math.round(Math.sin(progress * Math.PI) * 98);
      }
      return {
        ...block,
        solarOutputPct: solarPct,
        solarGenerationKwhEquivalent: Number(((solarPct / 100) * 8.5).toFixed(2)),
      };
    });
  }, []);

  const activeSlot = chartData[activeSlotIndex] || chartData[51];

  return (
    <div className="bg-white border border-gray-200/90 rounded-3xl p-5 sm:p-7 shadow-xl relative">
      {/* Top Header & Toggles */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
            <h3 className="text-base sm:text-lg font-bold text-[#1C2C34] tracking-tight">
              IEX 96-Time-Block Real-Time Curve vs. Onsite Solar
            </h3>
          </div>
          <p className="text-xs text-gray-500 font-mono mt-0.5">
            Full 24-Hour Dispatch Matrix (15-Minute Intervals) | Prices in ₹/kWh & Solar Generation %
          </p>
        </div>

        {/* Date Picker + Curve Visibility Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <DatePickerBranded
            value={selectedDate}
            onChange={setSelectedDate}
            label="Trading Date"
          />

          <button
            onClick={() => setShowDam(!showDam)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 border ${
              showDam
                ? "bg-blue-50 text-blue-700 border-blue-300 shadow-2xs"
                : "bg-gray-50 text-gray-400 border-gray-200"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
            <span>DAM (Day-Ahead)</span>
          </button>

          <button
            onClick={() => setShowGdam(!showGdam)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 border ${
              showGdam
                ? "bg-emerald-50 text-emerald-700 border-emerald-300 shadow-2xs"
                : "bg-gray-50 text-gray-400 border-gray-200"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span>GDAM (Green)</span>
          </button>

          <button
            onClick={() => setShowRtm(!showRtm)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 border ${
              showRtm
                ? "bg-purple-50 text-purple-700 border-purple-300 shadow-2xs"
                : "bg-gray-50 text-gray-400 border-gray-200"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
            <span>RTM (Real-Time)</span>
          </button>

          <button
            onClick={() => setShowSolar(!showSolar)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 border ${
              showSolar
                ? "bg-amber-50 text-amber-700 border-amber-300 shadow-2xs"
                : "bg-gray-50 text-gray-400 border-gray-200"
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Solar Curve</span>
          </button>
        </div>
      </div>

      {/* Crosshair Scrubber Pill */}
      <div className="my-3 p-3.5 bg-gray-50/80 border border-gray-200/80 rounded-2xl flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#1C2C34]">
          <Clock className="w-4 h-4 text-[#F59E0B]" />
          <span className="font-bold text-[#1C2C34]">
            Slot {activeSlot.blockNumber}
          </span>
          <span className="text-gray-500">({activeSlot.timeLabel})</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-gray-200 font-bold text-gray-700">
            {activeSlot.period}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <span className="text-blue-700">
            DAM: <strong className="text-[#1C2C34] tabular-nums">₹{activeSlot.damKwh.toFixed(2)}/kWh</strong>
          </span>
          <span className="text-emerald-700">
            GDAM: <strong className="text-[#1C2C34] tabular-nums">₹{activeSlot.gdamKwh.toFixed(2)}/kWh</strong>
          </span>
          <span className="text-purple-700">
            RTM: <strong className="text-[#1C2C34] tabular-nums">₹{activeSlot.rtmKwh.toFixed(2)}/kWh</strong>
          </span>
          <span className="text-amber-700 font-bold">
            Solar: <strong className="text-[#1C2C34] tabular-nums">{activeSlot.solarOutputPct}% Peak</strong>
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
            <defs>
              <linearGradient id="solarGradientLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            
            <XAxis
              dataKey="startTime"
              stroke="#94A3B8"
              tickLine={false}
              interval={7}
              tick={{ fill: "#64748B", fontSize: 11, fontFamily: "monospace" }}
            />
            
            {/* Left Y-Axis: Price in ₹/kWh */}
            <YAxis
              yAxisId="price"
              stroke="#94A3B8"
              domain={[0, 10.5]}
              ticks={[0, 2, 4, 6, 8, 10]}
              tick={{ fill: "#64748B", fontSize: 11, fontFamily: "monospace" }}
              tickFormatter={(val) => `₹${val}`}
            />

            {/* Right Y-Axis: Solar Generation % */}
            <YAxis
              yAxisId="solar"
              orientation="right"
              stroke="#F59E0B"
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tick={{ fill: "#D97706", fontSize: 10, fontFamily: "monospace" }}
              tickFormatter={(val) => `${val}%`}
            />

            <Tooltip content={<CustomLightTooltip />} />

            {/* Solar Generation Area Bell Curve */}
            {showSolar && (
              <Area
                yAxisId="solar"
                type="monotone"
                dataKey="solarOutputPct"
                name="Solar Output %"
                fill="url(#solarGradientLight)"
                stroke="#F59E0B"
                strokeWidth={2}
                fillOpacity={0.3}
              />
            )}

            {/* DAM Line */}
            {showDam && (
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="damKwh"
                name="DAM (₹/kWh)"
                stroke="#0284C7"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: "#0284C7" }}
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
                stroke="#7C3AED"
                strokeWidth={1.8}
                dot={false}
                activeDot={{ r: 5, fill: "#7C3AED" }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function CustomLightTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload?: ChartDataPoint }>;
}) {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0]?.payload as ChartDataPoint;
  if (!data) return null;

  return (
    <div className="bg-white/98 backdrop-blur-md border-2 border-[#F8BC26] rounded-2xl p-4 shadow-xl text-xs space-y-2 z-50 min-w-[210px]">
      <div className="border-b border-gray-100 pb-2">
        <span className="font-mono text-[10px] uppercase font-bold text-gray-500">
          Slot {data.blockNumber} · {data.timeLabel}
        </span>
        <p className="font-mono text-xs font-bold text-[#1C2C34]">{data.period}</p>
      </div>

      <div className="space-y-1.5 font-mono text-xs">
        <div className="flex items-center justify-between">
          <span className="text-blue-700 font-medium">DAM Clearing:</span>
          <span className="font-bold text-[#1C2C34] tabular-nums">₹{data.damKwh.toFixed(2)}/kWh</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-emerald-700 font-medium">GDAM Renewable:</span>
          <span className="font-bold text-[#1C2C34] tabular-nums">₹{data.gdamKwh.toFixed(2)}/kWh</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-purple-700 font-medium">RTM Balancing:</span>
          <span className="font-bold text-[#1C2C34] tabular-nums">₹{data.rtmKwh.toFixed(2)}/kWh</span>
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 pt-1.5">
          <span className="text-amber-700 font-bold">Solar Bell Curve:</span>
          <span className="font-bold text-amber-900 tabular-nums">{data.solarOutputPct}%</span>
        </div>
      </div>
    </div>
  );
}
