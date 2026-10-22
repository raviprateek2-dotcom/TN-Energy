"use client";

import React, { useRef } from "react";
import {
  X,
  Award,
  ShieldCheck,
  CheckCircle2,
  Leaf,
  Printer,
  Download,
  Building2,
  Calendar,
  FileCheck2,
  Scale,
  Sparkles,
} from "lucide-react";
import { BRAND } from "@/lib/constants/brand";

export interface EsgCertificateData {
  id: string;
  name: string;
  industry: string;
  state: string;
  connectedLoad: string;
  annualConsumptionMus: number;
  cleanEnergyPercent: number;
  annualCo2AbatedTons: number;
  annualSavingsCrores: number;
  auditPeriod: string;
  meteringStandard: string;
  certNumber: string;
}

interface EsgAuditCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: EsgCertificateData;
}

export function EsgAuditCertificateModal({
  isOpen,
  onClose,
  data,
}: EsgAuditCertificateModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      {/* Background click dismiss */}
      <div className="fixed inset-0 -z-10" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        
        {/* Top Control Bar (Hidden during print) */}
        <div className="print:hidden bg-[#0B132B] px-6 py-4 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-[#F8BC26]" />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-200">
              Statutory ESG &amp; Scope-2 Decarbonization Certificate
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center space-x-1.5 transition-all shadow-sm active:scale-95"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            PRINTABLE CERTIFICATE BODY
           ========================================================================= */}
        <div
          ref={printRef}
          className="p-6 sm:p-12 bg-white text-slate-900 font-sans print:p-8 print:m-0 print:w-full print:border-none print:shadow-none"
        >
          {/* Certificate Guilloche Border Frame */}
          <div className="border-4 border-double border-slate-300 rounded-2xl p-6 sm:p-10 relative bg-gradient-to-b from-amber-50/20 via-white to-emerald-50/20">
            
            {/* Top Ornamental Watermark */}
            <div className="text-center space-y-3 pb-8 border-b-2 border-slate-200">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-mono font-bold uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>BEE Grade-A Accredited &amp; ISO 14064-1 Compliant</span>
              </div>

              <div className="space-y-1">
                <h2 className="text-xl sm:text-3xl font-black text-[#1C2C34] tracking-tight uppercase font-serif">
                  Topnotch Energy Solutions
                </h2>
                <p className="text-xs sm:text-sm font-mono text-slate-500 uppercase tracking-widest font-semibold">
                  Institutional Energy Audit &amp; Industrial Decarbonization Bureau
                </p>
                <p className="text-[10px] font-mono text-slate-400">
                  Registered under CERC Category-IV Power Trading • {BRAND.headquarters.fullAddress}
                </p>
              </div>

              <div className="pt-2">
                <span className="inline-block px-4 py-1.5 rounded-lg bg-[#1C2C34] text-[#F8BC26] font-mono font-black text-sm uppercase tracking-wider shadow-xs">
                  Certificate of Verified Industrial Decarbonization
                </span>
              </div>
            </div>

            {/* Certificate Serial & Timestamp Meta */}
            <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-slate-100 text-[11px] font-mono text-slate-500">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-700">Audit Dossier ID:</span>
                <span className="text-[#D97706] font-bold">{data.certNumber}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-700">Verification Period:</span>
                <span className="text-slate-800">{data.auditPeriod}</span>
              </div>
            </div>

            {/* Beneficiary Recipient Section */}
            <div className="py-6 text-center space-y-2">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-mono">
                This is to certify that the industrial facility operated by
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-[#1C2C34] tracking-tight">
                {data.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-mono">
                {data.industry} • {data.state} • Sanctioned Demand: {data.connectedLoad}
              </p>
              <p className="text-xs text-slate-600 max-w-2xl mx-auto leading-relaxed pt-2">
                has successfully transitioned its power procurement baseline from high-carbon fossil Discom monopoly tariffs to a structured <span className="font-bold text-slate-800">Group Captive Green Energy &amp; Power Exchange Portfolio</span> in strict conformity with Section 42 of the Electricity Act 2003 and the Ministry of Power Green Energy Open Access Rules 2022.
              </p>
            </div>

            {/* Core Verified Decarbonization Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y-2 border-slate-200 bg-white/70 rounded-xl p-4 my-4">
              <div className="text-center p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <div className="text-emerald-700 text-xs font-mono font-bold uppercase">Annual CO₂ Abated</div>
                <div className="text-xl sm:text-2xl font-black text-emerald-800 font-mono mt-1">
                  {data.annualCo2AbatedTons.toLocaleString("en-IN")} T
                </div>
                <div className="text-[10px] text-emerald-600 font-mono">Verified Metric Tonnes</div>
              </div>

              <div className="text-center p-3 rounded-xl bg-amber-50/70 border border-amber-200">
                <div className="text-amber-800 text-xs font-mono font-bold uppercase">Clean Energy Share</div>
                <div className="text-xl sm:text-2xl font-black text-amber-900 font-mono mt-1">
                  {data.cleanEnergyPercent}%
                </div>
                <div className="text-[10px] text-amber-700 font-mono">Total Plant Drawl</div>
              </div>

              <div className="text-center p-3 rounded-xl bg-blue-50/70 border border-blue-200">
                <div className="text-blue-700 text-xs font-mono font-bold uppercase">Annual Energy Offtake</div>
                <div className="text-xl sm:text-2xl font-black text-blue-900 font-mono mt-1">
                  {data.annualConsumptionMus.toFixed(1)} MU
                </div>
                <div className="text-[10px] text-blue-600 font-mono">Million Units / Year</div>
              </div>

              <div className="text-center p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <div className="text-emerald-700 text-xs font-mono font-bold uppercase">Audited Tariff Cut</div>
                <div className="text-xl sm:text-2xl font-black text-emerald-800 font-mono mt-1">
                  ₹{data.annualSavingsCrores.toFixed(2)} Cr
                </div>
                <div className="text-[10px] text-emerald-600 font-mono">Annualized EBITDA Lift</div>
              </div>
            </div>

            {/* Environmental Equivalency Callout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-slate-600 py-3">
              <div className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <Leaf className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Equivalent to <strong>{(data.annualCo2AbatedTons * 45).toLocaleString("en-IN")}</strong> urban trees planted</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <Scale className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Zero CSS &amp; AS under Section 42 CGP</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <FileCheck2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>{data.meteringStandard}</span>
              </div>
            </div>

            {/* Regulatory Compliance & Authority Signatures */}
            <div className="mt-8 pt-6 border-t-2 border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
              <div className="space-y-1 text-[11px] font-mono text-slate-500">
                <div className="font-bold text-slate-800 uppercase">Regulatory Verification Footnote</div>
                <p className="leading-relaxed">
                  Energy injection verified from Joint Meter Reading (JMR) logs and SLDC energy accounting statements. Scope 2 emissions reduction calculated utilizing the CEA CO₂ Baseline Database for the Indian Power Sector (Version 19.0, 0.82 tCO₂/MWh grid factor).
                </p>
              </div>

              <div className="flex justify-end space-x-6 text-right">
                <div className="space-y-1">
                  <div className="h-10 flex items-center justify-end font-serif italic text-slate-700 text-lg font-bold border-b border-slate-400 pb-1">
                    Prateek Ravi, Lead Auditor
                  </div>
                  <div className="text-xs font-bold font-mono text-[#1C2C34]">
                    Lead BEE Certified Energy Auditor
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    Reg. #EA-4821 • Bureau of Energy Efficiency
                  </div>
                </div>

                <div className="w-16 h-16 rounded-full border-2 border-emerald-600 flex flex-col items-center justify-center text-[8px] font-mono font-bold text-emerald-700 bg-emerald-50 shadow-inner flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>VERIFIED</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Bottom Action Bar (Hidden during print) */}
        <div className="print:hidden bg-slate-50 p-4 sm:p-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-mono">
            This certificate is suitable for corporate BRSR, CDP, and Scope 2 GHG protocol filings.
          </p>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-[#1C2C34] hover:bg-slate-800 text-white font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95"
            >
              <Printer className="w-4 h-4 text-[#F8BC26]" />
              <span>Print or Export PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-mono text-xs font-bold transition-all"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
