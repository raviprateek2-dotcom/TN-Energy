"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  UploadCloud,
  FileText,
  AlertCircle,
  CheckCircle,
  Zap,
  TrendingDown,
  Gauge,
  ArrowRight,
  Shield,
  Loader2,
  FileSpreadsheet,
  Calculator,
} from "lucide-react";

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
    totalMonthlyLeakageInr: 1472000, // ₹14.72 Lakhs/mo
    recommendedProcurementMix: [
      { source: "Group Captive Solar Farm", capacity: "6.0 MW", monthlySavingsInr: 2160000 },
      { source: "IEX DAM Solar Hours", capacity: "2.0 MW", monthlySavingsInr: 680000 },
      { source: "Automatic Power Factor (APFC) Tuning", capacity: "0.995 PF", monthlySavingsInr: 285000 },
    ],
  },
  textile: {
    clientProfile: "Synthetic Spinning & Weaving Mill",
    state: "Gujarat",
    discom: "Dakshin Gujarat Vij Company Ltd (DGVCL)",
    voltageKv: "66 kV",
    contractDemandKva: 12000,
    recordedMaxDemandKva: 11100,
    billingDemandKva: 11100,
    monthlyBilledKvah: 4950000,
    monthlyBillAmountInr: 39105000, // ₹3.91 Cr
    powerFactor: 0.978,
    fuelSurchargeInr: 2970000,
    todPeakUnitsKwh: 1188000,
    todPeakSurchargeInr: 1782000,
    findings: [
      {
        title: "High Fuel Price & Power Purchase Cost (FPPPA)",
        description: "FPPPA at ₹2.60/kWh accounts for 32.8% of the total monthly bill. Unhedged against international coal and gas price swings.",
        potentialSavingsInrMonthly: 1850000,
        severity: "critical",
      },
      {
        title: "Wind-Solar Hybrid Open Access Eligibility",
        description: "Continuous 24x7 baseload with high PLF makes this plant an ideal candidate for offsite Wind-Solar Hybrid under GERC Open Access framework.",
        potentialSavingsInrMonthly: 3120000,
        severity: "opportunity",
      },
    ],
    totalMonthlyLeakageInr: 4970000,
    recommendedProcurementMix: [
      { source: "Offsite Wind-Solar Hybrid PPA", capacity: "10.0 MW", monthlySavingsInr: 3120000 },
      { source: "Onsite Rooftop Solar (PEB Sheds)", capacity: "2.5 MWp", monthlySavingsInr: 580000 },
    ],
  },
};

export function BillAuditDropzone() {
  const [activeDiagnostic, setActiveDiagnostic] = useState<BillAuditDiagnostic | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const simulateAnalysis = (billKey: string, fileName?: string) => {
    setAnalyzing(true);
    setUploadedFileName(fileName || null);
    setTimeout(() => {
      setActiveDiagnostic(SAMPLE_BILLS[billKey] || SAMPLE_BILLS.steel);
      setAnalyzing(false);
    }, 1200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      simulateAnalysis("steel", files[0].name);
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

  return (
    <div className="bg-grid-navy-950 border border-grid-slate-800 rounded-2xl p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-grid-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-grid-emerald-400" />
            <h3 className="text-base sm:text-lg font-bold text-white font-sans">
              Confidential HT Industrial Electricity Bill Diagnostic
            </h3>
          </div>
          <p className="text-xs text-grid-slate-400 font-mono mt-0.5">
            Automated Discom Tariff &amp; kVAh Power Factor Audit Engine (BEE Standards)
          </p>
        </div>

        {/* Demo Bill Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-mono text-grid-slate-500 hidden sm:inline">Try Demo Bill:</span>
          <button
            onClick={() => simulateAnalysis("steel", "UP_Steel_Mill_33kV_PVVNL_Bill.pdf")}
            className="px-3 py-1.5 rounded-lg bg-grid-navy-900 border border-grid-slate-700 hover:border-grid-emerald-500/50 text-grid-slate-300 font-mono text-xs font-bold transition-all"
          >
            UP 8.5 MVA Steel
          </button>
          <button
            onClick={() => simulateAnalysis("textile", "Gujarat_Textile_66kV_DGVCL_Bill.pdf")}
            className="px-3 py-1.5 rounded-lg bg-grid-navy-900 border border-grid-slate-700 hover:border-grid-cyan-500/50 text-grid-slate-300 font-mono text-xs font-bold transition-all"
          >
            Gujarat 12 MVA Textile
          </button>
        </div>
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
              ? "border-grid-emerald-400 bg-grid-emerald-500/10"
              : "border-grid-slate-800 bg-grid-navy-900/40 hover:border-grid-slate-700"
          }`}
        >
          {analyzing ? (
            <div className="py-8 flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-10 h-10 text-grid-emerald-400 animate-spin" />
              <div className="text-white font-bold font-mono text-sm">
                Parsing HT Tariff Parameters...
              </div>
              <p className="text-xs font-mono text-grid-slate-500">
                Auditing Contract Demand, kVAh Power Factor, ToD Peak Slots, and Discom Surcharges
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-grid-navy-900 border border-grid-slate-700 flex items-center justify-center text-grid-emerald-400">
                <UploadCloud className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm sm:text-base">
                  Drag &amp; drop your monthly Discom HT/EHT electricity bill
                </h4>
                <p className="text-xs text-grid-slate-400 font-mono mt-1">
                  Supports PDF, Scanned Bills, Excel (.xlsx), or CSV from any Indian State Utility
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-grid-slate-500">
                <span className="flex items-center space-x-1">
                  <Shield className="w-3.5 h-3.5 text-grid-emerald-400" />
                  <span>100% Confidential (NDA Grounded)</span>
                </span>
                <span>•</span>
                <span>BEE Certified Auditor Review</span>
                <span>•</span>
                <span>Zero Obligation Diagnostic</span>
              </div>
              <div className="pt-2">
                <label className="cursor-pointer inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-grid-emerald-500 hover:bg-grid-emerald-400 text-grid-navy-950 font-bold font-mono text-xs transition-all shadow-lg shadow-grid-emerald-500/20">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Upload Electricity Bill</span>
                  <input
                    type="file"
                    accept=".pdf,.xlsx,.xls,.csv"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        simulateAnalysis("steel", e.target.files[0].name);
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
          <div className="bg-gradient-to-r from-grid-emerald-500/10 via-grid-navy-900 to-grid-navy-900 border border-grid-emerald-500/30 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-[11px] font-mono text-grid-emerald-400 uppercase tracking-widest font-bold">
                <CheckCircle className="w-4 h-4" />
                <span>Preliminary Bill Diagnostic Complete</span>
                {uploadedFileName && (
                  <span className="text-grid-slate-400">({uploadedFileName})</span>
                )}
              </div>
              <h4 className="text-lg font-bold text-white mt-1">
                {activeDiagnostic.clientProfile} • {activeDiagnostic.state}
              </h4>
              <p className="text-xs font-mono text-grid-slate-400 mt-0.5">
                {activeDiagnostic.discom} ({activeDiagnostic.voltageKv})
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-[10px] font-mono text-grid-slate-500 uppercase">Identified Leakage</div>
                <div className="text-xl font-extrabold text-red-400 font-mono tabular-nums">
                  ₹{(activeDiagnostic.totalMonthlyLeakageInr / 100000).toFixed(2)} Lakhs/mo
                </div>
              </div>
              <button
                onClick={() => setActiveDiagnostic(null)}
                className="px-3 py-1.5 rounded-lg border border-grid-slate-700 bg-grid-navy-900 hover:bg-grid-navy-800 text-grid-slate-300 font-mono text-xs transition-colors"
              >
                Upload Another
              </button>
            </div>
          </div>

          {/* Key Parameters 4-Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
            <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-xl p-3">
              <span className="text-[10px] text-grid-slate-500 uppercase block">Sanctioned vs Recorded MD</span>
              <span className="text-sm font-bold text-white tabular-nums block mt-1">
                {activeDiagnostic.recordedMaxDemandKva} / {activeDiagnostic.contractDemandKva} kVA
              </span>
              <span className="text-[10px] text-grid-amber-400 block mt-0.5">
                Billed at {activeDiagnostic.billingDemandKva} kVA min
              </span>
            </div>

            <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-xl p-3">
              <span className="text-[10px] text-grid-slate-500 uppercase block">Operating Power Factor</span>
              <span className="text-sm font-bold text-white tabular-nums block mt-1">
                {activeDiagnostic.powerFactor.toFixed(3)} Lag
              </span>
              <span className={`text-[10px] block mt-0.5 ${activeDiagnostic.powerFactor < 0.95 ? "text-red-400" : "text-grid-emerald-400"}`}>
                {activeDiagnostic.powerFactor < 0.95 ? "Penalty Slab Active" : "Incentive Eligible"}
              </span>
            </div>

            <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-xl p-3">
              <span className="text-[10px] text-grid-slate-500 uppercase block">Monthly Total Bill</span>
              <span className="text-sm font-bold text-white tabular-nums block mt-1">
                ₹{(activeDiagnostic.monthlyBillAmountInr / 10000000).toFixed(2)} Cr
              </span>
              <span className="text-[10px] text-grid-slate-500 block mt-0.5">
                Effective: ₹{(activeDiagnostic.monthlyBillAmountInr / activeDiagnostic.monthlyBilledKvah).toFixed(2)}/kVAh
              </span>
            </div>

            <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-xl p-3">
              <span className="text-[10px] text-grid-slate-500 uppercase block">ToD Peak Surcharge Units</span>
              <span className="text-sm font-bold text-white tabular-nums block mt-1">
                {(activeDiagnostic.todPeakUnitsKwh / 100000).toFixed(2)} L kWh
              </span>
              <span className="text-[10px] text-purple-400 block mt-0.5">
                ₹{(activeDiagnostic.todPeakSurchargeInr / 100000).toFixed(2)} L Surcharge
              </span>
            </div>
          </div>

          {/* Audit Findings */}
          <div className="bg-grid-navy-900/60 border border-grid-slate-800 rounded-2xl p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-grid-slate-400 font-mono mb-4 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-grid-amber-400" />
              <span>Identified Cost Leakages &amp; Statutory Non-Optimizations</span>
            </h4>
            <div className="space-y-3">
              {activeDiagnostic.findings.map((f, i) => (
                <div
                  key={i}
                  className="bg-grid-navy-950 border border-grid-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs font-mono"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          f.severity === "critical"
                            ? "bg-red-400"
                            : f.severity === "warning"
                            ? "bg-grid-amber-400"
                            : "bg-grid-cyan-400"
                        }`}
                      />
                      <span className="text-white font-bold">{f.title}</span>
                    </div>
                    <p className="text-grid-slate-400 text-[11px] leading-relaxed pl-4">
                      {f.description}
                    </p>
                  </div>
                  <div className="sm:text-right flex-shrink-0 pl-4 sm:pl-0">
                    <span className="text-[10px] text-grid-slate-500 uppercase block">Potential Recovery</span>
                    <span className="text-grid-emerald-400 font-bold text-sm tabular-nums">
                      +₹{(f.potentialSavingsInrMonthly / 100000).toFixed(2)} L/mo
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Roadmap & Action */}
          <div className="bg-grid-navy-900/60 border border-grid-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-grid-emerald-400 font-mono">
                Topnotch Turnkey Remediation Package
              </h4>
              <p className="text-xs font-mono text-grid-slate-300 max-w-xl">
                Our BEE Certified Energy Auditors and CERC Power Trading Desk can implement APFC capacitor banks,
                initiate SLDC Standing Clearance for IEX/Captive procurement, and optimize your contract demand
                within 30 to 45 business days.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
              <button
                onClick={handleExportToSimulator}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-grid-cyan-500 hover:bg-grid-cyan-400 text-grid-navy-950 font-bold font-mono text-xs transition-all shadow-lg shadow-grid-cyan-500/20 flex items-center justify-center space-x-2"
                title="Populate Open Access simulator with this plant's telemetry"
              >
                <Calculator className="w-4 h-4" />
                <span>Import into Simulator →</span>
              </button>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-grid-emerald-500 hover:bg-grid-emerald-400 text-grid-navy-950 font-bold font-mono text-xs transition-all shadow-lg shadow-grid-emerald-500/20 flex items-center justify-center space-x-2"
              >
                <span>Schedule Tariff Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
