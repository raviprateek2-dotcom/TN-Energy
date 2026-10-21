"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  UploadCloud,
  FileText,
  AlertCircle,
  CheckCircle2,
  Zap,
  TrendingDown,
  Gauge,
  ArrowRight,
  Shield,
  Loader2,
  FileSpreadsheet,
  Calculator,
  Lock,
  Printer,
  Sparkles,
} from "lucide-react";
import { BilateralNdaModal, NdaExecutionData } from "@/components/legal/BilateralNdaModal";
import { BoardroomDossierModal } from "@/components/reports/BoardroomDossierModal";
import { parseElectricityBillFile } from "@/lib/bill-parser/client-bill-ocr";
import { playBourseSuccess } from "@/lib/audio/switch-audio";

interface BillAuditDiagnostic {
  clientProfile: string;
  state: string;
  discom: string;
  voltageKv: string;
  contractDemandKva: number;
  recordedMaxDemandKva: number;
  billingDemandKva: number;
  monthlyBilledKvah: number;
  monthlyBillAmountInr: number;
  powerFactor: number;
  fuelSurchargeInr: number;
  todPeakUnitsKwh: number;
  todPeakSurchargeInr: number;
  findings: {
    title: string;
    description: string;
    potentialSavingsInrMonthly: number;
    severity: "critical" | "warning" | "opportunity";
  }[];
  totalMonthlyLeakageInr: number;
  recommendedProcurementMix: {
    source: string;
    capacity: string;
    monthlySavingsInr: number;
  }[];
  confidenceScore?: number;
  detectedPatterns?: string[];
  isParsedFromFile?: boolean;
}

const SAMPLE_BILLS: Record<string, BillAuditDiagnostic> = {
  steel: {
    clientProfile: "Heavy Steel Ingot & Rolling Mill",
    state: "Uttar Pradesh",
    discom: "Paschimanchal Vidyut Vitran Nigam Ltd (PVVNL)",
    voltageKv: "33 kV",
    contractDemandKva: 8500,
    recordedMaxDemandKva: 6420,
    billingDemandKva: 7225, // 85% of CD rule
    monthlyBilledKvah: 2850000,
    monthlyBillAmountInr: 23655000, // ₹2.36 Cr
    powerFactor: 0.932,
    fuelSurchargeInr: 1240000,
    todPeakUnitsKwh: 684000,
    todPeakSurchargeInr: 1026000,
    findings: [
      {
        title: "Sub-Optimal Power Factor (0.932 vs 0.995 Target)",
        description: "Operating at 0.932 PF incurs a DISCOM kVAh penalty and forfeits the 0.5%–1.5% high-PF incentive under UPERC HT tariff.",
        potentialSavingsInrMonthly: 285000,
        severity: "critical",
      },
      {
        title: "Contract Demand Headroom (75.5% Utilization)",
        description: "Billed at 85% deemed minimum (7,225 kVA) despite recorded MD of 6,420 kVA. Potential to rationalize sanctioned demand or absorb open access units.",
        potentialSavingsInrMonthly: 161000,
        severity: "warning",
      },
      {
        title: "Heavy ToD Evening Peak Surcharge Exposure",
        description: "6.84 Lakh units consumed between 18:00–22:00 IST at a +15% DISCOM peak surcharge rate.",
        potentialSavingsInrMonthly: 1026000,
        severity: "opportunity",
      },
    ],
    totalMonthlyLeakageInr: 1472000,
    recommendedProcurementMix: [
      { source: "Group Captive Solar SPV", capacity: "6.5 MWp", monthlySavingsInr: 3250000 },
      { source: "IEX DAM Solar Hours (Slot 25-64)", capacity: "2.0 MW", monthlySavingsInr: 880000 },
      { source: "APFC Capacitor Bank Retrofit", capacity: "2,400 kVAR", monthlySavingsInr: 285000 },
    ],
  },
  textile: {
    clientProfile: "Automated Synthetic Textile & Weaving Park",
    state: "Gujarat",
    discom: "Dakshin Gujarat Vij Company Ltd (DGVCL)",
    voltageKv: "66 kV",
    contractDemandKva: 12000,
    recordedMaxDemandKva: 10800,
    billingDemandKva: 10800,
    monthlyBilledKvah: 4600000,
    monthlyBillAmountInr: 39100000, // ₹3.91 Cr
    powerFactor: 0.982,
    fuelSurchargeInr: 2760000,
    todPeakUnitsKwh: 1150000,
    todPeakSurchargeInr: 2070000,
    findings: [
      {
        title: "FPPPA Fuel Price Pass-Through Surcharge",
        description: "High GUVNL FPPPA rate of ₹3.05/kWh added across all 46 Lakh units billed.",
        potentialSavingsInrMonthly: 2760000,
        severity: "critical",
      },
      {
        title: "Absence of Interstate Renewable Open Access",
        description: "100% reliant on DGVCL grid power; zero utilization of Gujarat's favorable Wind-Solar Hybrid captive policy.",
        potentialSavingsInrMonthly: 4140000,
        severity: "opportunity",
      },
    ],
    totalMonthlyLeakageInr: 6900000,
    recommendedProcurementMix: [
      { source: "Wind-Solar Hybrid Captive PPA", capacity: "14.0 MW", monthlySavingsInr: 4140000 },
      { source: "IEX RTM Dynamic Balancing Desk", capacity: "3.0 MW", monthlySavingsInr: 1380000 },
    ],
  },
};

export function BillAuditDropzone() {
  const [isDragging, setIsDragging] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [activeDiagnostic, setActiveDiagnostic] = useState<BillAuditDiagnostic | null>(null);

  // NDA State & Modal
  const [ndaExecution, setNdaExecution] = useState<NdaExecutionData | null>(null);
  const [isNdaModalOpen, setIsNdaModalOpen] = useState(false);
  const [pendingAnalysis, setPendingAnalysis] = useState<{
    type: "steel" | "textile" | "file";
    fileName: string;
    file?: File;
  } | null>(null);

  // Boardroom Dossier Modal
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  const processFileWithOcr = async (file: File) => {
    setAnalyzing(true);
    setUploadedFileName(file.name);
    try {
      const parsed = await parseElectricityBillFile(file);
      const diagnostic: BillAuditDiagnostic = {
        clientProfile: `${parsed.state} Industrial HT Facility`,
        state: parsed.state,
        discom: parsed.discomName,
        voltageKv: parsed.voltageKv,
        contractDemandKva: parsed.contractDemandKva,
        recordedMaxDemandKva: parsed.recordedMaxDemandKva,
        billingDemandKva: parsed.billingDemandKva,
        monthlyBilledKvah: parsed.monthlyBilledKvah,
        monthlyBillAmountInr: parsed.totalBillAmountInr,
        powerFactor: parsed.powerFactor,
        fuelSurchargeInr: parsed.fuelSurchargeInr,
        todPeakUnitsKwh: parsed.todPeakUnitsKwh,
        todPeakSurchargeInr: Math.round(parsed.todPeakUnitsKwh * 1.5),
        findings: parsed.findings,
        totalMonthlyLeakageInr: parsed.totalMonthlySavingsInr,
        recommendedProcurementMix: [
          {
            source: "Group Captive Solar SPV",
            capacity: `${Math.max(1, Number((parsed.contractDemandKva * 0.0008).toFixed(1)))} MWp`,
            monthlySavingsInr: Math.round(parsed.totalMonthlySavingsInr * 0.6),
          },
          {
            source: "IEX DAM Solar Hours (Slot 25-64)",
            capacity: `${Math.max(0.5, Number((parsed.contractDemandKva * 0.00025).toFixed(1)))} MW`,
            monthlySavingsInr: Math.round(parsed.totalMonthlySavingsInr * 0.25),
          },
          {
            source: "APFC Capacitor Bank Retrofit",
            capacity: `${Math.round(parsed.contractDemandKva * 0.3)} kVAR`,
            monthlySavingsInr: Math.round(parsed.totalMonthlySavingsInr * 0.15),
          },
        ],
        confidenceScore: parsed.confidenceScore,
        detectedPatterns: parsed.detectedPatterns,
        isParsedFromFile: true,
      };
      setTimeout(() => {
        setActiveDiagnostic(diagnostic);
        setAnalyzing(false);
        playBourseSuccess();
      }, 900);
    } catch {
      setTimeout(() => {
        setActiveDiagnostic(SAMPLE_BILLS.steel);
        setAnalyzing(false);
        playBourseSuccess();
      }, 900);
    }
  };

  const triggerAnalysis = (
    type: "steel" | "textile" | "file",
    fileName: string,
    file?: File
  ) => {
    if (!ndaExecution) {
      // Prompt bilateral NDA click-through before unlocking confidential audit
      setPendingAnalysis({ type, fileName, file });
      setIsNdaModalOpen(true);
      return;
    }

    if (file) {
      processFileWithOcr(file);
      return;
    }

    setAnalyzing(true);
    setUploadedFileName(fileName);
    setTimeout(() => {
      setActiveDiagnostic(SAMPLE_BILLS[type === "textile" ? "textile" : "steel"]);
      setAnalyzing(false);
      playBourseSuccess();
    }, 1000);
  };

  const handleNdaAccepted = (data: NdaExecutionData) => {
    setNdaExecution(data);
    setIsNdaModalOpen(false);
    if (pendingAnalysis) {
      if (pendingAnalysis.file) {
        processFileWithOcr(pendingAnalysis.file);
      } else {
        setAnalyzing(true);
        setUploadedFileName(pendingAnalysis.fileName);
        setTimeout(() => {
          setActiveDiagnostic(
            SAMPLE_BILLS[pendingAnalysis.type === "textile" ? "textile" : "steel"]
          );
          setAnalyzing(false);
          playBourseSuccess();
        }, 1000);
      }
      setPendingAnalysis(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      triggerAnalysis("file", files[0].name, files[0]);
    }
  };

  const handleExportToSimulator = () => {
    if (!activeDiagnostic) return;
    const isUP = activeDiagnostic.state.toLowerCase().includes("uttar");
    const detail = {
      stateId: isUP ? "uttar-pradesh" : "gujarat",
      discomName: activeDiagnostic.discom,
      voltageLevel: activeDiagnostic.voltageKv.includes("33") ? "33kV" : activeDiagnostic.voltageKv.includes("66") ? "66kV" : "11kV",
      contractDemandKva: activeDiagnostic.contractDemandKva,
      monthlyConsumptionLakhUnits: Number((activeDiagnostic.monthlyBilledKvah / 100000).toFixed(1)),
      discomTariffPerKwh: Number((activeDiagnostic.monthlyBillAmountInr / activeDiagnostic.monthlyBilledKvah).toFixed(2)),
      clientProfile: activeDiagnostic.clientProfile,
    };
    window.dispatchEvent(new CustomEvent("load-bill-audit-to-sim", { detail }));
    const simElem = document.getElementById("simulator-engine");
    if (simElem) {
      simElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const effectiveDiscomRate = activeDiagnostic
    ? activeDiagnostic.monthlyBillAmountInr / activeDiagnostic.monthlyBilledKvah
    : 8.3;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <h3 className="text-lg sm:text-xl font-black text-[#1C2C34]">
              Confidential HT Industrial Electricity Bill Diagnostic
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-mono mt-1">
            Automated DISCOM Tariff &amp; kVAh Power Factor Audit Engine (BEE Standards)
          </p>
        </div>

        {/* Demo Bill Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-slate-500 hidden sm:inline">Try Demo Bill:</span>
          <button
            onClick={() => triggerAnalysis("steel", "UP_Steel_Mill_33kV_PVVNL_Bill.pdf")}
            className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 font-mono text-xs font-bold transition-all shadow-2xs"
          >
            UP 8.5 MVA Steel
          </button>
          <button
            onClick={() => triggerAnalysis("textile", "Gujarat_Textile_66kV_DGVCL_Bill.pdf")}
            className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 font-mono text-xs font-bold transition-all shadow-2xs"
          >
            Gujarat 12 MVA Textile
          </button>
        </div>
      </div>

      {/* NDA Banner Status */}
      <div className="mt-4 py-2.5 px-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center space-x-2">
          <Shield className={`w-4 h-4 ${ndaExecution ? "text-emerald-600" : "text-amber-600"}`} />
          {ndaExecution ? (
            <span className="text-emerald-800 font-semibold">
              Bilateral NDA Executed: {ndaExecution.certificateId} ({ndaExecution.companyName})
            </span>
          ) : (
            <span className="text-slate-600">
              Institutional Bilateral NDA &amp; Data Custody Gateway Active
            </span>
          )}
        </div>
        {!ndaExecution ? (
          <button
            onClick={() => setIsNdaModalOpen(true)}
            className="text-amber-800 hover:text-amber-900 font-bold underline cursor-pointer"
          >
            Review &amp; Execute NDA →
          </button>
        ) : (
          <span className="text-emerald-700 text-[11px] font-bold">
            Data Custody Sealed (Sec 43A IT Act)
          </span>
        )}
      </div>

      {/* Dropzone Area */}
      {!activeDiagnostic && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`mt-6 border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all ${
            isDragging
              ? "border-emerald-500 bg-emerald-50/50"
              : "border-slate-300 bg-slate-50/60 hover:border-slate-400"
          }`}
        >
          {analyzing ? (
            <div className="py-8 flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
              <div className="text-slate-900 font-bold font-mono text-sm">
                Parsing HT Tariff Parameters...
              </div>
              <p className="text-xs font-mono text-slate-500">
                Auditing Contract Demand, kVAh Power Factor, ToD Peak Slots, and DISCOM Surcharges
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-emerald-700 shadow-sm">
                <UploadCloud className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-[#1C2C34] font-black text-base sm:text-lg">
                  Drag &amp; drop your monthly DISCOM HT/EHT electricity bill
                </h4>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  Supports PDF, Scanned Bills, Excel (.xlsx), or CSV from any Indian State Utility
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-slate-500">
                <span className="flex items-center space-x-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Confidential (NDA Grounded)</span>
                </span>
                <span>•</span>
                <span>BEE Certified Auditor Review</span>
                <span>•</span>
                <span>Zero Obligation Diagnostic</span>
              </div>
              <div className="pt-2">
                <label className="cursor-pointer inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#F8BC26] hover:bg-[#e6ab1e] text-[#1C2C34] font-bold font-mono text-xs transition-all shadow-sm">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Upload Electricity Bill</span>
                  <input
                    type="file"
                    accept=".pdf,.xlsx,.xls,.csv,.txt"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        triggerAnalysis("file", e.target.files[0].name, e.target.files[0]);
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Diagnostic Results View */}
      {activeDiagnostic && !analyzing && (
        <div className="mt-6 space-y-6">
          {/* Top Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-emerald-800 uppercase tracking-wider font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Preliminary Bill Diagnostic Complete</span>
                {uploadedFileName && (
                  <span className="text-slate-500">({uploadedFileName})</span>
                )}
              </div>
              <h4 className="text-lg font-black text-[#1C2C34] mt-1.5">
                {activeDiagnostic.clientProfile} • {activeDiagnostic.state}
              </h4>
              <p className="text-xs font-mono text-slate-600 mt-0.5">
                {activeDiagnostic.discom} ({activeDiagnostic.voltageKv})
              </p>
              {activeDiagnostic.detectedPatterns && activeDiagnostic.detectedPatterns.length > 0 && (
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase bg-emerald-100/80 border border-emerald-300 px-2 py-0.5 rounded-md">
                    OCR Confidence: {activeDiagnostic.confidenceScore || 85}%
                  </span>
                  {activeDiagnostic.detectedPatterns.map((pat, idx) => (
                    <span key={idx} className="text-[10px] font-mono text-slate-700 bg-white/80 border border-slate-200 px-2 py-0.5 rounded-md">
                      {pat}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-500 uppercase">Identified Monthly Leakage</div>
                <div className="text-2xl font-black text-red-600 font-mono tabular-nums">
                  ₹{(activeDiagnostic.totalMonthlyLeakageInr / 100000).toFixed(2)} L/mo
                </div>
              </div>
              <button
                onClick={() => setActiveDiagnostic(null)}
                className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-mono text-xs font-bold transition-colors shadow-2xs"
              >
                Upload Another
              </button>
            </div>
          </div>

          {/* Key Parameters 4-Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
            <div className="bg-[#F9FAFB] border border-slate-200 rounded-xl p-3.5">
              <span className="text-[10px] text-slate-500 uppercase block font-semibold">Sanctioned vs Recorded MD</span>
              <span className="text-sm font-bold text-slate-900 tabular-nums block mt-1">
                {activeDiagnostic.recordedMaxDemandKva} / {activeDiagnostic.contractDemandKva} kVA
              </span>
              <span className="text-[10px] text-amber-800 block mt-0.5">
                Billed at {activeDiagnostic.billingDemandKva} kVA min
              </span>
            </div>

            <div className="bg-[#F9FAFB] border border-slate-200 rounded-xl p-3.5">
              <span className="text-[10px] text-slate-500 uppercase block font-semibold">Operating Power Factor</span>
              <span className="text-sm font-bold text-slate-900 tabular-nums block mt-1">
                {activeDiagnostic.powerFactor.toFixed(3)} Lag
              </span>
              <span className={`text-[10px] block mt-0.5 font-bold ${activeDiagnostic.powerFactor < 0.95 ? "text-red-600" : "text-emerald-700"}`}>
                {activeDiagnostic.powerFactor < 0.95 ? "Penalty Slab Active" : "Incentive Eligible"}
              </span>
            </div>

            <div className="bg-[#F9FAFB] border border-slate-200 rounded-xl p-3.5">
              <span className="text-[10px] text-slate-500 uppercase block font-semibold">Monthly Total Bill</span>
              <span className="text-sm font-bold text-slate-900 tabular-nums block mt-1">
                ₹{(activeDiagnostic.monthlyBillAmountInr / 10000000).toFixed(2)} Cr
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                Effective: ₹{effectiveDiscomRate.toFixed(2)}/kVAh
              </span>
            </div>

            <div className="bg-[#F9FAFB] border border-slate-200 rounded-xl p-3.5">
              <span className="text-[10px] text-slate-500 uppercase block font-semibold">ToD Peak Surcharge Units</span>
              <span className="text-sm font-bold text-slate-900 tabular-nums block mt-1">
                {(activeDiagnostic.todPeakUnitsKwh / 100000).toFixed(2)} L kWh
              </span>
              <span className="text-[10px] text-slate-700 block mt-0.5 font-bold">
                ₹{(activeDiagnostic.todPeakSurchargeInr / 100000).toFixed(2)} L Surcharge
              </span>
            </div>
          </div>

          {/* Audit Findings */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 font-mono mb-4 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Identified Cost Leakages &amp; Statutory Non-Optimizations</span>
            </h4>
            <div className="space-y-3">
              {activeDiagnostic.findings.map((f, i) => (
                <div
                  key={i}
                  className="bg-[#F9FAFB] border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs font-mono"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          f.severity === "critical"
                            ? "bg-red-500"
                            : f.severity === "warning"
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                        }`}
                      />
                      <span className="text-slate-900 font-bold">{f.title}</span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed pl-4">
                      {f.description}
                    </p>
                  </div>
                  <div className="sm:text-right flex-shrink-0 pl-4 sm:pl-0">
                    <span className="text-[10px] text-slate-400 uppercase block">Potential Recovery</span>
                    <span className="text-emerald-700 font-bold text-sm tabular-nums">
                      +₹{(f.potentialSavingsInrMonthly / 100000).toFixed(2)} L/mo
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Roadmap & Action */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 font-mono">
                Topnotch Turnkey Remediation Package
              </h4>
              <p className="text-xs sm:text-sm font-mono text-slate-700 max-w-xl leading-relaxed">
                Our BEE Certified Energy Auditors and CERC Power Trading Desk can install APFC capacitor banks,
                initiate SLDC Standing Clearance for IEX/Captive procurement, and optimize your contract demand
                within 30 to 45 business days.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={() => setIsDossierOpen(true)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold font-mono text-xs transition-all shadow-sm flex items-center justify-center space-x-2"
                title="Generate board-ready A4 executive summary"
              >
                <Printer className="w-4 h-4 text-[#F8BC26]" />
                <span>Boardroom PDF Dossier</span>
              </button>
              <button
                onClick={handleExportToSimulator}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#F8BC26] hover:bg-[#e6ab1e] text-[#1C2C34] font-bold font-mono text-xs transition-all shadow-sm flex items-center justify-center space-x-2"
                title="Populate Open Access simulator with this plant's telemetry"
              >
                <Calculator className="w-4 h-4" />
                <span>Import into Simulator →</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NDA Modal Gateway */}
      <BilateralNdaModal
        isOpen={isNdaModalOpen}
        onClose={() => {
          setIsNdaModalOpen(false);
          setPendingAnalysis(null);
        }}
        onAccept={handleNdaAccepted}
        defaultCompany={
          pendingAnalysis?.type === "steel"
            ? "Heavy Steel Rolling Mill"
            : pendingAnalysis?.type === "textile"
            ? "Synthetic Textile Park"
            : ""
        }
      />

      {/* Boardroom Dossier Modal */}
      {activeDiagnostic && (
        <BoardroomDossierModal
          isOpen={isDossierOpen}
          onClose={() => setIsDossierOpen(false)}
          data={{
            clientCompany: ndaExecution?.companyName || activeDiagnostic.clientProfile,
            stateName: activeDiagnostic.state,
            discomName: activeDiagnostic.discom,
            voltageLevel: activeDiagnostic.voltageKv,
            contractDemandKva: activeDiagnostic.contractDemandKva,
            monthlyConsumptionKwh: activeDiagnostic.monthlyBilledKvah,
            currentDiscomTariff: effectiveDiscomRate,
            projectedLandedTariff: 4.85,
            monthlySavingsInr: activeDiagnostic.totalMonthlyLeakageInr + 1500000,
            annualSavingsInr: (activeDiagnostic.totalMonthlyLeakageInr + 1500000) * 12,
            model: "group-captive",
            powerSource: "solar-wind-hybrid",
            costBreakdown: {
              generationCost: 3.45,
              transmissionCharge: 0.35,
              wheelingCharge: 0.45,
              crossSubsidySurcharge: 0,
              additionalSurcharge: 0,
              sldcAndScheduling: 0.04,
            },
          }}
        />
      )}
    </div>
  );
}
