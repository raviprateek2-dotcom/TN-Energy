"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
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
  FileCheck2,
  ShieldCheck,
  ChevronRight,
  Info,
  Layers,
  Sparkles,
  Building,
  Printer,
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
  monthId: string;
  discomBaselineCostLakhs: number;
  actualProcuredCostLakhs: number;
  netSavingsLakhs: number;
  blendedTariffPerKwh: number;
  discomTariffPerKwh: number;
  unitsConsumedLakhs: number;
  cleanEnergySharePercent: number;
  pfIncentiveInr: number;
  // Itemized breakdown details for single-month reconciliation
  breakdown: {
    discomFixedChargesLakhs: number;
    discomEnergyChargesLakhs: number;
    discomTodPeakSurchargeLakhs: number;
    discomDutyAndTaxLakhs: number;
    discomFppcaLakhs: number;
    solarPpaCostLakhs: number;
    iexProcuredCostLakhs: number;
    wheelingAndStuLossLakhs: number;
    sldcSchedulingFeeLakhs: number;
    cssAndAsExemptSavingsLakhs: number;
    auditHash: string;
    auditorName: string;
    auditDate: string;
  };
}

const HISTORICAL_12_MONTH_SAVINGS: MonthlySavingsData[] = [
  {
    month: "Nov 2024",
    monthId: "2024-11",
    discomBaselineCostLakhs: 72.5,
    actualProcuredCostLakhs: 48.2,
    netSavingsLakhs: 24.3,
    discomTariffPerKwh: 8.6,
    blendedTariffPerKwh: 5.72,
    unitsConsumedLakhs: 8.43,
    cleanEnergySharePercent: 62,
    pfIncentiveInr: 42150,
    breakdown: {
      discomFixedChargesLakhs: 18.5,
      discomEnergyChargesLakhs: 44.8,
      discomTodPeakSurchargeLakhs: 4.2,
      discomDutyAndTaxLakhs: 3.8,
      discomFppcaLakhs: 1.2,
      solarPpaCostLakhs: 22.4,
      iexProcuredCostLakhs: 21.6,
      wheelingAndStuLossLakhs: 3.8,
      sldcSchedulingFeeLakhs: 0.4,
      cssAndAsExemptSavingsLakhs: 12.8,
      auditHash: "SHA256:7f9a88b1ec4329d0",
      auditorName: "BEE Accredited Auditor (Reg #EA-2849)",
      auditDate: "04 Dec 2024",
    },
  },
  {
    month: "Dec 2024",
    monthId: "2024-12",
    discomBaselineCostLakhs: 69.8,
    actualProcuredCostLakhs: 46.5,
    netSavingsLakhs: 23.3,
    discomTariffPerKwh: 8.6,
    blendedTariffPerKwh: 5.73,
    unitsConsumedLakhs: 8.11,
    cleanEnergySharePercent: 60,
    pfIncentiveInr: 40550,
    breakdown: {
      discomFixedChargesLakhs: 18.5,
      discomEnergyChargesLakhs: 42.6,
      discomTodPeakSurchargeLakhs: 4.1,
      discomDutyAndTaxLakhs: 3.5,
      discomFppcaLakhs: 1.1,
      solarPpaCostLakhs: 21.2,
      iexProcuredCostLakhs: 21.1,
      wheelingAndStuLossLakhs: 3.8,
      sldcSchedulingFeeLakhs: 0.4,
      cssAndAsExemptSavingsLakhs: 12.3,
      auditHash: "SHA256:88a129ef66cd4091",
      auditorName: "BEE Accredited Auditor (Reg #EA-2849)",
      auditDate: "05 Jan 2025",
    },
  },
  {
    month: "Jan 2025",
    monthId: "2025-01",
    discomBaselineCostLakhs: 74.2,
    actualProcuredCostLakhs: 49.1,
    netSavingsLakhs: 25.1,
    discomTariffPerKwh: 8.6,
    blendedTariffPerKwh: 5.69,
    unitsConsumedLakhs: 8.62,
    cleanEnergySharePercent: 64,
    pfIncentiveInr: 43100,
    breakdown: {
      discomFixedChargesLakhs: 18.5,
      discomEnergyChargesLakhs: 46.2,
      discomTodPeakSurchargeLakhs: 4.5,
      discomDutyAndTaxLakhs: 3.8,
      discomFppcaLakhs: 1.2,
      solarPpaCostLakhs: 23.8,
      iexProcuredCostLakhs: 21.0,
      wheelingAndStuLossLakhs: 3.9,
      sldcSchedulingFeeLakhs: 0.4,
      cssAndAsExemptSavingsLakhs: 13.1,
      auditHash: "SHA256:39bf20da541e8832",
      auditorName: "BEE Accredited Auditor (Reg #EA-2849)",
      auditDate: "04 Feb 2025",
    },
  },
  {
    month: "Feb 2025",
    monthId: "2025-02",
    discomBaselineCostLakhs: 71.0,
    actualProcuredCostLakhs: 46.8,
    netSavingsLakhs: 24.2,
    discomTariffPerKwh: 8.6,
    blendedTariffPerKwh: 5.67,
    unitsConsumedLakhs: 8.25,
    cleanEnergySharePercent: 65,
    pfIncentiveInr: 41250,
    breakdown: {
      discomFixedChargesLakhs: 18.5,
      discomEnergyChargesLakhs: 43.8,
      discomTodPeakSurchargeLakhs: 4.1,
      discomDutyAndTaxLakhs: 3.5,
      discomFppcaLakhs: 1.1,
      solarPpaCostLakhs: 23.2,
      iexProcuredCostLakhs: 19.4,
      wheelingAndStuLossLakhs: 3.8,
      sldcSchedulingFeeLakhs: 0.4,
      cssAndAsExemptSavingsLakhs: 12.5,
      auditHash: "SHA256:91ef20b784a3d421",
      auditorName: "BEE Accredited Auditor (Reg #EA-2849)",
      auditDate: "05 Mar 2025",
    },
  },
  {
    month: "Mar 2025",
    monthId: "2025-03",
    discomBaselineCostLakhs: 78.5,
    actualProcuredCostLakhs: 50.8,
    netSavingsLakhs: 27.7,
    discomTariffPerKwh: 8.6,
    blendedTariffPerKwh: 5.56,
    unitsConsumedLakhs: 9.13,
    cleanEnergySharePercent: 68,
    pfIncentiveInr: 45650,
    breakdown: {
      discomFixedChargesLakhs: 18.5,
      discomEnergyChargesLakhs: 49.8,
      discomTodPeakSurchargeLakhs: 4.8,
      discomDutyAndTaxLakhs: 4.1,
      discomFppcaLakhs: 1.3,
      solarPpaCostLakhs: 26.5,
      iexProcuredCostLakhs: 19.9,
      wheelingAndStuLossLakhs: 4.0,
      sldcSchedulingFeeLakhs: 0.4,
      cssAndAsExemptSavingsLakhs: 13.9,
      auditHash: "SHA256:12bc55d048fa2981",
      auditorName: "BEE Accredited Auditor (Reg #EA-2849)",
      auditDate: "04 Apr 2025",
    },
  },
  {
    month: "Apr 2025",
    monthId: "2025-04",
    discomBaselineCostLakhs: 84.6,
    actualProcuredCostLakhs: 54.2,
    netSavingsLakhs: 30.4,
    discomTariffPerKwh: 8.65,
    blendedTariffPerKwh: 5.54,
    unitsConsumedLakhs: 9.78,
    cleanEnergySharePercent: 71,
    pfIncentiveInr: 48900,
    breakdown: {
      discomFixedChargesLakhs: 18.5,
      discomEnergyChargesLakhs: 54.9,
      discomTodPeakSurchargeLakhs: 5.2,
      discomDutyAndTaxLakhs: 4.5,
      discomFppcaLakhs: 1.5,
      solarPpaCostLakhs: 29.8,
      iexProcuredCostLakhs: 19.9,
      wheelingAndStuLossLakhs: 4.1,
      sldcSchedulingFeeLakhs: 0.4,
      cssAndAsExemptSavingsLakhs: 15.2,
      auditHash: "SHA256:44aa901c22ef5891",
      auditorName: "BEE Accredited Auditor (Reg #EA-2849)",
      auditDate: "05 May 2025",
    },
  },
  {
    month: "May 2025",
    monthId: "2025-05",
    discomBaselineCostLakhs: 92.4,
    actualProcuredCostLakhs: 58.6,
    netSavingsLakhs: 33.8,
    discomTariffPerKwh: 8.65,
    blendedTariffPerKwh: 5.49,
    unitsConsumedLakhs: 10.68,
    cleanEnergySharePercent: 73,
    pfIncentiveInr: 53400,
    breakdown: {
      discomFixedChargesLakhs: 18.5,
      discomEnergyChargesLakhs: 61.3,
      discomTodPeakSurchargeLakhs: 5.9,
      discomDutyAndTaxLakhs: 4.9,
      discomFppcaLakhs: 1.8,
      solarPpaCostLakhs: 33.6,
      iexProcuredCostLakhs: 20.3,
      wheelingAndStuLossLakhs: 4.3,
      sldcSchedulingFeeLakhs: 0.4,
      cssAndAsExemptSavingsLakhs: 16.9,
      auditHash: "SHA256:09cb4182ed30129f",
      auditorName: "BEE Accredited Auditor (Reg #EA-2849)",
      auditDate: "04 Jun 2025",
    },
  },
  {
    month: "Jun 2025",
    monthId: "2025-06",
    discomBaselineCostLakhs: 96.8,
    actualProcuredCostLakhs: 61.2,
    netSavingsLakhs: 35.6,
    discomTariffPerKwh: 8.65,
    blendedTariffPerKwh: 5.47,
    unitsConsumedLakhs: 11.19,
    cleanEnergySharePercent: 74,
    pfIncentiveInr: 55950,
    breakdown: {
      discomFixedChargesLakhs: 18.5,
      discomEnergyChargesLakhs: 64.9,
      discomTodPeakSurchargeLakhs: 6.2,
      discomDutyAndTaxLakhs: 5.2,
      discomFppcaLakhs: 2.0,
      solarPpaCostLakhs: 35.8,
      iexProcuredCostLakhs: 20.7,
      wheelingAndStuLossLakhs: 4.3,
      sldcSchedulingFeeLakhs: 0.4,
      cssAndAsExemptSavingsLakhs: 17.8,
      auditHash: "SHA256:77ae3309bd485123",
      auditorName: "BEE Accredited Auditor (Reg #EA-2849)",
      auditDate: "05 Jul 2025",
    },
  },
  {
    month: "Jul 2025",
    monthId: "2025-07",
    discomBaselineCostLakhs: 88.2,
    actualProcuredCostLakhs: 56.4,
    netSavingsLakhs: 31.8,
    discomTariffPerKwh: 8.65,
    blendedTariffPerKwh: 5.53,
    unitsConsumedLakhs: 10.19,
    cleanEnergySharePercent: 70,
    pfIncentiveInr: 50950,
    breakdown: {
      discomFixedChargesLakhs: 18.5,
      discomEnergyChargesLakhs: 58.1,
      discomTodPeakSurchargeLakhs: 5.5,
      discomDutyAndTaxLakhs: 4.7,
      discomFppcaLakhs: 1.4,
      solarPpaCostLakhs: 31.2,
      iexProcuredCostLakhs: 20.6,
      wheelingAndStuLossLakhs: 4.2,
      sldcSchedulingFeeLakhs: 0.4,
      cssAndAsExemptSavingsLakhs: 15.9,
      auditHash: "SHA256:56df90123cb49812",
      auditorName: "BEE Accredited Auditor (Reg #EA-2849)",
      auditDate: "04 Aug 2025",
    },
  },
  {
    month: "Aug 2025",
    monthId: "2025-08",
    discomBaselineCostLakhs: 86.4,
    actualProcuredCostLakhs: 55.1,
    netSavingsLakhs: 31.3,
    discomTariffPerKwh: 8.65,
    blendedTariffPerKwh: 5.52,
    unitsConsumedLakhs: 9.98,
    cleanEnergySharePercent: 71,
    pfIncentiveInr: 49900,
    breakdown: {
      discomFixedChargesLakhs: 18.5,
      discomEnergyChargesLakhs: 56.7,
      discomTodPeakSurchargeLakhs: 5.3,
      discomDutyAndTaxLakhs: 4.6,
      discomFppcaLakhs: 1.3,
      solarPpaCostLakhs: 30.6,
      iexProcuredCostLakhs: 20.0,
      wheelingAndStuLossLakhs: 4.1,
      sldcSchedulingFeeLakhs: 0.4,
      cssAndAsExemptSavingsLakhs: 15.6,
      auditHash: "SHA256:bb129038472910fa",
      auditorName: "BEE Accredited Auditor (Reg #EA-2849)",
      auditDate: "05 Sep 2025",
    },
  },
  {
    month: "Sep 2025",
    monthId: "2025-09",
    discomBaselineCostLakhs: 81.3,
    actualProcuredCostLakhs: 52.0,
    netSavingsLakhs: 29.3,
    discomTariffPerKwh: 8.65,
    blendedTariffPerKwh: 5.53,
    unitsConsumedLakhs: 9.4,
    cleanEnergySharePercent: 69,
    pfIncentiveInr: 47000,
    breakdown: {
      discomFixedChargesLakhs: 18.5,
      discomEnergyChargesLakhs: 52.8,
      discomTodPeakSurchargeLakhs: 4.9,
      discomDutyAndTaxLakhs: 4.1,
      discomFppcaLakhs: 1.0,
      solarPpaCostLakhs: 28.2,
      iexProcuredCostLakhs: 19.5,
      wheelingAndStuLossLakhs: 3.9,
      sldcSchedulingFeeLakhs: 0.4,
      cssAndAsExemptSavingsLakhs: 14.6,
      auditHash: "SHA256:cc98012384712910",
      auditorName: "BEE Accredited Auditor (Reg #EA-2849)",
      auditDate: "04 Oct 2025",
    },
  },
  {
    month: "Oct 2025",
    monthId: "2025-10",
    discomBaselineCostLakhs: 79.5,
    actualProcuredCostLakhs: 50.4,
    netSavingsLakhs: 29.1,
    discomTariffPerKwh: 8.65,
    blendedTariffPerKwh: 5.48,
    unitsConsumedLakhs: 9.19,
    cleanEnergySharePercent: 70,
    pfIncentiveInr: 45950,
    breakdown: {
      discomFixedChargesLakhs: 18.5,
      discomEnergyChargesLakhs: 51.4,
      discomTodPeakSurchargeLakhs: 4.7,
      discomDutyAndTaxLakhs: 4.0,
      discomFppcaLakhs: 0.9,
      solarPpaCostLakhs: 27.8,
      iexProcuredCostLakhs: 18.3,
      wheelingAndStuLossLakhs: 3.9,
      sldcSchedulingFeeLakhs: 0.4,
      cssAndAsExemptSavingsLakhs: 14.5,
      auditHash: "SHA256:a140fbc9883109da",
      auditorName: "BEE Accredited Auditor (Reg #EA-2849)",
      auditDate: "04 Nov 2025",
    },
  },
];

export default function SavingsDashboardPage() {
  const [selectedRange, setSelectedRange] = useState<"12m" | "6m" | "3m">("12m");
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(HISTORICAL_12_MONTH_SAVINGS.length - 1);

  const displayData =
    selectedRange === "3m"
      ? HISTORICAL_12_MONTH_SAVINGS.slice(-3)
      : selectedRange === "6m"
      ? HISTORICAL_12_MONTH_SAVINGS.slice(-6)
      : HISTORICAL_12_MONTH_SAVINGS;

  const activeMonth = HISTORICAL_12_MONTH_SAVINGS[selectedMonthIndex] || HISTORICAL_12_MONTH_SAVINGS[HISTORICAL_12_MONTH_SAVINGS.length - 1];

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
    let csv = "Month,Units_Lakh_kWh,Discom_Tariff_INR,Blended_Tariff_INR,Discom_Cost_Lakhs,Procured_Cost_Lakhs,Net_Savings_Lakhs,Clean_Energy_Pct,PF_Incentive_INR,Audit_Hash\n";
    HISTORICAL_12_MONTH_SAVINGS.forEach((d) => {
      csv += `${d.month},${d.unitsConsumedLakhs},${d.discomTariffPerKwh},${d.blendedTariffPerKwh},${d.discomBaselineCostLakhs},${d.actualProcuredCostLakhs},${d.netSavingsLakhs},${d.cleanEnergySharePercent}%,${d.pfIncentiveInr},${d.breakdown.auditHash}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Topnotch-Energy-Audited-Savings-Reconciliation.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrintAuditStatement = () => {
    window.print();
  };

  const handleDownloadPdfDossier = () => {
    const facility = encodeURIComponent("Century Plyboards (I) Ltd");
    const month = encodeURIComponent(activeMonth.month);
    window.open(`/api/reports/dossier?facility=${facility}&month=${month}&download=true`, "_blank");
  };

  const handleViewPdfDossier = () => {
    const facility = encodeURIComponent("Century Plyboards (I) Ltd");
    const month = encodeURIComponent(activeMonth.month);
    window.open(`/api/reports/dossier?facility=${facility}&month=${month}`, "_blank");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 mb-1">
            <span>PORTAL</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#F8BC26]">INVOICE RECONCILIATION</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[10px]">
              BEE GRADE-A AUDITED
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Industrial Power Tariff &amp; Invoice Reconciliation
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Cross-verified against UP SLDC Regional Energy Accounts (REA) &amp; Class 0.2s SEM Energy Logs
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleExportCsv}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-slate-700 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white text-xs font-mono font-bold transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#F8BC26]" />
            <span>CSV</span>
          </button>
          <button
            onClick={handleViewPdfDossier}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>View CERC PDF</span>
          </button>
          <button
            onClick={handleDownloadPdfDossier}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#F8BC26] to-[#E5A812] text-[#1C2C34] hover:brightness-110 text-xs font-mono font-bold transition-all shadow-lg shadow-[#F8BC26]/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Signed PDF</span>
          </button>
        </div>
      </div>

      {/* Top 4 Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0B1120] border border-slate-800/80 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
            <span>Cumulative Savings</span>
            <span className="text-emerald-400 font-bold">-{overallSavingsPercent}%</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tabular-nums">
            ₹{totalSavingsCr} Cr
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-1 flex items-center">
            <span>Net cash preserved vs DISCOM baseline</span>
          </div>
        </div>

        <div className="bg-[#0B1120] border border-slate-800/80 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-[#F8BC26]/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#F8BC26]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
            <span>Weighted Landed Tariff</span>
            <span className="text-[#F8BC26] font-bold">₹5.48 latest</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">
            ₹{avgBlendedTariff}
            <span className="text-xs text-slate-500 font-sans ml-1">/kWh</span>
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-1">
            DISCOM Baseline: <span className="line-through text-slate-500">₹8.65/kWh</span>
          </div>
        </div>

        <div className="bg-[#0B1120] border border-slate-800/80 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
            <span>Green Energy Share</span>
            <span className="text-cyan-400 font-bold">Solar + Wind</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono tabular-nums">
            70.4%
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-1">
            Group Captive + Onsite Rooftop PPA
          </div>
        </div>

        <div className="bg-[#0B1120] border border-slate-800/80 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-purple-500/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
            <span>Scope-2 Abatement</span>
            <span className="text-purple-400 font-bold">BRSR Tier-1</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-400 font-mono tabular-nums">
            {totalCo2OffsetTons.toLocaleString()}
            <span className="text-xs text-slate-500 font-sans ml-1">tCO₂e</span>
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-1">
            CEA Certified Grid Emission Factor 0.82
          </div>
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE SINGLE-MONTH INVOICE RECONCILIATION SHEET (AUDIT ENGINE)
         ========================================================================= */}
      <div className="bg-[#0B1120] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <h2 className="text-base sm:text-lg font-black text-white">
                Single-Month DISCOM vs. Topnotch Audit Reconciliation Sheet
              </h2>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Select any billing cycle to inspect itemized line-item charges, regulatory exemptions, and verified savings.
            </p>
          </div>

          {/* Month Selector Carousel / Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-slate-400">Select Billing Cycle:</span>
            <select
              value={selectedMonthIndex}
              onChange={(e) => setSelectedMonthIndex(parseInt(e.target.value))}
              aria-label="Select Billing Cycle"
              className="bg-[#060913] border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-[#F8BC26] font-bold focus:outline-none focus:border-[#F8BC26] transition-colors"
            >
              {HISTORICAL_12_MONTH_SAVINGS.map((item, idx) => (
                <option key={item.monthId} value={idx}>
                  {item.month} (Saved: ₹{item.netSavingsLakhs}L)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Audit Header Banner for Selected Month */}
        <div className="bg-[#060913] border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-[#F8BC26]/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono font-black text-lg">
              {activeMonth.month.split(" ")[0].toUpperCase()}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-black text-white">{activeMonth.month} Billing Dossier</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  VERIFIED REA
                </span>
              </div>
              <div className="text-xs font-mono text-slate-400 mt-0.5 flex flex-wrap gap-x-4 gap-y-1">
                <span>Total Consumption: <strong className="text-white">{activeMonth.unitsConsumedLakhs} Lakh kWh</strong></span>
                <span>Auditor: <strong className="text-slate-300">{activeMonth.breakdown.auditorName}</strong></span>
                <span>Date: <strong className="text-slate-300">{activeMonth.breakdown.auditDate}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-6">
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Effective Tariff</div>
              <div className="text-xl font-black font-mono text-[#F8BC26]">
                ₹{activeMonth.blendedTariffPerKwh}
                <span className="text-xs text-slate-400 font-sans font-normal ml-0.5">/kWh</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Net Monthly Savings</div>
              <div className="text-xl font-black font-mono text-emerald-400">
                +₹{activeMonth.netSavingsLakhs} L
              </div>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison: DISCOM Baseline vs Topnotch Landed Portfolio */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column: DISCOM Raw Benchmark Bill */}
          <div className="bg-[#080D1A] border border-red-500/20 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  State DISCOM Baseline Bill
                </h3>
              </div>
              <span className="text-xs font-mono text-red-400 font-bold">
                Total: ₹{activeMonth.discomBaselineCostLakhs} Lakhs
              </span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Demand Charges (Fixed Contract 7,500 kVA):</span>
                <span className="text-slate-200">₹{activeMonth.breakdown.discomFixedChargesLakhs} L</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Energy Charges (Base Tariff @ ₹7.40/kWh):</span>
                <span className="text-slate-200">₹{activeMonth.breakdown.discomEnergyChargesLakhs} L</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">ToD Peak Surcharge (18:00–22:00 +15%):</span>
                <span className="text-red-300">₹{activeMonth.breakdown.discomTodPeakSurchargeLakhs} L</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">FPPCA (Fuel Cost Adjustment Surcharge):</span>
                <span className="text-slate-200">₹{activeMonth.breakdown.discomFppcaLakhs} L</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Electricity Duty &amp; Regulatory Surcharge (7.5%):</span>
                <span className="text-slate-200">₹{activeMonth.breakdown.discomDutyAndTaxLakhs} L</span>
              </div>
              <div className="flex justify-between items-center pt-2 font-bold text-slate-100">
                <span>Baseline Effective Tariff:</span>
                <span className="text-red-400">₹{activeMonth.discomTariffPerKwh} / kWh</span>
              </div>
            </div>
          </div>

          {/* Right Column: Topnotch Optimized Landed Structure */}
          <div className="bg-[#080D1A] border border-emerald-500/30 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Topnotch Landed Procurement
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                Total: ₹{activeMonth.actualProcuredCostLakhs} Lakhs
              </span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Solar Captive PPA (Landed @ ₹3.80/kWh):</span>
                <span className="text-slate-200">₹{activeMonth.breakdown.solarPpaCostLakhs} L</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">IEX GDAM &amp; DAM Off-Peak Procured:</span>
                <span className="text-slate-200">₹{activeMonth.breakdown.iexProcuredCostLakhs} L</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">STU Transmission &amp; Wheeling Losses:</span>
                <span className="text-slate-200">₹{activeMonth.breakdown.wheelingAndStuLossLakhs} L</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">SLDC Scheduling &amp; NOAR Application Fees:</span>
                <span className="text-slate-200">₹{activeMonth.breakdown.sldcSchedulingFeeLakhs} L</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Section 42 Statutory CSS/AS Exemption:</span>
                <span className="text-emerald-400 font-bold">
                  Saved ₹{activeMonth.breakdown.cssAndAsExemptSavingsLakhs} L (100% Waived)
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 font-bold text-slate-100">
                <span>Topnotch Blended Tariff:</span>
                <span className="text-emerald-400">₹{activeMonth.blendedTariffPerKwh} / kWh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Net Savings & Auditor Seal Footnote */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 via-[#0E1628] to-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white flex items-center">
                <span>Net Certified Monthly Savings:</span>
                <span className="text-emerald-400 ml-1.5 text-sm">
                  ₹{activeMonth.netSavingsLakhs} Lakhs ({(((activeMonth.discomBaselineCostLakhs - activeMonth.actualProcuredCostLakhs) / activeMonth.discomBaselineCostLakhs) * 100).toFixed(1)}% reduction)
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                Digital Verification Hash: <span className="text-[#F8BC26]">{activeMonth.breakdown.auditHash}</span> • Tamper-Evident SHA-256
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
            <CheckCircle className="w-4 h-4" />
            <span>Power Factor Incentive Credited: +₹{activeMonth.pfIncentiveInr.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Main 12-Month Trend Chart */}
      <div className="bg-[#0B1120] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-sm sm:text-base font-black text-white flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              <span>12-Month Procurement Trend &amp; Baseline Delta (₹ Lakhs)</span>
            </h2>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              Comparative visualization of DISCOM baseline cost vs. Topnotch actual billed cost
            </p>
          </div>

          <div className="flex items-center space-x-1.5 bg-[#060913] p-1 rounded-xl border border-slate-800">
            {(["3m", "6m", "12m"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRange(r)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  selectedRange === r
                    ? "bg-[#F8BC26] text-[#1C2C34] shadow-md shadow-[#F8BC26]/20"
                    : "text-slate-400 hover:text-white"
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
                  backgroundColor: "#060913",
                  borderColor: "#334155",
                  borderRadius: "0.75rem",
                  fontSize: "0.75rem",
                  fontFamily: "monospace",
                  color: "#FFFFFF",
                }}
                formatter={(value: unknown, name: unknown) => {
                  const formatted = typeof value === "number" ? value.toFixed(1) : String(value ?? "");
                  return [`₹${formatted} Lakhs`, String(name ?? "")];
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
                opacity={0.7}
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

      {/* 12-Month Historical Audit Reconciliation Table */}
      <div className="bg-[#0B1120] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-white font-black text-sm">
              Audited 12-Month Settlement Ledger
            </h3>
            <p className="text-slate-400 font-mono text-xs mt-0.5">
              Click any row to open the full single-month reconciliation breakdown above
            </p>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center">
            <CheckCircle className="w-3.5 h-3.5 mr-1" />
            100% Reconciled with State SLDC
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#060913] text-slate-400 text-[10px] uppercase">
              <tr>
                <th className="p-3">Month</th>
                <th className="p-3">Consumption</th>
                <th className="p-3">Baseline DISCOM</th>
                <th className="p-3">Landed Tariff</th>
                <th className="p-3">Baseline Total</th>
                <th className="p-3">Actual Billed</th>
                <th className="p-3">Net Savings</th>
                <th className="p-3">PF Rebate</th>
                <th className="p-3 text-right">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {displayData.map((d) => (
                <tr
                  key={d.month}
                  onClick={() => {
                    const originalIdx = HISTORICAL_12_MONTH_SAVINGS.findIndex((item) => item.month === d.month);
                    if (originalIdx >= 0) setSelectedMonthIndex(originalIdx);
                  }}
                  className={`hover:bg-white/5 transition-colors cursor-pointer ${
                    activeMonth.month === d.month ? "bg-white/5 border-l-2 border-[#F8BC26]" : ""
                  }`}
                >
                  <td className="p-3 font-bold text-white flex items-center space-x-1.5">
                    <span>{d.month}</span>
                    {activeMonth.month === d.month && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F8BC26]" />
                    )}
                  </td>
                  <td className="p-3 tabular-nums">{d.unitsConsumedLakhs} L kWh</td>
                  <td className="p-3 tabular-nums text-slate-400">₹{d.discomTariffPerKwh}/kWh</td>
                  <td className="p-3 tabular-nums text-cyan-400 font-bold">
                    ₹{d.blendedTariffPerKwh}/kWh
                  </td>
                  <td className="p-3 tabular-nums text-red-400">₹{d.discomBaselineCostLakhs} L</td>
                  <td className="p-3 tabular-nums text-white">₹{d.actualProcuredCostLakhs} L</td>
                  <td className="p-3 tabular-nums text-emerald-400 font-bold">
                    +₹{d.netSavingsLakhs} L
                  </td>
                  <td className="p-3 tabular-nums text-purple-400">
                    +₹{d.pfIncentiveInr.toLocaleString()}
                  </td>
                  <td className="p-3 text-right text-[10px] text-emerald-400 font-bold">
                    PASSED
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
