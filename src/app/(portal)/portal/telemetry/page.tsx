"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Activity,
  ChevronRight,
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
  Download,
  Flame,
  Award,
  Layers,
  Sparkles,
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
import { BRAND } from "@/lib/constants/brand";

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
  const [telemetry] = useState<IntervalTelemetryPoint[]>(generatePlantTelemetry);
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number>(59); // Block 60 (14:45-15:00)
  const [liveFreq, setLiveFreq] = useState<number>(50.018);
  const [lastHeartbeat, setLastHeartbeat] = useState<string>("Just now");

  // Interactive APFC Capacitor Step-Tuning Simulator (1 to 16 steps)
  const [apfcStepsActive, setApfcStepsActive] = useState<number>(14);

  useEffect(() => {
    let tick = 0;
    const timer = setInterval(() => {
      tick += 1;
      // Simulate live frequency micro-fluctuations smoothly
      setLiveFreq(Number((50.012 + Math.sin(tick * 0.7) * 0.018).toFixed(3)));
      setLastHeartbeat("1s ago");
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const currentBlock = telemetry[selectedBlockIndex] || telemetry[0];

  // Calculated dynamic Power Factor based on active APFC stages
  const simulatedPf = Math.min(
    0.999,
    Number((0.92 + (apfcStepsActive / 16) * 0.078).toFixed(3))
  );
  const simulatedIncentiveMonthly = Math.round(
    simulatedPf >= 0.995 ? 45950 * (simulatedPf / 0.995) : simulatedPf >= 0.97 ? 21000 : 0
  );

  const handleDownloadMeterDat = () => {
    let dat = "CEA_0.2S_SEM_96BLOCK_EXPORT\n";
    dat += "Meter_SN: SEC-02S-9481-UP\n";
    dat += "Feeder_Voltage: 33kV\n";
    dat += "CT_Ratio: 400/5A; PT_Ratio: 33kV/110V\n";
    dat += "Block,Time,Active_MW,Reactive_MVAr,PF,Freq_Hz\n";
    telemetry.forEach((t) => {
      dat += `${t.block},${t.time},${t.activePowerMw},${t.reactiveMvar},${t.powerFactor},${t.frequencyHz}\n`;
    });

    const blob = new Blob([dat], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SEM_96Block_Telemetry_SEC02S9481.dat`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 mb-1">
            <span>PORTAL</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-purple-400">SCADA &amp; ABT TELEMETRY</span>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold text-[10px]">
              CEA 2006 / SLDC NABL CLASS 0.2S
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            High-Tension SCADA &amp; ABT Special Energy Meter Console
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Real-time optical AMR feed with sub-second polling and 15-minute DSM settlement telemetry
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/5 border border-slate-700/80 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AMR Optical Sync: {lastHeartbeat}</span>
          </div>
          <button
            onClick={handleDownloadMeterDat}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:brightness-110 text-xs font-mono font-bold transition-all shadow-lg shadow-purple-500/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export 96-Block .DAT</span>
          </button>
        </div>
      </div>

      {/* 4 Real-time Substation Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Frequency Gauge */}
        <div className="bg-[#0B1120] border border-slate-800/80 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Grid Frequency (NR)
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono tabular-nums">
            {liveFreq}
            <span className="text-xs text-slate-500 font-sans ml-1">Hz</span>
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-1 flex items-center justify-between">
            <span>IEGC Band: 49.90–50.05</span>
            <span className="text-emerald-400 font-bold">DSM Safe</span>
          </div>
        </div>

        {/* Instantaneous Power Factor */}
        <div className="bg-[#0B1120] border border-slate-800/80 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
            <span>Operating Power Factor</span>
            <span className="text-emerald-400 font-bold">Lag</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tabular-nums">
            {currentBlock.powerFactor}
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-1">
            State Target: 0.995 • +0.5% Incentive
          </div>
        </div>

        {/* Active Demand Drawl */}
        <div className="bg-[#0B1120] border border-slate-800/80 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-[#F8BC26]/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#F8BC26]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
            <span>Active Power Drawl</span>
            <span className="text-[#F8BC26] font-bold">Block #{currentBlock.block}</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">
            {currentBlock.activePowerMw}
            <span className="text-xs text-slate-500 font-sans ml-1">MW</span>
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-1">
            Sanctioned CD: 12.5 MVA (81.6%)
          </div>
        </div>

        {/* Reactive Power (MVAr) */}
        <div className="bg-[#0B1120] border border-slate-800/80 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-purple-500/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
            <span>Reactive Drawl</span>
            <span className="text-purple-400 font-bold">{apfcStepsActive}/16 Steps</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-400 font-mono tabular-nums">
            {currentBlock.reactiveMvar}
            <span className="text-xs text-slate-500 font-sans ml-1">MVAr</span>
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-1">
            APFC Microprocessor Controlled
          </div>
        </div>
      </div>

      {/* =========================================================================
          96-BLOCK LIVE POWER INFLUX & FREQUENCY PROFILE WITH SCRUBBER
         ========================================================================= */}
      <div className="bg-[#0B1120] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-base sm:text-lg font-black text-white flex items-center space-x-2">
              <Activity className="w-5 h-5 text-purple-400" />
              <span>96-Time-Block Demand Curve &amp; Regional Frequency Profile</span>
            </h2>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              Comparative visualization of plant MW drawl against Northern Regional Grid Frequency
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <span className="inline-flex items-center space-x-1 text-cyan-400">
              <span className="w-2.5 h-0.5 bg-cyan-400 inline-block" />
              <span>Load (MW)</span>
            </span>
            <span className="inline-flex items-center space-x-1 text-purple-400">
              <span className="w-2.5 h-0.5 bg-purple-400 inline-block" />
              <span>Frequency (Hz)</span>
            </span>
          </div>
        </div>

        <div className="h-80 w-full pt-2">
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
                  backgroundColor: "#060913",
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

        {/* Interactive 15-Minute Block Scrubber Bar */}
        <div className="pt-4 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-400 mb-2 gap-2">
            <span className="flex items-center space-x-2">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>Block Scrubber:</span>
              <strong className="text-white px-2 py-0.5 rounded bg-white/10 font-bold">
                Block #{currentBlock.block} • {currentBlock.time} IST
              </strong>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                currentBlock.status === "Solar Injection"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : currentBlock.status === "Peak Drawl"
                  ? "bg-red-500/20 text-red-300 border border-red-500/30"
                  : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
              }`}>
                {currentBlock.status}
              </span>
            </span>
            <span className="text-[11px] text-slate-400">
              Active Load: <strong className="text-white">{currentBlock.activePowerMw} MW</strong> • PF: <strong className="text-emerald-400">{currentBlock.powerFactor} Lag</strong> • Freq: <strong className="text-purple-400">{currentBlock.frequencyHz} Hz</strong>
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="95"
            value={selectedBlockIndex}
            onChange={(e) => setSelectedBlockIndex(parseInt(e.target.value))}
            aria-label="15-minute block scrubber"
            className="w-full accent-cyan-400 h-2 bg-[#060913] rounded-lg cursor-pointer border border-slate-700"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>00:00 (Block 1)</span>
            <span>06:00 (Block 25)</span>
            <span>12:00 (Block 49 Solar Peak)</span>
            <span>18:00 (Block 73 Evening Peak)</span>
            <span>23:45 (Block 96)</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          APFC STEP-TUNING SIMULATOR & POWER FACTOR INCENTIVE CALCULATOR
         ========================================================================= */}
      <div className="bg-[#0B1120] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-black text-white flex items-center space-x-2">
              <Zap className="w-5 h-5 text-[#F8BC26]" />
              <span>APFC Microprocessor Step-Tuning &amp; PF Incentive Simulator</span>
            </h3>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              Simulate capacitor bank engagement (1–16 steps) to observe reactive compensation and monthly DISCOM rebates
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-slate-400">Engaged Steps:</span>
            <span className="px-3 py-1 rounded-xl bg-[#F8BC26]/20 border border-[#F8BC26]/40 text-[#F8BC26] font-mono font-black text-sm">
              {apfcStepsActive} / 16 Steps
            </span>
          </div>
        </div>

        {/* Step Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-300">
            <span>Minimum (8 Steps • 0.959 PF)</span>
            <span className="text-[#F8BC26] font-bold">Interactive Stage Regulator</span>
            <span>Maximum (16 Steps • 0.999 PF)</span>
          </div>
          <input
            type="range"
            min="8"
            max="16"
            value={apfcStepsActive}
            onChange={(e) => setApfcStepsActive(parseInt(e.target.value))}
            aria-label="APFC capacitor steps active"
            className="w-full accent-[#F8BC26] h-2 bg-[#060913] rounded-lg cursor-pointer border border-slate-700"
          />

          {/* 16 Step Visual Matrix */}
          <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5 pt-2">
            {Array.from({ length: 16 }).map((_, i) => {
              const isEngaged = i < apfcStepsActive;
              return (
                <button
                  key={i}
                  onClick={() => setApfcStepsActive(i + 1)}
                  className={`py-2 rounded-lg text-center font-mono text-[10px] font-bold transition-all ${
                    isEngaged
                      ? "bg-emerald-500 text-[#060913] shadow-md shadow-emerald-500/20"
                      : "bg-slate-800/60 text-slate-500 hover:bg-slate-800"
                  }`}
                  title={`Capacitor Bank Step ${i + 1} (50 kVAr)`}
                >
                  S{i + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Real-time Result Strip */}
        <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
          <div className="p-4 rounded-xl bg-[#060913] border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Operating Power Factor</div>
            <div className="text-xl font-black font-mono text-emerald-400 mt-1">
              {simulatedPf} Lag
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-0.5">
              {simulatedPf >= 0.995 ? "Eligible for max SERC rebate" : "Below maximum incentive band"}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#060913] border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Estimated Monthly PF Rebate</div>
            <div className="text-xl font-black font-mono text-[#F8BC26] mt-1">
              +₹{simulatedIncentiveMonthly.toLocaleString()} / mo
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-0.5">
              Credited directly in DISCOM bill
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#060913] border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Reactive MVAr Drawl</div>
            <div className="text-xl font-black font-mono text-purple-400 mt-1">
              {Number((10.2 * Math.tan(Math.acos(simulatedPf))).toFixed(2))} MVAr
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-0.5">
              Zero reactive drawl surcharge
            </div>
          </div>
        </div>
      </div>

      {/* Meter Hardware Health & SLDC Calibration Status */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Meter Specification & Calibration */}
        <div className="bg-[#0B1120] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-white font-black text-sm flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Special Energy Meter (SEM) Health &amp; Calibration</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Main Meter Specification:</span>
              <span className="text-white font-bold">Class 0.2s Accuracy (CEA 2006 Reg)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Check Meter Drift:</span>
              <span className="text-emerald-400 font-bold">0.02% (Tolerance &lt;0.10%)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">NABL Calibration Validity:</span>
              <span className="text-white">Valid till 14 Dec 2026 (NABL Lab #941)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">CT/PT Potential Ratio:</span>
              <span className="text-white font-bold">33 kV / √3 : 110 V / √3</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Physical Sealing Record:</span>
              <span className="text-emerald-400 font-bold">UP SLDC Lead Seal #UP-78190</span>
            </div>
          </div>
        </div>

        {/* SLDC SCADA Telemetry Gateway */}
        <div className="bg-[#0B1120] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-white font-black text-sm flex items-center space-x-2">
            <Radio className="w-4 h-4 text-cyan-400" />
            <span>SLDC &amp; NRLDC Real-Time Telemetry Link</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Protocol &amp; Carrier:</span>
              <span className="text-white font-bold">IEC 60870-5-104 via Dual OPGW</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">SLDC Polling Interval:</span>
              <span className="text-cyan-400 font-bold">4-Second Telemetry / 15-Min Energy</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Gateway Packet Loss:</span>
              <span className="text-emerald-400 font-bold">0.00% (Last 24 Hours)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">NOC Escalation Channel:</span>
              <span className="text-white">Topnotch 24x7 NOC Desk ({BRAND.contacts.phonePrimary})</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Last DSM Schedule Audit:</span>
              <span className="text-emerald-400 font-bold">Zero Non-Compliance Notice</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
