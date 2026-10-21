"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Activity,
  Zap,
  TrendingDown,
  Sun,
  Moon,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Calculator,
  ArrowRight,
} from "lucide-react";
import { playTelemetryTick, playBourseSuccess } from "@/lib/audio/switch-audio";

interface WaveformPreset {
  id: string;
  name: string;
  subtitle: string;
  anchors: [number, number, number, number]; // [Night, Morning, SolarDip, EveningPeak] in MW
}

const PRESETS: WaveformPreset[] = [
  {
    id: "continuous",
    name: "Continuous 3-Shift Heavy Industrial",
    subtitle: "Steel Furnaces, Chemical Continuous Reactors, Spinning Mills",
    anchors: [8.5, 9.2, 10.0, 9.0],
  },
  {
    id: "day-heavy",
    name: "Daytime Fabrication & Auto Ancillary",
    subtitle: "PEB Stamping, Tooling, CNC Machining Centers",
    anchors: [3.2, 7.5, 9.5, 4.0],
  },
  {
    id: "night-shifted",
    name: "Night-Shifted Melting & Cold Storage",
    subtitle: "Scrap Induction Furnaces, Sub-Zero Blast Freezers",
    anchors: [10.5, 5.0, 4.2, 3.8],
  },
];

export function InteractiveWaveformSculptor() {
  // 4 Anchors representing demand in MW across 24h
  // [0]: Night Valley (00:00 - 06:00)
  // [1]: Morning Ramp (06:00 - 10:00)
  // [2]: Solar Dip Peak (10:00 - 16:00)
  // [3]: Evening Peak (18:00 - 22:00)
  const [anchors, setAnchors] = useState<[number, number, number, number]>([7.5, 8.5, 9.8, 8.0]);
  const [discomTariff, setDiscomTariff] = useState<number>(8.85); // ₹/kWh
  const [isPlayingDay, setIsPlayingDay] = useState(false);
  const [currentSlotIndex, setCurrentSlotIndex] = useState(48); // Slot 48 = 12:00 noon

  // 96 Time-block interpolation
  const interpolatedBlocks = useMemo(() => {
    const blocks: {
      block: number;
      time: string;
      demandMw: number;
      solarMw: number;
      topnotchLanded: number;
      discomRate: number;
      savingsPerHour: number;
    }[] = [];

    const [night, morning, solarDip, evening] = anchors;

    for (let b = 1; b <= 96; b++) {
      const hour = (b - 1) / 4;
      const min = ((b - 1) % 4) * 15;
      const pad = (n: number) => n.toString().padStart(2, "0");
      const time = `${pad(Math.floor(hour))}:${pad(min)}`;

      // Smooth interpolation of demand
      let demand = night;
      if (hour >= 6 && hour < 10) {
        const factor = (hour - 6) / 4;
        demand = night + (morning - night) * factor;
      } else if (hour >= 10 && hour < 16) {
        const factor = (hour - 10) / 6;
        demand = morning + (solarDip - morning) * factor;
      } else if (hour >= 16 && hour < 20) {
        const factor = (hour - 16) / 4;
        demand = solarDip + (evening - solarDip) * factor;
      } else if (hour >= 20) {
        const factor = (hour - 20) / 4;
        demand = evening + (night - evening) * factor;
      }

      // Add slight realistic jitter
      demand = Math.max(1, Number((demand + Math.sin(b / 3) * 0.15).toFixed(2)));

      // Theoretical rooftop + offsite solar curve (Slots 26 to 70 = 06:30 to 17:30)
      let solarMw = 0;
      if (b >= 26 && b <= 70) {
        const progress = (b - 26) / 44;
        solarMw = Number((Math.sin(progress * Math.PI) * Math.min(demand * 0.85, 6.5)).toFixed(2));
      }

      // Dynamic landed tariff per block
      let topnotchLanded = 4.35; // Baseload
      if (solarMw > 0) {
        topnotchLanded = 3.65; // High solar discount
      } else if (b >= 73 && b <= 92) {
        topnotchLanded = 5.15; // Evening peak bourse rate
      } else if (b <= 24 || b >= 93) {
        topnotchLanded = 3.95; // Night valley discount
      }

      const savingsPerHour = Math.max(0, (discomTariff - topnotchLanded) * demand * 1000);

      blocks.push({
        block: b,
        time,
        demandMw: demand,
        solarMw,
        topnotchLanded,
        discomRate: discomTariff,
        savingsPerHour,
      });
    }

    return blocks;
  }, [anchors, discomTariff]);

  // Aggregate metrics
  const totalDailyMwh = useMemo(() => {
    return Number((interpolatedBlocks.reduce((acc, b) => acc + b.demandMw * 0.25, 0)).toFixed(1));
  }, [interpolatedBlocks]);

  const totalDailySolarMwh = useMemo(() => {
    return Number((interpolatedBlocks.reduce((acc, b) => acc + b.solarMw * 0.25, 0)).toFixed(1));
  }, [interpolatedBlocks]);

  const greenSharePct = Math.round((totalDailySolarMwh / totalDailyMwh) * 100);

  const blendedTopnotchTariff = useMemo(() => {
    const totalCost = interpolatedBlocks.reduce(
      (acc, b) => acc + b.demandMw * 0.25 * 1000 * b.topnotchLanded,
      0
    );
    return Number((totalCost / (totalDailyMwh * 1000)).toFixed(2));
  }, [interpolatedBlocks, totalDailyMwh]);

  const annualSavingsCr = useMemo(() => {
    const dailySavingsRupees = interpolatedBlocks.reduce(
      (acc, b) => acc + b.savingsPerHour * 0.25,
      0
    );
    return Number(((dailySavingsRupees * 365) / 10000000).toFixed(2));
  }, [interpolatedBlocks]);

  // 24h Day Animation Player
  useEffect(() => {
    if (!isPlayingDay) return;
    const interval = setInterval(() => {
      setCurrentSlotIndex((prev) => (prev + 1) % 96);
    }, 120);
    return () => clearInterval(interval);
  }, [isPlayingDay]);

  const activeSlot = interpolatedBlocks[currentSlotIndex] || interpolatedBlocks[48];

  const handleAnchorChange = (index: number, val: number) => {
    playTelemetryTick();
    setAnchors((prev) => {
      const next: [number, number, number, number] = [...prev];
      next[index] = val;
      return next;
    });
  };

  const handlePresetSelect = (preset: WaveformPreset) => {
    setAnchors([...preset.anchors]);
    playBourseSuccess();
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden space-y-8 font-sans">
      {/* Background Lighting Flare */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#F8BC26]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Strip */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive 60 FPS Dispatch Simulation</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            24-Hour 96-Block Factory Waveform Sculptor
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl leading-relaxed">
            Drag the shift demand anchors below to model your plant&apos;s custom load curve. The mathematical co-optimization solver recalculates landed exchange rates and multi-crore savings in real time.
          </p>
        </div>

        {/* Animation Day Player & Reset */}
        <div className="flex items-center space-x-3 bg-slate-800/80 p-2 rounded-2xl border border-slate-700 flex-shrink-0">
          <button
            type="button"
            onClick={() => setIsPlayingDay(!isPlayingDay)}
            className="px-4 py-2 rounded-xl bg-[#F8BC26] text-[#1C2C34] hover:bg-[#eab308] font-mono text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md active:scale-95"
          >
            {isPlayingDay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlayingDay ? "Pause 24h Clock" : "Simulate 24h Cycle"}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setAnchors([7.5, 8.5, 9.8, 8.0]);
              setCurrentSlotIndex(48);
            }}
            className="p-2 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Reset to default curve"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preset Profiles Selector */}
      <div className="relative z-10 space-y-2">
        <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block font-bold">
          Quick-Load Industrial Shift Profiles:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handlePresetSelect(preset)}
              className="p-3.5 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/70 hover:border-[#F8BC26] text-left transition-all group"
            >
              <div className="font-bold text-xs text-white group-hover:text-[#F8BC26] transition-colors">
                {preset.name}
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
                {preset.subtitle}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 4 Interactive Shift Sculpting Sliders */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-800/60 border border-slate-700">
        
        {/* Anchor 1: Night Valley */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 font-semibold flex items-center space-x-1.5">
              <Moon className="w-3.5 h-3.5 text-blue-400" />
              <span>Night Valley (00:00–06:00)</span>
            </span>
            <span className="font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
              {anchors[0]} MW
            </span>
          </div>
          <input
            type="range"
            min={1.0}
            max={25.0}
            step={0.5}
            value={anchors[0]}
            onChange={(e) => handleAnchorChange(0, Number(e.target.value))}
            className="w-full accent-blue-400"
          />
          <div className="text-[10px] text-slate-400 font-mono">Night Melting / Baseload</div>
        </div>

        {/* Anchor 2: Morning Ramp */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 font-semibold flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Morning Ramp (06:00–10:00)</span>
            </span>
            <span className="font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
              {anchors[1]} MW
            </span>
          </div>
          <input
            type="range"
            min={1.0}
            max={25.0}
            step={0.5}
            value={anchors[1]}
            onChange={(e) => handleAnchorChange(1, Number(e.target.value))}
            className="w-full accent-amber-400"
          />
          <div className="text-[10px] text-slate-400 font-mono">Shift 1 Production Start</div>
        </div>

        {/* Anchor 3: Solar Dip */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 font-semibold flex items-center space-x-1.5">
              <Sun className="w-3.5 h-3.5 text-[#F8BC26]" />
              <span>Solar Peak (10:00–16:00)</span>
            </span>
            <span className="font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
              {anchors[2]} MW
            </span>
          </div>
          <input
            type="range"
            min={1.0}
            max={25.0}
            step={0.5}
            value={anchors[2]}
            onChange={(e) => handleAnchorChange(2, Number(e.target.value))}
            className="w-full accent-[#F8BC26]"
          />
          <div className="text-[10px] text-slate-400 font-mono">Max GDAM Absorption</div>
        </div>

        {/* Anchor 4: Evening Peak */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 font-semibold flex items-center space-x-1.5">
              <Zap className="w-3.5 h-3.5 text-red-400" />
              <span>Evening Peak (18:00–22:00)</span>
            </span>
            <span className="font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
              {anchors[3]} MW
            </span>
          </div>
          <input
            type="range"
            min={1.0}
            max={25.0}
            step={0.5}
            value={anchors[3]}
            onChange={(e) => handleAnchorChange(3, Number(e.target.value))}
            className="w-full accent-red-400"
          />
          <div className="text-[10px] text-slate-400 font-mono">ToD Peak Tariff Exposure</div>
        </div>

      </div>

      {/* SVG 96-Block Waveform Visualization Canvas */}
      <div className="relative z-10 bg-slate-950/80 rounded-2xl border border-slate-800 p-5 space-y-4">
        <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2">
          <span className="text-slate-400">
            Active Scrubber: Block #{activeSlot.block} ({activeSlot.time} IST)
          </span>
          <div className="flex items-center space-x-4">
            <span className="text-white font-bold">
              Factory Drawl: <strong className="text-emerald-400">{activeSlot.demandMw} MW</strong>
            </span>
            <span className="text-white font-bold">
              Solar Output: <strong className="text-[#F8BC26]">{activeSlot.solarMw} MW</strong>
            </span>
          </div>
        </div>

        {/* Interactive SVG Curve */}
        <div className="relative h-48 w-full overflow-hidden">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 96 100">
            {/* Grid Lines */}
            <line x1="0" y1="25" x2="96" y2="25" stroke="#334155" strokeWidth="0.5" strokeDasharray="1 1" />
            <line x1="0" y1="50" x2="96" y2="50" stroke="#334155" strokeWidth="0.5" strokeDasharray="1 1" />
            <line x1="0" y1="75" x2="96" y2="75" stroke="#334155" strokeWidth="0.5" strokeDasharray="1 1" />

            {/* Time boundaries */}
            <rect x="25" y="0" width="45" height="100" fill="rgba(248, 188, 38, 0.06)" />
            <rect x="72" y="0" width="20" height="100" fill="rgba(239, 68, 68, 0.08)" />

            {/* Solar Generation Filled Curve */}
            <path
              d={`M 26 100 ${interpolatedBlocks
                .filter((b) => b.block >= 26 && b.block <= 70)
                .map((b) => `L ${b.block} ${100 - (b.solarMw / 12) * 90}`)
                .join(" ")} L 70 100 Z`}
              fill="rgba(248, 188, 38, 0.25)"
            />

            {/* Demand Waveform Path */}
            <path
              d={`M 1 ${100 - (interpolatedBlocks[0].demandMw / 25) * 85} ${interpolatedBlocks
                .map((b) => `L ${b.block} ${100 - (b.demandMw / 25) * 85}`)
                .join(" ")}`}
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
            />

            {/* Active Current Slot Scrubber Line */}
            <line
              x1={activeSlot.block}
              y1="0"
              x2={activeSlot.block}
              y2="100"
              stroke="#F8BC26"
              strokeWidth="1.5"
            />
            <circle
              cx={activeSlot.block}
              cy={100 - (activeSlot.demandMw / 25) * 85}
              r="3.5"
              fill="#F8BC26"
            />
          </svg>
        </div>

        {/* Bottom Time Band Markers */}
        <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-1">
          <span>00:00 (Night Off-Peak)</span>
          <span>06:00 (Ramp)</span>
          <span>12:00 (Solar Peak)</span>
          <span>18:00 (Evening ToD)</span>
          <span>24:00 (Night Valley)</span>
        </div>
      </div>

      {/* Consolidated Financial & Tariff Output Strip */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700">
          <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
            Daily Factory Demand
          </span>
          <span className="text-2xl font-black text-white font-mono mt-1 block">
            {totalDailyMwh} <span className="text-xs text-slate-400 font-normal">MWh/day</span>
          </span>
          <span className="text-[11px] font-mono text-slate-400 mt-1 block">
            Peak Drawl: {Math.max(...anchors)} MW
          </span>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700">
          <span className="text-[10px] font-mono uppercase text-[#F8BC26] block font-bold">
            Clean Energy Share
          </span>
          <span className="text-2xl font-black text-[#F8BC26] font-mono mt-1 block">
            {greenSharePct}% <span className="text-xs text-slate-400 font-normal">Sourced</span>
          </span>
          <span className="text-[11px] font-mono text-emerald-400 mt-1 block">
            {totalDailySolarMwh} MWh Solar Absorption
          </span>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700">
          <span className="text-[10px] font-mono uppercase text-emerald-400 block font-bold">
            Blended Landed Cost
          </span>
          <span className="text-2xl font-black text-emerald-400 font-mono mt-1 block">
            ₹{blendedTopnotchTariff} <span className="text-xs text-slate-400 font-normal">/kWh</span>
          </span>
          <span className="text-[11px] font-mono text-slate-400 line-through mt-1 block">
            DISCOM: ₹{discomTariff.toFixed(2)}/kWh
          </span>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/40">
          <span className="text-[10px] font-mono uppercase text-emerald-300 block font-bold">
            Annual Verified Savings
          </span>
          <span className="text-2xl sm:text-3xl font-black text-white font-mono mt-1 block">
            ₹{annualSavingsCr} <span className="text-xs text-emerald-400 font-normal">Cr/yr</span>
          </span>
          <span className="text-[11px] font-mono text-emerald-400 mt-1 block">
            -{(Math.max(0, discomTariff - blendedTopnotchTariff) / discomTariff * 100).toFixed(1)}% Cost Reduction
          </span>
        </div>

      </div>

    </div>
  );
}
