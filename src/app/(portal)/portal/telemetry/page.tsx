"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Activity,
  ChevronLeft,
  Cpu,
  Radio,
  Gauge,
  ShieldCheck,
  Clock,
  Zap,
  AlertTriangle,
  RefreshCw,
  Sliders,
  CheckCircle2,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { IEX_96_BLOCKS_DATA } from "@/lib/constants/market-blocks-seed";

interface IntervalTelemetryPoint {
  block: number;
  time: string;
  activePowerMw: number;
  reactiveMvar: number;
  powerFactor: number;
  frequencyHz: number;
  status: "Normal" | "Peak Drawl" | "Solar Injection";
}

// Generate a realistic 96-block telemetry profile for a 12.5 MVA industrial plant
function generatePlantTelemetry(): IntervalTelemetryPoint[] {
  return IEX_96_BLOCKS_DATA.map((b) => {
    // Baseload ~10.2 MW with solar dip in grid drawl during hours 11:00-16:00
    const isSolar = b.blockNumber >= 44 && b.blockNumber <= 64;
    const isEveningPeak = b.blockNumber >= 73 && b.blockNumber <= 92;

    const baseMw = isSolar ? 6.4 : isEveningPeak ? 11.8 : 10.2;
    const jitter = Math.sin(b.blockNumber * 0.4) * 0.4;
    const activePowerMw = Number((baseMw + jitter).toFixed(2));

    // Reactive power with APFC tuning (0.995 to 0.999 PF)
    const pf = Number((0.996 + Math.cos(b.blockNumber * 0.3) * 0.002).toFixed(3));
    const reactiveMvar = Number((activePowerMw * Math.tan(Math.acos(pf))).toFixed(2));

    // Grid frequency hovering around 50.00 Hz (CERC standard 49.90 to 50.05 Hz)
    const frequencyHz = Number(
      (50.012 + Math.sin(b.blockNumber * 0.25) * 0.045).toFixed(3)
    );

    return {
      block: b.blockNumber,
      time: b.startTime,
      activePowerMw,
      reactiveMvar,
      powerFactor: pf,
      frequencyHz,
      status: isSolar ? "Solar Injection" : isEveningPeak ? "Peak Drawl" : "Normal",
    };
  });
}

export default function TelemetryPage() {
  const [telemetry, setTelemetry] = useState<IntervalTelemetryPoint[]>(generatePlantTelemetry());
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number>(60); // Block 61 (15:00)
  const [liveFreq, setLiveFreq] = useState<number>(50.018);
  const [lastHeartbeat, setLastHeartbeat] = useState<string>("Just now");

  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate live frequency micro-fluctuations
      setLiveFreq(Number((50.01 + (Math.random() - 0.48) * 0.03).toFixed(3)));
      setLastHeartbeat("1s ago");
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const currentBlock = telemetry[selectedBlockIndex] || telemetry[0];

  return (
    <main className="min-h-screen bg-grid-navy-950 text-white">
      {/* Console Header */}
      <div className="border-b border-grid-slate-800 bg-grid-navy-900/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link
              href="/portal/dashboard"
              className="text-grid-slate-500 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-purple-400" />
              <span className="text-white font-extrabold text-sm">ABT 0.2s SEM Telemetry Console</span>
              <span className="text-[10px] font-mono bg-purple-500/10 border border-purple-500/30 text-purple-400 px-2 py-0.5 rounded">
                CEA 2006 / SLDC NABL
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-xs font-mono">
            <div className="flex items-center space-x-1.5 text-grid-emerald-400">
              <span className="w-2 h-2 rounded-full bg-grid-emerald-400 animate-pulse" />
              <span>Optical AMR Sync: {lastHeartbeat}</span>
            </div>
            <span className="text-grid-slate-600 hidden sm:inline">|</span>
            <span className="text-grid-slate-400 hidden sm:inline">Meter SN: SEC-02S-9481-UP</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Real-time Substation Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Frequency Gauge */}
          <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-grid-slate-500">
                Grid Frequency (NR)
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-grid-cyan-400 animate-pulse" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-grid-cyan-400 font-mono tabular-nums">
              {liveFreq}
              <span className="text-xs text-grid-slate-500 font-sans ml-1">Hz</span>
            </div>
            <div className="text-[11px] font-mono text-grid-slate-400 mt-1 flex items-center justify-between">
              <span>Band: 49.90–50.05 Hz</span>
              <span className="text-grid-emerald-400 font-bold">DSM Safe</span>
            </div>
          </div>

          {/* Instantaneous Power Factor */}
          <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="text-[10px] font-mono uppercase tracking-wider text-grid-slate-500 mb-1">
              Active Power Factor
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-grid-emerald-400 font-mono tabular-nums">
              {currentBlock.powerFactor}
              <span className="text-xs text-grid-slate-500 font-sans ml-1">Lag</span>
            </div>
            <div className="text-[11px] font-mono text-grid-slate-400 mt-1">
              Target: 0.995 • +0.5% Incentive
            </div>
          </div>

          {/* Active Demand Drawl */}
          <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="text-[10px] font-mono uppercase tracking-wider text-grid-slate-500 mb-1">
              Active Power Influx
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              {currentBlock.activePowerMw}
              <span className="text-xs text-grid-slate-500 font-sans ml-1">MW</span>
            </div>
            <div className="text-[11px] font-mono text-grid-slate-400 mt-1">
              Sanctioned CD: 12.5 MVA (88.4%)
            </div>
          </div>

          {/* Reactive Power (MVAr) */}
          <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="text-[10px] font-mono uppercase tracking-wider text-grid-slate-500 mb-1">
              Reactive Energy
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono tabular-nums">
              {currentBlock.reactiveMvar}
              <span className="text-xs text-grid-slate-500 font-sans ml-1">MVAr</span>
            </div>
            <div className="text-[11px] font-mono text-grid-slate-400 mt-1">
              APFC Step: 14/16 Active
            </div>
          </div>
        </div>

        {/* 96-Block Live Power Influx & Grid Frequency Chart */}
        <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-grid-slate-800">
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-white flex items-center space-x-2">
                <Activity className="w-5 h-5 text-purple-400" />
                <span>96-Time-Block Demand Curve &amp; Grid Frequency Profile</span>
              </h2>
              <p className="text-xs font-mono text-grid-slate-400 mt-0.5">
                Active load profile (MW) vs. Inter-state Northern Regional Grid Frequency (Hz)
              </p>
            </div>

            <div className="flex items-center space-x-3 text-xs font-mono">
              <span className="inline-flex items-center space-x-1 text-grid-cyan-400">
                <span className="w-2.5 h-0.5 bg-grid-cyan-400 inline-block" />
                <span>Active Load (MW)</span>
              </span>
              <span className="inline-flex items-center space-x-1 text-purple-400">
                <span className="w-2.5 h-0.5 bg-purple-400 inline-block" />
                <span>Grid Frequency (Hz)</span>
              </span>
            </div>
          </div>

          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={telemetry} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis
                  dataKey="block"
                  stroke="#64748B"
                  tick={{ fontSize: 10, fontFamily: "monospace" }}
                  interval={7}
                  tickFormatter={(b) => `B${b}`}
                />
                <YAxis
                  yAxisId="left"
                  stroke="#06B6D4"
                  tick={{ fontSize: 10, fontFamily: "monospace" }}
                  tickFormatter={(val) => `${val} MW`}
                  domain={[4, 14]}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#A855F7"
                  tick={{ fontSize: 10, fontFamily: "monospace" }}
                  tickFormatter={(val) => `${val.toFixed(2)} Hz`}
                  domain={[49.85, 50.15]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0A0F1D",
                    borderColor: "#334155",
                    borderRadius: "0.75rem",
                    fontSize: "0.75rem",
                    fontFamily: "monospace",
                    color: "#FFFFFF",
                  }}
                  formatter={(val: unknown, name: unknown) => {
                    const formatted = typeof val === "number" ? val.toFixed(3) : String(val ?? "");
                    return [formatted, String(name ?? "")];
                  }}
                  labelFormatter={(b) => {
                    const point = telemetry.find((t) => t.block === b);
                    return `Block ${b} (${point ? point.time : ""})`;
                  }}
                />
                <ReferenceLine yAxisId="right" y={50.05} stroke="#EF4444" strokeDasharray="3 3" label={{ value: "DSM High (50.05)", fill: "#EF4444", fontSize: 10 }} />
                <ReferenceLine yAxisId="right" y={49.90} stroke="#EF4444" strokeDasharray="3 3" label={{ value: "DSM Low (49.90)", fill: "#EF4444", fontSize: 10 }} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="activePowerMw"
                  name="Plant Active Load (MW)"
                  stroke="#06B6D4"
                  strokeWidth={2.5}
                  dot={false}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="frequencyHz"
                  name="Grid Frequency (Hz)"
                  stroke="#A855F7"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Interactive Block Scrubber */}
          <div className="pt-4 border-t border-grid-slate-800">
            <div className="flex items-center justify-between text-xs font-mono text-grid-slate-400 mb-2">
              <span className="flex items-center space-x-1.5">
                <Sliders className="w-3.5 h-3.5 text-grid-cyan-400" />
                <span>15-Minute Block Scrubber:</span>
                <strong className="text-white">
                  Block {currentBlock.block} ({currentBlock.time} IST)
                </strong>
              </span>
              <span className="text-[11px] text-grid-slate-500">
                Active Drawl: {currentBlock.activePowerMw} MW • PF: {currentBlock.powerFactor}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="95"
              value={selectedBlockIndex}
              onChange={(e) => setSelectedBlockIndex(parseInt(e.target.value))}
              className="w-full accent-grid-cyan-500 h-1.5 bg-grid-navy-950 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Meter Hardware Health & SLDC Calibration Status */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Meter Specification & Calibration */}
          <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-white font-extrabold text-sm flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-grid-emerald-400" />
              <span>Special Energy Meter (SEM) Health &amp; Calibration</span>
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between py-2 border-b border-grid-slate-800">
                <span className="text-grid-slate-400">Main Meter Specification:</span>
                <span className="text-white font-bold">Class 0.2s Accuracy (CEA 2006 Reg)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-grid-slate-800">
                <span className="text-grid-slate-400">Check Meter Drift:</span>
                <span className="text-grid-emerald-400 font-bold">0.02% (Tolerance &lt;0.10%)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-grid-slate-800">
                <span className="text-grid-slate-400">NABL Calibration Validity:</span>
                <span className="text-white">Valid till 14 Dec 2026 (NABL Lab #941)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-grid-slate-800">
                <span className="text-grid-slate-400">CT/PT Potential Ratio:</span>
                <span className="text-white font-bold">33 kV / √3 : 110 V / √3</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-grid-slate-400">Physical Sealing Record:</span>
                <span className="text-grid-emerald-400 font-bold">UP SLDC Lead Seal #UP-78190</span>
              </div>
            </div>
          </div>

          {/* SLDC SCADA Telemetry Gateway */}
          <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-white font-extrabold text-sm flex items-center space-x-2">
              <Radio className="w-4 h-4 text-grid-cyan-400" />
              <span>SLDC &amp; NRLDC Real-Time Telemetry Link</span>
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between py-2 border-b border-grid-slate-800">
                <span className="text-grid-slate-400">Protocol &amp; Carrier:</span>
                <span className="text-white font-bold">IEC 60870-5-104 via Dual OPGW</span>
              </div>
              <div className="flex justify-between py-2 border-b border-grid-slate-800">
                <span className="text-grid-slate-400">SLDC Polling Interval:</span>
                <span className="text-grid-cyan-400 font-bold">4-Second Telemetry / 15-Min Energy</span>
              </div>
              <div className="flex justify-between py-2 border-b border-grid-slate-800">
                <span className="text-grid-slate-400">Gateway Packet Loss:</span>
                <span className="text-grid-emerald-400 font-bold">0.00% (Last 24 Hours)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-grid-slate-800">
                <span className="text-grid-slate-400">NOC Escalation Channel:</span>
                <span className="text-white">Topnotch 24x7 NOC Desk (+91 7408318214)</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-grid-slate-400">Last DSM Schedule Audit:</span>
                <span className="text-grid-emerald-400 font-bold">Zero Non-Compliance Notice</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
