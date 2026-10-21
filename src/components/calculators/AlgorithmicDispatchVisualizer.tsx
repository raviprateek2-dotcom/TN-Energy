"use client";

import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
  ComposedChart,
} from "recharts";
import {
  Cpu,
  Zap,
  TrendingDown,
  Sun,
  Wind,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Info,
} from "lucide-react";
import { solve96BlockDispatch } from "@/lib/calculator/milp-dispatch";
import { POPULAR_STATES } from "@/lib/constants/indian-states-oa-data";
import { RegulatoryTooltip } from "@/components/ui/RegulatoryTooltip";

export function AlgorithmicDispatchVisualizer() {
  const [selectedStateId, setSelectedStateId] = useState("uttar-pradesh");
  const [contractDemandKva, setContractDemandKva] = useState(6000);
  const [solarCapacityMwp, setSolarCapacityMwp] = useState(4.5);
  const [windCapacityMw, setWindCapacityMw] = useState(2.0);
  const [profileType, setProfileType] = useState<"continuous-24x7" | "day-shift" | "heavy-continuous">("continuous-24x7");

  const result = useMemo(() => {
    return solve96BlockDispatch({
      stateId: selectedStateId,
      contractDemandKva,
      solarCapacityMwp,
      windCapacityMw,
      loadProfileType: profileType,
      enableIexBidding: true,
    });
  }, [selectedStateId, contractDemandKva, solarCapacityMwp, windCapacityMw, profileType]);

  // Downsample to 24 hourly averages or sample every 2nd block (48 points) for smooth responsive SVG rendering
  const chartData = useMemo(() => {
    return result.blocks.filter((b) => b.block % 2 === 1).map((b) => ({
      slot: b.timeSlot.split("-")[0],
      block: b.block,
      demand: b.demandMw,
      solar: b.solarGenerationMw,
      wind: b.windGenerationMw,
      iex: b.iexClearedMw,
      discom: b.discomDrawlMw,
      effectiveRate: b.effectivePaisePerKwh / 100,
      isPeak: b.isPeakToDSlot,
    }));
  }, [result]);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5 text-amber-700" />
            <span>Algorithmic Power Dispatch &amp; 96-Block Optimization</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#1C2C34] tracking-tight">
            15-Minute Mixed-Integer Linear Dispatch Solver
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-mono mt-1">
            Simulates dynamic co-optimization across Solar SPV, Captive Wind, IEX DAM, and DISCOM ToD Grid Drawl
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="text-slate-500 hidden sm:inline">Load Profile:</span>
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => setProfileType("continuous-24x7")}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                profileType === "continuous-24x7"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              24x7 Process
            </button>
            <button
              onClick={() => setProfileType("day-shift")}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                profileType === "day-shift"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Day Shift
            </button>
            <button
              onClick={() => setProfileType("heavy-continuous")}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                profileType === "heavy-continuous"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Furnace / Continuous
            </button>
          </div>
        </div>
      </div>

      {/* Sliders & Parameter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono">
        {/* State Selection */}
        <div className="space-y-1.5">
          <label className="text-[11px] text-slate-500 uppercase font-semibold block">
            State Jurisdiction
          </label>
          <select
            value={selectedStateId}
            onChange={(e) => setSelectedStateId(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#F8BC26]"
          >
            {POPULAR_STATES.map((st) => (
              <option key={st.stateId} value={st.stateId}>
                {st.stateName}
              </option>
            ))}
          </select>
        </div>

        {/* Contract Demand Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-[11px] text-slate-500 uppercase font-semibold">
              Sanctioned Load
            </label>
            <span className="font-bold text-slate-900">{contractDemandKva.toLocaleString()} kVA</span>
          </div>
          <input
            type="range"
            min={1000}
            max={20000}
            step={500}
            value={contractDemandKva}
            onChange={(e) => setContractDemandKva(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </div>

        {/* Solar Capacity Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-[11px] text-slate-500 uppercase font-semibold flex items-center space-x-1">
              <Sun className="w-3 h-3 text-amber-500" />
              <span>Solar SPV</span>
            </label>
            <span className="font-bold text-slate-900">{solarCapacityMwp.toFixed(1)} MWp</span>
          </div>
          <input
            type="range"
            min={0}
            max={15}
            step={0.5}
            value={solarCapacityMwp}
            onChange={(e) => setSolarCapacityMwp(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>

        {/* Wind Capacity Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-[11px] text-slate-500 uppercase font-semibold flex items-center space-x-1">
              <Wind className="w-3 h-3 text-sky-500" />
              <span>Wind Captive</span>
            </label>
            <span className="font-bold text-slate-900">{windCapacityMw.toFixed(1)} MW</span>
          </div>
          <input
            type="range"
            min={0}
            max={10}
            step={0.5}
            value={windCapacityMw}
            onChange={(e) => setWindCapacityMw(Number(e.target.value))}
            className="w-full accent-sky-500"
          />
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-center">
        <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/60">
          <span className="text-[10px] text-emerald-800 uppercase block font-semibold">Green Energy RE Mix</span>
          <span className="text-2xl font-black text-emerald-700 mt-1 block">
            {result.greenEnergySharePercent}%
          </span>
          <span className="text-[10px] text-emerald-800 font-semibold mt-0.5 block">
            Solar + Wind Offtake
          </span>
        </div>

        <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/60">
          <span className="text-[10px] text-amber-800 uppercase block font-semibold">Annual Energy Savings</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">
            ₹{(result.annualNetSavingsInr / 10000000).toFixed(2)} Cr
          </span>
          <span className="text-[10px] text-amber-900 font-bold mt-0.5 block">
            {result.percentageSavings}% vs DISCOM Tariff
          </span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 bg-white">
          <span className="text-[10px] text-slate-500 uppercase block font-semibold">Daily Energy Handled</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">
            {result.dailyTotalConsumptionMwh.toFixed(1)} MWh
          </span>
          <span className="text-[10px] text-slate-500 mt-0.5 block">96 Discrete Slots</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 bg-white">
          <span className="text-[10px] text-slate-500 uppercase block font-semibold">DSM Compliance Rating</span>
          <span className="text-2xl font-black text-emerald-700 mt-1 block">
            {result.dsmComplianceScore}%
          </span>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Deviation Safe Band</span>
        </div>
      </div>

      {/* Stacked 96-Block Dispatch Chart */}
      <div className="bg-[#F9FAFB] border border-slate-200 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="font-bold text-slate-900 uppercase">96-Block Stacked Power Dispatch (MW)</span>
            <RegulatoryTooltip
              term="Section 42"
              authority="SERC"
              orderCitation="Section 42(2) Electricity Act 2003"
              statutoryRule="Exempts genuine Group Captive consumers holding 26% equity and consuming 51% generation from Cross-Subsidy and Additional Surcharges."
            >
              Section 42 Exemption
            </RegulatoryTooltip>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono">
            <span className="inline-flex items-center space-x-1">
              <span className="w-3 h-3 rounded-xs bg-[#10B981]" />
              <span className="text-slate-700">Solar SPV</span>
            </span>
            <span className="inline-flex items-center space-x-1">
              <span className="w-3 h-3 rounded-xs bg-[#0EA5E9]" />
              <span className="text-slate-700">Captive Wind</span>
            </span>
            <span className="inline-flex items-center space-x-1">
              <span className="w-3 h-3 rounded-xs bg-[#F59E0B]" />
              <span className="text-slate-700">IEX DAM</span>
            </span>
            <span className="inline-flex items-center space-x-1">
              <span className="w-3 h-3 rounded-xs bg-[#475569]" />
              <span className="text-slate-700">DISCOM Grid</span>
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="slot" tick={{ fontSize: 10, fill: "#64748b" }} interval={3} />
              <YAxis
                tick={{ fontSize: 10, fill: "#64748b" }}
                unit=" MW"
                domain={[0, "auto"]}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-3 rounded-xl border border-slate-700 text-xs font-mono shadow-xl space-y-1">
                        <div className="font-bold text-amber-400">
                          Slot {label} (Block #{d.block})
                        </div>
                        <div className="text-slate-300">Total Demand: {d.demand} MW</div>
                        <div className="border-t border-slate-800 pt-1 space-y-0.5">
                          <div className="text-emerald-400">Solar Gen: {d.solar} MW</div>
                          <div className="text-sky-400">Wind Gen: {d.wind} MW</div>
                          <div className="text-amber-400">IEX Cleared: {d.iex} MW</div>
                          <div className="text-slate-400">DISCOM Grid: {d.discom} MW</div>
                        </div>
                        <div className="border-t border-slate-800 pt-1 text-[10px] text-emerald-300 font-bold">
                          Effective Rate: ₹{d.effectiveRate.toFixed(2)}/kWh
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area type="monotone" dataKey="solar" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.8} />
              <Area type="monotone" dataKey="wind" stackId="1" stroke="#0EA5E9" fill="#0EA5E9" fillOpacity={0.8} />
              <Area type="monotone" dataKey="iex" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.8} />
              <Area type="monotone" dataKey="discom" stackId="1" stroke="#475569" fill="#475569" fillOpacity={0.7} />
              <Line type="monotone" dataKey="demand" stroke="#1C2C34" strokeWidth={2.5} dot={false} strokeDasharray="4 4" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Regulatory Optimization Insights */}
      <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-slate-700">
        <div className="flex items-start space-x-2.5">
          <Sparkles className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Solver Insight:</strong> By shifting {solarCapacityMwp} MWp solar into daytime slots and drawing {windCapacityMw} MW wind during night off-peak, your plant circumvents DISCOM evening ToD surcharges and eliminates CSS/AS penalties under Section 42 of the Electricity Act 2003.
          </p>
        </div>
      </div>
    </div>
  );
}
