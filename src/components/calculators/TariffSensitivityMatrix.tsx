"use client";

import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  ShieldCheck,
  Zap,
  Sliders,
  DollarSign,
  Calendar,
  Lock,
  ArrowUpRight,
  Info,
  CheckCircle2,
} from "lucide-react";

export function TariffSensitivityMatrix() {
  // Configurable inputs
  const [baseDiscomRate, setBaseDiscomRate] = useState<number>(8.8); // ₹/kWh
  const [discomEscalation, setDiscomEscalation] = useState<number>(6); // % per annum
  const [captivePpaRate, setCaptivePpaRate] = useState<number>(4.15); // ₹/kWh
  const [wheelingAndBanking, setWheelingAndBanking] = useState<number>(1.45); // ₹/kWh
  const [monthlyUnitsLakhs, setMonthlyUnitsLakhs] = useState<number>(10); // 10 Lakh kWh/month

  // Locked Group Captive landed cost = PPA Rate + Wheeling/Banking (No CSS/AS per Section 42)
  const captiveLandedRate = captivePpaRate + wheelingAndBanking;
  const annualConsumptionUnits = monthlyUnitsLakhs * 100000 * 12;

  // Compute 10-year projection data points
  const projections = useMemo(() => {
    const years = [1, 2, 3, 5, 7, 10, 15, 20, 25];
    let cumulativeSavingsRupees = 0;

    return years.map((yr) => {
      // Compounded DISCOM rate
      const discomRateAtYr = baseDiscomRate * Math.pow(1 + discomEscalation / 100, yr - 1);
      // Group Captive PPA rate is fixed for 25 years with 0% statutory surcharge
      const captiveRateAtYr = captiveLandedRate;
      
      const rateDiffPerKwh = discomRateAtYr - captiveRateAtYr;
      const annualSavingsAtYr = rateDiffPerKwh * annualConsumptionUnits;
      
      // Rough compounding cumulative calculation for display
      cumulativeSavingsRupees += annualSavingsAtYr;

      return {
        year: yr,
        discomRate: discomRateAtYr,
        captiveRate: captiveRateAtYr,
        rateDiff: rateDiffPerKwh,
        annualSavingsCrores: (annualSavingsAtYr / 10000000).toFixed(2),
        cumulativeSavingsCrores: (
          (rateDiffPerKwh * annualConsumptionUnits * yr) / 10000000
        ).toFixed(2),
        savingsPercent: Math.round(((discomRateAtYr - captiveRateAtYr) / discomRateAtYr) * 100),
      };
    });
  }, [baseDiscomRate, discomEscalation, captiveLandedRate, annualConsumptionUnits]);

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
      {/* Header Bar */}
      <div className="bg-[#0B132B] text-white p-6 sm:p-8 border-b border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F8BC26]/10 border border-[#F8BC26]/30 text-[#F8BC26] text-xs font-mono font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Dynamic Tariff Inflation &amp; Sensitivity Engine</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              25-Year Industrial Power Cost Inflation Matrix
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl leading-relaxed">
              Model how historical DISCOM tariff hikes (averaging 5.5%–8.2% CAGR) compound against Topnotch&apos;s 25-year locked Group Captive PPA tariff — creating expanding annual EBITDA hedges.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-white/10 px-4 py-3 rounded-2xl border border-white/20 backdrop-blur-md">
            <Lock className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div className="text-xs font-mono">
              <span className="text-slate-400 block text-[10px] uppercase">PPA Tariff Standing</span>
              <span className="text-emerald-400 font-bold">Locked 25-Yr Fixed Hedge</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls Strip */}
      <div className="bg-slate-50 p-6 sm:p-8 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Control 1: Current Base DISCOM HT Rate */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-600 font-bold">Base DISCOM Tariff:</span>
            <span className="text-[#1C2C34] font-black font-mono">₹{baseDiscomRate.toFixed(2)}/kWh</span>
          </div>
          <input
            type="range"
            min="6.5"
            max="12.0"
            step="0.1"
            value={baseDiscomRate}
            onChange={(e) => setBaseDiscomRate(parseFloat(e.target.value))}
            className="w-full accent-[#F8BC26] cursor-pointer"
          />
          <span className="text-[10px] text-slate-600 font-mono block">State average: ₹8.50–₹10.50</span>
        </div>

        {/* Control 2: Annual DISCOM Tariff Escalation */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-600 font-bold">DISCOM Inflation Rate:</span>
            <span className="text-rose-700 font-black font-mono">{discomEscalation}% / yr</span>
          </div>
          <input
            type="range"
            min="2"
            max="10"
            step="0.5"
            value={discomEscalation}
            onChange={(e) => setDiscomEscalation(parseFloat(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer"
          />
          <span className="text-[10px] text-slate-600 font-mono block">SERC historical CAGR: 5%–8%</span>
        </div>

        {/* Control 3: Captive Solar/Wind PPA Rate */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-600 font-bold">Captive Landed Rate:</span>
            <span className="text-emerald-700 font-black font-mono">₹{captiveLandedRate.toFixed(2)}/kWh</span>
          </div>
          <input
            type="range"
            min="3.5"
            max="5.5"
            step="0.05"
            value={captivePpaRate}
            onChange={(e) => setCaptivePpaRate(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <span className="text-[10px] text-slate-600 font-mono block">PPA (₹{captivePpaRate.toFixed(2)}) + Wheeling</span>
        </div>

        {/* Control 4: Monthly Consumption */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-600 font-bold">Monthly Plant Usage:</span>
            <span className="text-[#1C2C34] font-black font-mono">{monthlyUnitsLakhs} Lakh kWh</span>
          </div>
          <input
            type="range"
            min="2"
            max="50"
            step="1"
            value={monthlyUnitsLakhs}
            onChange={(e) => setMonthlyUnitsLakhs(parseInt(e.target.value, 10))}
            className="w-full accent-[#1C2C34] cursor-pointer"
          />
          <span className="text-[10px] text-slate-600 font-mono block">Annual: {(monthlyUnitsLakhs * 12).toFixed(0)} Lakh kWh</span>
        </div>
      </div>

      {/* Main Projections Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-100/90 text-slate-700 uppercase tracking-wider text-[11px] border-b border-slate-200">
            <tr>
              <th className="py-4 px-6 font-bold">Timeline</th>
              <th className="py-4 px-6 font-bold">DISCOM Tariff (Escalating)</th>
              <th className="py-4 px-6 font-bold">Group Captive Tariff (Locked)</th>
              <th className="py-4 px-6 font-bold text-emerald-800">Rupee Diff / kWh</th>
              <th className="py-4 px-6 font-bold text-emerald-800">Annual Savings</th>
              <th className="py-4 px-6 font-bold text-[#D97706]">Cumulative Savings</th>
              <th className="py-4 px-6 font-bold">Hedge Benefit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projections.map((p) => (
              <tr key={p.year} className="hover:bg-amber-50/40 transition-colors">
                <td className="py-4 px-6 font-bold text-[#1C2C34]">
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                    <Calendar className="w-3 h-3 text-[#D97706]" />
                    <span>Year {p.year}</span>
                  </span>
                </td>

                <td className="py-4 px-6 font-bold text-rose-900">
                  ₹{p.discomRate.toFixed(2)}
                  <span className="text-slate-600 font-normal text-[10px]"> / kWh</span>
                </td>

                <td className="py-4 px-6 font-bold text-emerald-700">
                  ₹{p.captiveRate.toFixed(2)}
                  <span className="text-slate-600 font-normal text-[10px]"> / kWh</span>
                </td>

                <td className="py-4 px-6 font-black text-emerald-700 text-sm">
                  +₹{p.rateDiff.toFixed(2)}
                </td>

                <td className="py-4 px-6 font-black text-emerald-900 text-sm">
                  ₹{p.annualSavingsCrores} Cr
                </td>

                <td className="py-4 px-6 font-black text-[#D97706] text-sm">
                  ₹{p.cumulativeSavingsCrores} Cr
                </td>

                <td className="py-4 px-6">
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{p.savingsPercent}% Saved</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Insight Callout Bar */}
      <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-600">
        <div className="flex items-center space-x-2">
          <Info className="w-4 h-4 text-[#D97706] flex-shrink-0" />
          <span>
            <strong>Inflation Compounding Takeaway:</strong> By Year 10, DISCOM rates escalate to{" "}
            <span className="text-rose-700 font-bold">
              ₹{projections[5]?.discomRate.toFixed(2)}/kWh
            </span>
            , while Group Captive PPA stays anchored at{" "}
            <span className="text-emerald-700 font-bold">
              ₹{captiveLandedRate.toFixed(2)}/kWh
            </span>
            , providing over ₹{projections[5]?.cumulativeSavingsCrores} Crores in cumulative EBITDA insulation.
          </span>
        </div>

        <a
          href="#quick-calculator"
          className="px-5 py-2.5 rounded-xl bg-[#F8BC26] hover:bg-[#eab308] text-[#1C2C34] font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-sm active:scale-95 flex-shrink-0"
        >
          <span>Calculate My Plant Savings</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
