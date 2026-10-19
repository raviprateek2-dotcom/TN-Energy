"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  ChevronLeft,
  Calendar,
  Download,
  DollarSign,
  Zap,
  Leaf,
  BarChart3,
  Percent,
  CheckCircle,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { BRAND } from "@/lib/constants/brand";

interface MonthlySavingsData {
  month: string;
  discomBaselineCostLakhs: number;
  actualProcuredCostLakhs: number;
  netSavingsLakhs: number;
  blendedTariffPerKwh: number;
  discomTariffPerKwh: number;
  unitsConsumedLakhs: number;
  cleanEnergySharePercent: number;
  pfIncentiveInr: number;
}

const HISTORICAL_12_MONTH_SAVINGS: MonthlySavingsData[] = [
  {
    month: "Nov 2024",
    discomBaselineCostLakhs: 72.5,
    actualProcuredCostLakhs: 48.2,
    netSavingsLakhs: 24.3,
    discomTariffPerKwh: 8.6,
    blendedTariffPerKwh: 5.72,
    unitsConsumedLakhs: 8.43,
    cleanEnergySharePercent: 62,
    pfIncentiveInr: 42150,
  },
  {
    month: "Dec 2024",
    discomBaselineCostLakhs: 69.8,
    actualProcuredCostLakhs: 46.5,
    netSavingsLakhs: 23.3,
    discomTariffPerKwh: 8.6,
    blendedTariffPerKwh: 5.73,
    unitsConsumedLakhs: 8.11,
    cleanEnergySharePercent: 60,
    pfIncentiveInr: 40550,
  },
  {
    month: "Jan 2025",
    discomBaselineCostLakhs: 74.2,
    actualProcuredCostLakhs: 49.1,
    netSavingsLakhs: 25.1,
    discomTariffPerKwh: 8.6,
    blendedTariffPerKwh: 5.69,
    unitsConsumedLakhs: 8.62,
    cleanEnergySharePercent: 64,
    pfIncentiveInr: 43100,
  },
  {
    month: "Feb 2025",
    discomBaselineCostLakhs: 71.0,
    actualProcuredCostLakhs: 46.8,
    netSavingsLakhs: 24.2,
    discomTariffPerKwh: 8.6,
    blendedTariffPerKwh: 5.67,
    unitsConsumedLakhs: 8.25,
    cleanEnergySharePercent: 65,
    pfIncentiveInr: 41250,
  },
  {
    month: "Mar 2025",
    discomBaselineCostLakhs: 78.5,
    actualProcuredCostLakhs: 50.8,
    netSavingsLakhs: 27.7,
    discomTariffPerKwh: 8.6,
    blendedTariffPerKwh: 5.56,
    unitsConsumedLakhs: 9.13,
    cleanEnergySharePercent: 68,
    pfIncentiveInr: 45650,
  },
  {
    month: "Apr 2025",
    discomBaselineCostLakhs: 84.6,
    actualProcuredCostLakhs: 54.2,
    netSavingsLakhs: 30.4,
    discomTariffPerKwh: 8.65,
    blendedTariffPerKwh: 5.54,
    unitsConsumedLakhs: 9.78,
    cleanEnergySharePercent: 71,
    pfIncentiveInr: 48900,
  },
  {
    month: "May 2025",
    discomBaselineCostLakhs: 92.4,
    actualProcuredCostLakhs: 58.6,
    netSavingsLakhs: 33.8,
    discomTariffPerKwh: 8.65,
    blendedTariffPerKwh: 5.49,
    unitsConsumedLakhs: 10.68,
    cleanEnergySharePercent: 73,
    pfIncentiveInr: 53400,
  },
  {
    month: "Jun 2025",
    discomBaselineCostLakhs: 96.8,
    actualProcuredCostLakhs: 61.2,
    netSavingsLakhs: 35.6,
    discomTariffPerKwh: 8.65,
    blendedTariffPerKwh: 5.47,
    unitsConsumedLakhs: 11.19,
    cleanEnergySharePercent: 74,
    pfIncentiveInr: 55950,
  },
  {
    month: "Jul 2025",
    discomBaselineCostLakhs: 88.2,
    actualProcuredCostLakhs: 56.4,
    netSavingsLakhs: 31.8,
    discomTariffPerKwh: 8.65,
    blendedTariffPerKwh: 5.53,
    unitsConsumedLakhs: 10.19,
    cleanEnergySharePercent: 70,
    pfIncentiveInr: 50950,
  },
  {
    month: "Aug 2025",
    discomBaselineCostLakhs: 86.4,
    actualProcuredCostLakhs: 55.1,
    netSavingsLakhs: 31.3,
    discomTariffPerKwh: 8.65,
    blendedTariffPerKwh: 5.52,
    unitsConsumedLakhs: 9.98,
    cleanEnergySharePercent: 71,
    pfIncentiveInr: 49900,
  },
  {
    month: "Sep 2025",
    discomBaselineCostLakhs: 81.3,
    actualProcuredCostLakhs: 52.0,
    netSavingsLakhs: 29.3,
    discomTariffPerKwh: 8.65,
    blendedTariffPerKwh: 5.53,
    unitsConsumedLakhs: 9.4,
    cleanEnergySharePercent: 69,
    pfIncentiveInr: 47000,
  },
  {
    month: "Oct 2025",
    discomBaselineCostLakhs: 79.5,
    actualProcuredCostLakhs: 50.4,
    netSavingsLakhs: 29.1,
    discomTariffPerKwh: 8.65,
    blendedTariffPerKwh: 5.48,
    unitsConsumedLakhs: 9.19,
    cleanEnergySharePercent: 70,
    pfIncentiveInr: 45950,
  },
];

export default function SavingsDashboardPage() {
  const [selectedRange, setSelectedRange] = useState<"12m" | "6m" | "3m">("12m");

  const displayData =
    selectedRange === "3m"
      ? HISTORICAL_12_MONTH_SAVINGS.slice(-3)
      : selectedRange === "6m"
      ? HISTORICAL_12_MONTH_SAVINGS.slice(-6)
      : HISTORICAL_12_MONTH_SAVINGS;

  const totalBaselineCostCr = Number(
    (displayData.reduce((acc, d) => acc + d.discomBaselineCostLakhs, 0) / 100).toFixed(2)
  );
  const totalActualCostCr = Number(
    (displayData.reduce((acc, d) => acc + d.actualProcuredCostLakhs, 0) / 100).toFixed(2)
  );
  const totalSavingsCr = Number(
    (displayData.reduce((acc, d) => acc + d.netSavingsLakhs, 0) / 100).toFixed(2)
  );
  const overallSavingsPercent = Number(
    (((totalBaselineCostCr - totalActualCostCr) / totalBaselineCostCr) * 100).toFixed(1)
  );
  const avgBlendedTariff = Number(
    (
      displayData.reduce((acc, d) => acc + d.blendedTariffPerKwh, 0) / displayData.length
    ).toFixed(2)
  );
  const totalCo2OffsetTons = Math.round(
    displayData.reduce((acc, d) => acc + d.unitsConsumedLakhs * 100000 * (d.cleanEnergySharePercent / 100) * 0.82, 0) / 1000
  );

  const handleExportCsv = () => {
    let csv = "Month,Units_Lakh_kWh,Discom_Tariff_INR,Blended_Tariff_INR,Discom_Cost_Lakhs,Procured_Cost_Lakhs,Net_Savings_Lakhs,Clean_Energy_Pct,PF_Incentive_INR\n";
    HISTORICAL_12_MONTH_SAVINGS.forEach((d) => {
      csv += `${d.month},${d.unitsConsumedLakhs},${d.discomTariffPerKwh},${d.blendedTariffPerKwh},${d.discomBaselineCostLakhs},${d.actualProcuredCostLakhs},${d.netSavingsLakhs},${d.cleanEnergySharePercent}%,${d.pfIncentiveInr}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Topnotch-12Month-Savings-Reconciliation.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
              <TrendingUp className="w-5 h-5 text-grid-emerald-400" />
              <span className="text-white font-extrabold text-sm">Industrial Savings Dashboard</span>
              <span className="text-[10px] font-mono bg-grid-emerald-500/10 border border-grid-emerald-500/30 text-grid-emerald-400 px-2 py-0.5 rounded">
                AUDITED
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-xs font-mono">
            <button
              onClick={handleExportCsv}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-grid-slate-700 bg-grid-navy-800 hover:bg-grid-navy-700 text-grid-slate-300 hover:text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-grid-cyan-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
            <span className="text-grid-slate-500 hidden sm:inline">Ref: PVVNL-HT-12.5MVA</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="text-[10px] font-mono uppercase tracking-wider text-grid-slate-500 mb-1">
              Cumulative Savings ({selectedRange.toUpperCase()})
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-grid-emerald-400 font-mono tabular-nums">
              ₹{totalSavingsCr} Cr
            </div>
            <div className="text-[11px] font-mono text-grid-slate-400 mt-1 flex items-center">
              <span className="text-grid-emerald-400 font-bold mr-1">-{overallSavingsPercent}%</span>
              <span>vs DISCOM Baseline</span>
            </div>
          </div>

          <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="text-[10px] font-mono uppercase tracking-wider text-grid-slate-500 mb-1">
              Weighted Landed Tariff
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              ₹{avgBlendedTariff}
              <span className="text-xs text-grid-slate-500 font-sans ml-1">/kWh</span>
            </div>
            <div className="text-[11px] font-mono text-grid-slate-400 mt-1">
              Baseline DISCOM: ₹8.65/kWh
            </div>
          </div>

          <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="text-[10px] font-mono uppercase tracking-wider text-grid-slate-500 mb-1">
              Clean Energy Share
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-grid-cyan-400 font-mono tabular-nums">
              70.4%
            </div>
            <div className="text-[11px] font-mono text-grid-slate-400 mt-1">
              Solar + Wind Hybrid PPA
            </div>
          </div>

          <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="text-[10px] font-mono uppercase tracking-wider text-grid-slate-500 mb-1">
              Scope-2 CO₂ Abated
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono tabular-nums">
              {totalCo2OffsetTons.toLocaleString()}
              <span className="text-xs text-grid-slate-500 font-sans ml-1">tCO₂e</span>
            </div>
            <div className="text-[11px] font-mono text-grid-slate-400 mt-1">
              Verified for ESG & BRSR
            </div>
          </div>
        </div>

        {/* Main Chart Section: Monthly Baseline vs Procured Cost */}
        <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-grid-slate-800">
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-white flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-grid-emerald-400" />
                <span>Monthly Power Procurement Cost &amp; Savings (₹ Lakhs)</span>
              </h2>
              <p className="text-xs font-mono text-grid-slate-400 mt-0.5">
                DISCOM Baseline vs. Topnotch Structured Portfolio (Rooftop + Group Captive + IEX GDAM)
              </p>
            </div>

            <div className="flex items-center space-x-1.5 bg-grid-navy-950 p-1 rounded-xl border border-grid-slate-800">
              {(["3m", "6m", "12m"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRange(r)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    selectedRange === r
                      ? "bg-grid-emerald-500 text-grid-navy-950 shadow-md"
                      : "text-grid-slate-400 hover:text-white"
                  }`}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={displayData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="month" stroke="#64748B" tick={{ fontSize: 11, fontFamily: "monospace" }} />
                <YAxis
                  stroke="#64748B"
                  tick={{ fontSize: 11, fontFamily: "monospace" }}
                  tickFormatter={(val) => `₹${val}L`}
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
                  formatter={(value: any, name: any) => {
                    const formatted = typeof value === "number" ? value.toFixed(1) : value;
                    return [`₹${formatted} Lakhs`, name];
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "11px", fontFamily: "monospace", paddingTop: "10px" }}
                />
                <Bar
                  dataKey="discomBaselineCostLakhs"
                  name="DISCOM Baseline (₹ Lakhs)"
                  fill="#EF4444"
                  radius={[4, 4, 0, 0]}
                  opacity={0.8}
                />
                <Bar
                  dataKey="actualProcuredCostLakhs"
                  name="Topnotch Landed Cost (₹ Lakhs)"
                  fill="#06B6D4"
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  type="monotone"
                  dataKey="netSavingsLakhs"
                  name="Net Savings (₹ Lakhs)"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#10B981" }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 12-Month Detailed Audit Reconciliation Table */}
        <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-grid-slate-800">
            <div>
              <h3 className="text-white font-extrabold text-sm">
                Audited Monthly Billing Statements &amp; Landed Tariffs
              </h3>
              <p className="text-grid-slate-500 font-mono text-xs mt-0.5">
                Cross-verified against UP SLDC Regional Energy Accounts (REA) and Special Energy Meter files.
              </p>
            </div>
            <span className="text-[11px] font-mono text-grid-emerald-400 flex items-center">
              <CheckCircle className="w-3.5 h-3.5 mr-1" />
              100% Reconciled
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-grid-navy-950 text-grid-slate-400 text-[10px] uppercase">
                <tr>
                  <th className="p-3">Month</th>
                  <th className="p-3">Consumption</th>
                  <th className="p-3">Baseline DISCOM</th>
                  <th className="p-3">Landed Tariff</th>
                  <th className="p-3">Baseline Total</th>
                  <th className="p-3">Actual Billed</th>
                  <th className="p-3">Net Savings</th>
                  <th className="p-3 text-right">PF Incentive</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-grid-slate-800 text-grid-slate-300">
                {displayData.map((d) => (
                  <tr key={d.month} className="hover:bg-grid-navy-800/40 transition-colors">
                    <td className="p-3 font-bold text-white">{d.month}</td>
                    <td className="p-3 tabular-nums">{d.unitsConsumedLakhs} L kWh</td>
                    <td className="p-3 tabular-nums text-grid-slate-400">₹{d.discomTariffPerKwh}/kWh</td>
                    <td className="p-3 tabular-nums text-grid-cyan-400 font-bold">
                      ₹{d.blendedTariffPerKwh}/kWh
                    </td>
                    <td className="p-3 tabular-nums text-red-400">₹{d.discomBaselineCostLakhs} L</td>
                    <td className="p-3 tabular-nums text-white">₹{d.actualProcuredCostLakhs} L</td>
                    <td className="p-3 tabular-nums text-grid-emerald-400 font-bold">
                      +₹{d.netSavingsLakhs} L
                    </td>
                    <td className="p-3 tabular-nums text-right text-purple-400">
                      +₹{d.pfIncentiveInr.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
